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

O SDK do .Net está disponível tanto no repositório de pacotes do Ubuntu quanto no repositório de pacotes da Microsoft. É importante ter apenas um dos repositórios ativos para evitar conflito durante as atualizações.

A principal diferença é que no repositório do Ubuntu ficará disponível apenas a versão .1xx, enquanto que no repositório da Microsoft estará disponível sempre a última versão.

Siga o roteiro abaixo para priorizar o repositório da Microsoft corretamente:

### Passo 1 - Remover qualquer versão do SDK instalada

Remova os pacotes existentes do .NET de sua distribuição. Recomece e não os instale por meio do repositório errado.

`sudo apt remove 'dotnet*' 'aspnet*' 'netstandard*'`

### Passo 2 - Crie o /etc/apt/preferences, se ele ainda não existir

`sudo touch /etc/apt/preferences`

### Passo 3 - Localize a origem dos pacotes do SDK no ubuntu

`apt-cache policy '?name(dotnet.*)' | grep -v microsoft | grep '/ubuntu' | cut -d"/" -f3 | sort -u`

O retorno deve ser algo parecido com: archive.ubuntu.com, security.ubuntu.com

### Passo 4 - Abra /etc/apt/preferences no Vim

`sudo vim /etc/apt/preferences`

### Passo 5 - Copie o conteúdo abaixo para o arquivo

```bash
Package: dotnet* aspnet* netstandard*
Pin: origin "archive.ubuntu.com"
Pin-Priority: -10

Package: dotnet* aspnet* netstandard*
Pin: origin "security.ubuntu.com"
Pin-Priority: -10`
```

Isso vai despriorizar a busca dos pacotes do SDK do repositório do Ubuntu.

### Passo 6 - Adicione o repositório da microsoft da lista de origens

```bash
# Get OS version info which adds the $ID and $VERSION_ID variables
source /etc/os-release

# Download Microsoft signing key and repository
wget <https://packages.microsoft.com/config/$ID/$VERSION_ID/packages-microsoft-prod.deb> -O packages-microsoft-prod.deb

# Install Microsoft signing key and repository
sudo dpkg -i packages-microsoft-prod.deb

# Clean up
rm packages-microsoft-prod.deb

# Update packages
sudo apt update
```

### Passo 7 - Instale o SDK novamente, agora a partir do repositório da microsoft

`sudo apt install dotnet-sdk-8.0`

## Docker

O [roteiro](https://jeannandrade.github.io/content/docker/como_instalar/index.html) presente na sessão do Docker deu certo. Seguir também a instrução que comenta um erro comum de instalação.

## Multipass

Para instalar o Multipass, seguir os passos do [site](https://multipass.run/install)

`sudo snap install multipass`
