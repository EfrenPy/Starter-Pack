---
title: "Guida: VS Code Remote (WSL su Windows) verso CERN lxplus"
description: "Guida all'uso di VS Code Remote tramite WSL su Windows per connettersi a CERN lxplus e altri server Linux."
og:
  title: "VS Code Remote verso CERN lxplus - CERN Starter Pack"
  description: "Guida passo-passo per connettere VS Code a CERN lxplus utilizzando WSL e SSH su Windows."
---

<h1>Uso di VS Code Remote tramite WSL su Windows per Connettersi a CERN lxplus (e altri Server Linux)</h1>
      <h2>1. Installazione e configurazione di WSL e SSH su Windows</h2>
      <p>Su Windows 10/11 è possibile abilitare il Windows Subsystem for Linux (WSL) eseguendo il comando <code>wsl --install</code> in un PowerShell con privilegi elevati:contentReference[oaicite:0]{index=0}. Questo installerà la distribuzione Linux predefinita (solitamente Ubuntu) e la configurerà. Una volta installato WSL e riavviato il sistema, aprire la shell Linux (Ubuntu). Un client SSH dovrebbe essere disponibile (Ubuntu include tipicamente <code>openssh-client</code> di default). Se non è presente, installarlo con <code>sudo apt update &amp;&amp; sudo apt install openssh-client</code>. (Anche Windows offre un client OpenSSH, ma utilizzare SSH di WSL garantisce l'uso della stessa configurazione e degli stessi file di chiave in stile Linux degli altri strumenti Linux:contentReference[oaicite:1]{index=1}.)</p>
      <p><strong>Suggerimento opzionale:</strong> Si raccomanda di utilizzare WSL 2 (che dispone di un kernel Linux completo) per una migliore compatibilità. È possibile verificare la versione di WSL con <code>wsl -l -v</code> e aggiornarla se necessario:contentReference[oaicite:2]{index=2}.</p>
