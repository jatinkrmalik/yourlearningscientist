// Your Learning Scientist — landing page interactions
// Minimal: only reveal-on-scroll. No animations, no frills.

(function () {
  'use strict';

  // Add reveal class to elements that should animate in
  const targets = document.querySelectorAll(
    '.hero > *, .section-head, .work-item, .ig-card, .about-grid > *, .contact-item, .see-all'
  );
  targets.forEach((el) => el.classList.add('reveal'));

  // Stagger the reveal: work items get a delay so they cascade
  document.querySelectorAll('.work-item').forEach((el, i) => {
    el.style.transitionDelay = (i * 70) + 'ms';
  });
  document.querySelectorAll('.contact-item').forEach((el, i) => {
    el.style.transitionDelay = (i * 50) + 'ms';
  });

  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    targets.forEach((el) => io.observe(el));
  } else {
    // Fallback: show everything
    targets.forEach((el) => el.classList.add('in'));
  }

  // Smooth-scroll for in-page links
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (href.length > 1) {
        const el = document.querySelector(href);
        if (el) {
          e.preventDefault();
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });
})();
