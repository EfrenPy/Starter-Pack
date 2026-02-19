---
title: "Guia de lxplus - CERN Starter Pack"
description: "Guia para usar lxplus en el CERN: que es, recursos disponibles, directorio home, entornos de software, trabajos batch con HTCondor y limites de recursos."
og:
  title: "Guia de lxplus - CERN Starter Pack"
  description: "Guia para usar lxplus en el CERN: que es, recursos disponibles, directorio home, entornos de software, trabajos batch con HTCondor y limites de recursos."
breadcrumbs:
  - { label: "Inicio", url: "/es/" }
  - { label: "Ayuda Tecnica", url: "/es/technical-hub/" }
  - { label: "Guia de lxplus" }
---

# Guia de lxplus

<div class="alert">
<strong>💡 Consejo</strong><br>
<p>lxplus es un recurso compartido. Los procesos de larga duracion o que requieren mucha memoria deben enviarse como trabajos batch a traves de HTCondor en lugar de ejecutarse de forma interactiva.</p>
</div>

lxplus es el **servicio de inicio de sesion interactivo** del CERN, que proporciona un entorno Linux compartido donde miles de usuarios del CERN compilan codigo, ejecutan analisis, acceden a datos y gestionan su trabajo. Es la puerta de entrada principal a la infraestructura de computacion del CERN y lo utilizan diariamente fisicos, ingenieros y personal tecnico de toda la organizacion. Si necesitas conectarte a lxplus por primera vez, consulta la [pagina de configuracion de Kerberos y SSH](/es/technical/kerberos-ssh/) para las instrucciones de conexion.

## Que es lxplus

lxplus es un cluster de **nodos de inicio de sesion compartidos** que ejecutan AlmaLinux (la distribucion Linux estandar del CERN). Cuando te conectas via SSH a `lxplus.cern.ch`, se te asigna uno de los nodos disponibles de forma rotativa. Cada sesion te da acceso a un entorno Linux estandar con herramientas de desarrollo comunes, compiladores, editores y acceso a los sistemas de almacenamiento del CERN (EOS y AFS). Las maquinas son potentes pero se comparten entre muchos usuarios simultaneos, por lo que el uso de recursos por sesion esta sujeto a limites.

Existen varios **sabores de lxplus** disponibles para necesidades especificas. El `lxplus.cern.ch` por defecto ejecuta la version actual del sistema operativo estandar. Si necesitas una version anterior o posterior especifica por razones de compatibilidad, variantes como `lxplus9.cern.ch` (AlmaLinux 9) estan disponibles. Consulta la documentacion de IT del CERN para la lista actual de sabores disponibles.

## Recursos Disponibles

Cada nodo de lxplus ofrece tipicamente **multiples nucleos de CPU y varios gigabytes de RAM** por sesion de usuario. Sin embargo, dado que los nodos son compartidos, existen limites flexibles en el tiempo de CPU y el consumo de memoria por usuario para garantizar un uso equitativo. Las sesiones interactivas estan pensadas para desarrollo, depuracion, pruebas y analisis cortos — no para ejecutar cargas de trabajo de produccion que consuman muchos nucleos o gigabytes de memoria durante horas.

Si tu tarea requiere **recursos de computo significativos** — por ejemplo, procesar grandes conjuntos de datos, ejecutar simulaciones Monte Carlo o entrenar modelos de aprendizaje automatico — deberias enviarla como un trabajo batch en lugar de ejecutarla interactivamente en lxplus. El sistema batch distribuye tu trabajo en nodos de computo dedicados donde puede ejecutarse sin competir con otros usuarios interactivos.

## Directorio Home: AFS vs EOS

Cuando inicias sesion en lxplus, tu directorio home por defecto esta en **AFS** (Andrew File System) en `/afs/cern.ch/user/<inicial>/<nombre-usuario>/`. AFS ha sido el sistema de directorio home tradicional en el CERN durante decadas y todavia se utiliza para archivos de configuracion, scripts de inicio de sesion y archivos pequenos. Sin embargo, AFS tiene una **cuota limitada** (tipicamente 10 GB) y esta siendo gradualmente reemplazado por EOS para la mayoria de casos de uso.

