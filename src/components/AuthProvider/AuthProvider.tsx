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
type Props = {
  children: React.ReactNode;
};

export default function AuthProvider({children}: Props) {
  const setLoginState = useSetRecoilState(loginStateAtom);
  const setUserInfoState = useSetRecoilState(userInfoAtom);
  const userInfo = useRecoilValue(userInfoAtom);
  const {data, isSuccess} = useSuspenseQuery<null | UserInfo>({
    queryKey: ['loginState'],
    queryFn: getLoginUserInfo,
  });
  useLayoutEffect(() => {
    if (data !== null) {
      setLoginState(true);
      setUserInfoState(data);
    } else {
      setLoginState(false);
      setUserInfoState(initialUserInfoState);
    }
    console.log(userInfo.userId);
  }, [data]);

  return <Suspense>{isSuccess && children}</Suspense>;
}
