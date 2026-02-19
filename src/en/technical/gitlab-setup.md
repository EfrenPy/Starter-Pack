---
title: "CERN GitLab & Development Workflow - CERN Starter Pack"
description: "Guide to CERN GitLab, authentication methods, SSH keys, Kerberos Git access, CI/CD, and development workflows for newcomers."
og:
  title: "CERN GitLab & Development Workflow - CERN Starter Pack"
  description: "Set up your CERN GitLab account, configure authentication, and learn the standard development workflow at CERN."
breadcrumbs:
  - { label: "Home", url: "/en/" }
  - { label: "Technical Help", url: "/en/technical-hub/" }
  - { label: "CERN GitLab" }
---

# CERN GitLab & Development Workflow

## CERN GitLab vs GitHub

CERN hosts its own GitLab instance at <a href="https://gitlab.cern.ch" target="_blank" rel="noopener noreferrer">gitlab.cern.ch</a>. This is the primary platform for version control and collaboration on CERN software projects. Unlike public GitHub, CERN GitLab is integrated with CERN Single Sign-On (SSO) and is accessible to anyone with a CERN computing account.

While many open-source HEP projects also maintain mirrors on GitHub, the authoritative repositories for experiment frameworks, internal tools, and configuration management typically live on CERN GitLab. Your group or experiment will likely require you to use it for day-to-day development.

## Authentication Methods

CERN GitLab supports several authentication methods:

- **CERN SSO (web):** Log in to the GitLab web interface using your CERN credentials. This is automatic if you are already logged into CERN SSO.
- **SSH keys:** The preferred method for command-line Git operations. Set up once and use without entering passwords.
- **Kerberos:** Clone and push using your Kerberos ticket via the `https://:@gitlab.cern.ch:8443/` URL scheme.
- **Personal Access Token (PAT):** Generate a token in GitLab settings for HTTPS-based authentication. Useful for scripts and CI/CD integrations.

## Setting Up SSH Keys for GitLab

Generate an SSH key pair if you do not already have one:

```
ssh-keygen -t ed25519 -C "your.name@cern.ch"
```

Copy the public key to your clipboard:

```
cat ~/.ssh/id_ed25519.pub
```

Then add it to your CERN GitLab account:

1. Go to <a href="https://gitlab.cern.ch/-/user_settings/ssh_keys" target="_blank" rel="noopener noreferrer">gitlab.cern.ch/-/user_settings/ssh_keys</a>
2. Paste your public key into the "Key" field
3. Give it a descriptive title (e.g., "Laptop - Ubuntu 2026")
4. Click "Add key"

Test the connection:

```
ssh -T git@gitlab.cern.ch
```

Add this to your `~/.ssh/config` for convenience:

```
Host gitlab.cern.ch
User git
IdentityFile ~/.ssh/id_ed25519
PreferredAuthentications publickey
```

## Kerberos Authentication for Git

If you prefer to use Kerberos instead of SSH keys, you can clone repositories using the Kerberos-authenticated HTTPS endpoint on port 8443:

```
# First, get a Kerberos ticket
kinit username@CERN.CH

# Clone using the Kerberos URL
git clone https://:@gitlab.cern.ch:8443/group/project.git
```

This method is especially convenient on lxplus where you already have a Kerberos ticket. No additional configuration is needed beyond a valid ticket.

## Basic Git Workflow at CERN

Most CERN projects follow a merge-request-based workflow similar to the standard GitLab flow:

1. **Fork or branch:** Create a personal fork of the project or a feature branch (depending on your project's conventions).
2. **Develop locally:** Clone the repo, create a branch, make your changes, and commit.
3. **Push:** Push your branch to your fork or the upstream repository.
4. **Open a Merge Request (MR):** On the GitLab web interface, create a merge request targeting the main branch. Add a description, assign reviewers.
5. **Code review:** Respond to feedback, push additional commits if needed.
6. **Merge:** Once approved, the MR is merged (usually by the maintainer or yourself if you have permissions).

```
# Typical workflow commands
git clone git@gitlab.cern.ch:group/project.git
cd project
git checkout -b my-feature
# ... make changes ...
git add -A && git commit -m "Add new feature"
git push origin my-feature
# Then open MR on GitLab web UI
```

## CI/CD on CERN GitLab

CERN GitLab provides built-in CI/CD pipelines powered by GitLab Runners. Many shared runners are available, including runners that can access CVMFS for experiment software. To set up CI/CD for your project, create a `.gitlab-ci.yml` file in the repository root:

```
stages:
- build
- test

build-job:
stage: build
image: gitlab-registry.cern.ch/linuxsupport/alma9-base
script:
- source /cvmfs/sft.cern.ch/lcg/views/LCG_105/x86_64-el9-gcc13-opt/setup.sh
- mkdir build && cd build
- cmake .. && make

test-job:
stage: test
image: gitlab-registry.cern.ch/linuxsupport/alma9-base
script:
- source /cvmfs/sft.cern.ch/lcg/views/LCG_105/x86_64-el9-gcc13-opt/setup.sh
- cd build && ctest
```

CERN provides shared runners with tags like `cvmfs` for accessing experiment software stacks. Check your project's CI settings or ask your team about the preferred runner configuration.

## Useful Repositories for Newcomers

Here are some commonly referenced repositories and groups on CERN GitLab:

- **Experiment frameworks:** Each major experiment (ATLAS, CMS, LHCb, ALICE) has its own GitLab group containing the analysis and reconstruction frameworks. Ask your supervisor for the specific repositories you need.
- **CERN IT tools:** The `cern-it` and `linuxsupport` groups contain infrastructure tools, container images, and system configurations.
- **ROOT project:** The ROOT framework itself is developed on GitHub (<a href="https://github.com/root-project/root" target="_blank" rel="noopener noreferrer">github.com/root-project/root</a>) but many ROOT-based tools and packages live on CERN GitLab.
- **Documentation projects:** Many groups maintain their documentation as GitLab Pages sites (using mkdocs, sphinx, or similar). Explore your experiment's docs group for guides and tutorials.
