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

<h1>Configurazione Kerberos e SSH per il CERN</h1>
      <div class="alert">
        <p>Questa guida copre la configurazione di Kerberos e SSH per <strong>Linux</strong>, <strong>macOS</strong> e <strong>Windows tramite WSL</strong>. Scegliere la sezione corrispondente al proprio sistema operativo.</p>
      </div>

      <h2>Cos'è Kerberos e perché il CERN lo utilizza</h2>
      <p>Kerberos è un protocollo di autenticazione di rete che utilizza ticket per comprovare l'identità senza inviare password sulla rete. Il CERN gestisce il realm Kerberos <code>CERN.CH</code> per l'autenticazione centralizzata dell'intera infrastruttura informatica.</p>
      <p>Quando ci si autentica con Kerberos, si riceve un ticket-granting ticket (TGT) a tempo limitato che consente di accedere ai servizi del CERN come lxplus, AFS, EOS e GitLab senza dover reinserire la password ogni volta. Questo sistema basato su ticket è fondamentale per lavorare al CERN.</p>

      <h2>Configurazione Linux</h2>
      <p>Installare gli strumenti client Kerberos sulle distribuzioni basate su Debian/Ubuntu:</p>
      <pre><code>sudo apt update &amp;&amp; sudo apt install krb5-user</code></pre>
      <p>Quindi configurare <code>/etc/krb5.conf</code> con le impostazioni del realm CERN. Sostituire il contenuto del file (o crearlo) con:</p>
      <pre><code>[libdefaults]
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
    cern.ch = CERN.CH</code></pre>
      <p>Su Fedora/RHEL, installare con <code>sudo dnf install krb5-workstation</code>. Il file <code>krb5.conf</code> è identico.</p>

      <h2>Configurazione macOS</h2>
      <p>macOS include un'implementazione Kerberos integrata (Heimdal). Non è necessario installare pacchetti aggiuntivi. È sufficiente creare o modificare il file <code>/etc/krb5.conf</code> con la stessa configurazione mostrata nella sezione Linux sopra.</p>
      <p>Sulle versioni recenti di macOS potrebbe essere necessario usare <code>sudo</code> per modificare i file in <code>/etc/</code>. Si noti inoltre che Heimdal su macOS potrebbe gestire il rinnovo dei ticket in modo leggermente diverso; in caso di problemi, provare a impostare <code>renewable = true</code> nella sezione <code>[libdefaults]</code>.</p>

      <h2>Configurazione Windows / WSL</h2>
      <p>Su Windows, l'approccio consigliato è utilizzare WSL (Windows Subsystem for Linux). All'interno della distribuzione WSL (ad es. Ubuntu), installare e configurare Kerberos esattamente come descritto nella sezione Linux sopra.</p>
      <p>Se si desidera utilizzare anche VS Code Remote per connettersi a lxplus, consultare la <a href="vscode-remote/">guida VS Code Remote tramite WSL</a> per istruzioni complementari sulla configurazione SSH tramite WSL.</p>

      <h2>Ottenere un ticket Kerberos</h2>
      <p>Una volta completata la configurazione, utilizzare questi comandi per gestire i ticket Kerberos:</p>
      <pre><code># Ottenere un nuovo ticket (verrà richiesta la password CERN)
kinit username@CERN.CH

# Elencare i ticket attuali e i tempi di scadenza
klist

# Rinnovare un ticket esistente (prima della scadenza)
kinit -R

# Distruggere tutti i ticket (disconnessione)
kdestroy</code></pre>
      <p>Sostituire <code>username</code> con il proprio nome account CERN. I ticket sono validi per 25 ore di default e rinnovabili fino a 5 giorni, come specificato nella configurazione sopra.</p>

      <h2>Configurazione SSH per lxplus</h2>
      <p>Per connettersi a lxplus utilizzando il proprio ticket Kerberos (senza necessità di password), aggiungere quanto segue al file <code>~/.ssh/config</code>:</p>
      <pre><code>Host lxplus
    HostName lxplus.cern.ch
    User yourusername
    GSSAPIAuthentication yes
    GSSAPIDelegateCredentials yes
    GSSAPITrustDns yes
    ForwardAgent yes</code></pre>
      <p>Con questa configurazione e un ticket Kerberos valido, è sufficiente eseguire <code>ssh lxplus</code> per autenticarsi automaticamente tramite GSSAPI (Kerberos). Sostituire <code>yourusername</code> con il proprio login CERN.</p>

      <h2>Tunneling SSH e accesso da remoto</h2>
      <p>Quando si lavora al di fuori della rete CERN, potrebbe essere necessario utilizzare <code>lxtunnel.cern.ch</code> come host di salto. Aggiungere quanto segue al file <code>~/.ssh/config</code>:</p>
      <pre><code>Host lxtunnel
    HostName lxtunnel.cern.ch
    User yourusername
    GSSAPIAuthentication yes
    GSSAPIDelegateCredentials yes

