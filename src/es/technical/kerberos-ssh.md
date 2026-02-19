---
title: "Configuración de Kerberos y SSH para CERN - CERN Starter Pack"
description: "Guía completa para configurar la autenticación Kerberos y el acceso SSH a CERN lxplus en Linux, macOS y Windows/WSL."
og:
  title: "Configuración de Kerberos y SSH para CERN - CERN Starter Pack"
  description: "Guía paso a paso para configurar Kerberos y SSH para acceder a CERN lxplus y servicios relacionados."
breadcrumbs:
  - { label: "Inicio", url: "/es/" }
  - { label: "Ayuda Técnica", url: "/es/technical-hub/" }
  - { label: "Configuración de Kerberos y SSH" }
---

# Configuración de Kerberos y SSH para CERN

<div class="alert">
<p>Esta guía cubre la configuración de Kerberos y SSH para <strong>Linux</strong>, <strong>macOS</strong> y <strong>Windows vía WSL</strong>. Elige la sección correspondiente a tu sistema operativo.</p>
</div>

## Qué es Kerberos y por qué CERN lo usa

Kerberos es un protocolo de autenticación de red que utiliza tickets para verificar la identidad sin enviar contraseñas por la red. CERN opera el realm Kerberos `CERN.CH` para la autenticación centralizada en toda su infraestructura informática.

Cuando te autentificas con Kerberos, recibes un ticket de concesión de tickets (TGT) con tiempo limitado que te permite acceder a los servicios de CERN como lxplus, AFS, EOS y GitLab sin tener que volver a introducir tu contraseña cada vez. Este sistema basado en tickets es fundamental para trabajar en CERN.

## Configuración en Linux

Instala las herramientas de cliente Kerberos en distribuciones basadas en Debian/Ubuntu:

```
sudo apt update && sudo apt install krb5-user
```

Luego configura `/etc/krb5.conf` con los ajustes del realm de CERN. Reemplaza el contenido del archivo (o créalo) con:

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

## Configuración en macOS

macOS incluye una implementación de Kerberos integrada (Heimdal). No necesitas instalar paquetes adicionales. Simplemente crea o edita el archivo `/etc/krb5.conf` con la misma configuración mostrada en la sección de Linux anterior.

En versiones modernas de macOS puede que necesites usar `sudo` para editar archivos en `/etc/`. También ten en cuenta que Heimdal de macOS puede manejar la renovación de tickets de forma ligeramente diferente; si experimentas problemas, intenta establecer `renewable = true` en la sección `[libdefaults]`.

## Configuración en Windows / WSL

En Windows, el enfoque recomendado es usar WSL (Subsistema de Windows para Linux). Dentro de tu distribución WSL (por ejemplo, Ubuntu), instala y configura Kerberos exactamente como se describe en la sección de Linux anterior.

Si también quieres usar VS Code Remote para conectarte a lxplus, consulta la [guía de VS Code Remote vía WSL](vscode-remote/) para instrucciones complementarias sobre SSH a través de WSL.

## Obtener un ticket Kerberos

Una vez que tu configuración está lista, usa estos comandos para gestionar los tickets Kerberos:

```
# Obtener un nuevo ticket (se te pedirá tu contraseña de CERN)
kinit username@CERN.CH

# Listar tickets actuales y tiempos de expiración
klist

# Renovar un ticket existente (antes de que expire)
kinit -R

# Destruir todos los tickets (cerrar sesión)
kdestroy
```

Reemplaza `username` con tu nombre de cuenta CERN. Los tickets son válidos por 25 horas por defecto y renovables hasta 5 días, según la configuración anterior.

## Configuración SSH para lxplus

Para conectarte a lxplus usando tu ticket Kerberos (sin necesidad de contraseña), agrega lo siguiente a tu archivo `~/.ssh/config`:

```
Host lxplus
HostName lxplus.cern.ch
User yourusername
GSSAPIAuthentication yes
GSSAPIDelegateCredentials yes
GSSAPITrustDns yes
ForwardAgent yes
```

Con esta configuración y un ticket Kerberos válido, puedes simplemente ejecutar `ssh lxplus` y serás autenticado automáticamente vía GSSAPI (Kerberos). Reemplaza `yourusername` con tu login de CERN.

