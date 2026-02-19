---
title: "Guida: VS Code Remote (WSL su Windows) verso CERN lxplus"
description: "Guida all'uso di VS Code Remote tramite WSL su Windows per connettersi a CERN lxplus e altri server Linux."
og:
  title: "VS Code Remote verso CERN lxplus - CERN Starter Pack"
  description: "Guida passo-passo per connettere VS Code a CERN lxplus utilizzando WSL e SSH su Windows."
---

# Uso di VS Code Remote tramite WSL su Windows per Connettersi a CERN lxplus (e altri Server Linux)

## 1. Installazione e configurazione di WSL e SSH su Windows

Su Windows 10/11 è possibile abilitare il Windows Subsystem for Linux (WSL) eseguendo il comando `wsl --install` in un PowerShell con privilegi elevati:contentReference[oaicite:0]{index=0}. Questo installerà la distribuzione Linux predefinita (solitamente Ubuntu) e la configurerà. Una volta installato WSL e riavviato il sistema, aprire la shell Linux (Ubuntu). Un client SSH dovrebbe essere disponibile (Ubuntu include tipicamente `openssh-client` di default). Se non è presente, installarlo con `sudo apt update && sudo apt install openssh-client`. (Anche Windows offre un client OpenSSH, ma utilizzare SSH di WSL garantisce l'uso della stessa configurazione e degli stessi file di chiave in stile Linux degli altri strumenti Linux:contentReference[oaicite:1]{index=1}.)

**Suggerimento opzionale:** Si raccomanda di utilizzare WSL 2 (che dispone di un kernel Linux completo) per una migliore compatibilità. È possibile verificare la versione di WSL con `wsl -l -v` e aggiornarla se necessario:contentReference[oaicite:2]{index=2}.
