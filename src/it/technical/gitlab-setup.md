---
title: "CERN GitLab e Workflow di Sviluppo - CERN Starter Pack"
description: "Guida a CERN GitLab, metodi di autenticazione, chiavi SSH, accesso Git tramite Kerberos, CI/CD e workflow di sviluppo per i nuovi arrivati."
og:
  title: "CERN GitLab e Workflow di Sviluppo - CERN Starter Pack"
  description: "Configurare il proprio account CERN GitLab, impostare l'autenticazione e apprendere il workflow di sviluppo standard al CERN."
breadcrumbs:
  - { label: "Home", url: "/it/" }
  - { label: "Aiuto Tecnico", url: "/it/technical-hub/" }
  - { label: "CERN GitLab" }
---

<h1>CERN GitLab e Workflow di Sviluppo</h1>
      <h2>CERN GitLab vs GitHub</h2>
      <p>Il CERN ospita la propria istanza GitLab all'indirizzo <a href="https://gitlab.cern.ch" target="_blank" rel="noopener noreferrer">gitlab.cern.ch</a>. Questa è la piattaforma principale per il controllo di versione e la collaborazione sui progetti software del CERN. A differenza del GitHub pubblico, il GitLab del CERN è integrato con il Single Sign-On (SSO) del CERN ed è accessibile a chiunque possieda un account informatico CERN.</p>
      <p>Sebbene molti progetti HEP open-source mantengano anche mirror su GitHub, i repository autorevoli per i framework degli esperimenti, gli strumenti interni e la gestione delle configurazioni risiedono tipicamente sul GitLab del CERN. Il proprio gruppo o esperimento richiederà probabilmente di utilizzarlo per lo sviluppo quotidiano.</p>

      <h2>Metodi di autenticazione</h2>
      <p>Il GitLab del CERN supporta diversi metodi di autenticazione:</p>
      <ul>
        <li><strong>CERN SSO (web):</strong> Accedere all'interfaccia web di GitLab utilizzando le proprie credenziali CERN. L'accesso è automatico se si è già autenticati con il CERN SSO.</li>
        <li><strong>Chiavi SSH:</strong> Il metodo preferito per le operazioni Git da riga di comando. Da configurare una sola volta per poi utilizzarlo senza inserire password.</li>
        <li><strong>Kerberos:</strong> Clonare e fare push utilizzando il proprio ticket Kerberos tramite lo schema URL <code>https://:@gitlab.cern.ch:8443/</code>.</li>
        <li><strong>Personal Access Token (PAT):</strong> Generare un token nelle impostazioni di GitLab per l'autenticazione basata su HTTPS. Utile per script e integrazioni CI/CD.</li>
      </ul>

      <h2>Configurazione delle chiavi SSH per GitLab</h2>
      <p>Generare una coppia di chiavi SSH se non se ne possiede già una:</p>
      <pre><code>ssh-keygen -t ed25519 -C "your.name@cern.ch"</code></pre>
      <p>Copiare la chiave pubblica negli appunti:</p>
      <pre><code>cat ~/.ssh/id_ed25519.pub</code></pre>
      <p>Quindi aggiungerla al proprio account CERN GitLab:</p>
      <ol>
        <li>Andare su <a href="https://gitlab.cern.ch/-/user_settings/ssh_keys" target="_blank" rel="noopener noreferrer">gitlab.cern.ch/-/user_settings/ssh_keys</a></li>
        <li>Incollare la chiave pubblica nel campo "Key"</li>
        <li>Assegnare un titolo descrittivo (ad es. "Portatile - Ubuntu 2026")</li>
        <li>Fare clic su "Add key"</li>
      </ol>
      <p>Testare la connessione:</p>
      <pre><code>ssh -T git@gitlab.cern.ch</code></pre>
      <p>Aggiungere questo al proprio <code>~/.ssh/config</code> per comodità:</p>
      <pre><code>Host gitlab.cern.ch
    User git
    IdentityFile ~/.ssh/id_ed25519
    PreferredAuthentications publickey</code></pre>

      <h2>Autenticazione Kerberos per Git</h2>
      <p>Se si preferisce utilizzare Kerberos al posto delle chiavi SSH, è possibile clonare i repository utilizzando l'endpoint HTTPS autenticato tramite Kerberos sulla porta 8443:</p>
      <pre><code># Prima, ottenere un ticket Kerberos
