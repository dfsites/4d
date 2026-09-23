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
