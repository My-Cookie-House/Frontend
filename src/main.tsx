import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import {GlobalStyle} from './style';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {ThemeProvider} from 'styled-components';
import theme from './theme';
import {RecoilRoot} from 'recoil';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ThemeProvider theme={theme}>
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <GlobalStyle />
        <App />
      </RecoilRoot>
    </QueryClientProvider>
  </ThemeProvider>,
);