kinit username@CERN.CH

# Clonare utilizzando l'URL Kerberos
git clone https://:@gitlab.cern.ch:8443/group/project.git</code></pre>
      <p>Questo metodo è particolarmente comodo su lxplus dove si dispone già di un ticket Kerberos. Non è necessaria alcuna configurazione aggiuntiva oltre a un ticket valido.</p>

      <h2>Workflow Git di base al CERN</h2>
      <p>La maggior parte dei progetti del CERN segue un workflow basato su merge request simile al flusso standard di GitLab:</p>
      <ol>
        <li><strong>Fork o branch:</strong> Creare un fork personale del progetto o un branch per la funzionalità (a seconda delle convenzioni del progetto).</li>
        <li><strong>Sviluppo locale:</strong> Clonare il repository, creare un branch, apportare le modifiche e fare commit.</li>
        <li><strong>Push:</strong> Fare push del branch verso il proprio fork o il repository upstream.</li>
        <li><strong>Aprire una Merge Request (MR):</strong> Nell'interfaccia web di GitLab, creare una merge request verso il branch principale. Aggiungere una descrizione, assegnare i revisori.</li>
        <li><strong>Code review:</strong> Rispondere ai feedback, fare push di commit aggiuntivi se necessario.</li>
        <li><strong>Merge:</strong> Una volta approvata, la MR viene integrata (generalmente dal maintainer o da voi stessi se si hanno i permessi).</li>
      </ol>
      <pre><code># Comandi tipici del workflow
git clone git@gitlab.cern.ch:group/project.git
cd project
git checkout -b my-feature
# ... apportare modifiche ...
git add -A &amp;&amp; git commit -m "Add new feature"
git push origin my-feature
# Quindi aprire la MR dall'interfaccia web di GitLab</code></pre>

      <h2>CI/CD su CERN GitLab</h2>
      <p>Il GitLab del CERN fornisce pipeline CI/CD integrate alimentate da GitLab Runner. Sono disponibili numerosi runner condivisi, inclusi runner che possono accedere a CVMFS per il software degli esperimenti. Per configurare la CI/CD per il proprio progetto, creare un file <code>.gitlab-ci.yml</code> nella radice del repository:</p>
      <pre><code>stages:
  - build
  - test

build-job:
  stage: build
  image: gitlab-registry.cern.ch/linuxsupport/alma9-base
  script:
    - source /cvmfs/sft.cern.ch/lcg/views/LCG_105/x86_64-el9-gcc13-opt/setup.sh
    - mkdir build &amp;&amp; cd build
    - cmake .. &amp;&amp; make

test-job:
  stage: test
  image: gitlab-registry.cern.ch/linuxsupport/alma9-base
  script:
    - source /cvmfs/sft.cern.ch/lcg/views/LCG_105/x86_64-el9-gcc13-opt/setup.sh
    - cd build &amp;&amp; ctest</code></pre>
      <p>Il CERN fornisce runner condivisi con tag come <code>cvmfs</code> per accedere agli stack software degli esperimenti. Verificare le impostazioni CI del proprio progetto o chiedere al team la configurazione runner preferita.</p>

      <h2>Repository utili per i nuovi arrivati</h2>
      <p>Ecco alcuni repository e gruppi comunemente consultati sul GitLab del CERN:</p>
      <ul>
        <li><strong>Framework degli esperimenti:</strong> Ogni grande esperimento (ATLAS, CMS, LHCb, ALICE) ha il proprio gruppo GitLab contenente i framework di analisi e ricostruzione. Chiedere al proprio supervisore i repository specifici necessari.</li>
        <li><strong>Strumenti IT del CERN:</strong> I gruppi <code>cern-it</code> e <code>linuxsupport</code> contengono strumenti infrastrutturali, immagini container e configurazioni di sistema.</li>
        <li><strong>Progetto ROOT:</strong> Il framework ROOT stesso è sviluppato su GitHub (<a href="https://github.com/root-project/root" target="_blank" rel="noopener noreferrer">github.com/root-project/root</a>), ma molti strumenti e pacchetti basati su ROOT risiedono sul GitLab del CERN.</li>
        <li><strong>Progetti di documentazione:</strong> Molti gruppi mantengono la propria documentazione come siti GitLab Pages (usando mkdocs, sphinx o simili). Esplorare il gruppo di documentazione del proprio esperimento per guide e tutorial.</li>
      </ul>
