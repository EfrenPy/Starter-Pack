import { execSync } from 'child_process';
import markdownIt from 'markdown-it';
import markdownItAttrs from 'markdown-it-attrs';

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

  // Custom filter: get the alternate language URL
  eleventyConfig.addFilter('langUrl', function (url, lang) {
    const otherLang = lang === 'en' ? 'es' : 'en';
    return url.replace(`/${lang}/`, `/${otherLang}/`);
  });

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
