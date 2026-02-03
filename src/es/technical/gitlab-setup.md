---
layout: layouts/page.njk
title: "CERN GitLab y flujo de desarrollo - CERN Starter Pack"
description: "Guia de CERN GitLab, metodos de autenticacion, claves SSH, acceso Git con Kerberos, CI/CD y flujos de trabajo de desarrollo para recien llegados."
og:
  title: "CERN GitLab y flujo de desarrollo - CERN Starter Pack"
  description: "Configura tu cuenta de CERN GitLab, configura la autenticacion y aprende el flujo de trabajo de desarrollo estandar en CERN."
datePublished: "2025-06-01"
dateModified: "2026-02-01"
dateUpdated: "2026-02"
breadcrumbs:
  - { label: "Inicio", url: "/es/" }
  - { label: "Ayuda Tecnica", url: "/es/technical-hub/" }
  - { label: "CERN GitLab" }
---

<h1>CERN GitLab y flujo de desarrollo</h1>
      <h2>CERN GitLab vs GitHub</h2>
      <p>CERN aloja su propia instancia de GitLab en <a href="https://gitlab.cern.ch" target="_blank" rel="noopener noreferrer">gitlab.cern.ch</a>. Esta es la plataforma principal para control de versiones y colaboracion en proyectos de software de CERN. A diferencia de GitHub publico, CERN GitLab esta integrado con el inicio de sesion unico (SSO) de CERN y es accesible para cualquier persona con una cuenta de computacion de CERN.</p>
      <p>Aunque muchos proyectos HEP de codigo abierto tambien mantienen espejos en GitHub, los repositorios oficiales de los frameworks de experimentos, herramientas internas y gestion de configuracion suelen estar en CERN GitLab. Tu grupo o experimento probablemente requerira que lo uses para el desarrollo diario.</p>

      <h2>Metodos de autenticacion</h2>
      <p>CERN GitLab soporta varios metodos de autenticacion:</p>
      <ul>
        <li><strong>CERN SSO (web):</strong> Inicia sesion en la interfaz web de GitLab usando tus credenciales de CERN. Esto es automatico si ya has iniciado sesion en CERN SSO.</li>
        <li><strong>Claves SSH:</strong> El metodo preferido para operaciones Git por linea de comandos. Se configura una vez y se usa sin introducir contrasenas.</li>
        <li><strong>Kerberos:</strong> Clona y envia cambios usando tu ticket Kerberos a traves del esquema de URL <code>https://:@gitlab.cern.ch:8443/</code>.</li>
        <li><strong>Token de acceso personal (PAT):</strong> Genera un token en los ajustes de GitLab para autenticacion basada en HTTPS. Util para scripts e integraciones CI/CD.</li>
      </ul>

      <h2>Configurar claves SSH para GitLab</h2>
      <p>Genera un par de claves SSH si aun no tienes uno:</p>
      <pre><code>ssh-keygen -t ed25519 -C "tu.nombre@cern.ch"</code></pre>
      <p>Copia la clave publica al portapapeles:</p>
      <pre><code>cat ~/.ssh/id_ed25519.pub</code></pre>
      <p>Luego agregala a tu cuenta de CERN GitLab:</p>
      <ol>
        <li>Ve a <a href="https://gitlab.cern.ch/-/user_settings/ssh_keys" target="_blank" rel="noopener noreferrer">gitlab.cern.ch/-/user_settings/ssh_keys</a></li>
        <li>Pega tu clave publica en el campo "Key"</li>
        <li>Dale un titulo descriptivo (por ejemplo, "Portatil - Ubuntu 2026")</li>
        <li>Haz clic en "Add key"</li>
      </ol>
      <p>Prueba la conexion:</p>
      <pre><code>ssh -T git@gitlab.cern.ch</code></pre>
      <p>Agrega esto a tu <code>~/.ssh/config</code> por conveniencia:</p>
      <pre><code>Host gitlab.cern.ch
    User git
    IdentityFile ~/.ssh/id_ed25519
    PreferredAuthentications publickey</code></pre>

      <h2>Autenticacion Kerberos para Git</h2>
      <p>Si prefieres usar Kerberos en lugar de claves SSH, puedes clonar repositorios usando el endpoint HTTPS autenticado por Kerberos en el puerto 8443:</p>
      <pre><code># Primero, obtiene un ticket Kerberos
