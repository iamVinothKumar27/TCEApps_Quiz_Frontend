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
        {loggedInUser && (
          <div style={styles.userInfoBanner}>
            Logged in as: <span style={{ fontWeight: '600' }}>{loggedInUser.email}</span>
          </div>
        )}
        
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

      {/* Footer Section */}
      <div style={styles.footerBlack}>
        <div style={styles.footerOverlay}></div>
        <div style={styles.footerShape1}></div>
        <div style={styles.footerShape2}></div>
        <div style={styles.footerShape3}></div>
        
        <div style={styles.footerThreeColumns}>
          <div style={styles.footerLeftColumn}>
            <div style={{ ...styles.footerHeading, position: 'relative' }}>
              Developed By
              <div style={styles.footerHeadingUnderline}></div>
            </div>
            {['ROSHINI M - IT', 'MATHIVATHANI E - IT', 'SHANMATHI N - IT', 'HARINI R - IT', 'SANCHANA R - IT'].map((name, idx) => (
              <div key={idx} style={styles.developerName}>
                <div style={styles.developerNameShimmer}></div>
                {name}
              </div>
            ))}
          </div>

          <div style={styles.footerCenterColumn}>
            <div style={{ ...styles.footerHeading, position: 'relative' }}>
              HEAD OF THE DEPARTMENT
              <div style={{ ...styles.footerHeadingUnderline, left: '50%', transform: 'translateX(-50%)' }}></div>
            </div>
            <div style={styles.departmentHead}>Dr. C. DEISY</div>
          </div>

          <div style={styles.footerRightColumn}>
            <div style={{ ...styles.footerHeading, position: 'relative' }}>
              Under the guidance of
              <div style={{ ...styles.footerHeadingUnderline, left: 'auto', right: 0 }}></div>
            </div>
            <div style={styles.guidanceInfo}>Department of Information Technology</div>
            <div style={styles.guidanceInfo}>C.V. NISHA ANGELINE</div>
          </div>
        </div>
      </div>

      {/* Inject CSS Animations */}
      <style>{resultViewAnimations}</style>
    </div>
  );
};

export default ResultView;