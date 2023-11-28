import {useSuspenseQuery} from '@tanstack/react-query';
import {useSetRecoilState} from 'recoil';
import {getLoginUserInfo} from '@/apis/auth';
import {
  initialUserInfoState,
  loginStateAtom,
  userInfoAtom,
} from '@/atoms/loginStateAtom';
import {UserInfo} from '@/atoms/loginStateAtom';
import * as Sentry from '@sentry/react';

type Props = {
  children: React.ReactNode;
};

export default function AuthProvider({children}: Props) {
  const setUserInfoState = useSetRecoilState(userInfoAtom);

  const {data, isSuccess} = useSuspenseQuery<null | UserInfo>({
    queryKey: ['loginState'],
    queryFn: getLoginUserInfo,
  });

  if (data !== null) {
    setUserInfoState(data);
    Sentry.configureScope((scope: Sentry.Scope) => {
      scope.setUser({
        id: data.userId,
        name: data.userName,
      });
    });
  } else {
    setUserInfoState(initialUserInfoState);
    Sentry.configureScope((scope: Sentry.Scope) => {
      scope.setUser({
        id: '로그인 안한 유저',
      });
    });
  }
  return <>{isSuccess && children}</>;
}
