import {useQuery, useQueryClient} from 'react-query';
import useSetTokens from './useSetTokens';
import {useRecoilState, useSetRecoilState} from 'recoil';
import {useNavigate} from 'react-router-dom';
import getUserInfo from '../apis/auth';
import {loginStateAtom} from '../atoms/loginAtom';
import {userInfoAtom} from '../atoms/loginAtom';

export default function useLogin() {
  const [loggedIn, setLoggedIn] = useRecoilState(loginStateAtom);
  const [userInfo, setUserInfo] = useRecoilState(userInfoAtom);
  const code = '1';
  //const code = new URL(window.location.href).searchParams.get('code');
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  if (!code) {
    throw new Error('Code is not found in the URL');
  }

  const state = '1';
  const provider = 'kakao';

  const {isLoading, isError, data, error} = useQuery({
    queryKey: [code],
    queryFn: () => getUserInfo(provider, code, state),
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    const errorMessage = error instanceof Error ? error.message : 'Error!';
    return <span>Error: {errorMessage}</span>;
  }

  useSetTokens(data.data.accessToken, data.data.refreshToken);
  setLoggedIn(true);
  setUserInfo(data);

  if (data.data.isRegistered) {
    navigate(`/house/${data.data.userId}`);
  }
  if (!data.data.isRegistered) {
    navigate('/onboarding');
  }

  queryClient.setQueryData([code], data);

  return <></>;
}
