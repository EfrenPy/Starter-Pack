---
title: "lxplus Guide - CERN Starter Pack"
description: "Guide to using lxplus at CERN: what it is, available resources, home directory, software environments, batch jobs with HTCondor, and resource limits."
og:
  title: "lxplus Guide - CERN Starter Pack"
  description: "Guide to using lxplus at CERN: what it is, available resources, home directory, software environments, batch jobs with HTCondor, and resource limits."
breadcrumbs:
  - { label: "Home", url: "/en/" }
  - { label: "Technical Help", url: "/en/technical-hub/" }
  - { label: "lxplus Guide" }
---

<h1>lxplus Guide</h1>
<div class="alert">
<strong>💡 Tip</strong><br>
<p>lxplus is a shared resource. Long-running or memory-intensive processes should be submitted as batch jobs via HTCondor rather than run interactively.</p>
</div>
<p>lxplus is CERN's <strong>interactive login service</strong>, providing a shared Linux environment where thousands of CERN users compile code, run analyses, access data, and manage their work. It is the primary gateway to CERN's computing infrastructure and is used daily by physicists, engineers, and technical staff across the organisation. If you need to connect to lxplus for the first time, see the <a href="/en/technical/kerberos-ssh/">Kerberos and SSH setup page</a> for connection instructions.</p>
<h2>What Is lxplus</h2>
<p>lxplus is a cluster of <strong>shared login nodes</strong> running AlmaLinux (CERN's standard Linux distribution). When you connect via SSH to <code>lxplus.cern.ch</code>, you are assigned to one of the available nodes in a round-robin fashion. Each session gives you access to a standard Linux environment with common development tools, compilers, editors, and access to CERN's storage systems (EOS and AFS). The machines are powerful but shared among many concurrent users, so resource usage per session is subject to limits.</p>
<p>There are several <strong>lxplus flavours</strong> available for specific needs. The default <code>lxplus.cern.ch</code> runs the current standard OS version. If you need a specific older or newer version for compatibility reasons, variants like <code>lxplus9.cern.ch</code> (AlmaLinux 9) are available. Check the CERN IT documentation for the current list of available flavours.</p>
<h2>Available Resources</h2>
<p>Each lxplus node typically offers <strong>multiple CPU cores and several gigabytes of RAM</strong> per user session. However, since nodes are shared, there are soft limits on per-user CPU time and memory consumption to ensure fair usage. Interactive sessions are intended for development, debugging, testing, and short analyses — not for running production workloads that consume many cores or gigabytes of memory for hours at a time.</p>
<p>If your task requires <strong>significant compute resources</strong> — for example, processing large datasets, running Monte Carlo simulations, or training machine learning models — you should submit it as a batch job rather than running it interactively on lxplus. The batch system distributes your job across dedicated compute nodes where it can run without competing with other interactive users.</p>
<h2>Home Directory: AFS vs EOS</h2>
<p>When you log into lxplus, your default home directory is on <strong>AFS</strong> (Andrew File System) at <code>/afs/cern.ch/user/&lt;first-initial&gt;/&lt;username&gt;/</code>. AFS has been the traditional home directory system at CERN for decades and is still used for configuration files, login scripts, and small files. However, AFS has a <strong>limited quota</strong> (typically 10 GB) and is gradually being superseded by EOS for most use cases.</p>
<p>Your <strong>EOS home directory</strong> at <code>/eos/user/&lt;first-initial&gt;/&lt;username&gt;/</code> provides a much larger default quota (1 TB) and is the recommended location for analysis files, large datasets, and active work. Both AFS and EOS are accessible from any lxplus node, so you can easily move files between them. As a general practice, keep your AFS home clean and use EOS for your main work files.</p>
<h2>Software Environments</h2>
<p>CERN's software environment on lxplus is managed through <strong>CVMFS</strong> (CernVM File System), a read-only file system that distributes software packages across the network. Through CVMFS, you have access to a vast catalogue of pre-built software including ROOT, Geant4, Python distributions, and experiment-specific frameworks. The LCG releases (LHC Computing Grid software stacks) provide curated collections of compatible tools and libraries for physics analysis.</p>
<p>To set up a specific software environment, you typically source a setup script. For example, <code>source /cvmfs/sft.cern.ch/lcg/views/LCG_105/x86_64-el9-gcc12-opt/setup.sh</code> sets up a complete LCG 105 environment with ROOT, Python, and many analysis tools. Experiment-specific setups (such as ATLAS's Athena or CMS's CMSSW) have their own initialisation procedures documented by each collaboration.</p>
<h2>Batch Jobs with HTCondor</h2>
<p>For compute-intensive tasks, CERN provides a <strong>batch computing system based on HTCondor</strong>. From lxplus, you can submit jobs that run on a large pool of dedicated worker nodes without impacting interactive users. A basic HTCondor submission involves writing a short <strong>submit file</strong> that specifies your executable, input files, resource requirements (CPU, memory, disk), and output locations.</p>
<p>A minimal submit file might look like: define the executable (your script), specify the output, error, and log file paths, request the desired number of CPUs and memory, and call <code>condor_submit</code> to queue the job. You can then monitor its progress with <code>condor_q</code> and check completed job details with <code>condor_history</code>. For large-scale workflows involving hundreds or thousands of jobs, tools like the CERN HTCondor DAGMan and workflow managers streamline the process.</p>
<h2>Resource Limits and Fair-Share</h2>
<p>CERN's computing resources operate on a <strong>fair-share scheduling</strong> model. Each user and experiment has a share of the total resources, and the batch system prioritises jobs based on recent usage — if you have used a large amount recently, your new jobs may have lower priority until your share rebalances. This ensures that no single user or group monopolises the system.</p>
<p>On lxplus itself, interactive resource limits are enforced to protect the shared environment. Processes that consume excessive CPU or memory may be automatically terminated. If you need dedicated resources for a specific project or time period, CERN IT offers <strong>virtual machines</strong> and <strong>OpenStack instances</strong> that provide dedicated compute capacity under your control — contact the IT department through ServiceNow to discuss options.</p>
<h2>Sources</h2>
<ul>
<li><a href="https://information-technology.web.cern.ch/services/lxplus-service" target="_blank" rel="noopener noreferrer">CERN IT — lxplus Service</a></li>
<li><a href="https://batchdocs.web.cern.ch/" target="_blank" rel="noopener noreferrer">CERN Batch Service Documentation</a></li>
<li><a href="https://cvmfs.readthedocs.io/" target="_blank" rel="noopener noreferrer">CVMFS Documentation</a></li>
</ul>
