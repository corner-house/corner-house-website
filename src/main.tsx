import { ViteReactSSG } from 'vite-react-ssg';
import { HelmetProvider } from 'react-helmet-async';
import { routes } from './App';
import './index.css';

export const createRoot = ViteReactSSG(
  { routes },
  ({ isClient }) => {
    // Runs on both server (SSG) and client. HelmetProvider is added via the
    // root route Layout's JSX already; nothing else to wire here.
    void isClient;
  },
);
