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
        enModelo720: resolve(__dirname, 'public_html/en/modelo-720.html'),
        esModelo720: resolve(__dirname, 'public_html/es/modelo-720.html'),
        enReturn: resolve(__dirname, 'public_html/en/return-to-spain.html'),
        esReturn: resolve(__dirname, 'public_html/es/return-to-spain.html'),
        enChecklist: resolve(__dirname, 'public_html/en/checklist.html'),
        esChecklist: resolve(__dirname, 'public_html/es/checklist.html'),
        enKerberos: resolve(__dirname, 'public_html/en/technical/kerberos-ssh.html'),
        esKerberos: resolve(__dirname, 'public_html/es/technical/kerberos-ssh.html'),
        enRoot: resolve(__dirname, 'public_html/en/technical/root-setup.html'),
        esRoot: resolve(__dirname, 'public_html/es/technical/root-setup.html'),
        enGitlab: resolve(__dirname, 'public_html/en/technical/gitlab-setup.html'),
        esGitlab: resolve(__dirname, 'public_html/es/technical/gitlab-setup.html'),
        enHousing: resolve(__dirname, 'public_html/en/housing-guide.html'),
        esHousing: resolve(__dirname, 'public_html/es/housing-guide.html'),
        enCalculator: resolve(__dirname, 'public_html/en/cost-calculator.html'),
        esCalculator: resolve(__dirname, 'public_html/es/cost-calculator.html'),
        enHealthInsurance: resolve(__dirname, 'public_html/en/health-insurance.html'),
        esHealthInsurance: resolve(__dirname, 'public_html/es/health-insurance.html'),
        enFaq: resolve(__dirname, 'public_html/en/faq.html'),
        esFaq: resolve(__dirname, 'public_html/es/faq.html'),
        enItBasics: resolve(__dirname, 'public_html/en/technical/cern-it-basics.html'),
        esItBasics: resolve(__dirname, 'public_html/es/technical/cern-it-basics.html'),
        enContribute: resolve(__dirname, 'public_html/en/contribute.html'),
        esContribute: resolve(__dirname, 'public_html/es/contribute.html'),
      },
    },
  },
  plugins: [copyStaticFiles()],
});
