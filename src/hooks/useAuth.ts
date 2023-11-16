import {useQuery} from '@tanstack/react-query';
import auth from '../apis/auth';
import {useSetRecoilState} from 'recoil';
import {initialLoginState, loginStateAtom} from '../atoms/loginStateAtom';

export default function useAuth() {
  const setLoginState = useSetRecoilState(loginStateAtom);
  const {data, isError, isSuccess} = useQuery({
    queryKey: ['loginState'],
    queryFn: auth.getLoginUserInfo,
    gcTime: Infinity,
  });

  if (isError) {
    setLoginState(initialLoginState);
  }
  if (isSuccess) {
    setLoginState({loggedIn: true, ...data});
  }
  return;
}
