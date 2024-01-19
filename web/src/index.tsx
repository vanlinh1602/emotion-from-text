import 'styles/index.less';
import './fonts/Mynerve-Regular.ttf';
import './fonts/Bangers-Regular.ttf';
import './fonts/Fruktur-Regular.ttf';
import './fonts/Gluten-Regular.ttf';
import './fonts/Roboto-Regular.ttf';
import './fonts/SedgwickAveDisplay-Regular.ttf';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { configureAppStore } from 'store';

import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

const store = configureAppStore();

root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);
