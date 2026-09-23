const ESCAPES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

export function esc(value) {
  return String(value ?? '').replace(/[&<>"']/g, (ch) => ESCAPES[ch]);
}

export function absoluteUrl(config, path) {
  return new URL(path.replace(/^\//, ''), config.canonicalUrl).href;
}

export function pageUpdatedAt(config, page) {
  return page.legal ? config.legalUpdatedAt : config.contentUpdatedAt;
}

export function formatDate(iso) {
  const [y, m, d] = iso.split('-').map(Number);
  const meses = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho',
    'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
  return `${d} de ${meses[m - 1]} de ${y}`;
}

export function hostOf(url) {
  return new URL(url).host;
}