Tu **directorio home de EOS** en `/eos/user/<inicial>/<nombre-usuario>/` proporciona una cuota por defecto mucho mayor (1 TB) y es la ubicacion recomendada para archivos de analisis, grandes conjuntos de datos y trabajo activo. Tanto AFS como EOS son accesibles desde cualquier nodo de lxplus, por lo que puedes mover archivos entre ellos facilmente. Como practica general, mantiene tu home de AFS limpio y usa EOS para tus archivos de trabajo principales.

## Entornos de Software

El entorno de software del CERN en lxplus se gestiona a traves de **CVMFS** (CernVM File System), un sistema de archivos de solo lectura que distribuye paquetes de software a traves de la red. A traves de CVMFS, tienes acceso a un vasto catalogo de software precompilado incluyendo ROOT, Geant4, distribuciones de Python y frameworks especificos de cada experimento. Las versiones LCG (pilas de software de la Grid de Computacion del LHC) proporcionan colecciones curadas de herramientas y bibliotecas compatibles para analisis de fisica.

Para configurar un entorno de software especifico, tipicamente se ejecuta un script de configuracion. Por ejemplo, `source /cvmfs/sft.cern.ch/lcg/views/LCG_105/x86_64-el9-gcc12-opt/setup.sh` configura un entorno LCG 105 completo con ROOT, Python y muchas herramientas de analisis. Las configuraciones especificas de cada experimento (como Athena de ATLAS o CMSSW de CMS) tienen sus propios procedimientos de inicializacion documentados por cada colaboracion.

## Trabajos Batch con HTCondor

Para tareas intensivas en computo, el CERN proporciona un **sistema de computacion batch basado en HTCondor**. Desde lxplus, puedes enviar trabajos que se ejecutan en un gran pool de nodos de trabajo dedicados sin afectar a los usuarios interactivos. Un envio basico de HTCondor implica escribir un breve **archivo de envio** que especifica tu ejecutable, archivos de entrada, requisitos de recursos (CPU, memoria, disco) y ubicaciones de salida.

Un archivo de envio minimo podria verse asi: definir el ejecutable (tu script), especificar las rutas de los archivos de salida, error y log, solicitar el numero deseado de CPUs y memoria, y llamar a `condor_submit` para encolar el trabajo. Luego puedes monitorizar su progreso con `condor_q` y consultar los detalles de trabajos completados con `condor_history`. Para flujos de trabajo a gran escala que involucran cientos o miles de trabajos, herramientas como HTCondor DAGMan del CERN y gestores de flujos de trabajo simplifican el proceso.

## Limites de Recursos y Fair-Share

Los recursos de computacion del CERN operan con un modelo de **planificacion fair-share**. Cada usuario y experimento tiene una cuota de los recursos totales, y el sistema batch prioriza los trabajos basandose en el uso reciente — si has utilizado una gran cantidad recientemente, tus nuevos trabajos pueden tener menor prioridad hasta que tu cuota se reequilibre. Esto asegura que ningun usuario o grupo individual monopolice el sistema.

En el propio lxplus, se aplican limites de recursos interactivos para proteger el entorno compartido. Los procesos que consumen CPU o memoria excesivos pueden ser terminados automaticamente. Si necesitas recursos dedicados para un proyecto o periodo de tiempo especifico, IT del CERN ofrece **maquinas virtuales** e **instancias OpenStack** que proporcionan capacidad de computo dedicada bajo tu control — contacta al departamento de IT a traves de ServiceNow para discutir las opciones.

## Fuentes

- <a href="https://information-technology.web.cern.ch/services/lxplus-service" target="_blank" rel="noopener noreferrer">CERN IT — Servicio lxplus</a>
- <a href="https://batchdocs.web.cern.ch/" target="_blank" rel="noopener noreferrer">Documentacion del Servicio Batch del CERN</a>
- <a href="https://cvmfs.readthedocs.io/" target="_blank" rel="noopener noreferrer">Documentacion de CVMFS</a>
