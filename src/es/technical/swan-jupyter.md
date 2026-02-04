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
      <p>Para comenzar a usar SWAN, sigue estos pasos:</p>
      <ul>
        <li>Ve a <a href="https://swan.cern.ch" target="_blank" rel="noopener noreferrer">swan.cern.ch</a> e inicia sesion con tus credenciales de Single Sign-On (SSO) del CERN.</li>
        <li>Elige un <strong>entorno de software</strong> (release LCG) que incluya las librerias y herramientas que necesitas. Si no estas seguro, la seleccion por defecto funciona para la mayoria de los casos.</li>
        <li>Selecciona una <strong>asignacion de recursos</strong> (numero de nucleos de CPU y memoria). La configuracion por defecto suele ser suficiente para empezar.</li>
        <li>Haz clic en <strong>Start my Session</strong>. Una sesion de Jupyter se iniciara en tu navegador en segundos.</li>
      </ul>
      <p>Tus archivos se almacenan automaticamente en tu espacio de CERNBox (EOS). Puedes crear un nuevo notebook desde la pagina de inicio o abrir notebooks existentes desde el explorador de archivos.</p>

      <h2>Usar ROOT en SWAN</h2>
      <p>SWAN viene con el framework de analisis de datos ROOT preinstalado en todos los entornos de software LCG. Esto lo convierte en la forma mas rapida de empezar a trabajar con ROOT en el CERN:</p>
      <ul>
        <li>Usa <strong>PyROOT</strong> en notebooks de Python para realizar analisis de datos, crear histogramas, ajustar funciones y producir graficos de calidad para publicaciones directamente en el notebook.</li>
        <li>Los notebooks de ROOT C++ tambien estan soportados a traves del <strong>kernel ROOT C++</strong>, permitiendo escribir y ejecutar codigo C++ de forma interactiva.</li>
        <li>Todas las librerias estandar de ROOT y sus tutoriales estan disponibles de forma inmediata.</li>
        <li>Puedes combinar ROOT con otras librerias cientificas de Python como NumPy, pandas y matplotlib en el mismo notebook.</li>
      </ul>

      <h2>Almacenamiento e integracion con EOS</h2>
      <p>SWAN se integra directamente con el sistema de almacenamiento distribuido EOS del CERN a traves de CERNBox:</p>
      <ul>
        <li>Todos tus notebooks de SWAN se guardan en tu espacio de <strong>CERNBox</strong>, lo que significa que tienen copia de seguridad y son accesibles desde cualquier dispositivo.</li>
        <li>Puedes acceder a cualquier ruta de EOS desde tus notebooks usando operaciones de archivo estandar o <code>TFile::Open</code> de ROOT.</li>
        <li>Comparte notebooks facilmente compartiendo las carpetas correspondientes de CERNBox con tus colegas.</li>
        <li>Los archivos de datos grandes almacenados en EOS se pueden leer directamente desde tus notebooks sin necesidad de descargarlos localmente.</li>
      </ul>

      <h2>Compartir y colaborar</h2>
      <p>SWAN ofrece varias formas de compartir tu trabajo y colaborar con otros:</p>
      <ul>
        <li><strong>Compartir via CERNBox:</strong> Comparte enlaces a notebooks con colegas compartiendo la carpeta de CERNBox que los contiene.</li>
        <li><strong>SWAN Gallery:</strong> Explora notebooks de ejemplo publicados por los experimentos y servicios del CERN para aprender buenas practicas y descubrir tecnicas de analisis.</li>
        <li><strong>Proyectos SWAN:</strong> Crea proyectos autocontenidos que agrupan notebooks, archivos de datos y configuracion del entorno para facilitar la reproducibilidad.</li>
        <li><strong>Opciones de exportacion:</strong> Los notebooks se pueden exportar como HTML, PDF o scripts de Python, lo que los hace adecuados para presentaciones, informes y documentacion.</li>
      </ul>

      <h2>Consejos y buenas practicas</h2>
      <ul>
        <li><strong>Guarda frecuentemente:</strong> Aunque SWAN guarda automaticamente tus notebooks de forma periodica, es buena practica guardar manualmente antes de ejecutar calculos largos.</li>
        <li><strong>Entornos virtuales:</strong> Si necesitas paquetes de Python que no estan incluidos en el stack LCG por defecto, puedes configurar un entorno virtual dentro de tu sesion de SWAN.</li>
        <li><strong>Cierra sesiones sin usar:</strong> Los recursos de SWAN son compartidos entre todos los usuarios del CERN. Cierra tu sesion cuando termines para liberar recursos para otros.</li>
        <li><strong>Mantente al dia:</strong> Consulta la <a href="https://swan.docs.cern.ch" target="_blank" rel="noopener noreferrer">documentacion de SWAN</a> para conocer las ultimas funcionalidades, stacks de software soportados y problemas conocidos.</li>
        <li><strong>Usa terminales:</strong> SWAN tambien proporciona acceso a terminales, lo cual puede ser util para ejecutar herramientas de linea de comandos, gestionar archivos o instalar paquetes.</li>
      </ul>
