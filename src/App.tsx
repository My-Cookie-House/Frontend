import {Suspense} from 'react';
import Router from './Router';
import useAuth from './hooks/useAuth';

const App = () => {
  useAuth();
  return (
    <>
      {/* Suspense 반드시 적용해야 */}
      <Suspense>
        <Router />
      </Suspense>
    </>
  );
};

export default App;
