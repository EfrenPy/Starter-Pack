---
title: "Almacenamiento EOS y CERNBox - CERN Starter Pack"
description: "Guia de almacenamiento distribuido EOS y CERNBox en el CERN: espacio personal, cuotas, interfaz web, sincronizacion de escritorio, acceso desde lxplus y compartir archivos."
og:
  title: "Almacenamiento EOS y CERNBox - CERN Starter Pack"
  description: "Guia de almacenamiento distribuido EOS y CERNBox en el CERN: espacio personal, cuotas, interfaz web, sincronizacion de escritorio, acceso desde lxplus y compartir archivos."
breadcrumbs:
  - { label: "Inicio", url: "/es/" }
  - { label: "Ayuda Tecnica", url: "/es/technical-hub/" }
  - { label: "Almacenamiento EOS y CERNBox" }
---

<h1>Almacenamiento EOS y CERNBox</h1>
<div class="alert">
<strong>💡 Consejo</strong><br>
<p>CERNBox es tu almacenamiento en la nube principal en el CERN. Configuralo pronto para mantener tus archivos sincronizados entre dispositivos y respaldados automaticamente.</p>
</div>
<p>EOS es el <strong>sistema de almacenamiento distribuido a gran escala</strong> del CERN, disenado para manejar los enormes volumenes de datos producidos por los experimentos del LHC y tambien para servir como infraestructura de almacenamiento personal y de proyectos para todos los usuarios del CERN. CERNBox es la interfaz web y de escritorio intuitiva construida sobre EOS, que proporciona funcionalidades de sincronizacion y comparticion de archivos similares a Dropbox. Juntos, forman la columna vertebral del almacenamiento de archivos en el CERN.</p>
<h2>Que es EOS</h2>
<p>EOS es un sistema de almacenamiento basado en disco desarrollado en el CERN que gestiona <strong>cientos de petabytes de datos</strong> en miles de nodos de almacenamiento. Utiliza codificacion de borrado y replicacion para garantizar la durabilidad y disponibilidad de los datos, y esta optimizado tanto para el procesamiento de datos de fisica de alto rendimiento como para flujos de trabajo interactivos de usuario. Para la mayoria de usuarios del CERN, EOS es simplemente el lugar donde residen tus archivos personales, datos de proyecto y carpetas compartidas — interactuas con el a traves de CERNBox, la linea de comandos en lxplus, o las plataformas de analisis del CERN como SWAN.</p>
<p>Cada usuario del CERN recibe automaticamente un <strong>directorio home en EOS</strong> en <code>/eos/user/&lt;inicial&gt;/&lt;nombre-usuario&gt;/</code>. Este es diferente de tu directorio home de AFS y es la ubicacion recomendada para archivos de trabajo activos, scripts de analisis y documentos que quieras acceder desde multiples ubicaciones.</p>
<h2>Cuotas de Almacenamiento</h2>
<p>El almacenamiento personal en EOS viene con una cuota por defecto de <strong>1 TB</strong>, que es generosa para la mayoria de usuarios. Si necesitas mas espacio — por ejemplo, para grandes conjuntos de datos de analisis o resultados de simulaciones — puedes solicitar un aumento de cuota a traves del portal ServiceNow de IT del CERN. Los espacios de proyecto y el almacenamiento de experimentos tienen cuotas separadas y mayores gestionadas por los coordinadores de computacion correspondientes.</p>
<p>Puedes comprobar tu uso actual de almacenamiento y cuota accediendo a CERNBox o ejecutando el comando <code>eos quota ls -m</code> en lxplus. Vigila tu uso, ya que alcanzar el limite de cuota impedira guardar nuevos archivos hasta que liberes espacio u obtengas un aumento de cuota.</p>
<h2>Interfaz Web de CERNBox</h2>
<p>CERNBox es accesible en <strong>cernbox.cern.ch</strong> a traves de cualquier navegador web, usando tus credenciales de inicio de sesion unico del CERN. La interfaz web proporciona una experiencia familiar de gestor de archivos donde puedes subir, descargar, renombrar, mover y eliminar archivos y carpetas. Tambien soporta la <strong>edicion online</strong> de documentos a traves de herramientas de oficina integradas (OnlyOffice), permitiendote crear y editar archivos Word, Excel y PowerPoint directamente en el navegador sin instalar ningun software.</p>
<p>La interfaz web es particularmente util cuando trabajas desde una maquina donde no has instalado el cliente de sincronizacion de escritorio — por ejemplo, desde un portatil personal o mientras viajas. Todos los cambios realizados a traves de la interfaz web se reflejan inmediatamente en tu almacenamiento EOS y se sincronizaran con cualquier cliente de escritorio conectado.</p>
<h2>Cliente de Sincronizacion de Escritorio</h2>
<p>Para una sincronizacion fluida entre tu maquina local y EOS, instala el <strong>cliente de escritorio de CERNBox</strong>, disponible para Windows, macOS y Linux. El cliente funciona como Dropbox o OneDrive, manteniendo una copia local de tus archivos sincronizada con tu almacenamiento EOS. Puedes elegir que carpetas sincronizar si no quieres replicar todo tu directorio home de EOS localmente.</p>
<p>Descarga el cliente desde <strong>cernbox.cern.ch</strong> y autenticate con tus credenciales del CERN. Tras la sincronizacion inicial, los cambios se propagan casi en tiempo real. El cliente de escritorio es la forma recomendada de trabajar con CERNBox para tareas diarias, ya que proporciona acceso sin conexion a tus archivos y resolucion automatica de conflictos si el mismo archivo se edita en multiples lugares.</p>
<h2>Acceder a EOS desde lxplus y SWAN</h2>
<p>En <strong>lxplus</strong> (el cluster de inicio de sesion interactivo del CERN), tu directorio home de EOS es accesible en <code>/eos/user/&lt;inicial&gt;/&lt;nombre-usuario&gt;/</code>. Puedes navegar, leer y escribir archivos usando comandos estandar de Linux. Para flujos de trabajo de analisis de fisica, EOS tambien es directamente accesible desde <strong>SWAN</strong> (el servicio de Jupyter notebooks del CERN), donde tus archivos de EOS aparecen en el explorador de archivos y pueden cargarse en notebooks de forma transparente.</p>
<p>Si necesitas acceder a EOS desde tu maquina local fuera de CERNBox, puedes montarlo via <strong>FUSE</strong> (usando el cliente eosxd) o acceder a traves del <strong>protocolo XRootD</strong>. El montaje FUSE proporciona una interfaz tipo sistema de archivos, mientras que XRootD se usa programaticamente en frameworks de analisis como ROOT. Ambos metodos requieren autenticacion Kerberos valida — consulta la pagina de Kerberos y SSH para instrucciones de configuracion.</p>
<h2>Compartir Archivos y Carpetas</h2>
<p>CERNBox facilita <strong>compartir archivos y carpetas</strong> con colegas. A traves de la interfaz web o el cliente de escritorio, puedes compartir un archivo o carpeta introduciendo el nombre de usuario CERN o direccion de email del destinatario y eligiendo el nivel de permisos (solo lectura, o edicion). Los elementos compartidos aparecen en el CERNBox del destinatario en la seccion "Compartido conmigo".</p>
<p>Tambien puedes generar <strong>enlaces publicos</strong> para compartir con personas fuera del CERN, opcionalmente protegidos con contrasena y fecha de expiracion. Esto es util para compartir documentos con colaboradores externos que no tienen cuentas del CERN. Para comparticion a mayor escala dentro de un experimento o proyecto, los <strong>espacios de proyecto EOS</strong> proporcionan areas de almacenamiento compartido dedicadas con sus propias cuotas y controles de acceso gestionados por el coordinador del proyecto.</p>
<h2>Fuentes</h2>
<ul>
<li><a href="https://cernbox.cern.ch/" target="_blank" rel="noopener noreferrer">CERNBox — Almacenamiento en la Nube del CERN</a></li>
<li><a href="https://eos-docs.web.cern.ch/" target="_blank" rel="noopener noreferrer">Documentacion de EOS</a></li>
<li><a href="https://information-technology.web.cern.ch/" target="_blank" rel="noopener noreferrer">Departamento de IT del CERN</a></li>
</ul>
