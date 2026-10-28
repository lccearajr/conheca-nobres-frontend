/* eslint-disable react-refresh/only-export-components -- entrada de build, não participa do HMR */
// Entrada usada apenas no build (scripts/prerender.mjs) para gerar HTML
// estático das rotas públicas — buscadores e crawlers de IA que não
// executam JavaScript passam a ver conteúdo e metadados reais.
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router';
import { configureStore } from '@reduxjs/toolkit';
import roteiroReducer from './store/slices/roteiroSlice';
import App from './App';

export function render(url) {
  const store = configureStore({ reducer: { roteiro: roteiroReducer } });
  return renderToString(
    <Provider store={store}>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </Provider>,
  );
}

export { INDEXABLE_ROUTES, SITE_URL } from './config/site';
