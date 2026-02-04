---
title: "Guia: VS Code Remote (WSL en Windows) a CERN lxplus"
description: "Guia para usar VS Code Remote via WSL en Windows para conectarse a CERN lxplus y otros servidores Linux."
og:
  title: "VS Code Remote a CERN lxplus - CERN Starter Pack"
  description: "Guia paso a paso para conectar VS Code a CERN lxplus usando WSL y SSH en Windows."
---

<h1>Usar VS Code Remote via WSL en Windows para Conectarse a CERN lxplus (y Otros Servidores Linux)</h1>
      <h2>1. Instalar y Configurar WSL y SSH en Windows</h2>
      <p>En Windows 10/11 puedes habilitar el Subsistema de Windows para Linux (WSL) ejecutando el comando <code>wsl --install</code> en un PowerShell con permisos elevados. Esto instalara la distribucion Linux por defecto (normalmente Ubuntu) y la configurara. Una vez instalado WSL y reiniciado el sistema, abre la terminal de Linux (Ubuntu). Deberas tener un cliente SSH disponible (Ubuntu suele incluir <code>openssh-client</code> por defecto). Si no esta presente, instalalo con <code>sudo apt update &amp;&amp; sudo apt install openssh-client</code>. (Windows tambien ofrece un cliente OpenSSH, pero usar el SSH de WSL asegura que uses la misma configuracion y archivos de claves de estilo Linux que tus otras herramientas.)</p>
      <p><strong>Consejo opcional:</strong> Se recomienda usar WSL 2 (que tiene un kernel Linux completo) para mejor compatibilidad. Puedes comprobar tu version de WSL con <code>wsl -l -v</code> y actualizar si es necesario.</p>
