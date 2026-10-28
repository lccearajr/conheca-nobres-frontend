// Pós-build: gera HTML estático das rotas públicas + sitemap.xml + robots.txt.
//
// Por quê: o site é um SPA; sem isso o HTML servido é só <div id="root"></div>.
// O Google até renderiza JS (com atraso), mas crawlers de IA (GPTBot,
// ClaudeBot, PerplexityBot...) e previews de link em geral não executam JS.
//
// Uso: `npm run build` (já chama este script). Variáveis opcionais:
//   VITE_SITE_URL  domínio canônico (padrão https://conhecanobres.com.br)
//   VITE_API_URL   se definida e acessível no build, inclui no sitemap as
//                  páginas de detalhe de /experiencias e /hospedagens.
import { build, loadEnv } from 'vite';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distDir = path.join(root, 'dist');
const ssrDir = path.join(root, 'dist-ssr');

Object.assign(process.env, { ...loadEnv('production', root, 'VITE_'), ...process.env });

await build({
  root,
  logLevel: 'warn',
  build: { ssr: 'src/entry-server.jsx', outDir: ssrDir, emptyOutDir: true },
});

const { render, INDEXABLE_ROUTES, SITE_URL } = await import(
  pathToFileURL(path.join(ssrDir, 'entry-server.js')).href
);

const template = await fs.readFile(path.join(distDir, 'index.html'), 'utf8');

// Shell SPA intacto (sem conteúdo nem canonical) para o fallback de rotas
// dinâmicas, ex.: /experiencias/12. Configure o rewrite do host para ele.
await fs.writeFile(path.join(distDir, 'spa-fallback.html'), template);

const SEO_TAG = /<(title|meta|link)\b[^>]*\bdata-seo\b[^>]*?(?:\/>|>(?:[^<]*<\/title>)?)/g;
const templateSemSeo = template.replace(SEO_TAG, '').replace(/\n\s*\n(\s*\n)+/g, '\n\n');

for (const { path: route } of INDEXABLE_ROUTES) {
  const rendered = render(route);
  const headTags = rendered.match(SEO_TAG) ?? [];
  const body = rendered.replace(SEO_TAG, '');

  const html = templateSemSeo
    .replace('</head>', `    ${headTags.join('\n    ')}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${body}</div>`);

  const outFile = route === '/'
    ? path.join(distDir, 'index.html')
    : path.join(distDir, route.slice(1), 'index.html');
  await fs.mkdir(path.dirname(outFile), { recursive: true });
  await fs.writeFile(outFile, html);
  console.log(`prerender: ${route} -> ${path.relative(root, outFile)}`);
}

// --- sitemap.xml ---------------------------------------------------------
const urls = INDEXABLE_ROUTES.map((r) => ({ loc: `${SITE_URL}${r.path}`, ...r }));

const apiUrl = process.env.VITE_API_URL?.replace(/\/$/, '');
if (apiUrl) {
  for (const recurso of ['experiencias', 'hospedagens']) {
    try {
      const res = await fetch(`${apiUrl}/${recurso}`, { signal: AbortSignal.timeout(10_000) });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const itens = await res.json();
      for (const item of Array.isArray(itens) ? itens : []) {
        if (item?.id == null) continue;
        urls.push({ loc: `${SITE_URL}/${recurso}/${item.id}`, changefreq: 'monthly', priority: '0.7' });
      }
    } catch (err) {
      console.warn(`sitemap: não foi possível listar /${recurso} em ${apiUrl} (${err.message}); seguindo só com rotas estáticas.`);
    }
  }
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url>
    <loc>${u.loc}</loc>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>
`;
await fs.writeFile(path.join(distDir, 'sitemap.xml'), sitemap);

// --- robots.txt ----------------------------------------------------------
// Crawlers de IA liberados de propósito: o objetivo é ser citado por eles.
// /meu-roteiro NÃO é bloqueado aqui: ele usa <meta robots noindex>, e o
// buscador só enxerga essa tag se puder rastrear a página.
const robots = `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;
await fs.writeFile(path.join(distDir, 'robots.txt'), robots);

await fs.rm(ssrDir, { recursive: true, force: true });
console.log(`sitemap: ${urls.length} URLs | robots.txt gerado`);
