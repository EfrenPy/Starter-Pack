---
title: "Configurazione Kerberos e SSH per il CERN - CERN Starter Pack"
description: "Guida completa alla configurazione dell'autenticazione Kerberos e dell'accesso SSH per CERN lxplus su Linux, macOS e Windows/WSL."
og:
  title: "Configurazione Kerberos e SSH per il CERN - CERN Starter Pack"
  description: "Guida passo-passo per configurare Kerberos e SSH per accedere a CERN lxplus e servizi correlati."
breadcrumbs:
  - { label: "Home", url: "/it/" }
  - { label: "Aiuto Tecnico", url: "/it/technical-hub/" }
  - { label: "Configurazione Kerberos e SSH" }
---

# Configurazione Kerberos e SSH per il CERN

<div class="alert">
<p>Questa guida copre la configurazione di Kerberos e SSH per <strong>Linux</strong>, <strong>macOS</strong> e <strong>Windows tramite WSL</strong>. Scegliere la sezione corrispondente al proprio sistema operativo.</p>
</div>

## Cos'è Kerberos e perché il CERN lo utilizza

Kerberos è un protocollo di autenticazione di rete che utilizza ticket per comprovare l'identità senza inviare password sulla rete. Il CERN gestisce il realm Kerberos `CERN.CH` per l'autenticazione centralizzata dell'intera infrastruttura informatica.

Quando ci si autentica con Kerberos, si riceve un ticket-granting ticket (TGT) a tempo limitato che consente di accedere ai servizi del CERN come lxplus, AFS, EOS e GitLab senza dover reinserire la password ogni volta. Questo sistema basato su ticket è fondamentale per lavorare al CERN.

## Configurazione Linux

Installare gli strumenti client Kerberos sulle distribuzioni basate su Debian/Ubuntu:

```
sudo apt update && sudo apt install krb5-user
```

Quindi configurare `/etc/krb5.conf` con le impostazioni del realm CERN. Sostituire il contenuto del file (o crearlo) con:

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

Su Fedora/RHEL, installare con `sudo dnf install krb5-workstation`. Il file `krb5.conf` è identico.

## Configurazione macOS

macOS include un'implementazione Kerberos integrata (Heimdal). Non è necessario installare pacchetti aggiuntivi. È sufficiente creare o modificare il file `/etc/krb5.conf` con la stessa configurazione mostrata nella sezione Linux sopra.

Sulle versioni recenti di macOS potrebbe essere necessario usare `sudo` per modificare i file in `/etc/`. Si noti inoltre che Heimdal su macOS potrebbe gestire il rinnovo dei ticket in modo leggermente diverso; in caso di problemi, provare a impostare `renewable = true` nella sezione `[libdefaults]`.

## Configurazione Windows / WSL

Su Windows, l'approccio consigliato è utilizzare WSL (Windows Subsystem for Linux). All'interno della distribuzione WSL (ad es. Ubuntu), installare e configurare Kerberos esattamente come descritto nella sezione Linux sopra.

Se si desidera utilizzare anche VS Code Remote per connettersi a lxplus, consultare la [guida VS Code Remote tramite WSL](vscode-remote/) per istruzioni complementari sulla configurazione SSH tramite WSL.

## Ottenere un ticket Kerberos

Una volta completata la configurazione, utilizzare questi comandi per gestire i ticket Kerberos:

```
# Ottenere un nuovo ticket (verrà richiesta la password CERN)
kinit username@CERN.CH

# Elencare i ticket attuali e i tempi di scadenza
klist

# Rinnovare un ticket esistente (prima della scadenza)
kinit -R

# Distruggere tutti i ticket (disconnessione)
kdestroy
```

Sostituire `username` con il proprio nome account CERN. I ticket sono validi per 25 ore di default e rinnovabili fino a 5 giorni, come specificato nella configurazione sopra.

## Configurazione SSH per lxplus

Per connettersi a lxplus utilizzando il proprio ticket Kerberos (senza necessità di password), aggiungere quanto segue al file `~/.ssh/config`:

```
Host lxplus
HostName lxplus.cern.ch
User yourusername
GSSAPIAuthentication yes
GSSAPIDelegateCredentials yes
GSSAPITrustDns yes
ForwardAgent yes
```

Con questa configurazione e un ticket Kerberos valido, è sufficiente eseguire `ssh lxplus` per autenticarsi automaticamente tramite GSSAPI (Kerberos). Sostituire `yourusername` con il proprio login CERN.

## Tunneling SSH e accesso da remoto

Quando si lavora al di fuori della rete CERN, potrebbe essere necessario utilizzare `lxtunnel.cern.ch` come host di salto. Aggiungere quanto segue al file `~/.ssh/config`:

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

È anche possibile configurare un proxy SOCKS tramite lxplus per accedere ai servizi web interni del CERN da remoto:

```
ssh -D 1080 -N lxplus
```

