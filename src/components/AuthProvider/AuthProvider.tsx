import {useSuspenseQuery} from '@tanstack/react-query';
import {Suspense, useEffect, useLayoutEffect} from 'react';
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
  const setUserInfoState = useSetRecoilState(userInfoAtom);
  const userInfo = useRecoilValue(userInfoAtom);

  const {data, isSuccess} = useSuspenseQuery<null | UserInfo>({
    queryKey: ['loginState'],
    queryFn: async () => {
      instance.interceptors.request.use(function (config) {
        config.headers.Authorization = `${Cookies.get('accessToken')}`;
        return config;
      });
      const data: UserInfo = await getLoginUserInfo();
      if (data !== null) {
        setUserInfoState(data);
      } else {
        setUserInfoState(initialUserInfoState);
      }
      return data;
    },
  });

  return <Suspense>{data && children}</Suspense>;
}
