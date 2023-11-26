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
type Props = {
  children: React.ReactNode;
};

export default function AuthProvider({children}: Props) {
  const setUserInfoState = useSetRecoilState(userInfoAtom);
  const userInfo = useRecoilValue(userInfoAtom);

  const {data, isSuccess} = useSuspenseQuery<null | UserInfo>({
    queryKey: ['loginState'],
    queryFn: () => getLoginUserInfo(),
  });

  useLayoutEffect(() => {
    if (data !== null) {
      setUserInfoState(data);
    } else {
      setUserInfoState(initialUserInfoState);
    }
  }, [data]);

  return <Suspense>{isSuccess && children}</Suspense>;
}
