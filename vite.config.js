import { defineConfig } from 'vite';
import { resolve } from 'path';
import { copyFileSync, mkdirSync } from 'fs';
import { execSync } from 'child_process';

/** Build the pre-built search index before bundling */
function buildSearchIndex() {
  return {
    name: 'build-search-index',
    buildStart() {
      execSync('node scripts/build-search-index.js', { stdio: 'inherit' });
    },
  };
}

/** Copy runtime-fetched HTML fragments and static files into dist */
function copyStaticFiles() {
  return {
    name: 'copy-static-files',
    closeBundle() {
      const copies = [
        { src: 'components/navbar.html', dest: 'components/navbar.html' },
        { src: 'components/footer.html', dest: 'components/footer.html' },
        { src: 'sw.js', dest: 'sw.js' },
        { src: 'offline.html', dest: 'offline.html' },
        { src: 'images/bmc-button.png', dest: 'images/bmc-button.png' },
        { src: 'data/search-index-es.json', dest: 'data/search-index-es.json' },
        { src: 'data/search-index-en.json', dest: 'data/search-index-en.json' },
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
        enDailyLife: resolve(__dirname, 'public_html/en/daily-life-hub.html'),
        esDailyLife: resolve(__dirname, 'public_html/es/daily-life-hub.html'),
        enBanking: resolve(__dirname, 'public_html/en/banking-setup.html'),
        esBanking: resolve(__dirname, 'public_html/es/banking-setup.html'),
        enTransportation: resolve(__dirname, 'public_html/en/transportation.html'),
        esTransportation: resolve(__dirname, 'public_html/es/transportation.html'),
        enCrossBorderShopping: resolve(__dirname, 'public_html/en/cross-border-shopping.html'),
        esCrossBorderShopping: resolve(__dirname, 'public_html/es/cross-border-shopping.html'),
        enChildcareSchools: resolve(__dirname, 'public_html/en/childcare-schools.html'),
        esChildcareSchools: resolve(__dirname, 'public_html/es/childcare-schools.html'),
        enUtilitiesSetup: resolve(__dirname, 'public_html/en/utilities-setup.html'),
        esUtilitiesSetup: resolve(__dirname, 'public_html/es/utilities-setup.html'),
        enOnSiteServices: resolve(__dirname, 'public_html/en/on-site-services.html'),
        esOnSiteServices: resolve(__dirname, 'public_html/es/on-site-services.html'),
        enFamilySupport: resolve(__dirname, 'public_html/en/family-support.html'),
        esFamilySupport: resolve(__dirname, 'public_html/es/family-support.html'),
        enMedicalEmergency: resolve(__dirname, 'public_html/en/medical-emergency.html'),
        esMedicalEmergency: resolve(__dirname, 'public_html/es/medical-emergency.html'),
        enDoctoralGuide: resolve(__dirname, 'public_html/en/doctoral-guide.html'),
        esDoctoralGuide: resolve(__dirname, 'public_html/es/doctoral-guide.html'),
        enSafetyTraining: resolve(__dirname, 'public_html/en/safety-training.html'),
        esSafetyTraining: resolve(__dirname, 'public_html/es/safety-training.html'),
        enAccessCards: resolve(__dirname, 'public_html/en/access-cards.html'),
        esAccessCards: resolve(__dirname, 'public_html/es/access-cards.html'),
        enTeleworkPolicy: resolve(__dirname, 'public_html/en/telework-policy.html'),
        esTeleworkPolicy: resolve(__dirname, 'public_html/es/telework-policy.html'),
        enPermitsRegistration: resolve(__dirname, 'public_html/en/permits-registration.html'),
        esPermitsRegistration: resolve(__dirname, 'public_html/es/permits-registration.html'),
        enCernTaxation: resolve(__dirname, 'public_html/en/cern-taxation.html'),
        esCernTaxation: resolve(__dirname, 'public_html/es/cern-taxation.html'),
        enPensionFund: resolve(__dirname, 'public_html/en/pension-fund.html'),
        esPensionFund: resolve(__dirname, 'public_html/es/pension-fund.html'),
        enContractsCareer: resolve(__dirname, 'public_html/en/contracts-career.html'),
        esContractsCareer: resolve(__dirname, 'public_html/es/contracts-career.html'),
        enVehicleGreenPlates: resolve(__dirname, 'public_html/en/vehicle-green-plates.html'),
        esVehicleGreenPlates: resolve(__dirname, 'public_html/es/vehicle-green-plates.html'),
        enLanguageTraining: resolve(__dirname, 'public_html/en/language-training.html'),
        esLanguageTraining: resolve(__dirname, 'public_html/es/language-training.html'),
        enClubsSocial: resolve(__dirname, 'public_html/en/clubs-social.html'),
        esClubsSocial: resolve(__dirname, 'public_html/es/clubs-social.html'),
      },
    },
  },
  plugins: [buildSearchIndex(), copyStaticFiles()],
});
