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

<h1>SWAN: Jupyter Notebooks at CERN</h1>
      <div class="alert">
        <p><strong>Note:</strong> SWAN requires an active CERN computing account. Make sure your account is activated before trying to access the service.</p>
      </div>

      <h2>What is SWAN?</h2>
      <p>SWAN (Service for Web-based ANalysis) is CERN's cloud-based platform for interactive data analysis using Jupyter notebooks. It provides a browser-based environment where you can write and run Python, C++, or ROOT code without installing anything on your local machine.</p>
      <p>SWAN is built on top of JupyterHub and integrates tightly with CERN's infrastructure, including EOS storage, CVMFS software stacks, and Spark clusters. You can access it at <a href="https://swan.cern.ch" target="_blank" rel="noopener noreferrer">swan.cern.ch</a> using your CERN credentials.</p>

      <h2>Getting Started</h2>
      <p>To start using SWAN, follow these steps:</p>
      <ul>
        <li>Go to <a href="https://swan.cern.ch" target="_blank" rel="noopener noreferrer">swan.cern.ch</a> and log in with your CERN Single Sign-On (SSO) credentials.</li>
        <li>Choose a <strong>software environment</strong> (LCG release) that includes the libraries and tools you need. If unsure, the default selection works for most use cases.</li>
        <li>Select a <strong>resource allocation</strong> (number of CPU cores and memory). The default is usually sufficient for getting started.</li>
        <li>Click <strong>Start my Session</strong>. A Jupyter session will start in your browser within seconds.</li>
      </ul>
      <p>Your files are automatically stored on your CERNBox (EOS) space. You can create a new notebook from the launcher page or open existing notebooks from your file browser.</p>

      <h2>Using ROOT in SWAN</h2>
      <p>SWAN comes with the ROOT data analysis framework pre-installed in all LCG software environments. This makes it the fastest way to start working with ROOT at CERN:</p>
      <ul>
        <li>Use <strong>PyROOT</strong> in Python notebooks to perform data analysis, create histograms, fit functions, and produce publication-quality plots directly in the notebook.</li>
        <li>ROOT C++ notebooks are also supported via the <strong>ROOT C++ kernel</strong>, allowing you to write and execute C++ code interactively.</li>
        <li>All standard ROOT libraries and tutorials are available out of the box.</li>
        <li>You can combine ROOT with other Python scientific libraries such as NumPy, pandas, and matplotlib in the same notebook.</li>
      </ul>

      <h2>Storage and EOS Integration</h2>
      <p>SWAN integrates directly with CERN's EOS distributed storage system through CERNBox:</p>
      <ul>
        <li>All your SWAN notebooks are stored on your <strong>CERNBox</strong> space, which means they are backed up and accessible from any device.</li>
        <li>You can access any EOS path from within your notebooks using standard file operations or ROOT's <code>TFile::Open</code>.</li>
        <li>Share notebooks easily by sharing the corresponding CERNBox folders with colleagues.</li>
        <li>Large data files stored on EOS can be read directly from your notebooks without downloading them locally.</li>
      </ul>

      <h2>Sharing and Collaboration</h2>
      <p>SWAN provides several ways to share your work and collaborate with others:</p>
      <ul>
        <li><strong>CERNBox sharing:</strong> Share notebook links with colleagues by sharing the CERNBox folder that contains them.</li>
        <li><strong>SWAN Gallery:</strong> Browse example notebooks published by CERN experiments and services to learn best practices and discover analysis techniques.</li>
        <li><strong>SWAN Projects:</strong> Create self-contained projects that bundle notebooks, data files, and environment configuration together for easy reproducibility.</li>
        <li><strong>Export options:</strong> Notebooks can be exported as HTML, PDF, or Python scripts, making them suitable for presentations, reports, and documentation.</li>
      </ul>

      <h2>Tips and Best Practices</h2>
      <ul>
        <li><strong>Save frequently:</strong> Although SWAN auto-saves your notebooks periodically, it is good practice to save manually before running long computations.</li>
        <li><strong>Virtual environments:</strong> If you need Python packages that are not included in the default LCG stack, you can set up a virtual environment within your SWAN session.</li>
        <li><strong>Close unused sessions:</strong> SWAN resources are shared among all CERN users. Close your session when you are done to free up resources for others.</li>
        <li><strong>Stay up to date:</strong> Check the <a href="https://swan.docs.cern.ch" target="_blank" rel="noopener noreferrer">SWAN documentation</a> for the latest features, supported software stacks, and known issues.</li>
        <li><strong>Use terminals:</strong> SWAN also provides terminal access, which can be useful for running command-line tools, managing files, or installing packages.</li>
      </ul>
