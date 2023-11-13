import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { GlobalStyle } from './style'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
        
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
     <QueryClientProvider client={queryClient}>
        <GlobalStyle />
          <App />
        </QueryClientProvider>
  </React.StrictMode>,
);
