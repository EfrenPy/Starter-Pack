---
title: "Guide de lxplus - CERN Starter Pack"
description: "Guide d'utilisation de lxplus au CERN : presentation, ressources disponibles, repertoire personnel, environnements logiciels, jobs batch avec HTCondor et limites de ressources."
og:
  title: "Guide de lxplus - CERN Starter Pack"
  description: "Guide d'utilisation de lxplus au CERN : presentation, ressources disponibles, repertoire personnel, environnements logiciels, jobs batch avec HTCondor et limites de ressources."
breadcrumbs:
  - { label: "Accueil", url: "/fr/" }
  - { label: "Aide Technique", url: "/fr/technical-hub/" }
  - { label: "Guide de lxplus" }
---

# Guide de lxplus

<div class="alert">
<strong>💡 Conseil</strong><br>
<p>lxplus est une ressource partagee. Les processus de longue duree ou gourmands en memoire doivent etre soumis comme jobs batch via HTCondor plutot qu'executes de maniere interactive.</p>
</div>

lxplus est le **service de connexion interactive** du CERN, fournissant un environnement Linux partage ou des milliers d'utilisateurs du CERN compilent du code, executent des analyses, accedent aux donnees et gerent leur travail. C'est la porte d'entree principale vers l'infrastructure de calcul du CERN et il est utilise quotidiennement par les physiciens, ingenieurs et personnel technique de toute l'organisation. Si vous devez vous connecter a lxplus pour la premiere fois, consultez la [page de configuration Kerberos et SSH](/fr/technical/kerberos-ssh/) pour les instructions de connexion.

## Qu'est-ce que lxplus

lxplus est un cluster de **noeuds de connexion partages** executant AlmaLinux (la distribution Linux standard du CERN). Lorsque vous vous connectez via SSH a `lxplus.cern.ch`, vous etes affecte a l'un des noeuds disponibles de maniere rotative. Chaque session vous donne acces a un environnement Linux standard avec des outils de developpement courants, des compilateurs, des editeurs et un acces aux systemes de stockage du CERN (EOS et AFS). Les machines sont puissantes mais partagees entre de nombreux utilisateurs simultanees, donc l'utilisation des ressources par session est soumise a des limites.

Plusieurs **variantes de lxplus** sont disponibles pour des besoins specifiques. Le `lxplus.cern.ch` par defaut execute la version actuelle du systeme d'exploitation standard. Si vous avez besoin d'une version anterieure ou posterieure specifique pour des raisons de compatibilite, des variantes comme `lxplus9.cern.ch` (AlmaLinux 9) sont disponibles. Consultez la documentation IT du CERN pour la liste actuelle des variantes disponibles.

## Ressources Disponibles

Chaque noeud lxplus offre generalement **plusieurs coeurs CPU et plusieurs gigaoctets de RAM** par session utilisateur. Cependant, les noeuds etant partages, des limites souples sur le temps CPU et la consommation de memoire par utilisateur sont appliquees pour garantir un usage equitable. Les sessions interactives sont destinees au developpement, au debogage, aux tests et aux analyses courtes — pas a l'execution de charges de travail de production qui consomment de nombreux coeurs ou gigaoctets de memoire pendant des heures.

Si votre tache necessite des **ressources de calcul significatives** — par exemple le traitement de grands jeux de donnees, l'execution de simulations Monte Carlo ou l'entrainement de modeles de machine learning — vous devriez la soumettre comme job batch plutot que de l'executer de maniere interactive sur lxplus. Le systeme batch distribue votre job sur des noeuds de calcul dedies ou il peut s'executer sans entrer en competition avec d'autres utilisateurs interactifs.

## Repertoire Personnel : AFS vs EOS

Lorsque vous vous connectez a lxplus, votre repertoire personnel par defaut se trouve sur **AFS** (Andrew File System) a l'emplacement `/afs/cern.ch/user/<initiale>/<nom-utilisateur>/`. AFS a ete le systeme de repertoire personnel traditionnel au CERN pendant des decennies et est encore utilise pour les fichiers de configuration, les scripts de connexion et les petits fichiers. Cependant, AFS a un **quota limite** (generalement 10 Go) et est progressivement remplace par EOS pour la plupart des cas d'utilisation.

