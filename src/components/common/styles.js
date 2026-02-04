
export const styles = {
  container: {
    minHeight: '100vh',
    backgroundImage: 'url("/img.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    padding: '20px',
    fontFamily: 'Arial, sans-serif'
  },
  
  creditGuidanceContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: '50px',
    padding: '20px',
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderRadius: '12px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    fontFamily: 'Segoe UI, sans-serif'
  },
  creditBox: {
    width: '45%'
  },
  creditHeading: {
    fontSize: '18px',
    marginBottom: '8px',
    color: '#333',
    borderBottom: '2px solid #aaa',
    display: 'inline-block'
  },
  creditText: {
    margin: 0,
    lineHeight: '1.6',
    fontSize: '16px'
  },
  card: {
    maxWidth: '600px',
    margin: '0 auto',
    background: 'rgba(255, 255, 255, 0.85)',
    backdropFilter: 'blur(8px)',
    borderRadius: '40px 10px',
    padding: '40px 30px',
    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.2)',
    border: '2px solid rgba(255,255,255,0.3)',
    transition: 'all 0.3s ease'
  },
  button: {
    background: 'linear-gradient(45deg, #667eea, #764ba2)',
    color: 'white',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '25px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
    margin: '5px',
    transition: 'all 0.3s ease',
    opacity: 1
  },
  csvButton: {
    background: 'linear-gradient(45deg, #4CAF50, #45a049)',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '20px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 'bold',
    margin: '5px',
    transition: 'all 0.3s ease',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px'
  },
  input: {
    width: '100%',
    padding: '12px',
    margin: '10px 0',
    border: '2px solid #ddd',
    borderRadius: '8px',
    fontSize: '16px',
    boxSizing: 'border-box'
  },
  select: {
    width: '100%',
    padding: '12px',
    margin: '10px 0',
    border: '2px solid #ddd',
    borderRadius: '8px',
    fontSize: '16px',
    boxSizing: 'border-box',
    background: 'white'
  },
  option: (isSelected) => ({
    padding: '15px',
    margin: '10px 0',
    border: `2px solid ${isSelected ? '#667eea' : '#ddd'}`,
    borderRadius: '10px',
    cursor: 'pointer',
    backgroundColor: isSelected ? '#f0f4ff' : 'white',
    transition: 'all 0.3s ease'
  }),
  progressBar: {
    width: '100%',
    height: '8px',
    backgroundColor: '#e0e0e0',
    borderRadius: '4px',
    marginBottom: '20px',
    overflow: 'hidden'
  },
  progressFill: (width) => ({
    height: '100%',
    backgroundColor: '#667eea',
    width: `${width}%`,
    transition: 'width 0.3s ease'
  }),
  timer: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#f44336',
    textAlign: 'center',
    padding: '10px',
    border: '2px solid #f44336',
    borderRadius: '10px',
    marginBottom: '20px'
  },
  questionCard: {
    background: '#f9f9f9',
    padding: '20px',
    borderRadius: '10px',
    marginBottom: '20px',
    borderLeft: '4px solid #667eea'
  },
  resultCard: {
    background: '#f0f8ff',
    padding: '20px',
    borderRadius: '15px',
    textAlign: 'center',
    margin: '20px 0'
  },
  scoreCircle: (percentage) => ({
    width: '150px',
    height: '150px',
    borderRadius: '50%',
    background: `conic-gradient(#4CAF50 ${percentage * 3.6}deg, #e0e0e0 0deg)`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '20px auto',
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#333'
  }),
  warningBanner: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    background: '#f44336',
    color: 'white',
    padding: '15px',
    textAlign: 'center',
    zIndex: 1000,
    fontSize: '16px',
    fontWeight: 'bold'
  },
  errorMessage: {
    background: '#f8d7da',
    color: '#721c24',
    padding: '10px',
    borderRadius: '5px',
    margin: '10px 0',
    border: '1px solid #f5c6cb'
  },
  loadingSpinner: {
    display: 'inline-block',
    marginLeft: '10px',
    fontSize: '16px'
  },
  resultsHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    flexWrap: 'wrap',
    gap: '10px'
  },
  violationCard: {
    background: '#fff3cd',
    padding: '20px',
    margin: '15px 0',
    borderRadius: '10px',
    borderLeft: '4px solid #ffc107',
    border: '1px solid #ffeaa7'
  },
  resumeButton: {
    background: 'linear-gradient(45deg, #FF9800, #F57C00)',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '15px',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: 'bold',
    margin: '2px',
    transition: 'all 0.3s ease'
  },
  waitingCard: {
    background: '#e3f2fd',
    padding: '30px',
    borderRadius: '15px',
    textAlign: 'center',
    margin: '20px 0',
    border: '2px solid #bbdefb'
  },
  passageModal: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0,0,0,0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000
  },
  passageContent: {
    background: 'white',
    padding: '30px',
    borderRadius: '15px',
    maxWidth: '700px',
    maxHeight: '80vh',
    overflow: 'auto',
    margin: '20px',
    position: 'relative'
  },
  passageButton: {
    background: 'linear-gradient(45deg, #2196F3, #1976D2)',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '15px',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: 'bold',
    margin: '2px 5px',
    transition: 'all 0.3s ease'
  },
  audioPlayer: {
    background: '#fff0f5',
    padding: '15px',
    borderRadius: '10px',
    border: '2px solid #e91e63',
    marginTop: '20px'
  },
  audioButton: {
    background: 'linear-gradient(45deg, #e91e63, #c2185b)',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '15px',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: 'bold',
    margin: '2px 5px',
    transition: 'all 0.3s ease'
  },
  questionPreviewCard: {
    background: 'white',
    padding: '20px',
    margin: '15px 0',
    borderRadius: '12px',
    border: '2px solid #e0e0e0',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    transition: 'all 0.3s ease'
  },
  editQuestionForm: {
    background: '#f8f9fa',
    padding: '15px',
    borderRadius: '8px',
    border: '1px solid #dee2e6'
  },
  previewOption: (isCorrect) => ({
    padding: '12px',
    borderRadius: '8px',
    border: `2px solid ${isCorrect ? '#4CAF50' : '#e0e0e0'}`,
    backgroundColor: isCorrect ? '#e8f5e8' : 'white',
    color: isCorrect ? '#2e7d32' : '#333',
    fontWeight: isCorrect ? 'bold' : 'normal',
    transition: 'all 0.3s ease'
  }),
  correctAnswerBadge: {
    background: 'linear-gradient(45deg, #4CAF50, #45a049)',
    color: 'white',
    padding: '8px 16px',
    borderRadius: '20px',
    fontSize: '14px',
    fontWeight: 'bold',
    display: 'inline-block'
  },
  editSessionForm: {
    background: '#f8f9fa',
    padding: '20px',
    borderRadius: '12px',
    border: '2px solid #dee2e6'
  },
  passagePreview: {
    background: 'white',
    padding: '10px',
    margin: '8px 0',
    borderRadius: '8px',
    border: '1px solid #e0e0e0',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
  },
  audioPreview: {
    background: 'white',
    padding: '10px',
    margin: '8px 0',
    borderRadius: '8px',
    border: '1px solid #e0e0e0',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
  },
  violationStatusBadge: (isResolved, adminAction) => ({
    padding: '8px 16px',
    borderRadius: '20px',
    fontSize: '14px',
    fontWeight: 'bold',
    display: 'inline-block',
    background: isResolved ? 'linear-gradient(45deg, #28a745, #20c997)' :
               adminAction === 'resume_approved' ? 'linear-gradient(45deg, #17a2b8, #138496)' :
               adminAction === 'restart_approved' ? 'linear-gradient(45deg, #ffc107, #fd7e14)' :
               'linear-gradient(45deg, #6c757d, #495057)',
    color: 'white',
    textAlign: 'center',
    minWidth: '120px'
  }),
  violationTypeBadge: (violationType) => ({
    padding: '4px 8px',
    borderRadius: '12px',
    fontSize: '11px',
    fontWeight: 'bold',
    background: violationType === 'tab_switch_violation' ? 'linear-gradient(45deg, #dc3545, #c82333)' :
               violationType === 'time_expired' ? 'linear-gradient(45deg, #fd7e14, #e55a00)' :
               violationType === 'split_screen_violation' ? 'linear-gradient(45deg, #6f42c1, #5a2d91)' :
               'linear-gradient(45deg, #6c757d, #495057)',
    color: 'white',
    marginLeft: '8px',
    display: 'inline-block'
  }),
  answerBadge: (answer) => ({
    padding: '6px 10px',
    borderRadius: '15px',
    fontSize: '12px',
    fontWeight: 'bold',
    background: answer ? 'linear-gradient(45deg, #28a745, #20c997)' : 'linear-gradient(45deg, #6c757d, #495057)',
    color: 'white',
    textAlign: 'center',
    border: 'none'
  }),
  resolvedBadge: {
    background: 'linear-gradient(45deg, #28a745, #20c997)',
    color: 'white',
    padding: '8px 16px',
    borderRadius: '20px',
    fontSize: '14px',
    fontWeight: 'bold',
    display: 'inline-block'
  },
  footerBlack: {
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)',
  backgroundSize: '300% 300%',
  animation: 'gradientShift 8s ease infinite',
  color: '#ffffff',
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'flex-start',
  padding: '40px',
  marginTop: '60px',
  marginLeft: 'auto',
  marginRight: 'auto',
  maxWidth: '1000px',    // Maximum width
  width: '85%',          // Responsive width
  fontFamily: 'Arial, sans-serif',
  fontSize: '14px',
  borderTop: '4px solid #ffffff',
  borderRadius: '20px',
  position: 'relative',
  minHeight: '160px',
  boxShadow: '0 10px 30px rgba(102, 126, 234, 0.3), inset 0 1px 0 rgba(255,255,255,0.2)',
  overflow: 'hidden'
},

