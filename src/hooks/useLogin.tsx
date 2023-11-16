import {useQuery, useQueryClient} from 'react-query';
import {useNavigate} from 'react-router-dom';
import {useEffect} from 'react';
import getUserInfo from '../apis/auth';
import useSetTokens from './useSetTokens';
import {useRecoilState, useRecoilValue} from 'recoil';
import {
  loginStateAtom,
  userInfoAtom,
  loginMethodAtom,
} from '../atoms/loginAtom';

export default function useLogin(provider) {
  const [loggedIn, setLoggedIn] = useRecoilState(loginStateAtom);
  const [userInfo, setUserInfo] = useRecoilState(userInfoAtom);
  //const code = new URL(window.location.href).searchParams.get('code');
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const code = '1';
  if (!code) {
    throw new Error('Code is not found in the URL');
  }

  const state = '1';

  const {isLoading, isError, data, error} = useQuery({
    queryKey: [code],
    queryFn: () => getUserInfo(provider, code, state),
  });

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (isError) {
      const errorMessage = error instanceof Error ? error.message : 'Error!';
      console.error('Error:', errorMessage);
      return;
    }

    setLoggedIn(true);
    setUserInfo(data);

    if (data.isRegistered) {
      navigate(`/house/${data.userId}`);
    }
    if (!data.isRegistered) {
      navigate('/onboarding');
    }

    queryClient.setQueryData([code], data);
  }, [
    isLoading,
    isError,
    data,
    error,
    setLoggedIn,
    setUserInfo,
    data?.isRegistered,
    data?.userId,
    navigate,
    queryClient,
    code,
    provider,
    state,
  ]);

  if (isLoading) {
    return <span>Loading...</span>;
  }

  return <></>;
}
