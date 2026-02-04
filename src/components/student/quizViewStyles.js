export const quizViewStyles = {
  // Main container with gradient background
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
    padding: '20px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    paddingBottom: '100px' // Space for navigation panel
  },

  // Warning banner at the top
  warningBanner: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%)',
    color: '#ffffff',
    padding: '15px 20px',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: '15px',
    zIndex: 1000,
    boxShadow: '0 4px 12px rgba(255, 107, 107, 0.3)',
    animation: 'slideDown 0.3s ease-out'
  },

  // Main quiz card
  card: {
    maxWidth: '900px',
    margin: '0 auto',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    borderRadius: '20px',
    padding: '30px',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4)',
    position: 'relative',
    overflow: 'hidden'
  },

  // User info banner
  userInfoBanner: {
    textAlign: 'right',
    marginBottom: '15px',
    padding: '10px 16px',
    background: 'rgba(255, 255, 255, 0.2)',
    backdropFilter: 'blur(10px)',
    borderRadius: '10px',
    fontSize: '14px',
    color: '#ffffff',
    fontWeight: '500',
    border: '1px solid rgba(255, 255, 255, 0.3)'
  },

  // Timer display
  timer: {
    fontSize: '32px',
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: '20px',
    padding: '15px',
    background: 'rgba(255, 255, 255, 0.25)',
    backdropFilter: 'blur(10px)',
    borderRadius: '16px',
    color: '#ffffff',
    border: '2px solid rgba(255, 255, 255, 0.3)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    letterSpacing: '2px',
    fontFamily: 'monospace'
  },

  // Progress bar container
  progressBar: {
    width: '100%',
    height: '8px',
    background: 'rgba(255, 255, 255, 0.2)',
    borderRadius: '10px',
    marginBottom: '25px',
    overflow: 'hidden',
    border: '1px solid rgba(255, 255, 255, 0.3)'
  },

  // Progress fill (function that returns style based on progress)
  progressFill: (progress) => ({
    width: `${progress}%`,
    height: '100%',
    background: 'linear-gradient(90deg, #ffffff 0%, #f0f0f0 100%)',
    borderRadius: '10px',
    transition: 'width 0.3s ease',
    boxShadow: '0 0 10px rgba(255, 255, 255, 0.5)'
  }),

  // Question card
  questionCard: {
    background: 'rgba(255, 255, 255, 0.95)',
    padding: '25px',
    borderRadius: '16px',
    marginBottom: '25px',
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.5)'
  },

  // Audio player
  audioPlayer: {
    marginBottom: '20px',
    padding: '15px',
    background: 'rgba(255, 255, 255, 0.2)',
    backdropFilter: 'blur(10px)',
    borderRadius: '12px',
    border: '1px solid rgba(255, 255, 255, 0.3)'
  },

  // Passage button
  passageButton: {
    padding: '12px 24px',
    margin: '10px 10px 10px 0',
    background: 'rgba(255, 255, 255, 0.9)',
    color: '#667eea',
    border: '2px solid rgba(255, 255, 255, 0.5)',
    borderRadius: '10px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
  },

  passageButtonHover: {
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
    background: '#ffffff'
  },

  // Option styling (function that returns style based on selection)
  option: (isSelected) => ({
    padding: '16px 20px',
    margin: '12px 0',
    background: isSelected 
      ? 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)'
      : 'rgba(255, 255, 255, 0.9)',
    border: isSelected 
      ? '3px solid #ffffff' 
      : '2px solid rgba(255, 255, 255, 0.4)',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontSize: '15px',
    fontWeight: isSelected ? '600' : '500',
    color: '#2d3748',
    boxShadow: isSelected 
      ? '0 4px 16px rgba(0, 0, 0, 0.15)' 
      : '0 2px 8px rgba(0, 0, 0, 0.08)',
    transform: isSelected ? 'scale(1.02)' : 'scale(1)'
  }),

  optionHover: {
    background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
    transform: 'scale(1.02)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.12)'
  },

  // Navigation buttons
  button: {
    padding: '12px 32px',
    fontSize: '15px',
    fontWeight: '600',
    border: 'none',
    borderRadius: '10px',
    background: '#ffffff',
    color: '#667eea',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    minWidth: '120px'
  },

  buttonHover: {
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 16px rgba(0, 0, 0, 0.2)'
  },

  buttonDisabled: {
    opacity: 0.5,
    cursor: 'not-allowed',
    background: 'rgba(255, 255, 255, 0.6)'
  },

  // Passage modal
  passageModal: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.8)',
    backdropFilter: 'blur(5px)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    padding: '20px'
  },

  passageContent: {
    background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
    padding: '30px',
    borderRadius: '20px',
    maxWidth: '800px',
    maxHeight: '80vh',
    overflow: 'auto',
    position: 'relative',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
    border: '2px solid rgba(255, 255, 255, 0.8)'
  },

  // Image container
  imageContainer: {
    textAlign: 'center',
    margin: '20px 0'
  },

  questionImage: {
    maxWidth: '100%',
    maxHeight: '400px',
    borderRadius: '12px',
    border: '2px solid rgba(0, 0, 0, 0.1)',
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.15)'
  }
};

// CSS animations (add this to your global CSS or create a separate CSS file)
export const quizViewAnimations = `
@keyframes slideDown {
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.8;
  }
}
`;