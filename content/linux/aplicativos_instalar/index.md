---
layout: internal
---

# Guia rápido do aplicativos a se instalar no Ubuntu 24.04

Eu utilizo o Ubuntu via WSL2, portanto aqui serão listados apenas as customizações realizadas e aplicativos de desenvolvimento e produtividade instalados.

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

Siga o [passo a passo](https://jeannandrade.github.io/content/linux/terminal/index.html#instalando-o-oh-my-zsh-no-linux) para instalar

## Ruby

O Ruby é utilizado pelo Jekyll, que é motor responsável por converter Markdown em HTML nas páginas do GitHub. Para rodar o site localmente e poder fazer os testes antes de publicar, é preciso ter um Ruby instalado.

A fonte do conteúdo abaixo é [esse site](https://gorails.com/setup/ubuntu/23.10#comments).

Primeiro é preciso instalar algumas dependências para compilar o Ruby

`sudo apt-get install git-core zlib1g-dev build-essential libssl-dev libreadline-dev libyaml-dev libsqlite3-dev sqlite3 libxml2-dev libxslt1-dev libcurl4-openssl-dev software-properties-common libffi-dev`

Depois é preciso instalar o [asdf](https://asdf-vm.com/), que é um gerenciador de versões.

```bash
cd
git clone https://github.com/excid3/asdf.git ~/.asdf
echo '. "$HOME/.asdf/asdf.sh"' >> ~/.zshrc
echo '. "$HOME/.asdf/completions/asdf.bash"' >> ~/.zshrc
echo 'legacy_version_file = yes' >> ~/.asdfrc
echo 'export EDITOR="code --wait"' >> ~/.zshrc
exec $SHELL
```

Então podemos instalar plugins ASDF para cada idioma que queremos usar.

```bash
# Adicine o pluging para trabalhar com o ruby
asdf plugin add ruby
```

E finalmente instale o Ruby

```bash
# Instale o Ruby
asdf install ruby 3.2.2
# Configure esse versão como uma versão global
asdf global ruby 3.2.2

# Update to the latest Rubygems version
gem update --system

# Para verificar o que foi instalado
which ruby
#=> /home/username/.asdf/shims/ruby

# Para ver a versão instalada
ruby -v
#=> ruby 3.2.2 (2023-03-30 revision e51014f9c0) [x86_64-linux]
```

## Calibre

Segundo o [site do Calibre](https://calibre-ebook.com/download_linux), a instalação deve ser feita através do binário fornecido pela URL listada abaixo. Não deve ser instalado da Loja.

Primeiro foi preciso instalar uma lib chamada libxcb-cursor0:

`sudo apt-get -y install libxcb-cursor0`

Em seguida:

`sudo -v && wget -nv -O- https://download.calibre-ebook.com/linux-installer.sh | sudo sh /dev/stdin`

## .NET SDK

O .NET está disponível nos feeds do gerenciador de pacotes do Ubuntu. O repositório de pacotes da Microsoft não contém mais pacotes .NET para o Ubuntu.

Inclusive o .Net SDK 10.0 já está disponível no gerenciador de pacotes do Ubuntu.

É mais seguro seguir as instruções no site oficial da instalação da [Microsoft](https://learn.microsoft.com/pt-br/dotnet/core/install/linux-ubuntu-install?tabs=dotnet10&pivots=os-linux-ubuntu-2404)

## Docker

O [roteiro](https://jeannandrade.github.io/content/docker/como_instalar/index.html) presente na sessão do Docker deu certo. Seguir também a instrução que comenta um erro comum de instalação.

## Multipass

Para instalar o Multipass, seguir os passos do [site](https://multipass.run/install)

`sudo snap install multipass`
