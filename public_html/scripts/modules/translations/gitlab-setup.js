export const gitlabSetupTranslations = {
  es: {
    gl_page_title: 'CERN GitLab y flujo de desarrollo - CERN Starter Pack',
    gl_breadcrumb_home: 'Inicio',
    gl_breadcrumb_tech: 'Ayuda Tecnica',
    gl_breadcrumb_current: 'CERN GitLab',
    gl_last_updated: 'Ultima actualizacion: Febrero 2026',
    gl_heading: 'CERN GitLab y flujo de desarrollo',
    gl_vs_title: 'CERN GitLab vs GitHub',
    gl_vs_p1:
      'CERN aloja su propia instancia de GitLab en <a href="https://gitlab.cern.ch" target="_blank" rel="noopener">gitlab.cern.ch</a>. Esta es la plataforma principal para control de versiones y colaboracion en proyectos de software de CERN. A diferencia de GitHub publico, CERN GitLab esta integrado con el inicio de sesion unico (SSO) de CERN y es accesible para cualquier persona con una cuenta de computacion de CERN.',
    gl_vs_p2:
      'Aunque muchos proyectos HEP de codigo abierto tambien mantienen espejos en GitHub, los repositorios oficiales de los frameworks de experimentos, herramientas internas y gestion de configuracion suelen estar en CERN GitLab. Tu grupo o experimento probablemente requerira que lo uses para el desarrollo diario.',
    gl_auth_title: 'Metodos de autenticacion',
    gl_auth_intro:
      'CERN GitLab soporta varios metodos de autenticacion:',
    gl_auth_sso:
      '<strong>CERN SSO (web):</strong> Inicia sesion en la interfaz web de GitLab usando tus credenciales de CERN. Esto es automatico si ya has iniciado sesion en CERN SSO.',
    gl_auth_ssh:
      '<strong>Claves SSH:</strong> El metodo preferido para operaciones Git por linea de comandos. Se configura una vez y se usa sin introducir contrasenas.',
    gl_auth_krb:
      '<strong>Kerberos:</strong> Clona y envia cambios usando tu ticket Kerberos a traves del esquema de URL <code>https://:@gitlab.cern.ch:8443/</code>.',
    gl_auth_pat:
      '<strong>Token de acceso personal (PAT):</strong> Genera un token en los ajustes de GitLab para autenticacion basada en HTTPS. Util para scripts e integraciones CI/CD.',
    gl_sshsetup_title: 'Configurar claves SSH para GitLab',
    gl_sshsetup_p1:
      'Genera un par de claves SSH si aun no tienes uno:',
    gl_sshsetup_p2: 'Copia la clave publica al portapapeles:',
    gl_sshsetup_p3:
      'Luego agregala a tu cuenta de CERN GitLab:',
    gl_sshsetup_step1:
      'Ve a <a href="https://gitlab.cern.ch/-/user_settings/ssh_keys" target="_blank" rel="noopener">gitlab.cern.ch/-/user_settings/ssh_keys</a>',
    gl_sshsetup_step2:
      'Pega tu clave publica en el campo "Key"',
    gl_sshsetup_step3:
      'Dale un titulo descriptivo (por ejemplo, "Portatil - Ubuntu 2026")',
    gl_sshsetup_step4: 'Haz clic en "Add key"',
    gl_sshsetup_p4: 'Prueba la conexion:',
    gl_sshsetup_p5:
      'Agrega esto a tu <code>~/.ssh/config</code> por conveniencia:',
    gl_krbgit_title: 'Autenticacion Kerberos para Git',
    gl_krbgit_p1:
      'Si prefieres usar Kerberos en lugar de claves SSH, puedes clonar repositorios usando el endpoint HTTPS autenticado por Kerberos en el puerto 8443:',
    gl_krbgit_p2:
      'Este metodo es especialmente conveniente en lxplus donde ya tienes un ticket Kerberos. No se necesita configuracion adicional mas alla de un ticket valido.',
    gl_workflow_title: 'Flujo de trabajo basico con Git en CERN',
    gl_workflow_p1:
      'La mayoria de proyectos de CERN siguen un flujo de trabajo basado en merge requests similar al flujo estandar de GitLab:',
    gl_workflow_step1:
      '<strong>Fork o branch:</strong> Crea un fork personal del proyecto o una rama de funcionalidad (segun las convenciones de tu proyecto).',
    gl_workflow_step2:
      '<strong>Desarrolla localmente:</strong> Clona el repositorio, crea una rama, realiza tus cambios y haz commit.',
    gl_workflow_step3:
      '<strong>Push:</strong> Envia tu rama a tu fork o al repositorio original.',
    gl_workflow_step4:
      '<strong>Abre un Merge Request (MR):</strong> En la interfaz web de GitLab, crea un merge request dirigido a la rama principal. Agrega una descripcion, asigna revisores.',
    gl_workflow_step5:
      '<strong>Revision de codigo:</strong> Responde a los comentarios, envia commits adicionales si es necesario.',
    gl_workflow_step6:
      '<strong>Merge:</strong> Una vez aprobado, el MR se fusiona (normalmente por el mantenedor o por ti mismo si tienes permisos).',
    gl_cicd_title: 'CI/CD en CERN GitLab',
    gl_cicd_p1:
      'CERN GitLab proporciona pipelines de CI/CD integrados con GitLab Runners. Hay muchos runners compartidos disponibles, incluyendo runners que pueden acceder a CVMFS para software de experimentos. Para configurar CI/CD en tu proyecto, crea un archivo <code>.gitlab-ci.yml</code> en la raiz del repositorio:',
    gl_cicd_p2:
      'CERN proporciona runners compartidos con etiquetas como <code>cvmfs</code> para acceder a las pilas de software de los experimentos. Consulta la configuracion de CI de tu proyecto o pregunta a tu equipo sobre la configuracion de runners preferida.',
    gl_repos_title: 'Repositorios utiles para recien llegados',
    gl_repos_intro:
      'Estos son algunos repositorios y grupos de referencia en CERN GitLab:',
    gl_repo_1:
      '<strong>Frameworks de experimentos:</strong> Cada experimento principal (ATLAS, CMS, LHCb, ALICE) tiene su propio grupo en GitLab que contiene los frameworks de analisis y reconstruccion. Pregunta a tu supervisor por los repositorios especificos que necesitas.',
    gl_repo_2:
      '<strong>Herramientas de CERN IT:</strong> Los grupos <code>cern-it</code> y <code>linuxsupport</code> contienen herramientas de infraestructura, imagenes de contenedores y configuraciones del sistema.',
    gl_repo_3:
      '<strong>Proyecto ROOT:</strong> El framework ROOT se desarrolla en GitHub (<a href="https://github.com/root-project/root" target="_blank" rel="noopener">github.com/root-project/root</a>) pero muchas herramientas y paquetes basados en ROOT estan en CERN GitLab.',
    gl_repo_4:
      '<strong>Proyectos de documentacion:</strong> Muchos grupos mantienen su documentacion como sitios de GitLab Pages (usando mkdocs, sphinx o similares). Explora el grupo de documentacion de tu experimento para guias y tutoriales.',
    gl_print: 'Imprimir esta pagina',
  },
  en: {
    gl_page_title: 'CERN GitLab & Development Workflow - CERN Starter Pack',
    gl_breadcrumb_home: 'Home',
    gl_breadcrumb_tech: 'Technical Help',
    gl_breadcrumb_current: 'CERN GitLab',
    gl_last_updated: 'Last updated: February 2026',
    gl_heading: 'CERN GitLab & Development Workflow',
    gl_vs_title: 'CERN GitLab vs GitHub',
    gl_vs_p1:
      'CERN hosts its own GitLab instance at <a href="https://gitlab.cern.ch" target="_blank" rel="noopener">gitlab.cern.ch</a>. This is the primary platform for version control and collaboration on CERN software projects. Unlike public GitHub, CERN GitLab is integrated with CERN Single Sign-On (SSO) and is accessible to anyone with a CERN computing account.',
    gl_vs_p2:
      'While many open-source HEP projects also maintain mirrors on GitHub, the authoritative repositories for experiment frameworks, internal tools, and configuration management typically live on CERN GitLab. Your group or experiment will likely require you to use it for day-to-day development.',
    gl_auth_title: 'Authentication Methods',
    gl_auth_intro:
      'CERN GitLab supports several authentication methods:',
    gl_auth_sso:
      '<strong>CERN SSO (web):</strong> Log in to the GitLab web interface using your CERN credentials. This is automatic if you are already logged into CERN SSO.',
    gl_auth_ssh:
      '<strong>SSH keys:</strong> The preferred method for command-line Git operations. Set up once and use without entering passwords.',
    gl_auth_krb:
      '<strong>Kerberos:</strong> Clone and push using your Kerberos ticket via the <code>https://:@gitlab.cern.ch:8443/</code> URL scheme.',
    gl_auth_pat:
      '<strong>Personal Access Token (PAT):</strong> Generate a token in GitLab settings for HTTPS-based authentication. Useful for scripts and CI/CD integrations.',
    gl_sshsetup_title: 'Setting Up SSH Keys for GitLab',
    gl_sshsetup_p1:
      'Generate an SSH key pair if you do not already have one:',
    gl_sshsetup_p2: 'Copy the public key to your clipboard:',
    gl_sshsetup_p3:
      'Then add it to your CERN GitLab account:',
    gl_sshsetup_step1:
      'Go to <a href="https://gitlab.cern.ch/-/user_settings/ssh_keys" target="_blank" rel="noopener">gitlab.cern.ch/-/user_settings/ssh_keys</a>',
    gl_sshsetup_step2:
      'Paste your public key into the "Key" field',
    gl_sshsetup_step3:
      'Give it a descriptive title (e.g., "Laptop - Ubuntu 2026")',
    gl_sshsetup_step4: 'Click "Add key"',
    gl_sshsetup_p4: 'Test the connection:',
    gl_sshsetup_p5:
      'Add this to your <code>~/.ssh/config</code> for convenience:',
    gl_krbgit_title: 'Kerberos Authentication for Git',
    gl_krbgit_p1:
      'If you prefer to use Kerberos instead of SSH keys, you can clone repositories using the Kerberos-authenticated HTTPS endpoint on port 8443:',
    gl_krbgit_p2:
      'This method is especially convenient on lxplus where you already have a Kerberos ticket. No additional configuration is needed beyond a valid ticket.',
    gl_workflow_title: 'Basic Git Workflow at CERN',
    gl_workflow_p1:
      'Most CERN projects follow a merge-request-based workflow similar to the standard GitLab flow:',
    gl_workflow_step1:
      '<strong>Fork or branch:</strong> Create a personal fork of the project or a feature branch (depending on your project\'s conventions).',
    gl_workflow_step2:
      '<strong>Develop locally:</strong> Clone the repo, create a branch, make your changes, and commit.',
    gl_workflow_step3:
      '<strong>Push:</strong> Push your branch to your fork or the upstream repository.',
    gl_workflow_step4:
      '<strong>Open a Merge Request (MR):</strong> On the GitLab web interface, create a merge request targeting the main branch. Add a description, assign reviewers.',
    gl_workflow_step5:
      '<strong>Code review:</strong> Respond to feedback, push additional commits if needed.',
    gl_workflow_step6:
      '<strong>Merge:</strong> Once approved, the MR is merged (usually by the maintainer or yourself if you have permissions).',
    gl_cicd_title: 'CI/CD on CERN GitLab',
    gl_cicd_p1:
      'CERN GitLab provides built-in CI/CD pipelines powered by GitLab Runners. Many shared runners are available, including runners that can access CVMFS for experiment software. To set up CI/CD for your project, create a <code>.gitlab-ci.yml</code> file in the repository root:',
    gl_cicd_p2:
      'CERN provides shared runners with tags like <code>cvmfs</code> for accessing experiment software stacks. Check your project\'s CI settings or ask your team about the preferred runner configuration.',
    gl_repos_title: 'Useful Repositories for Newcomers',
    gl_repos_intro:
      'Here are some commonly referenced repositories and groups on CERN GitLab:',
    gl_repo_1:
      '<strong>Experiment frameworks:</strong> Each major experiment (ATLAS, CMS, LHCb, ALICE) has its own GitLab group containing the analysis and reconstruction frameworks. Ask your supervisor for the specific repositories you need.',
    gl_repo_2:
      '<strong>CERN IT tools:</strong> The <code>cern-it</code> and <code>linuxsupport</code> groups contain infrastructure tools, container images, and system configurations.',
    gl_repo_3:
      '<strong>ROOT project:</strong> The ROOT framework itself is developed on GitHub (<a href="https://github.com/root-project/root" target="_blank" rel="noopener">github.com/root-project/root</a>) but many ROOT-based tools and packages live on CERN GitLab.',
    gl_repo_4:
      '<strong>Documentation projects:</strong> Many groups maintain their documentation as GitLab Pages sites (using mkdocs, sphinx, or similar). Explore your experiment\'s docs group for guides and tutorials.',
    gl_print: 'Print this page',
  },
};
