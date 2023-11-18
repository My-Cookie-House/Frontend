import {useQuery, useQueryClient} from 'react-query';
import {useNavigate} from 'react-router-dom';
import {useEffect} from 'react';
import tryLogin from '../apis/auth';
import useSetTokens from './useSetTokens';
import {useRecoilState, useRecoilValue} from 'recoil';
import {DataAtom} from '../atoms/loginAtom';
import {loginStateAtom} from '../atoms/loginStateAtom';

export default function useLogin(code) {
  const [loggedIn, setLoggedIn] = useRecoilState(loginStateAtom);
  const [userData, setUserData] = useRecoilState(DataAtom);

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  if (!code) {
    throw new Error('Code is not found in the URL');
  }

  const state = '1';

  const {isLoading, isError, data, error} = useQuery({
    queryKey: [code],
    queryFn: () => tryLogin(code, state),
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
    setUserData(data);
    useSetTokens(data.accessToken, data.refreshToken); // useSetTokens 함수를 직접 호출

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
    setUserData,
    data?.isRegistered,
    data?.userId,
    navigate,
    queryClient,
    code,
    state,
  ]);

  if (isLoading) {
    return <span>Loading...</span>;
  }

  return <></>;
}
