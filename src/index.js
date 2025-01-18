import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { LoadingProvider } from './contexts/loadingContext';
import { AuthProvider } from './contexts/authContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
    <LoadingProvider>
    <App />
    </LoadingProvider>
    </AuthProvider>
  </React.StrictMode>
);


reportWebVitals();
