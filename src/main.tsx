import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import {GlobalStyle} from './style';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {ThemeProvider} from 'styled-components';
import theme from './theme';
import {RecoilRoot} from 'recoil';
import {useEffect} from 'react';

function QueryClientProviderMonitor({children}) {
  useEffect(() => {
    return () => {
      console.log('쿼리클라이언트 프로바이더 언마운트');
    };
  }, []);

  return children;
}

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ThemeProvider theme={theme}>
    <QueryClientProvider client={queryClient}>
      <QueryClientProviderMonitor>
        <RecoilRoot>
          <GlobalStyle />
          <App />
        </RecoilRoot>
      </QueryClientProviderMonitor>
    </QueryClientProvider>
  </ThemeProvider>,
);
