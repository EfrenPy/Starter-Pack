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

# CERN GitLab et workflow de développement

## CERN GitLab vs GitHub

Le CERN héberge sa propre instance GitLab sur <a href="https://gitlab.cern.ch" target="_blank" rel="noopener noreferrer">gitlab.cern.ch</a>. C’est la plateforme principale pour le contrôle de version et la collaboration sur les projets logiciels du CERN. Contrairement à GitHub public, CERN GitLab est intégré au Single Sign-On (SSO) du CERN et est accessible à toute personne disposant d’un compte informatique CERN.

Bien que de nombreux projets HEP open-source maintiennent également des miroirs sur GitHub, les dépôts faisant autorité pour les frameworks d’expériences, les outils internes et la gestion de configuration résident généralement sur CERN GitLab. Votre groupe ou expérience vous demandera probablement de l’utiliser pour le développement quotidien.

## Méthodes d’authentification

CERN GitLab prend en charge plusieurs méthodes d’authentification :

- **CERN SSO (web) :** Connectez-vous à l’interface web GitLab en utilisant vos identifiants CERN. C’est automatique si vous êtes déjà connecté au SSO CERN.
- **Clés SSH :** La méthode privilégiée pour les opérations Git en ligne de commande. À configurer une fois et à utiliser sans saisir de mots de passe.
- **Kerberos :** Clonez et poussez en utilisant votre ticket Kerberos via le schéma d’URL `https://:@gitlab.cern.ch:8443/`.
- **Jeton d’accès personnel (PAT) :** Générez un jeton dans les paramètres GitLab pour l’authentification HTTPS. Utile pour les scripts et les intégrations CI/CD.

## Configuration des clés SSH pour GitLab

Générez une paire de clés SSH si vous n’en avez pas déjà une :

```
ssh-keygen -t ed25519 -C "your.name@cern.ch"
```

Copiez la clé publique dans votre presse-papiers :

```
cat ~/.ssh/id_ed25519.pub
```

Puis ajoutez-la à votre compte CERN GitLab :

1. Rendez-vous sur <a href="https://gitlab.cern.ch/-/user_settings/ssh_keys" target="_blank" rel="noopener noreferrer">gitlab.cern.ch/-/user_settings/ssh_keys</a>
2. Collez votre clé publique dans le champ « Key »
3. Donnez-lui un titre descriptif (par ex. « Laptop - Ubuntu 2026 »)
4. Cliquez sur « Add key »

Testez la connexion :

```
ssh -T git@gitlab.cern.ch
```

Ajoutez ceci à votre `~/.ssh/config` pour plus de commodité :

```
Host gitlab.cern.ch
User git
IdentityFile ~/.ssh/id_ed25519
PreferredAuthentications publickey
```

## Authentification Kerberos pour Git

Si vous préférez utiliser Kerberos au lieu des clés SSH, vous pouvez cloner des dépôts en utilisant le point de terminaison HTTPS authentifié par Kerberos sur le port 8443 :

```
# D’abord, obtenir un ticket Kerberos
kinit username@CERN.CH

# Cloner en utilisant l’URL Kerberos
git clone https://:@gitlab.cern.ch:8443/group/project.git
```

Cette méthode est particulièrement pratique sur lxplus où vous disposez déjà d’un ticket Kerberos. Aucune configuration supplémentaire n’est nécessaire au-delà d’un ticket valide.

## Workflow Git de base au CERN

La plupart des projets CERN suivent un workflow basé sur les merge requests similaire au flux GitLab standard :

1. **Fork ou branche :** Créez un fork personnel du projet ou une branche de fonctionnalité (selon les conventions de votre projet).
2. **Développez localement :** Clonez le dépôt, créez une branche, effectuez vos modifications et committez.
3. **Poussez :** Poussez votre branche vers votre fork ou le dépôt en amont.
4. **Ouvrez une Merge Request (MR) :** Sur l’interface web GitLab, créez une merge request ciblant la branche principale. Ajoutez une description, assignez des réviseurs.
5. **Revue de code :** Répondez aux retours, poussez des commits supplémentaires si nécessaire.
6. **Fusionnez :** Une fois approuvée, la MR est fusionnée (généralement par le mainteneur ou par vous-même si vous avez les permissions).

```
# Commandes de workflow typiques
git clone git@gitlab.cern.ch:group/project.git
cd project
git checkout -b my-feature
# ... effectuez vos modifications ...
git add -A && git commit -m "Add new feature"
git push origin my-feature
# Puis ouvrez une MR sur l’interface web GitLab
```

## CI/CD sur CERN GitLab

CERN GitLab fournit des pipelines CI/CD intégrés alimentés par des GitLab Runners. De nombreux runners partagés sont disponibles, y compris des runners pouvant accéder à CVMFS pour les logiciels d’expérience. Pour configurer le CI/CD de votre projet, créez un fichier `.gitlab-ci.yml` à la racine du dépôt :

```
stages:
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
- cd build && ctest
```

Le CERN fournit des runners partagés avec des tags comme `cvmfs` pour accéder aux piles logicielles d’expérience. Vérifiez les paramètres CI de votre projet ou demandez à votre équipe la configuration de runner préférée.

## Dépôts utiles pour les nouveaux arrivants

Voici quelques dépôts et groupes couramment référencés sur CERN GitLab :

- **Frameworks d’expérience :** Chaque grande expérience (ATLAS, CMS, LHCb, ALICE) a son propre groupe GitLab contenant les frameworks d’analyse et de reconstruction. Demandez à votre superviseur les dépôts spécifiques dont vous avez besoin.
- **Outils CERN IT :** Les groupes `cern-it` et `linuxsupport` contiennent des outils d’infrastructure, des images de conteneurs et des configurations système.
- **Projet ROOT :** Le framework ROOT lui-même est développé sur GitHub (<a href="https://github.com/root-project/root" target="_blank" rel="noopener noreferrer">github.com/root-project/root</a>) mais de nombreux outils et packages basés sur ROOT résident sur CERN GitLab.
- **Projets de documentation :** De nombreux groupes maintiennent leur documentation sous forme de sites GitLab Pages (utilisant mkdocs, sphinx ou similaire). Explorez le groupe de documentation de votre expérience pour des guides et tutoriels.
