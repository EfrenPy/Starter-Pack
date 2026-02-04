import { execSync } from 'child_process';
import markdownIt from 'markdown-it';
import markdownItAttrs from 'markdown-it-attrs';

function getSlugKey(data) {
  const stem = data.page?.filePathStem || '';
  const match = stem.match(/^\/(en|es|it|fr)\/(.+)$/);
  return match ? match[2] : data.page?.fileSlug;
}

// Look up a field from content-meta: use page-specific entry if it exists,
// otherwise fall back to _defaults. Pages with their own entry in content-meta
// only get values defined in that entry (no implicit fallthrough to _defaults).
function getMetaField(data, field) {
  const meta = data.pages?.['content-meta'];
  if (!meta) return undefined;
  const key = getSlugKey(data);
  if (key && meta[key]) return meta[key][field];
  return meta._defaults?.[field];
}

export default function (eleventyConfig) {
  // Passthrough copy static assets
  eleventyConfig.addPassthroughCopy('src/css');
  eleventyConfig.addPassthroughCopy('src/images');
  eleventyConfig.addPassthroughCopy('src/scripts');
  eleventyConfig.addPassthroughCopy('src/sw.js');
  eleventyConfig.addPassthroughCopy('src/.htaccess');
  eleventyConfig.addPassthroughCopy('src/robots.txt');
  eleventyConfig.addPassthroughCopy('src/site.webmanifest');
  eleventyConfig.addPassthroughCopy('src/favicon.ico');
  eleventyConfig.addPassthroughCopy('src/data');

  // Watch targets
  eleventyConfig.addWatchTarget('src/css/');
  eleventyConfig.addWatchTarget('src/scripts/');

  // Custom filter: swap current lang in URL to a target lang
  eleventyConfig.addFilter('toLang', function (url, currentLang, targetLang) {
    if (currentLang === targetLang) return url;
    return url.replace(`/${currentLang}/`, `/${targetLang}/`);
  });

  // Custom filter: absolute URL
  eleventyConfig.addFilter('absoluteUrl', function (url, base) {
    if (!url) return base;
    if (url.startsWith('http')) return url;
    return base.replace(/\/$/, '') + url;
  });

  // Build search index after build completes
  eleventyConfig.on('eleventy.after', () => {
    try {
      execSync('node scripts/build-search-index.js', { stdio: 'inherit' });
    } catch (e) {
      console.warn('Search index build failed:', e.message);
    }
  });

  // Markdown library config for proper HTML support
  const md = markdownIt({
    html: true,
    breaks: false,
    linkify: true,
  });
  md.use(markdownItAttrs);
  eleventyConfig.setLibrary('md', md);

  // Shared metadata defaults for markdown content pages
  // Looks up content-meta.json to fill in layout and date fields
  // so individual .md files don't need to repeat them.
  eleventyConfig.addGlobalData('eleventyComputed', {
    layout: (data) => data.layout || getMetaField(data, 'layout'),
    datePublished: (data) => data.datePublished || getMetaField(data, 'datePublished'),
    dateModified: (data) => data.dateModified || getMetaField(data, 'dateModified'),
    dateUpdated: (data) => data.dateUpdated || getMetaField(data, 'dateUpdated'),
    extraJs: (data) => data.extraJs || getMetaField(data, 'extraJs'),
    printable: (data) => {
      if (data.printable !== undefined) return data.printable;
      const val = getMetaField(data, 'printable');
      return val !== undefined ? val : undefined;
    },
  });

  return {
    dir: {
      input: 'src',
      output: 'dist',
      includes: '_includes',
      data: '_data',
    },
    templateFormats: ['njk', 'md', 'html'],
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk',
  };
}
