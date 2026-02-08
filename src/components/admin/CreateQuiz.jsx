import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { styles } from '../common/styles';
import LoadingError from '../common/LoadingError';
import ConfirmModal from './ConfirmModal';
import ManualEntry from './create/ManualEntry';
import ImageQuestions from './create/ImageQuestions';
import CsvUpload from './create/CsvUpload';
import ComprehensionPassage from './create/ComprehensionPassage';
import AudioUpload from './create/AudioUpload';
import QuestionsPreview from './create/QuestionsPreview';

const CreateQuiz = ({ 
  currentSessionId, 
  quizSessions, 
  loading, 
  error,
  setActiveAdminSection,
  loadQuizSessions,
  user,
  API_BASE_URL 
}) => {
  const [entryMethod, setEntryMethod] = useState('manual');
  const [questionText, setQuestionText] = useState('');
  const [optionA, setOptionA] = useState('');
  const [optionB, setOptionB] = useState('');
  const [optionC, setOptionC] = useState('');
  const [optionD, setOptionD] = useState('');
  const [correctOption, setCorrectOption] = useState('');
  const [questionMarks, setQuestionMarks] = useState(1);
  const [questionTimeSeconds, setQuestionTimeSeconds] = useState(60);
  const [csvFile, setCsvFile] = useState(null);
  const [csvErrors, setCsvErrors] = useState([]);
  const [csvPreview, setCsvPreview] = useState([]);
  const [showCsvPreview, setShowCsvPreview] = useState(false);
  const [passageTitle, setPassageTitle] = useState('');
  const [passageText, setPassageText] = useState('');
  const [audioFile, setAudioFile] = useState(null);
  const [audioUrl, setAudioUrl] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [showQuestionsPreview, setShowQuestionsPreview] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [editQuestionData, setEditQuestionData] = useState({
    question: '',
    options: { a: '', b: '', c: '', d: '' },
    correct: '',
    marks: 1,
    timeSeconds: 60
  });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [questionToDelete, setQuestionToDelete] = useState(null);

  const apiCall = async (endpoint, method = 'GET', data = null) => {
    try {
      const config = {
        method,
        headers: { 'Content-Type': 'application/json' },
      };
      if (data) config.body = JSON.stringify(data);
      const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  };

  const handleAddQuestion = async () => {
    if (questionText && optionA && optionB && optionC && optionD && correctOption && currentSessionId) {
      try {
        const questionData = {
          question: questionText,
          options: { a: optionA, b: optionB, c: optionC, d: optionD },
          correct: correctOption,
          marks: questionMarks,
          timeSeconds: questionTimeSeconds,
        };
        await apiCall(`/api/quiz-sessions/${currentSessionId}/questions`, 'POST', questionData);
        setQuestionText('');
        setOptionA('');
        setOptionB('');
        setOptionC('');
        setOptionD('');
        setCorrectOption('');
        setQuestionMarks(1);
        setQuestionTimeSeconds(60);
        await loadQuizSessions();
        toast.success('Question added successfully!');
        setShowQuestionsPreview(true);
      } catch (error) {
        toast.error('Failed to add question: ' + error.message);
      }
    } else {
      toast.info('Please fill all fields!');
    }
  };

  const parseCsvFile = (file) => {
    import('papaparse').then((Papa) => {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        transformHeader: (header) => header.trim(),
        complete: (results) => {
          if (results.errors.length > 0) {
            const errorMessages = results.errors.map((e) => `Row ${e.row + 1}: ${e.message}`);
            setCsvErrors(errorMessages);
            toast.error('CSV parsing errors found. Check the preview section.');
            return;
          }
          const requiredColumns = ['Question', 'Option A', 'Option B', 'Option C', 'Option D', 'Correct Answer'];
          const csvColumns = Object.keys(results.data[0] || {});
          const missingColumns = requiredColumns.filter((col) => !csvColumns.includes(col));
          if (missingColumns.length > 0) {
            setCsvErrors([`Missing required columns: ${missingColumns.join(', ')}`]);
            toast.error(`Missing required columns: ${missingColumns.join(', ')}\n\nRequired columns: ${requiredColumns.join(', ')}`);
            return;
          }
          const questions = results.data.map((row, index) => {
            const correctAnswer = row['Correct Answer']?.toString().trim().toUpperCase();
            return {
              question: row['Question']?.toString().trim(),
              options: {
                a: row['Option A']?.toString().trim(),
                b: row['Option B']?.toString().trim(),
                c: row['Option C']?.toString().trim(),
                d: row['Option D']?.toString().trim(),
              },
              correct: correctAnswer,
              marks: row['Marks'] ?? row['Mark'] ?? row['marks'] ?? 1,
              timeSeconds: row['Time (Seconds)'] ?? row['Time'] ?? row['time'] ?? 60,
              rowIndex: index + 2,
            };
          });
          const validationErrors = [];
          questions.forEach((q, index) => {
            if (!q.question) validationErrors.push(`Row ${q.rowIndex}: Question is empty`);
            if (!q.options.a) validationErrors.push(`Row ${q.rowIndex}: Option A is empty`);
            if (!q.options.b) validationErrors.push(`Row ${q.rowIndex}: Option B is empty`);
            if (!q.options.c) validationErrors.push(`Row ${q.rowIndex}: Option C is empty`);
            if (!q.options.d) validationErrors.push(`Row ${q.rowIndex}: Option D is empty`);
            if (!['A', 'B', 'C', 'D'].includes(q.correct)) {
              validationErrors.push(`Row ${q.rowIndex}: Correct answer must be A, B, C, or D (found: ${q.correct})`);
            }
            const mVal = Number(q.marks);
            const tVal = Number(q.timeSeconds);
            if (Number.isNaN(mVal) || mVal < 0) validationErrors.push(`Row ${q.rowIndex}: Marks must be a number >= 0`);
            if (Number.isNaN(tVal) || tVal < 1) validationErrors.push(`Row ${q.rowIndex}: Time (Seconds) must be a number >= 1`);
          });
          if (validationErrors.length > 0) {
            setCsvErrors(validationErrors);
          } else {
            setCsvErrors([]);
          }
          setCsvPreview(questions);
          setShowCsvPreview(true);
        },
        error: (error) => {
          setCsvErrors([`Error reading CSV file: ${error.message}`]);
          toast.error('Error reading CSV file: ' + error.message);
        },
      });
    });
  };

  const handleCsvUpload = async () => {
    if (!csvPreview.length || !currentSessionId) {
      toast.error('No questions to upload or session not selected');
      return;
    }
    if (csvErrors.length > 0) {
      toast.error('Please fix the errors before uploading');
      return;
    }
    try {
      await apiCall(`/api/quiz-sessions/${currentSessionId}/questions/csv`, 'POST', { questions: csvPreview });
      setCsvFile(null);
      setCsvPreview([]);
      setShowCsvPreview(false);
      setCsvErrors([]);
      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput) fileInput.value = '';
      await loadQuizSessions();
      toast.success(`Successfully uploaded ${csvPreview.length} questions!`);
      setShowQuestionsPreview(true);
    } catch (error) {
      toast.error('Failed to upload CSV questions: ' + error.message);
    }
  };

  const clearCsvUpload = () => {
    setCsvFile(null);
    setCsvPreview([]);
    setShowCsvPreview(false);
    setCsvErrors([]);
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) fileInput.value = '';
  };

  const handleAddPassage = async () => {
    if (!passageTitle.trim() || !passageText.trim() || !currentSessionId) {
      toast.info('Please fill in both title and passage text!');
      return;
    }
    try {
      const passageData = { title: passageTitle.trim(), content: passageText.trim() };
      await apiCall(`/api/quiz-sessions/${currentSessionId}/passages`, 'POST', passageData);
      setPassageTitle('');
      setPassageText('');
      await loadQuizSessions();
      toast.success('Passage added successfully!');
    } catch (error) {
      toast.error('Failed to add passage: ' + error.message);
    }
  };

  const handleAddAudio = async () => {
    if (!audioFile) {
      toast.info('Please select an audio file first!');
      return;
    }
    if (!currentSessionId) {
      toast.info('Please create or select a quiz session first!');
      return;
    }
    const formData = new FormData();
    formData.append('audio', audioFile);
    try {
      const response = await fetch(`${API_BASE_URL}/api/quiz-sessions/${currentSessionId}/audio`, {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        const result = await response.json();
        toast.success('Audio uploaded successfully!');
        setAudioFile(null);
        setAudioUrl(`${API_BASE_URL}${result.audioFile.path}`);
        const fileInput = document.querySelector('input[type="file"][accept="audio/*"]');
        if (fileInput) fileInput.value = '';
        await loadQuizSessions();
      } else {
        const error = await response.text();
        toast.error('Failed to upload audio: ' + error);
      }
    } catch (error) {
      toast.error('Failed to upload audio: ' + error.message);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || !currentSessionId) return;
    
    const formData = new FormData();
    formData.append('image', file);
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/quiz-sessions/${currentSessionId}/question-image`, {
        method: 'POST',
        body: formData,
      });
      
      if (response.ok) {
        const result = await response.json();
        setImageUrl(`${API_BASE_URL}${result.imagePath}`);
        setImageFile(file);
        toast.success('Image uploaded successfully!');
      } else {
        toast.error('Failed to upload image');
      }
    } catch (error) {
      toast.error('Error uploading image: ' + error.message);
    }
  };

  const handleAddImageQuestion = async () => {
    if (!imageUrl || !optionA || !optionB || !optionC || !optionD || !correctOption || !currentSessionId) {
      toast.info('Please upload an image and fill all option fields!');
      return;
    }
    
    try {
      const questionData = {
        questionType: 'image',
        question: questionText || '',
        imageUrl: imageUrl.replace(`${API_BASE_URL}`, '').replace(/^\/+/, '/'),
        options: { a: optionA, b: optionB, c: optionC, d: optionD },
        correct: correctOption,
      };
      
      const result = await apiCall(`/api/quiz-sessions/${currentSessionId}/questions`, 'POST', questionData);
      
      if (result && result.message) {
        setQuestionText('');
        setOptionA('');
        setOptionB('');
        setOptionC('');
        setOptionD('');
        setCorrectOption('');
        setImageUrl('');
        setImageFile(null);
        
        const imageInput = document.querySelector('input[type="file"][accept="image/*"]');
        if (imageInput) imageInput.value = '';
        
        await loadQuizSessions();
        toast.success('Image question added successfully!');
        setShowQuestionsPreview(true);
      }
    } catch (error) {
      console.error('Error adding image question:', error);
      toast.error('Failed to add image question: ' + error.message);
    }
  };

  const handleEditQuestion = (question, index) => {
    setEditingQuestion(index);
    setEditQuestionData({
      question: question.question,
      options: { ...question.options },
      correct: question.correct,
      marks: question.marks ?? 1,
      timeSeconds: question.timeSeconds ?? 60
    });
  };

  const handleUpdateQuestion = async () => {
    if (!currentSessionId || editingQuestion === null) return;
    
    try {
      const currentSession = quizSessions.find(s => s.sessionId === currentSessionId);
      if (!currentSession || !currentSession.questions[editingQuestion]) {
        toast.error('Question not found');
        return;
      }

      const updatedQuestions = [...currentSession.questions];
      updatedQuestions[editingQuestion] = {
        ...updatedQuestions[editingQuestion],
        ...editQuestionData
      };

      await apiCall(`/api/quiz-sessions/${currentSessionId}`, 'PUT', {
        questions: updatedQuestions
      });

      await loadQuizSessions();
      setEditingQuestion(null);
      setEditQuestionData({ question: '', options: { a: '', b: '', c: '', d: '' }, correct: '', marks: 1, timeSeconds: 60 });
      toast.success('Question updated successfully!');
    } catch (error) {
      toast.error('Failed to update question: ' + error.message);
    }
  };

  const handleDeleteQuestion = async (questionIndex) => {
    if (!currentSessionId) return;
    setQuestionToDelete(questionIndex);
    setShowDeleteConfirm(true);
  };

  const confirmDeleteQuestion = async () => {
    if (questionToDelete === null || !currentSessionId) return;
    
    try {
      const currentSession = quizSessions.find(s => s.sessionId === currentSessionId);
      if (!currentSession) {
        toast.error('Session not found');
        return;
      }

      const question = currentSession.questions[questionToDelete];
      if (question.questionType === 'image' && question.imageUrl) {
        try {
          await apiCall(`/api/quiz-sessions/delete-image`, 'POST', { 
            imagePath: question.imageUrl 
          });
        } catch (error) {
          console.error('Failed to delete image file:', error);
        }
      }

      const updatedQuestions = currentSession.questions.filter((_, index) => index !== questionToDelete);
      
      await apiCall(`/api/quiz-sessions/${currentSessionId}`, 'PUT', {
        questions: updatedQuestions
      });

      await loadQuizSessions();
      toast.success('Question deleted successfully!');
      setShowDeleteConfirm(false);
      setQuestionToDelete(null);
    } catch (error) {
      toast.error('Failed to delete question: ' + error.message);
      setShowDeleteConfirm(false);
      setQuestionToDelete(null);
    }
  };

  const cancelDeleteQuestion = () => {
    setShowDeleteConfirm(false);
    setQuestionToDelete(null);
  };

  const cancelEdit = () => {
    setEditingQuestion(null);
    setEditQuestionData({ question: '', options: { a: '', b: '', c: '', d: '' }, correct: '' });
  };

  const currentSession = quizSessions.find((s) => s.sessionId === currentSessionId);

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #1a1a2e 100%)',
      padding: '40px 20px'
    }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <LoadingError loading={loading} error={error} />
        
        <button 
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            border: '2px solid rgba(255, 255, 255, 0.2)',
            color: 'white',
            fontWeight: '600',
            padding: '12px 24px',
            borderRadius: '12px',
            cursor: 'pointer',
            marginBottom: '30px',
            transition: 'all 0.3s ease',
            fontSize: '16px'
          }} 
          onClick={() => setActiveAdminSection(null)} 
          disabled={loading}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
            e.currentTarget.style.transform = 'translateX(-5px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
            e.currentTarget.style.transform = 'translateX(0)';
          }}
        >
          ← Back to Dashboard
        </button>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ 
            fontSize: '42px', 
            fontWeight: 'bold', 
            color: 'white', 
            marginBottom: '15px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '15px'
          }}>
            <span style={{ fontSize: '36px' }}>📝</span>
            Create Quiz
          </h1>
          <h2 style={{ 
            fontSize: '24px', 
            color: '#bb86fc', 
            marginBottom: '10px',
            fontWeight: '600'
          }}>
            {currentSession?.name}
          </h2>
          <div style={{
            display: 'inline-block',
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            border: '2px solid rgba(187, 134, 252, 0.3)',
            borderRadius: '50px',
            padding: '12px 25px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
          }}>
            <p style={{ 
              color: 'white', 
              fontWeight: '500',
              margin: 0,
              fontSize: '16px'
            }}>
              Quiz Code: <span style={{ color: '#bb86fc', fontWeight: '700', fontSize: '18px' }}>{currentSessionId}</span>
            </p>
          </div>
        </div>

        {/* Entry Method Tabs */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ 
            display: 'inline-flex', 
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '10px',
            background: 'rgba(255, 255, 255, 0.05)', 
            backdropFilter: 'blur(10px)',
            borderRadius: '20px', 
            padding: '10px',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <button
              style={{
                background: entryMethod === 'manual' ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'transparent',
                color: entryMethod === 'manual' ? 'white' : 'rgba(255, 255, 255, 0.7)',
                border: entryMethod === 'manual' ? 'none' : '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '12px',
                padding: '12px 20px',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '14px',
                transition: 'all 0.3s ease',
                boxShadow: entryMethod === 'manual' ? '0 4px 15px rgba(102, 126, 234, 0.4)' : 'none'
              }}
              onClick={() => setEntryMethod('manual')}
              disabled={loading}
            >
              ✏️ Manual Entry
            </button>
            <button
              style={{
                background: entryMethod === 'image' ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'transparent',
                color: entryMethod === 'image' ? 'white' : 'rgba(255, 255, 255, 0.7)',
                border: entryMethod === 'image' ? 'none' : '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '12px',
                padding: '12px 20px',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '14px',
                transition: 'all 0.3s ease',
                boxShadow: entryMethod === 'image' ? '0 4px 15px rgba(102, 126, 234, 0.4)' : 'none'
              }}
              onClick={() => setEntryMethod('image')}
            >
              🖼️ Image Questions
            </button>
            <button
              style={{
                background: entryMethod === 'csv' ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'transparent',
                color: entryMethod === 'csv' ? 'white' : 'rgba(255, 255, 255, 0.7)',
                border: entryMethod === 'csv' ? 'none' : '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '12px',
                padding: '12px 20px',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '14px',
                transition: 'all 0.3s ease',
                boxShadow: entryMethod === 'csv' ? '0 4px 15px rgba(102, 126, 234, 0.4)' : 'none'
              }}
              onClick={() => setEntryMethod('csv')}
              disabled={loading}
            >
              📊 CSV Upload
            </button>
            <button
              style={{
                background: entryMethod === 'comprehension' ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'transparent',
                color: entryMethod === 'comprehension' ? 'white' : 'rgba(255, 255, 255, 0.7)',
                border: entryMethod === 'comprehension' ? 'none' : '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '12px',
                padding: '12px 20px',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '14px',
                transition: 'all 0.3s ease',
                boxShadow: entryMethod === 'comprehension' ? '0 4px 15px rgba(102, 126, 234, 0.4)' : 'none'
              }}
              onClick={() => setEntryMethod('comprehension')}
              disabled={loading}
            >
              📖 Comprehension
            </button>
            <button
              style={{
                background: entryMethod === 'audio' ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'transparent',
                color: entryMethod === 'audio' ? 'white' : 'rgba(255, 255, 255, 0.7)',
                border: entryMethod === 'audio' ? 'none' : '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '12px',
                padding: '12px 20px',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '14px',
                transition: 'all 0.3s ease',
                boxShadow: entryMethod === 'audio' ? '0 4px 15px rgba(102, 126, 234, 0.4)' : 'none'
              }}
              onClick={() => setEntryMethod('audio')}
              disabled={loading}
            >
              🎵 Audio Upload
            </button>
          </div>
        </div>

        {/* Entry Method Components */}
        {entryMethod === 'manual' && (
          <ManualEntry
            questionMarks={questionMarks}
            setQuestionMarks={setQuestionMarks}
            questionTimeSeconds={questionTimeSeconds}
            setQuestionTimeSeconds={setQuestionTimeSeconds}
            questionText={questionText}
            setQuestionText={setQuestionText}
            optionA={optionA}
            setOptionA={setOptionA}
            optionB={optionB}
            setOptionB={setOptionB}
            optionC={optionC}
            setOptionC={setOptionC}
            optionD={optionD}
            setOptionD={setOptionD}
            correctOption={correctOption}
            setCorrectOption={setCorrectOption}
            handleAddQuestion={handleAddQuestion}
            loading={loading}
            styles={styles}
          />
        )}

        {entryMethod === 'image' && (
          <ImageQuestions
            questionMarks={questionMarks}
            setQuestionMarks={setQuestionMarks}
            questionTimeSeconds={questionTimeSeconds}
            setQuestionTimeSeconds={setQuestionTimeSeconds}
            imageUrl={imageUrl}
            questionText={questionText}
            setQuestionText={setQuestionText}
            optionA={optionA}
            setOptionA={setOptionA}
            optionB={optionB}
            setOptionB={setOptionB}
            optionC={optionC}
            setOptionC={setOptionC}
            optionD={optionD}
            setOptionD={setOptionD}
            correctOption={correctOption}
            setCorrectOption={setCorrectOption}
            handleImageUpload={handleImageUpload}
            handleAddImageQuestion={handleAddImageQuestion}
            loading={loading}
            styles={styles}
          />
        )}

        {entryMethod === 'csv' && (
          <CsvUpload
            parseCsvFile={parseCsvFile}
            csvErrors={csvErrors}
            showCsvPreview={showCsvPreview}
            csvPreview={csvPreview}
            handleCsvUpload={handleCsvUpload}
            clearCsvUpload={clearCsvUpload}
            loading={loading}
            styles={styles}
          />
        )}

        {entryMethod === 'comprehension' && (
          <ComprehensionPassage
            passageTitle={passageTitle}
            setPassageTitle={setPassageTitle}
            passageText={passageText}
            setPassageText={setPassageText}
            handleAddPassage={handleAddPassage}
            loading={loading}
            styles={styles}
          />
        )}

        {entryMethod === 'audio' && (
          <AudioUpload
            audioUrl={audioUrl}
            setAudioFile={setAudioFile}
            handleAddAudio={handleAddAudio}
            loading={loading}
            styles={styles}
          />
        )}

        {/* Questions Preview */}
        {currentSessionId && (
          <QuestionsPreview
            currentSession={currentSession}
            showQuestionsPreview={showQuestionsPreview}
            setShowQuestionsPreview={setShowQuestionsPreview}
            editingQuestion={editingQuestion}
            editQuestionData={editQuestionData}
            setEditQuestionData={setEditQuestionData}
            handleEditQuestion={handleEditQuestion}
            handleUpdateQuestion={handleUpdateQuestion}
            handleDeleteQuestion={handleDeleteQuestion}
            cancelEdit={cancelEdit}
            API_BASE_URL={API_BASE_URL}
            styles={styles}
          />
        )}

        {/* Delete Confirmation Modal */}
        <ConfirmModal
          show={showDeleteConfirm}
          title="Delete Question"
          message="Are you sure you want to delete this question? This action cannot be undone."
          icon="🗑️"
          confirmText="Delete"
          cancelText="Cancel"
          onConfirm={confirmDeleteQuestion}
          onCancel={cancelDeleteQuestion}
          confirmButtonStyle="danger"
        />
      </div>
    </div>
  );
};

export default CreateQuiz;