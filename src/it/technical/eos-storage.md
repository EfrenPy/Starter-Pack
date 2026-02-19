---
title: "Storage EOS e CERNBox - CERN Starter Pack"
description: "Guida allo storage distribuito EOS e CERNBox al CERN: spazio personale, quote, interfaccia web, sincronizzazione desktop, accesso da lxplus e condivisione file."
og:
  title: "Storage EOS e CERNBox - CERN Starter Pack"
  description: "Guida allo storage distribuito EOS e CERNBox al CERN: spazio personale, quote, interfaccia web, sincronizzazione desktop, accesso da lxplus e condivisione file."
breadcrumbs:
  - { label: "Home", url: "/it/" }
  - { label: "Assistenza Tecnica", url: "/it/technical-hub/" }
  - { label: "Storage EOS e CERNBox" }
---

# Storage EOS e CERNBox

<div class="alert">
<strong>💡 Consiglio</strong><br>
<p>CERNBox e il tuo spazio di archiviazione cloud principale al CERN. Configuralo presto per mantenere i tuoi file sincronizzati tra i dispositivi e salvati automaticamente.</p>
</div>

EOS e il **sistema di storage distribuito su larga scala** del CERN, progettato per gestire gli enormi volumi di dati prodotti dagli esperimenti del LHC e al contempo fungere da infrastruttura di archiviazione personale e di progetto per tutti gli utenti del CERN. CERNBox e l'interfaccia web e desktop user-friendly costruita su EOS, che fornisce funzionalita di sincronizzazione e condivisione file simili a Dropbox. Insieme, costituiscono la spina dorsale dello storage di file al CERN.

## Cos'e EOS

EOS e un sistema di storage basato su disco sviluppato al CERN che gestisce **centinaia di petabyte di dati** su migliaia di nodi di archiviazione. Utilizza erasure coding e replicazione per garantire la durabilita e la disponibilita dei dati, ed e ottimizzato sia per l'elaborazione di dati fisici ad alto throughput che per i flussi di lavoro interattivi degli utenti. Per la maggior parte degli utenti CERN, EOS e semplicemente il luogo dove risiedono i file personali, i dati di progetto e le cartelle condivise — vi si interagisce tramite CERNBox, la riga di comando su lxplus o le piattaforme di analisi del CERN come SWAN.

Ogni utente CERN riceve automaticamente una **home directory su EOS** al percorso `/eos/user/<iniziale>/<username>/`. Questa e distinta dalla home directory AFS ed e la posizione consigliata per file di lavoro attivi, script di analisi e documenti che si vogliono accedere da piu postazioni.

## Quote di Archiviazione

Lo storage personale su EOS ha una quota predefinita di **1 TB**, che e generosa per la maggior parte degli utenti. Se hai bisogno di piu spazio — ad esempio per grandi dataset di analisi o output di simulazioni — puoi richiedere un aumento di quota tramite il portale ServiceNow dell'IT del CERN. Gli spazi di progetto e lo storage degli esperimenti hanno quote separate e piu ampie gestite dai rispettivi coordinatori di calcolo.

Puoi controllare il tuo utilizzo attuale e la quota accedendo a CERNBox o eseguendo il comando `eos quota ls -m` su lxplus. Tieni d'occhio l'utilizzo, poiche raggiungere il limite di quota impedira il salvataggio di nuovi file fino a quando non liberi spazio o ottieni un aumento.

## Interfaccia Web di CERNBox

CERNBox e accessibile su **cernbox.cern.ch** tramite qualsiasi browser web, utilizzando le credenziali di single sign-on del CERN. L'interfaccia web offre un'esperienza familiare di file manager dove puoi caricare, scaricare, rinominare, spostare ed eliminare file e cartelle. Supporta inoltre l'**editing online** dei documenti tramite strumenti integrati (OnlyOffice), permettendo di creare e modificare file Word, Excel e PowerPoint direttamente nel browser senza installare alcun software.

L'interfaccia web e particolarmente utile quando lavori da una macchina dove non hai installato il client di sincronizzazione desktop — ad esempio da un laptop personale o durante un viaggio. Tutte le modifiche fatte attraverso l'interfaccia web si riflettono immediatamente nello storage EOS e si sincronizzeranno con qualsiasi client desktop connesso.

## Client di Sincronizzazione Desktop

Per una sincronizzazione fluida tra la tua macchina locale e EOS, installa il **client desktop di CERNBox**, disponibile per Windows, macOS e Linux. Il client funziona come Dropbox o OneDrive, mantenendo una copia locale dei tuoi file sincronizzata con il tuo storage EOS. Puoi scegliere quali cartelle sincronizzare se non vuoi replicare l'intera home directory EOS localmente.

Scarica il client da **cernbox.cern.ch** e autenticati con le tue credenziali CERN. Dopo la sincronizzazione iniziale, le modifiche vengono propagate quasi in tempo reale. Il client desktop e il modo consigliato per lavorare con CERNBox per le attivita quotidiane, poiche fornisce accesso offline ai file e risoluzione automatica dei conflitti se lo stesso file viene modificato in piu luoghi.

## Accesso a EOS da lxplus e SWAN

Su **lxplus** (il cluster di login interattivo del CERN), la tua home directory EOS e accessibile al percorso `/eos/user/<iniziale>/<username>/`. Puoi navigare, leggere e scrivere file usando i comandi Linux standard. Per i flussi di lavoro di analisi fisica, EOS e direttamente accessibile anche da **SWAN** (il servizio Jupyter notebook del CERN), dove i tuoi file EOS appaiono nel browser dei file e possono essere caricati nei notebook in modo trasparente.

Se hai bisogno di accedere a EOS dalla tua macchina locale al di fuori di CERNBox, puoi montarlo via **FUSE** (usando il client eosxd) o accedervi tramite il **protocollo XRootD**. Il mount FUSE fornisce un'interfaccia simile a un file system, mentre XRootD viene usato programmaticamente nei framework di analisi come ROOT. Entrambi i metodi richiedono un'autenticazione Kerberos valida — consulta la pagina Kerberos e SSH per le istruzioni di configurazione.

## Condivisione di File e Cartelle

CERNBox rende facile **condividere file e cartelle** con i colleghi. Tramite l'interfaccia web o il client desktop, puoi condividere un file o una cartella inserendo il nome utente CERN o l'indirizzo email del destinatario e scegliendo il livello di permessi (sola lettura o modifica). Gli elementi condivisi appaiono nel CERNBox del destinatario nella sezione "Condivisi con me".

Puoi anche generare **link pubblici** per la condivisione con persone esterne al CERN, opzionalmente protetti da password e con una data di scadenza. Questo e utile per condividere documenti con collaboratori esterni che non hanno account CERN. Per la condivisione su larga scala all'interno di un esperimento o progetto, gli **spazi di progetto EOS** forniscono aree di storage condiviso dedicate con quote e controlli di accesso propri gestiti dal coordinatore del progetto.

## Fonti

- <a href="https://cernbox.cern.ch/" target="_blank" rel="noopener noreferrer">CERNBox — Cloud Storage del CERN</a>
- <a href="https://eos-docs.web.cern.ch/" target="_blank" rel="noopener noreferrer">Documentazione EOS</a>
- <a href="https://information-technology.web.cern.ch/" target="_blank" rel="noopener noreferrer">Dipartimento IT del CERN</a>
