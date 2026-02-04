export const adminStyles = {
  // Page container matching Admin.jsx
  pageContainer: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #1a1a2e 100%)',
    padding: '40px 20px',
    position: 'relative'
  },

  contentContainer: {
    maxWidth: '1200px',
    margin: '0 auto'
  },

  // Back button
  backButton: {
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    border: '2px solid rgba(255, 255, 255, 0.2)',
    color: 'white',
    fontWeight: '600',
    padding: '12px 24px',
    borderRadius: '12px',
    cursor: 'pointer',
    marginBottom: '30px',
    transition: 'all 0.3s ease',
    fontSize: '16px'
  },

  // Header section
  header: {
    textAlign: 'center',
    marginBottom: '40px'
  },

  headerTitle: {
    fontSize: '42px',
    fontWeight: 'bold',
    color: 'white',
    marginBottom: '15px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '15px'
  },

  headerIcon: {
    fontSize: '36px'
  },

  headerSubtitle: {
    fontSize: '20px',
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: '10px'
  },

  // Card styles
  card: {
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    border: '2px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '24px',
    padding: '35px',
    marginBottom: '25px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
    transition: 'all 0.3s ease'
  },

  cardHover: {
    transform: 'translateY(-5px)',
    boxShadow: '0 12px 40px rgba(102, 126, 234, 0.4)',
    border: '2px solid rgba(187, 134, 252, 0.4)'
  },

  // Input styles
  input: {
    width: '100%',
    padding: '16px 20px',
    margin: '12px 0',
    border: '2px solid rgba(187, 134, 252, 0.3)',
    borderRadius: '12px',
    fontSize: '16px',
    background: 'rgba(255, 255, 255, 0.05)',
    color: 'white',
    boxSizing: 'border-box',
    transition: 'all 0.3s ease',
    outline: 'none'
  },

  inputFocus: {
    border: '2px solid rgba(187, 134, 252, 0.6)',
    background: 'rgba(255, 255, 255, 0.1)',
    boxShadow: '0 0 20px rgba(187, 134, 252, 0.3)'
  },

  // Select styles
  select: {
    width: '100%',
    padding: '16px 20px',
    margin: '12px 0',
    border: '2px solid rgba(187, 134, 252, 0.3)',
    borderRadius: '12px',
    fontSize: '16px',
    background: 'rgba(255, 255, 255, 0.05)',
    color: 'white',
    boxSizing: 'border-box',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    outline: 'none'
  },

  selectOption: {
    background: '#1a1a2e',
    color: 'white'
  },

  // Button styles
  button: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    padding: '14px 28px',
    borderRadius: '16px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '600',
    margin: '8px',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)'
  },

  buttonHover: {
    transform: 'translateY(-2px) scale(1.05)',
    boxShadow: '0 8px 25px rgba(102, 126, 234, 0.6)'
  },

  buttonDisabled: {
    opacity: '0.5',
    cursor: 'not-allowed',
    transform: 'none'
  },

  buttonSecondary: {
    background: 'rgba(255, 255, 255, 0.1)',
    border: '2px solid rgba(255, 255, 255, 0.2)',
    color: 'white',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)'
  },

  buttonSuccess: {
    background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    boxShadow: '0 4px 15px rgba(79, 172, 254, 0.4)'
  },

  buttonDanger: {
    background: 'linear-gradient(135deg, #f5576c 0%, #f093fb 100%)',
    boxShadow: '0 4px 15px rgba(245, 87, 108, 0.4)'
  },

  buttonWarning: {
    background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    boxShadow: '0 4px 15px rgba(250, 112, 154, 0.4)'
  },

  buttonInfo: {
    background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    boxShadow: '0 4px 15px rgba(79, 172, 254, 0.4)'
  },

  // Button group
  buttonGroup: {
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap',
    marginTop: '20px'
  },

  // Session card
  sessionCard: {
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    border: '2px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '20px',
    padding: '30px',
    marginBottom: '25px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
    transition: 'all 0.3s ease'
  },

  sessionTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: 'white',
    marginBottom: '15px'
  },

  sessionInfo: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '15px',
    marginBottom: '20px'
  },

  infoItem: {
    background: 'rgba(255, 255, 255, 0.05)',
    padding: '12px 16px',
    borderRadius: '12px',
    border: '1px solid rgba(255, 255, 255, 0.1)'
  },

  infoLabel: {
    fontSize: '12px',
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: '5px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  },

  infoValue: {
    fontSize: '18px',
    fontWeight: '600',
    color: 'white'
  },

  statusBadge: (isActive) => ({
    display: 'inline-block',
    padding: '8px 16px',
    borderRadius: '20px',
    fontSize: '14px',
    fontWeight: '600',
    background: isActive 
      ? 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
      : 'rgba(255, 255, 255, 0.2)',
    color: 'white',
    boxShadow: isActive ? '0 4px 15px rgba(79, 172, 254, 0.4)' : 'none'
  }),

  // Edit form
  editForm: {
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(10px)',
    padding: '25px',
    borderRadius: '16px',
    border: '2px solid rgba(187, 134, 252, 0.3)',
    marginTop: '20px'
  },

  editFormTitle: {
    fontSize: '22px',
    fontWeight: 'bold',
    color: 'white',
    marginBottom: '20px'
  },

  // Question preview in edit
  questionPreviewCard: {
    background: 'rgba(255, 255, 255, 0.05)',
    padding: '15px',
    borderRadius: '12px',
    marginBottom: '12px',
    border: '1px solid rgba(255, 255, 255, 0.1)'
  },

  // Results card
  resultCard: {
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    border: '2px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '20px',
    padding: '25px',
    marginBottom: '20px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
    transition: 'all 0.3s ease'
  },

  resultCardBorder: (isPass) => ({
    borderLeft: `6px solid ${isPass ? '#4facfe' : '#f5576c'}`
  }),

  resultHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '15px',
    marginBottom: '15px'
  },

  resultName: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: 'white',
    margin: 0
  },

  resultScore: {
    fontSize: '18px',
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '600'
  },

  gradeBadge: (isPass) => ({
    padding: '8px 16px',
    borderRadius: '20px',
    fontSize: '16px',
    fontWeight: 'bold',
    background: isPass 
      ? 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
      : 'linear-gradient(135deg, #f5576c 0%, #f093fb 100%)',
    color: 'white',
    boxShadow: isPass 
      ? '0 4px 15px rgba(79, 172, 254, 0.4)'
      : '0 4px 15px rgba(245, 87, 108, 0.4)'
  }),

  resultDetails: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '12px',
    fontSize: '14px',
    color: 'rgba(255, 255, 255, 0.8)'
  },

  // Violation card
  violationCard: {
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    border: '2px solid rgba(250, 112, 154, 0.3)',
    borderRadius: '20px',
    padding: '25px',
    marginBottom: '25px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
    transition: 'all 0.3s ease'
  },

  violationHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '20px',
    flexWrap: 'wrap',
    gap: '15px'
  },

  violationStudentName: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: 'white',
    margin: '5px 0'
  },

  violationInfo: {
    fontSize: '14px',
    color: 'rgba(255, 255, 255, 0.7)',
    margin: '5px 0'
  },

  violationDetailsBox: {
    background: 'rgba(255, 255, 255, 0.05)',
    padding: '20px',
    borderRadius: '12px',
    marginBottom: '20px',
    border: '1px solid rgba(255, 255, 255, 0.1)'
  },

  violationDetailsTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#f5576c',
    marginBottom: '15px'
  },

  violationDetailsGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '15px'
  },

  violationDetailItem: {
    margin: '8px 0'
  },

  violationDetailLabel: {
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.9)',
    marginRight: '8px'
  },

  violationDetailValue: {
    color: 'rgba(255, 255, 255, 0.8)'
  },

  // Status badges
  violationStatusBadge: (isResolved, adminAction) => ({
    padding: '10px 20px',
    borderRadius: '20px',
    fontSize: '14px',
    fontWeight: 'bold',
    display: 'inline-block',
    background: isResolved 
      ? 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
      : adminAction === 'resume_approved' 
        ? 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
        : adminAction === 'restart_approved'
          ? 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
          : 'rgba(255, 255, 255, 0.2)',
    color: 'white',
    boxShadow: isResolved || adminAction
      ? '0 4px 15px rgba(79, 172, 254, 0.4)'
      : 'none'
  }),

  violationTypeBadge: (violationType) => ({
    padding: '6px 12px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: 'bold',
    background: violationType === 'tab_switch_violation' 
      ? 'linear-gradient(135deg, #f5576c 0%, #f093fb 100%)'
      : violationType === 'time_expired'
        ? 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
        : violationType === 'split_screen_violation'
          ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
          : 'rgba(255, 255, 255, 0.2)',
    color: 'white',
    marginLeft: '8px',
    display: 'inline-block',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
  }),

  // Modal
  modal: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.7)',
    backdropFilter: 'blur(5px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000
  },

  modalContent: {
    background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
    borderRadius: '24px',
    padding: '40px',
    minWidth: '500px',
    maxWidth: '700px',
    maxHeight: '90vh',
    overflowY: 'auto',
    border: '2px solid rgba(187, 134, 252, 0.3)',
    boxShadow: '0 25px 80px rgba(0, 0, 0, 0.5)',
    position: 'relative'
  },

  modalCloseButton: {
    position: 'absolute',
    top: '15px',
    right: '15px',
    background: 'rgba(255, 255, 255, 0.1)',
    border: '2px solid rgba(255, 255, 255, 0.2)',
    color: 'white',
    borderRadius: '50%',
    width: '36px',
    height: '36px',
    cursor: 'pointer',
    fontSize: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s ease'
  },

  modalTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: 'white',
    marginBottom: '20px'
  },

  // Empty state
  emptyState: {
    textAlign: 'center',
    padding: '60px 20px',
    color: 'rgba(255, 255, 255, 0.7)'
  },

  emptyIcon: {
    fontSize: '64px',
    marginBottom: '20px',
    opacity: 0.6
  },

  emptyTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: 'white',
    marginBottom: '10px'
  },

  emptyText: {
    fontSize: '16px',
    color: 'rgba(255, 255, 255, 0.6)'
  },

  // CSV button
  csvButton: {
    background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    color: 'white',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '16px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(79, 172, 254, 0.4)',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px'
  },

  // Scrollable container
  scrollableContainer: {
    maxHeight: '400px',
    overflowY: 'auto',
    paddingRight: '10px'
  },

  // Section title
  sectionTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: 'white',
    marginBottom: '15px',
    marginTop: '20px'
  },

  // Confirmation modal
  confirmModal: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.7)',
    backdropFilter: 'blur(5px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2000
  },

  confirmModalContent: {
    background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
    borderRadius: '24px',
    padding: '40px',
    minWidth: '400px',
    maxWidth: '500px',
    border: '2px solid rgba(245, 87, 108, 0.3)',
    boxShadow: '0 25px 80px rgba(0, 0, 0, 0.5)',
    position: 'relative',
    textAlign: 'center'
  },

  confirmIcon: {
    fontSize: '64px',
    marginBottom: '20px'
  },

  confirmTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: 'white',
    marginBottom: '15px'
  },

  confirmMessage: {
    fontSize: '16px',
    color: 'rgba(255, 255, 255, 0.8)',
    lineHeight: '1.6',
    marginBottom: '30px',
    whiteSpace: 'pre-line'
  },

  confirmButtonGroup: {
    display: 'flex',
    gap: '15px',
    justifyContent: 'center'
  }
};

