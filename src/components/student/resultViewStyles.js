export const resultViewStyles = {
  // Main container with animated gradient background
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)',
    backgroundSize: '400% 400%',
    animation: 'gradientShift 15s ease infinite',
    position: 'relative',
    overflow: 'hidden'
  },

  // Result card
  card: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '60vh',
    position: 'relative',
    padding: '20px'
  },

  resultCard: {
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(20px)',
    padding: '40px 30px',
    borderRadius: '24px',
    textAlign: 'center',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
    border: '2px solid rgba(255, 255, 255, 0.8)',
    animation: 'popIn 0.7s cubic-bezier(0.23, 1, 0.32, 1)',
    maxWidth: '450px',
    width: '100%',
    position: 'relative',
    zIndex: 10
  },

  // User info banner
  userInfoBanner: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    padding: '12px 18px',
    background: 'rgba(255, 255, 255, 0.25)',
    backdropFilter: 'blur(10px)',
    borderRadius: '12px',
    fontSize: '14px',
    color: '#ffffff',
    fontWeight: '500',
    border: '1px solid rgba(255, 255, 255, 0.4)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    zIndex: 100
  },

  // Student info section
  studentInfo: {
    marginTop: '32px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '24px',
    fontSize: '17px',
    color: '#333',
    fontWeight: '500',
    textAlign: 'center',
    background: 'rgba(245, 247, 250, 0.85)',
    borderRadius: '16px',
    padding: '12px 18px',
    boxShadow: '0 2px 8px rgba(102, 126, 234, 0.07)',
    flexWrap: 'wrap'
  },

  divider: {
    borderLeft: '1.5px solid #e0e0e0',
    height: '24px'
  },

  // Footer with gradient
  footerBlack: {
    background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
    padding: '60px 40px',
    color: '#ffffff',
    position: 'relative',
    overflow: 'hidden',
    boxShadow: '0 -10px 40px rgba(0, 0, 0, 0.3)'
  },

  footerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'radial-gradient(circle at 30% 50%, rgba(255, 255, 255, 0.05) 0%, transparent 50%)',
    pointerEvents: 'none'
  },

  footerShape1: {
    position: 'absolute',
    width: '300px',
    height: '300px',
    background: 'radial-gradient(circle, rgba(102, 126, 234, 0.2) 0%, transparent 70%)',
    borderRadius: '50%',
    top: '-100px',
    left: '-50px',
    animation: 'float 6s ease-in-out infinite',
    pointerEvents: 'none'
  },

  footerShape2: {
    position: 'absolute',
    width: '200px',
    height: '200px',
    background: 'radial-gradient(circle, rgba(231, 60, 126, 0.15) 0%, transparent 70%)',
    borderRadius: '50%',
    bottom: '-50px',
    right: '100px',
    animation: 'float 8s ease-in-out infinite 1s',
    pointerEvents: 'none'
  },

  footerShape3: {
    position: 'absolute',
    width: '250px',
    height: '250px',
    background: 'radial-gradient(circle, rgba(35, 213, 171, 0.15) 0%, transparent 70%)',
    borderRadius: '50%',
    top: '50%',
    right: '-75px',
    animation: 'float 7s ease-in-out infinite 2s',
    pointerEvents: 'none'
  },

  footerThreeColumns: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '40px',
    maxWidth: '1200px',
    margin: '0 auto',
    position: 'relative',
    zIndex: 1,
    flexWrap: 'wrap'
  },

  footerLeftColumn: {
    flex: '1',
    minWidth: '250px'
  },

  footerCenterColumn: {
    flex: '1',
    minWidth: '250px',
    textAlign: 'center'
  },

  footerRightColumn: {
    flex: '1',
    minWidth: '250px',
    textAlign: 'right'
  },

  footerHeading: {
    fontSize: '18px',
    fontWeight: '700',
    marginBottom: '20px',
    textTransform: 'uppercase',
    letterSpacing: '1.5px',
    color: '#ffffff',
    position: 'relative',
    paddingBottom: '10px'
  },

  footerHeadingUnderline: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '60px',
    height: '3px',
    background: 'linear-gradient(90deg, #667eea, #764ba2)',
    borderRadius: '2px'
  },

  developerName: {
    fontSize: '16px',
    marginBottom: '12px',
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '500',
    position: 'relative',
    paddingLeft: '15px',
    transition: 'all 0.3s ease'
  },

  developerNameShimmer: {
    position: 'absolute',
    left: 0,
    top: '50%',
    transform: 'translateY(-50%)',
    width: '6px',
    height: '6px',
    background: '#667eea',
    borderRadius: '50%',
    boxShadow: '0 0 10px rgba(102, 126, 234, 0.8)'
  },

  departmentHead: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#ffffff',
    marginTop: '15px',
    textShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
  },

  guidanceInfo: {
    fontSize: '16px',
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: '10px',
    fontWeight: '500'
  },

  // Confetti and celebration elements
  confettiContainer: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    zIndex: 9999,
    overflow: 'hidden'
  },

  confettiPiece: (delay, duration, left, rotation, color) => ({
    position: 'absolute',
    width: '10px',
    height: '10px',
    background: color,
    top: '-20px',
    left: `${left}%`,
    opacity: 0.8,
    animation: `confettiFall ${duration}s linear ${delay}s infinite`,
    transform: `rotate(${rotation}deg)`
  }),

  // Firework burst elements
  fireworkBurst: (delay, left, top) => ({
    position: 'absolute',
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    background: '#ffffff',
    left: `${left}%`,
    top: `${top}%`,
    animation: `fireworkExplosion 1.5s ease-out ${delay}s`,
    boxShadow: '0 0 20px rgba(255, 255, 255, 0.8)'
  }),

  // Floating particles
  floatingParticle: (delay, size, left, color) => ({
    position: 'absolute',
    width: `${size}px`,
    height: `${size}px`,
    borderRadius: '50%',
    background: color,
    left: `${left}%`,
    bottom: '-50px',
    opacity: 0.6,
    animation: `floatUp 8s ease-in ${delay}s infinite`,
    boxShadow: `0 0 ${size * 2}px ${color}`
  })
};

// CSS Animations as a string to inject
export const resultViewAnimations = `
@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

@keyframes popIn {
  0% { opacity: 0; transform: scale(0.5) rotate(-10deg); }
  50% { opacity: 1; transform: scale(1.1) rotate(5deg); }
  100% { opacity: 1; transform: scale(1) rotate(0deg); }
}

@keyframes confettiFall {
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: translateY(100vh) rotate(720deg);
    opacity: 0;
  }
}

@keyframes fireworkExplosion {
  0% {
    transform: scale(0);
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: scale(50);
    opacity: 0;
  }
}

@keyframes floatUp {
  0% {
    transform: translateY(0) scale(0);
    opacity: 0;
  }
  10% {
    opacity: 0.8;
  }
  90% {
    opacity: 0.8;
  }
  100% {
    transform: translateY(-100vh) scale(1.5);
    opacity: 0;
  }
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}

@keyframes glow {
  0%, 100% { box-shadow: 0 0 10px rgba(102, 126, 234, 0.5); }
  50% { box-shadow: 0 0 20px rgba(102, 126, 234, 1); }
}
`;