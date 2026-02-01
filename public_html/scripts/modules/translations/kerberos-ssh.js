export const kerberosSshTranslations = {
  es: {
    krb_page_title: 'Configuracion de Kerberos y SSH para CERN - CERN Starter Pack',
    krb_breadcrumb_home: 'Inicio',
    krb_breadcrumb_tech: 'Ayuda Tecnica',
    krb_breadcrumb_current: 'Configuracion de Kerberos y SSH',
    krb_last_updated: 'Ultima actualizacion: Febrero 2026',
    krb_heading: 'Configuracion de Kerberos y SSH para CERN',
    krb_alert:
      'Esta guia cubre la configuracion de Kerberos y SSH para <strong>Linux</strong>, <strong>macOS</strong> y <strong>Windows via WSL</strong>. Elige la seccion correspondiente a tu sistema operativo.',
    krb_what_title: 'Que es Kerberos y por que CERN lo usa',
    krb_what_p1:
      'Kerberos es un protocolo de autenticacion de red que utiliza tickets para verificar la identidad sin enviar contrasenas por la red. CERN opera el realm Kerberos <code>CERN.CH</code> para la autenticacion centralizada en toda su infraestructura informatica.',
    krb_what_p2:
      'Cuando te autentificas con Kerberos, recibes un ticket de concesion de tickets (TGT) con tiempo limitado que te permite acceder a los servicios de CERN como lxplus, AFS, EOS y GitLab sin tener que volver a introducir tu contrasena cada vez. Este sistema basado en tickets es fundamental para trabajar en CERN.',
    krb_linux_title: 'Configuracion en Linux',
    krb_linux_install:
      'Instala las herramientas de cliente Kerberos en distribuciones basadas en Debian/Ubuntu:',
    krb_linux_conf:
      'Luego configura <code>/etc/krb5.conf</code> con los ajustes del realm de CERN. Reemplaza el contenido del archivo (o crealo) con:',
    krb_linux_note:
      'En Fedora/RHEL, instala con <code>sudo dnf install krb5-workstation</code>. El archivo <code>krb5.conf</code> es el mismo.',
    krb_macos_title: 'Configuracion en macOS',
    krb_macos_p1:
      'macOS incluye una implementacion de Kerberos integrada (Heimdal). No necesitas instalar paquetes adicionales. Simplemente crea o edita el archivo <code>/etc/krb5.conf</code> con la misma configuracion mostrada en la seccion de Linux anterior.',
    krb_macos_p2:
      'En versiones modernas de macOS puede que necesites usar <code>sudo</code> para editar archivos en <code>/etc/</code>. Tambien ten en cuenta que Heimdal de macOS puede manejar la renovacion de tickets de forma ligeramente diferente; si experimentas problemas, intenta establecer <code>renewable = true</code> en la seccion <code>[libdefaults]</code>.',
    krb_wsl_title: 'Configuracion en Windows / WSL',
    krb_wsl_p1:
      'En Windows, el enfoque recomendado es usar WSL (Subsistema de Windows para Linux). Dentro de tu distribucion WSL (por ejemplo, Ubuntu), instala y configura Kerberos exactamente como se describe en la seccion de Linux anterior.',
    krb_wsl_p2:
      'Si tambien quieres usar VS Code Remote para conectarte a lxplus, consulta la <a href="vscode-remote.html">guia de VS Code Remote via WSL</a> para instrucciones complementarias sobre SSH a traves de WSL.',
    krb_ticket_title: 'Obtener un ticket Kerberos',
    krb_ticket_intro:
      'Una vez que tu configuracion esta lista, usa estos comandos para gestionar los tickets Kerberos:',
    krb_ticket_note:
      'Reemplaza <code>username</code> con tu nombre de cuenta CERN. Los tickets son validos por 25 horas por defecto y renovables hasta 5 dias, segun la configuracion anterior.',
    krb_ssh_title: 'Configuracion SSH para lxplus',
    krb_ssh_intro:
      'Para conectarte a lxplus usando tu ticket Kerberos (sin necesidad de contrasena), agrega lo siguiente a tu archivo <code>~/.ssh/config</code>:',
    krb_ssh_note:
      'Con esta configuracion y un ticket Kerberos valido, puedes simplemente ejecutar <code>ssh lxplus</code> y seras autenticado automaticamente via GSSAPI (Kerberos). Reemplaza <code>yourusername</code> con tu login de CERN.',
    krb_tunnel_title: 'Tuneles SSH y acceso fuera del sitio',
    krb_tunnel_p1:
      'Cuando trabajes desde fuera de la red de CERN, puede que necesites usar <code>lxtunnel.cern.ch</code> como host de salto. Agrega esto a tu <code>~/.ssh/config</code>:',
    krb_tunnel_p2:
      'Tambien puedes configurar un proxy SOCKS a traves de lxplus para acceder a servicios web internos de CERN desde fuera:',
    krb_tunnel_p3:
      'Luego configura tu navegador para usar <code>localhost:1080</code> como proxy SOCKS5 para acceder a paginas internas de CERN.',
    krb_keytab_title: 'Keytab para acceso automatizado',
    krb_keytab_p1:
      'Para scripts o procesos automatizados que necesitan autenticacion Kerberos sin inicio de sesion interactivo, puedes crear un archivo keytab:',
    krb_keytab_p2: 'Luego obtiene un ticket de forma no interactiva con:',
    krb_keytab_warn:
      '<strong>Advertencia de seguridad:</strong> Un archivo keytab es equivalente a una contrasena almacenada. Protegelo con permisos de archivo estrictos (<code>chmod 600</code>) y nunca lo compartas ni lo incluyas en control de versiones.',
    krb_eos_title: 'Acceso a EOS y AFS',
    krb_eos_p1:
      'Con un ticket Kerberos valido, puedes acceder a los sistemas de almacenamiento de CERN:',
    krb_eos_p2:
      '<strong>EOS</strong> (el almacenamiento distribuido de CERN) se puede acceder en lxplus con la herramienta de linea de comandos <code>eos</code>:',
    krb_eos_p3:
      '<strong>AFS</strong> (Andrew File System) requiere un token AFS, que obtienes a partir de tu ticket Kerberos:',
    krb_troubleshoot_title: 'Solucion de problemas',
    krb_troubleshoot_1:
      '<strong>kinit: Cannot find KDC for realm CERN.CH</strong> &mdash; Tu <code>/etc/krb5.conf</code> falta o esta mal configurado. Verifica que el archivo existe y contiene los ajustes correctos del realm.',
    krb_troubleshoot_2:
      '<strong>kinit: Client not found in Kerberos database</strong> &mdash; Comprueba que estas usando el nombre de usuario de CERN correcto y que el realm es <code>CERN.CH</code> (en mayusculas).',
    krb_troubleshoot_3:
      '<strong>Permission denied (GSSAPI)</strong> &mdash; Ejecuta <code>klist</code> para comprobar si tu ticket es valido y no ha expirado. Ejecuta <code>kinit</code> de nuevo si es necesario.',
    krb_troubleshoot_4:
      '<strong>Ticket expirado o no se puede renovar</strong> &mdash; Si tu ticket ha estado expirado demasiado tiempo, la renovacion fallara. Ejecuta <code>kdestroy</code> seguido de <code>kinit</code> para obtener un ticket nuevo.',
    krb_troubleshoot_5:
      '<strong>Conexion SSH rechazada fuera del sitio</strong> &mdash; CERN restringe el acceso SSH directo desde fuera de su red. Usa la configuracion ProxyJump de lxtunnel descrita anteriormente.',
    krb_troubleshoot_6:
      '<strong>Clock skew too great</strong> &mdash; Kerberos requiere relojes sincronizados. Asegurate de que el reloj de tu sistema es correcto (usa NTP). Un desfase de mas de 5 minutos causara fallos de autenticacion.',
    krb_quickref_title: 'Tarjeta de referencia rapida',
    krb_quickref_task: 'Tarea',
    krb_quickref_command: 'Comando',
    krb_qr_get_ticket: 'Obtener un ticket Kerberos',
    krb_qr_list_tickets: 'Listar tickets actuales',
    krb_qr_renew: 'Renovar ticket',
    krb_qr_destroy: 'Destruir tickets',
    krb_qr_ssh: 'SSH a lxplus',
    krb_qr_tunnel: 'SSH via tunel (fuera del sitio)',
    krb_qr_socks: 'Proxy SOCKS',
    krb_qr_afs: 'Obtener token AFS',
    krb_qr_eos: 'Listar archivos EOS',
    krb_qr_keytab: 'Crear keytab',
    krb_refs_title: 'Referencias',
    krb_ref_1: 'Documentacion de configuracion de Kerberos de CERN',
    krb_ref_2: 'Servicio lxplus de CERN',
    krb_ref_3: 'Servicio de almacenamiento EOS de CERN',
    krb_ref_4: 'Servicio AFS de CERN',
    krb_ref_5: 'Recomendaciones de claves SSH de CERN',
    krb_print: 'Imprimir esta pagina',
  },
  en: {
    krb_page_title: 'Kerberos & SSH Setup for CERN - CERN Starter Pack',
    krb_breadcrumb_home: 'Home',
    krb_breadcrumb_tech: 'Technical Help',
    krb_breadcrumb_current: 'Kerberos & SSH Setup',
    krb_last_updated: 'Last updated: February 2026',
    krb_heading: 'Kerberos & SSH Setup for CERN',
    krb_alert:
      'This guide covers Kerberos and SSH configuration for <strong>Linux</strong>, <strong>macOS</strong>, and <strong>Windows via WSL</strong>. Choose the section that matches your operating system.',
    krb_what_title: 'What is Kerberos and Why CERN Uses It',
    krb_what_p1:
      'Kerberos is a network authentication protocol that uses tickets to prove identity without sending passwords over the network. CERN operates the <code>CERN.CH</code> Kerberos realm for centralized authentication across its computing infrastructure.',
    krb_what_p2:
      'When you authenticate with Kerberos, you receive a time-limited ticket-granting ticket (TGT) that lets you access CERN services such as lxplus, AFS, EOS, and GitLab without re-entering your password each time. This ticket-based system is fundamental to working at CERN.',
    krb_linux_title: 'Linux Setup',
    krb_linux_install:
      'Install the Kerberos client tools on Debian/Ubuntu-based distributions:',
    krb_linux_conf:
      'Then configure <code>/etc/krb5.conf</code> with the CERN realm settings. Replace the contents of the file (or create it) with:',
    krb_linux_note:
      'On Fedora/RHEL, install with <code>sudo dnf install krb5-workstation</code>. The <code>krb5.conf</code> file is the same.',
    krb_macos_title: 'macOS Setup',
    krb_macos_p1:
      'macOS ships with a built-in Kerberos implementation (Heimdal). You do not need to install additional packages. Simply create or edit the file <code>/etc/krb5.conf</code> with the same configuration shown in the Linux section above.',
    krb_macos_p2:
      'On modern macOS you may need to use <code>sudo</code> to edit files in <code>/etc/</code>. Also note that macOS Heimdal may handle ticket renewal slightly differently; if you experience issues, try setting <code>renewable = true</code> in the <code>[libdefaults]</code> section.',
    krb_wsl_title: 'Windows / WSL Setup',
    krb_wsl_p1:
      'On Windows, the recommended approach is to use WSL (Windows Subsystem for Linux). Inside your WSL distribution (e.g., Ubuntu), install and configure Kerberos exactly as described in the Linux section above.',
    krb_wsl_p2:
      'If you also want to use VS Code Remote to connect to lxplus, see the <a href="vscode-remote.html">VS Code Remote via WSL guide</a> for complementary setup instructions on SSH through WSL.',
    krb_ticket_title: 'Getting a Kerberos Ticket',
    krb_ticket_intro:
      'Once your configuration is in place, use these commands to manage Kerberos tickets:',
    krb_ticket_note:
      'Replace <code>username</code> with your CERN account name. Tickets are valid for 25 hours by default and renewable for up to 5 days, as specified in the configuration above.',
    krb_ssh_title: 'SSH Configuration for lxplus',
    krb_ssh_intro:
      'To connect to lxplus using your Kerberos ticket (no password needed), add the following to your <code>~/.ssh/config</code> file:',
    krb_ssh_note:
      'With this configuration and a valid Kerberos ticket, you can simply run <code>ssh lxplus</code> and you will be authenticated automatically via GSSAPI (Kerberos). Replace <code>yourusername</code> with your CERN login.',
    krb_tunnel_title: 'SSH Tunneling & Off-site Access',
    krb_tunnel_p1:
      'When working from outside the CERN network, you may need to use <code>lxtunnel.cern.ch</code> as a jump host. Add this to your <code>~/.ssh/config</code>:',
    krb_tunnel_p2:
      'You can also set up a SOCKS proxy through lxplus for accessing CERN-internal web services from off-site:',
    krb_tunnel_p3:
      'Then configure your browser to use <code>localhost:1080</code> as a SOCKS5 proxy to reach internal CERN pages.',
    krb_keytab_title: 'Keytab for Automated Access',
    krb_keytab_p1:
      'For scripts or automated processes that need Kerberos authentication without interactive login, you can create a keytab file:',
    krb_keytab_p2: 'Then obtain a ticket non-interactively with:',
    krb_keytab_warn:
      '<strong>Security warning:</strong> A keytab file is equivalent to a stored password. Protect it with strict file permissions (<code>chmod 600</code>) and never share it or commit it to version control.',
    krb_eos_title: 'Accessing EOS and AFS',
    krb_eos_p1:
      'With a valid Kerberos ticket, you can access CERN storage systems:',
    krb_eos_p2:
      '<strong>EOS</strong> (CERN\'s distributed storage) can be accessed on lxplus with the <code>eos</code> command-line tool:',
    krb_eos_p3:
      '<strong>AFS</strong> (Andrew File System) requires an AFS token, which you obtain from your Kerberos ticket:',
    krb_troubleshoot_title: 'Troubleshooting',
    krb_troubleshoot_1:
      '<strong>kinit: Cannot find KDC for realm CERN.CH</strong> &mdash; Your <code>/etc/krb5.conf</code> is missing or misconfigured. Verify the file exists and contains the correct realm settings.',
    krb_troubleshoot_2:
      '<strong>kinit: Client not found in Kerberos database</strong> &mdash; Check that you are using the correct CERN username and the realm is <code>CERN.CH</code> (uppercase).',
    krb_troubleshoot_3:
      '<strong>Permission denied (GSSAPI)</strong> &mdash; Run <code>klist</code> to check if your ticket is valid and not expired. Run <code>kinit</code> again if needed.',
    krb_troubleshoot_4:
      '<strong>Ticket expired or cannot renew</strong> &mdash; If your ticket has been expired for too long, renewal will fail. Run <code>kdestroy</code> followed by <code>kinit</code> to get a fresh ticket.',
    krb_troubleshoot_5:
      '<strong>SSH connection refused off-site</strong> &mdash; CERN restricts direct SSH access from outside its network. Use the lxtunnel ProxyJump configuration described above.',
    krb_troubleshoot_6:
      '<strong>Clock skew too great</strong> &mdash; Kerberos requires synchronized clocks. Ensure your system clock is correct (use NTP). A skew of more than 5 minutes will cause authentication failures.',
    krb_quickref_title: 'Quick Reference Card',
    krb_quickref_task: 'Task',
    krb_quickref_command: 'Command',
    krb_qr_get_ticket: 'Get a Kerberos ticket',
    krb_qr_list_tickets: 'List current tickets',
    krb_qr_renew: 'Renew ticket',
    krb_qr_destroy: 'Destroy tickets',
    krb_qr_ssh: 'SSH to lxplus',
    krb_qr_tunnel: 'SSH via tunnel (off-site)',
    krb_qr_socks: 'SOCKS proxy',
    krb_qr_afs: 'Get AFS token',
    krb_qr_eos: 'List EOS files',
    krb_qr_keytab: 'Create keytab',
    krb_refs_title: 'References',
    krb_ref_1: 'CERN Kerberos Setup Documentation',
    krb_ref_2: 'CERN lxplus Service',
    krb_ref_3: 'CERN EOS Storage Service',
    krb_ref_4: 'CERN AFS Service',
    krb_ref_5: 'CERN SSH Key Recommendations',
    krb_print: 'Print this page',
  },
};