kinit username@CERN.CH

# Clonar usando la URL de Kerberos
git clone https://:@gitlab.cern.ch:8443/group/project.git</code></pre>
      <p>Este metodo es especialmente conveniente en lxplus donde ya tienes un ticket Kerberos. No se necesita configuracion adicional mas alla de un ticket valido.</p>

      <h2>Flujo de trabajo basico con Git en CERN</h2>
      <p>La mayoria de proyectos de CERN siguen un flujo de trabajo basado en merge requests similar al flujo estandar de GitLab:</p>
      <ol>
        <li><strong>Fork o branch:</strong> Crea un fork personal del proyecto o una rama de funcionalidad (segun las convenciones de tu proyecto).</li>
        <li><strong>Desarrolla localmente:</strong> Clona el repositorio, crea una rama, realiza tus cambios y haz commit.</li>
        <li><strong>Push:</strong> Envia tu rama a tu fork o al repositorio original.</li>
        <li><strong>Abre un Merge Request (MR):</strong> En la interfaz web de GitLab, crea un merge request dirigido a la rama principal. Agrega una descripcion, asigna revisores.</li>
        <li><strong>Revision de codigo:</strong> Responde a los comentarios, envia commits adicionales si es necesario.</li>
        <li><strong>Merge:</strong> Una vez aprobado, el MR se fusiona (normalmente por el mantenedor o por ti mismo si tienes permisos).</li>
      </ol>
      <pre><code># Comandos tipicos del flujo de trabajo
git clone git@gitlab.cern.ch:group/project.git
cd project
git checkout -b my-feature
# ... realiza cambios ...
git add -A &amp;&amp; git commit -m "Add new feature"
git push origin my-feature
# Luego abre un MR en la interfaz web de GitLab</code></pre>

      <h2>CI/CD en CERN GitLab</h2>
      <p>CERN GitLab proporciona pipelines de CI/CD integrados con GitLab Runners. Hay muchos runners compartidos disponibles, incluyendo runners que pueden acceder a CVMFS para software de experimentos. Para configurar CI/CD en tu proyecto, crea un archivo <code>.gitlab-ci.yml</code> en la raiz del repositorio:</p>
      <pre><code>stages:
  - build
  - test

build-job:
  stage: build
  image: gitlab-registry.cern.ch/linuxsupport/alma9-base
  script:
    - source /cvmfs/sft.cern.ch/lcg/views/LCG_105/x86_64-el9-gcc13-opt/setup.sh
    - mkdir build &amp;&amp; cd build
    - cmake .. &amp;&amp; make

test-job:
  stage: test
  image: gitlab-registry.cern.ch/linuxsupport/alma9-base
  script:
    - source /cvmfs/sft.cern.ch/lcg/views/LCG_105/x86_64-el9-gcc13-opt/setup.sh
    - cd build &amp;&amp; ctest</code></pre>
      <p>CERN proporciona runners compartidos con etiquetas como <code>cvmfs</code> para acceder a las pilas de software de los experimentos. Consulta la configuracion de CI de tu proyecto o pregunta a tu equipo sobre la configuracion de runners preferida.</p>

      <h2>Repositorios utiles para recien llegados</h2>
      <p>Estos son algunos repositorios y grupos de referencia en CERN GitLab:</p>
      <ul>
        <li><strong>Frameworks de experimentos:</strong> Cada experimento principal (ATLAS, CMS, LHCb, ALICE) tiene su propio grupo en GitLab que contiene los frameworks de analisis y reconstruccion. Pregunta a tu supervisor por los repositorios especificos que necesitas.</li>
        <li><strong>Herramientas de CERN IT:</strong> Los grupos <code>cern-it</code> y <code>linuxsupport</code> contienen herramientas de infraestructura, imagenes de contenedores y configuraciones del sistema.</li>
        <li><strong>Proyecto ROOT:</strong> El framework ROOT se desarrolla en GitHub (<a href="https://github.com/root-project/root" target="_blank" rel="noopener noreferrer">github.com/root-project/root</a>) pero muchas herramientas y paquetes basados en ROOT estan en CERN GitLab.</li>
        <li><strong>Proyectos de documentacion:</strong> Muchos grupos mantienen su documentacion como sitios de GitLab Pages (usando mkdocs, sphinx o similares). Explora el grupo de documentacion de tu experimento para guias y tutoriales.</li>
      </ul>
