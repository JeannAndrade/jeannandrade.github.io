---
layout: internal
---

# Guia rápido do aplicativos a se instalar no Ubuntu

## Navegador

Utilizo o Microsoft Edge, então vou começar por ele já que muita coisa depende de senhas e favoritos já cadastrados na minha conta.

Instalação do *curl*

1. `sudo apt install curl`
1. `curl <https://packages.microsoft.com/keys/microsoft.asc> | gpg --dearmor > microsoft.gpg`
1. `sudo install -o root -g root -m 644 microsoft.gpg /etc/apt/trusted.gpg.d/`
1. `sudo sh -c 'echo "deb [arch=amd64] <https://packages.microsoft.com/repos/edge> stable main" > /etc/apt/sources.list.d/microsoft-edge-dev.list'`
1. `sudo rm microsoft.gpg`
1. `sudo apt update && sudo apt install microsoft-edge-stable`

Caso precisa desinstalar:

`sudo apt remove microsoft-edge-stable`

Após a instalação torne o Edge o navegador padrão e faça login.

## Git

1. Configurar o user.name globalmente [veja comando aqui](https://jeannandrade.github.io/content/git/index.html#configurando-o-git)
1. [Gere a chave](https://jeannandrade.github.io/content/git/index.html#gerando-uma-nova-chave-ssh-e-adicionando-a-ao-agente-ssh) tanto para a conta outlook quanto para gmail
1. Registre as chaves no github, gitlab, bitbuket
1. Crie a estrutura de pastas $repo -> (github, gitlab, bitbuket)
1. Clone os projetos
1. Configurar o user.email localmente

## VS Code

Instale o VS Code a partir da loja e faça login para sincronizar

## Oh My Zsh

Siga o [passo a passo](https://jeannandrade.github.io/content/linux/index.html#instalando-o-oh-my-zsh-no-linux) para instalar

## Calibre

## Dot.Net SDK

## Docker

## Multipass
