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
      <p>Per iniziare a lavorare con SWAN, apri il browser e vai su <a href="https://swan.cern.ch" target="_blank" rel="noopener noreferrer">swan.cern.ch</a>, dove effettuerai l'accesso con le tue credenziali Single Sign-On (SSO) del CERN. Una volta autenticato, la piattaforma ti chiedera di configurare la tua sessione. Per prima cosa, scegli un <strong>ambiente software</strong> (noto come release LCG) che includa le librerie e gli strumenti di cui hai bisogno. Se non sei sicuro di quale scegliere, la selezione predefinita copre la maggior parte dei casi ed e un buon punto di partenza.</p>
      <p>Successivamente, seleziona un'<strong>allocazione di risorse</strong>, che determina il numero di core CPU e la quantita di memoria disponibile per la tua sessione. La configurazione predefinita e generalmente sufficiente quando si sta iniziando. Dopo aver effettuato le tue scelte, clicca su <strong>Start my Session</strong> e un ambiente Jupyter completamente configurato si avviera nel tuo browser in pochi secondi.</p>
      <p>I tuoi file vengono automaticamente salvati nel tuo spazio CERNBox (EOS). Dalla pagina del launcher puoi creare un nuovo notebook, oppure puoi usare il file browser integrato per aprire notebook esistenti salvati in precedenza da te o dai tuoi colleghi.</p>

      <h2>Usare ROOT in SWAN</h2>
      <p>SWAN include il framework di analisi dati <strong>ROOT</strong> preinstallato in tutti gli ambienti software LCG, il che lo rende il modo piu veloce per iniziare a lavorare con ROOT al CERN. Attraverso <strong>PyROOT</strong>, puoi eseguire analisi dati, creare istogrammi, effettuare fit di funzioni e produrre grafici di qualita per pubblicazioni direttamente all'interno di un notebook Python. Se preferisci lavorare in C++, SWAN supporta anche i notebook ROOT C++ tramite il <strong>kernel ROOT C++</strong>, che ti permette di scrivere ed eseguire codice C++ in modo interattivo nella stessa interfaccia del browser.</p>
      <p>Tutte le librerie standard di ROOT e i relativi tutorial sono disponibili immediatamente, senza bisogno di installare o configurare nulla di aggiuntivo. Puoi inoltre combinare ROOT con altre librerie scientifiche Python come NumPy, pandas e matplotlib nello stesso notebook, dandoti accesso a un ampio ecosistema di strumenti per l'analisi e la visualizzazione.</p>

      <h2>Archiviazione e integrazione con EOS</h2>
      <p>SWAN si integra direttamente con il sistema di archiviazione distribuita <strong>EOS</strong> del CERN tramite <strong>CERNBox</strong>. Tutti i tuoi notebook SWAN sono salvati nel tuo spazio CERNBox, il che significa che hanno backup automatico e sono accessibili da qualsiasi dispositivo con un browser. All'interno di un notebook puoi accedere a qualsiasi percorso EOS usando le operazioni standard sui file di Python o <code>TFile::Open</code> di ROOT, senza bisogno di copiare i dati su un disco locale prima di lavorarci.</p>
      <p>Questa stretta integrazione semplifica anche la condivisione: puoi dare ai colleghi accesso ai tuoi notebook semplicemente condividendo la cartella CERNBox corrispondente. I file di dati di grandi dimensioni archiviati ovunque su EOS possono essere letti direttamente dai tuoi notebook senza doverli scaricare localmente, il che e particolarmente utile per dataset di esperimenti che sarebbe poco pratico duplicare.</p>

      <h2>Condivisione e collaborazione</h2>
      <p>SWAN offre diversi modi per condividere il tuo lavoro e collaborare con altri. L'approccio piu diretto e la <strong>condivisione tramite CERNBox</strong>: condividendo la cartella CERNBox che contiene i tuoi notebook, i colleghi ricevono un link diretto e possono aprire il tuo lavoro nelle proprie sessioni SWAN. Per ispirazione e apprendimento, la <strong>SWAN Gallery</strong> ospita notebook di esempio pubblicati dagli esperimenti e dai servizi del CERN, dove puoi scoprire tecniche di analisi e migliori pratiche utilizzate in tutta l'organizzazione.</p>
      <p>Quando la riproducibilita e importante, i <strong>Progetti SWAN</strong> ti permettono di raggruppare notebook, file di dati e configurazione dell'ambiente in un pacchetto autonomo che altri possono avviare con un solo clic. Puoi anche esportare i tuoi notebook come HTML, PDF o script Python, rendendoli adatti per presentazioni, report e documentazione che deve essere condivisa al di fuori della piattaforma SWAN.</p>

      <h2>Consigli e buone pratiche</h2>
      <p>Anche se SWAN salva automaticamente i tuoi notebook periodicamente, e buona pratica <strong>salvare manualmente</strong> prima di eseguire calcoli lunghi, per non rischiare di perdere le modifiche recenti. Se hai bisogno di pacchetti Python non inclusi nello stack LCG predefinito, puoi configurare un <strong>ambiente virtuale</strong> all'interno della tua sessione SWAN e installare li le dipendenze aggiuntive.</p>
      <p>Poiche le risorse di SWAN sono condivise tra tutti gli utenti del CERN, ricorda di <strong>chiudere la tua sessione</strong> quando hai finito di lavorare, in modo che CPU e memoria siano liberate per gli altri. SWAN fornisce anche l'<strong>accesso ai terminali</strong>, utile per eseguire strumenti da riga di comando, gestire file su EOS o installare pacchetti manualmente. Per le ultime funzionalita, gli stack software supportati e i problemi noti, consulta regolarmente la <a href="https://swan.docs.cern.ch" target="_blank" rel="noopener noreferrer">documentazione di SWAN</a>.</p>
