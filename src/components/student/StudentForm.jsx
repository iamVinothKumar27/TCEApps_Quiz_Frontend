import React, { useState } from 'react';
import { gradientStyles } from './gradientStyles';
import LoadingError from '../common/LoadingError';
import { ToastContainer } from 'react-toastify';

const StudentForm = ({ loading, error, currentQuiz, studentInfo, setStudentInfo, startStudentQuiz, setStudentView, loggedInUser }) => {
  const [focusedField, setFocusedField] = useState(null);

  return (
    <div style={gradientStyles.container}>
      <div style={gradientStyles.cardCyan}>
        <ToastContainer />
        <LoadingError loading={loading} error={error} />
        
        {loggedInUser && (
          <div style={gradientStyles.userInfoBanner}>
            Logged in as: <span style={gradientStyles.userEmail}>{loggedInUser.email}</span>
          </div>
        )}

        <div style={{ ...gradientStyles.centerContent, marginBottom: '30px' }}>
          <button 
            style={{
              ...gradientStyles.button,
              marginBottom: '20px',
              ...(loading ? gradientStyles.buttonDisabled : {})
            }}
            onClick={() => setStudentView('codeEntry')} 
            disabled={loading}
            onMouseEnter={(e) => {
              if (!loading) {
                Object.assign(e.target.style, gradientStyles.buttonHover);
              }
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
            }}
          >
            ← Back
          </button>
          
          <h2 style={gradientStyles.title}>Student Information</h2>
          <p style={gradientStyles.subtitle}>Quiz: {currentQuiz?.name}</p>
          <p style={gradientStyles.subtitle}>Questions: {currentQuiz?.questions?.length || 0} | Time: 90 minutes</p>
        </div>
        
        <input
          type="text"
          placeholder="Full Name"
          value={studentInfo.name}
          onChange={(e) => setStudentInfo({ ...studentInfo, name: e.target.value })}
          style={{
            ...gradientStyles.input,
            ...(focusedField === 'name' ? gradientStyles.inputFocus : {})
          }}
          onFocus={() => setFocusedField('name')}
          onBlur={() => setFocusedField(null)}
        />

        <input
          type="text"
          placeholder="Register Number"
          value={studentInfo.regNo}
          onChange={(e) => setStudentInfo({ ...studentInfo, regNo: e.target.value })}
          style={{
            ...gradientStyles.input,
            ...(focusedField === 'regNo' ? gradientStyles.inputFocus : {})
          }}
          onFocus={() => setFocusedField('regNo')}
          onBlur={() => setFocusedField(null)}
        />

        <select
          value={studentInfo.department}
          onChange={(e) => setStudentInfo({ ...studentInfo, department: e.target.value })}
          style={{
            ...gradientStyles.input,
            ...(focusedField === 'department' ? gradientStyles.inputFocus : {})
          }}
          onFocus={() => setFocusedField('department')}
          onBlur={() => setFocusedField(null)}
        >
          <option value="">Select Department *</option>
          <option value="Civil">Civil Engineering</option>
          <option value="Mechanical">Mechanical Engineering</option>
          <option value="EEE">Electrical and Electronics Engineering</option>
          <option value="ECE">Electronics and Communication Engineering</option>
          <option value="CSE">Computer Science Engineering</option>
          <option value="CSE AIML">CSE - Artificial Intelligence and Machine Learning</option>
          <option value="IT">Information Technology</option>
          <option value="Mechatronics">Mechatronics</option>
          <option value="AMCS">Applied Mathematics and Computational Sciences</option>
          <option value="CSBS">Computer Science and Business Systems</option>
          <option value="TSEDA">Architecture,Design,Planning</option>
          <option value="other">Other</option>
        </select>

        <select
          value={studentInfo.section}
          onChange={(e) => setStudentInfo({ ...studentInfo, section: e.target.value })}
          style={{
            ...gradientStyles.input,
            ...(focusedField === 'section' ? gradientStyles.inputFocus : {})
          }}
          onFocus={() => setFocusedField('section')}
          onBlur={() => setFocusedField(null)}
        >
          <option value="">Select Section *</option>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
          <option value="D">D</option>
          <option value="Other">Other</option>
        </select>

        <div style={{ ...gradientStyles.centerContent, marginTop: '30px' }}>
          <button 
            style={{
              ...gradientStyles.button,
              ...(loading ? gradientStyles.buttonDisabled : {})
            }}
            onClick={startStudentQuiz} 
            disabled={loading}
            onMouseEnter={(e) => {
              if (!loading) {
                Object.assign(e.target.style, gradientStyles.buttonHover);
              }
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
            }}
          >
            {loading ? 'Starting...' : 'Start Quiz'}
          </button>
        </div>

        <div style={{
          marginTop: '20px',
          padding: '15px 20px',
          background: 'rgba(255, 255, 255, 0.25)',
          backdropFilter: 'blur(10px)',
          borderRadius: '12px',
          border: '1px solid rgba(255, 255, 255, 0.4)'
        }}>
          <strong style={{ 
            color: '#ffffff',
            fontSize: '16px',
            display: 'block',
            marginBottom: '10px'
          }}>
            ⚠️ Important Instructions:
          </strong>
          <ul style={{ 
            margin: '10px 0', 
            paddingLeft: '20px', 
            color: '#ffffff',
            lineHeight: '1.8'
          }}>
            <li>Do not refresh, minimize, resize, or switch tabs during the quiz.</li>
            <li>Any attempt to switch tabs, copy content, or navigate away will result in immediate termination and auto-submission of the quiz.</li>
            <li>You are allotted 90 minutes to complete the quiz.</li>
            <li>All fields must be filled before starting the quiz.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StudentForm;