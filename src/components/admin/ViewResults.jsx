import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { adminStyles } from './adminStyles';
import LoadingError from '../common/LoadingError';

const ViewResults = ({
  quizSessions,
  loading,
  error,
  setActiveAdminSection,
  user,
  API_BASE_URL
}) => {
  const [resultSessionCode, setResultSessionCode] = useState('');
  const [studentResults, setStudentResults] = useState([]);
  const [resultFilter, setResultFilter] = useState('all');
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

  const loadSessionResults = async (sessionId) => {
    if (!user || !user.email) return;
    
    try {
      const results = await apiCall(`/api/quiz-results/${sessionId}?adminEmail=${encodeURIComponent(user.email)}`);
      setStudentResults(results);
    } catch (error) {
      toast.error('Failed to load results: ' + error.message);
    }
  };

  const getGradeFromPercentage = (percentage) => {
    if (percentage >= 90) return 'A+';
    if (percentage >= 75 && percentage <= 89) return 'A';
    if (percentage >= 50 && percentage <= 74) return 'B';
    if (percentage >= 40 && percentage <= 49) return 'C';
    if (percentage <= 39) return 'D';
    return 'F';
  };

  const handleExportCSV = () => {
    if (!resultSessionCode) {
      toast.info('Please enter a quiz code first!');
      return;
    }
    if (studentResults.length === 0) {
      toast.error('No results found to export!');
      return;
    }
    const currentSession = quizSessions.find((s) => s.sessionId === resultSessionCode);
    const sessionName = currentSession ? currentSession.name : resultSessionCode;
    const filename = `Quiz_Results_${sessionName}_${resultSessionCode}_${new Date().toISOString().split('T')[0]}.csv`;
    exportToCSV(studentResults, filename);
  };

  const exportToCSV = (data, filename) => {
    if (!data || data.length === 0) {
      toast.error('No data to export!');
      return;
    }
    const headers = [
      'Student Name',
      'Registration Number',
      'Department',
      'Section',
      'Score',
      'Total Questions',
      'Percentage',
      'Grade',
      'Submission Date',
      'Submission Time',
    ];
    const csvContent = [
      headers.join(','),
      ...data.map((result) => {
        const submissionDate = new Date(result.submittedAt);
        const grade = getGradeFromPercentage(result.percentage);
        return [
          `"${result.studentName}"`,
          `"${result.regNo}"`,
          `"${result.department}"`,
          `"${result.section}"`,
          result.score,
          result.totalQuestions,
          result.percentage,
          `"${grade}"`,
          submissionDate.toLocaleDateString(),
          submissionDate.toLocaleTimeString(),
        ].join(',');
      }),
    ].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', filename);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  useEffect(() => {
    if (resultSessionCode) {
      loadSessionResults(resultSessionCode);
    }
  }, [resultSessionCode]);

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
            <span style={s.headerIcon}>📊</span>
            Quiz Results
          </h1>
          <p style={s.headerSubtitle}>View and analyze student quiz results</p>
        </div>

        <div style={s.card}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            flexWrap: 'wrap',
            gap: '15px',
            marginBottom: '25px'
          }}>
            <h2 style={{ 
              fontSize: '24px', 
              fontWeight: 'bold', 
              color: 'white', 
              margin: 0 
            }}>
              Results Dashboard
            </h2>
            <button 
              style={{
                ...s.csvButton,
                ...(loading ? s.buttonDisabled : {})
              }}
              onClick={handleExportCSV} 
              disabled={loading}
              onMouseEnter={(e) => {
                if (!loading) {
                  Object.assign(e.currentTarget.style, s.buttonHover);
                }
              }}
              onMouseLeave={(e) => {
                if (!loading) {
                  e.currentTarget.style.transform = '';
                  e.currentTarget.style.boxShadow = s.csvButton.boxShadow;
                }
              }}
            >
              📥 Export to CSV
            </button>
          </div>

          <input
            type="text"
            placeholder="Enter Quiz Code to see results"
            value={resultSessionCode}
            onChange={(e) => setResultSessionCode(e.target.value)}
            style={{
              ...s.input,
              ...(focusedInput === 'sessionCode' ? s.inputFocus : {})
            }}
            onFocus={() => setFocusedInput('sessionCode')}
            onBlur={() => setFocusedInput(null)}
            disabled={loading}
          />
          
          <select 
            value={resultFilter} 
            onChange={(e) => setResultFilter(e.target.value)} 
            style={s.select}
          >
            <option value="all" style={s.selectOption}>All Results</option>
            <option value=">=80" style={s.selectOption}>≥ 80%</option>
            <option value="<=40" style={s.selectOption}>≤ 40%</option>
          </select>

          <div style={{ marginTop: '30px' }}>
            {studentResults
              .filter((result) => {
                if (resultFilter === '>=80') return result.percentage >= 80;
                if (resultFilter === '<=40') return result.percentage <= 40;
                return true;
              })
              .map((result, index) => {
                const grade = getGradeFromPercentage(result.percentage);
                const isPass = grade !== 'F';
                return (
                  <div
                    key={index}
                    style={{
                      ...s.resultCard,
                      ...s.resultCardBorder(isPass)
                    }}
                    onMouseEnter={(e) => {
                      Object.assign(e.currentTarget.style, s.cardHover);
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = '';
                      e.currentTarget.style.boxShadow = s.resultCard.boxShadow;
                      e.currentTarget.style.border = s.resultCard.border;
                    }}
                  >
                    <div style={s.resultHeader}>
                      <div>
                        <h3 style={s.resultName}>{result.studentName}</h3>
                        <p style={{ 
                          color: 'rgba(255, 255, 255, 0.7)', 
                          fontSize: '14px', 
                          margin: '5px 0 0 0' 
                        }}>
                          Reg No: {result.regNo}
                        </p>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={s.resultScore}>
                          Score: {result.score}/{result.totalMarks ?? result.totalQuestions}
                        </div>
                        <div style={{ marginTop: '8px' }}>
                          <span style={s.gradeBadge(isPass)}>
                            {result.percentage}% - {grade}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div style={s.resultDetails}>
                      <div>
                        <strong style={{ color: 'rgba(255, 255, 255, 0.9)' }}>Department:</strong>{' '}
                        <span style={{ color: 'rgba(255, 255, 255, 0.8)' }}>{result.department}</span>
                      </div>
                      <div>
                        <strong style={{ color: 'rgba(255, 255, 255, 0.9)' }}>Section:</strong>{' '}
                        <span style={{ color: 'rgba(255, 255, 255, 0.8)' }}>{result.section}</span>
                      </div>
                      <div>
                        <strong style={{ color: 'rgba(255, 255, 255, 0.9)' }}>Submitted:</strong>{' '}
                        <span style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                          {new Date(result.submittedAt).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            
            {studentResults.length === 0 && resultSessionCode && (
              <div style={s.emptyState}>
                <div style={s.emptyIcon}>📊</div>
                <h4 style={s.emptyTitle}>No results found</h4>
                <p style={s.emptyText}>No students have submitted results for this quiz session yet.</p>
              </div>
            )}

            {!resultSessionCode && (
              <div style={s.emptyState}>
                <div style={s.emptyIcon}>🔍</div>
                <h4 style={s.emptyTitle}>Enter Quiz Code</h4>
                <p style={s.emptyText}>Enter a quiz code above to view student results.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewResults;