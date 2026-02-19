---
title: "Guide de lxplus - CERN Starter Pack"
description: "Guide d'utilisation de lxplus au CERN : présentation, ressources disponibles, répertoire personnel, environnements logiciels, jobs batch avec HTCondor et limites de ressources."
og:
  title: "Guide de lxplus - CERN Starter Pack"
  description: "Guide d'utilisation de lxplus au CERN : présentation, ressources disponibles, répertoire personnel, environnements logiciels, jobs batch avec HTCondor et limites de ressources."
breadcrumbs:
  - { label: "Accueil", url: "/fr/" }
  - { label: "Aide Technique", url: "/fr/technical-hub/" }
  - { label: "Guide de lxplus" }
---

# Guide de lxplus

<div class="alert">
<strong>💡 Conseil</strong><br>
<p>lxplus est une ressource partagée. Les processus de longue durée ou gourmands en mémoire doivent être soumis comme jobs batch via HTCondor plutôt qu'exécutés de manière interactive.</p>
</div>

lxplus est le **service de connexion interactive** du CERN, fournissant un environnement Linux partagé où des milliers d'utilisateurs du CERN compilent du code, exécutent des analyses, accèdent aux données et gèrent leur travail. C'est la porte d'entrée principale vers l'infrastructure de calcul du CERN et il est utilisé quotidiennement par les physiciens, ingénieurs et personnel technique de toute l'organisation. Si vous devez vous connecter à lxplus pour la première fois, consultez la [page de configuration Kerberos et SSH](/fr/technical/kerberos-ssh/) pour les instructions de connexion.

## Qu'est-ce que lxplus

lxplus est un cluster de **nœuds de connexion partagés** exécutant AlmaLinux (la distribution Linux standard du CERN). Lorsque vous vous connectez via SSH à `lxplus.cern.ch`, vous êtes affecté à l'un des nœuds disponibles de manière rotative. Chaque session vous donne accès à un environnement Linux standard avec des outils de développement courants, des compilateurs, des éditeurs et un accès aux systèmes de stockage du CERN (EOS et AFS). Les machines sont puissantes mais partagées entre de nombreux utilisateurs simultanés, donc l'utilisation des ressources par session est soumise à des limites.

Plusieurs **variantes de lxplus** sont disponibles pour des besoins spécifiques. Le `lxplus.cern.ch` par défaut exécute la version actuelle du système d'exploitation standard. Si vous avez besoin d'une version antérieure ou postérieure spécifique pour des raisons de compatibilité, des variantes comme `lxplus9.cern.ch` (AlmaLinux 9) sont disponibles. Consultez la documentation IT du CERN pour la liste actuelle des variantes disponibles.

## Ressources Disponibles

Chaque nœud lxplus offre généralement **plusieurs cœurs CPU et plusieurs gigaoctets de RAM** par session utilisateur. Cependant, les nœuds étant partagés, des limites souples sur le temps CPU et la consommation de mémoire par utilisateur sont appliquées pour garantir un usage équitable. Les sessions interactives sont destinées au développement, au débogage, aux tests et aux analyses courtes — pas à l'exécution de charges de travail de production qui consomment de nombreux cœurs ou gigaoctets de mémoire pendant des heures.

Si votre tâche nécessite des **ressources de calcul significatives** — par exemple le traitement de grands jeux de données, l'exécution de simulations Monte Carlo ou l'entraînement de modèles de machine learning — vous devriez la soumettre comme job batch plutôt que de l'exécuter de manière interactive sur lxplus. Le système batch distribue votre job sur des nœuds de calcul dédiés où il peut s'exécuter sans entrer en compétition avec d'autres utilisateurs interactifs.

## Répertoire Personnel : AFS vs EOS

Lorsque vous vous connectez à lxplus, votre répertoire personnel par défaut se trouve sur **AFS** (Andrew File System) à l'emplacement `/afs/cern.ch/user/<initiale>/<nom-utilisateur>/`. AFS a été le système de répertoire personnel traditionnel au CERN pendant des décennies et est encore utilisé pour les fichiers de configuration, les scripts de connexion et les petits fichiers. Cependant, AFS a un **quota limité** (généralement 10 Go) et est progressivement remplacé par EOS pour la plupart des cas d'utilisation.

