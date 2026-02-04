import React, { useState } from 'react';
import { createStyles } from './styles';

const CsvUpload = ({
  parseCsvFile,
  csvErrors,
  showCsvPreview,
  csvPreview,
  handleCsvUpload,
  clearCsvUpload,
  loading,
  styles
}) => {
  const [focusedInput, setFocusedInput] = useState(null);
  const s = createStyles;

  return (
    <div style={s.container}>
      <div style={s.header}>
        <div style={s.iconContainer}>
          <div style={s.icon}>📊</div>
        </div>
        <h3 style={s.title}>Upload Questions via CSV</h3>
        <p style={s.subtitle}>Upload a CSV file with questions and options</p>
      </div>
      
      <input 
        type="file" 
        accept=".csv" 
        onChange={(e) => parseCsvFile(e.target.files[0])} 
        style={{
          ...s.fileInput,
          ...(focusedInput === 'file' ? s.fileInputHover : {})
        }}
        onFocus={() => setFocusedInput('file')}
        onBlur={() => setFocusedInput(null)}
        disabled={loading}
      />
      
      {csvErrors.length > 0 && (
        <div style={s.errorContainer}>
          <h4 style={s.errorTitle}>⚠️ CSV Errors:</h4>
          <ul style={s.errorList}>
            {csvErrors.map((error, index) => (
              <li key={index} style={s.errorItem}>{error}</li>
            ))}
          </ul>
        </div>
      )}
      
      {showCsvPreview && (
        <div>
          <h4 style={{ color: 'white', fontSize: '20px', marginBottom: '15px', fontWeight: '600' }}>
            📋 CSV Preview ({csvPreview.length} questions):
          </h4>
          <div style={s.tableContainer}>
            <table style={s.table}>
              <thead style={s.tableHeader}>
                <tr>
                  <th style={s.tableHeaderCell}>Question</th>
                  <th style={s.tableHeaderCell}>A</th>
                  <th style={s.tableHeaderCell}>B</th>
                  <th style={s.tableHeaderCell}>C</th>
                  <th style={s.tableHeaderCell}>D</th>
                  <th style={s.tableHeaderCell}>Correct</th>
                </tr>
              </thead>
              <tbody>
                {csvPreview.map((q, index) => (
                  <tr 
                    key={index}
                    style={s.tableRow}
                    onMouseEnter={(e) => {
                      Object.assign(e.currentTarget.style, s.tableRowHover);
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = '';
                    }}
                  >
                    <td style={s.tableCell}>{q.question}</td>
                    <td style={s.tableCell}>{q.options.a}</td>
                    <td style={s.tableCell}>{q.options.b}</td>
                    <td style={s.tableCell}>{q.options.c}</td>
                    <td style={s.tableCell}>{q.options.d}</td>
                    <td style={{
                      ...s.tableCell,
                      fontWeight: 'bold',
                      color: '#4facfe'
                    }}>{q.correct}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={s.buttonGroup}>
            <button 
              style={{
                ...s.button,
                ...s.buttonSuccess,
                ...(loading || csvErrors.length > 0 ? s.buttonDisabled : {})
              }}
              onClick={handleCsvUpload} 
              disabled={loading || csvErrors.length > 0}
              onMouseEnter={(e) => {
                if (!loading && csvErrors.length === 0) {
                  Object.assign(e.currentTarget.style, s.buttonHover);
                }
              }}
              onMouseLeave={(e) => {
                if (!loading && csvErrors.length === 0) {
                  e.currentTarget.style.transform = '';
                  e.currentTarget.style.boxShadow = s.buttonSuccess.boxShadow;
                }
              }}
            >
              {loading ? 'Uploading...' : '📤 Upload CSV'}
            </button>
            <button 
              style={{
                ...s.button,
                ...s.buttonSecondary
              }}
              onClick={clearCsvUpload} 
              disabled={loading}
              onMouseEnter={(e) => {
                if (!loading) {
                  Object.assign(e.currentTarget.style, s.buttonHover);
                }
              }}
              onMouseLeave={(e) => {
                if (!loading) {
                  e.currentTarget.style.transform = '';
                  e.currentTarget.style.boxShadow = s.buttonSecondary.boxShadow;
                }
              }}
            >
              🗑️ Clear
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CsvUpload;