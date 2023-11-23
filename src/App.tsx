import Router from './Router';
import AuthProvider from './components/AuthProvider/AuthProvider';
import {useLocation} from 'react-router-dom';
import {useEffect} from 'react';
import {useQueryClient} from '@tanstack/react-query';
import {UserInfo, loginStateAtom} from '@/atoms/loginStateAtom';

const App = () => {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData<null | UserInfo>(['loginState']);
  const userId = user?.userId;
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === `/${userId}`) {
      window.location.reload();
    }
  }, [location]);
  return (
    <>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </>
  );
};

export default App;
