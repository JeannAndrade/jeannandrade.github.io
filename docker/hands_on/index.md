# Hands-On Docker

1. [Exercício 1 - ASP.NET - Demonstração prática do ciclo de build, login, push e run](#exercício-1)
1. [Exercício 2 - Dockerfile - demonstrando o problema de não ter um volume](#exercício-2)
1. [Exercício 3 - Dockerfile - demonstrando o uso do volume](#exercício-3)

## Exercício 1

Código Fonte [aqui](https://gitlab.com/jeann-andrade/dockerexamples/-/tree/main/ExampleApp?ref_type=heads)

Nesse exercício a imagem não tem o SDK para poder buildar o app. Então o app está sendo buildado previamente numa pasta *dist* e o *Dockerfile* tem as instruções para copiar os binários para dentro da imagem.

[x] uso de dockerfile
[x] criação de imagem
[ ] criação de volume
[ ] criação de rede (network)
[ ] uso de compose
[ ] uso de swarm
[x] publicação em docker hub
[x] rodando container em play with docker

Passo 1 - criar localmente o pacote de binários da aplicação:

`dotnet publish --framework net7.0 --configuration Release --output dist`

Passo 2 - criar a imagem a partir do arquivo Dockerfile disponível na pasta raiz do projeto

`docker build . -t jeannandrade01/exampleapp -f Dockerfile`

Passo 3 - Verificar se imagem foi criada

`docker images`

Passo 4 - Fazer login no docker hub

`docker login`

Passo 5 - Subir a imagem criada para o docker hub

`docker push jeannandrade01/exampleapp:latest`

Passo 6 - Criar um container a partir da imagem do docker hub

No PLay With Docker, inicie uma nova sessão e entre com o comando:

`docker run -d --name web1 -p 8080:80 jeannandrade01/exampleapp:latest`

## Exercício 2

Código Fonte [aqui](https://gitlab.com/jeann-andrade/dockerexamples/-/tree/main/ExampleApp02?ref_type=heads)

Nesse exercício dados estão sendo armazenados no sistema de arquivos do container. O objetivo é mostrar o problema criado por não fazer uso de volume.

- [x] uso de dockerfile
- [x] criação de imagem
- [ ] criação de volume
- [ ] criação de rede (network)
- [ ] uso de compose
- [ ] uso de swarm
- [ ] publicação em docker hub
- [x] rodando container em play with docker

Passo 1 - Clonar o projeto no Play With Docker e criar a imagem a partir do arquivo Dockerfile disponível na pasta raiz do projeto

`docker build . -t vtest -f Dockerfile.volumes`

Passo 2 - Rodar um container para ver que um arquivo foi de fato criado no filesystem do container

`docker run --name vtest vtest`

Passo 3 - Iniciar o container novamente para ver que o arquivo ainda existe

`docker start -a vtest`

Passo 4 - Remover o container, apagando seu conteúdo

`docker rm -f vtest`

Passo 5 - Criar um novo container para ver que o arquivo se perdeu, tendo o container criado um novo

`docker run --name vtest vtest`

## Exercício 3

Código Fonte [aqui](https://gitlab.com/jeann-andrade/dockerexamples/-/tree/main/ExampleApp03?ref_type=heads)

Nesse exercício dados estão sendo armazenados no volume. O objetivo é mostrar o problema citado no exercício 2 foi resolvido.

- [x] uso de dockerfile
- [x] criação de imagem
- [x] criação de volume
- [ ] criação de rede (network)
- [ ] uso de compose
- [ ] uso de swarm
- [ ] publicação em docker hub
- [x] rodando container em play with docker

Passo 1 - Clonar o projeto no Play With Docker e criar a imagem a partir do arquivo Dockerfile disponível na pasta raiz do projeto

`docker build . -t vtest -f Dockerfile.volumes`

Passo 2 - Criar o volume no host

`docker volume create --name testdata`

Passo 3 - Rodar um container associando o volume do Host com o volume esperado no *Dockerfile*

`docker run --name vtest2 -v testdata:/data vtest`

Passo 4 - Remover o container, apagando seu conteúdo

`docker rm -f vtest2`

Passo 5 - Criar um novo container para ver que o arquivo continua lá, não foi perdido com a exclusão do container

`docker run --name vtest vtest`