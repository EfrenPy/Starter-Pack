# Contributing to CERN Starter Pack

Thanks for your interest in contributing to the CERN Starter Pack! This is a static multilingual website that helps people starting to work at CERN, covering legal/tax guidance, social security, daily life, and technical setup.

The site is built with [Eleventy (11ty)](https://www.11ty.dev/) and currently supports four languages: Spanish (default), English, Italian, and French.

## Ways to Contribute

- **Report issues** — Found outdated info, a broken link, or an error? [Open an issue](https://github.com/EfrenPy/Starter-Pack/issues/new).
- **Suggest new content** — Know a useful resource or topic we're missing? Open an issue describing what you'd like to see.
- **Submit a pull request** — Fix a typo, add a new page, or improve the code directly.
- **Translate** — Help expand or improve translations in any of the supported languages.

## Development Setup

```bash
git clone https://github.com/EfrenPy/Starter-Pack.git
cd Starter-Pack
npm install
npm run dev      # Start dev server with live reload
npm run build    # Build to dist/
npm test         # Run Playwright tests
npm run lint     # Lint JavaScript
```

Node.js 18+ is required.

## Project Structure

```
src/
├── en/, es/, it/, fr/     # Markdown content per language
├── _data/                 # Site config, UI strings, navigation, page data
├── _includes/             # Nunjucks layouts and partials
├── pages/                 # Paginated templates (auto-generate all languages)
├── scripts/               # Client-side JavaScript
├── css/styles.css         # Stylesheet
└── index.njk, 404.njk    # Root redirect and error pages
```

For a full architecture reference, see `CLAUDE.md`.

## Content Contributions

### Editing an Existing Page

Content pages live in `src/{lang}/` as Markdown files. Each file has YAML front matter for translated metadata:

```yaml
---
title: "Page Title"
description: "Page description for SEO"
og:
  title: "Page Title"
  description: "Page description for social sharing"
breadcrumbs:
  - { label: "Home", url: "/en/" }
  - { label: "Page Title" }
---

# Page Title

Your content here in Markdown...
```

Edit the `.md` file for the relevant language. Shared metadata (layout, dates) is inherited automatically from `src/_data/pages/content-meta.json` — you only need `title`, `description`, `og`, and `breadcrumbs` in front matter.

### Adding a New Content Page

1. Create the Markdown file in each language directory: `src/en/your-page.md`, `src/es/your-page.md`, etc.
2. Add the page slug to `PAGE_SLUGS` in both `scripts/build-search-index.js` and `src/scripts/modules/search-index.js`.
3. If the page belongs in a hub, add a card entry to the relevant `src/_data/pages/{hub}.json`.
4. If the page should appear in navigation, add an entry to `src/_data/navigation.json`.

### Adding a New Language

This is a larger effort. See the "Adding a New Language" section in `CLAUDE.md` for the full checklist.

## Code Conventions

- **ES modules** — All JavaScript uses ESM (`import`/`export`).
- **Vanilla JS** — No frameworks. Modules are in `src/scripts/modules/`.
- **Single stylesheet** — All styles in `src/css/styles.css`.
- **Templates** — Nunjucks templates are language-agnostic. They use data lookups (`ui[lang]`, `item[lang]`) instead of duplicating per language.

## Pull Request Guidelines

1. Branch from `main`.
2. Run `npm run build` and fix any errors before pushing.
3. Run `npm test` and ensure all tests pass.
4. Keep changes focused — one concern per PR.
5. Describe what you changed and why in the PR description.

For content changes, make sure breadcrumb URLs use the correct language prefix (e.g., `/it/` for Italian pages, not `/en/`).

## Issue Guidelines

When opening an issue, please include:

- **Bug reports** — What you expected, what happened, and the page URL.
- **Content corrections** — The specific page, what's wrong, and the correct information (with a source if possible).
- **New page suggestions** — What topic, why it would help newcomers, and any sources you'd recommend.

## Content Guidelines

- **Official sources only** — Reference verified sources (CERN, government, institutional).
- **Keep it factual** — No personal opinions on employers, landlords, or service providers. Stick to objective, verifiable information.
- **Be practical** — Focus on information that is actionable for someone arriving at CERN for the first time.

## License

This project is licensed under the [MIT License](LICENSE).