Quindi configurare il browser per utilizzare `localhost:1080` come proxy SOCKS5 per raggiungere le pagine interne del CERN.

## Keytab per accesso automatizzato

Per script o processi automatizzati che necessitano di autenticazione Kerberos senza login interattivo, è possibile creare un file keytab:

```
cern-get-keytab --keytab ~/private/keytab --login --user yourusername
```

Quindi ottenere un ticket in modo non interattivo con:

```
kinit -kt ~/private/keytab yourusername@CERN.CH
```

<div class="alert">
<p><strong>Avvertenza di sicurezza:</strong> Un file keytab equivale a una password memorizzata. Proteggerlo con permessi di file restrittivi (<code>chmod 600</code>) e non condividerlo mai né includerlo nel controllo di versione.</p>
</div>

## Accesso a EOS e AFS

Con un ticket Kerberos valido, è possibile accedere ai sistemi di archiviazione del CERN:

**EOS** (archiviazione distribuita del CERN) è accessibile su lxplus con lo strumento da riga di comando `eos`:

```
# Elencare la propria directory home su EOS
eos ls /eos/user/u/username/

# Copiare un file su EOS
eos cp localfile.txt /eos/user/u/username/

# Montare EOS tramite FUSE (se disponibile)
mkdir -p ~/eos
eosfusebind ~/eos
```

**AFS** (Andrew File System) richiede un token AFS, che si ottiene dal ticket Kerberos:

```
# Ottenere un token AFS dal ticket Kerberos
aklog

# Accedere al proprio spazio di lavoro AFS
ls /afs/cern.ch/user/u/username/
```

## Risoluzione dei problemi

- **kinit: Cannot find KDC for realm CERN.CH** — Il file `/etc/krb5.conf` è mancante o mal configurato. Verificare che il file esista e contenga le impostazioni corrette del realm.
- **kinit: Client not found in Kerberos database** — Verificare di utilizzare il nome utente CERN corretto e che il realm sia `CERN.CH` (maiuscolo).
- **Permission denied (GSSAPI)** — Eseguire `klist` per verificare se il ticket è valido e non scaduto. Eseguire `kinit` nuovamente se necessario.
- **Ticket expired or cannot renew** — Se il ticket è scaduto da troppo tempo, il rinnovo non sarà possibile. Eseguire `kdestroy` seguito da `kinit` per ottenere un nuovo ticket.
- **SSH connection refused off-site** — Il CERN limita l'accesso SSH diretto dall'esterno della propria rete. Utilizzare la configurazione ProxyJump con lxtunnel descritta sopra.
- **Clock skew too great** — Kerberos richiede orologi sincronizzati. Assicurarsi che l'orologio di sistema sia corretto (utilizzare NTP). Uno scarto superiore a 5 minuti causerà errori di autenticazione.

## Scheda di riferimento rapido

<table class="quick-ref">
<thead>
  <tr>
    <th>Operazione</th>
    <th>Comando</th>
  </tr>
</thead>
<tbody>
  <tr><td>Ottenere un ticket Kerberos</td><td><code>kinit user@CERN.CH</code></td></tr>
  <tr><td>Elencare i ticket attuali</td><td><code>klist</code></td></tr>
  <tr><td>Rinnovare il ticket</td><td><code>kinit -R</code></td></tr>
  <tr><td>Distruggere i ticket</td><td><code>kdestroy</code></td></tr>
  <tr><td>SSH verso lxplus</td><td><code>ssh lxplus</code></td></tr>
  <tr><td>SSH tramite tunnel (da remoto)</td><td><code>ssh lxplus-tunnel</code></td></tr>
  <tr><td>Proxy SOCKS</td><td><code>ssh -D 1080 -N lxplus</code></td></tr>
  <tr><td>Ottenere token AFS</td><td><code>aklog</code></td></tr>
  <tr><td>Elencare file EOS</td><td><code>eos ls /eos/user/u/user/</code></td></tr>
  <tr><td>Creare keytab</td><td><code>cern-get-keytab --keytab ~/private/keytab --login --user user</code></td></tr>
</tbody>
</table>

## Riferimenti

- <a href="https://cern.service-now.com/service-portal?id=kb_article&n=KB0003388" target="_blank" rel="noopener noreferrer">Documentazione Configurazione Kerberos del CERN</a>
- <a href="https://information-technology.web.cern.ch/services/lxplus-service" target="_blank" rel="noopener noreferrer">Servizio lxplus del CERN</a>
- <a href="https://information-technology.web.cern.ch/services/eos-service" target="_blank" rel="noopener noreferrer">Servizio di Archiviazione EOS del CERN</a>
- <a href="https://information-technology.web.cern.ch/services/afs-service" target="_blank" rel="noopener noreferrer">Servizio AFS del CERN</a>
- <a href="https://security.web.cern.ch/recommendations/en/ssh_keys.shtml" target="_blank" rel="noopener noreferrer">Raccomandazioni SSH del CERN</a>
