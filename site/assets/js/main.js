(function () {
  // Número no formato internacional, só dígitos (ex.: 5551999999999).
  var WHATSAPP = '5500000000000';

  var topo = document.getElementById('topo');
  var menuBtn = document.querySelector('.menu-btn');
  var menu = document.getElementById('menu');

  document.getElementById('ano').textContent = new Date().getFullYear();

  window.addEventListener('scroll', function () {
    topo.classList.toggle('rolou', window.scrollY > 10);
  }, { passive: true });

  menuBtn.addEventListener('click', function () {
    var aberto = menu.classList.toggle('aberto');
    menuBtn.setAttribute('aria-expanded', aberto);
  });

  menu.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') {
      menu.classList.remove('aberto');
      menuBtn.setAttribute('aria-expanded', 'false');
    }
  });

  var itens = document.querySelectorAll('.revelar');
  if ('IntersectionObserver' in window) {
    var obs = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add('visivel');
          obs.unobserve(en.target);
        }
      });
    }, { threshold: 0.15 });
    itens.forEach(function (el) { obs.observe(el); });
  } else {
    itens.forEach(function (el) { el.classList.add('visivel'); });
  }

  var form = document.getElementById('form-contato');
  var aviso = form.querySelector('.form__aviso');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!form.checkValidity()) {
      aviso.textContent = 'Preencha nome, e-mail válido e mensagem.';
      return;
    }
    var d = new FormData(form);
    var texto = 'Olá! Meu nome é ' + d.get('nome') + ' (' + d.get('email') + ').\n\n' + d.get('mensagem');
    window.open('https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(texto), '_blank', 'noopener');
    aviso.textContent = 'Abrindo o WhatsApp...';
    form.reset();
  });
})();
