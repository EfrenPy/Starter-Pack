---
title: "Inicio rapido con ROOT - CERN Starter Pack"
description: "Guia de inicio rapido del framework ROOT para analisis de datos en CERN, incluyendo instalacion, SWAN, PyROOT y tareas comunes de la primera semana."
og:
  title: "Inicio rapido con ROOT - CERN Starter Pack"
  description: "Comienza con el framework ROOT de C++/Python para analisis de fisica de altas energias en CERN."
breadcrumbs:
  - { label: "Inicio", url: "/es/" }
  - { label: "Ayuda Tecnica", url: "/es/technical-hub/" }
  - { label: "Inicio rapido con ROOT" }
---

# Guia de inicio rapido del framework ROOT

## Que es ROOT?

ROOT es un framework de codigo abierto en C++ y Python desarrollado en CERN para el procesamiento de datos, analisis estadistico, visualizacion y almacenamiento en fisica de altas energias (HEP). Es la herramienta estandar para analizar datos de fisica de particulas y es utilizado por practicamente todos los experimentos del CERN.

ROOT proporciona estructuras de datos especializadas (como TTree para datos columnares), histogramas, ajuste de curvas y un potente sistema de E/S basado en el formato de archivo `.root`. Tambien incluye CLING, un interprete interactivo de C++, y PyROOT, una interfaz Python para todas las clases de ROOT.

## Opcion sin instalacion: SWAN

Si quieres empezar a usar ROOT inmediatamente sin instalar nada, CERN proporciona **SWAN** (Service for Web-based ANalysis) en <a href="https://swan.cern.ch" target="_blank" rel="noopener noreferrer">swan.cern.ch</a>. SWAN es un servicio basado en JupyterHub que te ofrece un entorno de notebooks con ROOT, PyROOT y muchos otros paquetes cientificos de Python preinstalados.

Simplemente inicia sesion con tus credenciales de CERN, elige una pila de software y comienza a programar. SWAN se conecta a tu almacenamiento EOS, para que puedas acceder a tus archivos de datos directamente. Es la forma mas rapida de empezar con ROOT en CERN.

## Metodos de instalacion

### Conda (Recomendado para maquinas personales)

La forma mas facil de instalar ROOT en tu maquina personal es via conda-forge:

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

Descarga binarios precompilados para tu plataforma desde el sitio web oficial de ROOT en <a href="https://root.cern/install/" target="_blank" rel="noopener noreferrer">root.cern/install</a>. Extrae el archivo y ejecuta el script de configuracion:

```
tar -xzf root_v6.XX.YY.Linux-ubuntu22-x86_64-gcc11.4.tar.gz
source root/bin/thisroot.sh
```

### En lxplus (CVMFS)

En las maquinas lxplus de CERN, ROOT esta disponible a traves de CVMFS sin necesidad de instalacion. Simplemente configura el entorno de software LCG:

```
# Listar releases LCG disponibles
ls /cvmfs/sft.cern.ch/lcg/views/

# Configurar un release LCG especifico (ejemplo)
source /cvmfs/sft.cern.ch/lcg/views/LCG_105/x86_64-el9-gcc13-opt/setup.sh

# Verificar que ROOT esta disponible
root --version
```

## Primeros pasos con ROOT

### C++ interactivo (CLING)

Inicia el interprete interactivo de C++ de ROOT escribiendo `root` en tu terminal:

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
tree.Draw("pt")  # Grafico rapido de una rama
```

### Integracion con NumPy / pandas

Convierte datos de ROOT a arrays de NumPy o DataFrames de pandas para usarlos con el ecosistema Python mas amplio:

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

- <a href="https://root.cern/doc/master/" target="_blank" rel="noopener noreferrer">Documentacion de referencia de ROOT</a>
- <a href="https://root.cern/doc/master/group__tutorial__hist.html" target="_blank" rel="noopener noreferrer">Tutoriales de ROOT (con codigo fuente)</a>
- <a href="https://root.cern/doc/master/classROOT_1_1RDataFrame.html" target="_blank" rel="noopener noreferrer">Documentacion de RDataFrame</a>
- <a href="https://swan.cern.ch" target="_blank" rel="noopener noreferrer">SWAN - Service for Web-based ANalysis</a>
- <a href="https://root-forum.cern.ch" target="_blank" rel="noopener noreferrer">Foro de usuarios de ROOT</a>
- <a href="https://github.com/root-project/root" target="_blank" rel="noopener noreferrer">ROOT en GitHub</a>

## Tareas comunes de la primera semana

- Abre una sesion de SWAN y ejecuta un notebook tutorial de ROOT para familiarizarte con el entorno.
- Configura ROOT en lxplus usando CVMFS y ejecuta `root --version` para confirmar que funciona.
- Pide a tu supervisor o equipo un archivo `.root` de ejemplo de tu experimento y practica abriendolo con `TFile` y explorando su contenido.
- Intenta crear un histograma a partir de una rama de TTree usando tanto el interprete C++ como PyROOT.
- Explora RDataFrame, la interfaz moderna de analisis de ROOT, para filtrar, definir nuevas columnas y crear graficos.
- Instala ROOT en tu portatil personal (via Conda o Homebrew) para poder desarrollar sin conexion.
- Guarda en favoritos el foro de ROOT y la documentacion de referencia para cuando necesites ayuda.
