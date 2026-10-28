import { DEFAULT_DESCRIPTION, DEFAULT_IMAGE, SITE_NAME, absoluteUrl } from '../../config/site';

// Usa o suporte nativo do React 19 a <title>/<meta>/<link>: as tags são
// movidas para o <head> no cliente e para o início do HTML no prerender.
// O atributo data-seo permite ao prerender extraí-las e ao main.jsx limpar
// as tags padrão do index.html antes de montar o app (evita duplicadas).
function Seo({
  title,
  description = DEFAULT_DESCRIPTION,
  path,
  image = DEFAULT_IMAGE,
  type = 'website',
  noindex = false,
  jsonLd,
}) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} — Turismo em Nobres e Bom Jardim, MT`;
  const url = path ? absoluteUrl(path) : null;

  return (
    <>
      <title data-seo="">{fullTitle}</title>
      <meta data-seo="" name="description" content={description} />
      <meta data-seo="" name="robots" content={noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large'} />
      {url && <link data-seo="" rel="canonical" href={url} />}

      <meta data-seo="" property="og:site_name" content={SITE_NAME} />
      <meta data-seo="" property="og:locale" content="pt_BR" />
      <meta data-seo="" property="og:type" content={type} />
      <meta data-seo="" property="og:title" content={fullTitle} />
      <meta data-seo="" property="og:description" content={description} />
      {url && <meta data-seo="" property="og:url" content={url} />}
      {image && <meta data-seo="" property="og:image" content={image} />}
      <meta data-seo="" name="twitter:card" content={image ? 'summary_large_image' : 'summary'} />

      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
        />
      )}
    </>
  );
}

export default Seo;
