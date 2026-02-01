import { defineConfig } from 'vite';
import { resolve } from 'path';
import { copyFileSync, mkdirSync } from 'fs';

/** Copy runtime-fetched HTML fragments and static files into dist */
function copyStaticFiles() {
  return {
    name: 'copy-static-files',
    closeBundle() {
      const copies = [
        { src: 'components/navbar.html', dest: 'components/navbar.html' },
        { src: 'components/footer.html', dest: 'components/footer.html' },
        { src: 'robots.txt', dest: 'robots.txt' },
        { src: 'sitemap.xml', dest: 'sitemap.xml' },
        { src: 'favicon.ico', dest: 'favicon.ico' },
      ];
      for (const { src, dest } of copies) {
        const srcPath = resolve('public_html', src);
        const destPath = resolve('dist', dest);
        mkdirSync(resolve(destPath, '..'), { recursive: true });
        copyFileSync(srcPath, destPath);
      }
    },
  };
}

export default defineConfig({
  root: 'public_html',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'public_html/index.html'),
        beginning: resolve(__dirname, 'public_html/beginning.html'),
        notFound: resolve(__dirname, 'public_html/404.html'),
        enIndex: resolve(__dirname, 'public_html/en/index.html'),
        enBeginning: resolve(__dirname, 'public_html/en/beginning.html'),
        enLegalHub: resolve(__dirname, 'public_html/en/legal-hub.html'),
        enTechHub: resolve(__dirname, 'public_html/en/technical-hub.html'),
        enTax: resolve(__dirname, 'public_html/en/tax_declaration_spain.html'),
        enSearch: resolve(__dirname, 'public_html/en/search.html'),
        enVscode: resolve(__dirname, 'public_html/en/technical/vscode-remote.html'),
        esIndex: resolve(__dirname, 'public_html/es/index.html'),
        esBeginning: resolve(__dirname, 'public_html/es/beginning.html'),
        esLegalHub: resolve(__dirname, 'public_html/es/legal-hub.html'),
        esTechHub: resolve(__dirname, 'public_html/es/technical-hub.html'),
        esTax: resolve(__dirname, 'public_html/es/tax_declaration_spain.html'),
        esSearch: resolve(__dirname, 'public_html/es/search.html'),
        esVscode: resolve(__dirname, 'public_html/es/technical/vscode-remote.html'),
        enComplete: resolve(__dirname, 'public_html/en/complete.html'),
        esComplete: resolve(__dirname, 'public_html/es/complete.html'),
      },
    },
  },
  plugins: [copyStaticFiles()],
});
