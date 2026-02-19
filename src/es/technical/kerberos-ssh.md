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

# Configuracion de Kerberos y SSH para CERN

<div class="alert">
<p>Esta guia cubre la configuracion de Kerberos y SSH para <strong>Linux</strong>, <strong>macOS</strong> y <strong>Windows via WSL</strong>. Elige la seccion correspondiente a tu sistema operativo.</p>
</div>

## Que es Kerberos y por que CERN lo usa

Kerberos es un protocolo de autenticacion de red que utiliza tickets para verificar la identidad sin enviar contrasenas por la red. CERN opera el realm Kerberos `CERN.CH` para la autenticacion centralizada en toda su infraestructura informatica.

Cuando te autentificas con Kerberos, recibes un ticket de concesion de tickets (TGT) con tiempo limitado que te permite acceder a los servicios de CERN como lxplus, AFS, EOS y GitLab sin tener que volver a introducir tu contrasena cada vez. Este sistema basado en tickets es fundamental para trabajar en CERN.

## Configuracion en Linux

Instala las herramientas de cliente Kerberos en distribuciones basadas en Debian/Ubuntu:

```
sudo apt update && sudo apt install krb5-user
```

Luego configura `/etc/krb5.conf` con los ajustes del realm de CERN. Reemplaza el contenido del archivo (o crealo) con:

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

En Fedora/RHEL, instala con `sudo dnf install krb5-workstation`. El archivo `krb5.conf` es el mismo.

## Configuracion en macOS

macOS incluye una implementacion de Kerberos integrada (Heimdal). No necesitas instalar paquetes adicionales. Simplemente crea o edita el archivo `/etc/krb5.conf` con la misma configuracion mostrada en la seccion de Linux anterior.

En versiones modernas de macOS puede que necesites usar `sudo` para editar archivos en `/etc/`. Tambien ten en cuenta que Heimdal de macOS puede manejar la renovacion de tickets de forma ligeramente diferente; si experimentas problemas, intenta establecer `renewable = true` en la seccion `[libdefaults]`.

## Configuracion en Windows / WSL

En Windows, el enfoque recomendado es usar WSL (Subsistema de Windows para Linux). Dentro de tu distribucion WSL (por ejemplo, Ubuntu), instala y configura Kerberos exactamente como se describe en la seccion de Linux anterior.

Si tambien quieres usar VS Code Remote para conectarte a lxplus, consulta la [guia de VS Code Remote via WSL](vscode-remote/) para instrucciones complementarias sobre SSH a traves de WSL.

## Obtener un ticket Kerberos

Una vez que tu configuracion esta lista, usa estos comandos para gestionar los tickets Kerberos:

```
# Obtener un nuevo ticket (se te pedira tu contrasena de CERN)
kinit username@CERN.CH

# Listar tickets actuales y tiempos de expiracion
klist

# Renovar un ticket existente (antes de que expire)
kinit -R

# Destruir todos los tickets (cerrar sesion)
kdestroy
```

Reemplaza `username` con tu nombre de cuenta CERN. Los tickets son validos por 25 horas por defecto y renovables hasta 5 dias, segun la configuracion anterior.

## Configuracion SSH para lxplus

Para conectarte a lxplus usando tu ticket Kerberos (sin necesidad de contrasena), agrega lo siguiente a tu archivo `~/.ssh/config`:

```
Host lxplus
HostName lxplus.cern.ch
User yourusername
GSSAPIAuthentication yes
GSSAPIDelegateCredentials yes
GSSAPITrustDns yes
ForwardAgent yes
```

Con esta configuracion y un ticket Kerberos valido, puedes simplemente ejecutar `ssh lxplus` y seras autenticado automaticamente via GSSAPI (Kerberos). Reemplaza `yourusername` con tu login de CERN.

## Tuneles SSH y acceso fuera del sitio

Cuando trabajes desde fuera de la red de CERN, puede que necesites usar `lxtunnel.cern.ch` como host de salto. Agrega esto a tu `~/.ssh/config`:

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

