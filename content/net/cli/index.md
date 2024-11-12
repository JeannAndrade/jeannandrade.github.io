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
  - [Adicionando Package ao projeto](#adicionando-package-ao-projeto)
  - [Listar packages](#listar-packages)
  - [Remove package](#remove-package)
- [Instalando o .NET Core SDK Tools](#instalando-o-net-core-sdk-tools)
- [Migration](#migration)
- [Criando um Feed local](#criando-um-feed-local)
  - [Configuração inicial do feed](#configuração-inicial-do-feed)
  - [Como empacotar uma lib](#como-empacotar-uma-lib)
- [Usando o nuget.org](#usando-o-nugetorg)
- [Utilitários](#utilitários)
  - [Regenerating the Development Certificates](#regenerating-the-development-certificates)

<!-- TOC end -->

<!-- TOC --><a name="comandos-básicos"></a>

## Comandos básicos

<!-- TOC --><a name="listar-sdks"></a>

### Listar SDKs

`dotnet --list-sdks`

<!-- TOC --><a name="listar-os-templates-disponíveis"></a>

### Listar os templates disponíveis

`dotnet new --list`

<!-- TOC --><a name="criar-um-projeto-novo"></a>

### Criar um projeto novo

```dotnet
dotnet new globaljson --sdk-version 8.0.107 --output PartyInvites
dotnet new mvc --no-https --output PartyInvites --framework net8.0
dotnet new sln -o PartyInvites
dotnet sln PartyInvites add PartyInvites
```

A Microsoft é boa em garantir compatibilidade com versões anteriores do .NET Core, mas ocorrem alterações significativas e é uma boa ideia adicionar um arquivo global.json aos projetos para que todos na equipe de desenvolvimento usem a mesma versão.

<!-- TOC --><a name="observando-por-alterações-no-projeto"></a>

### Observando por alterações no projeto

`dotnet watch`

O comando `dotnet watch` é um observador de arquivos. Quando detecta uma alteração, ele executa o comando `dotnet run` ou um comando dotnet especificado. Se ele executar `dotnet run` e a alteração tiver suporte para *hot reloads*, ele recarregará a quente o aplicativo especificado. Se a alteração não for suportada, o aplicativo será reiniciado. Este processo permite o desenvolvimento iterativo rápido a partir da linha de comando.

<!-- TOC --><a name="criar-um-projeto-f-do-tipo-console"></a>

### Criar um projeto F# do tipo console

`Dotnet new console -lang "F#" -o FirstIonideProject`

<!-- TOC --><a name="compilando-um-projeto"></a>

### Compilando um projeto

Observe que o projeto é passado de forma direta

D:\dev\cs\todo-list-api> dotnet build  .\WebApi\

O comando build tem algumas opções importantes:

dotnet build -t:Run -f net6.0-android

Serve para buildar e executar um projeto maui Android

<!-- TOC --><a name="executar-a-aplicação"></a>

### Executar a aplicação

`dotnet build`

`dotnet run`

<!-- TOC --><a name="criar-projeto-de-teste"></a>

### Criar projeto de teste

`dotnet new xunit -o SimpleApp.Tests --framework net8.0`

`dotnet sln add SimpleApp.Testsdotnet add SimpleApp.Tests reference SimpleApp`

<!-- TOC --><a name="executando-testes"></a>

### Executando testes

`dotnet test`

<!-- TOC --><a name="publicar-a-aplicação"></a>

### Publicar a aplicação

Use o seguinte comando para gerar um pacote Release para uma subpasta chamada publish:

`dotnet publish -c Release -o ./publish`

A forma mais extensa dos comandos é:

`dotnet publish --framework net8.0 --configuration Release --output dist`

Uma pasta publish será criada com a estrutura do projeto

[top](#table-of-contents)

<!-- TOC --><a name="nuget-packages"></a>

## NuGet Packages

<!-- TOC --><a name="adicionando-package-ao-projeto"></a>

### Adicionando Package ao projeto

```dotnet
dotnet add SimpleApp.Tests package Moq --version 4.13.1
dotnet add package Microsoft.EntityFrameworkCore.Design
dotnet add package Microsoft.EntityFrameworkCore.SqlServer
dotnet add package Microsoft.AspNetCore.Identity.EntityFrameworkCore --version 3.1.5
dotnet add package Swashbuckle.AspNetCore --version 5.0.0-rc2
```

<!-- TOC --><a name="listar-packages"></a>

### Listar packages

Listar os packages de um projeto:

`dotnet list package`

Listar os packages de um projeto exibindo possíveis atualizações:

`dotnet list package --outdated`

<!-- TOC --><a name="remove-package"></a>

### Remove package

`dotnet remove package Microsoft.EntityFrameworkCore.SqlServer`

[top](#table-of-contents)

<!-- TOC --><a name="instalando-o-net-core-sdk-tools"></a>

## Instalando o .NET Core SDK Tools

Para instalar o **dotnet ef**, você pode seguir estes passos:

Instalar como ferramenta global: Execute o seguinte comando no terminal para instalar o dotnet ef como uma ferramenta global:

`dotnet tool install --global dotnet-ef`

Verificar a instalação: Após a instalação, você pode verificar se o dotnet ef foi instalado corretamente executando:

`dotnet ef`

<!-- TOC --><a name="migration"></a>

## Migration

Para adicionar Migration ao seu projeto usando o .NET CLI, você pode usar o seguinte comando:

`dotnet ef migrations add NomeDaMigracao`

Certifique-se de substituir **NomeDaMigracao** pelo nome que você deseja dar à sua migração. Este comando cria os arquivos necessários para a migração no diretório Migrations do seu projeto.

Se você estiver trabalhando com um projeto onde o DbContext está em um assembly diferente do projeto de inicialização, você pode especificar explicitamente os projetos de destino e de inicialização usando as opções --project e --startup-project:

`dotnet ef migrations add NomeDaMigracao --project SeuProjeto --startup-project ProjetoDeInicializacao`

Isso ajuda a garantir que a migração seja adicionada corretamente ao projeto certo

<!-- TOC --><a name="criando-um-feed-local"></a>

## Criando um Feed local

<!-- TOC --><a name="configuração-inicial-do-feed"></a>

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

<!-- TOC --><a name="como-empacotar-uma-lib"></a>

### Como empacotar uma lib

`dotnet pack  .\LumiaFoundation\LumiaFoundation.csproj --include-symbols --output nupkgs`

[top](#table-of-contents)

<!-- TOC --><a name="usando-o-nugetorg"></a>

## Usando o nuget.org

Referencia para os comandos está na [documentação oficial](https://learn.microsoft.com/en-us/nuget/nuget-org/publish-a-package)

Para facilitar minha vida, adicionei duas Functions ao meu .zshrc:

Os dois comandos abaixo devem ser executados na pasta do projeto e na pasta "nupkgs" dentro do projeto, respectivamente.

`nuget-pack`

`nuget-push package-name.nupkg`
}

<!-- TOC --><a name="utilitários"></a>

## Utilitários

<!-- TOC --><a name="regenerating-the-development-certificates"></a>

### Regenerating the Development Certificates

`dotnet dev-certs https --clean`

`dotnet dev-certs https --trust`

[top](#table-of-contents)
