---
title: "Démarrage rapide ROOT - CERN Starter Pack"
description: "Guide de démarrage rapide pour le framework d’analyse de données ROOT au CERN, couvrant l’installation, SWAN, PyROOT et les tâches courantes de la première semaine."
og:
  title: "Démarrage rapide ROOT - CERN Starter Pack"
  description: "Démarrez avec le framework C++/Python ROOT pour l’analyse en physique des hautes énergies au CERN."
breadcrumbs:
  - { label: "Accueil", url: "/fr/" }
  - { label: "Aide Technique", url: "/fr/technical-hub/" }
  - { label: "Démarrage rapide ROOT" }
---

<h1>Guide de démarrage rapide ROOT</h1>
      <h2>Qu’est-ce que ROOT ?</h2>
      <p>ROOT est un framework open-source en C++ et Python développé au CERN pour le traitement de données, l’analyse statistique, la visualisation et le stockage en physique des hautes énergies (HEP). C’est l’outil standard pour analyser les données de physique des particules et il est utilisé par pratiquement toutes les expériences au CERN.</p>
      <p>ROOT fournit des structures de données spécialisées (comme TTree pour les données en colonnes), l’histogrammation, l’ajustement de courbes et un puissant système d’entrées/sorties basé sur le format de fichier <code>.root</code>. Il inclut également CLING, un interpréteur C++ interactif, et PyROOT, une interface Python vers toutes les classes ROOT.</p>

      <h2>Option sans installation : SWAN</h2>
      <p>Si vous souhaitez commencer à utiliser ROOT immédiatement sans rien installer, le CERN fournit <strong>SWAN</strong> (Service for Web-based ANalysis) sur <a href="https://swan.cern.ch" target="_blank" rel="noopener noreferrer">swan.cern.ch</a>. SWAN est un service basé sur JupyterHub qui vous offre un environnement de notebooks avec ROOT, PyROOT et de nombreux autres packages scientifiques Python préinstallés.</p>
      <p>Connectez-vous simplement avec vos identifiants CERN, choisissez une pile logicielle et commencez à coder. SWAN se connecte à votre stockage EOS, vous pouvez donc accéder directement à vos fichiers de données. C’est le moyen le plus rapide de démarrer avec ROOT au CERN.</p>

      <h2>Méthodes d’installation</h2>

      <h3>Conda (Recommandé pour les machines personnelles)</h3>
      <p>Le moyen le plus simple d’installer ROOT sur votre machine personnelle est via conda-forge :</p>
      <pre><code>conda create -n root-env
conda activate root-env
conda install -c conda-forge root</code></pre>

      <h3>Snap (Linux)</h3>
      <p>Sur les distributions Linux prenant en charge les paquets Snap :</p>
      <pre><code>sudo snap install root-framework</code></pre>

      <h3>Homebrew (macOS)</h3>
      <p>Sur macOS avec Homebrew installé :</p>
      <pre><code>brew install root</code></pre>
      <h3>Binaires précompilés</h3>
      <p>Téléchargez les binaires précompilés pour votre plateforme depuis le site officiel ROOT sur <a href="https://root.cern/install/" target="_blank" rel="noopener noreferrer">root.cern/install</a>. Extrayez l’archive et sourcez le script de configuration :</p>
      <pre><code>tar -xzf root_v6.XX.YY.Linux-ubuntu22-x86_64-gcc11.4.tar.gz
source root/bin/thisroot.sh</code></pre>

      <h3>Sur lxplus (CVMFS)</h3>
      <p>Sur les machines lxplus du CERN, ROOT est disponible via CVMFS sans aucune installation. Configurez simplement l’environnement logiciel LCG :</p>
      <pre><code># Lister les versions LCG disponibles
ls /cvmfs/sft.cern.ch/lcg/views/

# Configurer une version LCG spécifique (exemple)
source /cvmfs/sft.cern.ch/lcg/views/LCG_105/x86_64-el9-gcc13-opt/setup.sh

