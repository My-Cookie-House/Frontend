import {instance} from '@/apis/axios';
import Cookies from 'js-cookie';
import {useQueryClient, useMutation} from '@tanstack/react-query';
import {useNavigate} from 'react-router-dom';
import {useRecoilState, useRecoilValue} from 'recoil';
import {
  loginStateAtom,
  userInfoAtom,
  initialUserInfoState,
} from '@/atoms/loginStateAtom';
import {signout as mutateSignout} from '@/apis/auth';

const useGoOut = (url) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [loginState, setLoginState] = useRecoilState(loginStateAtom);

  const mutation = useMutation({
    mutationFn: () => instance.post(url),
    onError: (error) => {
      console.error('오류: ', error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['loginState']});
      Cookies.remove('accessToken');
      Cookies.remove('refreshToken');
      setLoginState(false);
      navigate('/');
    },
  });

  const GoOut = () => {
    mutation.mutate();
  };

  return GoOut;
};

export default useGoOut;
