---
layout: layouts/page.njk
title: "ROOT Framework Quick-Start - CERN Starter Pack"
description: "Quick-start guide for the ROOT data analysis framework at CERN, covering installation, SWAN, PyROOT, and common first-week tasks."
og:
  title: "ROOT Framework Quick-Start - CERN Starter Pack"
  description: "Get started with the ROOT C++/Python framework for high-energy physics analysis at CERN."
datePublished: "2025-06-01"
dateModified: "2026-02-01"
dateUpdated: "2026-02"
breadcrumbs:
  - { label: "Home", url: "/en/" }
  - { label: "Technical Help", url: "/en/technical-hub/" }
  - { label: "ROOT Quick-Start" }
---

<h1>ROOT Framework Quick-Start Guide</h1>
      <h2>What is ROOT?</h2>
      <p>ROOT is an open-source C++ and Python framework developed at CERN for data processing, statistical analysis, visualization, and storage in high-energy physics (HEP). It is the standard tool for analyzing particle physics data and is used by virtually every experiment at CERN.</p>
      <p>ROOT provides specialized data structures (such as TTree for columnar data), histogramming, curve fitting, and a powerful I/O system based on the <code>.root</code> file format. It also includes CLING, an interactive C++ interpreter, and PyROOT, a Python interface to all ROOT classes.</p>

      <h2>Zero-Install Option: SWAN</h2>
      <p>If you want to start using ROOT immediately without installing anything, CERN provides <strong>SWAN</strong> (Service for Web-based ANalysis) at <a href="https://swan.cern.ch" target="_blank" rel="noopener noreferrer">swan.cern.ch</a>. SWAN is a JupyterHub-based service that gives you a notebook environment with ROOT, PyROOT, and many other scientific Python packages pre-installed.</p>
      <p>Simply log in with your CERN credentials, choose a software stack, and start coding. SWAN connects to your EOS storage, so you can access your data files directly. This is the fastest way to get started with ROOT at CERN.</p>

      <h2>Installation Methods</h2>

      <h3>Conda (Recommended for personal machines)</h3>
      <p>The easiest way to install ROOT on your personal machine is via conda-forge:</p>
      <pre><code>conda create -n root-env
conda activate root-env
conda install -c conda-forge root</code></pre>

      <h3>Snap (Linux)</h3>
      <p>On Linux distributions that support Snap packages:</p>
      <pre><code>sudo snap install root-framework</code></pre>

      <h3>Homebrew (macOS)</h3>
      <p>On macOS with Homebrew installed:</p>
      <pre><code>brew install root</code></pre>

      <h3>Pre-built Binaries</h3>
      <p>Download pre-compiled binaries for your platform from the official ROOT website at <a href="https://root.cern/install/" target="_blank" rel="noopener noreferrer">root.cern/install</a>. Extract the archive and source the setup script:</p>
      <pre><code>tar -xzf root_v6.XX.YY.Linux-ubuntu22-x86_64-gcc11.4.tar.gz
source root/bin/thisroot.sh</code></pre>

      <h3>On lxplus (CVMFS)</h3>
      <p>On CERN's lxplus machines, ROOT is available through CVMFS without any installation. Simply set up the LCG software environment:</p>
      <pre><code># List available LCG releases
ls /cvmfs/sft.cern.ch/lcg/views/

# Set up a specific LCG release (example)
source /cvmfs/sft.cern.ch/lcg/views/LCG_105/x86_64-el9-gcc13-opt/setup.sh

# Verify ROOT is available
root --version</code></pre>

      <h2>First Steps with ROOT</h2>

      <h3>Interactive C++ (CLING)</h3>
      <p>Launch ROOT's interactive C++ interpreter by typing <code>root</code> in your terminal:</p>
      <pre><code>$ root
root [0] TH1F *h = new TH1F("h", "My Histogram", 100, -5, 5);
root [1] h-&gt;FillRandom("gaus", 10000);
root [2] h-&gt;Draw();
root [3] .q</code></pre>

      <h3>PyROOT</h3>
      <p>Use ROOT from Python with the PyROOT bindings:</p>
      <pre><code>import ROOT

# Create and fill a histogram
h = ROOT.TH1F("h", "Gaussian Distribution;x;Entries", 100, -5, 5)
h.FillRandom("gaus", 10000)

# Draw on a canvas
c = ROOT.TCanvas("c", "My Canvas", 800, 600)
h.Draw()
c.SaveAs("histogram.png")</code></pre>

      <h3>Reading .root Files</h3>
      <p>Open and explore an existing ROOT file:</p>
      <pre><code>import ROOT

f = ROOT.TFile.Open("data.root")
f.ls()           # List contents
tree = f.Get("Events")  # Get a TTree
tree.Print()     # Show branches
tree.Draw("pt")  # Quick plot of a branch</code></pre>

      <h3>NumPy / pandas Integration</h3>
      <p>Convert ROOT data to NumPy arrays or pandas DataFrames for use with the broader Python ecosystem:</p>
      <pre><code>import ROOT
import numpy as np

# Using RDataFrame (modern ROOT approach)
df = ROOT.RDataFrame("Events", "data.root")
npy = df.AsNumpy(["pt", "eta"])  # Returns dict of NumPy arrays

# Convert to pandas DataFrame
import pandas as pd
pdf = pd.DataFrame(npy)</code></pre>

      <h2>Essential Resources</h2>
      <ul>
        <li><a href="https://root.cern/doc/master/" target="_blank" rel="noopener noreferrer">ROOT Reference Documentation</a></li>
        <li><a href="https://root.cern/doc/master/group__tutorial__hist.html" target="_blank" rel="noopener noreferrer">ROOT Tutorials (with source code)</a></li>
        <li><a href="https://root.cern/doc/master/classROOT_1_1RDataFrame.html" target="_blank" rel="noopener noreferrer">RDataFrame Documentation</a></li>
        <li><a href="https://swan.cern.ch" target="_blank" rel="noopener noreferrer">SWAN - Service for Web-based ANalysis</a></li>
        <li><a href="https://root-forum.cern.ch" target="_blank" rel="noopener noreferrer">ROOT User Forum</a></li>
        <li><a href="https://github.com/root-project/root" target="_blank" rel="noopener noreferrer">ROOT on GitHub</a></li>
      </ul>

      <h2>Common First-Week Tasks</h2>
      <ul>
        <li>Open a SWAN session and run a ROOT tutorial notebook to get familiar with the environment.</li>
        <li>Set up ROOT on lxplus using CVMFS and run <code>root --version</code> to confirm it works.</li>
        <li>Ask your supervisor or team for a sample <code>.root</code> file from your experiment and practice opening it with <code>TFile</code> and browsing its contents.</li>
        <li>Try creating a histogram from a TTree branch using both the C++ interpreter and PyROOT.</li>
        <li>Explore RDataFrame, ROOT's modern analysis interface, for filtering, defining new columns, and creating plots.</li>
        <li>Install ROOT on your personal laptop (via Conda or Homebrew) so you can develop offline.</li>
        <li>Bookmark the ROOT forum and reference documentation for when you need help.</li>
      </ul>
