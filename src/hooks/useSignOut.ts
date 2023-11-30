import {instance} from '@/apis/axios';
import {useQueryClient, useMutation, useQuery} from '@tanstack/react-query';
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
  const [userInfoState, setUserInfoState] = useRecoilState(userInfoAtom);

  async function fetchData() {
    const response = await instance.get(url);
    queryClient.invalidateQueries({queryKey: ['loginState']});
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setUserInfoState(initialUserInfoState);
    navigate('/');

    if (response.status !== 200) {
      throw new Error('오류: ' + response.status);
    }
    return response.data;
  }
};
export default useSignOut;
