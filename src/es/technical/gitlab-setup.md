---
title: "CERN GitLab y flujo de desarrollo - CERN Starter Pack"
description: "Guia de CERN GitLab, metodos de autenticacion, claves SSH, acceso Git con Kerberos, CI/CD y flujos de trabajo de desarrollo para recien llegados."
og:
  title: "CERN GitLab y flujo de desarrollo - CERN Starter Pack"
  description: "Configura tu cuenta de CERN GitLab, configura la autenticacion y aprende el flujo de trabajo de desarrollo estandar en CERN."
breadcrumbs:
  - { label: "Inicio", url: "/es/" }
  - { label: "Ayuda Tecnica", url: "/es/technical-hub/" }
  - { label: "CERN GitLab" }
---

# CERN GitLab y flujo de desarrollo

## CERN GitLab vs GitHub

CERN aloja su propia instancia de GitLab en <a href="https://gitlab.cern.ch" target="_blank" rel="noopener noreferrer">gitlab.cern.ch</a>. Esta es la plataforma principal para control de versiones y colaboracion en proyectos de software de CERN. A diferencia de GitHub publico, CERN GitLab esta integrado con el inicio de sesion unico (SSO) de CERN y es accesible para cualquier persona con una cuenta de computacion de CERN.

Aunque muchos proyectos HEP de codigo abierto tambien mantienen espejos en GitHub, los repositorios oficiales de los frameworks de experimentos, herramientas internas y gestion de configuracion suelen estar en CERN GitLab. Tu grupo o experimento probablemente requerira que lo uses para el desarrollo diario.

## Metodos de autenticacion

CERN GitLab soporta varios metodos de autenticacion:

- **CERN SSO (web):** Inicia sesion en la interfaz web de GitLab usando tus credenciales de CERN. Esto es automatico si ya has iniciado sesion en CERN SSO.
- **Claves SSH:** El metodo preferido para operaciones Git por linea de comandos. Se configura una vez y se usa sin introducir contrasenas.
- **Kerberos:** Clona y envia cambios usando tu ticket Kerberos a traves del esquema de URL `https://:@gitlab.cern.ch:8443/`.
- **Token de acceso personal (PAT):** Genera un token en los ajustes de GitLab para autenticacion basada en HTTPS. Util para scripts e integraciones CI/CD.

## Configurar claves SSH para GitLab

Genera un par de claves SSH si aun no tienes uno:

```
ssh-keygen -t ed25519 -C "tu.nombre@cern.ch"
```

Copia la clave publica al portapapeles:

```
cat ~/.ssh/id_ed25519.pub
```

Luego agregala a tu cuenta de CERN GitLab:

1. Ve a <a href="https://gitlab.cern.ch/-/user_settings/ssh_keys" target="_blank" rel="noopener noreferrer">gitlab.cern.ch/-/user_settings/ssh_keys</a>
2. Pega tu clave publica en el campo "Key"
3. Dale un titulo descriptivo (por ejemplo, "Portatil - Ubuntu 2026")
4. Haz clic en "Add key"

Prueba la conexion:

```
ssh -T git@gitlab.cern.ch
```

Agrega esto a tu `~/.ssh/config` por conveniencia:

```
Host gitlab.cern.ch
User git
IdentityFile ~/.ssh/id_ed25519
PreferredAuthentications publickey
```

## Autenticacion Kerberos para Git

Si prefieres usar Kerberos en lugar de claves SSH, puedes clonar repositorios usando el endpoint HTTPS autenticado por Kerberos en el puerto 8443:

```
# Primero, obtiene un ticket Kerberos
kinit username@CERN.CH

# Clonar usando la URL de Kerberos
git clone https://:@gitlab.cern.ch:8443/group/project.git
```

Este metodo es especialmente conveniente en lxplus donde ya tienes un ticket Kerberos. No se necesita configuracion adicional mas alla de un ticket valido.

## Flujo de trabajo basico con Git en CERN

La mayoria de proyectos de CERN siguen un flujo de trabajo basado en merge requests similar al flujo estandar de GitLab:

1. **Fork o branch:** Crea un fork personal del proyecto o una rama de funcionalidad (segun las convenciones de tu proyecto).
2. **Desarrolla localmente:** Clona el repositorio, crea una rama, realiza tus cambios y haz commit.
3. **Push:** Envia tu rama a tu fork o al repositorio original.
4. **Abre un Merge Request (MR):** En la interfaz web de GitLab, crea un merge request dirigido a la rama principal. Agrega una descripcion, asigna revisores.
5. **Revision de codigo:** Responde a los comentarios, envia commits adicionales si es necesario.
6. **Merge:** Una vez aprobado, el MR se fusiona (normalmente por el mantenedor o por ti mismo si tienes permisos).

```
# Comandos tipicos del flujo de trabajo
git clone git@gitlab.cern.ch:group/project.git
cd project
git checkout -b my-feature
# ... realiza cambios ...
git add -A && git commit -m "Add new feature"
git push origin my-feature
# Luego abre un MR en la interfaz web de GitLab
```

## CI/CD en CERN GitLab

CERN GitLab proporciona pipelines de CI/CD integrados con GitLab Runners. Hay muchos runners compartidos disponibles, incluyendo runners que pueden acceder a CVMFS para software de experimentos. Para configurar CI/CD en tu proyecto, crea un archivo `.gitlab-ci.yml` en la raiz del repositorio:

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

CERN proporciona runners compartidos con etiquetas como `cvmfs` para acceder a las pilas de software de los experimentos. Consulta la configuracion de CI de tu proyecto o pregunta a tu equipo sobre la configuracion de runners preferida.

## Repositorios utiles para recien llegados

Estos son algunos repositorios y grupos de referencia en CERN GitLab:

- **Frameworks de experimentos:** Cada experimento principal (ATLAS, CMS, LHCb, ALICE) tiene su propio grupo en GitLab que contiene los frameworks de analisis y reconstruccion. Pregunta a tu supervisor por los repositorios especificos que necesitas.
- **Herramientas de CERN IT:** Los grupos `cern-it` y `linuxsupport` contienen herramientas de infraestructura, imagenes de contenedores y configuraciones del sistema.
- **Proyecto ROOT:** El framework ROOT se desarrolla en GitHub (<a href="https://github.com/root-project/root" target="_blank" rel="noopener noreferrer">github.com/root-project/root</a>) pero muchas herramientas y paquetes basados en ROOT estan en CERN GitLab.
- **Proyectos de documentacion:** Muchos grupos mantienen su documentacion como sitios de GitLab Pages (usando mkdocs, sphinx o similares). Explora el grupo de documentacion de tu experimento para guias y tutoriales.
