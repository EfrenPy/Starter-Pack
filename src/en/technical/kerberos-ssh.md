---
layout: layouts/page.njk
title: "Kerberos & SSH Setup for CERN - CERN Starter Pack"
description: "Complete guide to setting up Kerberos authentication and SSH access for CERN lxplus on Linux, macOS, and Windows/WSL."
og:
  title: "Kerberos & SSH Setup for CERN - CERN Starter Pack"
  description: "Step-by-step guide for configuring Kerberos and SSH to access CERN lxplus and related services."
datePublished: "2025-06-01"
dateModified: "2026-02-01"
dateUpdated: "2026-02"
breadcrumbs:
  - { label: "Home", url: "/en/" }
  - { label: "Technical Help", url: "/en/technical-hub/" }
  - { label: "Kerberos & SSH Setup" }
---

<h1>Kerberos &amp; SSH Setup for CERN</h1>
      <div class="alert">
        <p>This guide covers Kerberos and SSH configuration for <strong>Linux</strong>, <strong>macOS</strong>, and <strong>Windows via WSL</strong>. Choose the section that matches your operating system.</p>
      </div>

      <h2>What is Kerberos and Why CERN Uses It</h2>
      <p>Kerberos is a network authentication protocol that uses tickets to prove identity without sending passwords over the network. CERN operates the <code>CERN.CH</code> Kerberos realm for centralized authentication across its computing infrastructure.</p>
      <p>When you authenticate with Kerberos, you receive a time-limited ticket-granting ticket (TGT) that lets you access CERN services such as lxplus, AFS, EOS, and GitLab without re-entering your password each time. This ticket-based system is fundamental to working at CERN.</p>

      <h2>Linux Setup</h2>
      <p>Install the Kerberos client tools on Debian/Ubuntu-based distributions:</p>
      <pre><code>sudo apt update &amp;&amp; sudo apt install krb5-user</code></pre>
      <p>Then configure <code>/etc/krb5.conf</code> with the CERN realm settings. Replace the contents of the file (or create it) with:</p>
      <pre><code>[libdefaults]
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
    cern.ch = CERN.CH</code></pre>
      <p>On Fedora/RHEL, install with <code>sudo dnf install krb5-workstation</code>. The <code>krb5.conf</code> file is the same.</p>

      <h2>macOS Setup</h2>
      <p>macOS ships with a built-in Kerberos implementation (Heimdal). You do not need to install additional packages. Simply create or edit the file <code>/etc/krb5.conf</code> with the same configuration shown in the Linux section above.</p>
      <p>On modern macOS you may need to use <code>sudo</code> to edit files in <code>/etc/</code>. Also note that macOS Heimdal may handle ticket renewal slightly differently; if you experience issues, try setting <code>renewable = true</code> in the <code>[libdefaults]</code> section.</p>

      <h2>Windows / WSL Setup</h2>
      <p>On Windows, the recommended approach is to use WSL (Windows Subsystem for Linux). Inside your WSL distribution (e.g., Ubuntu), install and configure Kerberos exactly as described in the Linux section above.</p>
      <p>If you also want to use VS Code Remote to connect to lxplus, see the <a href="vscode-remote/">VS Code Remote via WSL guide</a> for complementary setup instructions on SSH through WSL.</p>

      <h2>Getting a Kerberos Ticket</h2>
      <p>Once your configuration is in place, use these commands to manage Kerberos tickets:</p>
      <pre><code># Obtain a new ticket (you will be prompted for your CERN password)
kinit username@CERN.CH

# List current tickets and expiration times
klist

# Renew an existing ticket (before it expires)
kinit -R

# Destroy all tickets (log out)
kdestroy</code></pre>
      <p>Replace <code>username</code> with your CERN account name. Tickets are valid for 25 hours by default and renewable for up to 5 days, as specified in the configuration above.</p>

      <h2>SSH Configuration for lxplus</h2>
      <p>To connect to lxplus using your Kerberos ticket (no password needed), add the following to your <code>~/.ssh/config</code> file:</p>
      <pre><code>Host lxplus
    HostName lxplus.cern.ch
    User yourusername
    GSSAPIAuthentication yes
    GSSAPIDelegateCredentials yes
    GSSAPITrustDns yes
    ForwardAgent yes</code></pre>
      <p>With this configuration and a valid Kerberos ticket, you can simply run <code>ssh lxplus</code> and you will be authenticated automatically via GSSAPI (Kerberos). Replace <code>yourusername</code> with your CERN login.</p>

      <h2>SSH Tunneling &amp; Off-site Access</h2>
      <p>When working from outside the CERN network, you may need to use <code>lxtunnel.cern.ch</code> as a jump host. Add this to your <code>~/.ssh/config</code>:</p>
      <pre><code>Host lxtunnel
    HostName lxtunnel.cern.ch
    User yourusername
    GSSAPIAuthentication yes
    GSSAPIDelegateCredentials yes

