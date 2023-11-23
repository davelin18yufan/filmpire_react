import React from 'react';
import ReactDom from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './app/store';

import App from './components/App';
import './index.css';
import ToggleColorMode from './utils/ToggleColorMode';

ReactDom.createRoot(document.querySelector('#root')).render(
  // <React.StrictMode>
  <Provider store={store}>
    <ToggleColorMode>
      <App />
    </ToggleColorMode>
  </Provider>,
  // </React.StrictMode>,
);
