export const createStyles = {
  // Container styles matching Admin.jsx
  container: {
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    border: '2px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '24px',
    padding: '35px',
    marginBottom: '30px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
    transition: 'all 0.3s ease'
  },

  // Header section
  header: {
    textAlign: 'center',
    marginBottom: '30px'
  },

  iconContainer: {
    background: 'rgba(255, 255, 255, 0.2)',
    backdropFilter: 'blur(10px)',
    borderRadius: '20px',
    padding: '20px',
    display: 'inline-block',
    marginBottom: '15px',
    border: '1px solid rgba(255, 255, 255, 0.3)'
  },

  icon: {
    fontSize: '48px',
    margin: 0
  },

  title: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: 'white',
    marginBottom: '10px',
    textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)'
  },

  subtitle: {
    fontSize: '16px',
    color: 'rgba(255, 255, 255, 0.8)',
    margin: 0
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

  inputPlaceholder: {
    color: 'rgba(255, 255, 255, 0.5)'
  },

  // Textarea styles
  textarea: {
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
    outline: 'none',
    resize: 'vertical',
    fontFamily: 'inherit'
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
    padding: '16px 32px',
    borderRadius: '16px',
    cursor: 'pointer',
    fontSize: '18px',
    fontWeight: '600',
    margin: '8px',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
    textTransform: 'none'
  },

  buttonHover: {
    transform: 'translateY(-2px) scale(1.05)',
    boxShadow: '0 8px 25px rgba(102, 126, 234, 0.6)'
  },

  buttonDisabled: {
    opacity: 0.5,
    cursor: 'not-allowed',
    transform: 'none'
  },

  buttonSecondary: {
    background: 'rgba(255, 255, 255, 0.1)',
    border: '2px solid rgba(255, 255, 255, 0.2)',
    color: 'white',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)'
  },

  buttonDanger: {
    background: 'linear-gradient(135deg, #f5576c 0%, #f093fb 100%)',
    boxShadow: '0 4px 15px rgba(245, 87, 108, 0.4)'
  },

  buttonSuccess: {
    background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    boxShadow: '0 4px 15px rgba(79, 172, 254, 0.4)'
  },

  // Grid layout
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '15px',
    margin: '15px 0'
  },

  // Image preview
  imagePreview: {
    textAlign: 'center',
    margin: '20px 0'
  },

  image: {
    maxWidth: '100%',
    maxHeight: '400px',
    borderRadius: '16px',
    border: '2px solid rgba(187, 134, 252, 0.3)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
    background: 'rgba(255, 255, 255, 0.05)'
  },

  // Error styles
  errorContainer: {
    background: 'rgba(245, 87, 108, 0.2)',
    border: '2px solid rgba(245, 87, 108, 0.5)',
    borderRadius: '12px',
    padding: '20px',
    margin: '20px 0',
    backdropFilter: 'blur(10px)'
  },

  errorTitle: {
    color: '#f5576c',
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '15px'
  },

  errorList: {
    color: 'rgba(255, 255, 255, 0.9)',
    margin: 0,
    paddingLeft: '20px'
  },

  errorItem: {
    margin: '8px 0',
    fontSize: '14px'
  },

  // Table styles (for CSV preview)
  tableContainer: {
    maxHeight: '400px',
    overflowY: 'auto',
    borderRadius: '12px',
    border: '2px solid rgba(255, 255, 255, 0.2)',
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(10px)',
    margin: '20px 0'
  },

  table: {
    width: '100%',
    borderCollapse: 'collapse',
    color: 'white'
  },

  tableHeader: {
    background: 'rgba(102, 126, 234, 0.3)',
    position: 'sticky',
    top: 0,
    zIndex: 10
  },

  tableHeaderCell: {
    border: '1px solid rgba(255, 255, 255, 0.2)',
    padding: '12px',
    textAlign: 'left',
    fontWeight: '600',
    color: 'white',
    fontSize: '14px'
  },

  tableCell: {
    border: '1px solid rgba(255, 255, 255, 0.1)',
    padding: '12px',
    fontSize: '14px',
    color: 'rgba(255, 255, 255, 0.9)'
  },

  tableRow: {
    transition: 'background 0.2s ease'
  },

  tableRowHover: {
    background: 'rgba(255, 255, 255, 0.05)'
  },

  // Preview section
  previewSection: {
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    border: '2px solid rgba(187, 134, 252, 0.3)',
    borderRadius: '24px',
    padding: '30px',
    marginTop: '40px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
  },

  previewHeader: {
    textAlign: 'center',
    marginBottom: '25px'
  },

  previewTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: 'white',
    marginBottom: '10px'
  },

  previewCount: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: '16px',
    marginBottom: '20px'
  },

  // Question card in preview
  questionCard: {
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    border: '2px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '16px',
    padding: '25px',
    margin: '20px 0',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
    transition: 'all 0.3s ease'
  },

  questionCardHover: {
    transform: 'translateY(-5px)',
    boxShadow: '0 8px 30px rgba(102, 126, 234, 0.4)',
    border: '2px solid rgba(187, 134, 252, 0.5)'
  },

  questionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '20px',
    flexWrap: 'wrap',
    gap: '15px'
  },

  questionNumber: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: 'white',
    margin: 0
  },

  questionText: {
    fontSize: '18px',
    color: 'rgba(255, 255, 255, 0.95)',
    lineHeight: '1.6',
    marginBottom: '20px'
  },

  // Option styles
  optionGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '15px',
    margin: '20px 0'
  },

  optionCard: (isCorrect) => ({
    padding: '15px',
    borderRadius: '12px',
    border: `2px solid ${isCorrect ? 'rgba(79, 172, 254, 0.6)' : 'rgba(255, 255, 255, 0.2)'}`,
    background: isCorrect 
      ? 'rgba(79, 172, 254, 0.2)' 
      : 'rgba(255, 255, 255, 0.05)',
    color: 'white',
    fontWeight: isCorrect ? '600' : 'normal',
    transition: 'all 0.3s ease',
    backdropFilter: 'blur(10px)'
  }),

  // Correct answer badge
  correctBadge: {
    background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    color: 'white',
    padding: '10px 20px',
    borderRadius: '20px',
    fontSize: '16px',
    fontWeight: 'bold',
    display: 'inline-block',
    marginTop: '15px',
    boxShadow: '0 4px 15px rgba(79, 172, 254, 0.4)'
  },

  // Action buttons
  actionButtons: {
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap'
  },

  actionButton: {
    padding: '10px 20px',
    borderRadius: '12px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    color: 'white'
  },

  editButton: {
    background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    boxShadow: '0 4px 15px rgba(79, 172, 254, 0.4)'
  },

  deleteButton: {
    background: 'linear-gradient(135deg, #f5576c 0%, #f093fb 100%)',
    boxShadow: '0 4px 15px rgba(245, 87, 108, 0.4)'
  },

  // Edit form
  editForm: {
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(10px)',
    padding: '20px',
    borderRadius: '16px',
    border: '2px solid rgba(187, 134, 252, 0.3)',
    marginTop: '20px'
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

  // Audio player
  audioContainer: {
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    border: '2px solid rgba(187, 134, 252, 0.3)',
    borderRadius: '16px',
    padding: '20px',
    marginTop: '20px'
  },

  audioLabel: {
    color: 'white',
    fontSize: '16px',
    fontWeight: '600',
    marginBottom: '15px',
    display: 'block'
  },

  // File input
  fileInput: {
    width: '100%',
    padding: '16px 20px',
    margin: '12px 0',
    border: '2px dashed rgba(187, 134, 252, 0.3)',
    borderRadius: '12px',
    fontSize: '16px',
    background: 'rgba(255, 255, 255, 0.05)',
    color: 'white',
    boxSizing: 'border-box',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    outline: 'none'
  },

  fileInputHover: {
    border: '2px dashed rgba(187, 134, 252, 0.6)',
    background: 'rgba(255, 255, 255, 0.1)'
  },

  // Button group
  buttonGroup: {
    display: 'flex',
    justifyContent: 'center',
    gap: '15px',
    marginTop: '25px',
    flexWrap: 'wrap'
  }
};

