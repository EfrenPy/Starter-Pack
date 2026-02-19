---
title: "Guida Rapida al Framework ROOT - CERN Starter Pack"
description: "Guida rapida al framework di analisi dati ROOT al CERN: installazione, SWAN, PyROOT e attività comuni della prima settimana."
og:
  title: "Guida Rapida al Framework ROOT - CERN Starter Pack"
  description: "Iniziare con il framework C++/Python ROOT per l'analisi in fisica delle alte energie al CERN."
breadcrumbs:
  - { label: "Home", url: "/it/" }
  - { label: "Aiuto Tecnico", url: "/it/technical-hub/" }
  - { label: "Guida Rapida ROOT" }
---

# Guida Rapida al Framework ROOT

## Cos'è ROOT?

ROOT è un framework open-source in C++ e Python sviluppato al CERN per l'elaborazione dei dati, l'analisi statistica, la visualizzazione e l'archiviazione nella fisica delle alte energie (HEP). È lo strumento standard per l'analisi dei dati di fisica delle particelle ed è utilizzato praticamente da ogni esperimento al CERN.

ROOT fornisce strutture dati specializzate (come TTree per dati colonnari), creazione di istogrammi, fitting di curve e un potente sistema di I/O basato sul formato file `.root`. Include inoltre CLING, un interprete C++ interattivo, e PyROOT, un'interfaccia Python per tutte le classi ROOT.

## Opzione senza installazione: SWAN

Per iniziare a usare ROOT immediatamente senza installare nulla, il CERN mette a disposizione **SWAN** (Service for Web-based ANalysis) all'indirizzo <a href="https://swan.cern.ch" target="_blank" rel="noopener noreferrer">swan.cern.ch</a>. SWAN è un servizio basato su JupyterHub che offre un ambiente notebook con ROOT, PyROOT e molti altri pacchetti scientifici Python preinstallati.

Basta accedere con le proprie credenziali CERN, scegliere uno stack software e iniziare a programmare. SWAN si collega al proprio spazio di archiviazione EOS, permettendo di accedere direttamente ai propri file di dati. Questo è il modo più rapido per iniziare con ROOT al CERN.

## Metodi di installazione

### Conda (Consigliato per macchine personali)

Il modo più semplice per installare ROOT sulla propria macchina personale è tramite conda-forge:

```
conda create -n root-env
conda activate root-env
conda install -c conda-forge root
```

### Snap (Linux)

Sulle distribuzioni Linux che supportano i pacchetti Snap:

```
sudo snap install root-framework
```

### Homebrew (macOS)

Su macOS con Homebrew installato:

```
brew install root
```

### Binari precompilati

Scaricare i binari precompilati per la propria piattaforma dal sito ufficiale di ROOT all'indirizzo <a href="https://root.cern/install/" target="_blank" rel="noopener noreferrer">root.cern/install</a>. Estrarre l'archivio e caricare lo script di configurazione:

```
tar -xzf root_v6.XX.YY.Linux-ubuntu22-x86_64-gcc11.4.tar.gz
source root/bin/thisroot.sh
```

### Su lxplus (CVMFS)

Sulle macchine lxplus del CERN, ROOT è disponibile tramite CVMFS senza alcuna installazione. È sufficiente configurare l'ambiente software LCG:

```
# Elencare le release LCG disponibili
ls /cvmfs/sft.cern.ch/lcg/views/

# Configurare una release LCG specifica (esempio)
source /cvmfs/sft.cern.ch/lcg/views/LCG_105/x86_64-el9-gcc13-opt/setup.sh

# Verificare che ROOT sia disponibile
root --version
```

## Primi passi con ROOT

### C++ interattivo (CLING)

Avviare l'interprete C++ interattivo di ROOT digitando `root` nel terminale:

```
$ root
root [0] TH1F *h = new TH1F("h", "My Histogram", 100, -5, 5);
root [1] h->FillRandom("gaus", 10000);
root [2] h->Draw();
root [3] .q
```

### PyROOT

Utilizzare ROOT da Python con i binding PyROOT:

```
import ROOT

# Creare e riempire un istogramma
h = ROOT.TH1F("h", "Gaussian Distribution;x;Entries", 100, -5, 5)
h.FillRandom("gaus", 10000)

# Disegnare su un canvas
c = ROOT.TCanvas("c", "My Canvas", 800, 600)
h.Draw()
c.SaveAs("histogram.png")
```

### Lettura di file .root

Aprire ed esplorare un file ROOT esistente:

```
import ROOT

f = ROOT.TFile.Open("data.root")
f.ls()           # Elencare il contenuto
tree = f.Get("Events")  # Ottenere un TTree
tree.Print()     # Mostrare i branch
tree.Draw("pt")  # Grafico rapido di un branch
```

### Integrazione NumPy / pandas

Convertire dati ROOT in array NumPy o DataFrame pandas per l'uso con il più ampio ecosistema Python:

```
import ROOT
import numpy as np

# Utilizzo di RDataFrame (approccio ROOT moderno)
df = ROOT.RDataFrame("Events", "data.root")
npy = df.AsNumpy(["pt", "età"])  # Restituisce un dict di array NumPy

# Conversione in DataFrame pandas
import pandas as pd
pdf = pd.DataFrame(npy)
```

## Risorse essenziali

- <a href="https://root.cern/doc/master/" target="_blank" rel="noopener noreferrer">Documentazione di Riferimento ROOT</a>
- <a href="https://root.cern/doc/master/group__tutorial__hist.html" target="_blank" rel="noopener noreferrer">Tutorial ROOT (con codice sorgente)</a>
- <a href="https://root.cern/doc/master/classROOT_1_1RDataFrame.html" target="_blank" rel="noopener noreferrer">Documentazione RDataFrame</a>
- <a href="https://swan.cern.ch" target="_blank" rel="noopener noreferrer">SWAN - Service for Web-based ANalysis</a>
- <a href="https://root-forum.cern.ch" target="_blank" rel="noopener noreferrer">Forum Utenti ROOT</a>
- <a href="https://github.com/root-project/root" target="_blank" rel="noopener noreferrer">ROOT su GitHub</a>

## Attività comuni della prima settimana

- Aprire una sessione SWAN ed eseguire un notebook tutorial di ROOT per familiarizzare con l'ambiente.
- Configurare ROOT su lxplus tramite CVMFS ed eseguire `root --version` per confermare il funzionamento.
- Chiedere al proprio supervisore o al team un file `.root` di esempio dal proprio esperimento e fare pratica aprendolo con `TFile` ed esplorandone il contenuto.
- Provare a creare un istogramma da un branch di un TTree utilizzando sia l'interprete C++ che PyROOT.
- Esplorare RDataFrame, l'interfaccia di analisi moderna di ROOT, per filtrare, definire nuove colonne e creare grafici.
- Installare ROOT sul proprio portatile personale (tramite Conda o Homebrew) per poter sviluppare offline.
- Aggiungere ai segnalibri il forum ROOT e la documentazione di riferimento per quando si ha bisogno di aiuto.
