import React, { useState } from 'react';
import { gradientStyles } from './gradientStyles';
import LoadingError from '../common/LoadingError';
import { ToastContainer } from 'react-toastify';

const CodeEntry = ({ loading, error, quizCode, setQuizCode, handleJoinQuiz, loggedInUser }) => {
  const [inputFocused, setInputFocused] = useState(false);

  return (
    <div style={gradientStyles.container}>
      <div style={gradientStyles.card}>
        <ToastContainer />
        <LoadingError loading={loading} error={error} />
        
        {loggedInUser && (
          <div style={gradientStyles.userInfoBanner}>
            Logged in as: <span style={gradientStyles.userEmail}>{loggedInUser.email}</span>
          </div>
        )}

        <div style={gradientStyles.header}>
          <h2 style={gradientStyles.title}>Join a Quiz</h2>
          <p style={gradientStyles.subtitle}>Enter the quiz code provided by your instructor</p>
        </div>

        <input
          type="text"
          placeholder="Enter quiz code"
          value={quizCode}
          onChange={(e) => setQuizCode(e.target.value)}
          style={{
            ...gradientStyles.input,
            ...(inputFocused ? gradientStyles.inputFocus : {})
          }}
          onFocus={() => setInputFocused(true)}
          onBlur={() => setInputFocused(false)}
          onKeyPress={(e) => e.key === 'Enter' && handleJoinQuiz()}
          disabled={loading}
        />

        <div style={gradientStyles.centerContent}>
          <button 
            style={{
              ...gradientStyles.button,
              ...(loading ? gradientStyles.buttonDisabled : {})
            }}
            onClick={handleJoinQuiz} 
            disabled={loading}
            onMouseEnter={(e) => {
              if (!loading) {
                Object.assign(e.target.style, gradientStyles.buttonHover);
              }
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
            }}
          >
            {loading ? 'Joining...' : 'Join Quiz'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CodeEntry;