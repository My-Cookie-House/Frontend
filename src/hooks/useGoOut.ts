import {instance} from '@/apis/axios';
import Cookies from 'js-cookie';
import {useQueryClient, useMutation} from '@tanstack/react-query';
import {useNavigate} from 'react-router-dom';
import {useRecoilState} from 'recoil';
import {loginStateAtom} from '@/atoms/loginStateAtom';

const useLogout = (url) => {
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

  const logout = () => {
    mutation.mutate();
  };

  return logout;
};

export default useLogout;
