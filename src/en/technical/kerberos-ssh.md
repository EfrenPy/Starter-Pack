---
title: "Kerberos & SSH Setup for CERN - CERN Starter Pack"
description: "Complete guide to setting up Kerberos authentication and SSH access for CERN lxplus on Linux, macOS, and Windows/WSL."
og:
  title: "Kerberos & SSH Setup for CERN - CERN Starter Pack"
  description: "Step-by-step guide for configuring Kerberos and SSH to access CERN lxplus and related services."
breadcrumbs:
  - { label: "Home", url: "/en/" }
  - { label: "Technical Help", url: "/en/technical-hub/" }
  - { label: "Kerberos & SSH Setup" }
---

# Kerberos & SSH Setup for CERN

<div class="alert">
<p>This guide covers Kerberos and SSH configuration for <strong>Linux</strong>, <strong>macOS</strong>, and <strong>Windows via WSL</strong>. Choose the section that matches your operating system.</p>
</div>

## What is Kerberos and Why CERN Uses It

Kerberos is a network authentication protocol that uses tickets to prove identity without sending passwords over the network. CERN operates the `CERN.CH` Kerberos realm for centralized authentication across its computing infrastructure.

When you authenticate with Kerberos, you receive a time-limited ticket-granting ticket (TGT) that lets you access CERN services such as lxplus, AFS, EOS, and GitLab without re-entering your password each time. This ticket-based system is fundamental to working at CERN.

## Linux Setup

Install the Kerberos client tools on Debian/Ubuntu-based distributions:

```
sudo apt update && sudo apt install krb5-user
```

Then configure `/etc/krb5.conf` with the CERN realm settings. Replace the contents of the file (or create it) with:

```
[libdefaults]
default_realm = CERN.CH
ticket_lifetime = 25h
renew_lifetime = 120h
forwardable = true
proxiable = true

[realms]
CERN.CH = {
kdc = cerndc.cern.ch
master_kdc = cerndc.cern.ch
default_domain = cern.ch
kpasswd_server = afskrb5m.cern.ch
admin_server = afskrb5m.cern.ch
}

[domain_realm]
.cern.ch = CERN.CH
cern.ch = CERN.CH
```

On Fedora/RHEL, install with `sudo dnf install krb5-workstation`. The `krb5.conf` file is the same.

## macOS Setup

macOS ships with a built-in Kerberos implementation (Heimdal). You do not need to install additional packages. Simply create or edit the file `/etc/krb5.conf` with the same configuration shown in the Linux section above.

On modern macOS you may need to use `sudo` to edit files in `/etc/`. Also note that macOS Heimdal may handle ticket renewal slightly differently; if you experience issues, try setting `renewable = true` in the `[libdefaults]` section.

## Windows / WSL Setup

On Windows, the recommended approach is to use WSL (Windows Subsystem for Linux). Inside your WSL distribution (e.g., Ubuntu), install and configure Kerberos exactly as described in the Linux section above.

If you also want to use VS Code Remote to connect to lxplus, see the [VS Code Remote via WSL guide](vscode-remote/) for complementary setup instructions on SSH through WSL.

## Getting a Kerberos Ticket

Once your configuration is in place, use these commands to manage Kerberos tickets:

```
# Obtain a new ticket (you will be prompted for your CERN password)
kinit username@CERN.CH

# List current tickets and expiration times
klist

# Renew an existing ticket (before it expires)
kinit -R

# Destroy all tickets (log out)
kdestroy
```

Replace `username` with your CERN account name. Tickets are valid for 25 hours by default and renewable for up to 5 days, as specified in the configuration above.

## SSH Configuration for lxplus

To connect to lxplus using your Kerberos ticket (no password needed), add the following to your `~/.ssh/config` file:

```
Host lxplus
HostName lxplus.cern.ch
User yourusername
GSSAPIAuthentication yes
GSSAPIDelegateCredentials yes
GSSAPITrustDns yes
ForwardAgent yes
```

With this configuration and a valid Kerberos ticket, you can simply run `ssh lxplus` and you will be authenticated automatically via GSSAPI (Kerberos). Replace `yourusername` with your CERN login.

## SSH Tunneling & Off-site Access

When working from outside the CERN network, you may need to use `lxtunnel.cern.ch` as a jump host. Add this to your `~/.ssh/config`:

```
Host lxtunnel
HostName lxtunnel.cern.ch
User yourusername
GSSAPIAuthentication yes
GSSAPIDelegateCredentials yes

Host lxplus-tunnel
HostName lxplus.cern.ch
User yourusername
ProxyJump lxtunnel
GSSAPIAuthentication yes
GSSAPIDelegateCredentials yes
```

