# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static multilingual (Spanish/English/Italian/French) informational website for people starting to work at CERN. Covers legal/tax guidance, social security, and technical setup. Built with Eleventy (11ty) SSG. Hosted at starter-pack.efrenrodriguezrodriguez.com.

Current languages: **ES** (default), **EN**, **IT**, **FR**

## Development

- **Build**: `npm run build` (Eleventy) — outputs to `dist/`
- **Local dev**: `npm run dev` — starts Eleventy dev server with live reload
- **Deploy**: Push to `main` branch; GitHub Actions runs `npm ci && npm run build` then FTP deploys `dist/`. Can also be triggered manually via `workflow_dispatch`.
- **Before pushing**: Always run `npm run build` locally and fix any errors
- **Lint**: `npm run lint` — ESLint on `src/scripts/`
- **Test**: `npm test` — Playwright tests (355 tests covering accessibility, navigation, search, links, i18n)

## Architecture

All source content lives under `src/`. Eleventy processes Nunjucks templates and Markdown files into static HTML in `dist/`.

### Multilingual Structure

- `src/en/` — English content (`.md` files only, 33 files)
- `src/es/` — Spanish content (`.md` files only, 28 files)
- `src/it/` — Italian content (`.md` files only, 30 files)
- `src/fr/` — French content (`.md` files only, 24 files)
- `src/{lang}/{lang}.json` — Directory data files setting `lang` and `locale` (e.g., `{ "lang": "it", "locale": "it_IT" }`)

Each language directory contains **only** Markdown content files — no Nunjucks templates. Language switching is via `<a>` links between `/en/`, `/es/`, `/it/`, and `/fr/` URLs. No runtime i18n.

### Data-Driven Pages (Nunjucks)

Interactive and hub pages (homepages, hubs, checklist, cost calculator, search) are **not** duplicated per language. Instead:

- `src/_data/pages/*.json` — 8 data files holding translated strings, card definitions, and shared config for each page type:
  - `index.json` — Homepage hero text and cards
  - `legal-hub.json` — Legal hub heading, cards, alert text
  - `technical-hub.json` — Technical hub heading and cards
  - `daily-life-hub.json` — Daily life hub heading, cards, tip text
  - `checklist.json` — Checklist phases with checkbox items
  - `cost-calculator.json` — Calculator form labels and result text
  - `search.json` — Search page translated front matter
  - `content-meta.json` — Shared Markdown metadata (see below)
- `src/pages/*.njk` — 7 single-source Nunjucks templates that use Eleventy pagination over `site.languages` to auto-generate pages for all languages from one template

**To add a card to a hub or change translated text**, edit the corresponding JSON file in `src/_data/pages/`. No need to touch multiple template files.

### Shared Markdown Metadata

Common front matter fields (`layout`, `datePublished`, `dateModified`, `dateUpdated`, `extraJs`, `printable`) are centralized in `src/_data/pages/content-meta.json` and applied automatically via computed data in `eleventy.config.js`. Markdown files only need to specify translated fields (`title`, `description`, `og`, `breadcrumbs`) and body content.

The lookup logic:
1. If a page has its own entry in `content-meta.json` (keyed by slug, e.g., `"faq"`), those values are used
2. Otherwise, the `_defaults` block provides fallback values
3. Front matter in the `.md` file always takes highest precedence

### Templates and Layouts

- `src/_includes/layouts/` — Nunjucks layouts: `base.njk`, `page.njk`, `hub.njk`, `home.njk`
- `src/_includes/partials/` — Shared partials: `head.njk`, `navbar.njk`, `footer.njk`, `breadcrumbs.njk`
- `src/_data/site.json` — Site config: URL, languages array, CSP, theme script
- `src/_data/ui.json` — UI strings per language (~30 keys: skip link, nav labels, footer text, search labels, etc.)
- `src/_data/navigation.json` — Nav link definitions with labels per language
- `src/_data/pages/` — Per-page data files (see above)

