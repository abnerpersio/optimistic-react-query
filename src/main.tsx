import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './app/index.tsx';
import './assets/styles/index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
