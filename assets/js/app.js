// Your Learning Scientist — landing page interactions
// Keep this tiny. No frameworks. Progressive enhancement.
// IMPORTANT: Content is always visible by default. Reveal-on-scroll
// is an additive animation only — never hide content if JS fails.

(function () {
  'use strict';

  // 1) Reveal-on-scroll: only animate elements already in the viewport
  //    (or just below it). Anything off-screen stays visible — the
  //    IO triggers immediately as the user scrolls.
  const targets = document.querySelectorAll('.section, .video-card, .link-card, .stats .stat');

  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // Only hide elements that are NOT yet near the viewport, so the
    // first-paint content is always visible.
    const viewportH = window.innerHeight || document.documentElement.clientHeight;
    targets.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top > viewportH * 0.9) {
        // Off-screen below: hide for the reveal animation
        el.style.opacity = '0';
        el.style.transform = 'translateY(12px)';
      }
      el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

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
      { threshold: 0.05, rootMargin: '0px 0px -20px 0px' }
    );
    targets.forEach((el) => io.observe(el));
  }
  // If IO is unsupported or reduced motion is requested, content is
  // already visible — no JS needed.

  // 2) Animated stat counters (only run on visible elements)
  const statNums = document.querySelectorAll('.stat-num');
  const animateNum = (el) => {
    const raw = el.textContent.trim();
    // Match patterns like "24.7K+", "1.2M+", "8+", "1,429", "15"
    const m = raw.match(/^([\d,.]+)([KM]?)\+?$/);
    if (!m) return;
    const targetStr = m[1].replace(/,/g, '');
    const target = parseFloat(targetStr);
    const suffix = m[2];
    const plus = raw.endsWith('+');
    const multiplier = suffix === 'K' ? 1e3 : suffix === 'M' ? 1e6 : 1;
    const total = target * multiplier;
    const dur = 1200;
    const start = performance.now();
    const fmt = (n) => {
      const v = n / multiplier;
      const numStr = (Number.isInteger(target) ? Math.round(v).toString() : v.toFixed(1));
      // Re-add commas for thousands
      const withCommas = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      return withCommas + suffix + (plus ? '+' : '');
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
  } else {
    // No IO: just show the final value (already in HTML)
  }

  // 3) Track outbound link clicks (light analytics — no third-party)
  document.querySelectorAll('a[target="_blank"]').forEach((a) => {
    a.addEventListener('click', () => {
      const url = a.href;
      try {
        if (window.console && console.debug) {
          console.debug('[outbound]', a.textContent.trim().slice(0, 40), url);
        }
      } catch (_) {}
    });
  });
})();
