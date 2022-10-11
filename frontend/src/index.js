import React from 'react';
import ReactDOM from 'react-dom/client';

import {BrowserRouter, Route, Routes} from 'react-router-dom';

import HomeScreen from './screens/HomeScreen';

import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <BrowserRouter>
          <Routes>
            <Route element={<App />} >
              <Route path="/" element={<HomeScreen />} exact/>
              {/*<Route path="cart" element={<CartScreen />} />
              <Route path="signin" element={<SigninScreen />} />*/}
            </Route>
          </Routes>
        </BrowserRouter>
    </React.StrictMode>
);
