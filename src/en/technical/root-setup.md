---
title: "ROOT Framework Quick-Start - CERN Starter Pack"
description: "Quick-start guide for the ROOT data analysis framework at CERN, covering installation, SWAN, PyROOT, and common first-week tasks."
og:
  title: "ROOT Framework Quick-Start - CERN Starter Pack"
  description: "Get started with the ROOT C++/Python framework for high-energy physics analysis at CERN."
breadcrumbs:
  - { label: "Home", url: "/en/" }
  - { label: "Technical Help", url: "/en/technical-hub/" }
  - { label: "ROOT Quick-Start" }
---

# ROOT Framework Quick-Start Guide

## What is ROOT?

ROOT is an open-source C++ and Python framework developed at CERN for data processing, statistical analysis, visualization, and storage in high-energy physics (HEP). It is the standard tool for analyzing particle physics data and is used by virtually every experiment at CERN.

ROOT provides specialized data structures (such as TTree for columnar data), histogramming, curve fitting, and a powerful I/O system based on the `.root` file format. It also includes CLING, an interactive C++ interpreter, and PyROOT, a Python interface to all ROOT classes.

## Zero-Install Option: SWAN

If you want to start using ROOT immediately without installing anything, CERN provides **SWAN** (Service for Web-based ANalysis) at <a href="https://swan.cern.ch" target="_blank" rel="noopener noreferrer">swan.cern.ch</a>. SWAN is a JupyterHub-based service that gives you a notebook environment with ROOT, PyROOT, and many other scientific Python packages pre-installed.

Simply log in with your CERN credentials, choose a software stack, and start coding. SWAN connects to your EOS storage, so you can access your data files directly. This is the fastest way to get started with ROOT at CERN.

## Installation Methods

### Conda (Recommended for personal machines)

The easiest way to install ROOT on your personal machine is via conda-forge:

```
conda create -n root-env
conda activate root-env
conda install -c conda-forge root
```

### Snap (Linux)

On Linux distributions that support Snap packages:

```
sudo snap install root-framework
```

### Homebrew (macOS)

On macOS with Homebrew installed:

```
brew install root
```

### Pre-built Binaries

Download pre-compiled binaries for your platform from the official ROOT website at <a href="https://root.cern/install/" target="_blank" rel="noopener noreferrer">root.cern/install</a>. Extract the archive and source the setup script:

```
tar -xzf root_v6.XX.YY.Linux-ubuntu22-x86_64-gcc11.4.tar.gz
source root/bin/thisroot.sh
```

### On lxplus (CVMFS)

On CERN's lxplus machines, ROOT is available through CVMFS without any installation. Simply set up the LCG software environment:

```
# List available LCG releases
ls /cvmfs/sft.cern.ch/lcg/views/

# Set up a specific LCG release (example)
source /cvmfs/sft.cern.ch/lcg/views/LCG_105/x86_64-el9-gcc13-opt/setup.sh

# Verify ROOT is available
root --version
```

## First Steps with ROOT

### Interactive C++ (CLING)

Launch ROOT's interactive C++ interpreter by typing `root` in your terminal:

```
$ root
root [0] TH1F *h = new TH1F("h", "My Histogram", 100, -5, 5);
root [1] h->FillRandom("gaus", 10000);
root [2] h->Draw();
root [3] .q
```

### PyROOT

Use ROOT from Python with the PyROOT bindings:

```
import ROOT

# Create and fill a histogram
h = ROOT.TH1F("h", "Gaussian Distribution;x;Entries", 100, -5, 5)
h.FillRandom("gaus", 10000)

# Draw on a canvas
c = ROOT.TCanvas("c", "My Canvas", 800, 600)
h.Draw()
c.SaveAs("histogram.png")
```

### Reading .root Files

Open and explore an existing ROOT file:

```
import ROOT

f = ROOT.TFile.Open("data.root")
f.ls()           # List contents
tree = f.Get("Events")  # Get a TTree
tree.Print()     # Show branches
tree.Draw("pt")  # Quick plot of a branch
```

### NumPy / pandas Integration

Convert ROOT data to NumPy arrays or pandas DataFrames for use with the broader Python ecosystem:

```
import ROOT
import numpy as np

# Using RDataFrame (modern ROOT approach)
df = ROOT.RDataFrame("Events", "data.root")
npy = df.AsNumpy(["pt", "eta"])  # Returns dict of NumPy arrays

# Convert to pandas DataFrame
import pandas as pd
pdf = pd.DataFrame(npy)
```

## Essential Resources

- <a href="https://root.cern/doc/master/" target="_blank" rel="noopener noreferrer">ROOT Reference Documentation</a>
- <a href="https://root.cern/doc/master/group__tutorial__hist.html" target="_blank" rel="noopener noreferrer">ROOT Tutorials (with source code)</a>
- <a href="https://root.cern/doc/master/classROOT_1_1RDataFrame.html" target="_blank" rel="noopener noreferrer">RDataFrame Documentation</a>
- <a href="https://swan.cern.ch" target="_blank" rel="noopener noreferrer">SWAN - Service for Web-based ANalysis</a>
- <a href="https://root-forum.cern.ch" target="_blank" rel="noopener noreferrer">ROOT User Forum</a>
- <a href="https://github.com/root-project/root" target="_blank" rel="noopener noreferrer">ROOT on GitHub</a>

## Common First-Week Tasks

- Open a SWAN session and run a ROOT tutorial notebook to get familiar with the environment.
- Set up ROOT on lxplus using CVMFS and run `root --version` to confirm it works.
- Ask your supervisor or team for a sample `.root` file from your experiment and practice opening it with `TFile` and browsing its contents.
- Try creating a histogram from a TTree branch using both the C++ interpreter and PyROOT.
- Explore RDataFrame, ROOT's modern analysis interface, for filtering, defining new columns, and creating plots.
- Install ROOT on your personal laptop (via Conda or Homebrew) so you can develop offline.
- Bookmark the ROOT forum and reference documentation for when you need help.
