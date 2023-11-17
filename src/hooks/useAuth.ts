import {useSuspenseQuery} from '@tanstack/react-query';
import {getLoginUserInfo} from '../apis/auth';
import {useSetRecoilState} from 'recoil';
import {
  loginStateAtom,
  userInfoAtom,
  initialUserInfoState,
} from '../atoms/loginStateAtom';

export default function useAuth() {
  const setLoginState = useSetRecoilState(loginStateAtom);
  const setUserInfoState = useSetRecoilState(userInfoAtom);
  const {data, isSuccess, isError} = useSuspenseQuery({
    queryKey: ['loginState'],
    queryFn: getLoginUserInfo,
    gcTime: Infinity,
  });
  if (isSuccess) {
    setLoginState(true);
    setUserInfoState(data);
  }
  if (isError) {
    setLoginState(false);
    setUserInfoState(initialUserInfoState);
  }

  return;
}
