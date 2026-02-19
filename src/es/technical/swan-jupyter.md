---
title: "SWAN Jupyter Notebooks - CERN Starter Pack"
description: "Guía del servicio SWAN del CERN para análisis interactivo de datos con Jupyter notebooks, incluyendo configuración, integración con ROOT, almacenamiento EOS y colaboración."
og:
  title: "SWAN Jupyter Notebooks - CERN Starter Pack"
  description: "Empieza a usar SWAN, la plataforma de Jupyter notebooks en la nube del CERN para análisis interactivo de datos."
breadcrumbs:
  - { label: "Inicio", url: "/es/" }
  - { label: "Ayuda Técnica", url: "/es/technical-hub/" }
  - { label: "SWAN (Jupyter)" }
---

# SWAN: Jupyter Notebooks en el CERN

<div class="alert">
<p><strong>Nota:</strong> SWAN requiere una cuenta de computación del CERN activa. Asegúrate de que tu cuenta esté activada antes de intentar acceder al servicio.</p>
</div>

## Qué es SWAN?

SWAN (Service for Web-based ANalysis) es la plataforma en la nube del CERN para análisis interactivo de datos mediante Jupyter notebooks. Proporciona un entorno basado en navegador donde puedes escribir y ejecutar código Python, C++ o ROOT sin instalar nada en tu máquina local.

SWAN está construido sobre JupyterHub y se integra estrechamente con la infraestructura del CERN, incluyendo el almacenamiento EOS, los stacks de software CVMFS y los clusters Spark. Puedes acceder en <a href="https://swan.cern.ch" target="_blank" rel="noopener noreferrer">swan.cern.ch</a> usando tus credenciales del CERN.

## Cómo empezar

Para comenzar a trabajar con SWAN, abre tu navegador y ve a <a href="https://swan.cern.ch" target="_blank" rel="noopener noreferrer">swan.cern.ch</a>, donde iniciarás sesión con tus credenciales de Single Sign-On (SSO) del CERN. Una vez autenticado, la plataforma te pedirá que configures tu sesión. Primero, elige un **entorno de software** (conocido como release LCG) que incluya las librerías y herramientas que necesitas. Si no estás seguro de cuál elegir, la selección por defecto cubre la mayoría de los casos y es un buen punto de partida.

A continuación, selecciona una **asignación de recursos**, que determina el número de núcleos de CPU y la cantidad de memoria disponible para tu sesión. La configuración por defecto suele ser suficiente cuando estás empezando. Tras realizar tus selecciones, haz clic en **Start my Session** y un entorno Jupyter completamente configurado se lanzará en tu navegador en cuestión de segundos.

Tus archivos se almacenan automáticamente en tu espacio de CERNBox (EOS). Desde la página de inicio puedes crear un nuevo notebook, o puedes usar el explorador de archivos integrado para abrir notebooks existentes que tú o tus colegas hayáis guardado previamente.

## Usar ROOT en SWAN

SWAN viene con el framework de análisis de datos **ROOT** preinstalado en todos los entornos de software LCG, lo que lo convierte en la forma más rápida de empezar a trabajar con ROOT en el CERN. A través de **PyROOT**, puedes realizar análisis de datos, crear histogramas, ajustar funciones y producir gráficos de calidad para publicaciones directamente dentro de un notebook de Python. Si prefieres trabajar en C++, SWAN también soporta notebooks de ROOT C++ mediante el **kernel ROOT C++**, que te permite escribir y ejecutar código C++ de forma interactiva en la misma interfaz del navegador.

Todas las librerías estándar de ROOT y sus tutoriales están disponibles de forma inmediata, sin necesidad de instalar ni configurar nada adicional. Además, puedes combinar ROOT con otras librerías científicas de Python como NumPy, pandas y matplotlib en el mismo notebook, lo que te da acceso a un amplio ecosistema de herramientas para el análisis y la visualización.

## Almacenamiento e integración con EOS

SWAN se integra directamente con el sistema de almacenamiento distribuido **EOS** del CERN a través de **CERNBox**. Todos tus notebooks de SWAN se guardan en tu espacio de CERNBox, lo que significa que tienen copia de seguridad automática y son accesibles desde cualquier dispositivo con navegador. Dentro de un notebook puedes acceder a cualquier ruta de EOS usando operaciones de archivo estándar de Python o `TFile::Open` de ROOT, sin necesidad de copiar datos a un disco local antes de trabajar con ellos.

Esta estrecha integración también simplifica el trabajo en equipo: puedes dar acceso a tus notebooks a tus colegas simplemente compartiendo la carpeta correspondiente de CERNBox. Los archivos de datos grandes almacenados en cualquier parte de EOS se pueden leer directamente desde tus notebooks sin descargarlos localmente, lo cual es especialmente útil para conjuntos de datos de experimentos que sería poco práctico duplicar.

## Compartir y colaborar

SWAN ofrece varias formas de compartir tu trabajo y colaborar con otros. La más directa es el **uso compartido de CERNBox**: al compartir la carpeta de CERNBox que contiene tus notebooks, tus colegas reciben un enlace directo y pueden abrir tu trabajo en sus propias sesiones de SWAN. Para inspiración y aprendizaje, la **SWAN Gallery** alberga notebooks de ejemplo publicados por los experimentos y servicios del CERN, donde puedes descubrir técnicas de análisis y buenas prácticas utilizadas en toda la organización.

Cuando la reproducibilidad es importante, los **Proyectos SWAN** te permiten agrupar notebooks, archivos de datos y configuración del entorno en un paquete autocontenido que otros pueden lanzar con un solo clic. También puedes exportar tus notebooks como HTML, PDF o scripts de Python, lo que los hace adecuados para presentaciones, informes y documentación que necesite compartirse fuera de la plataforma SWAN.

## Consejos y buenas prácticas

Aunque SWAN guarda automáticamente tus notebooks de forma periódica, es buena práctica **guardar manualmente** antes de ejecutar cálculos largos, para no arriesgarte a perder cambios recientes. Si necesitas paquetes de Python que no están incluidos en el stack LCG por defecto, puedes configurar un **entorno virtual** dentro de tu sesión de SWAN e instalar allí dependencias adicionales.

Dado que los recursos de SWAN son compartidos entre todos los usuarios del CERN, recuerda **cerrar tu sesión** cuando termines de trabajar para que la CPU y la memoria queden libres para otros. SWAN también proporciona **acceso a terminales**, lo cual puede ser útil para ejecutar herramientas de línea de comandos, gestionar archivos en EOS o instalar paquetes manualmente. Para conocer las últimas funcionalidades, stacks de software soportados y problemas conocidos, consulta la <a href="https://swan.docs.cern.ch" target="_blank" rel="noopener noreferrer">documentación de SWAN</a> con regularidad.