Host lxplus-tunnel
    HostName lxplus.cern.ch
    User yourusername
    ProxyJump lxtunnel
    GSSAPIAuthentication yes
    GSSAPIDelegateCredentials yes</code></pre>
      <p>You can also set up a SOCKS proxy through lxplus for accessing CERN-internal web services from off-site:</p>
      <pre><code>ssh -D 1080 -N lxplus</code></pre>
      <p>Then configure your browser to use <code>localhost:1080</code> as a SOCKS5 proxy to reach internal CERN pages.</p>

      <h2>Keytab for Automated Access</h2>
      <p>For scripts or automated processes that need Kerberos authentication without interactive login, you can create a keytab file:</p>
      <pre><code>cern-get-keytab --keytab ~/private/keytab --login --user yourusername</code></pre>
      <p>Then obtain a ticket non-interactively with:</p>
      <pre><code>kinit -kt ~/private/keytab yourusername@CERN.CH</code></pre>
      <div class="alert">
        <p><strong>Security warning:</strong> A keytab file is equivalent to a stored password. Protect it with strict file permissions (<code>chmod 600</code>) and never share it or commit it to version control.</p>
      </div>

      <h2>Accessing EOS and AFS</h2>
      <p>With a valid Kerberos ticket, you can access CERN storage systems:</p>
      <p><strong>EOS</strong> (CERN's distributed storage) can be accessed on lxplus with the <code>eos</code> command-line tool:</p>
      <pre><code># List your EOS home directory
eos ls /eos/user/u/username/

# Copy a file to EOS
eos cp localfile.txt /eos/user/u/username/

# Mount EOS via FUSE (if available)
mkdir -p ~/eos
eosfusebind ~/eos</code></pre>
      <p><strong>AFS</strong> (Andrew File System) requires an AFS token, which you obtain from your Kerberos ticket:</p>
      <pre><code># Get an AFS token from your Kerberos ticket
aklog

# Access your AFS workspace
ls /afs/cern.ch/user/u/username/</code></pre>

      <h2>Troubleshooting</h2>
      <ul>
        <li><strong>kinit: Cannot find KDC for realm CERN.CH</strong> — Your <code>/etc/krb5.conf</code> is missing or misconfigured. Verify the file exists and contains the correct realm settings.</li>
        <li><strong>kinit: Client not found in Kerberos database</strong> — Check that you are using the correct CERN username and the realm is <code>CERN.CH</code> (uppercase).</li>
        <li><strong>Permission denied (GSSAPI)</strong> — Run <code>klist</code> to check if your ticket is valid and not expired. Run <code>kinit</code> again if needed.</li>
        <li><strong>Ticket expired or cannot renew</strong> — If your ticket has been expired for too long, renewal will fail. Run <code>kdestroy</code> followed by <code>kinit</code> to get a fresh ticket.</li>
        <li><strong>SSH connection refused off-site</strong> — CERN restricts direct SSH access from outside its network. Use the lxtunnel ProxyJump configuration described above.</li>
        <li><strong>Clock skew too great</strong> — Kerberos requires synchronized clocks. Ensure your system clock is correct (use NTP). A skew of more than 5 minutes will cause authentication failures.</li>
      </ul>

      <h2>Quick Reference Card</h2>
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

      <h2>References</h2>
      <ul>
        <li><a href="https://cern.service-now.com/service-portal?id=kb_article&amp;n=KB0003388" target="_blank" rel="noopener noreferrer">CERN Kerberos Setup Documentation</a></li>
        <li><a href="https://information-technology.web.cern.ch/services/lxplus-service" target="_blank" rel="noopener noreferrer">CERN lxplus Service</a></li>
        <li><a href="https://information-technology.web.cern.ch/services/eos-service" target="_blank" rel="noopener noreferrer">CERN EOS Storage Service</a></li>
        <li><a href="https://information-technology.web.cern.ch/services/afs-service" target="_blank" rel="noopener noreferrer">CERN AFS Service</a></li>
        <li><a href="https://security.web.cern.ch/recommendations/en/ssh_keys.shtml" target="_blank" rel="noopener noreferrer">CERN SSH Key Recommendations</a></li>
      </ul>
