import React, { useState, useEffect } from 'react';
import { getApiBaseUrl } from '../../config/api';
import { useNavigate } from 'react-router-dom';
import { styles } from '../common/styles';
import LoadingError from '../common/LoadingError';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CreateQuiz from './CreateQuiz';
import ManageSessions from './ManageSessions';
import ViewResults from './ViewResults';
import Violations from './Violations';
import LogoutButton from '../LogoutButton';

const Admin = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [adminCode, setAdminCode] = useState('');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [activeAdminSection, setActiveAdminSection] = useState(null);
  const [quizSessions, setQuizSessions] = useState([]);
  const [currentSessionId, setCurrentSessionId] = useState('');
  const [showSessionModal, setShowSessionModal] = useState(false);
  const [sessionName, setSessionName] = useState("");


  const API_BASE_URL = getApiBaseUrl();

  const apiCall = async (endpoint, method = 'GET', data = null) => {
    setLoading(true);
    setError('');
    try {
      const config = {
        method,
        headers: { 'Content-Type': 'application/json' },
      };
      if (data) config.body = JSON.stringify(data);
      const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const result = await response.json();
      setLoading(false);
      return result;
    } catch (error) {
      setLoading(false);
      setError(error.message);
      console.error('API Error:', error);
      throw error;
    }
  };

  const handleAdminLogin = async () => {
    try {
      const response = await apiCall('/api/admin/login', 'POST', { adminCode });
      if (response.success) {
        setUser({ role: 'admin' });
        setIsAdminAuthenticated(true);
        await loadQuizSessions();
      } else {
        toast.error('Invalid admin code!');
      }
    } catch (error) {
      toast.error('Login failed: ' + error.message);
    }
  };

  const loadQuizSessions = async () => {
    if (!user || !user.email) {
      console.error('No user email available');
      return;
    }
    
    try {
      const sessions = await apiCall(`/api/quiz-sessions?adminEmail=${encodeURIComponent(user.email)}`);
      setQuizSessions(sessions);
    } catch (error) {
      toast.error('Failed to load quiz sessions: ' + error.message);
    }
  };

  const handleOpenSessionModal = () => {
  setSessionName('');
  setShowSessionModal(true);
};

const handleCloseSessionModal = () => {
  setShowSessionModal(false);
  setSessionName('');
};

