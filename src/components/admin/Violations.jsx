import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { adminStyles } from './adminStyles';
import LoadingError from '../common/LoadingError';
import ConfirmModal from './ConfirmModal';

const Violations = ({
  loading,
  error,
  setActiveAdminSection,
  user,
  API_BASE_URL
}) => {
  const [violationSessionCode, setViolationSessionCode] = useState('');
  const [quizViolations, setQuizViolations] = useState([]);
  const [selectedViolation, setSelectedViolation] = useState(null);
  const [showViolationDetails, setShowViolationDetails] = useState(false);
  const [showRestartConfirm, setShowRestartConfirm] = useState(false);
  const [violationToRestart, setViolationToRestart] = useState(null);
  const [focusedInput, setFocusedInput] = useState(null);
  const s = adminStyles;

  const apiCall = async (endpoint, method = 'GET', data = null) => {
    try {
      const config = {
        method,
        headers: { 'Content-Type': 'application/json' },
      };
      if (data) config.body = JSON.stringify(data);
      const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  };

  const loadQuizViolations = async (sessionId) => {
    if (!user || !user.email) return;
    
    try {
      const violations = await apiCall(`/api/quiz-violations/${sessionId}?adminEmail=${encodeURIComponent(user.email)}`);
      const uniqueViolations = [];
      const seenRegNos = new Set();
      for (const v of violations) {
        if (!seenRegNos.has(v.regNo)) {
          seenRegNos.add(v.regNo);
          uniqueViolations.push(v);
        }
      }
      setQuizViolations(uniqueViolations);
    } catch (error) {
      toast.error('Failed to load violations: ' + error.message);
    }
  };

  const handleApproveResume = async (violationId) => {
    try {
      const response = await apiCall(`/api/quiz-violations/${violationId}/resume`, 'POST');
      if (response && response.success) {
        toast.success('Resume approved. The student can now continue the quiz.');
      } else {
        toast.success(response?.message || 'Resume approved.');
      }
      if (violationSessionCode) {
        await loadQuizViolations(violationSessionCode);
      }
    } catch (error) {
      toast.error('Failed to approve resume: ' + error.message);
    }
  };

  const handleRestartStudentQuiz = async (violation) => {
    setViolationToRestart(violation);
    setShowRestartConfirm(true);
  };

  const confirmRestartQuiz = async () => {
    if (!violationToRestart) return;
    
    try {
      const response = await apiCall(`/api/quiz-violations/${violationToRestart._id}/restart`, 'POST', {
        adminAction: true,
        restartReason: 'Admin approved restart due to violations',
      });
      if (response.success) {
        toast.info(`Quiz restart approved for ${violationToRestart.studentName}! The student can restart without a token.`);
        if (violationSessionCode) {
          await loadQuizViolations(violationSessionCode);
        }
      }
      setShowRestartConfirm(false);
      setViolationToRestart(null);
    } catch (error) {
      toast.error('Failed to approve quiz restart: ' + error.message);
      setShowRestartConfirm(false);
      setViolationToRestart(null);
    }
  };

  const cancelRestartQuiz = () => {
    setShowRestartConfirm(false);
    setViolationToRestart(null);
  };

  useEffect(() => {
    if (violationSessionCode) {
      loadQuizViolations(violationSessionCode);
    }
  }, [violationSessionCode]);

  return (
    <div style={s.pageContainer}>
      <div style={s.contentContainer}>
        <LoadingError loading={loading} error={error} />
        
        <button 
          style={s.backButton}
          onClick={() => setActiveAdminSection(null)} 
          disabled={loading}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
            e.currentTarget.style.transform = 'translateX(-5px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
            e.currentTarget.style.transform = 'translateX(0)';
          }}
        >
          ← Back to Dashboard
        </button>

        <div style={s.header}>
          <h1 style={s.headerTitle}>
            <span style={s.headerIcon}>⚠️</span>
            Quiz Violations
          </h1>
          <p style={s.headerSubtitle}>Monitor and manage quiz rule violations</p>
        </div>

        <div style={s.card}>
          <input
            type="text"
            placeholder="Enter Quiz Code to see violations"
            value={violationSessionCode}
            onChange={(e) => setViolationSessionCode(e.target.value)}
            style={{
              ...s.input,
              ...(focusedInput === 'sessionCode' ? s.inputFocus : {})
            }}
            onFocus={() => setFocusedInput('sessionCode')}
            onBlur={() => setFocusedInput(null)}
            disabled={loading}
          />

          <div style={{ marginTop: '30px' }}>
            {quizViolations.map((violation) => (
              <div 
                key={violation._id} 
                style={s.violationCard}
                onMouseEnter={(e) => {
                  Object.assign(e.currentTarget.style, s.cardHover);
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = '';
                  e.currentTarget.style.boxShadow = s.violationCard.boxShadow;
                  e.currentTarget.style.border = s.violationCard.border;
                }}
              >
                <div style={s.violationHeader}>
                  <div>
                    <p style={s.violationStudentName}>
                      {violation.studentName} ({violation.regNo})
                    </p>
                    <p style={s.violationInfo}>
                      <strong>Department:</strong> {violation.department}
                    </p>
                    <p style={s.violationInfo}>
                      <strong>Section:</strong> {violation.section}
                    </p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={s.violationStatusBadge(violation.isResolved, violation.adminAction)}>
                      {violation.isResolved ? '✅ Resolved' : 
                       violation.adminAction === 'resume_approved' ? '🔄 Resume Approved' :
                       violation.adminAction === 'restart_approved' ? '🔄 Restart Approved' :
                       '⏳ Pending'}
                    </div>
                    <p style={{ 
                      fontSize: '12px', 
                      color: 'rgba(255, 255, 255, 0.6)', 
                      marginTop: '8px' 
                    }}>
                      {new Date(violation.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
                
                <div style={s.violationDetailsBox}>
                  <h4 style={s.violationDetailsTitle}>⚠️ Violation Details</h4>
                  <div style={s.violationDetailsGrid}>
                    <div>
                      <p style={s.violationDetailItem}>
                        <span style={s.violationDetailLabel}>Type:</span>
                        <span style={s.violationTypeBadge(violation.violationType)}>
                          {violation.violationType.replace(/_/g, ' ').toUpperCase()}
                        </span>
                      </p>
                      <p style={s.violationDetailItem}>
                        <span style={s.violationDetailLabel}>Current Question:</span>
                        <span style={s.violationDetailValue}>{violation.currentQuestion || 'N/A'}</span>
                      </p>
                      <p style={s.violationDetailItem}>
                        <span style={s.violationDetailLabel}>Time Left:</span>
                        <span style={s.violationDetailValue}>
                          {Math.floor((violation.timeLeft || 0) / 60)}m {(violation.timeLeft || 0) % 60}s
                        </span>
                      </p>
                    </div>
                    <div>
                      <p style={s.violationDetailItem}>
                        <span style={s.violationDetailLabel}>Tab Switches:</span>
                        <span style={s.violationDetailValue}>{violation.tabSwitchCount || 0}</span>
                      </p>
                      <p style={s.violationDetailItem}>
                        <span style={s.violationDetailLabel}>Time Spent:</span>
                        <span style={s.violationDetailValue}>
                          {Math.floor((violation.timeSpent || 0) / 60)}m {(violation.timeSpent || 0) % 60}s
                        </span>
                      </p>
                      {violation.resolvedAt && (
                        <p style={{ ...s.violationDetailItem, color: '#4facfe' }}>
                          <span style={s.violationDetailLabel}>Resolved:</span>
                          <span style={s.violationDetailValue}>
                            {new Date(violation.resolvedAt).toLocaleString()}
                          </span>
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div style={s.buttonGroup}>
                  <button
                    style={{
                      ...s.button,
                      ...s.buttonInfo
                    }}
                    onClick={() => {
                      setSelectedViolation(violation);
                      setShowViolationDetails(true);
                    }}
                    onMouseEnter={(e) => {
                      Object.assign(e.currentTarget.style, s.buttonHover);
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = '';
                      e.currentTarget.style.boxShadow = s.buttonInfo.boxShadow;
                    }}
                  >
                    📋 View Details
                  </button>
                  {!violation.isResolved && (
                    <>
                      {violation.adminAction !== 'resume_approved' && (
                        <button 
                          style={{
                            ...s.button,
                            ...s.buttonSuccess,
                            ...(loading ? s.buttonDisabled : {})
                          }}
                          onClick={() => handleApproveResume(violation._id)} 
                          disabled={loading}
                          onMouseEnter={(e) => {
                            if (!loading) {
                              Object.assign(e.currentTarget.style, s.buttonHover);
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (!loading) {
                              e.currentTarget.style.transform = '';
                              e.currentTarget.style.boxShadow = s.buttonSuccess.boxShadow;
                            }
                          }}
                        >
                          ✅ Approve Resume
                        </button>
                      )}
                      
                      {violation.adminAction !== 'restart_approved' && (
                        <button 
                          style={{
                            ...s.button,
                            ...s.buttonWarning,
                            ...(loading ? s.buttonDisabled : {})
                          }}
                          onClick={() => handleRestartStudentQuiz(violation)} 
                          disabled={loading}
                          onMouseEnter={(e) => {
                            if (!loading) {
                              Object.assign(e.currentTarget.style, s.buttonHover);
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (!loading) {
                              e.currentTarget.style.transform = '';
                              e.currentTarget.style.boxShadow = s.buttonWarning.boxShadow;
                            }
                          }}
                        >
                          🔄 Approve Restart
                        </button>
                      )}
                    </>
                  )}
                  
                  {violation.isResolved && (
                    <span style={s.violationStatusBadge(true, null)}>
                      ✅ Issue Resolved
                    </span>
                  )}
                </div>
              </div>
            ))}
            
            {quizViolations.length === 0 && violationSessionCode && (
              <div style={s.emptyState}>
                <div style={s.emptyIcon}>✅</div>
                <h4 style={s.emptyTitle}>No violations found</h4>
                <p style={s.emptyText}>Great! No students have violated quiz rules in this session.</p>
              </div>
            )}

            {!violationSessionCode && (
              <div style={s.emptyState}>
                <div style={s.emptyIcon}>🔍</div>
                <h4 style={s.emptyTitle}>Enter Quiz Code</h4>
                <p style={s.emptyText}>Enter a quiz code above to view violations.</p>
              </div>
            )}
          </div>
        </div>
        
        {showViolationDetails && selectedViolation && (
          <div style={s.modal}>
            <div style={s.modalContent}>
              <button 
                onClick={() => setShowViolationDetails(false)} 
                style={s.modalCloseButton}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                  e.currentTarget.style.transform = 'scale(1.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                ✕
              </button>
              <h3 style={s.modalTitle}>Violation Details - {selectedViolation.studentName}</h3>
              
              <div style={s.violationDetailsBox}>
                <h4 style={{ ...s.violationDetailsTitle, marginBottom: '15px' }}>Status Information</h4>
                <div style={{ marginBottom: '15px' }}>
                  <div style={s.violationStatusBadge(selectedViolation.isResolved, selectedViolation.adminAction)}>
                    {selectedViolation.isResolved ? '✅ Resolved' : 
                     selectedViolation.adminAction === 'resume_approved' ? '🔄 Resume Approved' :
                     selectedViolation.adminAction === 'restart_approved' ? '🔄 Restart Approved' :
                     '⏳ Pending'}
                  </div>
                </div>
                <p style={s.violationDetailItem}>
                  <span style={s.violationDetailLabel}>Created:</span>
                  <span style={s.violationDetailValue}>
                    {new Date(selectedViolation.createdAt).toLocaleString()}
                  </span>
                </p>
                {selectedViolation.resolvedAt && (
                  <p style={s.violationDetailItem}>
                    <span style={s.violationDetailLabel}>Resolved:</span>
                    <span style={s.violationDetailValue}>
                      {new Date(selectedViolation.resolvedAt).toLocaleString()}
                    </span>
                  </p>
                )}
              </div>

              <div style={{
                ...s.violationDetailsBox,
                background: 'rgba(250, 112, 154, 0.1)',
                border: '2px solid rgba(250, 112, 154, 0.3)'
              }}>
                <h4 style={{ ...s.violationDetailsTitle, color: '#fa709a', marginBottom: '15px' }}>
                  Violation Details
                </h4>
                <div style={s.violationDetailsGrid}>
                  <div>
                    <p style={s.violationDetailItem}>
                      <span style={s.violationDetailLabel}>Student:</span>
                      <span style={s.violationDetailValue}>
                        {selectedViolation.studentName} ({selectedViolation.regNo})
                      </span>
                    </p>
                    <p style={s.violationDetailItem}>
                      <span style={s.violationDetailLabel}>Department:</span>
                      <span style={s.violationDetailValue}>{selectedViolation.department}</span>
                    </p>
                    <p style={s.violationDetailItem}>
                      <span style={s.violationDetailLabel}>Section:</span>
                      <span style={s.violationDetailValue}>{selectedViolation.section}</span>
                    </p>
                    <p style={s.violationDetailItem}>
                      <span style={s.violationDetailLabel}>Violation Type:</span>
                      <span style={s.violationTypeBadge(selectedViolation.violationType)}>
                        {selectedViolation.violationType.replace(/_/g, ' ').toUpperCase()}
                      </span>
                    </p>
                  </div>
                  <div>
                    <p style={s.violationDetailItem}>
                      <span style={s.violationDetailLabel}>Current Question:</span>
                      <span style={s.violationDetailValue}>
                        {selectedViolation.currentQuestion || 'N/A'}
                      </span>
                    </p>
                    <p style={s.violationDetailItem}>
                      <span style={s.violationDetailLabel}>Time Left:</span>
                      <span style={s.violationDetailValue}>
                        {Math.floor((selectedViolation.timeLeft || 0) / 60)}m {(selectedViolation.timeLeft || 0) % 60}s
                      </span>
                    </p>
                    <p style={s.violationDetailItem}>
                      <span style={s.violationDetailLabel}>Time Spent:</span>
                      <span style={s.violationDetailValue}>
                        {Math.floor((selectedViolation.timeSpent || 0) / 60)}m {(selectedViolation.timeSpent || 0) % 60}s
                      </span>
                    </p>
                    <p style={s.violationDetailItem}>
                      <span style={s.violationDetailLabel}>Tab Switch Count:</span>
                      <span style={s.violationDetailValue}>
                        {selectedViolation.tabSwitchCount || 0}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Restart Confirmation Modal */}
        <ConfirmModal
          show={showRestartConfirm}
          title="Restart Quiz"
          message={violationToRestart ? `Are you sure you want to restart the quiz for ${violationToRestart.studentName} (${violationToRestart.regNo})?\n\nThis will:\n• Allow them to restart from question 1\n• Give them full time allocation\n• Reset their violation count\n• Mark this violation as resolved` : ''}
          icon="🔄"
          confirmText="Approve Restart"
          cancelText="Cancel"
          onConfirm={confirmRestartQuiz}
          onCancel={cancelRestartQuiz}
          confirmButtonStyle="warning"
        />
      </div>
    </div>
  );
};

export default Violations;