## Túneles SSH y acceso fuera del sitio

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

También puedes configurar un proxy SOCKS a través de lxplus para acceder a servicios web internos de CERN desde fuera:

```
ssh -D 1080 -N lxplus
```

Luego configura tu navegador para usar `localhost:1080` como proxy SOCKS5 para acceder a páginas internas de CERN.

## Keytab para acceso automatizado

Para scripts o procesos automatizados que necesitan autenticación Kerberos sin inicio de sesión interactivo, puedes crear un archivo keytab:

```
cern-get-keytab --keytab ~/private/keytab --login --user yourusername
```

Luego obtiene un ticket de forma no interactiva con:

```
kinit -kt ~/private/keytab yourusername@CERN.CH
```

<div class="alert">
<p><strong>Advertencia de seguridad:</strong> Un archivo keytab es equivalente a una contraseña almacenada. Protégelo con permisos de archivo estrictos (<code>chmod 600</code>) y nunca lo compartas ni lo incluyas en control de versiones.</p>
</div>

## Acceso a EOS y AFS

Con un ticket Kerberos válido, puedes acceder a los sistemas de almacenamiento de CERN:

**EOS** (el almacenamiento distribuido de CERN) se puede acceder en lxplus con la herramienta de línea de comandos `eos`:

```
# Listar tu directorio home en EOS
eos ls /eos/user/u/username/

# Copiar un archivo a EOS
eos cp archivolocal.txt /eos/user/u/username/

# Montar EOS vía FUSE (si está disponible)
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

## Solución de problemas

- **kinit: Cannot find KDC for realm CERN.CH** — Tu `/etc/krb5.conf` falta o está mal configurado. Verifica que el archivo existe y contiene los ajustes correctos del realm.
- **kinit: Client not found in Kerberos database** — Comprueba que estás usando el nombre de usuario de CERN correcto y que el realm es `CERN.CH` (en mayúsculas).
- **Permission denied (GSSAPI)** — Ejecuta `klist` para comprobar si tu ticket es válido y no ha expirado. Ejecuta `kinit` de nuevo si es necesario.
- **Ticket expirado o no se puede renovar** — Si tu ticket ha estado expirado demasiado tiempo, la renovación fallará. Ejecuta `kdestroy` seguido de `kinit` para obtener un ticket nuevo.
- **Conexión SSH rechazada fuera del sitio** — CERN restringe el acceso SSH directo desde fuera de su red. Usa la configuración ProxyJump de lxtunnel descrita anteriormente.
- **Clock skew too great** — Kerberos requiere relojes sincronizados. Asegúrate de que el reloj de tu sistema es correcto (usa NTP). Un desfase de más de 5 minutos causará fallos de autenticación.

## Tarjeta de referencia rápida

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
  <tr><td>SSH vía túnel (fuera del sitio)</td><td><code>ssh lxplus-tunnel</code></td></tr>
  <tr><td>Proxy SOCKS</td><td><code>ssh -D 1080 -N lxplus</code></td></tr>
  <tr><td>Obtener token AFS</td><td><code>aklog</code></td></tr>
  <tr><td>Listar archivos EOS</td><td><code>eos ls /eos/user/u/user/</code></td></tr>
  <tr><td>Crear keytab</td><td><code>cern-get-keytab --keytab ~/private/keytab --login --user user</code></td></tr>
</tbody>
</table>

## Referencias

- <a href="https://cern.service-now.com/service-portal?id=kb_article&n=KB0003388" target="_blank" rel="noopener noreferrer">Documentación de configuración de Kerberos de CERN</a>
- <a href="https://information-technology.web.cern.ch/services/lxplus-service" target="_blank" rel="noopener noreferrer">Servicio lxplus de CERN</a>
- <a href="https://information-technology.web.cern.ch/services/eos-service" target="_blank" rel="noopener noreferrer">Servicio de almacenamiento EOS de CERN</a>
- <a href="https://information-technology.web.cern.ch/services/afs-service" target="_blank" rel="noopener noreferrer">Servicio AFS de CERN</a>
- <a href="https://security.web.cern.ch/recommendations/en/ssh_keys.shtml" target="_blank" rel="noopener noreferrer">Recomendaciones de claves SSH de CERN</a>
