import {useSuspenseQuery} from '@tanstack/react-query';
import auth from '../apis/auth';
import {useSetRecoilState} from 'recoil';
import {initialLoginState, loginStateAtom} from '../atoms/loginStateAtom';

export default function useAuth() {
  const setLoginState = useSetRecoilState(loginStateAtom);
  const {data, isSuccess} = useSuspenseQuery({
    queryKey: ['loginState'],
    queryFn: auth.getLoginUserInfo,
    gcTime: Infinity,
  });
  if (isSuccess) setLoginState(data);

  return data;
}
