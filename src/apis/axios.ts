import axios from 'axios';
import Cookies from 'js-cookie';
import useSetTokens from '../hooks/useSetTokens';

export const instance = axios.create({
  baseURL: 'https://cookie-house.store',
  headers: {
    Authorization: `${Cookies.get('accessToken')}`,
  },
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.code === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = Cookies.get('refreshToken');
      if (!refreshToken) {
        throw new Error('토큰 없음');
      }
      try {
        await sendRefreshToken(refreshToken);
        return instance(originalRequest);
      } catch (error) {
        throw error;
      }
    }

    return Promise.reject(error);
  },
);

const sendRefreshToken = async (refreshToken) => {
  try {
    const response = await instance.get('/auth/token', {
      headers: {
        refreshToken: `${refreshToken}`,
      },
    });

    useSetTokens(response.data.accessToken, response.data.refreshToken);
  } catch (error) {}
};
