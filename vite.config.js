import { defineConfig } from 'vite';
import { resolve } from 'path';
import { copyFileSync, mkdirSync } from 'fs';

/** Copy runtime-fetched HTML fragments (navbar, footer) into dist */
function copyComponentFragments() {
  const fragments = [
    { src: 'navbar.html', dest: ['navbar.html', 'en/navbar.html', 'es/navbar.html'] },
    { src: 'footer.html', dest: ['footer.html', 'en/footer.html', 'es/footer.html'] },
  ];
  return {
    name: 'copy-component-fragments',
    closeBundle() {
      for (const frag of fragments) {
        for (const dest of frag.dest) {
          const srcDir = dest.includes('/') ? resolve('public_html', dest) : resolve('public_html', frag.src);
          const destPath = resolve('dist', dest);
          const destDir = resolve(destPath, '..');
          mkdirSync(destDir, { recursive: true });
          copyFileSync(srcDir, destPath);
        }
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
  plugins: [copyComponentFragments()],
});
