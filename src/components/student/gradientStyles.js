export const gradientStyles = {
  // Main container with dark background
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #1e1e2e 0%, #2d2d44 100%)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
  },

  // Card with gradient background (purple-blue gradient like "Create Quiz")
  card: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    borderRadius: '24px',
    padding: '40px',
    maxWidth: '500px',
    width: '100%',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
    position: 'relative',
    overflow: 'hidden'
  },

  // Alternative card styles for different sections
  cardPink: {
    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    borderRadius: '24px',
    padding: '40px',
    maxWidth: '500px',
    width: '100%',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
    position: 'relative',
    overflow: 'hidden'
  },

  cardCyan: {
    background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    borderRadius: '24px',
    padding: '40px',
    maxWidth: '500px',
    width: '100%',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
    position: 'relative',
    overflow: 'hidden'
  },

  cardOrange: {
    background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    borderRadius: '24px',
    padding: '40px',
    maxWidth: '500px',
    width: '100%',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
    position: 'relative',
    overflow: 'hidden'
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

  // Header section
  header: {
    textAlign: 'center',
    marginBottom: '30px',
    color: '#ffffff'
  },

  title: {
    fontSize: '32px',
    fontWeight: '700',
    marginBottom: '10px',
    color: '#ffffff',
    textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
  },

  subtitle: {
    fontSize: '16px',
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '400',
    lineHeight: '1.5'
  },

  // Input field
  input: {
    width: '100%',
    padding: '16px 20px',
    fontSize: '16px',
    border: '2px solid rgba(255, 255, 255, 0.3)',
    borderRadius: '12px',
    marginBottom: '24px',
    background: 'rgba(255, 255, 255, 0.95)',
    color: '#2d3748',
    fontWeight: '500',
    transition: 'all 0.3s ease',
    boxSizing: 'border-box',
    outline: 'none'
  },

  inputFocus: {
    border: '2px solid #ffffff',
    background: '#ffffff',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
  },

  // Button
  button: {
    padding: '14px 40px',
    fontSize: '16px',
    fontWeight: '600',
    border: 'none',
    borderRadius: '12px',
    background: '#ffffff',
    color: '#667eea',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    textTransform: 'none',
    minWidth: '140px'
  },

  buttonHover: {
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 16px rgba(0, 0, 0, 0.2)'
  },

  buttonDisabled: {
    opacity: 0.6,
    cursor: 'not-allowed'
  },

  // Icon container (for decorative icons)
  iconContainer: {
    width: '80px',
    height: '80px',
    background: 'rgba(255, 255, 255, 0.2)',
    backdropFilter: 'blur(10px)',
    borderRadius: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 20px',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    fontSize: '40px'
  },

  // Center content wrapper
  centerContent: {
    textAlign: 'center'
  }
};