You can also set up a SOCKS proxy through lxplus for accessing CERN-internal web services from off-site:

```
ssh -D 1080 -N lxplus
```

Then configure your browser to use `localhost:1080` as a SOCKS5 proxy to reach internal CERN pages.

## Keytab for Automated Access

For scripts or automated processes that need Kerberos authentication without interactive login, you can create a keytab file:

```
cern-get-keytab --keytab ~/private/keytab --login --user yourusername
```

Then obtain a ticket non-interactively with:

```
kinit -kt ~/private/keytab yourusername@CERN.CH
```

<div class="alert">
<p><strong>Security warning:</strong> A keytab file is equivalent to a stored password. Protect it with strict file permissions (<code>chmod 600</code>) and never share it or commit it to version control.</p>
</div>

## Accessing EOS and AFS

With a valid Kerberos ticket, you can access CERN storage systems:

**EOS** (CERN's distributed storage) can be accessed on lxplus with the `eos` command-line tool:

```
# List your EOS home directory
eos ls /eos/user/u/username/

# Copy a file to EOS
eos cp localfile.txt /eos/user/u/username/

# Mount EOS via FUSE (if available)
mkdir -p ~/eos
eosfusebind ~/eos
```

**AFS** (Andrew File System) requires an AFS token, which you obtain from your Kerberos ticket:

```
# Get an AFS token from your Kerberos ticket
aklog

# Access your AFS workspace
ls /afs/cern.ch/user/u/username/
```

## Troubleshooting

- **kinit: Cannot find KDC for realm CERN.CH** — Your `/etc/krb5.conf` is missing or misconfigured. Verify the file exists and contains the correct realm settings.
- **kinit: Client not found in Kerberos database** — Check that you are using the correct CERN username and the realm is `CERN.CH` (uppercase).
- **Permission denied (GSSAPI)** — Run `klist` to check if your ticket is valid and not expired. Run `kinit` again if needed.
- **Ticket expired or cannot renew** — If your ticket has been expired for too long, renewal will fail. Run `kdestroy` followed by `kinit` to get a fresh ticket.
- **SSH connection refused off-site** — CERN restricts direct SSH access from outside its network. Use the lxtunnel ProxyJump configuration described above.
- **Clock skew too great** — Kerberos requires synchronized clocks. Ensure your system clock is correct (use NTP). A skew of more than 5 minutes will cause authentication failures.

## Quick Reference Card

<table class="quick-ref">
<thead>
  <tr>
    <th>Task</th>
    <th>Command</th>
  </tr>
</thead>
<tbody>
  <tr><td>Get a Kerberos ticket</td><td><code>kinit user@CERN.CH</code></td></tr>
  <tr><td>List current tickets</td><td><code>klist</code></td></tr>
  <tr><td>Renew ticket</td><td><code>kinit -R</code></td></tr>
  <tr><td>Destroy tickets</td><td><code>kdestroy</code></td></tr>
  <tr><td>SSH to lxplus</td><td><code>ssh lxplus</code></td></tr>
  <tr><td>SSH via tunnel (off-site)</td><td><code>ssh lxplus-tunnel</code></td></tr>
  <tr><td>SOCKS proxy</td><td><code>ssh -D 1080 -N lxplus</code></td></tr>
  <tr><td>Get AFS token</td><td><code>aklog</code></td></tr>
  <tr><td>List EOS files</td><td><code>eos ls /eos/user/u/user/</code></td></tr>
  <tr><td>Create keytab</td><td><code>cern-get-keytab --keytab ~/private/keytab --login --user user</code></td></tr>
</tbody>
</table>

## References

- <a href="https://cern.service-now.com/service-portal?id=kb_article&n=KB0003388" target="_blank" rel="noopener noreferrer">CERN Kerberos Setup Documentation</a>
- <a href="https://information-technology.web.cern.ch/services/lxplus-service" target="_blank" rel="noopener noreferrer">CERN lxplus Service</a>
- <a href="https://information-technology.web.cern.ch/services/eos-service" target="_blank" rel="noopener noreferrer">CERN EOS Storage Service</a>
- <a href="https://information-technology.web.cern.ch/services/afs-service" target="_blank" rel="noopener noreferrer">CERN AFS Service</a>
- <a href="https://security.web.cern.ch/recommendations/en/ssh_keys.shtml" target="_blank" rel="noopener noreferrer">CERN SSH Key Recommendations</a>
