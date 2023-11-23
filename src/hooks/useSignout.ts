import {instance} from '@/apis/axios';
import Cookies from 'js-cookie';
import {useQueryClient} from '@tanstack/react-query';
import {useNavigate} from 'react-router-dom';
import {useRecoilState} from 'recoil';
import {loginStateAtom} from '@/atoms/loginStateAtom';

const useSignout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [loginState, setLoginState] = useRecoilState(loginStateAtom);

  const signout = async () => {
    try {
      await instance.get('/auth/unlink');

      queryClient.invalidateQueries({queryKey: ['loginState']});

      Cookies.remove('accessToken');
      Cookies.remove('refreshToken');
      setLoginState(false);
      navigate('/');
    } catch (error) {
      console.error('탈퇴 오류: ', error);
    }
  };

  return signout;
};

export default useSignout;
