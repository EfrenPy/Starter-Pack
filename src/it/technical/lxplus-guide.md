---
title: "Guida a lxplus - CERN Starter Pack"
description: "Guida all'uso di lxplus al CERN: cos'e, risorse disponibili, home directory, ambienti software, job batch con HTCondor e limiti di risorse."
og:
  title: "Guida a lxplus - CERN Starter Pack"
  description: "Guida all'uso di lxplus al CERN: cos'e, risorse disponibili, home directory, ambienti software, job batch con HTCondor e limiti di risorse."
breadcrumbs:
  - { label: "Home", url: "/it/" }
  - { label: "Assistenza Tecnica", url: "/it/technical-hub/" }
  - { label: "Guida a lxplus" }
---

# Guida a lxplus

<div class="alert">
<strong>💡 Consiglio</strong><br>
<p>lxplus e una risorsa condivisa. I processi di lunga durata o ad alto consumo di memoria devono essere inviati come job batch tramite HTCondor piuttosto che eseguiti in modo interattivo.</p>
</div>

lxplus e il **servizio di login interattivo** del CERN, che fornisce un ambiente Linux condiviso dove migliaia di utenti del CERN compilano codice, eseguono analisi, accedono ai dati e gestiscono il proprio lavoro. E il punto di accesso principale all'infrastruttura di calcolo del CERN e viene utilizzato quotidianamente da fisici, ingegneri e personale tecnico di tutta l'organizzazione. Se devi connetterti a lxplus per la prima volta, consulta la [pagina di configurazione Kerberos e SSH](/it/technical/kerberos-ssh/) per le istruzioni di connessione.

## Cos'e lxplus

lxplus e un cluster di **nodi di login condivisi** che eseguono AlmaLinux (la distribuzione Linux standard del CERN). Quando ti connetti via SSH a `lxplus.cern.ch`, vieni assegnato a uno dei nodi disponibili in modalita round-robin. Ogni sessione ti da accesso a un ambiente Linux standard con strumenti di sviluppo comuni, compilatori, editor e accesso ai sistemi di storage del CERN (EOS e AFS). Le macchine sono potenti ma condivise tra molti utenti simultanei, quindi l'utilizzo delle risorse per sessione e soggetto a limiti.

Esistono diversi **flavour di lxplus** disponibili per esigenze specifiche. Il `lxplus.cern.ch` predefinito esegue la versione corrente del sistema operativo standard. Se hai bisogno di una versione specifica precedente o successiva per ragioni di compatibilita, varianti come `lxplus9.cern.ch` (AlmaLinux 9) sono disponibili. Consulta la documentazione IT del CERN per l'elenco attuale dei flavour disponibili.

## Risorse Disponibili

Ogni nodo lxplus offre tipicamente **piu core CPU e diversi gigabyte di RAM** per sessione utente. Tuttavia, poiche i nodi sono condivisi, esistono limiti flessibili sul tempo CPU e sul consumo di memoria per utente per garantire un utilizzo equo. Le sessioni interattive sono pensate per lo sviluppo, il debug, i test e le analisi brevi — non per l'esecuzione di carichi di lavoro di produzione che consumano molti core o gigabyte di memoria per ore.

Se il tuo compito richiede **risorse di calcolo significative** — ad esempio l'elaborazione di grandi dataset, l'esecuzione di simulazioni Monte Carlo o l'addestramento di modelli di machine learning — dovresti inviarlo come job batch piuttosto che eseguirlo in modo interattivo su lxplus. Il sistema batch distribuisce il tuo job su nodi di calcolo dedicati dove puo essere eseguito senza competere con altri utenti interattivi.

## Home Directory: AFS vs EOS

Quando accedi a lxplus, la tua home directory predefinita si trova su **AFS** (Andrew File System) al percorso `/afs/cern.ch/user/<iniziale>/<username>/`. AFS e stato il sistema di home directory tradizionale al CERN per decenni e viene ancora utilizzato per file di configurazione, script di login e file di piccole dimensioni. Tuttavia, AFS ha una **quota limitata** (tipicamente 10 GB) e viene gradualmente sostituito da EOS per la maggior parte dei casi d'uso.

