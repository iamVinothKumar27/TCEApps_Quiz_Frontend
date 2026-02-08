import React, { useState, useEffect } from 'react';
import { getApiBaseUrl } from '../config/api';
import { useNavigate } from 'react-router-dom';
import { authStyles as styles, authAnimations } from './authStyles';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

const Auth = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [showRegistration, setShowRegistration] = useState(false);
  const [registrationError, setRegistrationError] = useState('');
  const [registrationData, setRegistrationData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [user, setUser] = useState(null);
  const [focusedField, setFocusedField] = useState(null);
  const [hoveredButton, setHoveredButton] = useState(null);

  // Generate bubbles
  const bubbles = Array.from({ length: 20 }, (_, i) => ({
    delay: i * 0.5,
    duration: 8 + Math.random() * 4,
    left: i * 5,
    size: 40 + Math.random() * 80
  }));

  // Generate particles
  const particles = Array.from({ length: 30 }, (_, i) => ({
    delay: i * 0.3,
    left: i * 3.33,
    duration: 3 + Math.random() * 2
  }));

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      if (parsedUser.role === "admin") {
        navigate("/admin", { replace: true });
      } else if (parsedUser.role === "student") {
        navigate("/student", { replace: true });
      }
    }
  }, [navigate]);

  const API_BASE_URL = getApiBaseUrl();
  
  const determineRoleFromEmail = (email) => {
    const domain = email.toLowerCase().split('@')[1];
    const facultyDomains = [
      'tce.edu'
      //'admin.college.edu',
      //'staff.college.edu',
      //'instructor.college.edu',
    ];
    return facultyDomains.includes(domain) ? 'admin' : 'student';
  };

  const apiCall = async (endpoint, method = 'GET', data = null) => {
    setLoading(true);
    try {
      const config = {
        method,
        headers: { 'Content-Type': 'application/json' },
      };
      if (data) config.body = JSON.stringify(data);

      const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const result = await response.json();
      setLoading(false);
      return result;
    } catch (error) {
      setLoading(false);
      console.error('API Error:', error);
      throw error;
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
  try {
    setLoading(true);
    const decoded = jwtDecode(credentialResponse.credential);
    
    // Send to your backend to verify and create/login user
    const response = await fetch(`${API_BASE_URL}/api/auth/google/verify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: credentialResponse.credential })
    });
    
    const result = await response.json();
    
    if (result.success && result.user) {
      localStorage.setItem('user', JSON.stringify(result.user));
      setUser(result.user);
      
      if (result.user.role === 'admin') {
        navigate('/admin', { replace: true });
      } else {
        navigate('/student', { replace: true });
      }
    }
  } catch (error) {
    toast.error('Google login failed: ' + error.message);
  } finally {
    setLoading(false);
  }
};

  const handleUserLogin = async () => {
    if (!userEmail || !userPassword) {
      toast.info('Please enter both email and password');
      return;
    }
    try {
      const response = await apiCall('/api/user/login', 'POST', {
        email: userEmail,
        password: userPassword,
      });

      if (response.success && response.user) {
        localStorage.setItem('user', JSON.stringify(response.user));
        setUser(response.user);

        if (response.user.role === 'admin') {
          navigate('/admin', { replace: true });
        } else {
          navigate('/student', { replace: true });
        }
      } else {
        toast.error('Invalid login credentials.');
      }
    } catch (error) {
      toast.error('Login failed: ' + error.message);
    }
  };

  const handleUserRegistration = async () => {
    if (!registrationData.name || !registrationData.email || !registrationData.password) {
      setRegistrationError('Please fill all required fields');
      return;
    }
    if (registrationData.password !== registrationData.confirmPassword) {
      setRegistrationError('Passwords do not match');
      return;
    }

    const role = determineRoleFromEmail(registrationData.email);
    try {
      const response = await apiCall('/api/user/register', 'POST', {
        name: registrationData.name,
        email: registrationData.email,
        password: registrationData.password,
        role,
      });

      if (response.success) {
        toast.success(`Registration successful as ${role === 'admin' ? 'Faculty' : 'Student'}! Please login.`);
        setShowRegistration(false);
        setRegistrationData({ name: '', email: '', password: '', confirmPassword: '' });
        setRegistrationError('');
      }
    } catch (error) {
      setRegistrationError('Registration failed: ' + error.message);
    }
  };

  return (
    <div style={styles.container}>
      {/* Floating Bubbles */}
      <div style={styles.bubbleContainer}>
        {bubbles.map((bubble, i) => (
          <div key={`bubble-${i}`} style={styles.bubble(bubble.delay, bubble.duration, bubble.left, bubble.size)} />
        ))}
      </div>
      {/* Falling Particles */}
      <div style={styles.particleContainer}>
        {particles.map((particle, i) => (
          <div key={`particle-${i}`} style={styles.particle(particle.delay, particle.left, particle.duration)} />
        ))}
      </div>

      <div style={styles.card}>
        <ToastContainer />
        
        {/* Decorative circles */}
        <div style={styles.decorCircle1}></div>
        <div style={styles.decorCircle2}></div>

        {/* Header */}
        <div style={styles.logoContainer}>
          <img
            src="/logo.png"
            alt="TCE Logo"
            style={styles.logo}
          />
          <h1 style={styles.collegeName}>
            Thiagarajar College of Engineering
          </h1>
        </div>

        {/* Login Form */}
        {!showRegistration ? (
          <div style={styles.formContainer}>
            <input
              type="email"
              placeholder="✉️  Enter your email address"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              style={{
                ...styles.input,
                ...(focusedField === 'email' ? styles.inputFocus : {})
              }}
              onFocus={() => setFocusedField('email')}
              onBlur={() => setFocusedField(null)}
              disabled={loading}
            />
            <input
              type="password"
              placeholder="🔒  Enter your password"
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)}
              style={{
                ...styles.input,
                ...(focusedField === 'password' ? styles.inputFocus : {})
              }}
              onFocus={() => setFocusedField('password')}
              onBlur={() => setFocusedField(null)}
              onKeyPress={(e) => e.key === 'Enter' && handleUserLogin()}
              disabled={loading}
            />
            <div style={{ textAlign: 'center' }}>
              <button
                style={{
                  ...styles.button,
                  ...(loading ? styles.buttonDisabled : {}),
                  ...(hoveredButton === 'login' && !loading ? styles.buttonHover : {})
                }}
                onClick={handleUserLogin}
                disabled={loading}
                onMouseEnter={() => setHoveredButton('login')}
                onMouseLeave={() => setHoveredButton(null)}
              >
                <div style={styles.buttonShine}></div>
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </div>

<div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      margin: '20px 0',
      gap: '10px'
    }}>
      <div style={{ flex: 1, height: '1px', background: '#ddd' }}></div>
      <span style={{ color: '#666', fontSize: '14px' }}>OR</span>
      <div style={{ flex: 1, height: '1px', background: '#ddd' }}></div>
    </div>
    
    {/* Google Sign-In Button */}
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <GoogleLogin
        onSuccess={handleGoogleSuccess}
        onError={() => toast.error('Google login failed')}
        useOneTap
        theme="outline"
        size="large"
        text="signin_with"
      />
    </div>

           {/*<div style={styles.text}>
              <p style={styles.textContent}>Don't have an account?</p>
              <button
                style={{
                  ...styles.button,
                  ...styles.registerButton,
                  ...(hoveredButton === 'register' && !loading ? styles.registerButtonHover : {})
                }}
                onClick={() => setShowRegistration(true)}
                disabled={loading}
                onMouseEnter={() => setHoveredButton('register')}
                onMouseLeave={() => setHoveredButton(null)}
              >
                <div style={styles.buttonShine}></div>
                Register Here
              </button>
            </div>*/}
          </div>
        ) : (
          /* Registration Form */
          <div style={styles.formContainer}>
            {registrationError && <div style={styles.errorMessage}>{registrationError}</div>}
            <input
              type="text"
              placeholder="👤  Full Name *"
              value={registrationData.name}
              onChange={(e) => setRegistrationData({ ...registrationData, name: e.target.value })}
              style={{
                ...styles.input,
                ...(focusedField === 'name' ? styles.inputFocus : {})
              }}
              onFocus={() => setFocusedField('name')}
              onBlur={() => setFocusedField(null)}
              disabled={loading}
            />
            <input
              type="email"
              placeholder="✉️  Email Address *"
              value={registrationData.email}
              onChange={(e) => setRegistrationData({ ...registrationData, email: e.target.value })}
              style={{
                ...styles.input,
                ...(focusedField === 'regEmail' ? styles.inputFocus : {})
              }}
              onFocus={() => setFocusedField('regEmail')}
              onBlur={() => setFocusedField(null)}
              disabled={loading}
            />
            <input
              type="password"
              placeholder="🔒  Password *"
              value={registrationData.password}
              onChange={(e) => setRegistrationData({ ...registrationData, password: e.target.value })}
              style={{
                ...styles.input,
                ...(focusedField === 'regPassword' ? styles.inputFocus : {})
              }}
              onFocus={() => setFocusedField('regPassword')}
              onBlur={() => setFocusedField(null)}
              disabled={loading}
            />
            <input
              type="password"
              placeholder="🔒  Confirm Password *"
              value={registrationData.confirmPassword}
              onChange={(e) => setRegistrationData({ ...registrationData, confirmPassword: e.target.value })}
              style={{
                ...styles.input,
                ...(focusedField === 'confirmPassword' ? styles.inputFocus : {})
              }}
              onFocus={() => setFocusedField('confirmPassword')}
              onBlur={() => setFocusedField(null)}
              disabled={loading}
            />
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <button
                style={{
                  ...styles.button,
                  ...(loading ? styles.buttonDisabled : {}),
                  ...(hoveredButton === 'regSubmit' && !loading ? styles.buttonHover : {})
                }}
                onClick={handleUserRegistration}
                disabled={loading}
                onMouseEnter={() => setHoveredButton('regSubmit')}
                onMouseLeave={() => setHoveredButton(null)}
              >
                <div style={styles.buttonShine}></div>
                {loading ? 'Registering...' : 'Register'}
              </button>
            </div>
            <div style={styles.text}>
              <p style={styles.textContent}>Already have an account?</p>
              <button
                style={{
                  ...styles.button,
                  ...styles.backButton,
                  ...(hoveredButton === 'back' && !loading ? styles.buttonHover : {})
                }}
                onClick={() => {
                  setShowRegistration(false);
                  setRegistrationError('');
                }}
                disabled={loading}
                onMouseEnter={() => setHoveredButton('back')}
                onMouseLeave={() => setHoveredButton(null)}
              >
                <div style={styles.buttonShine}></div>
                Back to Login
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Inject CSS Animations */}
      <style>{authAnimations}</style>

      {/* Global Footer (same across pages) */}
      
      
    </div>
  );
};
export default Auth;