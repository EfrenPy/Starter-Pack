---
title: "SWAN Jupyter Notebooks - CERN Starter Pack"
description: "Guida al servizio SWAN del CERN per l'analisi interattiva dei dati con Jupyter notebooks, inclusi configurazione, integrazione con ROOT, archiviazione EOS e collaborazione."
og:
  title: "SWAN Jupyter Notebooks - CERN Starter Pack"
  description: "Inizia a usare SWAN, la piattaforma cloud del CERN basata su Jupyter notebooks per l'analisi interattiva dei dati."
breadcrumbs:
  - { label: "Home", url: "/it/" }
  - { label: "Aiuto Tecnico", url: "/it/technical-hub/" }
  - { label: "SWAN (Jupyter)" }
---

<h1>SWAN: Jupyter Notebooks al CERN</h1>
      <div class="alert">
        <p><strong>Nota:</strong> SWAN richiede un account di calcolo del CERN attivo. Assicurati che il tuo account sia attivato prima di tentare di accedere al servizio.</p>
      </div>

      <h2>Cos'e SWAN?</h2>
      <p>SWAN (Service for Web-based ANalysis) e la piattaforma cloud del CERN per l'analisi interattiva dei dati tramite Jupyter notebooks. Fornisce un ambiente basato su browser in cui puoi scrivere ed eseguire codice Python, C++ o ROOT senza installare nulla sulla tua macchina locale.</p>
      <p>SWAN e costruito su JupyterHub e si integra strettamente con l'infrastruttura del CERN, incluso lo storage EOS, gli stack software CVMFS e i cluster Spark. Puoi accedervi su <a href="https://swan.cern.ch" target="_blank" rel="noopener noreferrer">swan.cern.ch</a> usando le tue credenziali del CERN.</p>

      <h2>Come iniziare</h2>
      <p>Per iniziare a usare SWAN, segui questi passaggi:</p>
      <ul>
        <li>Vai su <a href="https://swan.cern.ch" target="_blank" rel="noopener noreferrer">swan.cern.ch</a> e accedi con le tue credenziali Single Sign-On (SSO) del CERN.</li>
        <li>Scegli un <strong>ambiente software</strong> (release LCG) che includa le librerie e gli strumenti di cui hai bisogno. Se non sei sicuro, la selezione predefinita funziona per la maggior parte dei casi.</li>
        <li>Seleziona un'<strong>allocazione di risorse</strong> (numero di core CPU e memoria). La configurazione predefinita e generalmente sufficiente per iniziare.</li>
        <li>Clicca su <strong>Start my Session</strong>. Una sessione Jupyter si avviera nel tuo browser in pochi secondi.</li>
      </ul>
      <p>I tuoi file vengono automaticamente salvati nel tuo spazio CERNBox (EOS). Puoi creare un nuovo notebook dalla pagina del launcher o aprire notebook esistenti dal file browser.</p>

      <h2>Usare ROOT in SWAN</h2>
      <p>SWAN include il framework di analisi dati ROOT preinstallato in tutti gli ambienti software LCG. Questo lo rende il modo piu veloce per iniziare a lavorare con ROOT al CERN:</p>
      <ul>
        <li>Usa <strong>PyROOT</strong> nei notebook Python per eseguire analisi dati, creare istogrammi, effettuare fit di funzioni e produrre grafici di qualita per pubblicazioni direttamente nel notebook.</li>
        <li>I notebook ROOT C++ sono supportati tramite il <strong>kernel ROOT C++</strong>, che permette di scrivere ed eseguire codice C++ in modo interattivo.</li>
        <li>Tutte le librerie standard di ROOT e i relativi tutorial sono disponibili immediatamente.</li>
        <li>Puoi combinare ROOT con altre librerie scientifiche Python come NumPy, pandas e matplotlib nello stesso notebook.</li>
      </ul>

      <h2>Archiviazione e integrazione con EOS</h2>
      <p>SWAN si integra direttamente con il sistema di archiviazione distribuita EOS del CERN tramite CERNBox:</p>
      <ul>
        <li>Tutti i tuoi notebook SWAN sono salvati nel tuo spazio <strong>CERNBox</strong>, il che significa che hanno backup e sono accessibili da qualsiasi dispositivo.</li>
        <li>Puoi accedere a qualsiasi percorso EOS dai tuoi notebook usando operazioni standard sui file o <code>TFile::Open</code> di ROOT.</li>
        <li>Condividi i notebook facilmente condividendo le cartelle CERNBox corrispondenti con i colleghi.</li>
        <li>I file di dati di grandi dimensioni archiviati su EOS possono essere letti direttamente dai tuoi notebook senza doverli scaricare localmente.</li>
      </ul>

      <h2>Condivisione e collaborazione</h2>
      <p>SWAN offre diversi modi per condividere il tuo lavoro e collaborare con altri:</p>
      <ul>
        <li><strong>Condivisione CERNBox:</strong> Condividi i link ai notebook con i colleghi condividendo la cartella CERNBox che li contiene.</li>
        <li><strong>SWAN Gallery:</strong> Esplora notebook di esempio pubblicati dagli esperimenti e dai servizi del CERN per imparare le migliori pratiche e scoprire tecniche di analisi.</li>
        <li><strong>Progetti SWAN:</strong> Crea progetti autonomi che raggruppano notebook, file di dati e configurazione dell'ambiente per una facile riproducibilita.</li>
        <li><strong>Opzioni di esportazione:</strong> I notebook possono essere esportati come HTML, PDF o script Python, rendendoli adatti per presentazioni, report e documentazione.</li>
      </ul>

      <h2>Consigli e buone pratiche</h2>
      <ul>
        <li><strong>Salva frequentemente:</strong> Anche se SWAN salva automaticamente i tuoi notebook periodicamente, e buona pratica salvare manualmente prima di eseguire calcoli lunghi.</li>
        <li><strong>Ambienti virtuali:</strong> Se hai bisogno di pacchetti Python non inclusi nello stack LCG predefinito, puoi configurare un ambiente virtuale all'interno della tua sessione SWAN.</li>
        <li><strong>Chiudi le sessioni inutilizzate:</strong> Le risorse di SWAN sono condivise tra tutti gli utenti del CERN. Chiudi la tua sessione quando hai finito per liberare risorse per gli altri.</li>
        <li><strong>Rimani aggiornato:</strong> Consulta la <a href="https://swan.docs.cern.ch" target="_blank" rel="noopener noreferrer">documentazione di SWAN</a> per le ultime funzionalita, gli stack software supportati e i problemi noti.</li>
        <li><strong>Usa i terminali:</strong> SWAN fornisce anche accesso ai terminali, utile per eseguire strumenti da riga di comando, gestire file o installare pacchetti.</li>
      </ul>