La tua **home directory EOS** al percorso `/eos/user/<iniziale>/<username>/` fornisce una quota predefinita molto piu ampia (1 TB) ed e la posizione consigliata per file di analisi, grandi dataset e lavoro attivo. Sia AFS che EOS sono accessibili da qualsiasi nodo lxplus, quindi puoi spostare facilmente i file tra i due. Come pratica generale, mantieni la tua home AFS pulita e usa EOS per i tuoi file di lavoro principali.

## Ambienti Software

L'ambiente software del CERN su lxplus e gestito attraverso **CVMFS** (CernVM File System), un file system di sola lettura che distribuisce pacchetti software attraverso la rete. Tramite CVMFS, hai accesso a un vasto catalogo di software precompilato tra cui ROOT, Geant4, distribuzioni Python e framework specifici per esperimento. Le release LCG (stack software della Grid di Calcolo del LHC) forniscono collezioni curate di strumenti e librerie compatibili per l'analisi fisica.

Per configurare un ambiente software specifico, tipicamente si esegue uno script di setup. Ad esempio, `source /cvmfs/sft.cern.ch/lcg/views/LCG_105/x86_64-el9-gcc12-opt/setup.sh` configura un ambiente LCG 105 completo con ROOT, Python e molti strumenti di analisi. I setup specifici per esperimento (come Athena di ATLAS o CMSSW di CMS) hanno le proprie procedure di inizializzazione documentate da ciascuna collaborazione.

## Job Batch con HTCondor

Per i compiti ad alta intensita di calcolo, il CERN fornisce un **sistema di calcolo batch basato su HTCondor**. Da lxplus, puoi inviare job che vengono eseguiti su un grande pool di nodi worker dedicati senza impattare gli utenti interattivi. Un invio base di HTCondor comporta la scrittura di un breve **file di submission** che specifica il tuo eseguibile, i file di input, i requisiti di risorse (CPU, memoria, disco) e le posizioni di output.

Un file di submission minimo potrebbe apparire cosi: definire l'eseguibile (il tuo script), specificare i percorsi dei file di output, errore e log, richiedere il numero desiderato di CPU e memoria, e chiamare `condor_submit` per accodare il job. Puoi quindi monitorarne il progresso con `condor_q` e controllare i dettagli dei job completati con `condor_history`. Per flussi di lavoro su larga scala che coinvolgono centinaia o migliaia di job, strumenti come HTCondor DAGMan del CERN e i workflow manager semplificano il processo.

## Limiti di Risorse e Fair-Share

Le risorse di calcolo del CERN operano con un modello di **schedulazione fair-share**. Ogni utente ed esperimento ha una quota delle risorse totali, e il sistema batch prioritizza i job in base all'utilizzo recente — se hai utilizzato una grande quantita di recente, i tuoi nuovi job potrebbero avere priorita inferiore fino a quando la tua quota non si riequilibra. Questo assicura che nessun singolo utente o gruppo monopolizzi il sistema.

Su lxplus stesso, vengono applicati limiti di risorse interattive per proteggere l'ambiente condiviso. I processi che consumano CPU o memoria eccessivi possono essere terminati automaticamente. Se hai bisogno di risorse dedicate per un progetto o periodo di tempo specifico, l'IT del CERN offre **macchine virtuali** e **istanze OpenStack** che forniscono capacita di calcolo dedicata sotto il tuo controllo — contatta il dipartimento IT tramite ServiceNow per discutere le opzioni.

## Fonti

- <a href="https://information-technology.web.cern.ch/services/lxplus-service" target="_blank" rel="noopener noreferrer">CERN IT — Servizio lxplus</a>
- <a href="https://batchdocs.web.cern.ch/" target="_blank" rel="noopener noreferrer">Documentazione del Servizio Batch del CERN</a>
- <a href="https://cvmfs.readthedocs.io/" target="_blank" rel="noopener noreferrer">Documentazione CVMFS</a>
