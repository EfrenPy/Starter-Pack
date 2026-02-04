---
title: "Stockage EOS et CERNBox - CERN Starter Pack"
description: "Guide du stockage distribue EOS et de CERNBox au CERN : espace personnel, quotas, interface web, synchronisation bureau, acces depuis lxplus et partage de fichiers."
og:
  title: "Stockage EOS et CERNBox - CERN Starter Pack"
  description: "Guide du stockage distribue EOS et de CERNBox au CERN : espace personnel, quotas, interface web, synchronisation bureau, acces depuis lxplus et partage de fichiers."
breadcrumbs:
  - { label: "Accueil", url: "/fr/" }
  - { label: "Aide Technique", url: "/fr/technical-hub/" }
  - { label: "Stockage EOS et CERNBox" }
---

<h1>Stockage EOS et CERNBox</h1>
<div class="alert">
<strong>💡 Conseil</strong><br>
<p>CERNBox est votre stockage cloud principal au CERN. Configurez-le tot pour garder vos fichiers synchronises entre appareils et sauvegardes automatiquement.</p>
</div>
<p>EOS est le <strong>systeme de stockage distribue a grande echelle</strong> du CERN, concu pour gerer les volumes massifs de donnees produits par les experiences du LHC tout en servant d'infrastructure de stockage personnel et de projet pour tous les utilisateurs du CERN. CERNBox est l'interface web et bureau conviviale construite sur EOS, offrant des fonctionnalites de synchronisation et de partage de fichiers similaires a Dropbox. Ensemble, ils constituent l'epine dorsale du stockage de fichiers au CERN.</p>
<h2>Qu'est-ce qu'EOS</h2>
<p>EOS est un systeme de stockage sur disque developpe au CERN qui gere <strong>des centaines de petaoctets de donnees</strong> a travers des milliers de noeuds de stockage. Il utilise le codage par effacement et la replication pour assurer la durabilite et la disponibilite des donnees, et il est optimise aussi bien pour le traitement de donnees physiques a haut debit que pour les flux de travail interactifs des utilisateurs. Pour la plupart des utilisateurs du CERN, EOS est simplement l'endroit ou resident vos fichiers personnels, vos donnees de projet et vos dossiers partages — vous y accedez via CERNBox, la ligne de commande sur lxplus ou les plateformes d'analyse du CERN comme SWAN.</p>
<p>Chaque utilisateur du CERN recoit automatiquement un <strong>repertoire personnel sur EOS</strong> a l'emplacement <code>/eos/user/&lt;initiale&gt;/&lt;nom-utilisateur&gt;/</code>. Celui-ci est distinct de votre repertoire personnel AFS et constitue l'emplacement recommande pour les fichiers de travail actifs, les scripts d'analyse et les documents auxquels vous souhaitez acceder depuis plusieurs emplacements.</p>
<h2>Quotas de Stockage</h2>
<p>Le stockage personnel sur EOS est assorti d'un <strong>quota par defaut de 1 To</strong>, ce qui est genereux pour la plupart des utilisateurs. Si vous avez besoin de plus d'espace — par exemple pour de grands jeux de donnees d'analyse ou des sorties de simulation — vous pouvez demander une augmentation de quota via le portail ServiceNow de l'IT du CERN. Les espaces de projet et le stockage des experiences disposent de quotas separes et plus importants geres par les coordinateurs de calcul concernes.</p>
<p>Vous pouvez verifier votre utilisation et votre quota actuels en vous connectant a CERNBox ou en executant la commande <code>eos quota ls -m</code> sur lxplus. Surveillez votre utilisation, car atteindre la limite de quota vous empechera d'enregistrer de nouveaux fichiers jusqu'a ce que vous liberiez de l'espace ou obteniez une augmentation de quota.</p>
<h2>Interface Web de CERNBox</h2>
<p>CERNBox est accessible a <strong>cernbox.cern.ch</strong> depuis n'importe quel navigateur web, en utilisant vos identifiants d'authentification unique du CERN. L'interface web offre une experience familiere de gestionnaire de fichiers ou vous pouvez telecharger, telecharger, renommer, deplacer et supprimer des fichiers et dossiers. Elle prend egalement en charge l'<strong>edition en ligne</strong> de documents grace a des outils bureautiques integres (OnlyOffice), vous permettant de creer et modifier des fichiers Word, Excel et PowerPoint directement dans le navigateur sans installer de logiciel.</p>
<p>L'interface web est particulierement utile lorsque vous travaillez depuis une machine ou vous n'avez pas installe le client de synchronisation bureau — par exemple depuis un ordinateur portable personnel ou en deplacement. Toutes les modifications effectuees via l'interface web sont immediatement refletees dans votre stockage EOS et se synchroniseront avec tout client bureau connecte.</p>
<h2>Client de Synchronisation Bureau</h2>
<p>Pour une synchronisation transparente entre votre machine locale et EOS, installez le <strong>client bureau CERNBox</strong>, disponible pour Windows, macOS et Linux. Le client fonctionne comme Dropbox ou OneDrive, maintenant une copie locale de vos fichiers synchronisee avec votre stockage EOS. Vous pouvez choisir quels dossiers synchroniser si vous ne souhaitez pas repliquer l'integralite de votre repertoire personnel EOS localement.</p>
<p>Telechargez le client depuis <strong>cernbox.cern.ch</strong> et authentifiez-vous avec vos identifiants CERN. Apres la synchronisation initiale, les modifications sont propagees en quasi temps reel. Le client bureau est la methode recommandee pour travailler avec CERNBox au quotidien, car il fournit un acces hors ligne a vos fichiers et une resolution automatique des conflits si le meme fichier est modifie en plusieurs endroits.</p>
<h2>Acces a EOS depuis lxplus et SWAN</h2>
<p>Sur <strong>lxplus</strong> (le cluster de connexion interactif du CERN), votre repertoire personnel EOS est accessible a <code>/eos/user/&lt;initiale&gt;/&lt;nom-utilisateur&gt;/</code>. Vous pouvez naviguer, lire et ecrire des fichiers en utilisant les commandes Linux standard. Pour les flux de travail d'analyse physique, EOS est egalement directement accessible depuis <strong>SWAN</strong> (le service Jupyter notebook du CERN), ou vos fichiers EOS apparaissent dans le navigateur de fichiers et peuvent etre charges dans les notebooks de maniere transparente.</p>
<p>Si vous devez acceder a EOS depuis votre machine locale en dehors de CERNBox, vous pouvez le monter via <strong>FUSE</strong> (en utilisant le client eosxd) ou y acceder via le <strong>protocole XRootD</strong>. Le montage FUSE fournit une interface de type systeme de fichiers, tandis que XRootD est utilise de maniere programmatique dans les frameworks d'analyse comme ROOT. Les deux methodes necessitent une authentification Kerberos valide — consultez la page Kerberos et SSH pour les instructions de configuration.</p>
<h2>Partage de Fichiers et Dossiers</h2>
<p>CERNBox facilite le <strong>partage de fichiers et dossiers</strong> avec les collegues. Via l'interface web ou le client bureau, vous pouvez partager un fichier ou un dossier en saisissant le nom d'utilisateur CERN ou l'adresse email du destinataire et en choisissant le niveau de permission (lecture seule ou modification). Les elements partages apparaissent dans le CERNBox du destinataire sous la section "Partages avec moi".</p>
<p>Vous pouvez egalement generer des <strong>liens publics</strong> pour le partage avec des personnes exterieurees au CERN, eventuellement proteges par un mot de passe et une date d'expiration. C'est utile pour partager des documents avec des collaborateurs externes qui n'ont pas de compte CERN. Pour le partage a plus grande echelle au sein d'une experience ou d'un projet, les <strong>espaces de projet EOS</strong> fournissent des zones de stockage partagees dediees avec leurs propres quotas et controles d'acces geres par le coordinateur du projet.</p>
<h2>Sources</h2>
<ul>
<li><a href="https://cernbox.cern.ch/" target="_blank" rel="noopener noreferrer">CERNBox — Stockage Cloud du CERN</a></li>
<li><a href="https://eos-docs.web.cern.ch/" target="_blank" rel="noopener noreferrer">Documentation EOS</a></li>
<li><a href="https://information-technology.web.cern.ch/" target="_blank" rel="noopener noreferrer">Departement IT du CERN</a></li>
</ul>
