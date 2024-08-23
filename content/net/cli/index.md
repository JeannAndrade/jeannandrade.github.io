---
layout: internal
---

# dotnet cli

O link de referência para o uso da ferramenta é:

[.NET CLI overview](https://learn.microsoft.com/en-us/dotnet/core/tools/)

## Table of contents

<!-- TOC start (generated with https://github.com/derlin/bitdowntoc) -->

- [Comandos básicos](#comandos-básicos)
  - [Listar SDKs](#listar-sdks)
  - [Listar os templates disponíveis](#listar-os-templates-disponíveis)
  - [Criar um projeto novo](#criar-um-projeto-novo)
  - [Observando por alterações no projeto](#observando-por-alterações-no-projeto)
  - [Criar um projeto F# do tipo console](#criar-um-projeto-f-do-tipo-console)
  - [Compilando um projeto](#compilando-um-projeto)
  - [Executar a aplicação](#executar-a-aplicação)
  - [Criar projeto de teste](#criar-projeto-de-teste)
  - [Executando testes](#executando-testes)
  - [Publicar a aplicação](#publicar-a-aplicação)
- [NuGet Packages](#nuget-packages)
  - [Add package](#add-package)
  - [Listar packages](#listar-packages)
  - [Remove package](#remove-package)
  - [Adicionando Package ao projeto](#adicionando-package-ao-projeto)
- [Criando um Feed local](#criando-um-feed-local)
  - [Configuração inicial do feed](#configuração-inicial-do-feed)
  - [Como empacotar uma lib](#como-empacotar-uma-lib)
- [Usando o nuget.org](#usando-o-nugetorg)
- [Utilitários](#utilitários)
  - [Regenerating the Development Certificates](#regenerating-the-development-certificates)

<!-- TOC end -->

## Comandos básicos

### Listar SDKs

`dotnet --list-sdks`

### Listar os templates disponíveis

`dotnet new --list`

### Criar um projeto novo

```dotnet
dotnet new globaljson --sdk-version 8.0.107 --output PartyInvites
dotnet new mvc --no-https --output PartyInvites --framework net8.0
dotnet new sln -o PartyInvites
dotnet sln PartyInvites add PartyInvites
```

A Microsoft é boa em garantir compatibilidade com versões anteriores do .NET Core, mas ocorrem alterações significativas e é uma boa ideia adicionar um arquivo global.json aos projetos para que todos na equipe de desenvolvimento usem a mesma versão.

### Observando por alterações no projeto

`dotnet watch`

O comando `dotnet watch` é um observador de arquivos. Quando detecta uma alteração, ele executa o comando `dotnet run` ou um comando dotnet especificado. Se ele executar `dotnet run` e a alteração tiver suporte para *hot reloads*, ele recarregará a quente o aplicativo especificado. Se a alteração não for suportada, o aplicativo será reiniciado. Este processo permite o desenvolvimento iterativo rápido a partir da linha de comando.

### Criar um projeto F# do tipo console

Dotnet new console -lang "F#" -o FirstIonideProject

### Compilando um projeto

Observe que o projeto é passado de forma direta

D:\dev\cs\todo-list-api> dotnet build  .\WebApi\

O comando build tem algumas opções importantes:

dotnet build -t:Run -f net6.0-android

Serve para buildar e executar um projeto maui Android

### Executar a aplicação

dotnet build

dotnet run

### Criar projeto de teste

`dotnet new xunit -o SimpleApp.Tests --framework net8.0`

`dotnet sln add SimpleApp.Testsdotnet add SimpleApp.Tests reference SimpleApp`

### Executando testes

`dotnet test`

### Publicar a aplicação

Use o seguinte comando para gerar um pacote Release para uma subpasta chamada publish:

`dotnet publish -c Release -o ./publish`

A forma mais extensa dos comandos é:

`dotnet publish --framework net8.0 --configuration Release --output dist`

Uma pasta publish será criada com a estrutura do projeto

[top](#table-of-contents)

## NuGet Packages

### Add package

dotnet add package Microsoft.EntityFrameworkCore.SqlServer --version 3.1.1

### Listar packages

dotnet list package

### Remove package

dotnet remove package Microsoft.EntityFrameworkCore.SqlServer

### Adicionando Package ao projeto

```dotnet
dotnet add SimpleApp.Tests package Moq --version 4.13.1
dotnet add package Microsoft.EntityFrameworkCore.Design
dotnet add package Microsoft.EntityFrameworkCore.SqlServer
dotnet add package Microsoft.AspNetCore.Identity.EntityFrameworkCore --version 3.1.5
dotnet add package Swashbuckle.AspNetCore --version 5.0.0-rc2
```

[top](#table-of-contents)

## Criando um Feed local

### Configuração inicial do feed

Usei a ideia para criar a pasta D:\Dropbox\NugetPackages

Fonte de info: <https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-nuget-add-source>

Primeiro foi preciso criar a estrutura de pasta hierárquica que o nuget precisa. Poderia ser feito com nuget init, mas como não tenho o nuget.exe instalado preferi fazer na mão.

Fui em C:\Program Files (x86)\Microsoft SDKs\NuGetPackages e copiem um pacote qualquer para a pasta D:\Dropbox\NugetPackages

A partir daí o comando dotnet nuget já reconhece a estrutura de pastas e segue adicionando outros pacotes corretamente.

Para adicionar o novo source a lista de sources do nuget o comando é esse:

`dotnet nuget add source d:\Dropbox\NugetPackages -n Local`

Para confirmar a inclusão, o comando é:

`dotnet nuget list source`

Fontes Registradas:

1. nuget.org [Habilitado]
  <https://api.nuget.org/v3/index.json>
2. Test Package source [Habilitado]
  D:\CsharpPackages
3. Microsoft Visual Studio Offline Packages [Habilitado]
  C:\Program Files (x86)\Microsoft SDKs\NuGetPackages\
4. Local [Habilitado]
  d:\Dropbox\NugetPackages

Agora para publicar um pacote no feed local o comando é:

`dotnet nuget push Lumia.Foundation.0.1.0.nupkg -s D:\Dropbox\NuGetPackages`

Depois disso já pode apagar o pacote copiado inicialmente para pasta.

### Como empacotar uma lib

`dotnet pack  .\LumiaFoundation\LumiaFoundation.csproj --include-symbols --output nupkgs`

[top](#table-of-contents)

## Usando o nuget.org

Referencia para os comandos está na [documentação oficial](https://learn.microsoft.com/en-us/nuget/nuget-org/publish-a-package)

Para facilitar minha vida, adicionei duas Functions ao meu .zshrc:

Os dois comandos abaixo devem ser executados na pasta do projeto e na pasta "nupkgs" dentro do projeto, respectivamente.

nuget-pack() {
  dotnet pack --include-symbols --output nupkgs
}

nuget-push() {
  dotnet nuget push $1 --api-key myKey --source <https://api.nuget.org/v3/index.json>
}

## Utilitários

### Regenerating the Development Certificates

`dotnet dev-certs https --clean`

`dotnet dev-certs https --trust`

[top](#table-of-contents)
