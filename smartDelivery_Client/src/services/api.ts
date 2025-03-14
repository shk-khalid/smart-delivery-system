// Base API configuration
import axios from 'axios';


const API_URL = 'https://smartdelivery-backend.onrender.com';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
});

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 429) {
      return Promise.reject(new Error('Too many requests. Please try again later.'));
    }

    return Promise.reject(error);
  }
);

export default api;