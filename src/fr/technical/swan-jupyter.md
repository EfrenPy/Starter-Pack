---
title: "SWAN Jupyter Notebooks - CERN Starter Pack"
description: "Guide du service SWAN du CERN pour l'analyse interactive de données avec les Jupyter notebooks, incluant la configuration, l'intégration ROOT, le stockage EOS et la collaboration."
og:
  title: "SWAN Jupyter Notebooks - CERN Starter Pack"
  description: "Commencez à utiliser SWAN, la plateforme cloud du CERN basée sur Jupyter notebooks pour l'analyse interactive de données."
breadcrumbs:
  - { label: "Accueil", url: "/fr/" }
  - { label: "Aide Technique", url: "/fr/technical-hub/" }
  - { label: "SWAN (Jupyter)" }
---

# SWAN : Jupyter Notebooks au CERN

<div class="alert">
<p><strong>Note :</strong> SWAN nécessite un compte informatique du CERN actif. Assurez-vous que votre compte est activé avant d'essayer d'accéder au service.</p>
</div>

## Qu'est-ce que SWAN ?

SWAN (Service for Web-based ANalysis) est la plateforme cloud du CERN pour l'analyse interactive de données à l'aide de Jupyter notebooks. Elle fournit un environnement basé sur le navigateur dans lequel vous pouvez écrire et exécuter du code Python, C++ ou ROOT sans rien installer sur votre machine locale.

SWAN est construit sur JupyterHub et s'intègre étroitement avec l'infrastructure du CERN, notamment le stockage EOS, les stacks logiciels CVMFS et les clusters Spark. Vous pouvez y accéder sur <a href="https://swan.cern.ch" target="_blank" rel="noopener noreferrer">swan.cern.ch</a> avec vos identifiants du CERN.

## Pour commencer

Pour commencer à travailler avec SWAN, ouvrez votre navigateur et rendez-vous sur <a href="https://swan.cern.ch" target="_blank" rel="noopener noreferrer">swan.cern.ch</a>, où vous vous connecterez avec vos identifiants Single Sign-On (SSO) du CERN. Une fois authentifié, la plateforme vous demandera de configurer votre session. Choisissez d'abord un **environnement logiciel** (appelé release LCG) qui inclut les bibliothèques et outils dont vous avez besoin. Si vous ne savez pas lequel choisir, la sélection par défaut couvre la plupart des cas et constitue un bon point de départ.

Sélectionnez ensuite une **allocation de ressources**, qui détermine le nombre de cœurs CPU et la quantité de mémoire disponible pour votre session. La configuration par défaut est généralement suffisante lorsque vous débutez. Après avoir fait vos choix, cliquez sur **Start my Session** et un environnement Jupyter entièrement configuré se lancera dans votre navigateur en quelques secondes.

Vos fichiers sont automatiquement stockés dans votre espace CERNBox (EOS). Depuis la page d'accueil vous pouvez créer un nouveau notebook, ou utiliser l'explorateur de fichiers intégré pour ouvrir des notebooks existants que vous ou vos collègues avez précédemment enregistrés.

## Utiliser ROOT dans SWAN

SWAN inclut le framework d'analyse de données **ROOT** préinstallé dans tous les environnements logiciels LCG, ce qui en fait le moyen le plus rapide de commencer à travailler avec ROOT au CERN. Grâce à **PyROOT**, vous pouvez effectuer des analyses de données, créer des histogrammes, ajuster des fonctions et produire des graphiques de qualité publication directement dans un notebook Python. Si vous préférez travailler en C++, SWAN supporte également les notebooks ROOT C++ via le **kernel ROOT C++**, qui vous permet d'écrire et d'exécuter du code C++ de manière interactive dans la même interface navigateur.

Toutes les bibliothèques standard de ROOT et les tutoriels sont disponibles immédiatement, sans rien à installer ni à configurer. Vous pouvez également combiner ROOT avec d'autres bibliothèques scientifiques Python comme NumPy, pandas et matplotlib dans le même notebook, ce qui vous donne accès à un large écosystème d'outils pour l'analyse et la visualisation.

## Stockage et intégration EOS

SWAN s'intègre directement avec le système de stockage distribué **EOS** du CERN via **CERNBox**. Tous vos notebooks SWAN sont stockés dans votre espace CERNBox, ce qui signifie qu'ils sont automatiquement sauvegardés et accessibles depuis n'importe quel appareil disposant d'un navigateur. Dans un notebook, vous pouvez accéder à n'importe quel chemin EOS en utilisant les opérations standard sur les fichiers Python ou `TFile::Open` de ROOT, sans avoir besoin de copier les données sur un disque local avant de travailler dessus.

Cette intégration étroite simplifie également le partage : vous pouvez donner accès à vos notebooks à vos collègues simplement en partageant le dossier CERNBox correspondant. Les fichiers de données volumineux stockés n'importe où sur EOS peuvent être lus directement depuis vos notebooks sans les télécharger localement, ce qui est particulièrement utile pour les jeux de données d'expériences qu'il serait peu pratique de dupliquer.

## Partage et collaboration

SWAN offre plusieurs moyens de partager votre travail et de collaborer avec d'autres. L'approche la plus directe est le **partage via CERNBox** : en partageant le dossier CERNBox contenant vos notebooks, vos collègues reçoivent un lien direct et peuvent ouvrir votre travail dans leurs propres sessions SWAN. Pour l'inspiration et l'apprentissage, la **SWAN Gallery** héberge des notebooks d'exemple publiés par les expériences et les services du CERN, où vous pouvez découvrir des techniques d'analyse et des bonnes pratiques utilisées dans toute l'organisation.

Lorsque la reproductibilité est importante, les **Projets SWAN** vous permettent de regrouper notebooks, fichiers de données et configuration de l'environnement dans un package autonome que d'autres peuvent lancer en un seul clic. Vous pouvez également exporter vos notebooks en HTML, PDF ou scripts Python, ce qui les rend adaptés aux présentations, rapports et documentation devant être partagés en dehors de la plateforme SWAN.

## Conseils et bonnes pratiques

Bien que SWAN sauvegarde automatiquement vos notebooks périodiquement, c'est une bonne pratique de **sauvegarder manuellement** avant de lancer des calculs longs, afin de ne jamais risquer de perdre vos modifications récentes. Si vous avez besoin de paquets Python non inclus dans le stack LCG par défaut, vous pouvez configurer un **environnement virtuel** dans votre session SWAN et y installer des dépendances supplémentaires.

Étant donné que les ressources de SWAN sont partagées entre tous les utilisateurs du CERN, pensez à **fermer votre session** lorsque vous avez terminé de travailler afin que le CPU et la mémoire soient libérés pour les autres. SWAN fournit également un **accès aux terminaux**, utile pour exécuter des outils en ligne de commande, gérer des fichiers sur EOS ou installer des paquets manuellement. Pour les dernières fonctionnalités, les stacks logiciels supportés et les problèmes connus, consultez régulièrement la <a href="https://swan.docs.cern.ch" target="_blank" rel="noopener noreferrer">documentation de SWAN</a>.
