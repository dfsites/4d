import { absoluteUrl } from './html.mjs';

export function buildSchema(config, page) {
  const site = config.canonicalUrl;
  const pageUrl = absoluteUrl(config, page.path);
  const orgId = `${site}#organizacao`;
  const siteId = `${site}#website`;

  const organization = {
    '@type': 'Organization',
    '@id': orgId,
    name: config.brandName,
    legalName: config.legalName,
    taxID: config.cnpj,
    url: site,
    address: {
      '@type': 'PostalAddress',
      streetAddress: config.address.street,
      addressLocality: config.address.city,
      addressRegion: config.address.state,
      postalCode: config.address.zip,
      addressCountry: config.address.countryCode,
    },
  };

  const sameAs = config.socialLinks.map((s) => s.url).filter(Boolean);
  if (sameAs.length) organization.sameAs = sameAs;

  const website = {
    '@type': 'WebSite',
    '@id': siteId,
    url: site,
    name: config.brandName,
    inLanguage: config.language,
    publisher: { '@id': orgId },
  };

  const webpage = {
    '@type': page.schemaType || 'WebPage',
    '@id': `${pageUrl}#pagina`,
    url: pageUrl,
    name: page.title,
    description: page.description,
    inLanguage: config.language,
    isPartOf: { '@id': siteId },
    about: { '@id': orgId },
  };

  const graph = [organization, website, webpage];

  if (page.breadcrumb?.length) {
    const items = [{ name: 'Início', path: '/' }, ...page.breadcrumb];
    const breadcrumbId = `${pageUrl}#breadcrumb`;
    webpage.breadcrumb = { '@id': breadcrumbId };
    graph.push({
      '@type': 'BreadcrumbList',
      '@id': breadcrumbId,
      itemListElement: items.map((item, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: item.name,
        item: absoluteUrl(config, item.path),
      })),
    });
  }

  return { '@context': 'https://schema.org', '@graph': graph };
}
