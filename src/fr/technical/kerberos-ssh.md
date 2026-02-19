---
title: "Configuration Kerberos et SSH pour le CERN - CERN Starter Pack"
description: "Guide complet pour configurer l’authentification Kerberos et l’accès SSH à CERN lxplus sous Linux, macOS et Windows/WSL."
og:
  title: "Configuration Kerberos et SSH pour le CERN - CERN Starter Pack"
  description: "Guide pas à pas pour configurer Kerberos et SSH afin d’accéder à CERN lxplus et aux services associés."
breadcrumbs:
  - { label: "Accueil", url: "/fr/" }
  - { label: "Aide Technique", url: "/fr/technical-hub/" }
  - { label: "Configuration Kerberos et SSH" }
---

# Configuration Kerberos et SSH pour le CERN

<div class="alert">
<p>Ce guide couvre la configuration de Kerberos et SSH pour <strong>Linux</strong>, <strong>macOS</strong> et <strong>Windows via WSL</strong>. Choisissez la section correspondant à votre système d’exploitation.</p>
</div>

## Qu’est-ce que Kerberos et pourquoi le CERN l’utilise

Kerberos est un protocole d’authentification réseau qui utilise des tickets pour prouver l’identité sans envoyer de mots de passe sur le réseau. Le CERN exploite le domaine Kerberos `CERN.CH` pour l’authentification centralisée à travers son infrastructure informatique.

Lorsque vous vous authentifiez avec Kerberos, vous recevez un ticket d’octroi de tickets (TGT) à durée limitée qui vous permet d’accéder aux services du CERN tels que lxplus, AFS, EOS et GitLab sans ressaisir votre mot de passe à chaque fois. Ce système basé sur les tickets est fondamental pour travailler au CERN.

## Configuration Linux

Installez les outils client Kerberos sur les distributions basées sur Debian/Ubuntu :

```
sudo apt update && sudo apt install krb5-user
```

Puis configurez `/etc/krb5.conf` avec les paramètres du domaine CERN. Remplacez le contenu du fichier (ou créez-le) avec :

```
[libdefaults]
default_realm = CERN.CH
ticket_lifetime = 25h
renew_lifetime = 120h
forwardable = true
proxiable = true

[realms]
CERN.CH = {
kdc = cerndc.cern.ch
master_kdc = cerndc.cern.ch
default_domain = cern.ch
kpasswd_server = afskrb5m.cern.ch
admin_server = afskrb5m.cern.ch
}

[domain_realm]
.cern.ch = CERN.CH
cern.ch = CERN.CH
```

Sur Fedora/RHEL, installez avec `sudo dnf install krb5-workstation`. Le fichier `krb5.conf` est identique.

## Configuration macOS

macOS est livré avec une implémentation Kerberos intégrée (Heimdal). Vous n’avez pas besoin d’installer de paquets supplémentaires. Créez ou éditez simplement le fichier `/etc/krb5.conf` avec la même configuration que celle présentée dans la section Linux ci-dessus.

Sur les versions récentes de macOS, vous pourriez avoir besoin d’utiliser `sudo` pour éditer les fichiers dans `/etc/`. Notez également que Heimdal sur macOS peut gérer le renouvellement des tickets légèrement différemment ; si vous rencontrez des problèmes, essayez d’ajouter `renewable = true` dans la section `[libdefaults]`.

## Configuration Windows / WSL

Sous Windows, l’approche recommandée est d’utiliser WSL (Sous-système Windows pour Linux). Dans votre distribution WSL (par ex. Ubuntu), installez et configurez Kerberos exactement comme décrit dans la section Linux ci-dessus.

Si vous souhaitez également utiliser VS Code Remote pour vous connecter à lxplus, consultez le [guide VS Code Remote via WSL](vscode-remote/) pour des instructions complémentaires sur la configuration SSH via WSL.

## Obtenir un ticket Kerberos

Une fois votre configuration en place, utilisez ces commandes pour gérer les tickets Kerberos :

```
# Obtenir un nouveau ticket (votre mot de passe CERN vous sera demandé)
kinit username@CERN.CH

# Lister les tickets actuels et les heures d’expiration
klist

# Renouveler un ticket existant (avant son expiration)
kinit -R

# Détruire tous les tickets (déconnexion)
kdestroy
```

Remplacez `username` par votre nom de compte CERN. Les tickets sont valides 25 heures par défaut et renouvelables jusqu’à 5 jours, comme spécifié dans la configuration ci-dessus.

## Configuration SSH pour lxplus

Pour vous connecter à lxplus en utilisant votre ticket Kerberos (sans mot de passe), ajoutez ce qui suit à votre fichier `~/.ssh/config` :

```
Host lxplus
HostName lxplus.cern.ch
User yourusername
GSSAPIAuthentication yes
GSSAPIDelegateCredentials yes
GSSAPITrustDns yes
ForwardAgent yes
```

Avec cette configuration et un ticket Kerberos valide, vous pouvez simplement exécuter `ssh lxplus` et vous serez authentifié automatiquement via GSSAPI (Kerberos). Remplacez `yourusername` par votre identifiant CERN.

## Tunnel SSH et accès hors site

Lorsque vous travaillez en dehors du réseau CERN, vous pourriez avoir besoin d’utiliser `lxtunnel.cern.ch` comme hôte de rebond. Ajoutez ceci à votre `~/.ssh/config` :

