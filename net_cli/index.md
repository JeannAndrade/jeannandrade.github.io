# dotnet cli

## Table of contents

1. [Comandos básicos](#comandos-básicos)
1. [Nuget Packages](#nuget-packages)
1. [Criando um Feed local](#criando-um-feed-local)
1. [Utilitários](#utilitários)

## Comandos básicos

### Listar SDKs

`dotnet --list-sdks`

### Listar os templates disponíveis

`dotnet new --list`

### Criar um projeto novo

`dotnet new globaljson --sdk-version 6.0.408 --output RestWithAspNet6Udemy/WebApi`

I use the global.json template to help ensure you get the expected results when following the examples in this book. Microsoft is good at ensuring backward compatibility with .NET Core releases, but breaking changes do occur, and it is a good idea to add a global.json file to projects so that everyone in the development team is using the same version.

`dotnet new webapi --output RestWithAspNet6Udemy/WebApi --framework net6.0`

`dotnet new sln -o RestWithAspNet6Udemy`

`dotnet sln RestWithAspNet6Udemy add RestWithAspNet6Udemy/WebApi`

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

`dotnet new xunit -o SimpleApp.Tests --framework netcoreapp3.1`

`dotnet sln add SimpleApp.Testsdotnet add SimpleApp.Tests reference SimpleApp`

### Executando testes

`dotnet test`

### Publicar a aplicação

Use o seguinte comando para gerar um pacote Release para uma subpasta chamada publish:

`dotnet publish -c Release -o ./publish`

Uma pasta publish será criada com a estrutura do projeto

PS D:\dev\cs\todo-list-api> dotnet publish .\WebApi\ -c Release -o .\Publish\

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

Fonte de info: <https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-nuget-delete>

Primeiro foi preciso criar a estrutura de pasta hierarquica que o nuget precisa. Poderia ser feito com nuget init, mas como não tenho o nuget.exe instalado preferi fazer na mão.

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

## Utilitários

### Regenerating the Development Certificates

`dotnet dev-certs https --cleandotnet dev-certs https --trust`

[top](#table-of-contents)