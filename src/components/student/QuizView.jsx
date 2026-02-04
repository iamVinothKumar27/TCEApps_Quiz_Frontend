import React, { useState } from 'react';
import { quizViewStyles as styles } from './quizViewStyles';
import { ToastContainer, toast } from 'react-toastify';
import QuestionNavigation from '../common/QuestionNavigation';
import { formatTime } from './studentUtils';

const QuizView = ({ 
  currentQuiz, 
  currentQuestion, 
  userAnswers, 
  timeLeft, 
  selectOption, 
  nextQuestion, 
  previousQuestion, 
  showWarning, 
  warningMessage,
  loggedInUser,
  API_BASE_URL,
  selectedPassage,
  setSelectedPassage,
  showPassageModal,
  setShowPassageModal,
  audioRef,
  isAudioPlaying,
  setIsAudioPlaying,
  setCurrentQuestion
}) => {
  const [hoveredOption, setHoveredOption] = useState(null);
  const [hoveredButton, setHoveredButton] = useState(null);

  const question = currentQuiz.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / currentQuiz.questions.length) * 100;

  // Calculate answered questions (0-based index)
  const answeredQuestions = userAnswers
    .map((ans, idx) => (ans !== null ? idx : null))
    .filter((v) => v !== null);

  return (
    <div style={styles.container}>
      <ToastContainer />
      {showWarning && <div style={styles.warningBanner}>{warningMessage}</div>}
      <div style={styles.card}>
        {loggedInUser && (
          <div style={styles.userInfoBanner}>
            Logged in as: <span style={{ fontWeight: '600' }}>{loggedInUser.email}</span>
          </div>
        )}
        <div style={styles.timer}>{formatTime(timeLeft)}</div>
        <div style={styles.progressBar}>
          <div style={styles.progressFill(progress)}></div>
        </div>
        {currentQuiz?.audioUrl && (
          <div style={{ marginBottom: '20px' }}>
            <audio controls src={currentQuiz.audioUrl} style={{ width: '100%' }} />
          </div>
        )}

        <div style={styles.questionCard}>
          <h3 style={{ marginBottom: '15px', color: '#2d3748', fontSize: '20px' }}>
            Question {currentQuestion + 1} of {currentQuiz.questions.length}
          </h3>
          {question.questionType === 'image' && question.imageUrl && (
            <div style={styles.imageContainer}>
              <img 
                src={`${API_BASE_URL}${question.imageUrl}`}
                alt="Question"
                style={styles.questionImage}
                onError={(e) => {
                  e.target.style.display = 'none';
                  toast.error('Failed to load question image');
                }}
              />
            </div>
          )}
          {question.question && (
            <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#4a5568' }}>
              {question.question}
            </p>
          )}
        </div>

        {currentQuiz.hasAudio && (
          <div style={styles.audioPlayer}>
            <audio
              ref={audioRef}
              src={`${API_BASE_URL}/api/quiz-sessions/${currentQuiz.sessionId}/audio`}
              onPlay={() => setIsAudioPlaying(true)}
              onPause={() => setIsAudioPlaying(false)}
              controls
              style={{ width: '100%' }}
            />
          </div>
        )}

        {currentQuiz.passages && currentQuiz.passages.length > 0 && (
          <div style={{ marginBottom: '20px' }}>
            {currentQuiz.passages.map((passage) => (
              <button
                key={passage._id}
                style={styles.passageButton}
                onClick={() => {
                  setSelectedPassage(passage);
                  setShowPassageModal(true);
                }}
                onMouseEnter={(e) => {
                  Object.assign(e.target.style, styles.passageButtonHover);
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
                  e.target.style.background = 'rgba(255, 255, 255, 0.9)';
                }}
              >
                View Passage: {passage.title}
              </button>
            ))}
          </div>
        )}

        <div>
          {Object.entries(question.options).map(([key, value], index) => {
            const displayNumber = (index + 1).toString();
            const isSelected = userAnswers[currentQuestion] === key.toUpperCase();
            
            return (
              <div
                key={key}
                style={{
                  ...styles.option(isSelected),
                  ...(hoveredOption === index && !isSelected ? styles.optionHover : {})
                }}
                onClick={() => selectOption(index)}
                onMouseEnter={() => setHoveredOption(index)}
                onMouseLeave={() => setHoveredOption(null)}
              >
                {displayNumber}: {value}
              </div>
            );
          })}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
          <button 
            style={{
              ...styles.button,
              ...(currentQuestion === 0 ? styles.buttonDisabled : {}),
              ...(hoveredButton === 'prev' && currentQuestion !== 0 ? styles.buttonHover : {})
            }}
            onClick={previousQuestion} 
            disabled={currentQuestion === 0}
            onMouseEnter={() => setHoveredButton('prev')}
            onMouseLeave={() => setHoveredButton(null)}
          >
            ← Previous
          </button>
          <button 
            style={{
              ...styles.button,
              ...(hoveredButton === 'next' ? styles.buttonHover : {})
            }}
            onClick={nextQuestion}
            onMouseEnter={() => setHoveredButton('next')}
            onMouseLeave={() => setHoveredButton(null)}
          >
            {currentQuestion === currentQuiz.questions.length - 1 ? 'Submit' : 'Next →'}
          </button>
        </div>
      </div>

      {/* Footer Navigation Panel */}
      <QuestionNavigation
        totalQuestions={currentQuiz.questions.length}
        answeredQuestions={answeredQuestions}
        currentQuestion={currentQuestion}
        onNavigate={setCurrentQuestion}
      />

      {showPassageModal && selectedPassage && (
        <div style={styles.passageModal}>
          <div style={styles.passageContent}>
            <button 
              onClick={() => setShowPassageModal(false)} 
              style={{ 
                float: 'right',
                padding: '8px 20px',
                background: '#667eea',
                color: '#ffffff',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '14px'
              }}
            >
              Close
            </button>
            <h3 style={{ color: '#2d3748', marginBottom: '20px', fontSize: '24px' }}>
              {selectedPassage.title}
            </h3>
            <p style={{ 
              whiteSpace: 'pre-wrap', 
              lineHeight: '1.8', 
              color: '#4a5568',
              fontSize: '15px' 
            }}>
              {selectedPassage.content}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizView;