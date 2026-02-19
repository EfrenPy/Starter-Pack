---
title: "Stockage EOS et CERNBox - CERN Starter Pack"
description: "Guide du stockage distribué EOS et de CERNBox au CERN : espace personnel, quotas, interface web, synchronisation bureau, accès depuis lxplus et partage de fichiers."
og:
  title: "Stockage EOS et CERNBox - CERN Starter Pack"
  description: "Guide du stockage distribué EOS et de CERNBox au CERN : espace personnel, quotas, interface web, synchronisation bureau, accès depuis lxplus et partage de fichiers."
breadcrumbs:
  - { label: "Accueil", url: "/fr/" }
  - { label: "Aide Technique", url: "/fr/technical-hub/" }
  - { label: "Stockage EOS et CERNBox" }
---

# Stockage EOS et CERNBox

<div class="alert">
<strong>💡 Conseil</strong><br>
<p>CERNBox est votre stockage cloud principal au CERN. Configurez-le tôt pour garder vos fichiers synchronisés entre appareils et sauvegardés automatiquement.</p>
</div>

EOS est le **système de stockage distribué à grande échelle** du CERN, conçu pour gérer les volumes massifs de données produits par les expériences du LHC tout en servant d'infrastructure de stockage personnel et de projet pour tous les utilisateurs du CERN. CERNBox est l'interface web et bureau conviviale construite sur EOS, offrant des fonctionnalités de synchronisation et de partage de fichiers similaires à Dropbox. Ensemble, ils constituent l'épine dorsale du stockage de fichiers au CERN.

## Qu'est-ce qu'EOS

EOS est un système de stockage sur disque développé au CERN qui gère **des centaines de pétaoctets de données** à travers des milliers de nœuds de stockage. Il utilise le codage par effacement et la réplication pour assurer la durabilité et la disponibilité des données, et il est optimisé aussi bien pour le traitement de données physiques à haut débit que pour les flux de travail interactifs des utilisateurs. Pour la plupart des utilisateurs du CERN, EOS est simplement l'endroit où résident vos fichiers personnels, vos données de projet et vos dossiers partagés — vous y accédez via CERNBox, la ligne de commande sur lxplus ou les plateformes d'analyse du CERN comme SWAN.

Chaque utilisateur du CERN reçoit automatiquement un **répertoire personnel sur EOS** à l'emplacement `/eos/user/<initiale>/<nom-utilisateur>/`. Celui-ci est distinct de votre répertoire personnel AFS et constitue l'emplacement recommandé pour les fichiers de travail actifs, les scripts d'analyse et les documents auxquels vous souhaitez accéder depuis plusieurs emplacements.

## Quotas de Stockage

Le stockage personnel sur EOS est assorti d'un **quota par défaut de 1 To**, ce qui est généreux pour la plupart des utilisateurs. Si vous avez besoin de plus d'espace — par exemple pour de grands jeux de données d'analyse ou des sorties de simulation — vous pouvez demander une augmentation de quota via le portail ServiceNow de l'IT du CERN. Les espaces de projet et le stockage des expériences disposent de quotas séparés et plus importants gérés par les coordinateurs de calcul concernés.

Vous pouvez vérifier votre utilisation et votre quota actuels en vous connectant à CERNBox ou en exécutant la commande `eos quota ls -m` sur lxplus. Surveillez votre utilisation, car atteindre la limite de quota vous empêchera d'enregistrer de nouveaux fichiers jusqu'à ce que vous libériez de l'espace ou obteniez une augmentation de quota.

## Interface Web de CERNBox

CERNBox est accessible à **cernbox.cern.ch** depuis n'importe quel navigateur web, en utilisant vos identifiants d'authentification unique du CERN. L'interface web offre une expérience familière de gestionnaire de fichiers où vous pouvez télécharger, téléverser, renommer, déplacer et supprimer des fichiers et dossiers. Elle prend également en charge l'**édition en ligne** de documents grâce à des outils bureautiques intégrés (OnlyOffice), vous permettant de créer et modifier des fichiers Word, Excel et PowerPoint directement dans le navigateur sans installer de logiciel.

L'interface web est particulièrement utile lorsque vous travaillez depuis une machine où vous n'avez pas installé le client de synchronisation bureau — par exemple depuis un ordinateur portable personnel ou en déplacement. Toutes les modifications effectuées via l'interface web sont immédiatement reflétées dans votre stockage EOS et se synchroniseront avec tout client bureau connecté.

## Client de Synchronisation Bureau

Pour une synchronisation transparente entre votre machine locale et EOS, installez le **client bureau CERNBox**, disponible pour Windows, macOS et Linux. Le client fonctionne comme Dropbox ou OneDrive, maintenant une copie locale de vos fichiers synchronisée avec votre stockage EOS. Vous pouvez choisir quels dossiers synchroniser si vous ne souhaitez pas répliquer l'intégralité de votre répertoire personnel EOS localement.

Téléchargez le client depuis **cernbox.cern.ch** et authentifiez-vous avec vos identifiants CERN. Après la synchronisation initiale, les modifications sont propagées en quasi temps réel. Le client bureau est la méthode recommandée pour travailler avec CERNBox au quotidien, car il fournit un accès hors ligne à vos fichiers et une résolution automatique des conflits si le même fichier est modifié en plusieurs endroits.

## Accès à EOS depuis lxplus et SWAN

Sur **lxplus** (le cluster de connexion interactif du CERN), votre répertoire personnel EOS est accessible à `/eos/user/<initiale>/<nom-utilisateur>/`. Vous pouvez naviguer, lire et écrire des fichiers en utilisant les commandes Linux standard. Pour les flux de travail d'analyse physique, EOS est également directement accessible depuis **SWAN** (le service Jupyter notebook du CERN), où vos fichiers EOS apparaissent dans le navigateur de fichiers et peuvent être chargés dans les notebooks de manière transparente.

Si vous devez accéder à EOS depuis votre machine locale en dehors de CERNBox, vous pouvez le monter via **FUSE** (en utilisant le client eosxd) ou y accéder via le **protocole XRootD**. Le montage FUSE fournit une interface de type système de fichiers, tandis que XRootD est utilisé de manière programmatique dans les frameworks d'analyse comme ROOT. Les deux méthodes nécessitent une authentification Kerberos valide — consultez la page Kerberos et SSH pour les instructions de configuration.

## Partage de Fichiers et Dossiers

CERNBox facilite le **partage de fichiers et dossiers** avec les collègues. Via l'interface web ou le client bureau, vous pouvez partager un fichier ou un dossier en saisissant le nom d'utilisateur CERN ou l'adresse email du destinataire et en choisissant le niveau de permission (lecture seule ou modification). Les éléments partagés apparaissent dans le CERNBox du destinataire sous la section "Partages avec moi".

Vous pouvez également générer des **liens publics** pour le partage avec des personnes extérieures au CERN, éventuellement protégés par un mot de passe et une date d'expiration. C'est utile pour partager des documents avec des collaborateurs externes qui n'ont pas de compte CERN. Pour le partage à plus grande échelle au sein d'une expérience ou d'un projet, les **espaces de projet EOS** fournissent des zones de stockage partagées dédiées avec leurs propres quotas et contrôles d'accès gérés par le coordinateur du projet.

## Sources

- <a href="https://cernbox.cern.ch/" target="_blank" rel="noopener noreferrer">CERNBox — Stockage Cloud du CERN</a>
- <a href="https://eos-docs.web.cern.ch/" target="_blank" rel="noopener noreferrer">Documentation EOS</a>
- <a href="https://information-technology.web.cern.ch/" target="_blank" rel="noopener noreferrer">Département IT du CERN</a>
