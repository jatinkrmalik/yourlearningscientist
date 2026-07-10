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

  // Horizontal scroller state (optional styling hook)
  const scroller = document.querySelector('.video-scroller');
  if (scroller) {
    const update = () => {
      const max = scroller.scrollWidth - scroller.clientWidth;
      scroller.classList.toggle('can-scroll', max > 4);
    };
    update();
    window.addEventListener('resize', update, { passive: true });
  }

  // Official Instagram profile embed — load embed.js when section is near view
  const igSection = document.querySelector('#instagram .instagram-media');
  if (!igSection) return;

  let loaded = false;
  const loadInstagram = () => {
    if (loaded) return;
    loaded = true;
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.instagram.com/embed.js';
    script.onload = () => {
      if (window.instgrm && window.instgrm.Embeds) {
        window.instgrm.Embeds.process();
      }
    };
    document.body.appendChild(script);
  };

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          loadInstagram();
          io.disconnect();
        }
      },
      { rootMargin: '200px 0px' }
    );
    io.observe(igSection);
  } else {
    loadInstagram();
  }
})();
