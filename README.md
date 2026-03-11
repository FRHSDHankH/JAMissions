# Jalyn Anderson — Nonprofit Mission Documentary Portfolio

## Setup

Place your images in the `/images/` folder. Name them as:
- `film-egypt-thumb.jpg` for the film thumbnail
- `photo-01.jpg` through `photo-XX.jpg` for the photography grid

Run with a local server (VS Code Live Server or `python -m http.server`). Do not open HTML files directly due to fetch() CORS restrictions.

## Stack

- HTML5, CSS3, JavaScript (Vanilla)
- Vue 3 (CDN)
- Bootstrap 5 (CDN)
- Google Fonts

## Structure

- `/css/` — Global design system styles
- `/js/` — Main.js for nav, footer, and page initialization
- `/data/` — JSON files for films, photos, contact info, and site config
- `/images/` — Photo and thumbnail assets
- `/wireframe/` — Design reference screenshots

## Notes

All content is driven by JSON files in `/data/`. To update films, photos, or contact info, edit the corresponding JSON file only.
