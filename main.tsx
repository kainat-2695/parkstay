import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/globals.css';
import { Buffer } from 'buffer';
import { ErrorBoundary } from './components/ErrorBoundary';

// Polyfill for Solana wallet adapter
window.Buffer = Buffer;

// Suppress Figma infrastructure errors in console
const originalError = console.error;
console.error = (...args: any[]) => {
  const errorString = args.join(' ');
  // Filter out Figma infrastructure errors
  if (errorString.includes('figma.com') || 
      errorString.includes('webpack-artifacts') ||
      errorString.includes('devtools_worker')) {
    return; // Suppress
  }
  originalError.apply(console, args);
};

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found');
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
