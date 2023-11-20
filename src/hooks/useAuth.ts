import {useSuspenseQuery} from '@tanstack/react-query';
import {getLoginUserInfo} from '../apis/auth';
import {useSetRecoilState} from 'recoil';
import {
  loginStateAtom,
  userInfoAtom,
  initialUserInfoState,
} from '@/atoms/loginStateAtom';
import {useEffect} from 'react';

export default function useAuth() {
  const setLoginState = useSetRecoilState(loginStateAtom);
  const setUserInfoState = useSetRecoilState(userInfoAtom);
  const {data, isSuccess, isError} = useSuspenseQuery({
    queryKey: ['loginState'],
    queryFn: getLoginUserInfo,
  });
  useEffect(() => {
    if (data !== null) {
      setLoginState(true);
      setUserInfoState(data);
    } else {
      setLoginState(false);
      setUserInfoState(initialUserInfoState);
    }
  }, [isSuccess, isError]);

  return;
}
