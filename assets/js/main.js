/* ══════════════════════════════════════════════════════════════
   Virtuosolve — Main JavaScript + GSAP Animations
   ══════════════════════════════════════════════════════════════ */

// ── Register GSAP plugins ──
gsap.registerPlugin(ScrollTrigger);

// ── Nav scroll effect ──
(function initNav() {
  const nav = document.querySelector('.nav');
  if (!nav) return;

  ScrollTrigger.create({
    start: 'top -60',
    onUpdate: (self) => {
      nav.classList.toggle('scrolled', self.progress > 0);
    }
  });

  // Mobile toggle
  const toggle = document.querySelector('.nav-toggle');
  const mobile = document.querySelector('.nav-mobile');
  if (toggle && mobile) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('active');
      mobile.classList.toggle('open');
      document.body.style.overflow = mobile.classList.contains('open') ? 'hidden' : '';
    });
    mobile.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        toggle.classList.remove('active');
        mobile.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // Active link highlight
  const currentPath = window.location.pathname;
  document.querySelectorAll('.nav-links a, .nav-mobile a').forEach(a => {
    const href = a.getAttribute('href');
    if (href && currentPath.endsWith(href.replace(/^\.\.\//, '').replace(/^\.\//, ''))) {
      a.classList.add('active');
    }
  });
})();

// ── GSAP Reveal animations ──
(function initReveals() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  reveals.forEach((el, i) => {
    gsap.fromTo(el,
      { autoAlpha: 0, y: 35 },
      {
        autoAlpha: 1, y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          once: true
        },
        delay: (i % 4) * 0.1
      }
    );
  });
})();

// ── Hero animations (only on pages with hero) ──
(function initHero() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  tl.fromTo('.live-badge', { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.7 })
    .fromTo('.hero-title', { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.8 }, '-=0.3')
    .fromTo('.hero-sub', { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.7 }, '-=0.4')
    .fromTo('.hero-pill', { autoAlpha: 0, y: 15 }, { autoAlpha: 1, y: 0, duration: 0.6 }, '-=0.3')
    .fromTo('.hero-btns', { autoAlpha: 0, y: 15 }, { autoAlpha: 1, y: 0, duration: 0.6 }, '-=0.2')
    .fromTo('.scroll-cue', { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.8 }, '-=0.1');

  // Floating glow orbs
  gsap.to('.hero-glow--1', {
    x: 60, y: 40, duration: 12,
    ease: 'sine.inOut', repeat: -1, yoyo: true
  });
  gsap.to('.hero-glow--2', {
    x: -40, y: -50, duration: 14,
    ease: 'sine.inOut', repeat: -1, yoyo: true
  });
})();

// ── Page hero animations ──
(function initPageHero() {
  const pageHero = document.querySelector('.page-hero');
  if (!pageHero) return;

  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
  tl.fromTo('.page-hero .breadcrumb', { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.5 })
    .fromTo('.page-hero .eyebrow', { autoAlpha: 0, y: 15 }, { autoAlpha: 1, y: 0, duration: 0.5 }, '-=0.2')
    .fromTo('.page-hero h1', { autoAlpha: 0, y: 25 }, { autoAlpha: 1, y: 0, duration: 0.7 }, '-=0.3')
    .fromTo('.page-hero p', { autoAlpha: 0, y: 15 }, { autoAlpha: 1, y: 0, duration: 0.6 }, '-=0.3');
})();

// ── Typing animation ──
(function initTyping() {
  const el = document.getElementById('typing-text');
  if (!el) return;

  const words = ['CONVIERTE', 'ATRAE', 'CIERRA'];
  let wordIndex = 0, charIndex = 0, deleting = false;

  function tick() {
    const word = words[wordIndex];
    if (!deleting) {
      charIndex++;
      el.textContent = word.slice(0, charIndex);
      if (charIndex === word.length) {
        deleting = true;
        setTimeout(tick, 1800);
        return;
      }
    } else {
      charIndex--;
      el.textContent = word.slice(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
      }
    }
    setTimeout(tick, deleting ? 55 : 100);
  }
  tick();
})();

// ── Metrics counter animation ──
(function initCounters() {
  document.querySelectorAll('.metric-val').forEach(el => {
    const text = el.textContent;
    ScrollTrigger.create({
      trigger: el,
      start: 'top 90%',
      once: true,
      onEnter: () => {
        gsap.fromTo(el,
          { autoAlpha: 0, y: 15, scale: 0.9 },
          { autoAlpha: 1, y: 0, scale: 1, duration: 0.6, ease: 'back.out(1.5)' }
        );
      }
    });
  });
})();

