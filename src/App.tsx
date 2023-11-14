import Router from './Router';
import useAuth from './hooks/useAuth';

const App = () => {
  useAuth();
  return (
    <>
      <Router />
    </>
  );
};

export default App;
