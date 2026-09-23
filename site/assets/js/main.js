// Envia ao GA4 apenas o nome do evento, o canal e o destino — nunca dados pessoais.
document.addEventListener('click', function (e) {
  var link = e.target.closest && e.target.closest('a[data-evento]');
  if (!link || typeof window.gtag !== 'function') return;
  var web = link.protocol === 'https:' || link.protocol === 'http:';
  var params = { link_url: web ? link.href : link.protocol };
  if (link.dataset.canal) params.canal = link.dataset.canal;
  window.gtag('event', link.dataset.evento, params);
});

(function () {
  var btn = document.querySelector('.menu-btn');
  var nav = document.getElementById('menu-principal');
  if (!btn || !nav) return;

  function setOpen(open) {
    nav.classList.toggle('aberto', open);
    btn.setAttribute('aria-expanded', String(open));
  }

  btn.addEventListener('click', function () {
    setOpen(btn.getAttribute('aria-expanded') !== 'true');
  });

  nav.addEventListener('click', function (e) {
    if (e.target.closest('a')) setOpen(false);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && btn.getAttribute('aria-expanded') === 'true') {
      setOpen(false);
      btn.focus();
    }
  });

  window.matchMedia('(min-width: 861px)').addEventListener('change', function (mq) {
    if (mq.matches) setOpen(false);
  });
})();
