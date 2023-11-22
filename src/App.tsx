import Router from './Router';
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
