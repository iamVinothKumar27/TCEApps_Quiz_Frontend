import React, { useEffect, useState } from 'react';
import { resultViewStyles as styles, resultViewAnimations } from './resultViewStyles';
import { ToastContainer } from 'react-toastify';
import { calculateStudentResults } from './studentUtils';

const ResultView = ({ currentQuiz, userAnswers, studentInfo, loggedInUser }) => {
  const { scorePercentage } = calculateStudentResults(currentQuiz, userAnswers);
  const [showCelebration, setShowCelebration] = useState(true);

  // Generate random confetti pieces
  const generateConfetti = () => {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7', '#fd79a8', '#fdcb6e', '#a29bfe'];
    const confettiPieces = [];
    
    for (let i = 0; i < 50; i++) {
      confettiPieces.push({
        delay: Math.random() * 3,
        duration: 3 + Math.random() * 2,
        left: Math.random() * 100,
        rotation: Math.random() * 360,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }
    return confettiPieces;
  };

  // Generate firework bursts
  const generateFireworks = () => {
    const fireworks = [];
    for (let i = 0; i < 8; i++) {
      fireworks.push({
        delay: i * 0.3,
        left: 20 + Math.random() * 60,
        top: 20 + Math.random() * 40
      });
    }
    return fireworks;
  };

  // Generate floating particles
  const generateParticles = () => {
    const colors = ['#667eea', '#764ba2', '#f093fb', '#4facfe'];
    const particles = [];
    
    for (let i = 0; i < 20; i++) {
      particles.push({
        delay: Math.random() * 2,
        size: 6 + Math.random() * 8,
        left: Math.random() * 100,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }
    return particles;
  };

  const [confetti] = useState(generateConfetti());
  const [fireworks] = useState(generateFireworks());
  const [particles] = useState(generateParticles());

  useEffect(() => {
    // Stop celebration after 10 seconds
    const timer = setTimeout(() => setShowCelebration(false), 10000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={styles.container}>
      <ToastContainer />
      
      {/* Confetti Animation */}
      {showCelebration && (
        <div style={styles.confettiContainer}>
          {confetti.map((piece, index) => (
            <div
              key={`confetti-${index}`}
              style={styles.confettiPiece(
                piece.delay,
                piece.duration,
                piece.left,
                piece.rotation,
                piece.color
              )}
            />
          ))}
          
          {/* Firework Bursts */}
          {fireworks.map((fw, index) => (
            <div
              key={`firework-${index}`}
              style={styles.fireworkBurst(fw.delay, fw.left, fw.top)}
            />
          ))}
          
          {/* Floating Particles */}
          {particles.map((particle, index) => (
            <div
              key={`particle-${index}`}
              style={styles.floatingParticle(
                particle.delay,
                particle.size,
                particle.left,
                particle.color
              )}
            />
          ))}
        </div>
      )}

      <div style={styles.card}>
        <div style={styles.resultCard}>
          <div style={{ fontSize: '48px', marginBottom: '10px' }}>🎉</div>
          <h2 style={{ 
            fontSize: '32px', 
            color: '#2d3748', 
            marginBottom: '10px',
            fontWeight: '700'
          }}>
            Quiz Submitted!
          </h2>
          <p style={{ 
            fontSize: '16px', 
            color: '#718096',
            marginBottom: '20px'
          }}>
            Your answers have been recorded successfully
          </p>
          
          <div style={styles.studentInfo}>
            <div>
              <span style={{ color: '#667eea', fontWeight: 700 }}>Name:</span> {studentInfo.name}
            </div>
            <div style={styles.divider}></div>
            <div>
              <span style={{ color: '#667eea', fontWeight: 700 }}>Reg No:</span> {studentInfo.regNo}
            </div>
            <div style={styles.divider}></div>
            <div>
              <span style={{ color: '#667eea', fontWeight: 700 }}>Dept:</span> {studentInfo.department}
            </div>
            <div style={styles.divider}></div>
            <div>
              <span style={{ color: '#667eea', fontWeight: 700 }}>Sec:</span> {studentInfo.section}
            </div>
          </div>
        </div>
      </div>
      {/* Inject CSS Animations */}
      <style>{resultViewAnimations}</style>
    </div>
  );
};

export default ResultView;