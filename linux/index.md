# Principais comandos do terminal do Linux

Foram usados como fonte:

- [Diolinux](https://www.youtube.com/watch?v=QZ2nyxzZXPY)
- [Guia Linux](https://guialinux.uniriotec.br/)

## Table of Contents

1. [Lista dos comandos principais](#lista-dos-comandos-principais)

## Lista dos comandos principais

| Símbilo | Descrição |
| ----------- | ----------- |
| ls | comando de listagem para ver conteudo de uma pasta |
| man | dá acesso ao manual do comando. Ex man ls |
| clear | limpar o terminal (pode ser o control + L) |
| mkdir | Criar uma pasta. Se quiser criar várias pastas, seperar com espaço os nomes delas |
| cd | Navegar entre pastas |
| pwd | imprimir a pasta de trabalho |
| whoami | quem é o usuã́rio atual |
| Redirecionadores | redireciona a saída de um comando para outro. Ex. whoami >> diolinux.txt |
| criar e acessar pasta com nome composto | englobar o nome composto entre " ou ' |
| touch | usado frequentemente para criar arquivo |
| nano | editar arquivo de texto |
| cat | ler documentos pequenos. Ele pega o conteúdo do arquivo e exibe no terminal |
| mv | renomear um arquivo |
| cp | copiar um arquivo. Ex. cp origem destino |
| find | encontrar aquivos dentro de pastas. find . -name curso_de_terminal.txt |
| head & tail | ler as primeiras linhas de um arquivo. Ler as ultimas linhas de um arquivo |
| less | carrega somente uma parte do aquivo e vc pode ir descendo para ver o restante |
| rm | remover um arquivo |
| rmdir | remover diretorios, somente diretorios vazios |
| rm -rf | remove diretorios quando não está vazio |
| hostname | lista o nome da máquina |
| hostname -i | vai listas os IPs da máquina |
| ip a | lista os IPs da máquina e mac e outras info |
| grep | filtra a informação. Ex ip a \| grep inet  |
| ping | verifica se está havendo comunicação com outras máquinas |
| free-h & free-m | verifica o uso da memório da máquina |
| top | é como se fosse o monitor do sistema, só que mais simplificado |
| htop | mesmo que o top, só que mais formatado para humanos |
| ps | listas os processos rodando no terminal |
| ps aux | lista os processos do sistema, geralmente ẽ usado com o filtro grep. ps aux \| grep gnome-terminal |
| pgrep | já é a combinação do ps com o grep. Ex. pgrep gnome-terminal |
| kill | serve para gerenciar processos. Matar o processo |
| df -h | lista os recursos de dados do sistema |
| ncdu | escaneia a pasta e indica em quais locais existem mais arquivos |
| uname | lista o kernel do linux |
| lscpu & lsusb | mostra informações a respoito dos dispositivos |
| history | lista os comandos jã executados no terminal |

[top](#table-of-contents)
