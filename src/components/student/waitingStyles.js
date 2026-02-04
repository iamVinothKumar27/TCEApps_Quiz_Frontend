export const waitingStyles = {
  // Main container with dark gradient
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #434343 0%, #000000 100%)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    position: 'relative',
    overflow: 'hidden'
  },

  // Waiting card with orange-red gradient
  waitingCard: {
    background: 'linear-gradient(135deg, #fc4a1a 0%, #f7b733 100%)',
    borderRadius: '24px',
    padding: '50px 40px',
    maxWidth: '550px',
    width: '100%',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
    textAlign: 'center',
    position: 'relative',
    overflow: 'hidden',
    animation: 'cardPulse 2s ease-in-out infinite'
  },

  // User info banner
  userInfoBanner: {
    textAlign: 'right',
    marginBottom: '20px',
    padding: '12px 16px',
    background: 'rgba(255, 255, 255, 0.2)',
    backdropFilter: 'blur(10px)',
    borderRadius: '12px',
    fontSize: '14px',
    color: '#ffffff',
    fontWeight: '500',
    border: '1px solid rgba(255, 255, 255, 0.3)'
  },

  userEmail: {
    fontWeight: '600',
    color: '#ffffff'
  },

  // Title
  title: {
    fontSize: '36px',
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: '10px',
    textShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
    animation: 'textFloat 3s ease-in-out infinite'
  },

  // Message
  message: {
    fontSize: '18px',
    color: 'rgba(255, 255, 255, 0.95)',
    lineHeight: '1.6',
    marginBottom: '30px',
    padding: '20px',
    background: 'rgba(255, 255, 255, 0.15)',
    backdropFilter: 'blur(10px)',
    borderRadius: '12px',
    border: '1px solid rgba(255, 255, 255, 0.3)'
  },

  // Button
  button: {
    padding: '14px 40px',
    fontSize: '16px',
    fontWeight: '600',
    border: 'none',
    borderRadius: '12px',
    background: '#ffffff',
    color: '#fc4a1a',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
    minWidth: '180px',
    animation: 'buttonBreathe 2s ease-in-out infinite'
  },

  buttonHover: {
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 16px rgba(0, 0, 0, 0.3)',
    background: '#fff5f0'
  },

  buttonDisabled: {
    opacity: 0.6,
    cursor: 'not-allowed',
    animation: 'none'
  },

  // Floating sad emojis container
  emojiContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    overflow: 'hidden',
    zIndex: 1
  },

  // Individual floating emoji
  floatingEmoji: (delay, duration, left, size) => ({
    position: 'absolute',
    fontSize: `${size}px`,
    left: `${left}%`,
    bottom: '-50px',
    opacity: 0.3,
    animation: `emojiFloat ${duration}s ease-in ${delay}s infinite`,
    filter: 'grayscale(20%)'
  }),

  // Rain drop emojis
  rainEmoji: (delay, left) => ({
    position: 'absolute',
    fontSize: '24px',
    left: `${left}%`,
    top: '-30px',
    opacity: 0.4,
    animation: `emojiRain 4s linear ${delay}s infinite`
  }),

  // Spinning sad emoji in center
  centerEmoji: {
    fontSize: '120px',
    marginBottom: '20px',
    display: 'inline-block',
    animation: 'emojiSpin 4s ease-in-out infinite',
    filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))'
  },

  // Crying animation
  cryingEmoji: (delay, left) => ({
    position: 'absolute',
    fontSize: '30px',
    left: `${left}%`,
    top: '20%',
    opacity: 0,
    animation: `crying 3s ease-out ${delay}s infinite`
  }),

  // Clock emoji (waiting indicator)
  clockEmoji: {
    fontSize: '40px',
    display: 'inline-block',
    marginBottom: '15px',
    animation: 'clockTick 1s steps(12) infinite'
  },

  // Background pattern
  backgroundPattern: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    background: 'repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.03) 35px, rgba(255,255,255,.03) 70px)',
    pointerEvents: 'none',
    animation: 'patternMove 20s linear infinite'
  }
};

// CSS Animations
export const waitingAnimations = `
@keyframes cardPulse {
  0%, 100% {
    transform: scale(1);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  }
  50% {
    transform: scale(1.02);
    box-shadow: 0 25px 70px rgba(252, 74, 26, 0.4);
  }
}

@keyframes textFloat {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes buttonBreathe {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

@keyframes emojiFloat {
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 0;
  }
  10% {
    opacity: 0.3;
  }
  90% {
    opacity: 0.3;
  }
  100% {
    transform: translateY(-100vh) rotate(360deg);
    opacity: 0;
  }
}

@keyframes emojiRain {
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 0;
  }
  10% {
    opacity: 0.4;
  }
  90% {
    opacity: 0.4;
  }
  100% {
    transform: translateY(100vh) rotate(180deg);
    opacity: 0;
  }
}

@keyframes emojiSpin {
  0%, 100% {
    transform: rotate(0deg) scale(1);
  }
  25% {
    transform: rotate(-15deg) scale(1.1);
  }
  50% {
    transform: rotate(0deg) scale(1);
  }
  75% {
    transform: rotate(15deg) scale(1.1);
  }
}

@keyframes crying {
  0% {
    transform: translateY(0) scale(0);
    opacity: 0;
  }
  10% {
    opacity: 0.6;
    transform: translateY(0) scale(1);
  }
  100% {
    transform: translateY(200px) scale(0.5);
    opacity: 0;
  }
}

@keyframes clockTick {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes patternMove {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 70px 70px;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
`;