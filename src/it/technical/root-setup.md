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

<h1>Guida Rapida al Framework ROOT</h1>
      <h2>Cos'è ROOT?</h2>
      <p>ROOT è un framework open-source in C++ e Python sviluppato al CERN per l'elaborazione dei dati, l'analisi statistica, la visualizzazione e l'archiviazione nella fisica delle alte energie (HEP). È lo strumento standard per l'analisi dei dati di fisica delle particelle ed è utilizzato praticamente da ogni esperimento al CERN.</p>
      <p>ROOT fornisce strutture dati specializzate (come TTree per dati colonnari), creazione di istogrammi, fitting di curve e un potente sistema di I/O basato sul formato file <code>.root</code>. Include inoltre CLING, un interprete C++ interattivo, e PyROOT, un'interfaccia Python per tutte le classi ROOT.</p>

      <h2>Opzione senza installazione: SWAN</h2>
      <p>Per iniziare a usare ROOT immediatamente senza installare nulla, il CERN mette a disposizione <strong>SWAN</strong> (Service for Web-based ANalysis) all'indirizzo <a href="https://swan.cern.ch" target="_blank" rel="noopener noreferrer">swan.cern.ch</a>. SWAN è un servizio basato su JupyterHub che offre un ambiente notebook con ROOT, PyROOT e molti altri pacchetti scientifici Python preinstallati.</p>
      <p>Basta accedere con le proprie credenziali CERN, scegliere uno stack software e iniziare a programmare. SWAN si collega al proprio spazio di archiviazione EOS, permettendo di accedere direttamente ai propri file di dati. Questo è il modo più rapido per iniziare con ROOT al CERN.</p>

      <h2>Metodi di installazione</h2>

      <h3>Conda (Consigliato per macchine personali)</h3>
      <p>Il modo più semplice per installare ROOT sulla propria macchina personale è tramite conda-forge:</p>
      <pre><code>conda create -n root-env
conda activate root-env
conda install -c conda-forge root</code></pre>

      <h3>Snap (Linux)</h3>
      <p>Sulle distribuzioni Linux che supportano i pacchetti Snap:</p>
      <pre><code>sudo snap install root-framework</code></pre>

      <h3>Homebrew (macOS)</h3>
      <p>Su macOS con Homebrew installato:</p>
      <pre><code>brew install root</code></pre>

      <h3>Binari precompilati</h3>
      <p>Scaricare i binari precompilati per la propria piattaforma dal sito ufficiale di ROOT all'indirizzo <a href="https://root.cern/install/" target="_blank" rel="noopener noreferrer">root.cern/install</a>. Estrarre l'archivio e caricare lo script di configurazione:</p>
      <pre><code>tar -xzf root_v6.XX.YY.Linux-ubuntu22-x86_64-gcc11.4.tar.gz
source root/bin/thisroot.sh</code></pre>

      <h3>Su lxplus (CVMFS)</h3>
      <p>Sulle macchine lxplus del CERN, ROOT è disponibile tramite CVMFS senza alcuna installazione. È sufficiente configurare l'ambiente software LCG:</p>
      <pre><code># Elencare le release LCG disponibili
ls /cvmfs/sft.cern.ch/lcg/views/

# Configurare una release LCG specifica (esempio)
source /cvmfs/sft.cern.ch/lcg/views/LCG_105/x86_64-el9-gcc13-opt/setup.sh

# Verificare che ROOT sia disponibile
root --version</code></pre>

      <h2>Primi passi con ROOT</h2>

      <h3>C++ interattivo (CLING)</h3>
      <p>Avviare l'interprete C++ interattivo di ROOT digitando <code>root</code> nel terminale:</p>
      <pre><code>$ root
root [0] TH1F *h = new TH1F("h", "My Histogram", 100, -5, 5);
root [1] h-&gt;FillRandom("gaus", 10000);
root [2] h-&gt;Draw();
root [3] .q</code></pre>

      <h3>PyROOT</h3>
      <p>Utilizzare ROOT da Python con i binding PyROOT:</p>
      <pre><code>import ROOT

# Creare e riempire un istogramma
h = ROOT.TH1F("h", "Gaussian Distribution;x;Entries", 100, -5, 5)
h.FillRandom("gaus", 10000)

# Disegnare su un canvas
c = ROOT.TCanvas("c", "My Canvas", 800, 600)
h.Draw()
c.SaveAs("histogram.png")</code></pre>

      <h3>Lettura di file .root</h3>
      <p>Aprire ed esplorare un file ROOT esistente:</p>
      <pre><code>import ROOT

f = ROOT.TFile.Open("data.root")
f.ls()           # Elencare il contenuto
tree = f.Get("Events")  # Ottenere un TTree
tree.Print()     # Mostrare i branch
tree.Draw("pt")  # Grafico rapido di un branch</code></pre>

      <h3>Integrazione NumPy / pandas</h3>
      <p>Convertire dati ROOT in array NumPy o DataFrame pandas per l'uso con il più ampio ecosistema Python:</p>
      <pre><code>import ROOT
import numpy as np

# Utilizzo di RDataFrame (approccio ROOT moderno)
df = ROOT.RDataFrame("Events", "data.root")
npy = df.AsNumpy(["pt", "eta"])  # Restituisce un dict di array NumPy

# Conversione in DataFrame pandas
import pandas as pd
pdf = pd.DataFrame(npy)</code></pre>

      <h2>Risorse essenziali</h2>
      <ul>
        <li><a href="https://root.cern/doc/master/" target="_blank" rel="noopener noreferrer">Documentazione di Riferimento ROOT</a></li>
        <li><a href="https://root.cern/doc/master/group__tutorial__hist.html" target="_blank" rel="noopener noreferrer">Tutorial ROOT (con codice sorgente)</a></li>
        <li><a href="https://root.cern/doc/master/classROOT_1_1RDataFrame.html" target="_blank" rel="noopener noreferrer">Documentazione RDataFrame</a></li>
        <li><a href="https://swan.cern.ch" target="_blank" rel="noopener noreferrer">SWAN - Service for Web-based ANalysis</a></li>
        <li><a href="https://root-forum.cern.ch" target="_blank" rel="noopener noreferrer">Forum Utenti ROOT</a></li>
        <li><a href="https://github.com/root-project/root" target="_blank" rel="noopener noreferrer">ROOT su GitHub</a></li>
      </ul>

      <h2>Attività comuni della prima settimana</h2>
      <ul>
        <li>Aprire una sessione SWAN ed eseguire un notebook tutorial di ROOT per familiarizzare con l'ambiente.</li>
        <li>Configurare ROOT su lxplus tramite CVMFS ed eseguire <code>root --version</code> per confermare il funzionamento.</li>
        <li>Chiedere al proprio supervisore o al team un file <code>.root</code> di esempio dal proprio esperimento e fare pratica aprendolo con <code>TFile</code> ed esplorandone il contenuto.</li>
        <li>Provare a creare un istogramma da un branch di un TTree utilizzando sia l'interprete C++ che PyROOT.</li>
        <li>Esplorare RDataFrame, l'interfaccia di analisi moderna di ROOT, per filtrare, definire nuove colonne e creare grafici.</li>
        <li>Installare ROOT sul proprio portatile personale (tramite Conda o Homebrew) per poter sviluppare offline.</li>
        <li>Aggiungere ai segnalibri il forum ROOT e la documentazione di riferimento per quando si ha bisogno di aiuto.</li>
      </ul>
