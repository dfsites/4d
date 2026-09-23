// Fonte única dos dados institucionais. Home, /sobre, rodapé, metadata,
// schema e sitemap consomem apenas este arquivo.
// Nenhum dado aqui pode ser inventado: na dúvida, deixe null ou [].

export const companyConfig = {
  brandName: '4D Desenvolvimento Pessoal',
  legalName: '4D Desenvolvimento Pessoal Ltda.',
  cnpj: '49.142.726/0001-58',
  canonicalUrl: 'https://www.4ddesenvolvimentopessoal.com.br/',
  shortDomain: 'https://4ddesenvolve.com.br/',
  locale: 'pt_BR',
  language: 'pt-BR',

  address: {
    street: 'Av. Prefeito Osmar Cunha, 416',
    city: 'Florianópolis',
    state: 'SC',
    zip: '88015-100',
    country: 'Brasil',
    countryCode: 'BR',
  },

  // Só é exibido publicamente quando confirmed === true.
  contact: {
    email: null,
    phone: null,
    whatsapp: null,
    confirmed: false,
  },

  // Formato: { name: 'LinkedIn', url: 'https://...' }. Vazio = nada é renderizado.
  socialLinks: [],

  // null desativa o Google Analytics e o trecho correspondente da Política de Privacidade.
  analytics: { googleId: 'G-931JV5ZF55' },

  responsiblePerson: {
    name: 'Daniel Ferreira',
    role: 'Administrador e empreendedor',
    bio: 'Administrador e empreendedor com atuação em desenvolvimento de negócios, tecnologia e projetos digitais.',
    photo: null,
    linkedin: null,
  },

  // Formato: { name, slug, description, category, url, logo, image, status, cta }.
  // Vazio = a seção exibe apenas o texto institucional.
  projects: [],

  // Datas de revisão (AAAA-MM-DD): documentos legais e conteúdo (usada no sitemap).
  legalUpdatedAt: '2026-09-23',
  contentUpdatedAt: '2026-09-23',
};

export function hasConfirmedContact(config) {
  const c = config.contact;
  return c.confirmed === true && Boolean(c.email || c.phone || c.whatsapp);
}
