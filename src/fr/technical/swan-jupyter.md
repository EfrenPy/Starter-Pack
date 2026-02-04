---
title: "SWAN Jupyter Notebooks - CERN Starter Pack"
description: "Guide du service SWAN du CERN pour l'analyse interactive de donnees avec les Jupyter notebooks, incluant la configuration, l'integration ROOT, le stockage EOS et la collaboration."
og:
  title: "SWAN Jupyter Notebooks - CERN Starter Pack"
  description: "Commencez a utiliser SWAN, la plateforme cloud du CERN basee sur Jupyter notebooks pour l'analyse interactive de donnees."
breadcrumbs:
  - { label: "Accueil", url: "/fr/" }
  - { label: "Aide Technique", url: "/fr/technical-hub/" }
  - { label: "SWAN (Jupyter)" }
---

<h1>SWAN : Jupyter Notebooks au CERN</h1>
      <div class="alert">
        <p><strong>Note :</strong> SWAN necessite un compte informatique du CERN actif. Assurez-vous que votre compte est active avant d'essayer d'acceder au service.</p>
      </div>

      <h2>Qu'est-ce que SWAN ?</h2>
      <p>SWAN (Service for Web-based ANalysis) est la plateforme cloud du CERN pour l'analyse interactive de donnees a l'aide de Jupyter notebooks. Elle fournit un environnement base sur le navigateur dans lequel vous pouvez ecrire et executer du code Python, C++ ou ROOT sans rien installer sur votre machine locale.</p>
      <p>SWAN est construit sur JupyterHub et s'integre etroitement avec l'infrastructure du CERN, notamment le stockage EOS, les stacks logiciels CVMFS et les clusters Spark. Vous pouvez y acceder sur <a href="https://swan.cern.ch" target="_blank" rel="noopener noreferrer">swan.cern.ch</a> avec vos identifiants du CERN.</p>

      <h2>Pour commencer</h2>
      <p>Pour commencer a utiliser SWAN, suivez ces etapes :</p>
      <ul>
        <li>Rendez-vous sur <a href="https://swan.cern.ch" target="_blank" rel="noopener noreferrer">swan.cern.ch</a> et connectez-vous avec vos identifiants Single Sign-On (SSO) du CERN.</li>
        <li>Choisissez un <strong>environnement logiciel</strong> (release LCG) qui inclut les bibliotheques et outils dont vous avez besoin. En cas de doute, la selection par defaut convient a la plupart des cas.</li>
        <li>Selectionnez une <strong>allocation de ressources</strong> (nombre de coeurs CPU et memoire). La configuration par defaut est generalement suffisante pour debuter.</li>
        <li>Cliquez sur <strong>Start my Session</strong>. Une session Jupyter demarrera dans votre navigateur en quelques secondes.</li>
      </ul>
      <p>Vos fichiers sont automatiquement stockes dans votre espace CERNBox (EOS). Vous pouvez creer un nouveau notebook depuis la page d'accueil ou ouvrir des notebooks existants depuis l'explorateur de fichiers.</p>

      <h2>Utiliser ROOT dans SWAN</h2>
      <p>SWAN inclut le framework d'analyse de donnees ROOT preinstalle dans tous les environnements logiciels LCG. C'est donc le moyen le plus rapide de commencer a travailler avec ROOT au CERN :</p>
      <ul>
        <li>Utilisez <strong>PyROOT</strong> dans les notebooks Python pour effectuer des analyses de donnees, creer des histogrammes, ajuster des fonctions et produire des graphiques de qualite publication directement dans le notebook.</li>
        <li>Les notebooks ROOT C++ sont egalement supportes via le <strong>kernel ROOT C++</strong>, permettant d'ecrire et d'executer du code C++ de maniere interactive.</li>
        <li>Toutes les bibliotheques standard de ROOT et les tutoriels sont disponibles immediatement.</li>
        <li>Vous pouvez combiner ROOT avec d'autres bibliotheques scientifiques Python comme NumPy, pandas et matplotlib dans le meme notebook.</li>
      </ul>

      <h2>Stockage et integration EOS</h2>
      <p>SWAN s'integre directement avec le systeme de stockage distribue EOS du CERN via CERNBox :</p>
      <ul>
        <li>Tous vos notebooks SWAN sont stockes dans votre espace <strong>CERNBox</strong>, ce qui signifie qu'ils sont sauvegardes et accessibles depuis n'importe quel appareil.</li>
        <li>Vous pouvez acceder a n'importe quel chemin EOS depuis vos notebooks en utilisant les operations standard sur les fichiers ou <code>TFile::Open</code> de ROOT.</li>
        <li>Partagez vos notebooks facilement en partageant les dossiers CERNBox correspondants avec vos collegues.</li>
        <li>Les fichiers de donnees volumineux stockes sur EOS peuvent etre lus directement depuis vos notebooks sans les telecharger localement.</li>
      </ul>

      <h2>Partage et collaboration</h2>
      <p>SWAN offre plusieurs moyens de partager votre travail et de collaborer avec d'autres :</p>
      <ul>
        <li><strong>Partage CERNBox :</strong> Partagez les liens vers vos notebooks avec vos collegues en partageant le dossier CERNBox qui les contient.</li>
        <li><strong>SWAN Gallery :</strong> Explorez des notebooks d'exemple publies par les experiences et les services du CERN pour apprendre les bonnes pratiques et decouvrir des techniques d'analyse.</li>
        <li><strong>Projets SWAN :</strong> Creez des projets autonomes qui regroupent notebooks, fichiers de donnees et configuration de l'environnement pour une reproductibilite facile.</li>
        <li><strong>Options d'exportation :</strong> Les notebooks peuvent etre exportes en HTML, PDF ou scripts Python, ce qui les rend adaptes aux presentations, rapports et documentation.</li>
      </ul>

      <h2>Conseils et bonnes pratiques</h2>
      <ul>
        <li><strong>Sauvegardez frequemment :</strong> Bien que SWAN sauvegarde automatiquement vos notebooks periodiquement, c'est une bonne pratique de sauvegarder manuellement avant de lancer des calculs longs.</li>
        <li><strong>Environnements virtuels :</strong> Si vous avez besoin de paquets Python non inclus dans le stack LCG par defaut, vous pouvez configurer un environnement virtuel dans votre session SWAN.</li>
        <li><strong>Fermez les sessions inutilisees :</strong> Les ressources de SWAN sont partagees entre tous les utilisateurs du CERN. Fermez votre session lorsque vous avez termine pour liberer des ressources pour les autres.</li>
        <li><strong>Restez a jour :</strong> Consultez la <a href="https://swan.docs.cern.ch" target="_blank" rel="noopener noreferrer">documentation de SWAN</a> pour les dernieres fonctionnalites, les stacks logiciels supportes et les problemes connus.</li>
        <li><strong>Utilisez les terminaux :</strong> SWAN fournit egalement un acces aux terminaux, utile pour executer des outils en ligne de commande, gerer des fichiers ou installer des paquets.</li>
      </ul>
