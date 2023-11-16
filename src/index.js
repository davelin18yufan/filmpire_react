import React from 'react';
import ReactDom from 'react-dom';

import App from './components/App';

ReactDom.createRoot(document.querySelector('#root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
