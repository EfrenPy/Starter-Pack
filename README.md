# CERN Starter Pack

A multilingual informational website for people starting to work at CERN. Covers legal and tax guidance, social security, health insurance, daily life, and technical setup for CERN tools and environments.

**Live site:** [starter-pack.efrenrodriguezrodriguez.com](https://starter-pack.efrenrodriguezrodriguez.com)

## Features

- **4 languages** — Spanish (default), English, Italian, and French
- **50+ content pages** per language covering legal, tax, daily life, and technical topics
- **Client-side search** with accent-insensitive matching (Fuse.js)
- **SEO enhancements** — canonical/hreflang alternates, structured data (WebSite, FAQ, HowTo), and sitemap with language alternates
- **Interactive checklist** for tracking onboarding progress
- **Cost of living calculator** for the Geneva/CERN area
- **Dark mode** with system preference detection and manual toggle
- **Responsive design** — works on desktop, tablet, and mobile
- **Printable guides** — content pages have a print-friendly layout
- **Offline support** via service worker
- **Fully static** — no server-side rendering, no databases

## Content Overview

The site is organized into three main hubs:

- **Legal & Tax Help** — Contracts, permits, health insurance, taxation, pension fund, social security, and country-specific guides (French/Swiss taxes, Modelo 720, return to Spain)
- **Daily Life** — Housing, banking, transportation, childcare, language training, clubs, outdoor recreation, shopping, utilities, and more
- **Technical Help** — CERN IT basics, Kerberos/SSH, LXPLUS, EOS storage, GitLab, SWAN/Jupyter, ROOT, VS Code remote setup

Plus standalone pages for FAQ, pre-arrival guide, first weeks guide, doctoral guide, departure guide, and an onboarding checklist.

## Tech Stack

- [Eleventy (11ty)](https://www.11ty.dev/) v3 — static site generator
- [Nunjucks](https://mozilla.github.io/nunjucks/) — templating
- [Markdown-it](https://github.com/markdown-it/markdown-it) — Markdown rendering
- [Fuse.js](https://www.fusejs.io/) — client-side fuzzy search
- [Playwright](https://playwright.dev/) — end-to-end testing (352 tests)
- Vanilla JavaScript (ES modules, no frameworks)
- GitHub Actions — CI/CD (build + FTP deploy, Lighthouse CI)

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
git clone https://github.com/EfrenPy/Starter-Pack.git
cd Starter-Pack
npm install
```

### Development

```bash
npm run dev        # Start dev server with live reload (http://localhost:8080)
npm run build      # Build to dist/
npm run preview    # Preview build on port 4173
```

### Testing

```bash
npm test           # Run all 355 Playwright tests
npm run test:headed  # Run tests in headed browser mode
```

### Linting & Formatting

```bash
npm run lint       # ESLint on src/scripts/
npm run format     # Prettier on src/
```

## Project Structure

```
src/
├── en/, es/, it/, fr/     # Markdown content per language
├── _data/
│   ├── site.json          # Site config, languages, CSP
│   ├── ui.json            # UI strings per language (~30 keys)
│   ├── navigation.json    # Nav links per language
│   ├── seo.json           # SEO snippets and schema data (FAQ/HowTo)
│   └── pages/             # Page data (hubs, checklist, calculator, search)
├── _includes/
│   ├── layouts/           # Nunjucks layouts (base, page, hub, home)
│   └── partials/          # Shared partials (head, navbar, footer, breadcrumbs)
├── pages/                 # 7 paginated templates (auto-generate all languages)
├── scripts/               # Client-side JS (modules, page bundles, vendor)
├── css/styles.css         # Single stylesheet
├── index.njk              # Root redirect (detects stored language preference)
├── 404.njk                # Multilingual 404 page
├── sitemap.njk            # Auto-generated sitemap with hreflang
└── sw.js                  # Service worker for offline support
```

### How Multilingual Works

Each language has its own directory of Markdown content files (`src/en/`, `src/es/`, etc.). Templates are **not** duplicated — the 7 Nunjucks templates in `src/pages/` use Eleventy pagination over the languages array to auto-generate pages for all languages from a single source.

All translated UI strings live in `src/_data/ui.json`. Navigation labels, hub cards, checklist items, and calculator text are in `src/_data/pages/*.json`. Templates use `ui[lang]` and `item[lang]` lookups to render the correct language.

### Search

Search indices are built at build time by `scripts/build-search-index.js` (one JSON file per language). The client loads the matching index based on the URL path and uses vendored Fuse.js (`src/scripts/vendor/fuse.min.js`) for fuzzy, accent-insensitive matching.

## Deployment

Pushing to `main` triggers the GitHub Actions workflow, which runs `npm ci && npm run build` and deploys the `dist/` directory via FTP. The workflow can also be triggered manually via `workflow_dispatch`.

A separate Lighthouse CI workflow runs on pushes and pull requests to `main`.

## Contributing

Contributions are welcome! Whether it's fixing a typo, updating outdated info, suggesting new content, or improving the code — every bit helps.

- See [CONTRIBUTING.md](CONTRIBUTING.md) for full developer instructions
- See [SEO_PLAYBOOK.md](SEO_PLAYBOOK.md) for monthly/quarterly SEO workflow
- [Open an issue](https://github.com/EfrenPy/Starter-Pack/issues/new) to report a bug or suggest content
- Submit a pull request to contribute directly

## License

This project is licensed under the [MIT License](LICENSE).

## Author

**Efren Rodriguez Rodriguez** — [efrenrodriguezrodriguez.com](https://efrenrodriguezrodriguez.com)

_This is a personal project, not officially affiliated with CERN._