Tambien puedes configurar un proxy SOCKS a traves de lxplus para acceder a servicios web internos de CERN desde fuera:

```
ssh -D 1080 -N lxplus
```

Luego configura tu navegador para usar `localhost:1080` como proxy SOCKS5 para acceder a paginas internas de CERN.

## Keytab para acceso automatizado

Para scripts o procesos automatizados que necesitan autenticacion Kerberos sin inicio de sesion interactivo, puedes crear un archivo keytab:

```
cern-get-keytab --keytab ~/private/keytab --login --user yourusername
```

Luego obtiene un ticket de forma no interactiva con:

```
kinit -kt ~/private/keytab yourusername@CERN.CH
```

<div class="alert">
<p><strong>Advertencia de seguridad:</strong> Un archivo keytab es equivalente a una contrasena almacenada. Protegelo con permisos de archivo estrictos (<code>chmod 600</code>) y nunca lo compartas ni lo incluyas en control de versiones.</p>
</div>

## Acceso a EOS y AFS

Con un ticket Kerberos valido, puedes acceder a los sistemas de almacenamiento de CERN:

**EOS** (el almacenamiento distribuido de CERN) se puede acceder en lxplus con la herramienta de linea de comandos `eos`:

```
# Listar tu directorio home en EOS
eos ls /eos/user/u/username/

# Copiar un archivo a EOS
eos cp archivolocal.txt /eos/user/u/username/

# Montar EOS via FUSE (si esta disponible)
mkdir -p ~/eos
eosfusebind ~/eos
```

**AFS** (Andrew File System) requiere un token AFS, que obtienes a partir de tu ticket Kerberos:

```
# Obtener un token AFS a partir de tu ticket Kerberos
aklog

# Acceder a tu espacio de trabajo AFS
ls /afs/cern.ch/user/u/username/
```

## Solucion de problemas

- **kinit: Cannot find KDC for realm CERN.CH** — Tu `/etc/krb5.conf` falta o esta mal configurado. Verifica que el archivo existe y contiene los ajustes correctos del realm.
- **kinit: Client not found in Kerberos database** — Comprueba que estas usando el nombre de usuario de CERN correcto y que el realm es `CERN.CH` (en mayusculas).
- **Permission denied (GSSAPI)** — Ejecuta `klist` para comprobar si tu ticket es valido y no ha expirado. Ejecuta `kinit` de nuevo si es necesario.
- **Ticket expirado o no se puede renovar** — Si tu ticket ha estado expirado demasiado tiempo, la renovacion fallara. Ejecuta `kdestroy` seguido de `kinit` para obtener un ticket nuevo.
- **Conexion SSH rechazada fuera del sitio** — CERN restringe el acceso SSH directo desde fuera de su red. Usa la configuracion ProxyJump de lxtunnel descrita anteriormente.
- **Clock skew too great** — Kerberos requiere relojes sincronizados. Asegurate de que el reloj de tu sistema es correcto (usa NTP). Un desfase de mas de 5 minutos causara fallos de autenticacion.

## Tarjeta de referencia rapida

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

## Referencias

- <a href="https://cern.service-now.com/service-portal?id=kb_article&n=KB0003388" target="_blank" rel="noopener noreferrer">Documentacion de configuracion de Kerberos de CERN</a>
- <a href="https://information-technology.web.cern.ch/services/lxplus-service" target="_blank" rel="noopener noreferrer">Servicio lxplus de CERN</a>
- <a href="https://information-technology.web.cern.ch/services/eos-service" target="_blank" rel="noopener noreferrer">Servicio de almacenamiento EOS de CERN</a>
- <a href="https://information-technology.web.cern.ch/services/afs-service" target="_blank" rel="noopener noreferrer">Servicio AFS de CERN</a>
- <a href="https://security.web.cern.ch/recommendations/en/ssh_keys.shtml" target="_blank" rel="noopener noreferrer">Recomendaciones de claves SSH de CERN</a>
