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

<h1>Guida a lxplus</h1>
<div class="alert">
<strong>💡 Consiglio</strong><br>
<p>lxplus e una risorsa condivisa. I processi di lunga durata o ad alto consumo di memoria devono essere inviati come job batch tramite HTCondor piuttosto che eseguiti in modo interattivo.</p>
</div>
<p>lxplus e il <strong>servizio di login interattivo</strong> del CERN, che fornisce un ambiente Linux condiviso dove migliaia di utenti del CERN compilano codice, eseguono analisi, accedono ai dati e gestiscono il proprio lavoro. E il punto di accesso principale all'infrastruttura di calcolo del CERN e viene utilizzato quotidianamente da fisici, ingegneri e personale tecnico di tutta l'organizzazione. Se devi connetterti a lxplus per la prima volta, consulta la <a href="/it/technical/kerberos-ssh/">pagina di configurazione Kerberos e SSH</a> per le istruzioni di connessione.</p>
<h2>Cos'e lxplus</h2>
<p>lxplus e un cluster di <strong>nodi di login condivisi</strong> che eseguono AlmaLinux (la distribuzione Linux standard del CERN). Quando ti connetti via SSH a <code>lxplus.cern.ch</code>, vieni assegnato a uno dei nodi disponibili in modalita round-robin. Ogni sessione ti da accesso a un ambiente Linux standard con strumenti di sviluppo comuni, compilatori, editor e accesso ai sistemi di storage del CERN (EOS e AFS). Le macchine sono potenti ma condivise tra molti utenti simultanei, quindi l'utilizzo delle risorse per sessione e soggetto a limiti.</p>
<p>Esistono diversi <strong>flavour di lxplus</strong> disponibili per esigenze specifiche. Il <code>lxplus.cern.ch</code> predefinito esegue la versione corrente del sistema operativo standard. Se hai bisogno di una versione specifica precedente o successiva per ragioni di compatibilita, varianti come <code>lxplus9.cern.ch</code> (AlmaLinux 9) sono disponibili. Consulta la documentazione IT del CERN per l'elenco attuale dei flavour disponibili.</p>
<h2>Risorse Disponibili</h2>
<p>Ogni nodo lxplus offre tipicamente <strong>piu core CPU e diversi gigabyte di RAM</strong> per sessione utente. Tuttavia, poiche i nodi sono condivisi, esistono limiti flessibili sul tempo CPU e sul consumo di memoria per utente per garantire un utilizzo equo. Le sessioni interattive sono pensate per lo sviluppo, il debug, i test e le analisi brevi — non per l'esecuzione di carichi di lavoro di produzione che consumano molti core o gigabyte di memoria per ore.</p>
<p>Se il tuo compito richiede <strong>risorse di calcolo significative</strong> — ad esempio l'elaborazione di grandi dataset, l'esecuzione di simulazioni Monte Carlo o l'addestramento di modelli di machine learning — dovresti inviarlo come job batch piuttosto che eseguirlo in modo interattivo su lxplus. Il sistema batch distribuisce il tuo job su nodi di calcolo dedicati dove puo essere eseguito senza competere con altri utenti interattivi.</p>
<h2>Home Directory: AFS vs EOS</h2>
<p>Quando accedi a lxplus, la tua home directory predefinita si trova su <strong>AFS</strong> (Andrew File System) al percorso <code>/afs/cern.ch/user/&lt;iniziale&gt;/&lt;username&gt;/</code>. AFS e stato il sistema di home directory tradizionale al CERN per decenni e viene ancora utilizzato per file di configurazione, script di login e file di piccole dimensioni. Tuttavia, AFS ha una <strong>quota limitata</strong> (tipicamente 10 GB) e viene gradualmente sostituito da EOS per la maggior parte dei casi d'uso.</p>
<p>La tua <strong>home directory EOS</strong> al percorso <code>/eos/user/&lt;iniziale&gt;/&lt;username&gt;/</code> fornisce una quota predefinita molto piu ampia (1 TB) ed e la posizione consigliata per file di analisi, grandi dataset e lavoro attivo. Sia AFS che EOS sono accessibili da qualsiasi nodo lxplus, quindi puoi spostare facilmente i file tra i due. Come pratica generale, mantieni la tua home AFS pulita e usa EOS per i tuoi file di lavoro principali.</p>
<h2>Ambienti Software</h2>
<p>L'ambiente software del CERN su lxplus e gestito attraverso <strong>CVMFS</strong> (CernVM File System), un file system di sola lettura che distribuisce pacchetti software attraverso la rete. Tramite CVMFS, hai accesso a un vasto catalogo di software precompilato tra cui ROOT, Geant4, distribuzioni Python e framework specifici per esperimento. Le release LCG (stack software della Grid di Calcolo del LHC) forniscono collezioni curate di strumenti e librerie compatibili per l'analisi fisica.</p>
<p>Per configurare un ambiente software specifico, tipicamente si esegue uno script di setup. Ad esempio, <code>source /cvmfs/sft.cern.ch/lcg/views/LCG_105/x86_64-el9-gcc12-opt/setup.sh</code> configura un ambiente LCG 105 completo con ROOT, Python e molti strumenti di analisi. I setup specifici per esperimento (come Athena di ATLAS o CMSSW di CMS) hanno le proprie procedure di inizializzazione documentate da ciascuna collaborazione.</p>
<h2>Job Batch con HTCondor</h2>
<p>Per i compiti ad alta intensita di calcolo, il CERN fornisce un <strong>sistema di calcolo batch basato su HTCondor</strong>. Da lxplus, puoi inviare job che vengono eseguiti su un grande pool di nodi worker dedicati senza impattare gli utenti interattivi. Un invio base di HTCondor comporta la scrittura di un breve <strong>file di submission</strong> che specifica il tuo eseguibile, i file di input, i requisiti di risorse (CPU, memoria, disco) e le posizioni di output.</p>
<p>Un file di submission minimo potrebbe apparire cosi: definire l'eseguibile (il tuo script), specificare i percorsi dei file di output, errore e log, richiedere il numero desiderato di CPU e memoria, e chiamare <code>condor_submit</code> per accodare il job. Puoi quindi monitorarne il progresso con <code>condor_q</code> e controllare i dettagli dei job completati con <code>condor_history</code>. Per flussi di lavoro su larga scala che coinvolgono centinaia o migliaia di job, strumenti come HTCondor DAGMan del CERN e i workflow manager semplificano il processo.</p>
<h2>Limiti di Risorse e Fair-Share</h2>
<p>Le risorse di calcolo del CERN operano con un modello di <strong>schedulazione fair-share</strong>. Ogni utente ed esperimento ha una quota delle risorse totali, e il sistema batch prioritizza i job in base all'utilizzo recente — se hai utilizzato una grande quantita di recente, i tuoi nuovi job potrebbero avere priorita inferiore fino a quando la tua quota non si riequilibra. Questo assicura che nessun singolo utente o gruppo monopolizzi il sistema.</p>
<p>Su lxplus stesso, vengono applicati limiti di risorse interattive per proteggere l'ambiente condiviso. I processi che consumano CPU o memoria eccessivi possono essere terminati automaticamente. Se hai bisogno di risorse dedicate per un progetto o periodo di tempo specifico, l'IT del CERN offre <strong>macchine virtuali</strong> e <strong>istanze OpenStack</strong> che forniscono capacita di calcolo dedicata sotto il tuo controllo — contatta il dipartimento IT tramite ServiceNow per discutere le opzioni.</p>
<h2>Fonti</h2>
<ul>
<li><a href="https://information-technology.web.cern.ch/services/lxplus-service" target="_blank" rel="noopener noreferrer">CERN IT — Servizio lxplus</a></li>
<li><a href="https://batchdocs.web.cern.ch/" target="_blank" rel="noopener noreferrer">Documentazione del Servizio Batch del CERN</a></li>
<li><a href="https://cvmfs.readthedocs.io/" target="_blank" rel="noopener noreferrer">Documentazione CVMFS</a></li>
</ul>
