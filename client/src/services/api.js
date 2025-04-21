import axios from 'axios';

const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle unauthorized responses
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },
  signup: async (name, email, password) => {
    const response = await api.post('/auth/signup', { name, email, password });
    return response.data;
  },
  verifyEmail: async (email, otp) => {
    const response = await api.post('/auth/verify-email', { email, otp });
    return response.data;
  },
  resendOtp: async (email) => {
    const response = await api.post('/auth/resend-otp', { email });
    return response.data;
  },
  verifyToken: async (token) => {
    if (!token) return { valid: false };
    const response = await api.post('/auth/verify-token', { token });
    return response.data;
  },
  updateName: async (name) => {
    const response = await api.put('/auth/update-name', { name });
    return response.data;
  },
  updatePassword: async (currentPassword, newPassword) => {
    const response = await api.put('/auth/update-password', { currentPassword, newPassword });
    return response.data;
  },
  forgotPassword: async (email) => {
    const response = await api.post('/auth/forgot-password', { email });
    return response.data;
  },
  verifyResetOtp: async (email, otp) => {
    const response = await api.post('/auth/verify-reset-otp', { email, otp });
    return response.data;
  },
  resetPassword: async (email, otp, newPassword) => {
    const response = await api.post('/auth/reset-password', { email, otp, newPassword });
    return response.data;
  }
};

export default api; 