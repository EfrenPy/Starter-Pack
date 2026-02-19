---
title: "Guía de lxplus - CERN Starter Pack"
description: "Guía para usar lxplus en el CERN: qué es, recursos disponibles, directorio home, entornos de software, trabajos batch con HTCondor y límites de recursos."
og:
  title: "Guía de lxplus - CERN Starter Pack"
  description: "Guía para usar lxplus en el CERN: qué es, recursos disponibles, directorio home, entornos de software, trabajos batch con HTCondor y límites de recursos."
breadcrumbs:
  - { label: "Inicio", url: "/es/" }
  - { label: "Ayuda Técnica", url: "/es/technical-hub/" }
  - { label: "Guía de lxplus" }
---

# Guía de lxplus

<div class="alert">
<strong>💡 Consejo</strong><br>
<p>lxplus es un recurso compartido. Los procesos de larga duración o que requieren mucha memoria deben enviarse como trabajos batch a través de HTCondor en lugar de ejecutarse de forma interactiva.</p>
</div>

lxplus es el **servicio de inicio de sesión interactivo** del CERN, que proporciona un entorno Linux compartido donde miles de usuarios del CERN compilan código, ejecutan análisis, acceden a datos y gestionan su trabajo. Es la puerta de entrada principal a la infraestructura de computación del CERN y lo utilizan diariamente físicos, ingenieros y personal técnico de toda la organización. Si necesitas conectarte a lxplus por primera vez, consulta la [página de configuración de Kerberos y SSH](/es/technical/kerberos-ssh/) para las instrucciones de conexión.

## Qué es lxplus

lxplus es un cluster de **nodos de inicio de sesión compartidos** que ejecutan AlmaLinux (la distribución Linux estándar del CERN). Cuando te conectas vía SSH a `lxplus.cern.ch`, se te asigna uno de los nodos disponibles de forma rotativa. Cada sesión te da acceso a un entorno Linux estándar con herramientas de desarrollo comunes, compiladores, editores y acceso a los sistemas de almacenamiento del CERN (EOS y AFS). Las máquinas son potentes pero se comparten entre muchos usuarios simultáneos, por lo que el uso de recursos por sesión está sujeto a límites.

Existen varios **sabores de lxplus** disponibles para necesidades específicas. El `lxplus.cern.ch` por defecto ejecuta la versión actual del sistema operativo estándar. Si necesitas una versión anterior o posterior específica por razones de compatibilidad, variantes como `lxplus9.cern.ch` (AlmaLinux 9) están disponibles. Consulta la documentación de IT del CERN para la lista actual de sabores disponibles.

## Recursos Disponibles

Cada nodo de lxplus ofrece típicamente **múltiples núcleos de CPU y varios gigabytes de RAM** por sesión de usuario. Sin embargo, dado que los nodos son compartidos, existen límites flexibles en el tiempo de CPU y el consumo de memoria por usuario para garantizar un uso equitativo. Las sesiones interactivas están pensadas para desarrollo, depuración, pruebas y análisis cortos — no para ejecutar cargas de trabajo de producción que consuman muchos núcleos o gigabytes de memoria durante horas.

Si tu tarea requiere **recursos de cómputo significativos** — por ejemplo, procesar grandes conjuntos de datos, ejecutar simulaciones Monte Carlo o entrenar modelos de aprendizaje automático — deberías enviarla como un trabajo batch en lugar de ejecutarla interactivamente en lxplus. El sistema batch distribuye tu trabajo en nodos de cómputo dedicados donde puede ejecutarse sin competir con otros usuarios interactivos.

## Directorio Home: AFS vs EOS

Cuando inicias sesión en lxplus, tu directorio home por defecto está en **AFS** (Andrew File System) en `/afs/cern.ch/user/<inicial>/<nombre-usuario>/`. AFS ha sido el sistema de directorio home tradicional en el CERN durante décadas y todavía se utiliza para archivos de configuración, scripts de inicio de sesión y archivos pequeños. Sin embargo, AFS tiene una **cuota limitada** (típicamente 10 GB) y está siendo gradualmente reemplazado por EOS para la mayoría de casos de uso.