```
Host lxtunnel
HostName lxtunnel.cern.ch
User yourusername
GSSAPIAuthentication yes
GSSAPIDelegateCredentials yes

Host lxplus-tunnel
HostName lxplus.cern.ch
User yourusername
ProxyJump lxtunnel
GSSAPIAuthentication yes
GSSAPIDelegateCredentials yes
```

Vous pouvez également configurer un proxy SOCKS via lxplus pour accéder aux services web internes du CERN depuis l’extérieur :

```
ssh -D 1080 -N lxplus
```

Configurez ensuite votre navigateur pour utiliser `localhost:1080` comme proxy SOCKS5 afin d’accéder aux pages internes du CERN.

## Keytab pour l’accès automatisé

Pour les scripts ou processus automatisés nécessitant une authentification Kerberos sans connexion interactive, vous pouvez créer un fichier keytab :

```
cern-get-keytab --keytab ~/private/keytab --login --user yourusername
```

Puis obtenez un ticket de manière non interactive avec :

```
kinit -kt ~/private/keytab yourusername@CERN.CH
```

<div class="alert">
<p><strong>Avertissement de sécurité :</strong> Un fichier keytab équivaut à un mot de passe stocké. Protégez-le avec des permissions strictes (<code>chmod 600</code>) et ne le partagez jamais ni ne le committez dans un système de contrôle de version.</p>
</div>

## Accès à EOS et AFS

Avec un ticket Kerberos valide, vous pouvez accéder aux systèmes de stockage du CERN :

**EOS** (le stockage distribué du CERN) est accessible sur lxplus avec l’outil en ligne de commande `eos` :

```
# Lister votre répertoire personnel EOS
eos ls /eos/user/u/username/

# Copier un fichier vers EOS
eos cp localfile.txt /eos/user/u/username/

# Monter EOS via FUSE (si disponible)
mkdir -p ~/eos
eosfusebind ~/eos
```

**AFS** (Andrew File System) nécessite un jeton AFS, que vous obtenez à partir de votre ticket Kerberos :

```
# Obtenir un jeton AFS à partir de votre ticket Kerberos
aklog

# Accéder à votre espace de travail AFS
ls /afs/cern.ch/user/u/username/
```

## Dépannage

- **kinit: Cannot find KDC for realm CERN.CH** — Votre `/etc/krb5.conf` est manquant ou mal configuré. Vérifiez que le fichier existe et contient les bons paramètres de domaine.
- **kinit: Client not found in Kerberos database** — Vérifiez que vous utilisez le bon nom d’utilisateur CERN et que le domaine est `CERN.CH` (en majuscules).
- **Permission denied (GSSAPI)** — Exécutez `klist` pour vérifier si votre ticket est valide et non expiré. Exécutez `kinit` à nouveau si nécessaire.
- **Ticket expiré ou impossible à renouveler** — Si votre ticket est expiré depuis trop longtemps, le renouvellement échouera. Exécutez `kdestroy` suivi de `kinit` pour obtenir un nouveau ticket.
- **Connexion SSH refusée hors site** — Le CERN restreint l’accès SSH direct depuis l’extérieur de son réseau. Utilisez la configuration ProxyJump lxtunnel décrite ci-dessus.
- **Clock skew too great** — Kerberos nécessite des horloges synchronisées. Assurez-vous que l’horloge de votre système est correcte (utilisez NTP). Un décalage de plus de 5 minutes provoquera des échecs d’authentification.

## Carte de référence rapide

<table class="quick-ref">
<thead>
  <tr>
    <th>Tâche</th>
    <th>Commande</th>
  </tr>
</thead>
<tbody>
  <tr><td>Obtenir un ticket Kerberos</td><td><code>kinit user@CERN.CH</code></td></tr>
  <tr><td>Lister les tickets actuels</td><td><code>klist</code></td></tr>
  <tr><td>Renouveler un ticket</td><td><code>kinit -R</code></td></tr>
  <tr><td>Détruire les tickets</td><td><code>kdestroy</code></td></tr>
  <tr><td>SSH vers lxplus</td><td><code>ssh lxplus</code></td></tr>
  <tr><td>SSH via tunnel (hors site)</td><td><code>ssh lxplus-tunnel</code></td></tr>
  <tr><td>Proxy SOCKS</td><td><code>ssh -D 1080 -N lxplus</code></td></tr>
  <tr><td>Obtenir un jeton AFS</td><td><code>aklog</code></td></tr>
  <tr><td>Lister les fichiers EOS</td><td><code>eos ls /eos/user/u/user/</code></td></tr>
  <tr><td>Créer un keytab</td><td><code>cern-get-keytab --keytab ~/private/keytab --login --user user</code></td></tr>
</tbody>
</table>

## Références

- <a href="https://cern.service-now.com/service-portal?id=kb_article&n=KB0003388" target="_blank" rel="noopener noreferrer">Documentation de configuration Kerberos du CERN</a>
- <a href="https://information-technology.web.cern.ch/services/lxplus-service" target="_blank" rel="noopener noreferrer">Service lxplus du CERN</a>
- <a href="https://information-technology.web.cern.ch/services/eos-service" target="_blank" rel="noopener noreferrer">Service de stockage EOS du CERN</a>
- <a href="https://information-technology.web.cern.ch/services/afs-service" target="_blank" rel="noopener noreferrer">Service AFS du CERN</a>
- <a href="https://security.web.cern.ch/recommendations/en/ssh_keys.shtml" target="_blank" rel="noopener noreferrer">Recommandations du CERN pour les clés SSH</a>
