import {Suspense} from 'react';
import Router from './Router';
import useAuth from './hooks/useAuth';
import AuthProvider from './components/AuthProvider/AuthProvider';

const App = () => {
  return (
    <>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </>
  );
};

export default App;
