import axios from 'axios';
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || `${backendUrl}/api`,
});

// Add auth token to requests if available
api.interceptors.request.use((config) => {
  const userData = localStorage.getItem('userData');
  if (userData) {
    const { token } = JSON.parse(userData);
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;