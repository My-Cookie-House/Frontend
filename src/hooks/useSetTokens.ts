export default function useSetTokens(accessToken, refreshToken) {
  localStorage.setItem('accessToken', accessToken); // 2시간
  localStorage.setItem('refreshToken', refreshToken);
}
