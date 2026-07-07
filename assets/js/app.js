// Your Learning Scientist — landing page interactions
// Keep this tiny. No frameworks. Progressive enhancement.

(function () {
  'use strict';

  // 1) Reveal-on-scroll for cards and sections
  const targets = document.querySelectorAll('.section, .video-card, .link-card, .stats .stat');
  targets.forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(12px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    targets.forEach((el) => io.observe(el));
  } else {
    // No IO support: just show
    targets.forEach((el) => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
  }

  // 2) Animated stat counters
  const statNums = document.querySelectorAll('.stat-num');
  const animateNum = (el) => {
    const raw = el.textContent.trim();
    // Match patterns like "24.7K+", "1.2M+", "8+", "15"
    const m = raw.match(/^([\d.]+)([KM]?)\+?$/);
    if (!m) return;
    const target = parseFloat(m[1]);
    const suffix = m[2];
    const plus = raw.endsWith('+');
    const multiplier = suffix === 'K' ? 1e3 : suffix === 'M' ? 1e6 : 1;
    const total = target * multiplier;
    const dur = 1200;
    const start = performance.now();
    const fmt = (n) => {
      const v = n / multiplier;
      return (Number.isInteger(target) ? Math.round(v) : v.toFixed(1)) + suffix + (plus ? '+' : '');
    };
    const step = (now) => {
      const t = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = fmt(total * eased);
      if (t < 1) requestAnimationFrame(step);
      else el.textContent = raw;
    };
    requestAnimationFrame(step);
  };
  if ('IntersectionObserver' in window) {
    const numIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            animateNum(e.target);
            numIO.unobserve(e.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    statNums.forEach((el) => numIO.observe(el));
  }

  // 3) Track outbound link clicks (light analytics — no third-party)
  document.querySelectorAll('a[target="_blank"]').forEach((a) => {
    a.addEventListener('click', () => {
      // Placeholder — wire to Plausible/Fathom/Umami if needed
      const url = a.href;
      try {
        if (window.console && console.debug) {
          console.debug('[outbound]', a.textContent.trim().slice(0, 40), url);
        }
      } catch (_) {}
    });
  });
})();
