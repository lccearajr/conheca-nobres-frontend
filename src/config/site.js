// Configuração central de SEO/identidade do site.
// SITE_URL pode ser sobrescrito por VITE_SITE_URL (ex.: ambiente de homologação).
export const SITE_URL = (import.meta.env?.VITE_SITE_URL || 'https://conhecanobres.com.br').replace(/\/$/, '');

export const SITE_NAME = 'Conheça Nobres';

export const DEFAULT_DESCRIPTION =
  'Planeje sua viagem para Nobres e Bom Jardim (MT): flutuações em águas cristalinas, Aquário Encantado, Rio Triste, Lagoa das Araras, hospedagens e roteiros com voucher único.';

// Foto 1200x630 para compartilhamento (WhatsApp, Facebook etc.).
// Coloque o arquivo em public/ e defina o caminho aqui, ex.: `${SITE_URL}/og-image.jpg`.
export const DEFAULT_IMAGE = null;

// Perfis oficiais do projeto — reforçam a identidade da marca para buscadores e IAs.
export const SOCIAL_PROFILES = ['https://www.instagram.com/conhecanobresmt/'];

// Rotas estáticas indexáveis. Usadas pelo prerender e pelo sitemap.
export const INDEXABLE_ROUTES = [
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  { path: '/destino', changefreq: 'monthly', priority: '0.9' },
  { path: '/experiencias', changefreq: 'weekly', priority: '0.9' },
  { path: '/hospedagens', changefreq: 'weekly', priority: '0.8' },
];

export const absoluteUrl = (path = '/') => `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
