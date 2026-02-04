---
title: "EOS Storage & CERNBox - CERN Starter Pack"
description: "Guide to EOS distributed storage and CERNBox at CERN: personal storage, quotas, web interface, desktop sync, accessing from lxplus, and sharing files."
og:
  title: "EOS Storage & CERNBox - CERN Starter Pack"
  description: "Guide to EOS distributed storage and CERNBox at CERN: personal storage, quotas, web interface, desktop sync, accessing from lxplus, and sharing files."
breadcrumbs:
  - { label: "Home", url: "/en/" }
  - { label: "Technical Help", url: "/en/technical-hub/" }
  - { label: "EOS Storage & CERNBox" }
---

<h1>EOS Storage &amp; CERNBox</h1>
<div class="alert">
<strong>💡 Tip</strong><br>
<p>CERNBox is your primary cloud storage at CERN. Set it up early to keep your files synced across devices and backed up automatically.</p>
</div>
<p>EOS is CERN's <strong>large-scale distributed storage system</strong>, designed to handle the massive data volumes produced by the LHC experiments while also serving as the personal and project storage infrastructure for all CERN users. CERNBox is the user-friendly web and desktop interface built on top of EOS, providing Dropbox-like file synchronisation and sharing capabilities. Together, they form the backbone of file storage at CERN.</p>
<h2>What Is EOS</h2>
<p>EOS is a disk-based storage system developed at CERN that manages <strong>hundreds of petabytes of data</strong> across thousands of storage nodes. It uses erasure coding and replication to ensure data durability and availability, and it is optimised for both high-throughput physics data processing and interactive user workflows. For most CERN users, EOS is simply the place where your personal files, project data, and shared folders live — you interact with it through CERNBox, through the command line on lxplus, or through CERN's analysis platforms like SWAN.</p>
<p>Each CERN user is automatically assigned an <strong>EOS home directory</strong> at <code>/eos/user/&lt;first-initial&gt;/&lt;username&gt;/</code>. This is distinct from your AFS home directory and is the recommended location for active work files, analysis scripts, and documents that you want to access from multiple locations.</p>
<h2>Storage Quotas</h2>
<p>Personal EOS storage comes with a default <strong>quota of 1 TB</strong>, which is generous for most users. If you need more space — for example, for large analysis datasets or simulation outputs — you can request a quota increase through the CERN IT ServiceNow portal. Project spaces and experiment storage have separate, larger quotas managed by the relevant computing coordinators.</p>
<p>You can check your current storage usage and quota by logging into CERNBox or by running the command <code>eos quota ls -m</code> on lxplus. Keep an eye on your usage, as hitting the quota limit will prevent you from saving new files until you free up space or obtain a quota increase.</p>
<h2>CERNBox Web Interface</h2>
<p>CERNBox is accessible at <strong>cernbox.cern.ch</strong> through any web browser, using your CERN single sign-on credentials. The web interface provides a familiar file manager experience where you can upload, download, rename, move, and delete files and folders. It also supports <strong>online editing</strong> of documents through integrated office tools (OnlyOffice), allowing you to create and edit Word, Excel, and PowerPoint files directly in the browser without installing any software.</p>
<p>The web interface is particularly useful when you are working from a machine where you have not installed the desktop sync client — for example, from a personal laptop or while travelling. All changes made through the web interface are reflected immediately in your EOS storage and will sync to any connected desktop clients.</p>
<h2>Desktop Sync Client</h2>
<p>For seamless synchronisation between your local machine and EOS, install the <strong>CERNBox desktop client</strong>, available for Windows, macOS, and Linux. The client works like Dropbox or OneDrive, keeping a local copy of your files in sync with your EOS storage. You can choose which folders to sync if you do not want to replicate your entire EOS home directory locally.</p>
<p>Download the client from <strong>cernbox.cern.ch</strong> and authenticate with your CERN credentials. After the initial sync, changes are propagated in near real-time. The desktop client is the recommended way to work with CERNBox for day-to-day tasks, as it provides offline access to your files and automatic conflict resolution if the same file is edited in multiple places.</p>
<h2>Accessing EOS from lxplus and SWAN</h2>
<p>On <strong>lxplus</strong> (CERN's interactive login cluster), your EOS home directory is accessible at <code>/eos/user/&lt;first-initial&gt;/&lt;username&gt;/</code>. You can navigate, read, and write files using standard Linux commands. For physics analysis workflows, EOS is also directly accessible from <strong>SWAN</strong> (CERN's Jupyter notebook service), where your EOS files appear in the file browser and can be loaded into notebooks seamlessly.</p>
<p>If you need to access EOS from your local machine outside of CERNBox, you can mount it via <strong>FUSE</strong> (using the eosxd client) or access it through the <strong>XRootD protocol</strong>. The FUSE mount provides a file-system-like interface, while XRootD is used programmatically in analysis frameworks like ROOT. Both methods require valid Kerberos authentication — see the Kerberos and SSH page for setup instructions.</p>
<h2>Sharing Files and Folders</h2>
<p>CERNBox makes it easy to <strong>share files and folders</strong> with colleagues. Through the web interface or the desktop client, you can share a file or folder by entering the recipient's CERN username or email address and choosing the permission level (view only, or edit). Shared items appear in the recipient's CERNBox under the "Shared with me" section.</p>
<p>You can also generate <strong>public links</strong> for sharing with people outside CERN, optionally protected with a password and an expiration date. This is useful for sharing documents with external collaborators who do not have CERN accounts. For larger-scale sharing within an experiment or project, <strong>EOS project spaces</strong> provide dedicated shared storage areas with their own quotas and access controls managed by the project coordinator.</p>
<h2>Sources</h2>
<ul>
<li><a href="https://cernbox.cern.ch/" target="_blank" rel="noopener noreferrer">CERNBox — CERN Cloud Storage</a></li>
<li><a href="https://eos-docs.web.cern.ch/" target="_blank" rel="noopener noreferrer">EOS Documentation</a></li>
<li><a href="https://information-technology.web.cern.ch/" target="_blank" rel="noopener noreferrer">CERN IT Department</a></li>
</ul>
