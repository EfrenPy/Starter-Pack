---
title: "Inicio rápido con ROOT - CERN Starter Pack"
description: "Guía de inicio rápido del framework ROOT para análisis de datos en CERN, incluyendo instalación, SWAN, PyROOT y tareas comunes de la primera semana."
og:
  title: "Inicio rápido con ROOT - CERN Starter Pack"
  description: "Comienza con el framework ROOT de C++/Python para análisis de física de altas energías en CERN."
breadcrumbs:
  - { label: "Inicio", url: "/es/" }
  - { label: "Ayuda Técnica", url: "/es/technical-hub/" }
  - { label: "Inicio rápido con ROOT" }
---

# Guía de inicio rápido del framework ROOT

## Qué es ROOT?

ROOT es un framework de código abierto en C++ y Python desarrollado en CERN para el procesamiento de datos, análisis estadístico, visualización y almacenamiento en física de altas energías (HEP). Es la herramienta estándar para analizar datos de física de partículas y es utilizado por prácticamente todos los experimentos del CERN.

ROOT proporciona estructuras de datos especializadas (como TTree para datos columnares), histogramas, ajuste de curvas y un potente sistema de E/S basado en el formato de archivo `.root`. También incluye CLING, un intérprete interactivo de C++, y PyROOT, una interfaz Python para todas las clases de ROOT.

## Opción sin instalación: SWAN

Si quieres empezar a usar ROOT inmediatamente sin instalar nada, CERN proporciona **SWAN** (Service for Web-based ANalysis) en <a href="https://swan.cern.ch" target="_blank" rel="noopener noreferrer">swan.cern.ch</a>. SWAN es un servicio basado en JupyterHub que te ofrece un entorno de notebooks con ROOT, PyROOT y muchos otros paquetes científicos de Python preinstalados.

Simplemente inicia sesión con tus credenciales de CERN, elige una pila de software y comienza a programar. SWAN se conecta a tu almacenamiento EOS, para que puedas acceder a tus archivos de datos directamente. Es la forma más rápida de empezar con ROOT en CERN.

## Métodos de instalación

### Conda (Recomendado para máquinas personales)

La forma más fácil de instalar ROOT en tu máquina personal es vía conda-forge:

```
conda create -n root-env
conda activate root-env
conda install -c conda-forge root
```

### Snap (Linux)

En distribuciones Linux que soportan paquetes Snap:

```
sudo snap install root-framework
```

### Homebrew (macOS)

En macOS con Homebrew instalado:

```
brew install root
```

### Binarios precompilados

Descarga binarios precompilados para tu plataforma desde el sitio web oficial de ROOT en <a href="https://root.cern/install/" target="_blank" rel="noopener noreferrer">root.cern/install</a>. Extrae el archivo y ejecuta el script de configuración:

```
tar -xzf root_v6.XX.YY.Linux-ubuntu22-x86_64-gcc11.4.tar.gz
source root/bin/thisroot.sh
```

### En lxplus (CVMFS)

En las máquinas lxplus de CERN, ROOT está disponible a través de CVMFS sin necesidad de instalación. Simplemente configura el entorno de software LCG:

```
# Listar releases LCG disponibles
ls /cvmfs/sft.cern.ch/lcg/views/

# Configurar un release LCG específico (ejemplo)
source /cvmfs/sft.cern.ch/lcg/views/LCG_105/x86_64-el9-gcc13-opt/setup.sh

# Verificar que ROOT está disponible
root --version
```

## Primeros pasos con ROOT

### C++ interactivo (CLING)

Inicia el intérprete interactivo de C++ de ROOT escribiendo `root` en tu terminal:

```
$ root
root [0] TH1F *h = new TH1F("h", "My Histogram", 100, -5, 5);
root [1] h->FillRandom("gaus", 10000);
root [2] h->Draw();
root [3] .q
```

### PyROOT

Usa ROOT desde Python con las bindings de PyROOT:

```
import ROOT

# Crear y rellenar un histograma
h = ROOT.TH1F("h", "Gaussian Distribution;x;Entries", 100, -5, 5)
h.FillRandom("gaus", 10000)

# Dibujar en un canvas
c = ROOT.TCanvas("c", "My Canvas", 800, 600)
h.Draw()
c.SaveAs("histogram.png")
```

### Leer archivos .root

Abre y explora un archivo ROOT existente:

```
import ROOT

f = ROOT.TFile.Open("data.root")
f.ls()           # Listar contenidos
tree = f.Get("Events")  # Obtener un TTree
tree.Print()     # Mostrar ramas
tree.Draw("pt")  # Gráfico rápido de una rama
```

### Integración con NumPy / pandas

Convierte datos de ROOT a arrays de NumPy o DataFrames de pandas para usarlos con el ecosistema Python más amplio:

```
import ROOT
import numpy as np

# Usando RDataFrame (enfoque moderno de ROOT)
df = ROOT.RDataFrame("Events", "data.root")
npy = df.AsNumpy(["pt", "eta"])  # Devuelve dict de arrays NumPy

# Convertir a DataFrame de pandas
import pandas as pd
pdf = pd.DataFrame(npy)
```

## Recursos esenciales

- <a href="https://root.cern/doc/master/" target="_blank" rel="noopener noreferrer">Documentación de referencia de ROOT</a>
- <a href="https://root.cern/doc/master/group__tutorial__hist.html" target="_blank" rel="noopener noreferrer">Tutoriales de ROOT (con código fuente)</a>
- <a href="https://root.cern/doc/master/classROOT_1_1RDataFrame.html" target="_blank" rel="noopener noreferrer">Documentación de RDataFrame</a>
- <a href="https://swan.cern.ch" target="_blank" rel="noopener noreferrer">SWAN - Service for Web-based ANalysis</a>
- <a href="https://root-forum.cern.ch" target="_blank" rel="noopener noreferrer">Foro de usuarios de ROOT</a>
- <a href="https://github.com/root-project/root" target="_blank" rel="noopener noreferrer">ROOT en GitHub</a>

## Tareas comunes de la primera semana

- Abre una sesión de SWAN y ejecuta un notebook tutorial de ROOT para familiarizarte con el entorno.
- Configura ROOT en lxplus usando CVMFS y ejecuta `root --version` para confirmar que funciona.
- Pide a tu supervisor o equipo un archivo `.root` de ejemplo de tu experimento y practica abriéndolo con `TFile` y explorando su contenido.
- Intenta crear un histograma a partir de una rama de TTree usando tanto el intérprete C++ como PyROOT.
- Explora RDataFrame, la interfaz moderna de análisis de ROOT, para filtrar, definir nuevas columnas y crear gráficos.
- Instala ROOT en tu portátil personal (vía Conda o Homebrew) para poder desarrollar sin conexión.
- Guarda en favoritos el foro de ROOT y la documentación de referencia para cuando necesites ayuda.
