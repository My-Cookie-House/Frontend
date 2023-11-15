import Cookies from 'js-cookie';

export default function useSetTokens(accessToken, refreshToken) {
  Cookies.set('accessToken', accessToken);
  Cookies.set('refreshToken', refreshToken);
}
