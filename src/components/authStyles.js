export const authStyles = {
  // Animated gradient background
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)',
    backgroundSize: '400% 400%',
    animation: 'gradientFlow 15s ease infinite',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    position: 'relative',
    overflow: 'hidden'
  },

  // Floating bubbles background
  bubbleContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    pointerEvents: 'none',
    overflow: 'hidden',
    zIndex: 0
  },

  bubble: (delay, duration, left, size) => ({
    position: 'absolute',
    width: `${size}px`,
    height: `${size}px`,
    borderRadius: '50%',
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(2px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    bottom: '-100px',
    left: `${left}%`,
    animation: `bubbleRise ${duration}s ease-in ${delay}s infinite`,
    boxShadow: '0 8px 16px rgba(255, 255, 255, 0.1)'
  }),

  // Floating particles
  particleContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    pointerEvents: 'none',
    zIndex: 0
  },

  particle: (delay, left, duration) => ({
    position: 'absolute',
    width: '4px',
    height: '4px',
    borderRadius: '50%',
    background: '#ffffff',
    left: `${left}%`,
    top: '-10px',
    opacity: 0.6,
    animation: `particleFall ${duration}s linear ${delay}s infinite`,
    boxShadow: '0 0 10px rgba(255, 255, 255, 0.8)'
  }),

  // Main card
  card: {
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(20px)',
    borderRadius: '24px',
    padding: '40px',
    maxWidth: '500px',
    width: '100%',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
    border: '1px solid rgba(255, 255, 255, 0.8)',
    animation: 'cardEntrance 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
    position: 'relative',
    zIndex: 1
  },

  // Logo container
  logoContainer: {
    textAlign: 'center',
    marginBottom: '30px',
    animation: 'fadeInDown 1s ease-out'
  },

  logo: {
    maxWidth: '120px',
    height: 'auto',
    marginBottom: '10px',
    animation: 'logoSpin 20s linear infinite',
    filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1))'
  },

  collegeName: {
    fontSize: '2rem',
    color: '#800000',
    fontWeight: 'bold',
    margin: '10px 0',
    background: 'linear-gradient(135deg, #800000, #b30000)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    animation: 'textShimmer 3s ease-in-out infinite'
  },

  departmentName: {
    fontSize: '1.5rem',
    color: '#333',
    marginBottom: '10px',
    fontWeight: '600'
  },

  testTitle: {
    fontSize: '1.2rem',
    color: '#555',
    marginBottom: '20px',
    fontWeight: '500'
  },

  // Form container
  formContainer: {
    maxWidth: '400px',
    margin: '0 auto',
    animation: 'fadeIn 1s ease-out 0.3s both'
  },

  // Input field
  input: {
    width: '100%',
    padding: '14px 18px',
    fontSize: '15px',
    border: '2px solid #e0e0e0',
    borderRadius: '12px',
    marginBottom: '16px',
    background: '#ffffff',
    color: '#2d3748',
    fontWeight: '500',
    transition: 'all 0.3s ease',
    boxSizing: 'border-box',
    outline: 'none'
  },

  inputFocus: {
    border: '2px solid #667eea',
    boxShadow: '0 0 0 3px rgba(102, 126, 234, 0.1)',
    transform: 'translateY(-2px)'
  },

  // Button
  button: {
    width: '100%',
    padding: '14px 32px',
    fontSize: '16px',
    fontWeight: '600',
    border: 'none',
    borderRadius: '12px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: '#ffffff',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
    position: 'relative',
    overflow: 'hidden'
  },

  buttonHover: {
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 20px rgba(102, 126, 234, 0.6)'
  },

  buttonDisabled: {
    opacity: 0.6,
    cursor: 'not-allowed',
    transform: 'none'
  },

  // Register button
  registerButton: {
    background: 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)',
    boxShadow: '0 4px 15px rgba(76, 175, 80, 0.4)'
  },

  registerButtonHover: {
    boxShadow: '0 6px 20px rgba(76, 175, 80, 0.6)'
  },

  // Back button
  backButton: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)'
  },

  // Button shine effect
  buttonShine: {
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
    animation: 'buttonShine 3s infinite'
  },

  // Text styles
  text: {
    textAlign: 'center',
    marginTop: '20px'
  },

  textContent: {
    color: '#666',
    fontSize: '14px',
    marginBottom: '10px'
  },

  // Error message
  errorMessage: {
    background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%)',
    color: '#ffffff',
    padding: '12px 16px',
    borderRadius: '10px',
    marginBottom: '16px',
    fontSize: '14px',
    fontWeight: '500',
    textAlign: 'center',
    animation: 'shake 0.5s ease-in-out',
    boxShadow: '0 4px 12px rgba(255, 107, 107, 0.3)'
  },

  // Decorative elements
  decorCircle1: {
    position: 'absolute',
    width: '200px',
    height: '200px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(102, 126, 234, 0.2) 0%, transparent 70%)',
    top: '-100px',
    right: '-100px',
    animation: 'pulse 4s ease-in-out infinite',
    pointerEvents: 'none'
  },

  decorCircle2: {
    position: 'absolute',
    width: '150px',
    height: '150px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(231, 60, 126, 0.2) 0%, transparent 70%)',
    bottom: '-75px',
    left: '-75px',
    animation: 'pulse 5s ease-in-out infinite 1s',
    pointerEvents: 'none'
  },

  // Form icons
  iconContainer: {
    position: 'relative'
  },

  inputIcon: {
    position: 'absolute',
    left: '15px',
    top: '50%',
    transform: 'translateY(-50%)',
    fontSize: '18px',
    color: '#999',
    pointerEvents: 'none'
  }
};

// CSS Animations
export const authAnimations = `
@keyframes gradientFlow {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

@keyframes cardEntrance {
  0% {
    opacity: 0;
    transform: scale(0.9) translateY(30px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

@keyframes fadeInDown {
  0% {
    opacity: 0;
    transform: translateY(-20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes logoSpin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes textShimmer {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.8; }
}

@keyframes bubbleRise {
  0% {
    transform: translateY(0) scale(1);
    opacity: 0;
  }
  10% {
    opacity: 0.8;
  }
  90% {
    opacity: 0.8;
  }
  100% {
    transform: translateY(-100vh) scale(1.2);
    opacity: 0;
  }
}

@keyframes particleFall {
  0% {
    transform: translateY(0);
    opacity: 0;
  }
  10% {
    opacity: 0.8;
  }
  90% {
    opacity: 0.8;
  }
  100% {
    transform: translateY(100vh);
    opacity: 0;
  }
}

@keyframes buttonShine {
  0% { left: -100%; }
  50%, 100% { left: 100%; }
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 0.3;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.5;
  }
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
  20%, 40%, 60%, 80% { transform: translateX(5px); }
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}
`;