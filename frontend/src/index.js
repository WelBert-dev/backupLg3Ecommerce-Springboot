import React from 'react';
import ReactDOM from 'react-dom/client';

import { Provider } from 'react-redux';

import './index.css';
import store from './store';

import MainRoutes from './routes';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <React.StrictMode>
       <MainRoutes />
    </React.StrictMode>
  </Provider>
  
);
