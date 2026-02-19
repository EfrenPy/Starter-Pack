---
title: "CERN GitLab y flujo de desarrollo - CERN Starter Pack"
description: "Guía de CERN GitLab, métodos de autenticación, claves SSH, acceso Git con Kerberos, CI/CD y flujos de trabajo de desarrollo para recién llegados."
og:
  title: "CERN GitLab y flujo de desarrollo - CERN Starter Pack"
  description: "Configura tu cuenta de CERN GitLab, configura la autenticación y aprende el flujo de trabajo de desarrollo estándar en CERN."
breadcrumbs:
  - { label: "Inicio", url: "/es/" }
  - { label: "Ayuda Técnica", url: "/es/technical-hub/" }
  - { label: "CERN GitLab" }
---

# CERN GitLab y flujo de desarrollo

## CERN GitLab vs GitHub

CERN aloja su propia instancia de GitLab en <a href="https://gitlab.cern.ch" target="_blank" rel="noopener noreferrer">gitlab.cern.ch</a>. Esta es la plataforma principal para control de versiones y colaboración en proyectos de software de CERN. A diferencia de GitHub público, CERN GitLab está integrado con el inicio de sesión único (SSO) de CERN y es accesible para cualquier persona con una cuenta de computación de CERN.

Aunque muchos proyectos HEP de código abierto también mantienen espejos en GitHub, los repositorios oficiales de los frameworks de experimentos, herramientas internas y gestión de configuración suelen estar en CERN GitLab. Tu grupo o experimento probablemente requerirá que lo uses para el desarrollo diario.

## Métodos de autenticación

CERN GitLab soporta varios métodos de autenticación:

- **CERN SSO (web):** Inicia sesión en la interfaz web de GitLab usando tus credenciales de CERN. Esto es automático si ya has iniciado sesión en CERN SSO.
- **Claves SSH:** El método preferido para operaciones Git por línea de comandos. Se configura una vez y se usa sin introducir contraseñas.
- **Kerberos:** Clona y envía cambios usando tu ticket Kerberos a través del esquema de URL `https://:@gitlab.cern.ch:8443/`.
- **Token de acceso personal (PAT):** Genera un token en los ajustes de GitLab para autenticación basada en HTTPS. Útil para scripts e integraciones CI/CD.

## Configurar claves SSH para GitLab

Genera un par de claves SSH si aún no tienes uno:

```
ssh-keygen -t ed25519 -C "tu.nombre@cern.ch"
```

Copia la clave pública al portapapeles:

```
cat ~/.ssh/id_ed25519.pub
```

Luego agrégala a tu cuenta de CERN GitLab:

1. Ve a <a href="https://gitlab.cern.ch/-/user_settings/ssh_keys" target="_blank" rel="noopener noreferrer">gitlab.cern.ch/-/user_settings/ssh_keys</a>
2. Pega tu clave pública en el campo "Key"
3. Dale un título descriptivo (por ejemplo, "Portátil - Ubuntu 2026")
4. Haz clic en "Add key"

Prueba la conexión:

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

## Autenticación Kerberos para Git

Si prefieres usar Kerberos en lugar de claves SSH, puedes clonar repositorios usando el endpoint HTTPS autenticado por Kerberos en el puerto 8443:

```
# Primero, obtiene un ticket Kerberos
kinit username@CERN.CH

# Clonar usando la URL de Kerberos
git clone https://:@gitlab.cern.ch:8443/group/project.git
```

Este método es especialmente conveniente en lxplus donde ya tienes un ticket Kerberos. No se necesita configuración adicional más allá de un ticket válido.

## Flujo de trabajo básico con Git en CERN

La mayoría de proyectos de CERN siguen un flujo de trabajo basado en merge requests similar al flujo estándar de GitLab:

1. **Fork o branch:** Crea un fork personal del proyecto o una rama de funcionalidad (según las convenciones de tu proyecto).
2. **Desarrolla localmente:** Clona el repositorio, crea una rama, realiza tus cambios y haz commit.
3. **Push:** Envía tu rama a tu fork o al repositorio original.
4. **Abre un Merge Request (MR):** En la interfaz web de GitLab, crea un merge request dirigido a la rama principal. Agrega una descripción, asigna revisores.
5. **Revisión de código:** Responde a los comentarios, envía commits adicionales si es necesario.
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

CERN GitLab proporciona pipelines de CI/CD integrados con GitLab Runners. Hay muchos runners compartidos disponibles, incluyendo runners que pueden acceder a CVMFS para software de experimentos. Para configurar CI/CD en tu proyecto, crea un archivo `.gitlab-ci.yml` en la raíz del repositorio:

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

CERN proporciona runners compartidos con etiquetas como `cvmfs` para acceder a las pilas de software de los experimentos. Consulta la configuración de CI de tu proyecto o pregunta a tu equipo sobre la configuración de runners preferida.

## Repositorios útiles para recién llegados

Estos son algunos repositorios y grupos de referencia en CERN GitLab:

- **Frameworks de experimentos:** Cada experimento principal (ATLAS, CMS, LHCb, ALICE) tiene su propio grupo en GitLab que contiene los frameworks de análisis y reconstrucción. Pregunta a tu supervisor por los repositorios específicos que necesitas.
- **Herramientas de CERN IT:** Los grupos `cern-it` y `linuxsupport` contienen herramientas de infraestructura, imágenes de contenedores y configuraciones del sistema.
- **Proyecto ROOT:** El framework ROOT se desarrolla en GitHub (<a href="https://github.com/root-project/root" target="_blank" rel="noopener noreferrer">github.com/root-project/root</a>) pero muchas herramientas y paquetes basados en ROOT están en CERN GitLab.
- **Proyectos de documentación:** Muchos grupos mantienen su documentación como sitios de GitLab Pages (usando mkdocs, sphinx o similares). Explora el grupo de documentación de tu experimento para guías y tutoriales.
