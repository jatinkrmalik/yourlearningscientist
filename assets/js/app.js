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

  /**
   * Lazy-load a third-party script when `el` nears the viewport.
   * Returns a promise that resolves after load (or immediately if already present).
   */
  function loadScriptWhenVisible(el, src, globalCheck) {
    return new Promise((resolve) => {
      if (!el) {
        resolve(false);
        return;
      }
      if (globalCheck && globalCheck()) {
        resolve(true);
        return;
      }

      let started = false;
      const start = () => {
        if (started) return;
        started = true;
        if (globalCheck && globalCheck()) {
          resolve(true);
          return;
        }
        const existing = document.querySelector('script[src="' + src + '"]');
        if (existing) {
          existing.addEventListener('load', () => resolve(true));
          if (globalCheck && globalCheck()) resolve(true);
          return;
        }
        const script = document.createElement('script');
        script.async = true;
        script.src = src;
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
      };

      if (!('IntersectionObserver' in window)) {
        start();
        return;
      }
      const io = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            start();
            io.disconnect();
          }
        },
        { rootMargin: '200px 0px' }
      );
      io.observe(el);
    });
  }

  // Official Instagram profile embed
  const igSection = document.querySelector('#instagram .instagram-media');
  loadScriptWhenVisible(
    igSection,
    'https://www.instagram.com/embed.js',
    () => !!(window.instgrm && window.instgrm.Embeds)
  ).then((ok) => {
    if (ok && window.instgrm && window.instgrm.Embeds) {
      window.instgrm.Embeds.process();
    }
  });

  // Official YouTube subscribe button (Google platform.js + g-ytsubscribe)
  const ytWidget = document.querySelector('#youtube-widget');
  loadScriptWhenVisible(
    ytWidget,
    'https://apis.google.com/js/platform.js',
    () => !!(window.gapi || document.querySelector('.yt-widget-bar iframe'))
  );
})();