// ── Card tilt on mouse move ──
(function initTilt() {
  document.querySelectorAll('.tilt-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      gsap.to(card, {
        rotateY: x * 8,
        rotateX: -y * 8,
        duration: 0.4,
        ease: 'power2.out'
      });
    });
    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        rotateY: 0, rotateX: 0,
        duration: 0.6, ease: 'power2.out'
      });
    });
  });
})();

// ── Button micro-interactions ──
(function initButtons() {
  document.querySelectorAll('.btn, .nav-cta, .form-submit').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
      gsap.to(btn, { scale: 1.03, duration: 0.2, ease: 'power2.out' });
    });
    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, { scale: 1, duration: 0.3, ease: 'power2.out' });
    });
    btn.addEventListener('mousedown', () => {
      gsap.to(btn, { scale: 0.97, duration: 0.1 });
    });
    btn.addEventListener('mouseup', () => {
      gsap.to(btn, { scale: 1.03, duration: 0.15 });
    });
  });
})();

// ── Form input focus animations ──
(function initFormAnimations() {
  document.querySelectorAll('.form-group input, .form-group select').forEach(input => {
    input.addEventListener('focus', () => {
      gsap.to(input, {
        borderColor: 'rgba(119,196,255,0.5)',
        boxShadow: '0 0 0 3px rgba(48,166,255,0.1)',
        duration: 0.3
      });
      const label = input.previousElementSibling;
      if (label && label.tagName === 'LABEL') {
        gsap.to(label, { color: '#30a6ff', duration: 0.2 });
      }
    });
    input.addEventListener('blur', () => {
      gsap.to(input, {
        borderColor: 'rgba(119,196,255,0.15)',
        boxShadow: '0 0 0 0px transparent',
        duration: 0.3
      });
      const label = input.previousElementSibling;
      if (label && label.tagName === 'LABEL') {
        gsap.to(label, { color: '#77c4ff', duration: 0.2 });
      }
    });
  });
})();

// ── Timeline stagger animation ──
(function initTimeline() {
  const items = document.querySelectorAll('.tl-item');
  if (!items.length) return;

  items.forEach((item, i) => {
    gsap.fromTo(item,
      { autoAlpha: 0, x: -30 },
      {
        autoAlpha: 1, x: 0,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: item,
          start: 'top 85%',
          once: true
        },
        delay: i * 0.15
      }
    );
  });
})();

// ── Guarantee box entrance ──
(function initGuarantee() {
  const box = document.querySelector('.guarantee-box');
  if (!box) return;

  gsap.fromTo(box,
    { autoAlpha: 0, y: 40, scale: 0.96 },
    {
      autoAlpha: 1, y: 0, scale: 1,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: box,
        start: 'top 80%',
        once: true
      }
    }
  );
})();

