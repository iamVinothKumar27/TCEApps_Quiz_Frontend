import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { createStyles } from './styles';

const QuestionsPreview = ({
  currentSession,
  showQuestionsPreview,
  setShowQuestionsPreview,
  editingQuestion,
  editQuestionData,
  setEditQuestionData,
  handleEditQuestion,
  handleUpdateQuestion,
  handleDeleteQuestion,
  cancelEdit,
  API_BASE_URL,
  styles
}) => {
  const [focusedInput, setFocusedInput] = useState(null);
  const s = createStyles;

  return (
    <div style={s.previewSection}>
      <div style={s.previewHeader}>
        <div style={s.iconContainer}>
          <div style={s.icon}>👁️</div>
        </div>
        <h3 style={s.previewTitle}>Questions Preview</h3>
        <p style={s.previewCount}>
          {currentSession?.questions?.length || 0} {currentSession?.questions?.length === 1 ? 'question' : 'questions'} added
        </p>
        <button 
          style={{
            ...s.button,
            ...s.buttonSuccess
          }}
          onClick={() => setShowQuestionsPreview(!showQuestionsPreview)}
          onMouseEnter={(e) => {
            Object.assign(e.currentTarget.style, s.buttonHover);
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = '';
            e.currentTarget.style.boxShadow = s.buttonSuccess.boxShadow;
          }}
        >
          {showQuestionsPreview ? '👁️‍🗨️ Hide Preview' : '👁️ Show Preview'}
        </button>
      </div>

      {showQuestionsPreview && (
        <div style={{ maxHeight: '600px', overflowY: 'auto', paddingRight: '10px' }}>
          {currentSession?.questions?.map((question, index) => (
            <div 
              key={index} 
              style={s.questionCard}
              onMouseEnter={(e) => {
                Object.assign(e.currentTarget.style, s.questionCardHover);
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = '';
                e.currentTarget.style.boxShadow = s.questionCard.boxShadow;
                e.currentTarget.style.border = s.questionCard.border;
              }}
            >
              <div style={s.questionHeader}>
                <h4 style={s.questionNumber}>Question {index + 1}</h4>
                <div style={s.actionButtons}>
                  <button 
                    style={{
                      ...s.actionButton,
                      ...s.editButton
                    }}
                    onClick={() => handleEditQuestion(question, index)}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.05)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = '';
                    }}
                  >
                    ✏️ Edit
                  </button>
                  <button 
                    style={{
                      ...s.actionButton,
                      ...s.deleteButton
                    }}
                    onClick={() => handleDeleteQuestion(index)}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.05)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = '';
                    }}
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>

              {editingQuestion === index ? (
                <div style={s.editForm}>
                  <input
                    type="text"
                    value={editQuestionData.question}
                    onChange={(e) => setEditQuestionData({ ...editQuestionData, question: e.target.value })}
                    placeholder="Question text"
                    style={{
                      ...s.input,
                      ...(focusedInput === 'editQuestion' ? s.inputFocus : {})
                    }}
                    onFocus={() => setFocusedInput('editQuestion')}
                    onBlur={() => setFocusedInput(null)}
                  />
                  <div style={s.grid}>
                    <input
                      type="text"
                      value={editQuestionData.options.a}
                      onChange={(e) => setEditQuestionData({ 
                        ...editQuestionData, 
                        options: { ...editQuestionData.options, a: e.target.value } 
                      })}
                      placeholder="Option A"
                      style={{
                        ...s.input,
                        ...(focusedInput === 'editOptionA' ? s.inputFocus : {})
                      }}
                      onFocus={() => setFocusedInput('editOptionA')}
                      onBlur={() => setFocusedInput(null)}
                    />
                    <input
                      type="text"
                      value={editQuestionData.options.b}
                      onChange={(e) => setEditQuestionData({ 
                        ...editQuestionData, 
                        options: { ...editQuestionData.options, b: e.target.value } 
                      })}
                      placeholder="Option B"
                      style={{
                        ...s.input,
                        ...(focusedInput === 'editOptionB' ? s.inputFocus : {})
                      }}
                      onFocus={() => setFocusedInput('editOptionB')}
                      onBlur={() => setFocusedInput(null)}
                    />
                    <input
                      type="text"
                      value={editQuestionData.options.c}
                      onChange={(e) => setEditQuestionData({ 
                        ...editQuestionData, 
                        options: { ...editQuestionData.options, c: e.target.value } 
                      })}
                      placeholder="Option C"
                      style={{
                        ...s.input,
                        ...(focusedInput === 'editOptionC' ? s.inputFocus : {})
                      }}
                      onFocus={() => setFocusedInput('editOptionC')}
                      onBlur={() => setFocusedInput(null)}
                    />
                    <input
                      type="text"
                      value={editQuestionData.options.d}
                      onChange={(e) => setEditQuestionData({ 
                        ...editQuestionData, 
                        options: { ...editQuestionData.options, d: e.target.value } 
                      })}
                      placeholder="Option D"
                      style={{
                        ...s.input,
                        ...(focusedInput === 'editOptionD' ? s.inputFocus : {})
                      }}
                      onFocus={() => setFocusedInput('editOptionD')}
                      onBlur={() => setFocusedInput(null)}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '12px' }}>
                    <input
                      type="number"
                      min="0"
                      value={editQuestionData.marks}
                      onChange={(e) => setEditQuestionData({ ...editQuestionData, marks: Number(e.target.value) })}
                      placeholder="Marks"
                      style={{
                        ...s.input,
                        ...(focusedInput === 'editMarks' ? s.inputFocus : {})
                      }}
                      onFocus={() => setFocusedInput('editMarks')}
                      onBlur={() => setFocusedInput(null)}
                    />
                    <input
                      type="number"
                      min="1"
                      value={editQuestionData.timeSeconds}
                      onChange={(e) => setEditQuestionData({ ...editQuestionData, timeSeconds: Number(e.target.value) })}
                      placeholder="Time (seconds)"
                      style={{
                        ...s.input,
                        ...(focusedInput === 'editTimeSeconds' ? s.inputFocus : {})
                      }}
                      onFocus={() => setFocusedInput('editTimeSeconds')}
                      onBlur={() => setFocusedInput(null)}
                    />
                  </div>

                  <select
                    value={editQuestionData.correct}
                    onChange={(e) => setEditQuestionData({ ...editQuestionData, correct: e.target.value })}
                    style={s.select}
                  >
                    <option value="" style={s.selectOption}>Select Correct Answer</option>
                    <option value="A" style={s.selectOption}>Option A</option>
                    <option value="B" style={s.selectOption}>Option B</option>
                    <option value="C" style={s.selectOption}>Option C</option>
                    <option value="D" style={s.selectOption}>Option D</option>
                  </select>
                  <div style={s.buttonGroup}>
                    <button 
                      style={s.button}
                      onClick={handleUpdateQuestion}
                      onMouseEnter={(e) => {
                        Object.assign(e.currentTarget.style, s.buttonHover);
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = '';
                        e.currentTarget.style.boxShadow = s.button.boxShadow;
                      }}
                    >
                      ✅ Update Question
                    </button>
                    <button 
                      style={{
                        ...s.button,
                        ...s.buttonSecondary
                      }}
                      onClick={cancelEdit}
                      onMouseEnter={(e) => {
                        Object.assign(e.currentTarget.style, s.buttonHover);
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = '';
                        e.currentTarget.style.boxShadow = s.buttonSecondary.boxShadow;
                      }}
                    >
                      ❌ Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <p style={s.questionText}>
                    <strong style={{ color: '#bb86fc' }}>Q:</strong> {question.question || '(Image-only question)'}
                  </p>
                  {/* Marks/Time */}
              <div style={{ marginBottom: '10px', color: '#fff', opacity: 0.9, fontSize: '14px' }}>
                ⏱️ {question.timeSeconds ?? 60}s  •  ⭐ {question.marks ?? 1} mark(s)
              </div>

              {question.questionType === 'image' && question.imageUrl && (
                    <div style={s.imagePreview}>
                      <img 
                        src={(() => {
                          let imageUrl = question.imageUrl;
                          if (imageUrl.startsWith('http')) {
                            return imageUrl;
                          }
                          const cleanPath = imageUrl.startsWith('/') ? imageUrl : `/${imageUrl}`;
                          return `${API_BASE_URL}${cleanPath}`;
                        })()}
                        alt="Question"
                        style={s.image}
                        onError={(e) => {
                          console.error('Image failed to load:', e.target.src);
                          e.target.style.display = 'none';
                          toast.error('Failed to load question image');
                        }}
                      />
                    </div>
                  )}
                  <div style={s.optionGrid}>
                    <div style={s.optionCard(question.correct === 'A')}>
                      <strong>A:</strong> {question.options.a}
                    </div>
                    <div style={s.optionCard(question.correct === 'B')}>
                      <strong>B:</strong> {question.options.b}
                    </div>
                    <div style={s.optionCard(question.correct === 'C')}>
                      <strong>C:</strong> {question.options.c}
                    </div>
                    <div style={s.optionCard(question.correct === 'D')}>
                      <strong>D:</strong> {question.options.d}
                    </div>
                  </div>
                  <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <span style={s.correctBadge}>
                      ✓ Correct Answer: {question.correct}
                    </span>
                  </div>
                </div>
              )}
            </div>
          ))}
          {(!currentSession?.questions || currentSession?.questions.length === 0) && (
            <div style={s.emptyState}>
              <div style={s.emptyIcon}>📝</div>
              <h4 style={s.emptyTitle}>No questions added yet</h4>
              <p style={s.emptyText}>Add questions using the methods above to see them here</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default QuestionsPreview;