import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from './store/store.js';
import App from './App';
import './index.css';

// Remove as tags de SEO estáticas (index.html / prerender). A partir daqui,
// cada página declara as suas via <Seo />, sem duplicar <title>/<meta>.
document.head.querySelectorAll('[data-seo]').forEach((el) => el.remove());

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);
