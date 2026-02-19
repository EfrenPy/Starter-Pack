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

# EOS Storage & CERNBox

<div class="alert">
<strong>💡 Tip</strong><br>
<p>CERNBox is your primary cloud storage at CERN. Set it up early to keep your files synced across devices and backed up automatically.</p>
</div>

EOS is CERN's **large-scale distributed storage system**, designed to handle the massive data volumes produced by the LHC experiments while also serving as the personal and project storage infrastructure for all CERN users. CERNBox is the user-friendly web and desktop interface built on top of EOS, providing Dropbox-like file synchronisation and sharing capabilities. Together, they form the backbone of file storage at CERN.

## What Is EOS

EOS is a disk-based storage system developed at CERN that manages **hundreds of petabytes of data** across thousands of storage nodes. It uses erasure coding and replication to ensure data durability and availability, and it is optimised for both high-throughput physics data processing and interactive user workflows. For most CERN users, EOS is simply the place where your personal files, project data, and shared folders live — you interact with it through CERNBox, through the command line on lxplus, or through CERN's analysis platforms like SWAN.

Each CERN user is automatically assigned an **EOS home directory** at `/eos/user/<first-initial>/<username>/`. This is distinct from your AFS home directory and is the recommended location for active work files, analysis scripts, and documents that you want to access from multiple locations.

## Storage Quotas

Personal EOS storage comes with a default **quota of 1 TB**, which is generous for most users. If you need more space — for example, for large analysis datasets or simulation outputs — you can request a quota increase through the CERN IT ServiceNow portal. Project spaces and experiment storage have separate, larger quotas managed by the relevant computing coordinators.

You can check your current storage usage and quota by logging into CERNBox or by running the command `eos quota ls -m` on lxplus. Keep an eye on your usage, as hitting the quota limit will prevent you from saving new files until you free up space or obtain a quota increase.

## CERNBox Web Interface

CERNBox is accessible at **cernbox.cern.ch** through any web browser, using your CERN single sign-on credentials. The web interface provides a familiar file manager experience where you can upload, download, rename, move, and delete files and folders. It also supports **online editing** of documents through integrated office tools (OnlyOffice), allowing you to create and edit Word, Excel, and PowerPoint files directly in the browser without installing any software.

The web interface is particularly useful when you are working from a machine where you have not installed the desktop sync client — for example, from a personal laptop or while travelling. All changes made through the web interface are reflected immediately in your EOS storage and will sync to any connected desktop clients.

## Desktop Sync Client

For seamless synchronisation between your local machine and EOS, install the **CERNBox desktop client**, available for Windows, macOS, and Linux. The client works like Dropbox or OneDrive, keeping a local copy of your files in sync with your EOS storage. You can choose which folders to sync if you do not want to replicate your entire EOS home directory locally.

Download the client from **cernbox.cern.ch** and authenticate with your CERN credentials. After the initial sync, changes are propagated in near real-time. The desktop client is the recommended way to work with CERNBox for day-to-day tasks, as it provides offline access to your files and automatic conflict resolution if the same file is edited in multiple places.

## Accessing EOS from lxplus and SWAN

On **lxplus** (CERN's interactive login cluster), your EOS home directory is accessible at `/eos/user/<first-initial>/<username>/`. You can navigate, read, and write files using standard Linux commands. For physics analysis workflows, EOS is also directly accessible from **SWAN** (CERN's Jupyter notebook service), where your EOS files appear in the file browser and can be loaded into notebooks seamlessly.

If you need to access EOS from your local machine outside of CERNBox, you can mount it via **FUSE** (using the eosxd client) or access it through the **XRootD protocol**. The FUSE mount provides a file-system-like interface, while XRootD is used programmatically in analysis frameworks like ROOT. Both methods require valid Kerberos authentication — see the Kerberos and SSH page for setup instructions.

## Sharing Files and Folders

CERNBox makes it easy to **share files and folders** with colleagues. Through the web interface or the desktop client, you can share a file or folder by entering the recipient's CERN username or email address and choosing the permission level (view only, or edit). Shared items appear in the recipient's CERNBox under the "Shared with me" section.

You can also generate **public links** for sharing with people outside CERN, optionally protected with a password and an expiration date. This is useful for sharing documents with external collaborators who do not have CERN accounts. For larger-scale sharing within an experiment or project, **EOS project spaces** provide dedicated shared storage areas with their own quotas and access controls managed by the project coordinator.

## Sources

- <a href="https://cernbox.cern.ch/" target="_blank" rel="noopener noreferrer">CERNBox — CERN Cloud Storage</a>
- <a href="https://eos-docs.web.cern.ch/" target="_blank" rel="noopener noreferrer">EOS Documentation</a>
- <a href="https://information-technology.web.cern.ch/" target="_blank" rel="noopener noreferrer">CERN IT Department</a>