All templates are language-agnostic — they loop over `site.languages` or use `ui[lang]` / `item[lang]` lookups. Navbar and footer render at build time via Nunjucks includes. No runtime component injection.

### JavaScript

- `src/scripts/common.js` — Single shared entry point loaded on every page
- `src/scripts/pages/` — Page-specific bundles: `home.js`, `checklist.js`, `cost-calculator.js`, `search.js`
- `src/scripts/modules/` — 13 reusable modules: navbar, theme, search, search-index, checklist, cost-calculator, live-search, reading-progress, reading-time, scroll-animations, scroll-top, sw-register, toc
- `src/scripts/vendor/fuse.min.mjs` — Vendored Fuse.js for client-side search

### Search

Pre-built search indices (`dist/data/search-index-{lang}.json` for each language) generated at build time by `scripts/build-search-index.js` (runs as Eleventy `eleventy.after` event). Client-side search uses Fuse.js with accent-insensitive matching.

The search system extracts language from the URL path (`/es/`, `/en/`, `/it/`, `/fr/`) and loads the corresponding index. UI messages (no results, error, count) are defined per language in `src/scripts/modules/search.js`.

### Content Pages

Content pages use Markdown with YAML front matter for translated metadata (`title`, `description`, `og`, `breadcrumbs`). Shared fields (`layout`, dates) are inherited from `content-meta.json` via computed data — no need to repeat them in each file.

Breadcrumb URLs must use the correct language prefix (e.g., `/it/` not `/en/`).

### Content Security Policy (CSP)

CSP is defined in `src/_data/site.json` as a single string and applied via `<meta>` tag in `head.njk`. Inline scripts in `index.njk` and `404.njk` require SHA-256 hashes in the CSP.

**If you modify any inline `<script>` in `index.njk` or `404.njk`**, you must:
1. Build the site: `npm run build`
2. Extract the exact script content from `dist/index.html` or `dist/404.html`
3. Compute the hash: `echo -n 'SCRIPT_CONTENT' | openssl dgst -sha256 -binary | openssl base64`
4. Update the `csp` string in `src/_data/site.json` with the new `sha256-...` hash
5. Update the standalone CSP `<meta>` tag in `src/index.njk` (which has its own hardcoded CSP)
6. Rebuild to verify no CSP violations

---

## Common Tasks

### Adding a New Language

To add a new language (e.g., Portuguese `pt`):

1. **`src/_data/site.json`** — Add `{ "code": "pt", "label": "PT" }` to the `languages` array
2. **`src/_data/ui.json`** — Add `"pt": { ... }` block with all ~30 UI strings
3. **`src/_data/navigation.json`** — Add `"pt"` key to every item in `main` and `footer` arrays
4. **`src/_data/pages/*.json`** — Add `"pt"` translations to each of the 7 page data files (index, legal-hub, technical-hub, daily-life-hub, checklist, cost-calculator, search)
5. **`src/pt/pt.json`** — Create directory data file: `{ "lang": "pt", "locale": "pt_PT" }`
6. **`src/pt/*.md` + `src/pt/technical/*.md`** — Create translated Markdown content files (copy from `src/en/` and translate). Update breadcrumb URLs to use `/pt/` prefix.
7. **`scripts/build-search-index.js`** — Add `'pt'` to the language array (line ~95)
8. **`src/scripts/modules/search.js`** — Add `pt` to the regex pattern and add a `pt` entry to the `msgs` object
9. **`src/index.njk`** — Add `pt:'/pt/'` to the redirect script's supported languages object. Recompute CSP hash (see CSP section above).
10. **`src/404.njk`** — Add a `pt` entry to the translations object in the inline script. Recompute CSP hash (see CSP section above).

**No Nunjucks templates need duplicating** — the 7 paginated templates in `src/pages/` auto-generate `/pt/` pages from the data files.

### Adding a New Content Page

