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

# SWAN: Jupyter Notebooks al CERN

<div class="alert">
<p><strong>Nota:</strong> SWAN richiede un account di calcolo del CERN attivo. Assicurati che il tuo account sia attivato prima di tentare di accedere al servizio.</p>
</div>

## Cos'è SWAN?

SWAN (Service for Web-based ANalysis) è la piattaforma cloud del CERN per l'analisi interattiva dei dati tramite Jupyter notebooks. Fornisce un ambiente basato su browser in cui puoi scrivere ed eseguire codice Python, C++ o ROOT senza installare nulla sulla tua macchina locale.

SWAN è costruito su JupyterHub e si integra strettamente con l'infrastruttura del CERN, incluso lo storage EOS, gli stack software CVMFS e i cluster Spark. Puoi accedervi su <a href="https://swan.cern.ch" target="_blank" rel="noopener noreferrer">swan.cern.ch</a> usando le tue credenziali del CERN.

## Come iniziare

Per iniziare a lavorare con SWAN, apri il browser e vai su <a href="https://swan.cern.ch" target="_blank" rel="noopener noreferrer">swan.cern.ch</a>, dove effettuerai l'accesso con le tue credenziali Single Sign-On (SSO) del CERN. Una volta autenticato, la piattaforma ti chiederà di configurare la tua sessione. Per prima cosa, scegli un **ambiente software** (noto come release LCG) che includa le librerie e gli strumenti di cui hai bisogno. Se non sei sicuro di quale scegliere, la selezione predefinita copre la maggior parte dei casi ed è un buon punto di partenza.

Successivamente, seleziona un'**allocazione di risorse**, che determina il numero di core CPU e la quantità di memoria disponibile per la tua sessione. La configurazione predefinita è generalmente sufficiente quando si sta iniziando. Dopo aver effettuato le tue scelte, clicca su **Start my Session** e un ambiente Jupyter completamente configurato si avvierà nel tuo browser in pochi secondi.

I tuoi file vengono automaticamente salvati nel tuo spazio CERNBox (EOS). Dalla pagina del launcher puoi creare un nuovo notebook, oppure puoi usare il file browser integrato per aprire notebook esistenti salvati in precedenza da te o dai tuoi colleghi.

## Usare ROOT in SWAN

SWAN include il framework di analisi dati **ROOT** preinstallato in tutti gli ambienti software LCG, il che lo rende il modo più veloce per iniziare a lavorare con ROOT al CERN. Attraverso **PyROOT**, puoi eseguire analisi dati, creare istogrammi, effettuare fit di funzioni e produrre grafici di qualità per pubblicazioni direttamente all'interno di un notebook Python. Se preferisci lavorare in C++, SWAN supporta anche i notebook ROOT C++ tramite il **kernel ROOT C++**, che ti permette di scrivere ed eseguire codice C++ in modo interattivo nella stessa interfaccia del browser.

Tutte le librerie standard di ROOT e i relativi tutorial sono disponibili immediatamente, senza bisogno di installare o configurare nulla di aggiuntivo. Puoi inoltre combinare ROOT con altre librerie scientifiche Python come NumPy, pandas e matplotlib nello stesso notebook, dandoti accesso a un ampio ecosistema di strumenti per l'analisi e la visualizzazione.

## Archiviazione e integrazione con EOS

SWAN si integra direttamente con il sistema di archiviazione distribuita **EOS** del CERN tramite **CERNBox**. Tutti i tuoi notebook SWAN sono salvati nel tuo spazio CERNBox, il che significa che hanno backup automatico e sono accessibili da qualsiasi dispositivo con un browser. All'interno di un notebook puoi accedere a qualsiasi percorso EOS usando le operazioni standard sui file di Python o `TFile::Open` di ROOT, senza bisogno di copiare i dati su un disco locale prima di lavorarci.

Questa stretta integrazione semplifica anche la condivisione: puoi dare ai colleghi accesso ai tuoi notebook semplicemente condividendo la cartella CERNBox corrispondente. I file di dati di grandi dimensioni archiviati ovunque su EOS possono essere letti direttamente dai tuoi notebook senza doverli scaricare localmente, il che è particolarmente utile per dataset di esperimenti che sarebbe poco pratico duplicare.

## Condivisione e collaborazione

SWAN offre diversi modi per condividere il tuo lavoro e collaborare con altri. L'approccio più diretto è la **condivisione tramite CERNBox**: condividendo la cartella CERNBox che contiene i tuoi notebook, i colleghi ricevono un link diretto e possono aprire il tuo lavoro nelle proprie sessioni SWAN. Per ispirazione e apprendimento, la **SWAN Gallery** ospita notebook di esempio pubblicati dagli esperimenti e dai servizi del CERN, dove puoi scoprire tecniche di analisi e migliori pratiche utilizzate in tutta l'organizzazione.

Quando la riproducibilità è importante, i **Progetti SWAN** ti permettono di raggruppare notebook, file di dati e configurazione dell'ambiente in un pacchetto autonomo che altri possono avviare con un solo clic. Puoi anche esportare i tuoi notebook come HTML, PDF o script Python, rendendoli adatti per presentazioni, report e documentazione che deve essere condivisa al di fuori della piattaforma SWAN.

## Consigli e buone pratiche

Anche se SWAN salva automaticamente i tuoi notebook periodicamente, è buona pratica **salvare manualmente** prima di eseguire calcoli lunghi, per non rischiare di perdere le modifiche recenti. Se hai bisogno di pacchetti Python non inclusi nello stack LCG predefinito, puoi configurare un **ambiente virtuale** all'interno della tua sessione SWAN e installare lì le dipendenze aggiuntive.

Poiché le risorse di SWAN sono condivise tra tutti gli utenti del CERN, ricorda di **chiudere la tua sessione** quando hai finito di lavorare, in modo che CPU e memoria siano liberate per gli altri. SWAN fornisce anche l'**accesso ai terminali**, utile per eseguire strumenti da riga di comando, gestire file su EOS o installare pacchetti manualmente. Per le ultime funzionalità, gli stack software supportati e i problemi noti, consulta regolarmente la <a href="https://swan.docs.cern.ch" target="_blank" rel="noopener noreferrer">documentazione di SWAN</a>.
