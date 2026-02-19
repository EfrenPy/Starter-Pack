---
title: "SWAN Jupyter Notebooks - CERN Starter Pack"
description: "Guide to CERN's SWAN service for interactive data analysis with Jupyter notebooks, covering setup, ROOT integration, EOS storage, and collaboration."
og:
  title: "SWAN Jupyter Notebooks - CERN Starter Pack"
  description: "Get started with SWAN, CERN's cloud-based Jupyter notebook platform for interactive data analysis."
breadcrumbs:
  - { label: "Home", url: "/en/" }
  - { label: "Technical Help", url: "/en/technical-hub/" }
  - { label: "SWAN (Jupyter)" }
---

# SWAN: Jupyter Notebooks at CERN

<div class="alert">
<p><strong>Note:</strong> SWAN requires an active CERN computing account. Make sure your account is activated before trying to access the service.</p>
</div>

## What is SWAN?

SWAN (Service for Web-based ANalysis) is CERN's cloud-based platform for interactive data analysis using Jupyter notebooks. It provides a browser-based environment where you can write and run Python, C++, or ROOT code without installing anything on your local machine.

SWAN is built on top of JupyterHub and integrates tightly with CERN's infrastructure, including EOS storage, CVMFS software stacks, and Spark clusters. You can access it at <a href="https://swan.cern.ch" target="_blank" rel="noopener noreferrer">swan.cern.ch</a> using your CERN credentials.

## Getting Started

To begin working with SWAN, open your browser and navigate to <a href="https://swan.cern.ch" target="_blank" rel="noopener noreferrer">swan.cern.ch</a>, where you will log in using your CERN Single Sign-On (SSO) credentials. Once authenticated, the platform will ask you to configure your session. First, choose a **software environment** (known as an LCG release) that includes the libraries and tools you need for your work. If you are not sure which one to pick, the default selection covers most common use cases and is a safe starting point.

Next, select a **resource allocation**, which determines the number of CPU cores and the amount of memory available to your session. The default configuration is generally sufficient when you are just getting started. After making your selections, click **Start my Session** and a fully configured Jupyter environment will launch in your browser within seconds.

Your files are automatically stored on your CERNBox (EOS) space. From the launcher page you can create a new notebook, or you can use the built-in file browser to open existing notebooks that you or your colleagues have previously saved.

## Using ROOT in SWAN

SWAN comes with the **ROOT** data analysis framework pre-installed in every LCG software environment, making it the fastest way to start working with ROOT at CERN. Through **PyROOT**, you can perform data analysis, create histograms, fit functions, and produce publication-quality plots directly inside a Python notebook. If you prefer working in C++, SWAN also supports ROOT C++ notebooks via the **ROOT C++ kernel**, which lets you write and execute C++ code interactively in the same browser-based interface.

All standard ROOT libraries and tutorials are available out of the box, so there is nothing extra to install or configure. You can also combine ROOT with other Python scientific libraries such as NumPy, pandas, and matplotlib within the same notebook, giving you access to a broad ecosystem of tools for analysis and visualization.

## Storage and EOS Integration

SWAN integrates directly with CERN's **EOS** distributed storage system through **CERNBox**. All your SWAN notebooks are stored on your CERNBox space, which means they are automatically backed up and accessible from any device with a browser. Within a notebook you can access any EOS path using standard Python file operations or ROOT's `TFile::Open`, so there is no need to copy data to a local disk before working with it.

This tight integration also simplifies sharing: you can give colleagues access to your notebooks simply by sharing the corresponding CERNBox folder. Large data files stored anywhere on EOS can be read directly from your notebooks without downloading them locally, which is especially useful for experiment datasets that would be impractical to duplicate.

## Sharing and Collaboration

SWAN offers several ways to share your work and collaborate with others. The most straightforward approach is **CERNBox sharing**: by sharing the CERNBox folder that contains your notebooks, colleagues receive a direct link and can open your work in their own SWAN sessions. For inspiration and learning, the **SWAN Gallery** hosts example notebooks published by CERN experiments and services, where you can discover analysis techniques and best practices used across the organization.

When reproducibility matters, **SWAN Projects** let you bundle notebooks, data files, and environment configuration into a self-contained package that others can launch with a single click. You can also export your notebooks as HTML, PDF, or Python scripts, making them suitable for presentations, reports, and documentation that needs to be shared outside the SWAN platform.

## Tips and Best Practices

Although SWAN auto-saves your notebooks periodically, it is good practice to **save manually** before running long computations, so you never risk losing recent changes. If you need Python packages that are not included in the default LCG stack, you can set up a **virtual environment** within your SWAN session and install additional dependencies there.

Because SWAN resources are shared among all CERN users, remember to **close your session** when you are done working so that CPU and memory are freed for others. SWAN also provides **terminal access**, which can be useful for running command-line tools, managing files on EOS, or installing packages manually. For the latest features, supported software stacks, and known issues, consult the <a href="https://swan.docs.cern.ch" target="_blank" rel="noopener noreferrer">SWAN documentation</a> regularly.
