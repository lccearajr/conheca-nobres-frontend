// src/index.js (ou src/main.jsx)
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'; // Importa o Provider
import store from './store/store.js'; // Importa a sua store Redux
import App from './App'; // Seu componente principal da aplicação
import './index.css'; // Se você tiver um arquivo CSS global

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}> {/* Envolve o componente App com o Provider */}
      <App />
    </Provider>
  </React.StrictMode>,
);