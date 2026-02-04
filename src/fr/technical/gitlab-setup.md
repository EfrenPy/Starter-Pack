---
title: "CERN GitLab et workflow de développement - CERN Starter Pack"
description: "Guide de CERN GitLab, méthodes d’authentification, clés SSH, accès Git Kerberos, CI/CD et workflows de développement pour les nouveaux arrivants."
og:
  title: "CERN GitLab et workflow de développement - CERN Starter Pack"
  description: "Configurez votre compte CERN GitLab, configurez l’authentification et apprenez le workflow de développement standard au CERN."
breadcrumbs:
  - { label: "Accueil", url: "/fr/" }
  - { label: "Aide Technique", url: "/fr/technical-hub/" }
  - { label: "CERN GitLab" }
---

<h1>CERN GitLab et workflow de développement</h1>
      <h2>CERN GitLab vs GitHub</h2>
      <p>Le CERN héberge sa propre instance GitLab sur <a href="https://gitlab.cern.ch" target="_blank" rel="noopener noreferrer">gitlab.cern.ch</a>. C’est la plateforme principale pour le contrôle de version et la collaboration sur les projets logiciels du CERN. Contrairement à GitHub public, CERN GitLab est intégré au Single Sign-On (SSO) du CERN et est accessible à toute personne disposant d’un compte informatique CERN.</p>
      <p>Bien que de nombreux projets HEP open-source maintiennent également des miroirs sur GitHub, les dépôts faisant autorité pour les frameworks d’expériences, les outils internes et la gestion de configuration résident généralement sur CERN GitLab. Votre groupe ou expérience vous demandera probablement de l’utiliser pour le développement quotidien.</p>

      <h2>Méthodes d’authentification</h2>
      <p>CERN GitLab prend en charge plusieurs méthodes d’authentification :</p>
      <ul>
        <li><strong>CERN SSO (web) :</strong> Connectez-vous à l’interface web GitLab en utilisant vos identifiants CERN. C’est automatique si vous êtes déjà connecté au SSO CERN.</li>
        <li><strong>Clés SSH :</strong> La méthode privilégiée pour les opérations Git en ligne de commande. À configurer une fois et à utiliser sans saisir de mots de passe.</li>
        <li><strong>Kerberos :</strong> Clonez et poussez en utilisant votre ticket Kerberos via le schéma d’URL <code>https://:@gitlab.cern.ch:8443/</code>.</li>
        <li><strong>Jeton d’accès personnel (PAT) :</strong> Générez un jeton dans les paramètres GitLab pour l’authentification HTTPS. Utile pour les scripts et les intégrations CI/CD.</li>
      </ul>
      <h2>Configuration des clés SSH pour GitLab</h2>
      <p>Générez une paire de clés SSH si vous n’en avez pas déjà une :</p>
      <pre><code>ssh-keygen -t ed25519 -C "your.name@cern.ch"</code></pre>
      <p>Copiez la clé publique dans votre presse-papiers :</p>
      <pre><code>cat ~/.ssh/id_ed25519.pub</code></pre>
      <p>Puis ajoutez-la à votre compte CERN GitLab :</p>
      <ol>
        <li>Rendez-vous sur <a href="https://gitlab.cern.ch/-/user_settings/ssh_keys" target="_blank" rel="noopener noreferrer">gitlab.cern.ch/-/user_settings/ssh_keys</a></li>
        <li>Collez votre clé publique dans le champ « Key »</li>
        <li>Donnez-lui un titre descriptif (par ex. « Laptop - Ubuntu 2026 »)</li>
        <li>Cliquez sur « Add key »</li>
      </ol>
      <p>Testez la connexion :</p>
      <pre><code>ssh -T git@gitlab.cern.ch</code></pre>
      <p>Ajoutez ceci à votre <code>~/.ssh/config</code> pour plus de commodité :</p>
      <pre><code>Host gitlab.cern.ch
    User git
    IdentityFile ~/.ssh/id_ed25519
    PreferredAuthentications publickey</code></pre>

      <h2>Authentification Kerberos pour Git</h2>
      <p>Si vous préférez utiliser Kerberos au lieu des clés SSH, vous pouvez cloner des dépôts en utilisant le point de terminaison HTTPS authentifié par Kerberos sur le port 8443 :</p>
      <pre><code># D’abord, obtenir un ticket Kerberos
kinit username@CERN.CH

