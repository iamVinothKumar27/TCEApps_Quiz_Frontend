import React from 'react';
import { adminStyles } from './adminStyles';

const ConfirmModal = ({ 
  show, 
  title, 
  message, 
  icon = '⚠️',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm, 
  onCancel,
  confirmButtonStyle = 'danger'
}) => {
  const s = adminStyles;

  if (!show) return null;

  const getConfirmButtonStyle = () => {
    switch (confirmButtonStyle) {
      case 'danger':
        return s.buttonDanger;
      case 'warning':
        return s.buttonWarning;
      case 'success':
        return s.buttonSuccess;
      default:
        return s.buttonDanger;
    }
  };

  return (
    <div style={s.confirmModal}>
      <div style={s.confirmModalContent}>
        <div style={s.confirmIcon}>{icon}</div>
        <h3 style={s.confirmTitle}>{title}</h3>
        <p style={s.confirmMessage}>{message}</p>
        <div style={s.confirmButtonGroup}>
          <button
            style={{
              ...s.button,
              ...s.buttonSecondary
            }}
            onClick={onCancel}
            onMouseEnter={(e) => {
              Object.assign(e.currentTarget.style, s.buttonHover);
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = '';
              e.currentTarget.style.boxShadow = s.buttonSecondary.boxShadow;
            }}
          >
            {cancelText}
          </button>
          <button
            style={{
              ...s.button,
              ...getConfirmButtonStyle()
            }}
            onClick={onConfirm}
            onMouseEnter={(e) => {
              Object.assign(e.currentTarget.style, s.buttonHover);
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = '';
              e.currentTarget.style.boxShadow = getConfirmButtonStyle().boxShadow;
            }}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;

