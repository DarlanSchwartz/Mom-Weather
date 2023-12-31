import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import ResetStyle from './styles/ResetStyle.ts';
import { QueryClient, QueryClientProvider } from 'react-query';
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <ResetStyle />
    <App />
  </QueryClientProvider>
);