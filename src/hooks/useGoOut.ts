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

const useGoOut = (url) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [userInfoState, setUserInfoState] = useRecoilState(userInfoAtom);

  const mutation = useMutation({
    mutationFn: () => instance.post(url),
    onError: (error) => {
      console.error('오류: ', error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['loginState']});
      Cookies.remove('accessToken');
      Cookies.remove('refreshToken');
      setUserInfoState(initialUserInfoState);
      navigate('/');
    },
  });

  const GoOut = () => {
    mutation.mutate();
  };

  return GoOut;
};

export default useGoOut;
