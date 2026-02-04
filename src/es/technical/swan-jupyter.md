---
title: "SWAN Jupyter Notebooks - CERN Starter Pack"
description: "Guia del servicio SWAN del CERN para analisis interactivo de datos con Jupyter notebooks, incluyendo configuracion, integracion con ROOT, almacenamiento EOS y colaboracion."
og:
  title: "SWAN Jupyter Notebooks - CERN Starter Pack"
  description: "Empieza a usar SWAN, la plataforma de Jupyter notebooks en la nube del CERN para analisis interactivo de datos."
breadcrumbs:
  - { label: "Inicio", url: "/es/" }
  - { label: "Ayuda Tecnica", url: "/es/technical-hub/" }
  - { label: "SWAN (Jupyter)" }
---

<h1>SWAN: Jupyter Notebooks en el CERN</h1>
<div class="alert">
<p><strong>Nota:</strong> SWAN requiere una cuenta de computacion del CERN activa. Asegurate de que tu cuenta este activada antes de intentar acceder al servicio.</p>
</div>

<h2>Que es SWAN?</h2>
<p>SWAN (Service for Web-based ANalysis) es la plataforma en la nube del CERN para analisis interactivo de datos mediante Jupyter notebooks. Proporciona un entorno basado en navegador donde puedes escribir y ejecutar codigo Python, C++ o ROOT sin instalar nada en tu maquina local.</p>
<p>SWAN esta construido sobre JupyterHub y se integra estrechamente con la infraestructura del CERN, incluyendo el almacenamiento EOS, los stacks de software CVMFS y los clusters Spark. Puedes acceder en <a href="https://swan.cern.ch" target="_blank" rel="noopener noreferrer">swan.cern.ch</a> usando tus credenciales del CERN.</p>

<h2>Como empezar</h2>
<p>Para comenzar a trabajar con SWAN, abre tu navegador y ve a <a href="https://swan.cern.ch" target="_blank" rel="noopener noreferrer">swan.cern.ch</a>, donde iniciaras sesion con tus credenciales de Single Sign-On (SSO) del CERN. Una vez autenticado, la plataforma te pedira que configures tu sesion. Primero, elige un <strong>entorno de software</strong> (conocido como release LCG) que incluya las librerias y herramientas que necesitas. Si no estas seguro de cual elegir, la seleccion por defecto cubre la mayoria de los casos y es un buen punto de partida.</p>
<p>A continuacion, selecciona una <strong>asignacion de recursos</strong>, que determina el numero de nucleos de CPU y la cantidad de memoria disponible para tu sesion. La configuracion por defecto suele ser suficiente cuando estas empezando. Tras realizar tus selecciones, haz clic en <strong>Start my Session</strong> y un entorno Jupyter completamente configurado se lanzara en tu navegador en cuestion de segundos.</p>
<p>Tus archivos se almacenan automaticamente en tu espacio de CERNBox (EOS). Desde la pagina de inicio puedes crear un nuevo notebook, o puedes usar el explorador de archivos integrado para abrir notebooks existentes que tu o tus colegas hayais guardado previamente.</p>

<h2>Usar ROOT en SWAN</h2>
<p>SWAN viene con el framework de analisis de datos <strong>ROOT</strong> preinstalado en todos los entornos de software LCG, lo que lo convierte en la forma mas rapida de empezar a trabajar con ROOT en el CERN. A traves de <strong>PyROOT</strong>, puedes realizar analisis de datos, crear histogramas, ajustar funciones y producir graficos de calidad para publicaciones directamente dentro de un notebook de Python. Si prefieres trabajar en C++, SWAN tambien soporta notebooks de ROOT C++ mediante el <strong>kernel ROOT C++</strong>, que te permite escribir y ejecutar codigo C++ de forma interactiva en la misma interfaz del navegador.</p>
<p>Todas las librerias estandar de ROOT y sus tutoriales estan disponibles de forma inmediata, sin necesidad de instalar ni configurar nada adicional. Ademas, puedes combinar ROOT con otras librerias cientificas de Python como NumPy, pandas y matplotlib en el mismo notebook, lo que te da acceso a un amplio ecosistema de herramientas para el analisis y la visualizacion.</p>

<h2>Almacenamiento e integracion con EOS</h2>
<p>SWAN se integra directamente con el sistema de almacenamiento distribuido <strong>EOS</strong> del CERN a traves de <strong>CERNBox</strong>. Todos tus notebooks de SWAN se guardan en tu espacio de CERNBox, lo que significa que tienen copia de seguridad automatica y son accesibles desde cualquier dispositivo con navegador. Dentro de un notebook puedes acceder a cualquier ruta de EOS usando operaciones de archivo estandar de Python o <code>TFile::Open</code> de ROOT, sin necesidad de copiar datos a un disco local antes de trabajar con ellos.</p>
<p>Esta estrecha integracion tambien simplifica el trabajo en equipo: puedes dar acceso a tus notebooks a tus colegas simplemente compartiendo la carpeta correspondiente de CERNBox. Los archivos de datos grandes almacenados en cualquier parte de EOS se pueden leer directamente desde tus notebooks sin descargarlos localmente, lo cual es especialmente util para conjuntos de datos de experimentos que seria poco practico duplicar.</p>

<h2>Compartir y colaborar</h2>
<p>SWAN ofrece varias formas de compartir tu trabajo y colaborar con otros. La mas directa es el <strong>uso compartido de CERNBox</strong>: al compartir la carpeta de CERNBox que contiene tus notebooks, tus colegas reciben un enlace directo y pueden abrir tu trabajo en sus propias sesiones de SWAN. Para inspiracion y aprendizaje, la <strong>SWAN Gallery</strong> alberga notebooks de ejemplo publicados por los experimentos y servicios del CERN, donde puedes descubrir tecnicas de analisis y buenas practicas utilizadas en toda la organizacion.</p>
<p>Cuando la reproducibilidad es importante, los <strong>Proyectos SWAN</strong> te permiten agrupar notebooks, archivos de datos y configuracion del entorno en un paquete autocontenido que otros pueden lanzar con un solo clic. Tambien puedes exportar tus notebooks como HTML, PDF o scripts de Python, lo que los hace adecuados para presentaciones, informes y documentacion que necesite compartirse fuera de la plataforma SWAN.</p>

<h2>Consejos y buenas practicas</h2>
<p>Aunque SWAN guarda automaticamente tus notebooks de forma periodica, es buena practica <strong>guardar manualmente</strong> antes de ejecutar calculos largos, para no arriesgarte a perder cambios recientes. Si necesitas paquetes de Python que no estan incluidos en el stack LCG por defecto, puedes configurar un <strong>entorno virtual</strong> dentro de tu sesion de SWAN e instalar alli dependencias adicionales.</p>
<p>Dado que los recursos de SWAN son compartidos entre todos los usuarios del CERN, recuerda <strong>cerrar tu sesion</strong> cuando termines de trabajar para que la CPU y la memoria queden libres para otros. SWAN tambien proporciona <strong>acceso a terminales</strong>, lo cual puede ser util para ejecutar herramientas de linea de comandos, gestionar archivos en EOS o instalar paquetes manualmente. Para conocer las ultimas funcionalidades, stacks de software soportados y problemas conocidos, consulta la <a href="https://swan.docs.cern.ch" target="_blank" rel="noopener noreferrer">documentacion de SWAN</a> con regularidad.</p>
