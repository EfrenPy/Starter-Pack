---
title: "Guide: VS Code Remote (WSL on Windows) to CERN lxplus"
description: "Guide to using VS Code Remote via WSL on Windows to connect to CERN lxplus and other Linux servers."
og:
  title: "VS Code Remote to CERN lxplus - CERN Starter Pack"
  description: "Step-by-step guide for connecting VS Code to CERN lxplus using WSL and SSH on Windows."
---

# Using VS Code Remote via WSL on Windows to Connect to CERN lxplus (and Other Linux Servers)

## 1. Installing and Setting up WSL and SSH on Windows

On Windows 10/11 you can enable the Windows Subsystem for Linux (WSL) by running the `wsl --install` command in an elevated PowerShell:contentReference[oaicite:0]{index=0}. This will install the default Linux distro (usually Ubuntu) and set it up. Once WSL is installed and restarted, open the Linux shell (Ubuntu). You should have an SSH client available (Ubuntu typically includes `openssh-client` by default). If it's not present, install it with `sudo apt update && sudo apt install openssh-client`. (Windows itself also offers an OpenSSH client feature, but using WSL's SSH ensures you use the same Linux-style configuration and key files as your other Linux tools:contentReference[oaicite:1]{index=1}.)

**Optional tip:** It's recommended to use WSL 2 (which has a full Linux kernel) for better compatibility. You can check your WSL version with `wsl -l -v` and upgrade if needed:contentReference[oaicite:2]{index=2}.
