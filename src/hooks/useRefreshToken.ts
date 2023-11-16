import axios from 'axios';
import useSetTokens from '../hooks/useSetTokens';

export default async function useRefreshToken(refreshToken) {
  const response = await axios.post('https://url.com/api/auth/refresh', {
    refreshToken: refreshToken,
  });

  useSetTokens(response.data.accessToken, response.data.refreshToken);

  return response;
}
