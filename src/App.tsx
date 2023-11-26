import {BrowserRouter} from 'react-router-dom';
import Router from './Router';
import AuthProvider from './components/AuthProvider/AuthProvider';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </>
  );
};

export default App;
