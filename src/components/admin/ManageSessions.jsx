import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { adminStyles } from './adminStyles';
import LoadingError from '../common/LoadingError';
import ConfirmModal from './ConfirmModal';

const ManageSessions = ({
  quizSessions,
  loading,
  error,
  setActiveAdminSection,
  loadQuizSessions,
  user,
  API_BASE_URL
}) => {
  const [editingSession, setEditingSession] = useState(null);
  const [editSessionData, setEditSessionData] = useState({
    name: '',
    questions: [],
    passages: [],
    audioFiles: []
  });
  const [newQuestionData, setNewQuestionData] = useState({
    question: '',
    options: { a: '', b: '', c: '', d: '' },
    correct: '',
    marks: 1,
    timeSeconds: 60
  });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [sessionToDelete, setSessionToDelete] = useState(null);

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

  const handleStartQuiz = async (sessionId) => {
    try {
      await apiCall(`/api/quiz-sessions/${sessionId}/start`, 'PUT');
      await loadQuizSessions();
      toast.info(`Quiz Started! Students can join using code: ${sessionId}`);
    } catch (error) {
      toast.error('Failed to start quiz: ' + error.message);
    }
  };

  const handleEndQuiz = async (sessionId) => {
    try {
      await apiCall(`/api/quiz-sessions/${sessionId}/end`, 'PUT');
      await loadQuizSessions();
      toast.info('Quiz Ended!');
    } catch (error) {
      toast.error('Failed to end quiz: ' + error.message);
    }
  };

  const handleGenerateLink = (sessionId) => {
    const currentSession = quizSessions.find((s) => s.sessionId === sessionId);
    if (currentSession && currentSession.questions.length > 0) {
      toast.info(`Quiz Code: ${sessionId}\nShare this code with students to join the quiz.`);
    } else {
      toast.info('Please add at least one question before generating the code.');
    }
  };

  const handleEditSession = (session) => {
    setEditingSession(session);
    setEditSessionData({
      name: session.name,
      questions: [...session.questions],
      passages: session.passages || [],
      audioFiles: session.audioFiles || []
    });
  };

  const handleUpdateSession = async () => {
    if (!editingSession) return;
    
    try {
      const response = await apiCall(`/api/quiz-sessions/${editingSession.sessionId}`, 'PUT', editSessionData);
      if (response.success) {
        await loadQuizSessions();
        setEditingSession(null);
        setEditSessionData({ name: '', questions: [], passages: [], audioFiles: [] });
        toast.success('Quiz session updated successfully!');
      }
    } catch (error) {
      toast.error('Failed to update quiz session: ' + error.message);
    }
  };

  const handleDeleteSession = async (sessionId) => {
    setSessionToDelete(sessionId);
    setShowDeleteConfirm(true);
  };

  const confirmDeleteSession = async () => {
    if (!sessionToDelete) return;

    try {
      await apiCall(`/api/quiz-sessions/${sessionToDelete}`, 'DELETE');
      await loadQuizSessions();
      toast.success('Quiz session deleted successfully!');
      setShowDeleteConfirm(false);
      setSessionToDelete(null);
    } catch (error) {
      toast.error('Failed to delete quiz session: ' + error.message);
      setShowDeleteConfirm(false);
      setSessionToDelete(null);
    }
  };

  const cancelDeleteSession = () => {
    setShowDeleteConfirm(false);
    setSessionToDelete(null);
  };

  const cancelEditSession = () => {
    setEditingSession(null);
    setEditSessionData({ name: '', questions: [], passages: [], audioFiles: [] });
  };

  const handleAddQuestionToSession = () => {
    if (!newQuestionData.question || !newQuestionData.options.a || !newQuestionData.options.b || 
        !newQuestionData.options.c || !newQuestionData.options.d || !newQuestionData.correct) {
      toast.info('Please fill all question fields!');
      return;
    }

    const newQuestion = {
      question: newQuestionData.question,
      options: { ...newQuestionData.options },
      correct: newQuestionData.correct,
      marks: Number(newQuestionData.marks) || 1,
      timeSeconds: Number(newQuestionData.timeSeconds) || 60
    };

    setEditSessionData({
      ...editSessionData,
      questions: [...editSessionData.questions, newQuestion]
    });

    setNewQuestionData({
      question: '',
      options: { a: '', b: '', c: '', d: '' },
      correct: '',
      marks: 1,
      timeSeconds: 60
    });

    toast.success('Question added to session!');
  };

  const s = adminStyles;
  const [focusedInput, setFocusedInput] = useState(null);

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
            <span style={s.headerIcon}>📋</span>
            Quiz Sessions
          </h1>
          <p style={s.headerSubtitle}>Manage and edit your quiz sessions</p>
        </div>

        <div>
          {quizSessions.map((session) => (
            <div 
              key={session.sessionId} 
              style={s.sessionCard}
              onMouseEnter={(e) => {
                Object.assign(e.currentTarget.style, s.cardHover);
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = '';
                e.currentTarget.style.boxShadow = s.sessionCard.boxShadow;
                e.currentTarget.style.border = s.sessionCard.border;
              }}
            >
              {editingSession && editingSession.sessionId === session.sessionId ? (
                <div style={s.editForm}>
                  <h3 style={s.editFormTitle}>✏️ Edit Quiz Session</h3>
                  <input
                    type="text"
                    value={editSessionData.name}
                    onChange={(e) => setEditSessionData({ ...editSessionData, name: e.target.value })}
                    placeholder="Quiz Session Name"
                    style={{
                      ...s.input,
                      ...(focusedInput === 'sessionName' ? s.inputFocus : {})
                    }}
                    onFocus={() => setFocusedInput('sessionName')}
                    onBlur={() => setFocusedInput(null)}
                  />
                  <div style={{ marginTop: '20px' }}>
                    <h4 style={s.sectionTitle}>❓ Questions ({editSessionData.questions.length})</h4>
                    
                    {/* Add New Question Form */}
                    <div style={{ 
                      background: 'rgba(79, 172, 254, 0.1)', 
                      padding: '20px', 
                      borderRadius: '12px', 
                      marginBottom: '20px',
                      border: '2px solid rgba(79, 172, 254, 0.3)'
                    }}>
                      <h5 style={{ margin: '0 0 15px 0', color: 'white', fontSize: '18px', fontWeight: '600' }}>➕ Add New Question</h5>
                      <input
                        type="text"
                        value={newQuestionData.question}
                        onChange={(e) => setNewQuestionData({ ...newQuestionData, question: e.target.value })}
                        placeholder="Enter new question"
                        style={{
                          ...s.input,
                          ...(focusedInput === 'newQuestion' ? s.inputFocus : {})
                        }}
                        onFocus={() => setFocusedInput('newQuestion')}
                        onBlur={() => setFocusedInput(null)}
                      />
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                        <input
                          type="text"
                          value={newQuestionData.options.a}
                          onChange={(e) => setNewQuestionData({ 
                            ...newQuestionData, 
                            options: { ...newQuestionData.options, a: e.target.value } 
                          })}
                          placeholder="Option A"
                          style={{
                            ...s.input,
                            ...(focusedInput === 'newOptionA' ? s.inputFocus : {})
                          }}
                          onFocus={() => setFocusedInput('newOptionA')}
                          onBlur={() => setFocusedInput(null)}
                        />
                        <input
                          type="text"
                          value={newQuestionData.options.b}
                          onChange={(e) => setNewQuestionData({ 
                            ...newQuestionData, 
                            options: { ...newQuestionData.options, b: e.target.value } 
                          })}
                          placeholder="Option B"
                          style={{
                            ...s.input,
                            ...(focusedInput === 'newOptionB' ? s.inputFocus : {})
                          }}
                          onFocus={() => setFocusedInput('newOptionB')}
                          onBlur={() => setFocusedInput(null)}
                        />
                        <input
                          type="text"
                          value={newQuestionData.options.c}
                          onChange={(e) => setNewQuestionData({ 
                            ...newQuestionData, 
                            options: { ...newQuestionData.options, c: e.target.value } 
                          })}
                          placeholder="Option C"
                          style={{
                            ...s.input,
                            ...(focusedInput === 'newOptionC' ? s.inputFocus : {})
                          }}
                          onFocus={() => setFocusedInput('newOptionC')}
                          onBlur={() => setFocusedInput(null)}
                        />
                        <input
                          type="text"
                          value={newQuestionData.options.d}
                          onChange={(e) => setNewQuestionData({ 
                            ...newQuestionData, 
                            options: { ...newQuestionData.options, d: e.target.value } 
                          })}
                          placeholder="Option D"
                          style={{
                            ...s.input,
                            ...(focusedInput === 'newOptionD' ? s.inputFocus : {})
                          }}
                          onFocus={() => setFocusedInput('newOptionD')}
                          onBlur={() => setFocusedInput(null)}
                        />
                      </div>

                      {/* Marks & Timer */}
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                        <input
                          type="number"
                          value={newQuestionData.marks}
                          onChange={(e) => setNewQuestionData({ ...newQuestionData, marks: e.target.value })}
                          placeholder="Marks"
                          min={0}
                          style={{
                            ...s.input,
                            ...(focusedInput === 'newMarks' ? s.inputFocus : {})
                          }}
                          onFocus={() => setFocusedInput('newMarks')}
                          onBlur={() => setFocusedInput(null)}
                        />
                        <input
                          type="number"
                          value={newQuestionData.timeSeconds}
                          onChange={(e) => setNewQuestionData({ ...newQuestionData, timeSeconds: e.target.value })}
                          placeholder="Time (seconds)"
                          min={1}
                          style={{
                            ...s.input,
                            ...(focusedInput === 'newTime' ? s.inputFocus : {})
                          }}
                          onFocus={() => setFocusedInput('newTime')}
                          onBlur={() => setFocusedInput(null)}
                        />
                      </div>
                      <select
                        value={newQuestionData.correct}
                        onChange={(e) => setNewQuestionData({ ...newQuestionData, correct: e.target.value })}
                        style={s.select}
                      >
                        <option value="" style={s.selectOption}>Select Correct Answer</option>
                        <option value="A" style={s.selectOption}>Option A</option>
                        <option value="B" style={s.selectOption}>Option B</option>
                        <option value="C" style={s.selectOption}>Option C</option>
                        <option value="D" style={s.selectOption}>Option D</option>
                      </select>
                      <div style={{ textAlign: 'center', marginTop: '15px' }}>
                        <button 
                          style={{
                            ...s.button,
                            ...s.buttonSuccess
                          }}
                          onClick={handleAddQuestionToSession}
                          onMouseEnter={(e) => {
                            Object.assign(e.currentTarget.style, s.buttonHover);
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = '';
                            e.currentTarget.style.boxShadow = s.buttonSuccess.boxShadow;
                          }}
                        >
                          ➕ Add Question
                        </button>
                      </div>
                    </div>

                    <div style={s.scrollableContainer}>
                      {editSessionData.questions.map((question, index) => (
                        <div key={index} style={s.questionPreviewCard}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                            <h5 style={{ margin: 0, color: 'white', fontSize: '16px' }}>Question {index + 1}</h5>
                            <button 
                              style={{
                                ...s.button,
                                ...s.buttonDanger,
                                padding: '6px 12px',
                                fontSize: '12px'
                              }}
                              onClick={() => {
                                const newQuestions = editSessionData.questions.filter((_, i) => i !== index);
                                setEditSessionData({ ...editSessionData, questions: newQuestions });
                              }}
                              onMouseEnter={(e) => {
                                Object.assign(e.currentTarget.style, s.buttonHover);
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.transform = '';
                                e.currentTarget.style.boxShadow = s.buttonDanger.boxShadow;
                              }}
                            >
                              🗑️ Delete
                            </button>
                          </div>
                          <p style={{ fontSize: '14px', marginBottom: '10px', color: 'rgba(255, 255, 255, 0.9)' }}>
                            <strong style={{ color: '#bb86fc' }}>Q:</strong> {question.question}
                          </p>
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '13px' }}>
                            <span style={{
                              padding: '8px',
                              borderRadius: '8px',
                              border: `2px solid ${question.correct === 'A' ? 'rgba(79, 172, 254, 0.6)' : 'rgba(255, 255, 255, 0.2)'}`,
                              background: question.correct === 'A' ? 'rgba(79, 172, 254, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                              color: 'white'
                            }}>
                              <strong>A:</strong> {question.options.a}
                            </span>
                            <span style={{
                              padding: '8px',
                              borderRadius: '8px',
                              border: `2px solid ${question.correct === 'B' ? 'rgba(79, 172, 254, 0.6)' : 'rgba(255, 255, 255, 0.2)'}`,
                              background: question.correct === 'B' ? 'rgba(79, 172, 254, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                              color: 'white'
                            }}>
                              <strong>B:</strong> {question.options.b}
                            </span>
                            <span style={{
                              padding: '8px',
                              borderRadius: '8px',
                              border: `2px solid ${question.correct === 'C' ? 'rgba(79, 172, 254, 0.6)' : 'rgba(255, 255, 255, 0.2)'}`,
                              background: question.correct === 'C' ? 'rgba(79, 172, 254, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                              color: 'white'
                            }}>
                              <strong>C:</strong> {question.options.c}
                            </span>
                            <span style={{
                              padding: '8px',
                              borderRadius: '8px',
                              border: `2px solid ${question.correct === 'D' ? 'rgba(79, 172, 254, 0.6)' : 'rgba(255, 255, 255, 0.2)'}`,
                              background: question.correct === 'D' ? 'rgba(79, 172, 254, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                              color: 'white'
                            }}>
                              <strong>D:</strong> {question.options.d}
                            </span>
                          </div>

                          {/* Edit marks & time */}
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '12px' }}>
                            <div>
                              <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '12px', marginBottom: '6px' }}>Marks</div>
                              <input
                                type="number"
                                min={0}
                                value={question.marks ?? 1}
                                onChange={(e) => {
                                  const newQuestions = [...editSessionData.questions];
                                  newQuestions[index] = { ...newQuestions[index], marks: Number(e.target.value) };
                                  setEditSessionData({ ...editSessionData, questions: newQuestions });
                                }}
                                style={s.input}
                              />
                            </div>
                            <div>
                              <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '12px', marginBottom: '6px' }}>Time (s)</div>
                              <input
                                type="number"
                                min={1}
                                value={question.timeSeconds ?? 60}
                                onChange={(e) => {
                                  const newQuestions = [...editSessionData.questions];
                                  newQuestions[index] = { ...newQuestions[index], timeSeconds: Number(e.target.value) };
                                  setEditSessionData({ ...editSessionData, questions: newQuestions });
                                }}
                                style={s.input}
                              />
                            </div>
                          </div>
                          <div style={{ textAlign: 'center', marginTop: '10px' }}>
                            <span style={{
                              background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                              color: 'white',
                              padding: '6px 12px',
                              borderRadius: '16px',
                              fontSize: '12px',
                              fontWeight: 'bold',
                              display: 'inline-block'
                            }}>
                              ✓ {question.correct}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {editSessionData.passages && editSessionData.passages.length > 0 && (
                    <div style={{ marginTop: '20px' }}>
                      <h4 style={s.sectionTitle}>📖 Passages ({editSessionData.passages.length})</h4>
                      <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                        {editSessionData.passages.map((passage, index) => (
                          <div key={index} style={s.questionPreviewCard}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <strong style={{ color: 'white', fontSize: '16px' }}>{passage.title}</strong>
                              <button 
                                style={{
                                  ...s.button,
                                  ...s.buttonDanger,
                                  padding: '6px 12px',
                                  fontSize: '12px'
                                }}
                                onClick={() => {
                                  const newPassages = editSessionData.passages.filter((_, i) => i !== index);
                                  setEditSessionData({ ...editSessionData, passages: newPassages });
                                }}
                                onMouseEnter={(e) => {
                                  Object.assign(e.currentTarget.style, s.buttonHover);
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.transform = '';
                                  e.currentTarget.style.boxShadow = s.buttonDanger.boxShadow;
                                }}
                              >
                                🗑️
                              </button>
                            </div>
                            <p style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.7)', marginTop: '8px' }}>
                              {passage.content.substring(0, 100)}...
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {editSessionData.audioFiles && editSessionData.audioFiles.length > 0 && (
                    <div style={{ marginTop: '20px' }}>
                      <h4 style={s.sectionTitle}>🎵 Audio Files ({editSessionData.audioFiles.length})</h4>
                      <div style={{ maxHeight: '150px', overflowY: 'auto' }}>
                        {editSessionData.audioFiles.map((audio, index) => (
                          <div key={index} style={s.questionPreviewCard}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <span style={{ fontSize: '14px', color: 'white' }}>🎵 {audio.originalName}</span>
                              <button 
                                style={{
                                  ...s.button,
                                  ...s.buttonDanger,
                                  padding: '6px 12px',
                                  fontSize: '12px'
                                }}
                                onClick={() => {
                                  const newAudioFiles = editSessionData.audioFiles.filter((_, i) => i !== index);
                                  setEditSessionData({ ...editSessionData, audioFiles: newAudioFiles });
                                }}
                                onMouseEnter={(e) => {
                                  Object.assign(e.currentTarget.style, s.buttonHover);
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.transform = '';
                                  e.currentTarget.style.boxShadow = s.buttonDanger.boxShadow;
                                }}
                              >
                                🗑️
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div style={s.buttonGroup}>
                    <button 
                      style={s.button}
                      onClick={handleUpdateSession}
                      onMouseEnter={(e) => {
                        Object.assign(e.currentTarget.style, s.buttonHover);
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = '';
                        e.currentTarget.style.boxShadow = s.button.boxShadow;
                      }}
                    >
                      ✅ Update Session
                    </button>
                    <button 
                      style={{
                        ...s.button,
                        ...s.buttonSecondary
                      }}
                      onClick={cancelEditSession}
                      onMouseEnter={(e) => {
                        Object.assign(e.currentTarget.style, s.buttonHover);
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = '';
                        e.currentTarget.style.boxShadow = s.buttonSecondary.boxShadow;
                      }}
                    >
                      ❌ Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <h3 style={s.sessionTitle}>{session.name}</h3>
                  <div style={s.sessionInfo}>
                    <div style={s.infoItem}>
                      <div style={s.infoLabel}>Session ID</div>
                      <div style={s.infoValue}>{session.sessionId}</div>
                    </div>
                    <div style={s.infoItem}>
                      <div style={s.infoLabel}>Status</div>
                      <div>
                        <span style={s.statusBadge(session.isActive)}>
                          {session.isActive ? '🟢 Active' : '🔴 Inactive'}
                        </span>
                      </div>
                    </div>
                    <div style={s.infoItem}>
                      <div style={s.infoLabel}>Questions</div>
                      <div style={s.infoValue}>{session.questions.length}</div>
                    </div>
                    {session.passages && session.passages.length > 0 && (
                      <div style={s.infoItem}>
                        <div style={s.infoLabel}>Passages</div>
                        <div style={s.infoValue}>{session.passages.length}</div>
                      </div>
                    )}
                    {session.audioFiles && session.audioFiles.length > 0 && (
                      <div style={s.infoItem}>
                        <div style={s.infoLabel}>Audio Files</div>
                        <div style={s.infoValue}>{session.audioFiles.length}</div>
                      </div>
                    )}
                    <div style={s.infoItem}>
                      <div style={s.infoLabel}>Created</div>
                      <div style={{ ...s.infoValue, fontSize: '14px' }}>
                        {new Date(session.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  
                  <div style={s.buttonGroup}>
                    <button 
                      style={{
                        ...s.button,
                        ...s.buttonSuccess,
                        ...(loading || session.isActive ? s.buttonDisabled : {})
                      }}
                      onClick={() => handleStartQuiz(session.sessionId)} 
                      disabled={loading || session.isActive}
                      onMouseEnter={(e) => {
                        if (!loading && !session.isActive) {
                          Object.assign(e.currentTarget.style, s.buttonHover);
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!loading && !session.isActive) {
                          e.currentTarget.style.transform = '';
                          e.currentTarget.style.boxShadow = s.buttonSuccess.boxShadow;
                        }
                      }}
                    >
                      ▶️ Start
                    </button>
                    <button 
                      style={{
                        ...s.button,
                        ...s.buttonDanger,
                        ...(loading || !session.isActive ? s.buttonDisabled : {})
                      }}
                      onClick={() => handleEndQuiz(session.sessionId)} 
                      disabled={loading || !session.isActive}
                      onMouseEnter={(e) => {
                        if (!loading && session.isActive) {
                          Object.assign(e.currentTarget.style, s.buttonHover);
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!loading && session.isActive) {
                          e.currentTarget.style.transform = '';
                          e.currentTarget.style.boxShadow = s.buttonDanger.boxShadow;
                        }
                      }}
                    >
                      ⏹️ End
                    </button>
                    <button 
                      style={{
                        ...s.button,
                        ...s.buttonInfo,
                        ...(loading ? s.buttonDisabled : {})
                      }}
                      onClick={() => handleGenerateLink(session.sessionId)} 
                      disabled={loading}
                      onMouseEnter={(e) => {
                        if (!loading) {
                          Object.assign(e.currentTarget.style, s.buttonHover);
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!loading) {
                          e.currentTarget.style.transform = '';
                          e.currentTarget.style.boxShadow = s.buttonInfo.boxShadow;
                        }
                      }}
                    >
                      🔗 Link
                    </button>
                    <button 
                      style={{
                        ...s.button,
                        ...s.buttonInfo
                      }}
                      onClick={() => handleEditSession(session)}
                      onMouseEnter={(e) => {
                        Object.assign(e.currentTarget.style, s.buttonHover);
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = '';
                        e.currentTarget.style.boxShadow = s.buttonInfo.boxShadow;
                      }}
                    >
                      ✏️ Edit
                    </button>
                    <button 
                      style={{
                        ...s.button,
                        ...s.buttonDanger
                      }}
                      onClick={() => handleDeleteSession(session.sessionId)}
                      onMouseEnter={(e) => {
                        Object.assign(e.currentTarget.style, s.buttonHover);
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = '';
                        e.currentTarget.style.boxShadow = s.buttonDanger.boxShadow;
                      }}
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        {/* Delete Confirmation Modal */}
        <ConfirmModal
          show={showDeleteConfirm}
          title="Delete Quiz Session"
          message="Are you sure you want to delete this quiz session? This will also delete all associated results and violations. This action cannot be undone."
          confirmText="Delete"
          cancelText="Cancel"
          onConfirm={confirmDeleteSession}
          onCancel={cancelDeleteSession}
          confirmButtonStyle="danger"
        />
      </div>
    </div>
  );
};

export default ManageSessions;