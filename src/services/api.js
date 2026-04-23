import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 30000,
  headers: {
    Accept: 'application/json',
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status, data } = error.response;
      if (status === 429) {
        const retryAfter = error.response.headers['retry-after'];
        error.cooldownSeconds = retryAfter ? parseInt(retryAfter, 10) : 30;
      }
      error.serverMessage = data?.message || data?.error || 'An unexpected error occurred';
    } else if (error.request) {
      error.serverMessage = 'Network error — please check your connection and try again.';
    } else {
      error.serverMessage = error.message || 'An unexpected error occurred';
    }
    return Promise.reject(error);
  }
);

export default api;
