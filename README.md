# Your Learning Scientist

Landing page for [yourlearningscientist.com](https://yourlearningscientist.com) — the bio link hub for **Treta Sharma**'s content creator brand (YouTube + Instagram + portfolio + brand deals).

## What this is

A polished, single-page bio link / hub page that Treta can drop in her Instagram and YouTube bios. Distills her research-backed parenting + EdTech content into:

- Hero with profile + verified badge + tagline
- Topic chips (what she covers)
- Featured / most-watched YouTube videos
- About section (credentials, voice)
- "Let's work together" CTAs (brand deals, consulting, speaking, portfolio, social)
- Animated stats
- Footer with cross-link to [tretasharma.com](https://tretasharma.com) (her full academic portfolio)

## Tech

- **Static HTML + CSS + vanilla JS.** No build step, no framework, no npm install.
- Google Fonts (Inter + Lora) loaded from CDN.
- Responsive, mobile-first, dark-friendly via system preferences.
- ~21 KB HTML, ~12 KB CSS, ~3 KB JS — fast as hell.
- Brand colors: deep navy `#1e3a8a`, accent blue `#3b82f6`, warm gray — pulled from Treta's existing [tretasharma.com](https://tretasharma.com) site for visual consistency.

## File layout

```
.
├── index.html                  # The page
├── assets/
│   ├── css/style.css           # All styles
│   ├── js/app.js               # Reveal-on-scroll + animated counters
│   └── images/                 # Profile + YouTube thumbnails
├── research/                   # Source data: YouTube feed, themes, brand analysis
├── 404.html                    # Custom 404 (friendly)
└── README.md                   # You are here
```

## Local development

```bash
python3 -m http.server 8080
# open http://localhost:8080
```

## Deploy

Designed for **GitHub Pages** with custom domain `yourlearningscientist.com` (configured via `CNAME`).

## Credits

- Content & design direction: **Treta Sharma**
- Built by: **Jatin K Malik** ([github.com/jatinkrmalik](https://github.com/jatinkrmalik))
- Brand colors and profile photo borrowed (with love) from [tretasharma.com](https://tretasharma.com)
