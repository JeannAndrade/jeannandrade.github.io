---
layout: internal
---

# Principais comandos do terminal do Linux

Foram usados como fonte:

- [Diolinux](https://www.youtube.com/watch?v=QZ2nyxzZXPY)
- [Guia Linux](https://guialinux.uniriotec.br/)
- [Oh My Zsh: usando um terminal personalizado e produtivo!](https://blog.betrybe.com/ferramentas/oh-my-zsh/)

## Table of Contents

<!-- TOC start (generated with https://github.com/derlin/bitdowntoc) -->

- [Lista dos comandos principais](#lista-dos-comandos-principais)
- [Instalando o Oh My Zsh no Linux](#instalando-o-oh-my-zsh-no-linux)
   * [Instalando o Zsh](#instalando-o-zsh)
   * [Tornando o Zsh o shell padrão](#tornando-o-zsh-o-shell-padrão)
   * [instalando o Oh My Zsh](#instalando-o-oh-my-zsh)
   * [Instalando a fonte 'Hack Nerd Font Mono'](#instalando-a-fonte-hack-nerd-font-mono)
      + [Configure a Fonte no VS Code](#configure-a-fonte-no-vs-code)
      + [Configure a Fonte no Terminal Windows](#configure-a-fonte-no-terminal-windows)
   * [Instalando o pluging Zsh-syntax-highlighting](#instalando-o-pluging-zsh-syntax-highlighting)
   * [Instalando o plugin FZF](#instalando-o-plugin-fzf)
   * [Instalando o plugin zsh-autosuggestions](#instalando-o-plugin-zsh-autosuggestions)
   * [Instalando o plugin k](#instalando-o-plugin-k)
   * [Registrando os novos plugins no arquivo .zshrc](#registrando-os-novos-plugins-no-arquivo-zshrc)
- [Alias que geralmente uso no zshrc](#alias-que-geralmente-uso-no-zshrc)
- [Dicas de uso](#dicas-de-uso)
   * [xkill](#xkill)
   * [Alt + F2](#alt-f2)
   * [Alt + Esc](#alt-esc)
   * [Arquivo oculto](#arquivo-oculto)
- [Perguntas e respostas](#perguntas-e-respostas)
   * [What should/shouldn't go in .zshenv, .zshrc, .zlogin, .zprofile, .zlogout?](#what-shouldshouldnt-go-in-zshenv-zshrc-zlogin-zprofile-zlogout)
   * [Qual o comando para fazer as alterações .zshrc do terem efeito?](#qual-o-comando-para-fazer-as-alterações-zshrc-do-terem-efeito)

<!-- TOC end -->

<!-- TOC --><a name="lista-dos-comandos-principais"></a>
## Lista dos comandos principais

| Símbolo | Descrição |
| ----------- | ----------- |
| `!!` | Retorna o último comando digitado. É util quando vc digita um comando e descobre que precisa de permissão de admin. Então basta entrar com `sudo !!` |
| `cat` | ler documentos pequenos. Ele pega o conteúdo do arquivo e exibe no terminal |
| `cd` | Navegar entre pastas |
| `clear` | limpar o terminal (pode ser o control + L) |
| `cp` | copiar um arquivo. Ex. cp origem destino |
| `criar e acessar pasta com nome composto` | englobar o nome composto entre " ou ' |
| `ctrl + r` | para abrir um busca pelo comando que for digitado em seguida |
| `df -h` | lista os recursos de dados do sistema |
| `find` | encontrar aquivos dentro de pastas. `find . -name curso_de_terminal.txt` |
| `free-h & free-m` | verifica o uso da memória da máquina |
| `grep` | filtra a informação. Ex ip a \| grep inet |
| `head & tail` | ler as primeiras linhas de um arquivo. Ler as ultimas linhas de um arquivo |
| `history` | lista os comandos já executados no terminal. `!n` para executar novamente a linha 'n'. |
| `history \| grep termo` | para filtrar as linhas que contenham o termo. |
| `history -n` | para trazer as últimas 'n' linhas. |
| `history n` | para trazer o histórico da posição 'n' até a última linha registrada. |
| `hostname` | lista o nome da máquina |
| `hostname -i` | vai listas os IPs da máquina |
| `htop` | mesmo que o top, só que mais formatado para humanos |
| `ip a` | lista os IPs da máquina e mac e outras info |
| `kill` | serve para gerenciar processos. Matar o processo |
| `less` | carrega somente uma parte do aquivo e vc pode ir descendo para ver o restante |
| `ls` | comando de listagem para ver conteúdo de uma pasta (ls -al para formato longo) |
| `lscpu & lsusb` | mostra informações a respeito dos dispositivos |
| `man` | dá acesso ao manual do comando. Ex man ls |
| `mkdir` | Criar uma pasta. Se quiser criar várias pastas, separar com espaço os nomes delas |
| `mv` | renomear um arquivo |
| `nano` | editar arquivo de texto |
| `ncdu` | escaneia a pasta e indica em quais locais existem mais arquivos |
| `pgrep` | já é a combinação do ps com o grep. Ex. pgrep gnome-terminal |
| `ping` | verifica se está havendo comunicação com outras máquinas |
| `ps` | listas os processos rodando no terminal. Ex.: `ps -elf` |
| `ps aux` | lista os processos do sistema, geralmente é usado com o filtro grep. ps aux \| grep gnome-terminal |
| `pwd` | imprimir a pasta de trabalho |
| `Redirecionadores` | redireciona a saída de um comando para outro. O '>' redireciona sobrescrevendo. O '>>' redireciona adiciona ao final. Ex. whoami >> diolinux.txt |
| `rm` | remover um arquivo |
| `rm -rf` | remove diretórios quando não está vazio |
| `rmdir` | remover diretórios, somente diretórios vazios |
| `top` | é como se fosse o monitor do sistema, só que mais simplificado |
| `touch` | usado frequentemente para criar arquivo |
| `uname` | lista o kernel do Linux |
| `whoami` | quem é o usuário atual |

[top](#table-of-contents)

<!-- TOC --><a name="instalando-o-oh-my-zsh-no-linux"></a>
## Instalando o Oh My Zsh no Linux

<!-- TOC --><a name="instalando-o-zsh"></a>
### Instalando o Zsh

`sudo apt-get install zsh`

<!-- TOC --><a name="tornando-o-zsh-o-shell-padrão"></a>
### Tornando o Zsh o shell padrão

`chsh -s $(which zsh)`

Depois de aplicado o comando, reinicie a Máquina. Reiniciar o terminal não deu certo para mim.

<!-- TOC --><a name="instalando-o-oh-my-zsh"></a>
### instalando o Oh My Zsh

`sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"`

<!-- TOC --><a name="instalando-a-fonte-hack-nerd-font-mono"></a>
### Instalando a fonte 'Hack Nerd Font Mono'

[fontes Hack](https://github.com/ryanoasis/nerd-fonts/releases/download/v3.5.1/Hack.zip)

o VS Code e Terminal no Windows gerenciam a interface do terminal, e não o sistema Linux dentro do WSL. Então para usar esse fonte é preciso instalar a fonte Hack no Windows.

* Baixe o arquivo hack.zip no link acima
* Descompacte o zip e ache o arquivo 'HackNerdFontMono-Regular.ttf'.
* Clique nele e abra o menu de contexto, peça para isntalar a fonte.

<!-- TOC --><a name="configure-a-fonte-no-vs-code"></a>
#### Configure a Fonte no VS Code

Com a fonte instalada no Windows, você precisa dizer ao VS Code para usá-la no terminal integrado. Isso é feito nas configurações:

Abra o VS Code e pressione (Ctrl + ,) para abrir as Configurações. Na barra de pesquisa, digite terminal.integrated.fontFamily.

No campo de texto, insira o nome exato da família da fonte que você instalou, entre aspas simples: 'Hack Nerd Font Mono'

<!-- TOC --><a name="configure-a-fonte-no-terminal-windows"></a>
#### Configure a Fonte no Terminal Windows

* Vá em configuraçãoes (Ctrl + ,)
* Selecione o perfil do Ubuntu
* Em configurações Adcionais, clique em Aparência e selecione 'Hack Nerd Font Mono' no Tipo de Fonte.

<!-- TOC --><a name="instalando-o-pluging-zsh-syntax-highlighting"></a>
### Instalando o pluging [Zsh-syntax-highlighting](https://github.com/zsh-users/zsh-syntax-highlighting)

O que faz? Realça os comando enquanto são digitados. Se estiver escrito errado ficará em vermelho, se certo ficará em verde

`git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting`

<!-- TOC --><a name="instalando-o-plugin-fzf"></a>
### Instalando o plugin [FZF](https://github.com/junegunn/fzf)

O que faz? possibilita a pesquisa de arquivos e pastas pelo terminal de forma simples e rápida, além de comandos já digitados. Para pesquisar arquivos e pastas, basta pressionar as teclas CTRL + T + nome do arquivo e, para pesquisar por comandos, digite CTRL + R + comando desejado.

`git clone --depth 1 https://github.com/junegunn/fzf.git ~/.fzf`

`~/.fzf/install`

<!-- TOC --><a name="instalando-o-plugin-zsh-autosuggestions"></a>
### Instalando o plugin [zsh-autosuggestions](https://github.com/zsh-users/zsh-autosuggestions)

O que faz? faz a sugestão de comandos com base no que já foi digitado

`git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions`

<!-- TOC --><a name="instalando-o-plugin-k"></a>
### Instalando o plugin [k](https://github.com/supercrabtree/k)

O que faz? Exibe detalhes como a data de criação, o tamanho e as permissões de uso de arquivos e pastas. Digite 'k' em qualquer pasta para ver o resultado.

`git clone https://github.com/supercrabtree/k $ZSH_CUSTOM/plugins/k`

<!-- TOC --><a name="registrando-os-novos-plugins-no-arquivo-zshrc"></a>
### Registrando os novos plugins no arquivo .zshrc

- Abra o arquivo .zshrc com o comando `sudo nano ~/.zshrc`
- Altere a linha ZSH_THEME="robbyrussell" para ZSH_THEME="amuse"
- Adicione o zsh-syntax-highlighting a lista de plugins `plugins=(git zsh-syntax-highlighting fzf zsh-autosuggestions k)`

<!-- TOC --><a name="alias-que-geralmente-uso-no-zshrc"></a>
## Alias que geralmente uso no zshrc

| Atalho | Comando | Referência |
| :---: | :---: | :---: |
| `zshconfig` | nano ~/.zshrc | Config |
| `jekyllbs` | script/bootstrap | Jekyll |
| `jekyllsv` | bundle exec jekyll serve | Jekyll |
| `jekyllts` | script/cibuild | Jekyll |
| `goto_scripts` | cd ~/bin | shell |
| `list_scripts` | ls -al ~/bin | shell |
| `goto_gitlab` | cd ~/repo/gitlab | shell |
| `goto_github` | cd ~/repo/github | shell |
| `goto_bitbuket` | cd ~/repo/bitbuket | shell |
| `ws` | $HOME/bin/vscode-open-workspace.zsh | Script |

Registre também os seguintes atalhos neste arquivo:

Example aliases:

```bash
alias zshconfig="nano ~/.zshrc"
alias jekyllbs="script/bootstrap"
alias jekyllsv="bundle exec jekyll serve"
alias jekyllts="script/cibuild"
alias goto_scripts="cd ~/bin"
alias list_scripts="ls -al ~/bin"
alias goto_gitlab="cd ~/repo/gitlab"
alias goto_github="cd ~/repo/github"
alias goto_bitbuket="cd ~/repo/bitbuket"
alias ws="$HOME/bin/vscode-open-workspace.zsh"
```

[top](#table-of-contents)

<!-- TOC --><a name="dicas-de-uso"></a>
## Dicas de uso

<!-- TOC --><a name="xkill"></a>
### xkill

Digitando `xkill` no terminal o cursor vai ser transformar em um *x* e vc pode clicar em cima de qualquer janela visível para fecha-la. Util quando um app trava.

<!-- TOC --><a name="alt-f2"></a>
### Alt + F2

Abre uma caixa de diálogo para executar um comando. Todo comando digitado aqui precisa estar dentro da pasta \bin

<!-- TOC --><a name="alt-esc"></a>
### Alt + Esc

Vai alternar entre as janelas abertas sem exibir as miniaturas, como faria o *alt + tab*. Já a tecla do *Windows* vai abrir a miniatura dos apps abertos.

<!-- TOC --><a name="arquivo-oculto"></a>
### Arquivo oculto

Coloque um *.* na frente de um arquivo para torná-lo oculto. *Ctrl + H* vai exibir os arquivos ocultos.

[top](#table-of-contents)

<!-- TOC --><a name="perguntas-e-respostas"></a>
## Perguntas e respostas

<!-- TOC --><a name="what-shouldshouldnt-go-in-zshenv-zshrc-zlogin-zprofile-zlogout"></a>
### What should/shouldn't go in .zshenv, .zshrc, .zlogin, .zprofile, .zlogout?

fonte: `https://unix.stackexchange.com/questions/71253/what-should-shouldnt-go-in-zshenv-zshrc-zlogin-zprofile-zlogout`

Here is a non-exhaustive list, in execution-order, of what each file tends to contain:

1. .zshenv is always sourced. It often contains exported variables that should be available to other programs. For example, $PATH, $EDITOR, and $PAGER are often set in .zshenv. Also, you can set $ZDOTDIR in .zshenv to specify an alternative location for the rest of your zsh configuration.
1. .zprofile is for login shells. It is basically the same as .zlogin except that it's sourced before .zshrc whereas .zlogin is sourced after .zshrc. According to the zsh documentation, ".zprofile is meant as an alternative to .zlogin for ksh fans; the two are not intended to be used together, although this could certainly be done if desired."
1. .zshrc is for interactive shells. You set options for the interactive shell there with the setopt and unsetopt commands. You can also load shell modules, set your history options, change your prompt, set up zle and completion, et cetera. You also set any variables that are only used in the interactive shell (e.g. $LS_COLORS).
1. .zlogin is for login shells. It is sourced on the start of a login shell but after .zshrc, if the shell is also interactive. This file is often used to start X using startx. Some systems start X on boot, so this file is not always very useful.
1. .zlogout is sometimes used to clear and reset the terminal. It is called when exiting, not when opening.

<!-- TOC --><a name="qual-o-comando-para-fazer-as-alterações-zshrc-do-terem-efeito"></a>
### Qual o comando para fazer as alterações .zshrc do terem efeito?

`source ~/.zshrc`