Votre **repertoire personnel EOS** a l'emplacement `/eos/user/<initiale>/<nom-utilisateur>/` fournit un quota par defaut beaucoup plus important (1 To) et constitue l'emplacement recommande pour les fichiers d'analyse, les grands jeux de donnees et le travail actif. AFS et EOS sont tous deux accessibles depuis n'importe quel noeud lxplus, vous pouvez donc facilement deplacer des fichiers entre les deux. En pratique generale, gardez votre home AFS propre et utilisez EOS pour vos fichiers de travail principaux.

## Environnements Logiciels

L'environnement logiciel du CERN sur lxplus est gere a travers **CVMFS** (CernVM File System), un systeme de fichiers en lecture seule qui distribue les paquets logiciels a travers le reseau. Via CVMFS, vous avez acces a un vaste catalogue de logiciels preconstruits incluant ROOT, Geant4, des distributions Python et des frameworks specifiques aux experiences. Les releases LCG (piles logicielles de la Grille de Calcul du LHC) fournissent des collections organisees d'outils et de bibliotheques compatibles pour l'analyse physique.

Pour configurer un environnement logiciel specifique, vous executez generalement un script de configuration. Par exemple, `source /cvmfs/sft.cern.ch/lcg/views/LCG_105/x86_64-el9-gcc12-opt/setup.sh` configure un environnement LCG 105 complet avec ROOT, Python et de nombreux outils d'analyse. Les configurations specifiques aux experiences (comme Athena d'ATLAS ou CMSSW de CMS) ont leurs propres procedures d'initialisation documentees par chaque collaboration.

## Jobs Batch avec HTCondor

Pour les taches gourmandes en calcul, le CERN fournit un **systeme de calcul batch base sur HTCondor**. Depuis lxplus, vous pouvez soumettre des jobs qui s'executent sur un large pool de noeuds de travail dedies sans impacter les utilisateurs interactifs. Une soumission HTCondor basique implique l'ecriture d'un bref **fichier de soumission** qui specifie votre executable, les fichiers d'entree, les exigences en ressources (CPU, memoire, disque) et les emplacements de sortie.

Un fichier de soumission minimal pourrait ressembler a ceci : definir l'executable (votre script), specifier les chemins des fichiers de sortie, d'erreur et de log, demander le nombre souhaite de CPU et de memoire, et appeler `condor_submit` pour mettre le job en file d'attente. Vous pouvez ensuite surveiller sa progression avec `condor_q` et consulter les details des jobs termines avec `condor_history`. Pour les flux de travail a grande echelle impliquant des centaines ou des milliers de jobs, des outils comme HTCondor DAGMan du CERN et les gestionnaires de workflows simplifient le processus.

## Limites de Ressources et Fair-Share

Les ressources de calcul du CERN fonctionnent selon un modele de **planification fair-share**. Chaque utilisateur et experience dispose d'une part des ressources totales, et le systeme batch priorise les jobs en fonction de l'utilisation recente — si vous avez utilise une grande quantite recemment, vos nouveaux jobs peuvent avoir une priorite plus basse jusqu'a ce que votre part se reequilibre. Cela garantit qu'aucun utilisateur ou groupe individuel ne monopolise le systeme.

Sur lxplus meme, des limites de ressources interactives sont appliquees pour proteger l'environnement partage. Les processus qui consomment excessivement du CPU ou de la memoire peuvent etre automatiquement termines. Si vous avez besoin de ressources dediees pour un projet ou une periode specifique, l'IT du CERN propose des **machines virtuelles** et des **instances OpenStack** qui fournissent une capacite de calcul dediee sous votre controle — contactez le departement IT via ServiceNow pour discuter des options.

## Sources

- <a href="https://information-technology.web.cern.ch/services/lxplus-service" target="_blank" rel="noopener noreferrer">CERN IT — Service lxplus</a>
- <a href="https://batchdocs.web.cern.ch/" target="_blank" rel="noopener noreferrer">Documentation du Service Batch du CERN</a>
- <a href="https://cvmfs.readthedocs.io/" target="_blank" rel="noopener noreferrer">Documentation CVMFS</a>
