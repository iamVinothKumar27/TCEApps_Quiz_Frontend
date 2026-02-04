import React, { useState } from 'react';
import { waitingStyles as styles, waitingAnimations } from './waitingStyles';
import { ToastContainer } from 'react-toastify';

const WaitingForAdmin = ({ loading, suspensionMessage, handleResumeQuiz, loggedInUser }) => {
  const [buttonHovered, setButtonHovered] = useState(false);

  // Generate floating sad emojis
  const sadEmojis = ['😢', '😭', '😔', '😞', '🙁', '☹️', '😿', '💔'];
  const floatingEmojis = sadEmojis.map((emoji, index) => ({
    emoji,
    delay: index * 0.8,
    duration: 6 + Math.random() * 3,
    left: (index * 12) + 5,
    size: 30 + Math.random() * 20
  }));

  // Generate rain emojis
  const rainEmojis = ['💧', '💦', '😢', '😭'];
  const rainDrops = Array.from({ length: 15 }, (_, index) => ({
    emoji: rainEmojis[Math.floor(Math.random() * rainEmojis.length)],
    delay: index * 0.3,
    left: index * 6.5
  }));

  // Generate crying emojis
  const cryingDrops = Array.from({ length: 6 }, (_, index) => ({
    delay: index * 0.5,
    left: 25 + (index * 10)
  }));

  return (
    <div style={styles.container}>
      {/* Background pattern */}
      <div style={styles.backgroundPattern}></div>

      {/* Floating sad emojis */}
      <div style={styles.emojiContainer}>
        {floatingEmojis.map((item, index) => (
          <div
            key={`float-${index}`}
            style={styles.floatingEmoji(item.delay, item.duration, item.left, item.size)}
          >
            {item.emoji}
          </div>
        ))}

        {/* Rain emojis */}
        {rainDrops.map((drop, index) => (
          <div
            key={`rain-${index}`}
            style={styles.rainEmoji(drop.delay, drop.left)}
          >
            {drop.emoji}
          </div>
        ))}

        {/* Crying emojis */}
        {cryingDrops.map((cry, index) => (
          <div
            key={`cry-${index}`}
            style={styles.cryingEmoji(cry.delay, cry.left)}
          >
            😭
          </div>
        ))}
      </div>

      <div style={styles.waitingCard}>
        <ToastContainer />
        
        {loggedInUser && (
          <div style={styles.userInfoBanner}>
            Logged in as: <span style={styles.userEmail}>{loggedInUser.email}</span>
          </div>
        )}

        {/* Clock emoji for waiting */}
        <div style={styles.clockEmoji}>⏰</div>

        {/* Center spinning sad emoji */}
        <div style={styles.centerEmoji}>😔</div>

        <h2 style={styles.title}>Quiz Suspended</h2>
        
        <p style={styles.message}>{suspensionMessage}</p>

        <button 
          style={{
            ...styles.button,
            ...(loading ? styles.buttonDisabled : {}),
            ...(buttonHovered && !loading ? styles.buttonHover : {})
          }}
          onClick={handleResumeQuiz} 
          disabled={loading}
          onMouseEnter={() => setButtonHovered(true)}
          onMouseLeave={() => setButtonHovered(false)}
        >
          {loading ? 'Checking...' : 'Check for Approval'}
        </button>

        {/* Additional waiting message */}
        <div style={{
          marginTop: '25px',
          fontSize: '14px',
          color: 'rgba(255, 255, 255, 0.8)',
          fontStyle: 'italic'
        }}>
          Please wait for admin approval to continue...
        </div>
      </div>

      {/* Inject CSS Animations */}
      <style>{waitingAnimations}</style>
    </div>
  );
};

export default WaitingForAdmin;