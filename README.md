# Conheça Nobres — frontend

## Build e SEO

`npm run build` gera o app (Vite) e, em seguida, roda `scripts/prerender.mjs`, que:

- gera HTML estático com conteúdo e metadados para as rotas públicas (`/`, `/destino`, `/experiencias`, `/hospedagens`) — lista em `src/config/site.js` (`INDEXABLE_ROUTES`);
- gera `dist/sitemap.xml` e `dist/robots.txt`;
- salva `dist/spa-fallback.html` (shell SPA sem conteúdo/canonical).

Variáveis de ambiente (build):

| Variável | Uso |
| --- | --- |
| `VITE_SITE_URL` | Domínio canônico. Padrão: `https://conhecanobres.com.br` |
| `VITE_API_URL` | URL do backend. Se acessível no build, os detalhes de experiências e hospedagens entram no sitemap |

### Configuração do host

1. Servir arquivos estáticos de `dist/` (ex.: `/destino` → `dist/destino/index.html`).
2. Rotas sem arquivo (ex.: `/experiencias/12`) devem cair em **`/spa-fallback.html`**, não em `/index.html` — o `index.html` é a Home prerenderizada e tem canonical apontando para `/`.
3. HTTPS obrigatório e redirecionamento único (`www` → sem `www`, ou o contrário) para o domínio de `VITE_SITE_URL`.

Depois do deploy: validar o domínio no Google Search Console (registro DNS), enviar `https://conhecanobres.com.br/sitemap.xml` e solicitar indexação da Home e de `/destino`.

---

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
