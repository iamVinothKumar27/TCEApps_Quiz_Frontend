// Helper function to convert between display numbers (1,2,3,4) and backend letters (A,B,C,D)
export const numberToLetter = (number) => {
  const mapping = { '1': 'A', '2': 'B', '3': 'C', '4': 'D' };
  return mapping[number] || number;
};

export const letterToNumber = (letter) => {
  const mapping = { 'A': '1', 'B': '2', 'C': '3', 'D': '4' };
  return mapping[letter] || letter;
};

export function shuffleArray(array) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

export const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

export const calculateStudentResults = (currentQuiz, userAnswers) => {
  if (!currentQuiz) return { correctAnswers: 0, wrongAnswers: 0, scorePercentage: 0, grade: 'F' };
  const correctAnswers = userAnswers.reduce((count, answer, index) => {
    return answer === currentQuiz.questions[index].correct ? count + 1 : count;
  }, 0);
  const totalQuestions = currentQuiz.questions.length;
  const wrongAnswers = totalQuestions - correctAnswers;
  const scorePercentage = Math.round((correctAnswers / totalQuestions) * 100);
  let grade;
  if (scorePercentage >= 90) grade = 'A+';
  else if (scorePercentage >= 80) grade = 'A';
  else if (scorePercentage >= 70) grade = 'B';
  else if (scorePercentage >= 60) grade = 'C';
  else if (scorePercentage >= 50) grade = 'D';
  else grade = 'F';
  return { correctAnswers, wrongAnswers, scorePercentage, grade };
};

export const apiCall = async (endpoint, method = 'GET', data = null, API_BASE_URL, setLoading, setError) => {
  setLoading(true);
  setError('');
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
    setError(error.message);
    console.error('API Error:', error);
    throw error;
  }
};

export const checkAndHandleViolation = async (studentName, regNo, sessionId, API_BASE_URL, setLoading, setError, setViolationId, setStudentView, setSuspensionMessage) => {
  try {
    const response = await apiCall('/api/quiz-violations/check-pending', 'POST', { 
      studentName, 
      regNo, 
      sessionId 
    }, API_BASE_URL, setLoading, setError);
    
    if (response.hasPendingViolation) {
      setViolationId(response.violationId);
      setStudentView('waitingForAdmin');
      setSuspensionMessage(
        `Your quiz was suspended due to ${response.violationType.replace('_', ' ')}.\n\nPlease wait for your instructor to approve your quiz continuation.`
      );
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error checking pending violation:', error);
    return false;
  }
};

export const openFullscreen = () => {
  const elem = document.documentElement;
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.mozRequestFullScreen) {
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) {
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    elem.msRequestFullscreen();
  }
};

export const exitFullscreen = () => {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
};

