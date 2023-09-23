# Git (Table of Contents)

1. [Help](#help)
2. [Getting a git repository](#getting-a-git-repository)
3. [Working with Remotes](#working-with-remotes)
4. [Recording Changes to the Repository](#recording-changes-to-the-repository)

## Help

If you ever need help while using Git, there are three equivalent ways to get the comprehensive manual page (manpage) help for any of the Git commands:

```git
git help <verb>
git <verb> --help
man git-<verb>
```

## Getting a git repository

* Init

  * Para iniciar um repositório

    Primeiro vá até a pasta desejada e digite o comando

    `git init`

  * Para iniciar um servidor

    `git init --bare`

    para iniciar um repositório remoto que só irá armazenar as alterações.  Ele será o nosso servidor de git. Ninguém irá trabalhar diretamente nesta pasta

* Clone

  * Para clonar um servidor

    `git clone <url> <nome-pasta>`

    url pode ser o endereço de um servidor git criado com o git init --bare ou um endereço web válido

    Exemplos:

    ```git
    git clone <https://github.com/libgit2/libgit2>
    git clone <https://github.com/libgit2/libgit2> mylibgit
    ```

  * Para clonar um branch específico de um projeto

    `Git clone <url> -b branchName`

  * Protocolos
    * https://
    * git://
    * user@server:path/to/repo.git, which uses the SSH transfer protocol.

## Working with Remotes

## Recording Changes to the Repository