footerColumn: {
  width: '45%',
  textAlign: 'left'
},

footerText: {
  margin: 0,
  lineHeight: '1.7',
  fontSize: '14px',
  color: '#f4e3e3ff'
},

verticalDivider: {
  width: '1px',
  backgroundColor: '#444',
  margin: '0 20px'
},

footerOverlay: {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
  animation: 'floatPattern 20s linear infinite',
  pointerEvents: 'none'
},

footerThreeColumns: {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  width: '100%',
  gap: '40px',
  position: 'relative',
  zIndex: 2
},

footerLeftColumn: {
  flex: '1',
  textAlign: 'left',
  transform: 'translateY(0)',
  transition: 'all 0.3s ease'
},

footerCenterColumn: {
  flex: '1',
  textAlign: 'center',
  transform: 'translateY(0)',
  transition: 'all 0.3s ease'
},

footerRightColumn: {
  flex: '1',
  textAlign: 'left',
  transform: 'translateY(0)',
  transition: 'all 0.3s ease'
},

footerHeading: {
  fontSize: '18px',
  fontWeight: 'bold',
  marginBottom: '15px',
  color: '#ffffff',
  textTransform: 'uppercase',
  letterSpacing: '1px',
  position: 'relative',
  paddingBottom: '10px',
  textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
},

