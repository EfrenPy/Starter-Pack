---
layout: layouts/page.njk
title: "Guide: VS Code Remote (WSL on Windows) to CERN lxplus"
description: "Guide to using VS Code Remote via WSL on Windows to connect to CERN lxplus and other Linux servers."
og:
  title: "VS Code Remote to CERN lxplus - CERN Starter Pack"
  description: "Step-by-step guide for connecting VS Code to CERN lxplus using WSL and SSH on Windows."
datePublished: "2025-06-01"
dateModified: "2026-02-01"
dateUpdated: "2026-02"
---

<h1>Using VS Code Remote via WSL on Windows to Connect to CERN lxplus (and Other Linux Servers)</h1>
      <h2>1. Installing and Setting up WSL and SSH on Windows</h2>
      <p>On Windows 10/11 you can enable the Windows Subsystem for Linux (WSL) by running the <code>wsl --install</code> command in an elevated PowerShell:contentReference[oaicite:0]{index=0}. This will install the default Linux distro (usually Ubuntu) and set it up. Once WSL is installed and restarted, open the Linux shell (Ubuntu). You should have an SSH client available (Ubuntu typically includes <code>openssh-client</code> by default). If it's not present, install it with <code>sudo apt update &amp;&amp; sudo apt install openssh-client</code>. (Windows itself also offers an OpenSSH client feature, but using WSL's SSH ensures you use the same Linux-style configuration and key files as your other Linux tools:contentReference[oaicite:1]{index=1}.)</p>
      <p><strong>Optional tip:</strong> It's recommended to use WSL 2 (which has a full Linux kernel) for better compatibility. You can check your WSL version with <code>wsl -l -v</code> and upgrade if needed:contentReference[oaicite:2]{index=2}.</p>
