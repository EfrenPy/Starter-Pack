---
layout: layouts/page.njk
title: "CERN GitLab & Development Workflow - CERN Starter Pack"
description: "Guide to CERN GitLab, authentication methods, SSH keys, Kerberos Git access, CI/CD, and development workflows for newcomers."
og:
  title: "CERN GitLab & Development Workflow - CERN Starter Pack"
  description: "Set up your CERN GitLab account, configure authentication, and learn the standard development workflow at CERN."
datePublished: "2025-06-01"
dateModified: "2026-02-01"
dateUpdated: "2026-02"
breadcrumbs:
  - { label: "Home", url: "/en/" }
  - { label: "Technical Help", url: "/en/technical-hub/" }
  - { label: "CERN GitLab" }
---

<h1>CERN GitLab &amp; Development Workflow</h1>
      <h2>CERN GitLab vs GitHub</h2>
      <p>CERN hosts its own GitLab instance at <a href="https://gitlab.cern.ch" target="_blank" rel="noopener noreferrer">gitlab.cern.ch</a>. This is the primary platform for version control and collaboration on CERN software projects. Unlike public GitHub, CERN GitLab is integrated with CERN Single Sign-On (SSO) and is accessible to anyone with a CERN computing account.</p>
      <p>While many open-source HEP projects also maintain mirrors on GitHub, the authoritative repositories for experiment frameworks, internal tools, and configuration management typically live on CERN GitLab. Your group or experiment will likely require you to use it for day-to-day development.</p>

      <h2>Authentication Methods</h2>
      <p>CERN GitLab supports several authentication methods:</p>
      <ul>
        <li><strong>CERN SSO (web):</strong> Log in to the GitLab web interface using your CERN credentials. This is automatic if you are already logged into CERN SSO.</li>
        <li><strong>SSH keys:</strong> The preferred method for command-line Git operations. Set up once and use without entering passwords.</li>
        <li><strong>Kerberos:</strong> Clone and push using your Kerberos ticket via the <code>https://:@gitlab.cern.ch:8443/</code> URL scheme.</li>
        <li><strong>Personal Access Token (PAT):</strong> Generate a token in GitLab settings for HTTPS-based authentication. Useful for scripts and CI/CD integrations.</li>
      </ul>

      <h2>Setting Up SSH Keys for GitLab</h2>
      <p>Generate an SSH key pair if you do not already have one:</p>
      <pre><code>ssh-keygen -t ed25519 -C "your.name@cern.ch"</code></pre>
      <p>Copy the public key to your clipboard:</p>
      <pre><code>cat ~/.ssh/id_ed25519.pub</code></pre>
      <p>Then add it to your CERN GitLab account:</p>
      <ol>
        <li>Go to <a href="https://gitlab.cern.ch/-/user_settings/ssh_keys" target="_blank" rel="noopener noreferrer">gitlab.cern.ch/-/user_settings/ssh_keys</a></li>
        <li>Paste your public key into the "Key" field</li>
        <li>Give it a descriptive title (e.g., "Laptop - Ubuntu 2026")</li>
        <li>Click "Add key"</li>
      </ol>
      <p>Test the connection:</p>
      <pre><code>ssh -T git@gitlab.cern.ch</code></pre>
      <p>Add this to your <code>~/.ssh/config</code> for convenience:</p>
      <pre><code>Host gitlab.cern.ch
    User git
    IdentityFile ~/.ssh/id_ed25519
    PreferredAuthentications publickey</code></pre>

      <h2>Kerberos Authentication for Git</h2>
      <p>If you prefer to use Kerberos instead of SSH keys, you can clone repositories using the Kerberos-authenticated HTTPS endpoint on port 8443:</p>
      <pre><code># First, get a Kerberos ticket
kinit username@CERN.CH

# Clone using the Kerberos URL
git clone https://:@gitlab.cern.ch:8443/group/project.git</code></pre>
      <p>This method is especially convenient on lxplus where you already have a Kerberos ticket. No additional configuration is needed beyond a valid ticket.</p>

      <h2>Basic Git Workflow at CERN</h2>
      <p>Most CERN projects follow a merge-request-based workflow similar to the standard GitLab flow:</p>
      <ol>
        <li><strong>Fork or branch:</strong> Create a personal fork of the project or a feature branch (depending on your project's conventions).</li>
        <li><strong>Develop locally:</strong> Clone the repo, create a branch, make your changes, and commit.</li>
        <li><strong>Push:</strong> Push your branch to your fork or the upstream repository.</li>
        <li><strong>Open a Merge Request (MR):</strong> On the GitLab web interface, create a merge request targeting the main branch. Add a description, assign reviewers.</li>
        <li><strong>Code review:</strong> Respond to feedback, push additional commits if needed.</li>
        <li><strong>Merge:</strong> Once approved, the MR is merged (usually by the maintainer or yourself if you have permissions).</li>
      </ol>
      <pre><code># Typical workflow commands
git clone git@gitlab.cern.ch:group/project.git
cd project
git checkout -b my-feature
# ... make changes ...
git add -A &amp;&amp; git commit -m "Add new feature"
git push origin my-feature
# Then open MR on GitLab web UI</code></pre>

      <h2>CI/CD on CERN GitLab</h2>
      <p>CERN GitLab provides built-in CI/CD pipelines powered by GitLab Runners. Many shared runners are available, including runners that can access CVMFS for experiment software. To set up CI/CD for your project, create a <code>.gitlab-ci.yml</code> file in the repository root:</p>
      <pre><code>stages:
  - build
  - test

build-job:
  stage: build
  image: gitlab-registry.cern.ch/linuxsupport/alma9-base
  script:
    - source /cvmfs/sft.cern.ch/lcg/views/LCG_105/x86_64-el9-gcc13-opt/setup.sh
    - mkdir build &amp;&amp; cd build
    - cmake .. &amp;&amp; make

test-job:
  stage: test
  image: gitlab-registry.cern.ch/linuxsupport/alma9-base
  script:
    - source /cvmfs/sft.cern.ch/lcg/views/LCG_105/x86_64-el9-gcc13-opt/setup.sh
    - cd build &amp;&amp; ctest</code></pre>
      <p>CERN provides shared runners with tags like <code>cvmfs</code> for accessing experiment software stacks. Check your project's CI settings or ask your team about the preferred runner configuration.</p>

      <h2>Useful Repositories for Newcomers</h2>
      <p>Here are some commonly referenced repositories and groups on CERN GitLab:</p>
      <ul>
        <li><strong>Experiment frameworks:</strong> Each major experiment (ATLAS, CMS, LHCb, ALICE) has its own GitLab group containing the analysis and reconstruction frameworks. Ask your supervisor for the specific repositories you need.</li>
        <li><strong>CERN IT tools:</strong> The <code>cern-it</code> and <code>linuxsupport</code> groups contain infrastructure tools, container images, and system configurations.</li>
        <li><strong>ROOT project:</strong> The ROOT framework itself is developed on GitHub (<a href="https://github.com/root-project/root" target="_blank" rel="noopener noreferrer">github.com/root-project/root</a>) but many ROOT-based tools and packages live on CERN GitLab.</li>
        <li><strong>Documentation projects:</strong> Many groups maintain their documentation as GitLab Pages sites (using mkdocs, sphinx, or similar). Explore your experiment's docs group for guides and tutorials.</li>
      </ul>