Tu **directorio home de EOS** en `/eos/user/<inicial>/<nombre-usuario>/` proporciona una cuota por defecto mucho mayor (1 TB) y es la ubicación recomendada para archivos de análisis, grandes conjuntos de datos y trabajo activo. Tanto AFS como EOS son accesibles desde cualquier nodo de lxplus, por lo que puedes mover archivos entre ellos fácilmente. Como práctica general, mantén tu home de AFS limpio y usa EOS para tus archivos de trabajo principales.

## Entornos de Software

El entorno de software del CERN en lxplus se gestiona a través de **CVMFS** (CernVM File System), un sistema de archivos de solo lectura que distribuye paquetes de software a través de la red. A través de CVMFS, tienes acceso a un vasto catálogo de software precompilado incluyendo ROOT, Geant4, distribuciones de Python y frameworks específicos de cada experimento. Las versiones LCG (pilas de software de la Grid de Computación del LHC) proporcionan colecciones curadas de herramientas y bibliotecas compatibles para análisis de física.

Para configurar un entorno de software específico, típicamente se ejecuta un script de configuración. Por ejemplo, `source /cvmfs/sft.cern.ch/lcg/views/LCG_105/x86_64-el9-gcc12-opt/setup.sh` configura un entorno LCG 105 completo con ROOT, Python y muchas herramientas de análisis. Las configuraciones específicas de cada experimento (como Athena de ATLAS o CMSSW de CMS) tienen sus propios procedimientos de inicialización documentados por cada colaboración.

## Trabajos Batch con HTCondor

Para tareas intensivas en cómputo, el CERN proporciona un **sistema de computación batch basado en HTCondor**. Desde lxplus, puedes enviar trabajos que se ejecutan en un gran pool de nodos de trabajo dedicados sin afectar a los usuarios interactivos. Un envío básico de HTCondor implica escribir un breve **archivo de envío** que especifica tu ejecutable, archivos de entrada, requisitos de recursos (CPU, memoria, disco) y ubicaciones de salida.

Un archivo de envío mínimo podría verse así: definir el ejecutable (tu script), especificar las rutas de los archivos de salida, error y log, solicitar el número deseado de CPUs y memoria, y llamar a `condor_submit` para encolar el trabajo. Luego puedes monitorizar su progreso con `condor_q` y consultar los detalles de trabajos completados con `condor_history`. Para flujos de trabajo a gran escala que involucran cientos o miles de trabajos, herramientas como HTCondor DAGMan del CERN y gestores de flujos de trabajo simplifican el proceso.

## Límites de Recursos y Fair-Share

Los recursos de computación del CERN operan con un modelo de **planificación fair-share**. Cada usuario y experimento tiene una cuota de los recursos totales, y el sistema batch prioriza los trabajos basándose en el uso reciente — si has utilizado una gran cantidad recientemente, tus nuevos trabajos pueden tener menor prioridad hasta que tu cuota se reequilibre. Esto asegura que ningún usuario o grupo individual monopolice el sistema.

En el propio lxplus, se aplican límites de recursos interactivos para proteger el entorno compartido. Los procesos que consumen CPU o memoria excesivos pueden ser terminados automáticamente. Si necesitas recursos dedicados para un proyecto o periodo de tiempo específico, IT del CERN ofrece **máquinas virtuales** e **instancias OpenStack** que proporcionan capacidad de cómputo dedicada bajo tu control — contacta al departamento de IT a través de ServiceNow para discutir las opciones.

## Fuentes

- <a href="https://information-technology.web.cern.ch/services/lxplus-service" target="_blank" rel="noopener noreferrer">CERN IT — Servicio lxplus</a>
- <a href="https://batchdocs.web.cern.ch/" target="_blank" rel="noopener noreferrer">Documentación del Servicio Batch del CERN</a>
- <a href="https://cvmfs.readthedocs.io/" target="_blank" rel="noopener noreferrer">Documentación de CVMFS</a>
