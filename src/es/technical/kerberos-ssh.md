---
title: "Configuracion de Kerberos y SSH para CERN - CERN Starter Pack"
description: "Guia completa para configurar la autenticacion Kerberos y el acceso SSH a CERN lxplus en Linux, macOS y Windows/WSL."
og:
  title: "Configuracion de Kerberos y SSH para CERN - CERN Starter Pack"
  description: "Guia paso a paso para configurar Kerberos y SSH para acceder a CERN lxplus y servicios relacionados."
breadcrumbs:
  - { label: "Inicio", url: "/es/" }
  - { label: "Ayuda Tecnica", url: "/es/technical-hub/" }
  - { label: "Configuracion de Kerberos y SSH" }
---

<h1>Configuracion de Kerberos y SSH para CERN</h1>
      <div class="alert">
        <p>Esta guia cubre la configuracion de Kerberos y SSH para <strong>Linux</strong>, <strong>macOS</strong> y <strong>Windows via WSL</strong>. Elige la seccion correspondiente a tu sistema operativo.</p>
      </div>

      <h2>Que es Kerberos y por que CERN lo usa</h2>
      <p>Kerberos es un protocolo de autenticacion de red que utiliza tickets para verificar la identidad sin enviar contrasenas por la red. CERN opera el realm Kerberos <code>CERN.CH</code> para la autenticacion centralizada en toda su infraestructura informatica.</p>
      <p>Cuando te autentificas con Kerberos, recibes un ticket de concesion de tickets (TGT) con tiempo limitado que te permite acceder a los servicios de CERN como lxplus, AFS, EOS y GitLab sin tener que volver a introducir tu contrasena cada vez. Este sistema basado en tickets es fundamental para trabajar en CERN.</p>

      <h2>Configuracion en Linux</h2>
      <p>Instala las herramientas de cliente Kerberos en distribuciones basadas en Debian/Ubuntu:</p>
      <pre><code>sudo apt update &amp;&amp; sudo apt install krb5-user</code></pre>
      <p>Luego configura <code>/etc/krb5.conf</code> con los ajustes del realm de CERN. Reemplaza el contenido del archivo (o crealo) con:</p>
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
      <p>En Fedora/RHEL, instala con <code>sudo dnf install krb5-workstation</code>. El archivo <code>krb5.conf</code> es el mismo.</p>

      <h2>Configuracion en macOS</h2>
      <p>macOS incluye una implementacion de Kerberos integrada (Heimdal). No necesitas instalar paquetes adicionales. Simplemente crea o edita el archivo <code>/etc/krb5.conf</code> con la misma configuracion mostrada en la seccion de Linux anterior.</p>
      <p>En versiones modernas de macOS puede que necesites usar <code>sudo</code> para editar archivos en <code>/etc/</code>. Tambien ten en cuenta que Heimdal de macOS puede manejar la renovacion de tickets de forma ligeramente diferente; si experimentas problemas, intenta establecer <code>renewable = true</code> en la seccion <code>[libdefaults]</code>.</p>

      <h2>Configuracion en Windows / WSL</h2>
      <p>En Windows, el enfoque recomendado es usar WSL (Subsistema de Windows para Linux). Dentro de tu distribucion WSL (por ejemplo, Ubuntu), instala y configura Kerberos exactamente como se describe en la seccion de Linux anterior.</p>
      <p>Si tambien quieres usar VS Code Remote para conectarte a lxplus, consulta la <a href="vscode-remote/">guia de VS Code Remote via WSL</a> para instrucciones complementarias sobre SSH a traves de WSL.</p>

      <h2>Obtener un ticket Kerberos</h2>
      <p>Una vez que tu configuracion esta lista, usa estos comandos para gestionar los tickets Kerberos:</p>
      <pre><code># Obtener un nuevo ticket (se te pedira tu contrasena de CERN)
kinit username@CERN.CH

# Listar tickets actuales y tiempos de expiracion
klist

# Renovar un ticket existente (antes de que expire)
kinit -R

# Destruir todos los tickets (cerrar sesion)
kdestroy</code></pre>
      <p>Reemplaza <code>username</code> con tu nombre de cuenta CERN. Los tickets son validos por 25 horas por defecto y renovables hasta 5 dias, segun la configuracion anterior.</p>

      <h2>Configuracion SSH para lxplus</h2>
      <p>Para conectarte a lxplus usando tu ticket Kerberos (sin necesidad de contrasena), agrega lo siguiente a tu archivo <code>~/.ssh/config</code>:</p>
      <pre><code>Host lxplus
    HostName lxplus.cern.ch
    User yourusername
    GSSAPIAuthentication yes
    GSSAPIDelegateCredentials yes
    GSSAPITrustDns yes
    ForwardAgent yes</code></pre>
      <p>Con esta configuracion y un ticket Kerberos valido, puedes simplemente ejecutar <code>ssh lxplus</code> y seras autenticado automaticamente via GSSAPI (Kerberos). Reemplaza <code>yourusername</code> con tu login de CERN.</p>

      <h2>Tuneles SSH y acceso fuera del sitio</h2>
      <p>Cuando trabajes desde fuera de la red de CERN, puede que necesites usar <code>lxtunnel.cern.ch</code> como host de salto. Agrega esto a tu <code>~/.ssh/config</code>:</p>
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
      <p>Tambien puedes configurar un proxy SOCKS a traves de lxplus para acceder a servicios web internos de CERN desde fuera:</p>
      <pre><code>ssh -D 1080 -N lxplus</code></pre>
      <p>Luego configura tu navegador para usar <code>localhost:1080</code> como proxy SOCKS5 para acceder a paginas internas de CERN.</p>

      <h2>Keytab para acceso automatizado</h2>
      <p>Para scripts o procesos automatizados que necesitan autenticacion Kerberos sin inicio de sesion interactivo, puedes crear un archivo keytab:</p>
      <pre><code>cern-get-keytab --keytab ~/private/keytab --login --user yourusername</code></pre>
      <p>Luego obtiene un ticket de forma no interactiva con:</p>
      <pre><code>kinit -kt ~/private/keytab yourusername@CERN.CH</code></pre>
      <div class="alert">
        <p><strong>Advertencia de seguridad:</strong> Un archivo keytab es equivalente a una contrasena almacenada. Protegelo con permisos de archivo estrictos (<code>chmod 600</code>) y nunca lo compartas ni lo incluyas en control de versiones.</p>
      </div>

      <h2>Acceso a EOS y AFS</h2>
      <p>Con un ticket Kerberos valido, puedes acceder a los sistemas de almacenamiento de CERN:</p>
      <p><strong>EOS</strong> (el almacenamiento distribuido de CERN) se puede acceder en lxplus con la herramienta de linea de comandos <code>eos</code>:</p>
      <pre><code># Listar tu directorio home en EOS
