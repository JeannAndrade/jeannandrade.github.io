# Hands-On Docker

[1. Exercício 1 - ASP.NET - Demonstração prática do ciclo de build, login, push e run](#exercício-1)

1. Exercício 2 -

## Exercício 1

Nesse exercício a imagem não tem o SDK para poder buildar o app. Então o app está sendo buildado previamente numa pasta *dist* e o *Dockerfile* tem as instruções para copiar os binários para dentro da imagem.

- [x] uso de dockerfile
- [x] criação de imagem
- [ ] criação de volume
- [ ] criação de rede (network)
- [ ] uso de compose
- [ ] uso de swarm
- [x] publicação em docker hub
- [x] rodando container em play with docker

Passo 1 - criar

1. `dotnet publish --framework net7.0 --configuration Release --output dist` --> build the app
1. `docker build . -t jeannandrade01/exampleapp -f Dockerfile` --> create the image
1. `docker images` --> verify image created
1. `docker login` --> logon on docker hub
1. `docker push jeannandrade01/exampleapp:latest` --> push the image

No PLay With Docker, inicie uma nova sessão e entre com o comando:

`docker run -d --name web1 -p 8080:80 jeannandrade01/exampleapp:latest`
