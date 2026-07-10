// Your Learning Scientist — minimal interactions
(function () {
  'use strict';

  // Smooth scroll for in-page anchors
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
      const href = anchor.getAttribute('href');
      if (!href || href.length < 2) return;
      const target = document.querySelector(href);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
          ? 'auto'
          : 'smooth',
        block: 'start',
      });
    });
  });

  // Horizontal scroller: allow shift+wheel / trackpad to feel natural;
  // add a class when user can scroll so we could style edges later.
  const scroller = document.querySelector('.video-scroller');
  if (scroller) {
    const update = () => {
      const max = scroller.scrollWidth - scroller.clientWidth;
      scroller.classList.toggle('can-scroll', max > 4);
    };
    update();
    window.addEventListener('resize', update, { passive: true });
  }
})();
