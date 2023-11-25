import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import {GlobalStyle} from './style';
import {
  QueryClient,
  QueryClientProvider,
  QueryErrorResetBoundary,
} from '@tanstack/react-query';
import {ThemeProvider} from 'styled-components';
import theme from './theme';
import {RecoilRoot} from 'recoil';
import {useEffect, useRef} from 'react';
import {ErrorBoundary} from 'react-error-boundary';
import Error from './pages/Error/Error';

function QueryClientProviderMonitor({children}) {
  const prevQueryClientRef = useRef<QueryClient | null>(null);

  useEffect(() => {
    if (prevQueryClientRef.current !== queryClient) {
      prevQueryClientRef.current = queryClient;
    }
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
