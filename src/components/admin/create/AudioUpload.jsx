import React, { useState } from 'react';
import { createStyles } from './styles';

const AudioUpload = ({
  audioUrl,
  setAudioFile,
  handleAddAudio,
  loading,
  styles
}) => {
  const [focusedInput, setFocusedInput] = useState(null);
  const s = createStyles;

  return (
    <div style={s.container}>
      <div style={s.header}>
        <div style={s.iconContainer}>
          <div style={s.icon}>🎵</div>
        </div>
        <h3 style={s.title}>Upload Audio File</h3>
        <p style={s.subtitle}>Upload an audio file for your quiz</p>
      </div>
      
      <input 
        type="file" 
        accept="audio/*" 
        onChange={(e) => setAudioFile(e.target.files[0])} 
        style={{
          ...s.fileInput,
          ...(focusedInput === 'file' ? s.fileInputHover : {})
        }}
        onFocus={() => setFocusedInput('file')}
        onBlur={() => setFocusedInput(null)}
        disabled={loading}
      />

      {audioUrl && (
        <div style={s.audioContainer}>
          <p style={s.audioLabel}>🎧 Audio Preview:</p>
          <audio 
            controls 
            src={audioUrl} 
            style={{ 
              width: '100%',
              borderRadius: '8px',
              outline: 'none'
            }} 
          />
        </div>
      )}

      <div style={s.buttonGroup}>
        <button 
          style={{
            ...s.button,
            ...(loading ? s.buttonDisabled : {})
          }}
          onClick={handleAddAudio} 
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
          {loading ? 'Uploading...' : '➕ Upload Audio'}
        </button>
      </div>
    </div>
  );
};

export default AudioUpload;