const handleCreateSession = async () => {
  if (sessionName.trim() && user) {
    try {
      const newSession = await apiCall('/api/quiz-sessions', 'POST', { 
        name: sessionName.trim(), 
        createdBy: user.email,
        adminUserId: user._id
      });
      setCurrentSessionId(newSession.sessionId);
      setActiveAdminSection('create');
      await loadQuizSessions();
      handleCloseSessionModal();
      toast.success(`Session created with ID: ${newSession.sessionId}`);
    } catch (error) {
      toast.error('Failed to create session: ' + error.message);
    }
  }
};


  useEffect(() => {
    if (user && user.role === 'admin') {
      setIsAdminAuthenticated(true);
      loadQuizSessions();
    }
  }, [user]);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
    }
  }, []);

  // Admin Login Screen
  if (!isAdminAuthenticated) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <ToastContainer />
          <LoadingError loading={loading} error={error} />
          {user && user.email && (
            <div style={{
              textAlign: 'right',
              marginBottom: '15px',
              padding: '10px',
              background: 'rgba(102, 126, 234, 0.1)',
              borderRadius: '8px',
              fontSize: '14px',
              color: '#667eea',
              fontWeight: '500'
            }}>
              Logged in as: <span style={{ fontWeight: '600' }}>{user.email}</span>
            </div>
          )}
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <h2>Admin Login</h2>
            <p style={{ color: '#666' }}>Enter admin code to continue</p>
          </div>
          <input
            type="password"
            placeholder="Enter admin code"
            value={adminCode}
            onChange={(e) => setAdminCode(e.target.value)}
            style={styles.input}
            onKeyPress={(e) => e.key === 'Enter' && handleAdminLogin()}
            disabled={loading}
          />
          <div style={{ textAlign: 'center' }}>
            <button style={styles.button} onClick={handleAdminLogin} disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Route to specific sections
  if (activeAdminSection === 'create') {
    return (
      <>
        <ToastContainer />
        <CreateQuiz
          currentSessionId={currentSessionId}
          quizSessions={quizSessions}
          loading={loading}
          error={error}
          setActiveAdminSection={setActiveAdminSection}
          loadQuizSessions={loadQuizSessions}
          user={user}
          API_BASE_URL={API_BASE_URL}
        />
      </>
    );
  }

  if (activeAdminSection === 'sessions') {
    return (
      <>
        <ToastContainer />
        <ManageSessions
          quizSessions={quizSessions}
          loading={loading}
          error={error}
          setActiveAdminSection={setActiveAdminSection}
          loadQuizSessions={loadQuizSessions}
          user={user}
          API_BASE_URL={API_BASE_URL}
        />
      </>
    );
  }

  if (activeAdminSection === 'results') {
    return (
      <>
        <ToastContainer />
        <ViewResults
          quizSessions={quizSessions}
          loading={loading}
          error={error}
          setActiveAdminSection={setActiveAdminSection}
          user={user}
          API_BASE_URL={API_BASE_URL}
        />
      </>
    );
  }

  if (activeAdminSection === 'violations') {
    return (
      <>
        <ToastContainer />
        <Violations
          loading={loading}
          error={error}
          setActiveAdminSection={setActiveAdminSection}
          user={user}
          API_BASE_URL={API_BASE_URL}
        />
      </>
    );
  }

  // Main Dashboard
  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #1a1a2e 100%)',
      padding: '40px 20px',
      position: 'relative'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <ToastContainer />
        <LoadingError loading={loading} error={error} />
        <div style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '15px',
          zIndex: 10
        }}>
          {user && user.email && (
            <div style={{
              padding: '10px 15px',
              background: 'rgba(102, 126, 234, 0.2)',
              backdropFilter: 'blur(10px)',
              borderRadius: '8px',
              fontSize: '14px',
              color: '#bb86fc',
              fontWeight: '500',
              border: '1px solid rgba(187, 134, 252, 0.3)'
            }}>
              Logged in as: <span style={{ fontWeight: '600' }}>{user.email}</span>
            </div>
          )}
          <LogoutButton />
        </div>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h1 style={{ 
            fontSize: '48px', 
            fontWeight: 'bold', 
            color: 'white', 
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '15px'
          }}>
            <span style={{ fontSize: '40px' }}></span>
            Admin Gateway
            <span style={{ fontSize: '40px' }}></span>
          </h1>
          
          <div style={{
            display: 'inline-block',
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            border: '2px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '50px',
            padding: '15px 30px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
          }}>
            <p style={{ 
              color: 'white', 
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              margin: 0
            }}>
              <span style={{ color: '#bb86fc' }}>👥</span>
              Total Sessions: <span style={{ color: '#bb86fc', fontSize: '22px' }}>{quizSessions.length}</span>
            </p>
          </div>
        </div>

        {/* Cards Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(2, 1fr)', 
          gap: '25px', 
          marginBottom: '40px' 
        }}>
          {/* Create Quiz Card */}
          <div style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '30px',
            padding: '40px',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
            transform: 'translateY(0)',
            transition: 'all 0.3s ease',
            cursor: 'pointer',
            position: 'relative',
            overflow: 'hidden'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
            e.currentTarget.style.boxShadow = '0 25px 80px rgba(102, 126, 234, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.3)';
          }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(10px)',
              borderRadius: '20px',
              padding: '25px',
              display: 'inline-block',
              marginBottom: '25px'
            }}>
              <span style={{ fontSize: '64px' }}>📝</span>
            </div>
            <h3 style={{ fontSize: '32px', fontWeight: 'bold', color: 'white', marginBottom: '25px' }}>
              Create Quiz
            </h3>
            <button 
              style={{
                background: 'white',
                color: '#667eea',
                fontWeight: 'bold',
                padding: '16px 48px',
                borderRadius: '20px',
                border: 'none',
                fontSize: '20px',
                cursor: 'pointer',
                boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
                transition: 'all 0.3s ease'
              }}
              onClick={handleOpenSessionModal} 
              disabled={loading}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.1)';
                e.currentTarget.style.boxShadow = '0 12px 30px rgba(0, 0, 0, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.2)';
              }}
            >
              Create
            </button>
          </div>

          {/* View Results Card */}
          <div style={{
            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            borderRadius: '30px',
            padding: '40px',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
            transform: 'translateY(0)',
            transition: 'all 0.3s ease',
            cursor: 'pointer',
            position: 'relative',
            overflow: 'hidden'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
            e.currentTarget.style.boxShadow = '0 25px 80px rgba(240, 147, 251, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.3)';
          }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(10px)',
              borderRadius: '20px',
              padding: '25px',
              display: 'inline-block',
              marginBottom: '25px'
            }}>
              <span style={{ fontSize: '64px' }}>📊</span>
            </div>
            <h3 style={{ fontSize: '32px', fontWeight: 'bold', color: 'white', marginBottom: '25px' }}>
              View Results
            </h3>
            <button 
              style={{
                background: 'white',
                color: '#f5576c',
                fontWeight: 'bold',
                padding: '16px 48px',
                borderRadius: '20px',
                border: 'none',
                fontSize: '20px',
                cursor: 'pointer',
                boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
                transition: 'all 0.3s ease'
              }}
              onClick={() => setActiveAdminSection('results')} 
              disabled={loading}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.1)';
                e.currentTarget.style.boxShadow = '0 12px 30px rgba(0, 0, 0, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.2)';
              }}
            >
              View
            </button>
          </div>

          {/* Quiz Sessions Card */}
          <div style={{
            background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            borderRadius: '30px',
            padding: '40px',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
            transform: 'translateY(0)',
            transition: 'all 0.3s ease',
            cursor: 'pointer',
            position: 'relative',
            overflow: 'hidden'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
            e.currentTarget.style.boxShadow = '0 25px 80px rgba(79, 172, 254, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.3)';
          }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(10px)',
              borderRadius: '20px',
              padding: '25px',
              display: 'inline-block',
              marginBottom: '25px'
            }}>
              <span style={{ fontSize: '64px' }}>📋</span>
            </div>
            <h3 style={{ fontSize: '32px', fontWeight: 'bold', color: 'white', marginBottom: '25px' }}>
              Quiz Sessions
            </h3>
            <button 
              style={{
                background: 'white',
                color: '#4facfe',
                fontWeight: 'bold',
                padding: '16px 48px',
                borderRadius: '20px',
                border: 'none',
                fontSize: '20px',
                cursor: 'pointer',
                boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
                transition: 'all 0.3s ease'
              }}
              onClick={() => setActiveAdminSection('sessions')} 
              disabled={loading}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.1)';
                e.currentTarget.style.boxShadow = '0 12px 30px rgba(0, 0, 0, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.2)';
              }}
            >
              Manage
            </button>
          </div>

          {/* Quiz Violations Card */}
          <div style={{
            background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
            borderRadius: '30px',
            padding: '40px',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
            transform: 'translateY(0)',
            transition: 'all 0.3s ease',
            cursor: 'pointer',
            position: 'relative',
            overflow: 'hidden'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
            e.currentTarget.style.boxShadow = '0 25px 80px rgba(250, 112, 154, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.3)';
          }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(10px)',
              borderRadius: '20px',
              padding: '25px',
              display: 'inline-block',
              marginBottom: '25px'
            }}>
              <span style={{ fontSize: '64px' }}>⚠️</span>
            </div>
            <h3 style={{ fontSize: '32px', fontWeight: 'bold', color: 'white', marginBottom: '25px' }}>
              Quiz Violations
            </h3>
            <button 
              style={{
                background: 'white',
                color: '#fa709a',
                fontWeight: 'bold',
                padding: '16px 48px',
                borderRadius: '20px',
                border: 'none',
                fontSize: '20px',
                cursor: 'pointer',
                boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
                transition: 'all 0.3s ease'
              }}
              onClick={() => setActiveAdminSection('violations')} 
              disabled={loading}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.1)';
                e.currentTarget.style.boxShadow = '0 12px 30px rgba(0, 0, 0, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.2)';
              }}
            >
              View
            </button>
          </div>
        </div>

        {/* Footer Stats */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(3, 1fr)', 
          gap: '25px' 
        }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            border: '2px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '20px',
            padding: '30px',
            textAlign: 'center',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}>
            <div style={{ fontSize: '40px', marginBottom: '10px' }}>🎯</div>
            <div style={{ 
              fontSize: '36px', 
              fontWeight: 'bold', 
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '10px'
            }}>
              {quizSessions.filter(s => s.isActive).length}
            </div>
            <div style={{ color: '#d1d5db', fontWeight: '500', fontSize: '18px' }}>Active Quizzes</div>
          </div>
          
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            border: '2px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '20px',
            padding: '30px',
            textAlign: 'center',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}>
            <div style={{ fontSize: '40px', marginBottom: '10px' }}>👥</div>
            <div style={{ 
              fontSize: '36px', 
              fontWeight: 'bold', 
              background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '10px'
            }}>
              {quizSessions.length}
            </div>
            <div style={{ color: '#d1d5db', fontWeight: '500', fontSize: '18px' }}>Total Sessions</div>
          </div>
          
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            border: '2px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '20px',
            padding: '30px',
            textAlign: 'center',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}>
            <div style={{ fontSize: '40px', marginBottom: '10px' }}>⭐</div>
            <div style={{ 
              fontSize: '36px', 
              fontWeight: 'bold', 
              background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '10px'
            }}>
              {quizSessions.reduce((sum, s) => sum + (s.questions?.length || 0), 0)}
            </div>
            <div style={{ color: '#d1d5db', fontWeight: '500', fontSize: '18px' }}>Total Questions</div>
          </div>
          {/* Session Creation Modal */}
{showSessionModal && (
  <div style={{
    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
    background: 'rgba(0, 0, 0, 0.7)', backdropFilter: 'blur(5px)',
    display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
  }}>
    <div style={{
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
      borderRadius: '24px', padding: '40px', minWidth: '400px', maxWidth: '500px',
      border: '2px solid rgba(187, 134, 252, 0.3)', boxShadow: '0 25px 80px rgba(0, 0, 0, 0.5)'
    }}>
      <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: 'white', marginBottom: '10px', textAlign: 'center' }}>
        📝 Create New Session
      </h2>
      <p style={{ color: '#9ca3af', textAlign: 'center', marginBottom: '30px' }}>Enter a name for your quiz session</p>
      <input type="text" placeholder="Enter session name..." value={sessionName}
        onChange={(e) => setSessionName(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleCreateSession()} autoFocus
        style={{ width: '100%', padding: '16px 20px', fontSize: '18px', border: '2px solid rgba(187, 134, 252, 0.3)',
          borderRadius: '12px', background: 'rgba(255, 255, 255, 0.05)', color: 'white', outline: 'none',
          marginBottom: '25px', boxSizing: 'border-box' }}
      />
      <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
        <button onClick={handleCloseSessionModal} style={{ padding: '14px 32px', fontSize: '16px', fontWeight: '600',
          borderRadius: '12px', border: '2px solid rgba(255, 255, 255, 0.2)', background: 'transparent', color: 'white', cursor: 'pointer' }}>
          Cancel
        </button>
        <button onClick={handleCreateSession} disabled={!sessionName.trim() || loading}
          style={{ padding: '14px 32px', fontSize: '16px', fontWeight: '600', borderRadius: '12px', border: 'none',
            background: sessionName.trim() ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'rgba(255, 255, 255, 0.1)',
            color: 'white', cursor: sessionName.trim() ? 'pointer' : 'not-allowed' }}>
          {loading ? 'Creating...' : 'Create Session'}
        </button>
      </div>
    </div>
  </div>
)}

        </div>
      </div>
    </div>
  );
};
export default Admin;