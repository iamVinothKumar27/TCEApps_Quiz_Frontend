import React, { useState } from 'react';
import { createStyles } from './styles';

const ComprehensionPassage = ({
  passageTitle,
  setPassageTitle,
  passageText,
  setPassageText,
  handleAddPassage,
  loading,
  styles
}) => {
  const [focusedInput, setFocusedInput] = useState(null);
  const s = createStyles;

  return (
    <div style={s.container}>
      <div style={s.header}>
        <div style={s.iconContainer}>
          <div style={s.icon}>📖</div>
        </div>
        <h3 style={s.title}>Add Comprehension Passage</h3>
        <p style={s.subtitle}>Add a reading passage for comprehension questions</p>
      </div>
      
      <input
        type="text"
        value={passageTitle}
        onChange={(e) => setPassageTitle(e.target.value)}
        placeholder="Passage Title"
        style={{
          ...s.input,
          ...(focusedInput === 'title' ? s.inputFocus : {})
        }}
        onFocus={() => setFocusedInput('title')}
        onBlur={() => setFocusedInput(null)}
        disabled={loading}
      />
      
      <textarea
        value={passageText}
        onChange={(e) => setPassageText(e.target.value)}
        placeholder="Passage Text"
        style={{
          ...s.textarea,
          ...(focusedInput === 'text' ? s.inputFocus : {})
        }}
        onFocus={() => setFocusedInput('text')}
        onBlur={() => setFocusedInput(null)}
        disabled={loading}
      />
      
      <div style={s.buttonGroup}>
        <button 
          style={{
            ...s.button,
            ...(loading ? s.buttonDisabled : {})
          }}
          onClick={handleAddPassage} 
          disabled={loading}
          onMouseEnter={(e) => {
            if (!loading) {
              Object.assign(e.currentTarget.style, s.buttonHover);
            }
          }}
          onMouseLeave={(e) => {
            if (!loading) {
              e.currentTarget.style.transform = '';
              e.currentTarget.style.boxShadow = s.button.boxShadow;
            }
          }}
        >
          {loading ? 'Adding...' : '➕ Add Passage'}
        </button>
      </div>
    </div>
  );
};

export default ComprehensionPassage;