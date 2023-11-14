import {useQuery} from '@tanstack/react-query';
import auth from '../apis/auth';
import {ILoginUser} from '../interfaces/auth';

// 로그인 여부 확인 및 유저 정보 가져오는 훅
export default function useAuth() {
  const {data, isError} = useQuery<ILoginUser>({
    queryKey: ['auth'],
    queryFn: auth.getLoginUserInfo,
    retry: 2,
  });

  if (isError) {
    return null;
  }

  return data;
}
