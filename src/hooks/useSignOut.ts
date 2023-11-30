import {instance} from '@/apis/axios';
import {useQueryClient, useMutation} from '@tanstack/react-query';
import {useNavigate} from 'react-router-dom';
import {useRecoilState, useRecoilValue} from 'recoil';
import {
  loginStateAtom,
  userInfoAtom,
  initialUserInfoState,
  authCodeAtom,
} from '@/atoms/loginStateAtom';

const useSignOut = (url) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [authCode, setAuthCode] = useRecoilState(authCodeAtom);
  const [userInfoState, setUserInfoState] = useRecoilState(userInfoAtom);

  const mutation = useMutation({
    mutationFn: () => instance.get(url),
    onError: (error) => {
      console.error('오류: ', error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['loginState']});
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      setAuthCode(null);
      setUserInfoState(initialUserInfoState);
      navigate('/');
    },
  });

  const SignOut = () => {
    mutation.mutate();
  };

  return SignOut;
};

export default useSignOut;