Host lxplus-tunnel
    HostName lxplus.cern.ch
    User yourusername
    ProxyJump lxtunnel
    GSSAPIAuthentication yes
    GSSAPIDelegateCredentials yes</code></pre>
      <p>È anche possibile configurare un proxy SOCKS tramite lxplus per accedere ai servizi web interni del CERN da remoto:</p>
      <pre><code>ssh -D 1080 -N lxplus</code></pre>
      <p>Quindi configurare il browser per utilizzare <code>localhost:1080</code> come proxy SOCKS5 per raggiungere le pagine interne del CERN.</p>

      <h2>Keytab per accesso automatizzato</h2>
      <p>Per script o processi automatizzati che necessitano di autenticazione Kerberos senza login interattivo, è possibile creare un file keytab:</p>
      <pre><code>cern-get-keytab --keytab ~/private/keytab --login --user yourusername</code></pre>
      <p>Quindi ottenere un ticket in modo non interattivo con:</p>
      <pre><code>kinit -kt ~/private/keytab yourusername@CERN.CH</code></pre>
      <div class="alert">
        <p><strong>Avvertenza di sicurezza:</strong> Un file keytab equivale a una password memorizzata. Proteggerlo con permessi di file restrittivi (<code>chmod 600</code>) e non condividerlo mai né includerlo nel controllo di versione.</p>
      </div>

      <h2>Accesso a EOS e AFS</h2>
      <p>Con un ticket Kerberos valido, è possibile accedere ai sistemi di archiviazione del CERN:</p>
      <p><strong>EOS</strong> (archiviazione distribuita del CERN) è accessibile su lxplus con lo strumento da riga di comando <code>eos</code>:</p>
      <pre><code># Elencare la propria directory home su EOS
eos ls /eos/user/u/username/

# Copiare un file su EOS
eos cp localfile.txt /eos/user/u/username/

# Montare EOS tramite FUSE (se disponibile)
mkdir -p ~/eos
eosfusebind ~/eos</code></pre>
      <p><strong>AFS</strong> (Andrew File System) richiede un token AFS, che si ottiene dal ticket Kerberos:</p>
      <pre><code># Ottenere un token AFS dal ticket Kerberos
aklog

# Accedere al proprio spazio di lavoro AFS
ls /afs/cern.ch/user/u/username/</code></pre>

      <h2>Risoluzione dei problemi</h2>
      <ul>
        <li><strong>kinit: Cannot find KDC for realm CERN.CH</strong> — Il file <code>/etc/krb5.conf</code> è mancante o mal configurato. Verificare che il file esista e contenga le impostazioni corrette del realm.</li>
        <li><strong>kinit: Client not found in Kerberos database</strong> — Verificare di utilizzare il nome utente CERN corretto e che il realm sia <code>CERN.CH</code> (maiuscolo).</li>
        <li><strong>Permission denied (GSSAPI)</strong> — Eseguire <code>klist</code> per verificare se il ticket è valido e non scaduto. Eseguire <code>kinit</code> nuovamente se necessario.</li>
        <li><strong>Ticket expired or cannot renew</strong> — Se il ticket è scaduto da troppo tempo, il rinnovo non sarà possibile. Eseguire <code>kdestroy</code> seguito da <code>kinit</code> per ottenere un nuovo ticket.</li>
        <li><strong>SSH connection refused off-site</strong> — Il CERN limita l'accesso SSH diretto dall'esterno della propria rete. Utilizzare la configurazione ProxyJump con lxtunnel descritta sopra.</li>
        <li><strong>Clock skew too great</strong> — Kerberos richiede orologi sincronizzati. Assicurarsi che l'orologio di sistema sia corretto (utilizzare NTP). Uno scarto superiore a 5 minuti causerà errori di autenticazione.</li>
      </ul>

      <h2>Scheda di riferimento rapido</h2>
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

      <h2>Riferimenti</h2>
      <ul>
        <li><a href="https://cern.service-now.com/service-portal?id=kb_article&amp;n=KB0003388" target="_blank" rel="noopener noreferrer">Documentazione Configurazione Kerberos del CERN</a></li>
        <li><a href="https://information-technology.web.cern.ch/services/lxplus-service" target="_blank" rel="noopener noreferrer">Servizio lxplus del CERN</a></li>
        <li><a href="https://information-technology.web.cern.ch/services/eos-service" target="_blank" rel="noopener noreferrer">Servizio di Archiviazione EOS del CERN</a></li>
        <li><a href="https://information-technology.web.cern.ch/services/afs-service" target="_blank" rel="noopener noreferrer">Servizio AFS del CERN</a></li>
        <li><a href="https://security.web.cern.ch/recommendations/en/ssh_keys.shtml" target="_blank" rel="noopener noreferrer">Raccomandazioni SSH del CERN</a></li>
      </ul>
