# SEO Playbook

This project uses a recurring SEO workflow to keep indexing healthy and improve click-through rate over time.

## Monthly Review Loop

1. Export Google Search Console query data (last 28 days).
2. Group queries by intent cluster:
   - access/registration
   - transport/shuttles
   - tax/frontier
   - first weeks onboarding
3. Map each cluster to its strongest landing page.
4. Tune page title and intro for low-CTR queries with strong impressions.
5. Request re-indexing only for materially updated pages.

## Quarterly Content Freshness

Use the quarterly checklist from `src/_data/seoExtensions.json`:

- verify legal deadlines and authority links
- recheck transport timetables and stop names
- revalidate tax thresholds and rates
- confirm CERN service URLs and portal names

## Structured Data Coverage

- Global WebSite + SearchAction: `src/_includes/partials/head.njk`
- FAQPage for FAQ page and selected guides: `src/_includes/layouts/page.njk`
- HowTo schema for procedural guides: `src/_data/seo.json`
- Hub ItemList schema: `src/_includes/layouts/hub.njk`

## Crawl and Indexation

- Sitemap index: `/sitemap.xml`
- Child sitemaps:
  - `/sitemaps/content.xml`
  - `/sitemaps/hubs.xml`
  - `/sitemaps/en.xml`, `/sitemaps/es.xml`, `/sitemaps/it.xml`, `/sitemaps/fr.xml`
- Keep utility pages out of index and sitemap.

## Source Policy

Prefer high-authority sources:

- CERN official portals and e-guides
- Swiss federal/cantonal authorities
- French official administration portals
- Official tax authorities

Avoid adding unverified operational details without a source.
