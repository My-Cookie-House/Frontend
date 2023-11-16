import {Suspense} from 'react';
import Router from './Router';

const App = () => {
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
