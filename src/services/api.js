import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  try {
    const token = localStorage.getItem('smartai-auth-token');
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (e) {
  }
  return config;
});

api.interceptors.response.use(
  (response) => {
    const res = response.data;
    if (res && typeof res === 'object' && 'data' in res && 'success' in res) {
      return res.data;
    }
    return res;
  },
  (error) => {
    return Promise.reject(error.response?.data || { message: error.message });
  }
);

export default api;