# Cloner en utilisant l’URL Kerberos
git clone https://:@gitlab.cern.ch:8443/group/project.git</code></pre>
      <p>Cette méthode est particulièrement pratique sur lxplus où vous disposez déjà d’un ticket Kerberos. Aucune configuration supplémentaire n’est nécessaire au-delà d’un ticket valide.</p>
      <h2>Workflow Git de base au CERN</h2>
      <p>La plupart des projets CERN suivent un workflow basé sur les merge requests similaire au flux GitLab standard :</p>
      <ol>
        <li><strong>Fork ou branche :</strong> Créez un fork personnel du projet ou une branche de fonctionnalité (selon les conventions de votre projet).</li>
        <li><strong>Développez localement :</strong> Clonez le dépôt, créez une branche, effectuez vos modifications et committez.</li>
        <li><strong>Poussez :</strong> Poussez votre branche vers votre fork ou le dépôt en amont.</li>
        <li><strong>Ouvrez une Merge Request (MR) :</strong> Sur l’interface web GitLab, créez une merge request ciblant la branche principale. Ajoutez une description, assignez des réviseurs.</li>
        <li><strong>Revue de code :</strong> Répondez aux retours, poussez des commits supplémentaires si nécessaire.</li>
        <li><strong>Fusionnez :</strong> Une fois approuvée, la MR est fusionnée (généralement par le mainteneur ou par vous-même si vous avez les permissions).</li>
      </ol>
      <pre><code># Commandes de workflow typiques
git clone git@gitlab.cern.ch:group/project.git
cd project
git checkout -b my-feature
# ... effectuez vos modifications ...
git add -A && git commit -m "Add new feature"
git push origin my-feature
# Puis ouvrez une MR sur l’interface web GitLab</code></pre>

      <h2>CI/CD sur CERN GitLab</h2>
      <p>CERN GitLab fournit des pipelines CI/CD intégrés alimentés par des GitLab Runners. De nombreux runners partagés sont disponibles, y compris des runners pouvant accéder à CVMFS pour les logiciels d’expérience. Pour configurer le CI/CD de votre projet, créez un fichier <code>.gitlab-ci.yml</code> à la racine du dépôt :</p>
      <pre><code>stages:
  - build
  - test

build-job:
  stage: build
  image: gitlab-registry.cern.ch/linuxsupport/alma9-base
  script:
    - source /cvmfs/sft.cern.ch/lcg/views/LCG_105/x86_64-el9-gcc13-opt/setup.sh
    - mkdir build && cd build
    - cmake .. && make

test-job:
  stage: test
  image: gitlab-registry.cern.ch/linuxsupport/alma9-base
  script:
    - source /cvmfs/sft.cern.ch/lcg/views/LCG_105/x86_64-el9-gcc13-opt/setup.sh
    - cd build && ctest</code></pre>
      <p>Le CERN fournit des runners partagés avec des tags comme <code>cvmfs</code> pour accéder aux piles logicielles d’expérience. Vérifiez les paramètres CI de votre projet ou demandez à votre équipe la configuration de runner préférée.</p>

      <h2>Dépôts utiles pour les nouveaux arrivants</h2>
      <p>Voici quelques dépôts et groupes couramment référencés sur CERN GitLab :</p>
      <ul>
        <li><strong>Frameworks d’expérience :</strong> Chaque grande expérience (ATLAS, CMS, LHCb, ALICE) a son propre groupe GitLab contenant les frameworks d’analyse et de reconstruction. Demandez à votre superviseur les dépôts spécifiques dont vous avez besoin.</li>
        <li><strong>Outils CERN IT :</strong> Les groupes <code>cern-it</code> et <code>linuxsupport</code> contiennent des outils d’infrastructure, des images de conteneurs et des configurations système.</li>
        <li><strong>Projet ROOT :</strong> Le framework ROOT lui-même est développé sur GitHub (<a href="https://github.com/root-project/root" target="_blank" rel="noopener noreferrer">github.com/root-project/root</a>) mais de nombreux outils et packages basés sur ROOT résident sur CERN GitLab.</li>
        <li><strong>Projets de documentation :</strong> De nombreux groupes maintiennent leur documentation sous forme de sites GitLab Pages (utilisant mkdocs, sphinx ou similaire). Explorez le groupe de documentation de votre expérience pour des guides et tutoriels.</li>
      </ul>
