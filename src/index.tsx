import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import App from './app/App';
//npm i bootstrap@5.3.0-alpha1=> framework css ici import depuis les nodes modules//
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { AuthContextProvider } from './context/AuthContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </React.StrictMode>
);
