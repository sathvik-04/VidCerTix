import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authAPI = {
  loginWithGoogle: () => {
    window.location.href = `${API_URL}/auth/google`;
  },
  
  getUser: () => api.get('/auth/user'),
  
  logout: () => api.post('/auth/logout')
};

// Course API
export const courseAPI = {
  createCourse: (youtubeUrl) => 
    api.post('/courses/create', { youtubeUrl }),
  
  getCourse: (courseId) => 
    api.get(`/courses/${courseId}`),
  
  getUserCourses: () => 
    api.get('/courses/user/all')
};

// Progress API
export const progressAPI = {
  updateProgress: (courseId, currentTimestamp) =>
    api.post('/progress/update', { courseId, currentTimestamp }),
  
  submitQuiz: (courseId, quizIndex, answers) =>
    api.post('/progress/quiz-submit', { courseId, quizIndex, answers }),
  
  getProgress: (courseId) =>
    api.get(`/progress/${courseId}`)
};

// Certificate API
export const certificateAPI = {
  generateCertificate: (courseId) =>
    api.post('/certificate/generate', { courseId }),
  
  downloadCertificate: (filename) =>
    `${API_URL.replace('/api', '')}/certificate/download/${filename}`
};

export default api