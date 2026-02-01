export const rootSetupTranslations = {
  es: {
    root_page_title: 'Inicio rapido con ROOT - CERN Starter Pack',
    root_breadcrumb_home: 'Inicio',
    root_breadcrumb_tech: 'Ayuda Tecnica',
    root_breadcrumb_current: 'Inicio rapido con ROOT',
    root_last_updated: 'Ultima actualizacion: Febrero 2026',
    root_heading: 'Guia de inicio rapido del framework ROOT',
    root_what_title: 'Que es ROOT?',
    root_what_p1:
      'ROOT es un framework de codigo abierto en C++ y Python desarrollado en CERN para el procesamiento de datos, analisis estadistico, visualizacion y almacenamiento en fisica de altas energias (HEP). Es la herramienta estandar para analizar datos de fisica de particulas y es utilizado por practicamente todos los experimentos del CERN.',
    root_what_p2:
      'ROOT proporciona estructuras de datos especializadas (como TTree para datos columnares), histogramas, ajuste de curvas y un potente sistema de E/S basado en el formato de archivo <code>.root</code>. Tambien incluye CLING, un interprete interactivo de C++, y PyROOT, una interfaz Python para todas las clases de ROOT.',
    root_swan_title: 'Opcion sin instalacion: SWAN',
    root_swan_p1:
      'Si quieres empezar a usar ROOT inmediatamente sin instalar nada, CERN proporciona <strong>SWAN</strong> (Service for Web-based ANalysis) en <a href="https://swan.cern.ch" target="_blank" rel="noopener">swan.cern.ch</a>. SWAN es un servicio basado en JupyterHub que te ofrece un entorno de notebooks con ROOT, PyROOT y muchos otros paquetes cientificos de Python preinstalados.',
    root_swan_p2:
      'Simplemente inicia sesion con tus credenciales de CERN, elige una pila de software y comienza a programar. SWAN se conecta a tu almacenamiento EOS, para que puedas acceder a tus archivos de datos directamente. Es la forma mas rapida de empezar con ROOT en CERN.',
    root_install_title: 'Metodos de instalacion',
    root_install_conda: 'Conda (Recomendado para maquinas personales)',
    root_install_conda_p:
      'La forma mas facil de instalar ROOT en tu maquina personal es via conda-forge:',
    root_install_snap: 'Snap (Linux)',
    root_install_snap_p:
      'En distribuciones Linux que soportan paquetes Snap:',
    root_install_brew: 'Homebrew (macOS)',
    root_install_brew_p: 'En macOS con Homebrew instalado:',
    root_install_prebuilt: 'Binarios precompilados',
    root_install_prebuilt_p:
      'Descarga binarios precompilados para tu plataforma desde el sitio web oficial de ROOT en <a href="https://root.cern/install/" target="_blank" rel="noopener">root.cern/install</a>. Extrae el archivo y ejecuta el script de configuracion:',
    root_install_lxplus: 'En lxplus (CVMFS)',
    root_install_lxplus_p:
      'En las maquinas lxplus de CERN, ROOT esta disponible a traves de CVMFS sin necesidad de instalacion. Simplemente configura el entorno de software LCG:',
    root_first_title: 'Primeros pasos con ROOT',
    root_first_cling: 'C++ interactivo (CLING)',
    root_first_cling_p:
      'Inicia el interprete interactivo de C++ de ROOT escribiendo <code>root</code> en tu terminal:',
    root_first_pyroot: 'PyROOT',
    root_first_pyroot_p:
      'Usa ROOT desde Python con las bindings de PyROOT:',
    root_first_read: 'Leer archivos .root',
    root_first_read_p: 'Abre y explora un archivo ROOT existente:',
    root_first_numpy: 'Integracion con NumPy / pandas',
    root_first_numpy_p:
      'Convierte datos de ROOT a arrays de NumPy o DataFrames de pandas para usarlos con el ecosistema Python mas amplio:',
    root_resources_title: 'Recursos esenciales',
    root_res_reference: 'Documentacion de referencia de ROOT',
    root_res_tutorials: 'Tutoriales de ROOT (con codigo fuente)',
    root_res_rdf: 'Documentacion de RDataFrame',
    root_res_swan: 'SWAN - Service for Web-based ANalysis',
    root_res_forum: 'Foro de usuarios de ROOT',
    root_res_github: 'ROOT en GitHub',
    root_tasks_title: 'Tareas comunes de la primera semana',
    root_task_1:
      'Abre una sesion de SWAN y ejecuta un notebook tutorial de ROOT para familiarizarte con el entorno.',
    root_task_2:
      'Configura ROOT en lxplus usando CVMFS y ejecuta <code>root --version</code> para confirmar que funciona.',
    root_task_3:
      'Pide a tu supervisor o equipo un archivo <code>.root</code> de ejemplo de tu experimento y practica abriendolo con <code>TFile</code> y explorando su contenido.',
    root_task_4:
      'Intenta crear un histograma a partir de una rama de TTree usando tanto el interprete C++ como PyROOT.',
    root_task_5:
      'Explora RDataFrame, la interfaz moderna de analisis de ROOT, para filtrar, definir nuevas columnas y crear graficos.',
    root_task_6:
      'Instala ROOT en tu portatil personal (via Conda o Homebrew) para poder desarrollar sin conexion.',
    root_task_7:
      'Guarda en favoritos el foro de ROOT y la documentacion de referencia para cuando necesites ayuda.',
    root_print: 'Imprimir esta pagina',
  },
  en: {
    root_page_title: 'ROOT Framework Quick-Start - CERN Starter Pack',
    root_breadcrumb_home: 'Home',
    root_breadcrumb_tech: 'Technical Help',
    root_breadcrumb_current: 'ROOT Quick-Start',
    root_last_updated: 'Last updated: February 2026',
    root_heading: 'ROOT Framework Quick-Start Guide',
    root_what_title: 'What is ROOT?',
    root_what_p1:
      'ROOT is an open-source C++ and Python framework developed at CERN for data processing, statistical analysis, visualization, and storage in high-energy physics (HEP). It is the standard tool for analyzing particle physics data and is used by virtually every experiment at CERN.',
    root_what_p2:
      'ROOT provides specialized data structures (such as TTree for columnar data), histogramming, curve fitting, and a powerful I/O system based on the <code>.root</code> file format. It also includes CLING, an interactive C++ interpreter, and PyROOT, a Python interface to all ROOT classes.',
    root_swan_title: 'Zero-Install Option: SWAN',
    root_swan_p1:
      'If you want to start using ROOT immediately without installing anything, CERN provides <strong>SWAN</strong> (Service for Web-based ANalysis) at <a href="https://swan.cern.ch" target="_blank" rel="noopener">swan.cern.ch</a>. SWAN is a JupyterHub-based service that gives you a notebook environment with ROOT, PyROOT, and many other scientific Python packages pre-installed.',
    root_swan_p2:
      'Simply log in with your CERN credentials, choose a software stack, and start coding. SWAN connects to your EOS storage, so you can access your data files directly. This is the fastest way to get started with ROOT at CERN.',
    root_install_title: 'Installation Methods',
    root_install_conda: 'Conda (Recommended for personal machines)',
    root_install_conda_p:
      'The easiest way to install ROOT on your personal machine is via conda-forge:',
    root_install_snap: 'Snap (Linux)',
    root_install_snap_p:
      'On Linux distributions that support Snap packages:',
    root_install_brew: 'Homebrew (macOS)',
    root_install_brew_p: 'On macOS with Homebrew installed:',
    root_install_prebuilt: 'Pre-built Binaries',
    root_install_prebuilt_p:
      'Download pre-compiled binaries for your platform from the official ROOT website at <a href="https://root.cern/install/" target="_blank" rel="noopener">root.cern/install</a>. Extract the archive and source the setup script:',
    root_install_lxplus: 'On lxplus (CVMFS)',
    root_install_lxplus_p:
      'On CERN\'s lxplus machines, ROOT is available through CVMFS without any installation. Simply set up the LCG software environment:',
    root_first_title: 'First Steps with ROOT',
    root_first_cling: 'Interactive C++ (CLING)',
    root_first_cling_p:
      'Launch ROOT\'s interactive C++ interpreter by typing <code>root</code> in your terminal:',
    root_first_pyroot: 'PyROOT',
    root_first_pyroot_p:
      'Use ROOT from Python with the PyROOT bindings:',
    root_first_read: 'Reading .root Files',
    root_first_read_p: 'Open and explore an existing ROOT file:',
    root_first_numpy: 'NumPy / pandas Integration',
    root_first_numpy_p:
      'Convert ROOT data to NumPy arrays or pandas DataFrames for use with the broader Python ecosystem:',
    root_resources_title: 'Essential Resources',
    root_res_reference: 'ROOT Reference Documentation',
    root_res_tutorials: 'ROOT Tutorials (with source code)',
    root_res_rdf: 'RDataFrame Documentation',
    root_res_swan: 'SWAN - Service for Web-based ANalysis',
    root_res_forum: 'ROOT User Forum',
    root_res_github: 'ROOT on GitHub',
    root_tasks_title: 'Common First-Week Tasks',
    root_task_1:
      'Open a SWAN session and run a ROOT tutorial notebook to get familiar with the environment.',
    root_task_2:
      'Set up ROOT on lxplus using CVMFS and run <code>root --version</code> to confirm it works.',
    root_task_3:
      'Ask your supervisor or team for a sample <code>.root</code> file from your experiment and practice opening it with <code>TFile</code> and browsing its contents.',
    root_task_4:
      'Try creating a histogram from a TTree branch using both the C++ interpreter and PyROOT.',
    root_task_5:
      'Explore RDataFrame, ROOT\'s modern analysis interface, for filtering, defining new columns, and creating plots.',
    root_task_6:
      'Install ROOT on your personal laptop (via Conda or Homebrew) so you can develop offline.',
    root_task_7:
      'Bookmark the ROOT forum and reference documentation for when you need help.',
    root_print: 'Print this page',
  },
};
