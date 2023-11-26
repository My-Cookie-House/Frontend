import {useSuspenseQuery} from '@tanstack/react-query';
import {Suspense, useLayoutEffect} from 'react';
import {useSetRecoilState, useRecoilValue} from 'recoil';
import {getLoginUserInfo} from '@/apis/auth';
import {
  initialUserInfoState,
  loginStateAtom,
  userInfoAtom,
} from '@/atoms/loginStateAtom';
import {UserInfo} from '@/atoms/loginStateAtom';
import {instance} from '@/apis/axios';
import Cookies from 'js-cookie';
type Props = {
  children: React.ReactNode;
};

export default function AuthProvider({children}: Props) {
  //const setLoginState = useSetRecoilState(loginStateAtom);
  const setUserInfoState = useSetRecoilState(userInfoAtom);
  const userInfo = useRecoilValue(userInfoAtom);

  // instance.interceptors.request.use(function (config) {
  //   config.headers.Authorization =
  //     'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0b2tlbiIsImlhdCI6MTcwMDY1MDA3OCwiZXhwIjoxNzA5MjkwMDc4LCJ1c2VySWQiOiIxIn0.X-RWDTv319FZ4P-DoGHscNMXhuS6r-RHgVl7AC9SwKRbhawFnNAyEKF7fD7uIV8pxjf9T7LNRLOoJzfr6INtuQ';
  //   return config;
  // });
  // Cookies.set(
  //   'accessToken',
  //   'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0b2tlbiIsImlhdCI6MTcwMDY1MDA3OCwiZXhwIjoxNzA5MjkwMDc4LCJ1c2VySWQiOiIxIn0.X-RWDTv319FZ4P-DoGHscNMXhuS6r-RHgVl7AC9SwKRbhawFnNAyEKF7fD7uIV8pxjf9T7LNRLOoJzfr6INtuQ',
  // );

  const {data, isSuccess} = useSuspenseQuery<null | UserInfo>({
    queryKey: ['loginState'],
    queryFn: getLoginUserInfo,
  });
  useLayoutEffect(() => {
    if (data !== null) {
      //setLoginState(true);
      setUserInfoState(data);
    } else {
      //setLoginState(false);
      setUserInfoState(initialUserInfoState);
    }
  }, [data]);

  return <Suspense>{isSuccess && children}</Suspense>;
}
