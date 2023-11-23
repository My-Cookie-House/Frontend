import {instance} from '@/apis/axios';
import Cookies from 'js-cookie';
import {useQueryClient} from '@tanstack/react-query';
import {useNavigate} from 'react-router-dom';
import {useRecoilState} from 'recoil';
import {loginStateAtom} from '@/atoms/loginStateAtom';

const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [loginState, setLoginState] = useRecoilState(loginStateAtom);

  const logout = async () => {
    try {
      await instance.get('/auth/sign-out');

      await queryClient.invalidateQueries({queryKey: ['loginState']});

      Cookies.remove('accessToken');
      Cookies.remove('refreshToken');
      setLoginState(false);
      navigate('/');
    } catch (error) {
      console.error('로그아웃 오류: ', error);
    }
  };

  return logout;
};

export default useLogout;
