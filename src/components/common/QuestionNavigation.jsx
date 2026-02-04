import React from "react";

const getStatus = (index, answeredQuestions, currentQuestion) => {
  if (index === currentQuestion) return "current";
  if (answeredQuestions.includes(index)) return "answered";
  return "not-answered";
};

const statusColors = {
  answered: "#4caf50",      // Green
  current: "#ff9800",       // Orange
  "not-answered": "#fff"   // White
};

const textColors = {
  answered: "#fff",
  current: "#fff",
  "not-answered": "#333"
};

const borderColors = {
  answered: "#388e3c",
  current: "#ff9800",
  "not-answered": "#bdbdbd"
};

const QuestionNavigation = ({
  totalQuestions,
  answeredQuestions,
  currentQuestion,
  onNavigate
}) => (
  <div style={{ background: "rgba(255,255,255,0.9)", borderRadius: 24, padding: 24, margin: '24px auto', maxWidth: 700 }}>
    <div style={{ display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "center" }}>
      {Array.from({ length: totalQuestions }, (_, i) => {
        const idx = i;
        const status = getStatus(idx, answeredQuestions, currentQuestion);
        return (
          <button
            key={idx}
            onClick={() => onNavigate(idx)}
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              background: statusColors[status],
              color: textColors[status],
              border: `2px solid ${borderColors[status]}`,
              fontWeight: "bold",
              fontSize: 16,
              cursor: "pointer",
              outline: status === "current" ? "2px solid #ff9800" : "none"
            }}
          >
            {idx + 1}
          </button>
        );
      })}
    </div>
    <div style={{ marginTop: 16, textAlign: "center", fontSize: 14 }}>
      <span style={{ color: statusColors.answered, background: borderColors.answered, borderRadius: '50%', padding: '0 6px' }}>●</span> Answered&nbsp;|&nbsp;
      <span style={{ color: statusColors.current, background: borderColors.current, borderRadius: '50%', padding: '0 6px' }}>●</span> Current&nbsp;|&nbsp;
      <span style={{ color: borderColors["not-answered"] }}>●</span> Not Answered
    </div>
  </div>
);

export default QuestionNavigation;