Votre **répertoire personnel EOS** à l'emplacement `/eos/user/<initiale>/<nom-utilisateur>/` fournit un quota par défaut beaucoup plus important (1 To) et constitue l'emplacement recommandé pour les fichiers d'analyse, les grands jeux de données et le travail actif. AFS et EOS sont tous deux accessibles depuis n'importe quel nœud lxplus, vous pouvez donc facilement déplacer des fichiers entre les deux. En pratique générale, gardez votre home AFS propre et utilisez EOS pour vos fichiers de travail principaux.

## Environnements Logiciels

L'environnement logiciel du CERN sur lxplus est géré à travers **CVMFS** (CernVM File System), un système de fichiers en lecture seule qui distribue les paquets logiciels à travers le réseau. Via CVMFS, vous avez accès à un vaste catalogue de logiciels préconstruits incluant ROOT, Geant4, des distributions Python et des frameworks spécifiques aux expériences. Les releases LCG (piles logicielles de la Grille de Calcul du LHC) fournissent des collections organisées d'outils et de bibliothèques compatibles pour l'analyse physique.

Pour configurer un environnement logiciel spécifique, vous exécutez généralement un script de configuration. Par exemple, `source /cvmfs/sft.cern.ch/lcg/views/LCG_105/x86_64-el9-gcc12-opt/setup.sh` configure un environnement LCG 105 complet avec ROOT, Python et de nombreux outils d'analyse. Les configurations spécifiques aux expériences (comme Athena d'ATLAS ou CMSSW de CMS) ont leurs propres procédures d'initialisation documentées par chaque collaboration.

## Jobs Batch avec HTCondor

Pour les tâches gourmandes en calcul, le CERN fournit un **système de calcul batch basé sur HTCondor**. Depuis lxplus, vous pouvez soumettre des jobs qui s'exécutent sur un large pool de nœuds de travail dédiés sans impacter les utilisateurs interactifs. Une soumission HTCondor basique implique l'écriture d'un bref **fichier de soumission** qui spécifie votre exécutable, les fichiers d'entrée, les exigences en ressources (CPU, mémoire, disque) et les emplacements de sortie.

Un fichier de soumission minimal pourrait ressembler à ceci : définir l'exécutable (votre script), spécifier les chemins des fichiers de sortie, d'erreur et de log, demander le nombre souhaité de CPU et de mémoire, et appeler `condor_submit` pour mettre le job en file d'attente. Vous pouvez ensuite surveiller sa progression avec `condor_q` et consulter les détails des jobs terminés avec `condor_history`. Pour les flux de travail à grande échelle impliquant des centaines ou des milliers de jobs, des outils comme HTCondor DAGMan du CERN et les gestionnaires de workflows simplifient le processus.

## Limites de Ressources et Fair-Share

Les ressources de calcul du CERN fonctionnent selon un modèle de **planification fair-share**. Chaque utilisateur et expérience dispose d'une part des ressources totales, et le système batch priorise les jobs en fonction de l'utilisation récente — si vous avez utilisé une grande quantité récemment, vos nouveaux jobs peuvent avoir une priorité plus basse jusqu'à ce que votre part se rééquilibre. Cela garantit qu'aucun utilisateur ou groupe individuel ne monopolise le système.

Sur lxplus même, des limites de ressources interactives sont appliquées pour protéger l'environnement partagé. Les processus qui consomment excessivement du CPU ou de la mémoire peuvent être automatiquement terminés. Si vous avez besoin de ressources dédiées pour un projet ou une période spécifique, l'IT du CERN propose des **machines virtuelles** et des **instances OpenStack** qui fournissent une capacité de calcul dédiée sous votre contrôle — contactez le département IT via ServiceNow pour discuter des options.

## Sources

- <a href="https://information-technology.web.cern.ch/services/lxplus-service" target="_blank" rel="noopener noreferrer">CERN IT — Service lxplus</a>
- <a href="https://batchdocs.web.cern.ch/" target="_blank" rel="noopener noreferrer">Documentation du Service Batch du CERN</a>
- <a href="https://cvmfs.readthedocs.io/" target="_blank" rel="noopener noreferrer">Documentation CVMFS</a>