# Vérifier que ROOT est disponible
root --version</code></pre>

      <h2>Premiers pas avec ROOT</h2>

      <h3>C++ interactif (CLING)</h3>
      <p>Lancez l’interpréteur C++ interactif de ROOT en tapant <code>root</code> dans votre terminal :</p>
      <pre><code>$ root
root [0] TH1F *h = new TH1F("h", "Mon Histogramme", 100, -5, 5);
root [1] h->FillRandom("gaus", 10000);
root [2] h->Draw();
root [3] .q</code></pre>

      <h3>PyROOT</h3>
      <p>Utilisez ROOT depuis Python avec les liaisons PyROOT :</p>
      <pre><code>import ROOT

# Créer et remplir un histogramme
h = ROOT.TH1F("h", "Distribution Gaussienne;x;Entrées", 100, -5, 5)
h.FillRandom("gaus", 10000)

# Dessiner sur un canvas
c = ROOT.TCanvas("c", "Mon Canvas", 800, 600)
h.Draw()
c.SaveAs("histogram.png")</code></pre>

      <h3>Lire des fichiers .root</h3>
      <p>Ouvrir et explorer un fichier ROOT existant :</p>
      <pre><code>import ROOT

f = ROOT.TFile.Open("data.root")
f.ls()           # Lister le contenu
tree = f.Get("Events")  # Obtenir un TTree
tree.Print()     # Afficher les branches
tree.Draw("pt")  # Tracé rapide d’une branche</code></pre>

      <h3>Intégration NumPy / pandas</h3>
      <p>Convertir des données ROOT en tableaux NumPy ou DataFrames pandas pour les utiliser avec l’écosystème Python plus large :</p>
      <pre><code>import ROOT
import numpy as np

# Utilisation de RDataFrame (approche ROOT moderne)
df = ROOT.RDataFrame("Events", "data.root")
npy = df.AsNumpy(["pt", "eta"])  # Retourne un dict de tableaux NumPy

# Convertir en DataFrame pandas
import pandas as pd
pdf = pd.DataFrame(npy)</code></pre>
      <h2>Ressources essentielles</h2>
      <ul>
        <li><a href="https://root.cern/doc/master/" target="_blank" rel="noopener noreferrer">Documentation de référence ROOT</a></li>
        <li><a href="https://root.cern/doc/master/group__tutorial__hist.html" target="_blank" rel="noopener noreferrer">Tutoriels ROOT (avec code source)</a></li>
        <li><a href="https://root.cern/doc/master/classROOT_1_1RDataFrame.html" target="_blank" rel="noopener noreferrer">Documentation RDataFrame</a></li>
        <li><a href="https://swan.cern.ch" target="_blank" rel="noopener noreferrer">SWAN - Service for Web-based ANalysis</a></li>
        <li><a href="https://root-forum.cern.ch" target="_blank" rel="noopener noreferrer">Forum utilisateurs ROOT</a></li>
        <li><a href="https://github.com/root-project/root" target="_blank" rel="noopener noreferrer">ROOT sur GitHub</a></li>
      </ul>

      <h2>Tâches courantes de la première semaine</h2>
      <ul>
        <li>Ouvrez une session SWAN et exécutez un notebook tutoriel ROOT pour vous familiariser avec l’environnement.</li>
        <li>Configurez ROOT sur lxplus en utilisant CVMFS et exécutez <code>root --version</code> pour confirmer que cela fonctionne.</li>
        <li>Demandez à votre superviseur ou à votre équipe un fichier <code>.root</code> d’exemple de votre expérience et entraînez-vous à l’ouvrir avec <code>TFile</code> et à parcourir son contenu.</li>
        <li>Essayez de créer un histogramme à partir d’une branche TTree en utilisant à la fois l’interpréteur C++ et PyROOT.</li>
        <li>Explorez RDataFrame, l’interface d’analyse moderne de ROOT, pour filtrer, définir de nouvelles colonnes et créer des graphiques.</li>
        <li>Installez ROOT sur votre ordinateur portable personnel (via Conda ou Homebrew) pour pouvoir développer hors ligne.</li>
        <li>Ajoutez le forum ROOT et la documentation de référence à vos favoris pour quand vous aurez besoin d’aide.</li>
      </ul>
