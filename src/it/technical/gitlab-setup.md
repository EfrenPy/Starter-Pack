---
title: "CERN GitLab e Workflow di Sviluppo - CERN Starter Pack"
description: "Guida a CERN GitLab, metodi di autenticazione, chiavi SSH, accesso Git tramite Kerberos, CI/CD e workflow di sviluppo per i nuovi arrivati."
og:
  title: "CERN GitLab e Workflow di Sviluppo - CERN Starter Pack"
  description: "Configurare il proprio account CERN GitLab, impostare l'autenticazione e apprendere il workflow di sviluppo standard al CERN."
breadcrumbs:
  - { label: "Home", url: "/it/" }
  - { label: "Aiuto Tecnico", url: "/it/technical-hub/" }
  - { label: "CERN GitLab" }
---

# CERN GitLab e Workflow di Sviluppo

## CERN GitLab vs GitHub

Il CERN ospita la propria istanza GitLab all'indirizzo <a href="https://gitlab.cern.ch" target="_blank" rel="noopener noreferrer">gitlab.cern.ch</a>. Questa è la piattaforma principale per il controllo di versione e la collaborazione sui progetti software del CERN. A differenza del GitHub pubblico, il GitLab del CERN è integrato con il Single Sign-On (SSO) del CERN ed è accessibile a chiunque possieda un account informatico CERN.

Sebbene molti progetti HEP open-source mantengano anche mirror su GitHub, i repository autorevoli per i framework degli esperimenti, gli strumenti interni e la gestione delle configurazioni risiedono tipicamente sul GitLab del CERN. Il proprio gruppo o esperimento richiederà probabilmente di utilizzarlo per lo sviluppo quotidiano.

## Metodi di autenticazione

Il GitLab del CERN supporta diversi metodi di autenticazione:

- **CERN SSO (web):** Accedere all'interfaccia web di GitLab utilizzando le proprie credenziali CERN. L'accesso è automatico se si è già autenticati con il CERN SSO.
- **Chiavi SSH:** Il metodo preferito per le operazioni Git da riga di comando. Da configurare una sola volta per poi utilizzarlo senza inserire password.
- **Kerberos:** Clonare e fare push utilizzando il proprio ticket Kerberos tramite lo schema URL `https://:@gitlab.cern.ch:8443/`.
- **Personal Access Token (PAT):** Generare un token nelle impostazioni di GitLab per l'autenticazione basata su HTTPS. Utile per script e integrazioni CI/CD.

## Configurazione delle chiavi SSH per GitLab

Generare una coppia di chiavi SSH se non se ne possiede già una:

```
ssh-keygen -t ed25519 -C "your.name@cern.ch"
```

Copiare la chiave pubblica negli appunti:

```
cat ~/.ssh/id_ed25519.pub
```

Quindi aggiungerla al proprio account CERN GitLab:

1. Andare su <a href="https://gitlab.cern.ch/-/user_settings/ssh_keys" target="_blank" rel="noopener noreferrer">gitlab.cern.ch/-/user_settings/ssh_keys</a>
2. Incollare la chiave pubblica nel campo "Key"
3. Assegnare un titolo descrittivo (ad es. "Portatile - Ubuntu 2026")
4. Fare clic su "Add key"

Testare la connessione:

```
ssh -T git@gitlab.cern.ch
```

Aggiungere questo al proprio `~/.ssh/config` per comodità:

```
Host gitlab.cern.ch
User git
IdentityFile ~/.ssh/id_ed25519
PreferredAuthentications publickey
```

## Autenticazione Kerberos per Git

Se si preferisce utilizzare Kerberos al posto delle chiavi SSH, è possibile clonare i repository utilizzando l'endpoint HTTPS autenticato tramite Kerberos sulla porta 8443:

```
# Prima, ottenere un ticket Kerberos
kinit username@CERN.CH

# Clonare utilizzando l'URL Kerberos
git clone https://:@gitlab.cern.ch:8443/group/project.git
```

Questo metodo è particolarmente comodo su lxplus dove si dispone già di un ticket Kerberos. Non è necessaria alcuna configurazione aggiuntiva oltre a un ticket valido.

## Workflow Git di base al CERN

La maggior parte dei progetti del CERN segue un workflow basato su merge request simile al flusso standard di GitLab:

1. **Fork o branch:** Creare un fork personale del progetto o un branch per la funzionalità (a seconda delle convenzioni del progetto).
2. **Sviluppo locale:** Clonare il repository, creare un branch, apportare le modifiche e fare commit.
3. **Push:** Fare push del branch verso il proprio fork o il repository upstream.
4. **Aprire una Merge Request (MR):** Nell'interfaccia web di GitLab, creare una merge request verso il branch principale. Aggiungere una descrizione, assegnare i revisori.
5. **Code review:** Rispondere ai feedback, fare push di commit aggiuntivi se necessario.
6. **Merge:** Una volta approvata, la MR viene integrata (generalmente dal maintainer o da voi stessi se si hanno i permessi).

```
# Comandi tipici del workflow
git clone git@gitlab.cern.ch:group/project.git
cd project
git checkout -b my-feature
# ... apportare modifiche ...
git add -A && git commit -m "Add new feature"
git push origin my-feature
# Quindi aprire la MR dall'interfaccia web di GitLab
```

## CI/CD su CERN GitLab

Il GitLab del CERN fornisce pipeline CI/CD integrate alimentate da GitLab Runner. Sono disponibili numerosi runner condivisi, inclusi runner che possono accedere a CVMFS per il software degli esperimenti. Per configurare la CI/CD per il proprio progetto, creare un file `.gitlab-ci.yml` nella radice del repository:

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

Il CERN fornisce runner condivisi con tag come `cvmfs` per accedere agli stack software degli esperimenti. Verificare le impostazioni CI del proprio progetto o chiedere al team la configurazione runner preferita.

## Repository utili per i nuovi arrivati

Ecco alcuni repository e gruppi comunemente consultati sul GitLab del CERN:

- **Framework degli esperimenti:** Ogni grande esperimento (ATLAS, CMS, LHCb, ALICE) ha il proprio gruppo GitLab contenente i framework di analisi e ricostruzione. Chiedere al proprio supervisore i repository specifici necessari.
- **Strumenti IT del CERN:** I gruppi `cern-it` e `linuxsupport` contengono strumenti infrastrutturali, immagini container e configurazioni di sistema.
- **Progetto ROOT:** Il framework ROOT stesso è sviluppato su GitHub (<a href="https://github.com/root-project/root" target="_blank" rel="noopener noreferrer">github.com/root-project/root</a>), ma molti strumenti e pacchetti basati su ROOT risiedono sul GitLab del CERN.
- **Progetti di documentazione:** Molti gruppi mantengono la propria documentazione come siti GitLab Pages (usando mkdocs, sphinx o simili). Esplorare il gruppo di documentazione del proprio esperimento per guide e tutorial.
