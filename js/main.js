/* ── Cinematic intro ── */
(function () {
  const overlay = document.getElementById('intro-overlay');
  if (!overlay) return;

  document.body.style.overflow = 'hidden';

  const l1   = document.getElementById('intro-l1');
  const l2   = document.getElementById('intro-l2');
  const logo = document.getElementById('intro-logo');

  const show  = (el) => el && el.classList.add('intro-show');
  const fadeOut = (el) => {
    if (!el) return;
    el.style.opacity = '0';
    el.style.transform = 'translateY(-10px)';
    el.style.transition = 'opacity 0.45s ease, transform 0.45s ease';
  };

  setTimeout(() => show(l1),   500);
  setTimeout(() => show(l2),   1300);
  setTimeout(() => { fadeOut(l1); fadeOut(l2); }, 3200);
  setTimeout(() => show(logo), 3900);
  setTimeout(() => {
    overlay.classList.add('intro-exit');
    document.body.style.overflow = '';
  }, 5400);
  setTimeout(() => overlay.remove(), 6700);
})();

/* ── Nav: sempre escura após scroll ── */
const nav = document.getElementById('nav');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

/* ── Reveal on scroll ── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ── FAQ accordion ── */
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

/* ── Phone 3D tilt ── */
const phoneDevice = document.getElementById('phone-device');
const phoneWrap   = document.querySelector('.phone-wrap');
if (phoneDevice && phoneWrap) {
  phoneWrap.addEventListener('mousemove', (e) => {
    const rect = phoneWrap.getBoundingClientRect();
    const rx = ((e.clientY - rect.top  - rect.height / 2) / (rect.height / 2)) * -6;
    const ry = ((e.clientX - rect.left - rect.width  / 2) / (rect.width  / 2)) *  6;
    phoneDevice.style.transform  = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.02,1.02,1.02)`;
    phoneDevice.style.transition = 'transform 0.1s ease-out';
  });
  phoneWrap.addEventListener('mouseleave', () => {
    phoneDevice.style.transform  = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1,1,1)';
    phoneDevice.style.transition = 'transform 0.5s ease-in-out';
  });
}

/* ── WhatsApp chat animation ── */
(function () {
  const chat = document.getElementById('wa-chat');
  if (!chat) return;

  const msgs = [
    {type:'in',  text:'Oi! Vi o vestido floral azul no stories. Tem no P?', time:'10:12'},
    {type:'typing', delay:1200},
    {type:'out', text:'Olá! Temos sim no P e no M. Preço R$189. Posso te enviar mais fotos?', time:'10:12'},
    {type:'in',  text:'Por favor! E quanto é o frete pra SP?', time:'10:13'},
    {type:'typing', delay:1100},
    {type:'out', text:'Para SP capital o frete é grátis e o prazo é de 1 a 2 dias úteis.', time:'10:13'},
    {type:'in',  text:'Ótimo. Aceita pix?', time:'10:13'},
    {type:'typing', delay:900},
    {type:'out', text:'Sim! Pix com 5% de desconto: R$179. Cartão em até 6x sem juros também. Quer garantir o P?', time:'10:14'},
    {type:'in',  text:'Quero! Como faço?', time:'10:14'},
    {type:'typing', delay:1300},
    {type:'out', text:'Me passa seu CEP que já gero o link de pagamento. O vestido fica reservado por 30 minutos para você.', time:'10:14'},
  ];

  let i = 0;

  function scrollBottom() { chat.scrollTop = chat.scrollHeight; }

  function addBubble(msg) {
    const div = document.createElement('div');
    div.className = 'bubble bubble-' + msg.type;
    div.innerHTML =
      msg.text.replace(/\n/g, '<br>') +
      '<div class="bubble-meta">' +
        '<span class="bubble-time">' + msg.time + '</span>' +
        (msg.type === 'out' ? '<span class="bubble-check">✓✓</span>' : '') +
      '</div>';
    chat.appendChild(div);
    scrollBottom();
  }

  function addTyping() {
    const div = document.createElement('div');
    div.className = 'typing-bubble';
    div.id = 'wa-typing';
    div.innerHTML = '<div class="dot"></div><div class="dot"></div><div class="dot"></div>';
    chat.appendChild(div);
    scrollBottom();
  }

  function removeTyping() {
    const t = document.getElementById('wa-typing');
    if (t) t.remove();
  }

  function next() {
    if (i >= msgs.length) { setTimeout(restart, 3000); return; }
    const msg = msgs[i++];
    if (msg.type === 'typing') {
      addTyping();
      setTimeout(() => { removeTyping(); next(); }, msg.delay);
    } else {
      addBubble(msg);
      setTimeout(next, msg.type === 'in' ? 950 : 700);
    }
  }

  function restart() {
    chat.innerHTML = '<div class="date-divider"><span>Hoje</span></div>';
    i = 0;
    setTimeout(next, 600);
  }

  setTimeout(next, 800);
})();
