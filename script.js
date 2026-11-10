(() => {
  'use strict';
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Footer year
  const yr = $('#year'); if (yr) yr.textContent = new Date().getFullYear();

  // Header state + scroll progress
  const navWrap = $('.nav-wrap'), bar = $('#progress');
  const onScroll = () => {
    navWrap.classList.toggle('scrolled', window.scrollY > 20);
    const h = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (h > 0 ? (window.scrollY / h) * 100 : 0) + '%';
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile menu
  const btn = $('#menuBtn'), links = $('#navLinks');
  const setMenu = open => {
    links.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', String(open));
    btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  };
  btn.addEventListener('click', () => setMenu(btn.getAttribute('aria-expanded') !== 'true'));
  links.addEventListener('click', e => { if (e.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });
  document.addEventListener('click', e => { if (!e.target.closest('.nav')) setMenu(false); });

  // Active nav link
  const navAnchors = $$('.nav-links a[href^="#"]');
  const map = new Map(navAnchors.map(a => [a.getAttribute('href').slice(1), a]));
  const secObs = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      navAnchors.forEach(a => a.classList.remove('active'));
      const a = map.get(en.target.id);
      if (a) a.classList.add('active');
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  $$('main section[id]').forEach(s => secObs.observe(s));

  // Scroll reveal (staggered within each parent)
  $$('.reveal').forEach(el => {
    const sibs = [...el.parentElement.children].filter(c => c.classList.contains('reveal'));
    el.style.setProperty('--d', Math.min(sibs.indexOf(el), 5) * 0.08 + 's');
  });
  if (reduce || !('IntersectionObserver' in window)) {
    $$('.reveal').forEach(el => el.classList.add('in'));
  } else {
    const rev = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (en.isIntersecting) { en.target.classList.add('in'); rev.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    $$('.reveal').forEach(el => rev.observe(el));
  }

  // Stat counters
  const count = el => {
    const end = parseFloat(el.dataset.count), dec = +(el.dataset.dec || 0);
    if (reduce) { el.textContent = end.toFixed(dec); return; }
    const t0 = performance.now(), dur = 1400;
    const tick = t => {
      const p = Math.min((t - t0) / dur, 1), e = 1 - Math.pow(1 - p, 3);
      el.textContent = (end * e).toFixed(dec);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  const cObs = new IntersectionObserver(es => es.forEach(en => {
    if (en.isIntersecting) { count(en.target); cObs.unobserve(en.target); }
  }), { threshold: 0.6 });
  $$('[data-count]').forEach(el => cObs.observe(el));

  // Skill card spotlight
  $$('.skill-card').forEach(c => c.addEventListener('pointermove', e => {
    const r = c.getBoundingClientRect();
    c.style.setProperty('--mx', (e.clientX - r.left) + 'px');
    c.style.setProperty('--my', (e.clientY - r.top) + 'px');
  }));

  // Copy email
  const copy = $('#copyEmail');
  if (copy) copy.addEventListener('click', async () => {
    const email = 'naveen128328@gmail.com', label = $('span', copy);
    let ok = false;
    try { await navigator.clipboard.writeText(email); ok = true; } catch (_) {
      const t = document.createElement('textarea'); t.value = email; document.body.appendChild(t); t.select();
      try { ok = document.execCommand('copy'); } catch (_) {} t.remove();
    }
    label.textContent = ok ? 'Copied!' : 'Press Ctrl+C';
    setTimeout(() => (label.textContent = 'Copy'), 1800);
  });
})();