eos ls /eos/user/u/username/

# Copiar un archivo a EOS
eos cp archivolocal.txt /eos/user/u/username/

# Montar EOS via FUSE (si esta disponible)
mkdir -p ~/eos
eosfusebind ~/eos</code></pre>
      <p><strong>AFS</strong> (Andrew File System) requiere un token AFS, que obtienes a partir de tu ticket Kerberos:</p>
      <pre><code># Obtener un token AFS a partir de tu ticket Kerberos
aklog

# Acceder a tu espacio de trabajo AFS
ls /afs/cern.ch/user/u/username/</code></pre>

      <h2>Solucion de problemas</h2>
      <ul>
        <li><strong>kinit: Cannot find KDC for realm CERN.CH</strong> — Tu <code>/etc/krb5.conf</code> falta o esta mal configurado. Verifica que el archivo existe y contiene los ajustes correctos del realm.</li>
        <li><strong>kinit: Client not found in Kerberos database</strong> — Comprueba que estas usando el nombre de usuario de CERN correcto y que el realm es <code>CERN.CH</code> (en mayusculas).</li>
        <li><strong>Permission denied (GSSAPI)</strong> — Ejecuta <code>klist</code> para comprobar si tu ticket es valido y no ha expirado. Ejecuta <code>kinit</code> de nuevo si es necesario.</li>
        <li><strong>Ticket expirado o no se puede renovar</strong> — Si tu ticket ha estado expirado demasiado tiempo, la renovacion fallara. Ejecuta <code>kdestroy</code> seguido de <code>kinit</code> para obtener un ticket nuevo.</li>
        <li><strong>Conexion SSH rechazada fuera del sitio</strong> — CERN restringe el acceso SSH directo desde fuera de su red. Usa la configuracion ProxyJump de lxtunnel descrita anteriormente.</li>
        <li><strong>Clock skew too great</strong> — Kerberos requiere relojes sincronizados. Asegurate de que el reloj de tu sistema es correcto (usa NTP). Un desfase de mas de 5 minutos causara fallos de autenticacion.</li>
      </ul>

      <h2>Tarjeta de referencia rapida</h2>
      <table class="quick-ref">
        <thead>
          <tr>
            <th>Tarea</th>
            <th>Comando</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Obtener un ticket Kerberos</td><td><code>kinit user@CERN.CH</code></td></tr>
          <tr><td>Listar tickets actuales</td><td><code>klist</code></td></tr>
          <tr><td>Renovar ticket</td><td><code>kinit -R</code></td></tr>
          <tr><td>Destruir tickets</td><td><code>kdestroy</code></td></tr>
          <tr><td>SSH a lxplus</td><td><code>ssh lxplus</code></td></tr>
          <tr><td>SSH via tunel (fuera del sitio)</td><td><code>ssh lxplus-tunnel</code></td></tr>
          <tr><td>Proxy SOCKS</td><td><code>ssh -D 1080 -N lxplus</code></td></tr>
          <tr><td>Obtener token AFS</td><td><code>aklog</code></td></tr>
          <tr><td>Listar archivos EOS</td><td><code>eos ls /eos/user/u/user/</code></td></tr>
          <tr><td>Crear keytab</td><td><code>cern-get-keytab --keytab ~/private/keytab --login --user user</code></td></tr>
        </tbody>
      </table>

      <h2>Referencias</h2>
      <ul>
        <li><a href="https://cern.service-now.com/service-portal?id=kb_article&amp;n=KB0003388" target="_blank" rel="noopener noreferrer">Documentacion de configuracion de Kerberos de CERN</a></li>
        <li><a href="https://information-technology.web.cern.ch/services/lxplus-service" target="_blank" rel="noopener noreferrer">Servicio lxplus de CERN</a></li>
        <li><a href="https://information-technology.web.cern.ch/services/eos-service" target="_blank" rel="noopener noreferrer">Servicio de almacenamiento EOS de CERN</a></li>
        <li><a href="https://information-technology.web.cern.ch/services/afs-service" target="_blank" rel="noopener noreferrer">Servicio AFS de CERN</a></li>
        <li><a href="https://security.web.cern.ch/recommendations/en/ssh_keys.shtml" target="_blank" rel="noopener noreferrer">Recomendaciones de claves SSH de CERN</a></li>
      </ul>
