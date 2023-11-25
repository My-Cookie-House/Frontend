import {instance} from '@/apis/axios';
import Cookies from 'js-cookie';
import {useQueryClient, useMutation} from '@tanstack/react-query';
import {useNavigate} from 'react-router-dom';
import {useRecoilState, useRecoilValue} from 'recoil';
import {loginStateAtom, userInfoAtom} from '@/atoms/loginStateAtom';

const useLogout = (url) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [loginState, setLoginState] = useRecoilState(loginStateAtom);
  const {userId} = useRecoilValue(userInfoAtom);

  const {mutate: signout} = useMutation({
    mutationFn: () => signout(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['loginState']});
      Cookies.remove('accessToken');
      Cookies.remove('refreshToken');
      setLoginState(false);
      navigate('/');
    },
  });

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

  const logout = () => {
    mutation.mutate();
  };

  return {logout, signout};
};

export default useLogout;
