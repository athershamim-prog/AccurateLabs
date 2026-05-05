# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Static HTML/CSS/JS website for **Accurate Labs** — a laboratory & scientific equipment supplier. No build tools or package manager; open `index.html` directly in a browser or use any static file server.

## Quick Start

```bash
# Serve locally (Python)
python -m http.server 8000

# Serve locally (Node)
npx serve .
```

Then open `http://localhost:8000` in a browser.

## Structure

```
Accurate_Labs/
├── index.html          # Single-page site (all sections)
├── css/styles.css      # All styles — mobile-first, CSS custom properties
├── js/main.js          # Carousel, nav, form, scroll behaviors
└── images/
    ├── slide1.jpg      # Hero carousel images (add your own)
    ├── slide2.jpg
    ├── slide3.jpg
    └── clients/        # Client logo images
```

## Key Design Decisions

- **Single file**: Everything lives in `index.html` — smooth-scroll anchor navigation between sections.
- **CSS variables**: All colours and spacing are defined as `--var` in `:root` at the top of `styles.css`. Change the palette there only.
- **Hero fallback**: Carousel slides use `background-color: var(--blue-dark)` when `images/slide*.jpg` are missing, so the layout never breaks without images.
- **No framework**: Vanilla JS only. The carousel supports keyboard, click, and touch/swipe.

## Adding Real Content

| Task | What to change |
|------|---------------|
| Hero images | Replace `images/slide1-3.jpg` — 1600×900px recommended |
| Client logos | Add images to `images/clients/`, replace `<i>` icons in `#clients` with `<img>` tags |
| Contact form | Replace the stub in `js/main.js` `contactForm` handler with a real backend call or EmailJS |
| Colours | Edit `--blue-dark`, `--blue-mid`, `--accent` in `:root` in `styles.css` |
| Company info | Update address, phone, email in `index.html` (topbar, contact section, footer) |
