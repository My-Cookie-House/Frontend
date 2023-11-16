import axios from 'axios';
import Cookies from 'js-cookie';
import useRefreshToken from '../hooks/useRefreshToken';

const instance = axios.create({
  baseURL: 'https://url.com',
});

instance.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = Cookies.get('refreshToken');

      if (!refreshToken) {
        throw new Error('Refresh token not found');
      }

      try {
        await useRefreshToken(refreshToken);
        return instance(originalRequest);
      } catch (error) {
        throw error;
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
