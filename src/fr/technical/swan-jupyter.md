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
      <p>Pour commencer a travailler avec SWAN, ouvrez votre navigateur et rendez-vous sur <a href="https://swan.cern.ch" target="_blank" rel="noopener noreferrer">swan.cern.ch</a>, ou vous vous connecterez avec vos identifiants Single Sign-On (SSO) du CERN. Une fois authentifie, la plateforme vous demandera de configurer votre session. Choisissez d'abord un <strong>environnement logiciel</strong> (appele release LCG) qui inclut les bibliotheques et outils dont vous avez besoin. Si vous ne savez pas lequel choisir, la selection par defaut couvre la plupart des cas et constitue un bon point de depart.</p>
      <p>Selectionnez ensuite une <strong>allocation de ressources</strong>, qui determine le nombre de coeurs CPU et la quantite de memoire disponible pour votre session. La configuration par defaut est generalement suffisante lorsque vous debutez. Apres avoir fait vos choix, cliquez sur <strong>Start my Session</strong> et un environnement Jupyter entierement configure se lancera dans votre navigateur en quelques secondes.</p>
      <p>Vos fichiers sont automatiquement stockes dans votre espace CERNBox (EOS). Depuis la page d'accueil vous pouvez creer un nouveau notebook, ou utiliser l'explorateur de fichiers integre pour ouvrir des notebooks existants que vous ou vos collegues avez precedemment enregistres.</p>

      <h2>Utiliser ROOT dans SWAN</h2>
      <p>SWAN inclut le framework d'analyse de donnees <strong>ROOT</strong> preinstalle dans tous les environnements logiciels LCG, ce qui en fait le moyen le plus rapide de commencer a travailler avec ROOT au CERN. Grace a <strong>PyROOT</strong>, vous pouvez effectuer des analyses de donnees, creer des histogrammes, ajuster des fonctions et produire des graphiques de qualite publication directement dans un notebook Python. Si vous preferez travailler en C++, SWAN supporte egalement les notebooks ROOT C++ via le <strong>kernel ROOT C++</strong>, qui vous permet d'ecrire et d'executer du code C++ de maniere interactive dans la meme interface navigateur.</p>
      <p>Toutes les bibliotheques standard de ROOT et les tutoriels sont disponibles immediatement, sans rien a installer ni a configurer. Vous pouvez egalement combiner ROOT avec d'autres bibliotheques scientifiques Python comme NumPy, pandas et matplotlib dans le meme notebook, ce qui vous donne acces a un large ecosysteme d'outils pour l'analyse et la visualisation.</p>

      <h2>Stockage et integration EOS</h2>
      <p>SWAN s'integre directement avec le systeme de stockage distribue <strong>EOS</strong> du CERN via <strong>CERNBox</strong>. Tous vos notebooks SWAN sont stockes dans votre espace CERNBox, ce qui signifie qu'ils sont automatiquement sauvegardes et accessibles depuis n'importe quel appareil disposant d'un navigateur. Dans un notebook, vous pouvez acceder a n'importe quel chemin EOS en utilisant les operations standard sur les fichiers Python ou <code>TFile::Open</code> de ROOT, sans avoir besoin de copier les donnees sur un disque local avant de travailler dessus.</p>
      <p>Cette integration etroite simplifie egalement le partage : vous pouvez donner acces a vos notebooks a vos collegues simplement en partageant le dossier CERNBox correspondant. Les fichiers de donnees volumineux stockes n'importe ou sur EOS peuvent etre lus directement depuis vos notebooks sans les telecharger localement, ce qui est particulierement utile pour les jeux de donnees d'experiences qu'il serait peu pratique de dupliquer.</p>

      <h2>Partage et collaboration</h2>
      <p>SWAN offre plusieurs moyens de partager votre travail et de collaborer avec d'autres. L'approche la plus directe est le <strong>partage via CERNBox</strong> : en partageant le dossier CERNBox contenant vos notebooks, vos collegues recoivent un lien direct et peuvent ouvrir votre travail dans leurs propres sessions SWAN. Pour l'inspiration et l'apprentissage, la <strong>SWAN Gallery</strong> heberge des notebooks d'exemple publies par les experiences et les services du CERN, ou vous pouvez decouvrir des techniques d'analyse et des bonnes pratiques utilisees dans toute l'organisation.</p>
      <p>Lorsque la reproductibilite est importante, les <strong>Projets SWAN</strong> vous permettent de regrouper notebooks, fichiers de donnees et configuration de l'environnement dans un package autonome que d'autres peuvent lancer en un seul clic. Vous pouvez egalement exporter vos notebooks en HTML, PDF ou scripts Python, ce qui les rend adaptes aux presentations, rapports et documentation devant etre partages en dehors de la plateforme SWAN.</p>

      <h2>Conseils et bonnes pratiques</h2>
      <p>Bien que SWAN sauvegarde automatiquement vos notebooks periodiquement, c'est une bonne pratique de <strong>sauvegarder manuellement</strong> avant de lancer des calculs longs, afin de ne jamais risquer de perdre vos modifications recentes. Si vous avez besoin de paquets Python non inclus dans le stack LCG par defaut, vous pouvez configurer un <strong>environnement virtuel</strong> dans votre session SWAN et y installer des dependances supplementaires.</p>
      <p>Etant donne que les ressources de SWAN sont partagees entre tous les utilisateurs du CERN, pensez a <strong>fermer votre session</strong> lorsque vous avez termine de travailler afin que le CPU et la memoire soient liberes pour les autres. SWAN fournit egalement un <strong>acces aux terminaux</strong>, utile pour executer des outils en ligne de commande, gerer des fichiers sur EOS ou installer des paquets manuellement. Pour les dernieres fonctionnalites, les stacks logiciels supportes et les problemes connus, consultez regulierement la <a href="https://swan.docs.cern.ch" target="_blank" rel="noopener noreferrer">documentation de SWAN</a>.</p>
