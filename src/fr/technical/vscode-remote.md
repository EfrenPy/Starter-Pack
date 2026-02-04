---
title: "Guide : VS Code Remote (WSL sous Windows) vers CERN lxplus"
description: "Guide d’utilisation de VS Code Remote via WSL sous Windows pour se connecter à CERN lxplus et autres serveurs Linux."
og:
  title: "VS Code Remote vers CERN lxplus - CERN Starter Pack"
  description: "Guide pas à pas pour connecter VS Code à CERN lxplus en utilisant WSL et SSH sous Windows."
---

<h1>Utiliser VS Code Remote via WSL sous Windows pour se connecter à CERN lxplus (et autres serveurs Linux)</h1>
      <h2>1. Installation et configuration de WSL et SSH sous Windows</h2>
      <p>Sous Windows 10/11, vous pouvez activer le Sous-système Windows pour Linux (WSL) en exécutant la commande <code>wsl --install</code> dans un PowerShell élevé:contentReference[oaicite:0]{index=0}. Cela installera la distribution Linux par défaut (généralement Ubuntu) et la configurera. Une fois WSL installé et redémarré, ouvrez le shell Linux (Ubuntu). Vous devriez disposer d’un client SSH (Ubuntu inclut généralement <code>openssh-client</code> par défaut). S’il n’est pas présent, installez-le avec <code>sudo apt update && sudo apt install openssh-client</code>. (Windows propose également une fonctionnalité client OpenSSH, mais utiliser le SSH de WSL garantit que vous utilisez la même configuration et les mêmes fichiers de clés de style Linux que vos autres outils Linux:contentReference[oaicite:1]{index=1}.)</p>
      <p><strong>Astuce optionnelle :</strong> Il est recommandé d’utiliser WSL 2 (qui dispose d’un noyau Linux complet) pour une meilleure compatibilité. Vous pouvez vérifier votre version de WSL avec <code>wsl -l -v</code> et mettre à niveau si nécessaire:contentReference[oaicite:2]{index=2}.</p>
