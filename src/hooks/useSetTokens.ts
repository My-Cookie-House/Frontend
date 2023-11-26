import Cookies from 'js-cookie';

export default function useSetTokens(accessToken, refreshToken) {
  Cookies.set('accessToken', accessToken, {expires: 1 / 12}); // 2시간
  Cookies.set('refreshToken', refreshToken, {expires: 1 / 12});
}
