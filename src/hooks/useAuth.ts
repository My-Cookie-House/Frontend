import {useMutation} from '@tanstack/react-query';
import useSetTokens from '../hooks/useSetTokens';
import {useRecoilState} from 'recoil';
import {useNavigate} from 'react-router-dom';
import getUserInfo from '../apis/auth';
import {loginStateAtom, UserInfo} from '../atoms/loginStateAtom';

export default function useLoginMutation() {
  const [loggedin, setLoggedIn] = useRecoilState(loginStateAtom);
  const code = '1';
  const navigate = useNavigate();

  if (!code) {
    throw new Error('Code is not found in the URL');
  }

  return useMutation({
    mutationFn: () => getUserInfo(code),
    onSuccess: (response: UserInfo) => {
      useSetTokens(response.data.accessToken, response.data.refreshToken);
      setLoggedIn(true);
      if (response.data.isRegistered) {
        navigate(`/house/${response.data.userId}`);
      }
      if (!response.data.isRegistered) {
        navigate('/onboarding');
      }
    },
    onError: (error: any) => {},
    onSettled: (data, error) => {},
  });
}