footerHeadingUnderline: {
  position: 'absolute',
  bottom: 0,
  left: '50%',
  transform: 'translateX(-50%)',
  width: '60px',
  height: '3px',
  background: 'linear-gradient(90deg, #ffffff, #f0f8ff, #ffffff)',
  borderRadius: '2px',
  boxShadow: '0 2px 8px rgba(255,255,255,0.4)',
  animation: 'glow 2s ease-in-out infinite alternate'
},

developerName: {
  fontSize: '14px',
  color: '#f8f9fa',
  margin: '6px 0',
  lineHeight: '1.6',
  transition: 'all 0.3s ease',
  cursor: 'pointer',
  padding: '4px 8px',
  borderRadius: '6px',
  position: 'relative',
  overflow: 'hidden'
},

developerNameShimmer: {
  position: 'absolute',
  top: 0,
  left: '-100%',
  width: '100%',
  height: '100%',
  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
  transition: 'left 0.5s ease'
},

departmentHead: {
  fontSize: '16px',
  color: '#ffffff',
  fontWeight: '600',
  margin: '15px 0',
  textShadow: '2px 2px 4px rgba(0,0,0,0.4)',
  padding: '12px 20px',
  background: 'rgba(255,255,255,0.1)',
  borderRadius: '25px',
  border: '2px solid rgba(255,255,255,0.2)',
  backdropFilter: 'blur(10px)',
  transition: 'all 0.3s ease',
  cursor: 'pointer'
},

guidanceInfo: {
  fontSize: '14px',
  color: '#f1f3f4',
  margin: '6px 0',
  lineHeight: '1.6',
  transition: 'all 0.3s ease',
  padding: '3px 0'
},

footerShape1: {
  position: 'absolute',
  top: '20px',
  left: '10%',
  width: '80px',
  height: '80px',
  background: 'linear-gradient(45deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
  borderRadius: '50%',
  animation: 'float 6s ease-in-out infinite'
},

footerShape2: {
  position: 'absolute',
  bottom: '30px',
  right: '15%',
  width: '60px',
  height: '60px',
  background: 'linear-gradient(45deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03))',
  borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
  animation: 'float 4s ease-in-out infinite reverse'
},

footerShape3: {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '120px',
  height: '120px',
  background: 'linear-gradient(45deg, rgba(255,255,255,0.05), transparent)',
  borderRadius: '20px',
  animation: 'rotate 10s linear infinite',
  opacity: 0.6
}
};