// ── Neural network canvas background ──
(function initNeuralCanvas() {
  const canvas = document.querySelector('.hero-canvas');
  if (!canvas) return;

  const cvs = document.createElement('canvas');
  canvas.appendChild(cvs);
  const ctx = cvs.getContext('2d');

  function resize() {
    cvs.width = canvas.offsetWidth;
    cvs.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const dots = [];
  const count = Math.min(40, Math.floor(window.innerWidth / 30));
  for (let i = 0; i < count; i++) {
    dots.push({
      x: Math.random() * cvs.width,
      y: Math.random() * cvs.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 2 + 1
    });
  }

  let mouse = { x: -1000, y: -1000 };
  document.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  function draw() {
    ctx.clearRect(0, 0, cvs.width, cvs.height);

    dots.forEach(d => {
      d.x += d.vx; d.y += d.vy;
      if (d.x < 0 || d.x > cvs.width) d.vx *= -1;
      if (d.y < 0 || d.y > cvs.height) d.vy *= -1;

      // Draw dot
      ctx.beginPath();
      ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(48,166,255,0.5)';
      ctx.fill();
    });

    // Connect nearby dots
    for (let i = 0; i < dots.length; i++) {
      for (let j = i + 1; j < dots.length; j++) {
        const dx = dots[i].x - dots[j].x;
        const dy = dots[i].y - dots[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          ctx.beginPath();
          ctx.moveTo(dots[i].x, dots[i].y);
          ctx.lineTo(dots[j].x, dots[j].y);
          ctx.strokeStyle = `rgba(48,166,255,${0.15 * (1 - dist / 150)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }

      // Connect to mouse
      const mx = dots[i].x - mouse.x;
      const my = dots[i].y - mouse.y;
      const md = Math.sqrt(mx * mx + my * my);
      if (md < 200) {
        ctx.beginPath();
        ctx.moveTo(dots[i].x, dots[i].y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.strokeStyle = `rgba(48,166,255,${0.25 * (1 - md / 200)})`;
        ctx.lineWidth = 0.7;
        ctx.stroke();
      }
    }

    requestAnimationFrame(draw);
  }
  draw();
})();

// ── Smooth parallax for cards on scroll ──
(function initParallax() {
  document.querySelectorAll('.card, .step-card').forEach(card => {
    gsap.to(card, {
      y: -10,
      ease: 'none',
      scrollTrigger: {
        trigger: card,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1
      }
    });
  });
})();

// ── Cookie banner ──
(function initCookies() {
  function getCookie(name) {
    return document.cookie.split('; ').find(r => r.startsWith(name + '='));
  }

  window.setCookieConsent = function(value) {
    document.cookie = 'cookie_consent=' + value + '; Max-Age=31536000; path=/; SameSite=Lax';
    const banner = document.getElementById('cookie-banner');
    if (banner) {
      gsap.to(banner, {
        y: 100, autoAlpha: 0, duration: 0.4,
        ease: 'power2.in',
        onComplete: () => banner.classList.remove('show')
      });
    }
  };

  if (!getCookie('cookie_consent')) {
    const banner = document.getElementById('cookie-banner');
    if (banner) {
      banner.classList.add('show');
      gsap.fromTo(banner,
        { y: 100, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.5, ease: 'power2.out', delay: 1.5 }
      );
    }
  }
})();

// ── Form submission ──
(function initForm() {
  const SHEET_URL = 'https://script.google.com/macros/s/AKfycbywgvbYb5a02rdVmXlxi2OJaUFbqExdns_-1TSGCUHSrLK16S2cgN2LTI5PmjU7tVccRQ/exec';

  window.sendForm = async function(e) {
    e.preventDefault();
    const form = e.target;
    const btn = form.querySelector('.form-submit');

    // Animate button
    gsap.to(btn, { scale: 0.97, duration: 0.1 });
    btn.textContent = 'Enviando...';
    btn.disabled = true;

    const payload = {
      nombre: form.nombre.value.trim(),
      clinica: form.clinica.value.trim(),
      email: form.email.value.trim(),
      telefono: form.telefono.value.trim(),
      presupuesto: form.presupuesto.value,
    };

    try {
      const params = new URLSearchParams(payload);
      await fetch(SHEET_URL + '?' + params.toString(), {
        method: 'GET',
        mode: 'no-cors',
      });

      gsap.to(btn, {
        scale: 1, duration: 0.3,
        onComplete: () => {
          btn.textContent = 'Solicitud enviada — nos ponemos en contacto en menos de 24h';
          btn.style.background = 'linear-gradient(135deg,#10b981,#059669)';
          gsap.fromTo(btn, { scale: 0.95 }, { scale: 1, duration: 0.4, ease: 'back.out(2)' });
        }
      });
      form.reset();
    } catch (err) {
      btn.textContent = 'Error al enviar. Inténtelo de nuevo.';
      btn.disabled = false;
      gsap.to(btn, { scale: 1, duration: 0.2 });
    }
  };
})();

// ── Tooltip for interactive elements ──
(function initTooltips() {
  document.querySelectorAll('[data-tooltip]').forEach(el => {
    el.style.position = 'relative';

    el.addEventListener('mouseenter', (e) => {
      const tip = document.createElement('div');
      tip.className = 'tooltip-popup';
      tip.textContent = el.dataset.tooltip;
      tip.style.cssText = `
        position:absolute;bottom:calc(100% + 8px);left:50%;transform:translateX(-50%);
        padding:.35rem .7rem;border-radius:6px;background:rgba(10,20,30,.95);
        border:1px solid rgba(119,196,255,.2);color:#ddeeff;font-size:.72rem;
        white-space:nowrap;pointer-events:none;z-index:100;
      `;
      el.appendChild(tip);
      gsap.fromTo(tip,
        { autoAlpha: 0, y: 5 },
        { autoAlpha: 1, y: 0, duration: 0.25, ease: 'power2.out' }
      );
    });

    el.addEventListener('mouseleave', () => {
      const tip = el.querySelector('.tooltip-popup');
      if (tip) {
        gsap.to(tip, {
          autoAlpha: 0, y: 5, duration: 0.15,
          onComplete: () => tip.remove()
        });
      }
    });
  });
})();
