import {BrowserRouter} from 'react-router-dom';
import Router from './Router';
import AuthProvider from './components/AuthProvider/AuthProvider';
import {Suspense} from 'react';
import * as Sentry from '@sentry/react';
import {SentryInit} from './Sentry';

Sentry.init(SentryInit);

const App = () => {
  return (
    <>
      <Suspense>
        <AuthProvider>
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </AuthProvider>
      </Suspense>
    </>
  );
};

export default App;
