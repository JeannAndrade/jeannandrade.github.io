# Git (Table of Contents)

Este é um resumo dos capítulos 2, 3 e 4 do livro Pro Git, do Scott Chacon, mas também pode ter outros apontamentos de fontes variadas.

1. [Help](#help)
1. [Ciclo de vida do status de seus arquivos](#ciclo-de-vida-do-status-de-seus-arquivos)
1. [Getting a git repository](#getting-a-git-repository)
1. [Recording Changes to the Repository](#recording-changes-to-the-repository)
1. [Viewing the Commit History](#viewing-the-commit-history)
1. [Working with Remotes](#working-with-remotes)
1. [Principais comandos](#principais-comandos)

## Help

If you ever need help while using Git, there are three equivalent ways to get the comprehensive manual page (manpage) help for any of the Git commands:

```git
git help <verb>
git <verb> --help
man git-<verb>
```

 [top](#git-table-of-contents)

## Ciclo de vida do status de seus arquivos

![Ciclo de vida do status de um arquivo git](img/ciclo_vida_status_git_file.png "Ciclo de vida - git status file")

 [top](#git-table-of-contents)

## Getting a git repository

### Init

Para iniciar um repositório, primeiro vá até a pasta desejada e digite o comando:

`git init`

Será criada uma pasta .git com toda a estrutura necessária ao git, porém nenhum arquivo está sendo monitorado. Ainda será necessário realizar o 'add' e o "commit' nos arquivos que deseja monitorar.

Para iniciar um repositório remoto que só irá armazenar as alterações. Ele será o nosso servidor de git. Ninguém irá trabalhar diretamente nesta pasta.

`git init --bare`

### Clone

Para clonar um servidor e atribuir o nome da pasta que ele terá na sua máquina:

`git clone <url> <nome-pasta>`

url pode ser o endereço de um servidor git criado com o git init --bare ou um endereço web válido

Exemplos:

```git
git clone <https://github.com/libgit2/libgit2>
git clone <https://github.com/libgit2/libgit2> mylibgit
```

Para clonar um branch específico de um projeto

`Git clone <url> -b branchName`

Os seguintes protocolos são suportados pelo git:

* https://
* git:// e user@server:path/to/repo.git, which uses the SSH transfer protocol.

[top](#git-table-of-contents)

## Recording Changes to the Repository

### Checking the Status of Your Files

The main tool you use to determine which files are in which state is the `git status` command.

Se quiser uma saída mais simplificada para o comando este comando, use o parametro -s ou --short

| Símbolo | Descrição |
| ----------- | ----------- |
| ?? | Arquivos ainda não monitorados pelo git |
| A | new files that have been added to the staging area |
| M | modified files|

```git
$ git status -s
 M README
MM Rakefile
A  lib/git.rb
M  lib/simplegit.rb
?? LICENSE.txt
```

 There are two columns to the output - the left-hand column indicates the status of the staging area and the right-hand column indicates the status of the working tree. So for example in that output, the README file is modified in the working directory but not yet staged, while the lib/simplegit.rb file is modified and staged. The Rakefile was modified, staged and then modified again, so there are changes to it that are both staged and unstaged.

### Tracking New Files

Para levar um arquivo de Untracked para Staged:

```git
git add file_name
git add directory_name
git add .
```

The git add command takes a path name for either a file or a directory; if it’s a directory, the command adds all the files in that directory recursively.

### Staging Modified Files

O comando 'add' também é usando para tornar um aquivo alterado em 'staged for commit'

### Making merge-conflicted files as resolved

Também é usado para tornar 'resolvidos' arquivos com conflito no merge

__git add is a multipurpose command — you use it to begin tracking new files, to stage files, and to do other things like marking merge-conflicted files as
resolved. It may be helpful to think of it more as “add precisely this content to the next commit”__

### Ignoring Files

O arquivo .gitignore é usado para sinalizar ao git quais arquivos na pasta não devem ser monitorados

```git
*.[oa]
*~
```

The first line tells Git to ignore any files ending in “.o” or “.a” — object and archive files that may be the product of building your code. The second line tells Git to ignore all files whose names end with a tilde (~), which is used by many text editors such as Emacs to mark temporary files. You may also
include a log, tmp, or pid directory; automatically generated documentation; and so on.

### Viewing Your Staged and Unstaged Changes

To see what you’ve changed but not yet staged:

`git diff`

If you want to see what you’ve staged that will go into your next commit

`git diff --staged`

This command compares your staged changes to your last commit

### Committing Your Changes

Para commitar tudo que está em staged o comando é:

`git commit`

Remember that anything that is still unstaged — any files you have created or modified that you haven’t run git add on since you edited them — won’t go into this commit. They will stay as modified files on
your disk.

A variante `git commit -v` abrirá o editor da sua preferência com o resultado do 'diff' para que seja possível ver exatamente o que está sendo comitado.

Outro opção é adicionar a mesnagem inline:

`git commit -m "mensgem do commit"`

### Skipping the Staging Area

Adicionando a opção -a ao command `git commit` fará que qualquer arquivo monitorado pelo git, mas ainda não incluído na area de stage, seja adicionado automaticamente. Arquivos não monitorados pelo git ficarão de fora do commit.

### Removing Files

Para remover um arquivo do Git, você tem que removê-lo dos arquivos monitorados (mais precisamente removê-lo da area de stage) e então comitar.

`git rm file_name`

Se você já modificou o arquivo ou já o adicionou a area de stage, você deve forçar a remoção com o opção -f.

Se quiser remover o arquivo da area de stage, mas ainda sim quer mante-lo no disco, use a opção `--cached`. Isso é útil quando você acidentalmente adiciona a area de stage algum arquivo importante, que é necessário para o projeto, mas vc não precisa mantê-lo no Git.

### Renomeando arquivos

Assim como ocorre com o Linux, renomear um arquivo é feito através do comando `mv`.

git mv file_from file_to

O próprio Git considera essa operação com um renomeio.

[top](#git-table-of-contents)

## Viewing the Commit History

Para ver o histórico de alterações do repositório, o comando é o `git log`

De forma padrão, o git log irá exibir a lista de commits na ordem reversa cronologicamente, as mais recentes irão aparece primeiro.

A opção -p ou --patch mostra a diferença adicionada em cada commit e vc ainda pode adicionar um limite na quantidade de commits a serem exibidos.

`git log -p -2`

Outra opção importante é o --pretty que pode ser oneline, short, full, fuller, format

`git log --pretty=oneline -2`

[top](#git-table-of-contents)

### Remote

Para ver quais servidores remotos estão configurados:

```git
git remote (para listar os repositórios remotos que o repositório local conhece)
git remote -v (verbose para listar mais detalhes)
```

Para fazer um repositório local conhecer um repositório remoto:

```git
git remote add <name> <url> (a url pode ser um endereço local, na rede, na web)
git remote add pb <https://github.com/paulboone/ticgit>
```

add remote repositories

remove remotes that are no longer valid

manage various remote branches

define them as being tracked or not

Pull (puxe)

Para baixar os arquivos do servidor git

git pull <nome-servidor-remoto> <nome-branch>

If your current branch is set up to track a remote branch

you can use the git pull command to automatically fetch and then merge that remote branch into your current branch. This may be an easier or more comfortable workflow for you; and by default, the git clone command automatically sets up your local master branch to track the remote master branch (or whatever the default branch is called) on the server you cloned from. Running git pull generally fetches data from the server you originally cloned from and automatically tries to merge it into the code you’re currently working on.

Fetch

to get data from your remote projects

git fetch <remote> (fetch the existing branch from our remote repository)

The command goes out to that remote project and pulls down all the data from that remote project that you don’t have yet. After you do this, you should have references to all the branches from that remote, which you can merge in or inspect at any time.

It’s important to note that the git fetch command only downloads the data to your local repository — it doesn’t automatically merge it with any of your work or modify what you’re currently working on. You have to merge it manually into your work when you’re ready.

Push (Empurre)

Para subir um conjunto de arquivos para o servidor git

git push <nome-servidor-remoto> <nome-branch>

git push origin master

git push local master

This command works only if you cloned from a server to which you have write access and if nobody has pushed in the meantime. If you and someone else clone at the same time and they push upstream and then you push upstream, your push will rightly be rejected. You’ll have to fetch their work first and incorporate it into yours before you’ll be allowed to push. See Git Branching for more detailed information on how to push to remote servers.

para subir um branch criado localmente para servidor remoto

git push --set-upstream origin nome-branch

[top](#git-table-of-contents)

## Principais comandos

[init](#init) | [clone](#clone) | [status](#checking-the-status-of-your-files) | [add](#tracking-new-files) | [diff](#viewing-your-staged-and-unstaged-changes) | [commit](#committing-your-changes) | [rm](#removing-files) | [mv](#renomeando-arquivos) | [log](#viewing-the-commit-history)
