---
title: "Almacenamiento EOS y CERNBox - CERN Starter Pack"
description: "Guía de almacenamiento distribuido EOS y CERNBox en el CERN: espacio personal, cuotas, interfaz web, sincronización de escritorio, acceso desde lxplus y compartir archivos."
og:
  title: "Almacenamiento EOS y CERNBox - CERN Starter Pack"
  description: "Guía de almacenamiento distribuido EOS y CERNBox en el CERN: espacio personal, cuotas, interfaz web, sincronización de escritorio, acceso desde lxplus y compartir archivos."
breadcrumbs:
  - { label: "Inicio", url: "/es/" }
  - { label: "Ayuda Técnica", url: "/es/technical-hub/" }
  - { label: "Almacenamiento EOS y CERNBox" }
---

# Almacenamiento EOS y CERNBox

<div class="alert">
<strong>💡 Consejo</strong><br>
<p>CERNBox es tu almacenamiento en la nube principal en el CERN. Configúralo pronto para mantener tus archivos sincronizados entre dispositivos y respaldados automáticamente.</p>
</div>

EOS es el **sistema de almacenamiento distribuido a gran escala** del CERN, diseñado para manejar los enormes volúmenes de datos producidos por los experimentos del LHC y también para servir como infraestructura de almacenamiento personal y de proyectos para todos los usuarios del CERN. CERNBox es la interfaz web y de escritorio intuitiva construida sobre EOS, que proporciona funcionalidades de sincronización y compartición de archivos similares a Dropbox. Juntos, forman la columna vertebral del almacenamiento de archivos en el CERN.

## Qué es EOS

EOS es un sistema de almacenamiento basado en disco desarrollado en el CERN que gestiona **cientos de petabytes de datos** en miles de nodos de almacenamiento. Utiliza codificación de borrado y replicación para garantizar la durabilidad y disponibilidad de los datos, y está optimizado tanto para el procesamiento de datos de física de alto rendimiento como para flujos de trabajo interactivos de usuario. Para la mayoría de usuarios del CERN, EOS es simplemente el lugar donde residen tus archivos personales, datos de proyecto y carpetas compartidas — interactúas con él a través de CERNBox, la línea de comandos en lxplus, o las plataformas de análisis del CERN como SWAN.

Cada usuario del CERN recibe automáticamente un **directorio home en EOS** en `/eos/user/<inicial>/<nombre-usuario>/`. Este es diferente de tu directorio home de AFS y es la ubicación recomendada para archivos de trabajo activos, scripts de análisis y documentos que quieras acceder desde múltiples ubicaciones.

## Cuotas de Almacenamiento

El almacenamiento personal en EOS viene con una cuota por defecto de **1 TB**, que es generosa para la mayoría de usuarios. Si necesitas más espacio — por ejemplo, para grandes conjuntos de datos de análisis o resultados de simulaciones — puedes solicitar un aumento de cuota a través del portal ServiceNow de IT del CERN. Los espacios de proyecto y el almacenamiento de experimentos tienen cuotas separadas y mayores gestionadas por los coordinadores de computación correspondientes.

Puedes comprobar tu uso actual de almacenamiento y cuota accediendo a CERNBox o ejecutando el comando `eos quota ls -m` en lxplus. Vigila tu uso, ya que alcanzar el límite de cuota impedirá guardar nuevos archivos hasta que liberes espacio u obtengas un aumento de cuota.

## Interfaz Web de CERNBox

CERNBox es accesible en **cernbox.cern.ch** a través de cualquier navegador web, usando tus credenciales de inicio de sesión único del CERN. La interfaz web proporciona una experiencia familiar de gestor de archivos donde puedes subir, descargar, renombrar, mover y eliminar archivos y carpetas. También soporta la **edición online** de documentos a través de herramientas de oficina integradas (OnlyOffice), permitiéndote crear y editar archivos Word, Excel y PowerPoint directamente en el navegador sin instalar ningún software.

La interfaz web es particularmente útil cuando trabajas desde una máquina donde no has instalado el cliente de sincronización de escritorio — por ejemplo, desde un portátil personal o mientras viajas. Todos los cambios realizados a través de la interfaz web se reflejan inmediatamente en tu almacenamiento EOS y se sincronizarán con cualquier cliente de escritorio conectado.

## Cliente de Sincronización de Escritorio

Para una sincronización fluida entre tu máquina local y EOS, instala el **cliente de escritorio de CERNBox**, disponible para Windows, macOS y Linux. El cliente funciona como Dropbox o OneDrive, manteniendo una copia local de tus archivos sincronizada con tu almacenamiento EOS. Puedes elegir qué carpetas sincronizar si no quieres replicar todo tu directorio home de EOS localmente.

Descarga el cliente desde **cernbox.cern.ch** y autentícate con tus credenciales del CERN. Tras la sincronización inicial, los cambios se propagan casi en tiempo real. El cliente de escritorio es la forma recomendada de trabajar con CERNBox para tareas diarias, ya que proporciona acceso sin conexión a tus archivos y resolución automática de conflictos si el mismo archivo se edita en múltiples lugares.

## Acceder a EOS desde lxplus y SWAN

En **lxplus** (el cluster de inicio de sesión interactivo del CERN), tu directorio home de EOS es accesible en `/eos/user/<inicial>/<nombre-usuario>/`. Puedes navegar, leer y escribir archivos usando comandos estándar de Linux. Para flujos de trabajo de análisis de física, EOS también es directamente accesible desde **SWAN** (el servicio de Jupyter notebooks del CERN), donde tus archivos de EOS aparecen en el explorador de archivos y pueden cargarse en notebooks de forma transparente.

Si necesitas acceder a EOS desde tu máquina local fuera de CERNBox, puedes montarlo vía **FUSE** (usando el cliente eosxd) o acceder a través del **protocolo XRootD**. El montaje FUSE proporciona una interfaz tipo sistema de archivos, mientras que XRootD se usa programáticamente en frameworks de análisis como ROOT. Ambos métodos requieren autenticación Kerberos válida — consulta la página de Kerberos y SSH para instrucciones de configuración.

## Compartir Archivos y Carpetas

CERNBox facilita **compartir archivos y carpetas** con colegas. A través de la interfaz web o el cliente de escritorio, puedes compartir un archivo o carpeta introduciendo el nombre de usuario CERN o dirección de email del destinatario y eligiendo el nivel de permisos (solo lectura, o edición). Los elementos compartidos aparecen en el CERNBox del destinatario en la sección "Compartido conmigo".

También puedes generar **enlaces públicos** para compartir con personas fuera del CERN, opcionalmente protegidos con contraseña y fecha de expiración. Esto es útil para compartir documentos con colaboradores externos que no tienen cuentas del CERN. Para compartición a mayor escala dentro de un experimento o proyecto, los **espacios de proyecto EOS** proporcionan áreas de almacenamiento compartido dedicadas con sus propias cuotas y controles de acceso gestionados por el coordinador del proyecto.

## Fuentes

- <a href="https://cernbox.cern.ch/" target="_blank" rel="noopener noreferrer">CERNBox — Almacenamiento en la Nube del CERN</a>
- <a href="https://eos-docs.web.cern.ch/" target="_blank" rel="noopener noreferrer">Documentación de EOS</a>
- <a href="https://information-technology.web.cern.ch/" target="_blank" rel="noopener noreferrer">Departamento de IT del CERN</a>
