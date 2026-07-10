// Your Learning Scientist — interactions + theme
(function () {
  'use strict';

  var THEME_KEY = 'yls-theme';

  function systemTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function getTheme() {
    var attr = document.documentElement.getAttribute('data-theme');
    if (attr === 'light' || attr === 'dark') return attr;
    try {
      var saved = localStorage.getItem(THEME_KEY);
      if (saved === 'light' || saved === 'dark') return saved;
    } catch (e) {}
    return systemTheme();
  }

  function setTheme(theme, persist) {
    document.documentElement.setAttribute('data-theme', theme);
    if (persist) {
      try {
        localStorage.setItem(THEME_KEY, theme);
      } catch (e) {}
    }

    var generic = document.querySelector('meta[name="theme-color"]:not([media])');
    if (!generic) {
      generic = document.createElement('meta');
      generic.setAttribute('name', 'theme-color');
      document.head.appendChild(generic);
    }
    generic.setAttribute('content', theme === 'dark' ? '#0B100E' : '#0C7A62');

    var btn = document.getElementById('theme-toggle');
    if (btn) {
      btn.setAttribute(
        'aria-label',
        theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
      );
      btn.setAttribute('title', theme === 'dark' ? 'Light mode' : 'Dark mode');
    }
  }

  setTheme(getTheme(), false);

  var toggle = document.getElementById('theme-toggle');
  if (toggle) {
    toggle.addEventListener('click', function () {
      setTheme(getTheme() === 'dark' ? 'light' : 'dark', true);
    });
  }

  try {
    var mq = window.matchMedia('(prefers-color-scheme: dark)');
    var onChange = function () {
      var saved = null;
      try {
        saved = localStorage.getItem(THEME_KEY);
      } catch (e) {}
      if (saved !== 'light' && saved !== 'dark') {
        setTheme(systemTheme(), false);
      }
    };
    if (mq.addEventListener) mq.addEventListener('change', onChange);
    else if (mq.addListener) mq.addListener(onChange);
  } catch (e) {}

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (event) {
      var href = anchor.getAttribute('href');
      if (!href || href.length < 2) return;
      var target = document.querySelector(href);
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

  var scroller = document.querySelector('.video-scroller');
  if (scroller) {
    var update = function () {
      var max = scroller.scrollWidth - scroller.clientWidth;
      scroller.classList.toggle('can-scroll', max > 4);
    };
    update();
    window.addEventListener('resize', update, { passive: true });
  }
})();
