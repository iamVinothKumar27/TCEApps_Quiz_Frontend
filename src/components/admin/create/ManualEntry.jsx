import React, { useState } from 'react';
import { createStyles } from './styles';

const ManualEntry = ({
  questionText,
  setQuestionText,
  optionA,
  setOptionA,
  optionB,
  setOptionB,
  optionC,
  setOptionC,
  optionD,
  setOptionD,
  correctOption,
  setCorrectOption,
  handleAddQuestion,
  loading,
  styles
}) => {
  const [focusedInput, setFocusedInput] = useState(null);
  const s = createStyles;

  return (
    <div style={s.container}>
      <div style={s.header}>
        <div style={s.iconContainer}>
          <div style={s.icon}>✏️</div>
        </div>
        <h3 style={s.title}>Add Questions Manually</h3>
        <p style={s.subtitle}>Enter your question and options below</p>
      </div>
      
      <input
        type="text"
        value={questionText}
        onChange={(e) => setQuestionText(e.target.value)}
        placeholder="Enter your question"
        style={{
          ...s.input,
          ...(focusedInput === 'question' ? s.inputFocus : {})
        }}
        onFocus={() => setFocusedInput('question')}
        onBlur={() => setFocusedInput(null)}
        disabled={loading}
      />
      
      <div style={s.grid}>
        <input
          type="text"
          value={optionA}
          onChange={(e) => setOptionA(e.target.value)}
          placeholder="Option A"
          style={{
            ...s.input,
            ...(focusedInput === 'optionA' ? s.inputFocus : {})
          }}
          onFocus={() => setFocusedInput('optionA')}
          onBlur={() => setFocusedInput(null)}
          disabled={loading}
        />
        <input
          type="text"
          value={optionB}
          onChange={(e) => setOptionB(e.target.value)}
          placeholder="Option B"
          style={{
            ...s.input,
            ...(focusedInput === 'optionB' ? s.inputFocus : {})
          }}
          onFocus={() => setFocusedInput('optionB')}
          onBlur={() => setFocusedInput(null)}
          disabled={loading}
        />
        <input
          type="text"
          value={optionC}
          onChange={(e) => setOptionC(e.target.value)}
          placeholder="Option C"
          style={{
            ...s.input,
            ...(focusedInput === 'optionC' ? s.inputFocus : {})
          }}
          onFocus={() => setFocusedInput('optionC')}
          onBlur={() => setFocusedInput(null)}
          disabled={loading}
        />
        <input
          type="text"
          value={optionD}
          onChange={(e) => setOptionD(e.target.value)}
          placeholder="Option D"
          style={{
            ...s.input,
            ...(focusedInput === 'optionD' ? s.inputFocus : {})
          }}
          onFocus={() => setFocusedInput('optionD')}
          onBlur={() => setFocusedInput(null)}
          disabled={loading}
        />
      </div>
      
      <select
        value={correctOption}
        onChange={(e) => setCorrectOption(e.target.value)}
        style={s.select}
        disabled={loading}
      >
        <option value="" style={s.selectOption}>Select Correct Answer</option>
        <option value="A" style={s.selectOption}>Option A</option>
        <option value="B" style={s.selectOption}>Option B</option>
        <option value="C" style={s.selectOption}>Option C</option>
        <option value="D" style={s.selectOption}>Option D</option>
      </select>
      
      <div style={s.buttonGroup}>
        <button 
          style={{
            ...s.button,
            ...(loading ? s.buttonDisabled : {})
          }}
          onClick={handleAddQuestion} 
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
          {loading ? 'Adding...' : '➕ Add Question'}
        </button>
      </div>
    </div>
  );
};

export default ManualEntry;