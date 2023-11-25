import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import {GlobalStyle} from './style';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {ThemeProvider} from 'styled-components';
import theme from './theme';
import {RecoilRoot} from 'recoil';
import {useEffect, useRef} from 'react';
import ReactGA from 'react-ga4';

function QueryClientProviderMonitor({children}) {
  const prevQueryClientRef = useRef<QueryClient | null>(null);

  // 구글 애널리틱스 운영서버만 적용
  if (process.env.REACT_APP_GOOGLE_ANALYTICS) {
    ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS);
  }

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
