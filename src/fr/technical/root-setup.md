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

# Guide de démarrage rapide ROOT

## Qu’est-ce que ROOT ?

ROOT est un framework open-source en C++ et Python développé au CERN pour le traitement de données, l’analyse statistique, la visualisation et le stockage en physique des hautes énergies (HEP). C’est l’outil standard pour analyser les données de physique des particules et il est utilisé par pratiquement toutes les expériences au CERN.

ROOT fournit des structures de données spécialisées (comme TTree pour les données en colonnes), l’histogrammation, l’ajustement de courbes et un puissant système d’entrées/sorties basé sur le format de fichier `.root`. Il inclut également CLING, un interpréteur C++ interactif, et PyROOT, une interface Python vers toutes les classes ROOT.

## Option sans installation : SWAN

Si vous souhaitez commencer à utiliser ROOT immédiatement sans rien installer, le CERN fournit **SWAN** (Service for Web-based ANalysis) sur <a href="https://swan.cern.ch" target="_blank" rel="noopener noreferrer">swan.cern.ch</a>. SWAN est un service basé sur JupyterHub qui vous offre un environnement de notebooks avec ROOT, PyROOT et de nombreux autres packages scientifiques Python préinstallés.

Connectez-vous simplement avec vos identifiants CERN, choisissez une pile logicielle et commencez à coder. SWAN se connecte à votre stockage EOS, vous pouvez donc accéder directement à vos fichiers de données. C’est le moyen le plus rapide de démarrer avec ROOT au CERN.

## Méthodes d’installation

### Conda (Recommandé pour les machines personnelles)

Le moyen le plus simple d’installer ROOT sur votre machine personnelle est via conda-forge :

```
conda create -n root-env
conda activate root-env
conda install -c conda-forge root
```

### Snap (Linux)

Sur les distributions Linux prenant en charge les paquets Snap :

```
sudo snap install root-framework
```

### Homebrew (macOS)

Sur macOS avec Homebrew installé :

```
brew install root
```

### Binaires précompilés

Téléchargez les binaires précompilés pour votre plateforme depuis le site officiel ROOT sur <a href="https://root.cern/install/" target="_blank" rel="noopener noreferrer">root.cern/install</a>. Extrayez l’archive et sourcez le script de configuration :

```
tar -xzf root_v6.XX.YY.Linux-ubuntu22-x86_64-gcc11.4.tar.gz
source root/bin/thisroot.sh
```

### Sur lxplus (CVMFS)

Sur les machines lxplus du CERN, ROOT est disponible via CVMFS sans aucune installation. Configurez simplement l’environnement logiciel LCG :

```
# Lister les versions LCG disponibles
ls /cvmfs/sft.cern.ch/lcg/views/

# Configurer une version LCG spécifique (exemple)
source /cvmfs/sft.cern.ch/lcg/views/LCG_105/x86_64-el9-gcc13-opt/setup.sh

# Vérifier que ROOT est disponible
root --version
```

## Premiers pas avec ROOT

### C++ interactif (CLING)

Lancez l’interpréteur C++ interactif de ROOT en tapant `root` dans votre terminal :

```
$ root
root [0] TH1F *h = new TH1F("h", "Mon Histogramme", 100, -5, 5);
root [1] h->FillRandom("gaus", 10000);
root [2] h->Draw();
root [3] .q
```

### PyROOT

Utilisez ROOT depuis Python avec les liaisons PyROOT :

```
import ROOT

# Créer et remplir un histogramme
h = ROOT.TH1F("h", "Distribution Gaussienne;x;Entrées", 100, -5, 5)
h.FillRandom("gaus", 10000)

# Dessiner sur un canvas
c = ROOT.TCanvas("c", "Mon Canvas", 800, 600)
h.Draw()
c.SaveAs("histogram.png")
```

### Lire des fichiers .root

Ouvrir et explorer un fichier ROOT existant :

```
import ROOT

f = ROOT.TFile.Open("data.root")
f.ls()           # Lister le contenu
tree = f.Get("Events")  # Obtenir un TTree
tree.Print()     # Afficher les branches
tree.Draw("pt")  # Tracé rapide d’une branche
```

### Intégration NumPy / pandas

Convertir des données ROOT en tableaux NumPy ou DataFrames pandas pour les utiliser avec l’écosystème Python plus large :

```
import ROOT
import numpy as np

# Utilisation de RDataFrame (approche ROOT moderne)
df = ROOT.RDataFrame("Events", "data.root")
npy = df.AsNumpy(["pt", "eta"])  # Retourne un dict de tableaux NumPy

# Convertir en DataFrame pandas
import pandas as pd
pdf = pd.DataFrame(npy)
```

## Ressources essentielles

- <a href="https://root.cern/doc/master/" target="_blank" rel="noopener noreferrer">Documentation de référence ROOT</a>
- <a href="https://root.cern/doc/master/group__tutorial__hist.html" target="_blank" rel="noopener noreferrer">Tutoriels ROOT (avec code source)</a>
- <a href="https://root.cern/doc/master/classROOT_1_1RDataFrame.html" target="_blank" rel="noopener noreferrer">Documentation RDataFrame</a>
- <a href="https://swan.cern.ch" target="_blank" rel="noopener noreferrer">SWAN - Service for Web-based ANalysis</a>
- <a href="https://root-forum.cern.ch" target="_blank" rel="noopener noreferrer">Forum utilisateurs ROOT</a>
- <a href="https://github.com/root-project/root" target="_blank" rel="noopener noreferrer">ROOT sur GitHub</a>

## Tâches courantes de la première semaine

- Ouvrez une session SWAN et exécutez un notebook tutoriel ROOT pour vous familiariser avec l’environnement.
- Configurez ROOT sur lxplus en utilisant CVMFS et exécutez `root --version` pour confirmer que cela fonctionne.
- Demandez à votre superviseur ou à votre équipe un fichier `.root` d’exemple de votre expérience et entraînez-vous à l’ouvrir avec `TFile` et à parcourir son contenu.
- Essayez de créer un histogramme à partir d’une branche TTree en utilisant à la fois l’interpréteur C++ et PyROOT.
- Explorez RDataFrame, l’interface d’analyse moderne de ROOT, pour filtrer, définir de nouvelles colonnes et créer des graphiques.
- Installez ROOT sur votre ordinateur portable personnel (via Conda ou Homebrew) pour pouvoir développer hors ligne.
- Ajoutez le forum ROOT et la documentation de référence à vos favoris pour quand vous aurez besoin d’aide.