To add a new content page (e.g., `visa-guide`):

1. Create `src/en/visa-guide.md`, `src/es/visa-guide.md`, `src/it/visa-guide.md`, `src/fr/visa-guide.md` with translated content and front matter (`title`, `description`, `og`, `breadcrumbs`)
2. If the page has standard dates/layout, `content-meta.json` `_defaults` will apply automatically. If it needs custom values, add a `"visa-guide"` entry to `content-meta.json`.
3. Add the page slug to `PAGE_SLUGS` arrays in both `scripts/build-search-index.js` and `src/scripts/modules/search-index.js`
4. If the page should appear in a hub, add a card entry to the relevant `src/_data/pages/{hub}.json`
5. If the page should appear in navigation, add an entry to `src/_data/navigation.json`

### Adding a Card to a Hub Page

Edit the corresponding JSON file in `src/_data/pages/` (e.g., `legal-hub.json`). Add a new entry to the `cards` array:

```json
{
  "slug": "visa-guide",
  "icon": "🛂",
  "title": { "es": "Guia de Visado", "en": "Visa Guide", "it": "Guida al Visto", "fr": "Guide des Visas" },
  "desc": { "es": "...", "en": "...", "it": "...", "fr": "..." }
}
```

This single edit updates all 4 language versions of the hub page.

### Updating UI Strings Across All Languages

Edit `src/_data/ui.json`. Each language has its own block with ~30 keys. Update the relevant key in each language block. All templates that use `ui[lang].key_name` will pick up the change automatically.

### Updating Navigation Links

Edit `src/_data/navigation.json`. Each nav item has a `slug` and a label per language. The `main` array controls the top navbar, `footer` array controls footer links. Templates use `item[lang]` to render the correct label.

### Updating Shared Page Metadata (Dates, Layout)

Edit `src/_data/pages/content-meta.json`. The `_defaults` block applies to all markdown pages. To override for a specific page, add an entry keyed by the page slug (e.g., `"faq": { "layout": "layouts/page.njk" }` — a page-specific entry does NOT inherit from `_defaults`).

---

## File Reference

```
src/
├── _data/
│   ├── site.json              # Site config, languages, CSP
│   ├── ui.json                # UI strings per language
│   ├── navigation.json        # Nav links per language
│   └── pages/
│       ├── content-meta.json  # Shared markdown metadata
│       ├── index.json         # Homepage data
│       ├── legal-hub.json     # Legal hub data
│       ├── technical-hub.json # Technical hub data
│       ├── daily-life-hub.json# Daily life hub data
│       ├── checklist.json     # Checklist data
│       ├── cost-calculator.json # Calculator data
│       └── search.json        # Search page data
├── _includes/
│   ├── layouts/               # base, page, hub, home
│   └── partials/              # head, navbar, footer, breadcrumbs
├── pages/                     # 7 paginated templates (auto-generate all languages)
├── en/                        # English markdown content (33 files)
├── es/                        # Spanish markdown content (28 files)
├── it/                        # Italian markdown content (30 files)
├── fr/                        # French markdown content (24 files)
├── css/styles.css             # Single stylesheet
├── scripts/                   # Client-side JS (common.js, modules/, pages/, vendor/)
├── index.njk                  # Root redirect (→ /es/ default, JS checks localStorage)
├── 404.njk                    # 404 page (Spanish default, JS swaps for stored language)
├── sitemap.njk                # Auto-generated sitemap with hreflang alternates
├── offline.njk                # Offline fallback page
└── sw.js                      # Service worker
scripts/
└── build-search-index.js      # Build-time search index generator
eleventy.config.js             # Eleventy config: filters, computed data, markdown setup
```

## Git Commit Rules

- **Never** include `Co-Authored-By` lines mentioning Claude, AI, or any AI tool
- **Never** mention Claude, AI assistants, or automated tooling in commit messages
- Commit messages should read as if written by a human developer
