import {BrowserRouter} from 'react-router-dom';
import Router from './Router';
import AuthProvider from './components/AuthProvider/AuthProvider';

const App = () => {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </AuthProvider>
    </>
  );
};

export default App;
