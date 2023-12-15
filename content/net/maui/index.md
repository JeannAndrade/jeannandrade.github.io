---
layout: internal
---

# .NET MAUI

Fonte:

- <https://docs.microsoft.com/en-us/dotnet/maui/>
- .NET MAUI Cross-Platform Application, Roger Le

<!-- TOC -->

- [NET MAUI](#net-maui)
  - [Commandos da linha de comando](#commandos-da-linha-de-comando)
    - [Verificando os workload instalados na máquina](#verificando-os-workload-instalados-na-m%C3%A1quina)
    - [Verificando os templates disponíveis](#verificando-os-templates-dispon%C3%ADveis)
    - [Criando um projeto .Net MAUI](#criando-um-projeto-net-maui)
  - [Templates para o .NET MAUI](#templates-para-o-net-maui)
  - [Estrutura do projeto](#estrutura-do-projeto)
    - [Common files](#common-files)
    - [Platform-specific files](#platform-specific-files)
    - [Resources](#resources)
  - [Gerenciamento do ciclo de vida do app](#gerenciamento-do-ciclo-de-vida-do-app)
  - [Injeção de dependência DI, Logging e Configuração](#inje%C3%A7%C3%A3o-de-depend%C3%AAncia-di-logging-e-configura%C3%A7%C3%A3o)
  - [Como fazer o deploy no Android](#como-fazer-o-deploy-no-android)

<!-- /TOC -->

## Commandos da linha de comando

### Verificando os workload instalados na máquina

`dotnet workload list`

A lista estando vazia é preciso instalar a partir do configurador do Visual Studio

### Verificando os templates disponíveis

`dotnet new --list`

A lista vai mostrar os templates disponíveis de acordo com os workloads instalados.

### Criando um projeto .Net MAUI

`dotnet new maui -n "PassXYZ.Vault"`

## Templates para o .NET MAUI

.NET MAUI App
: Esse é para um app .NET MAUI baseado em XAML.

.NET MAUI Blazor App
: Esse template pode ser usado para um app .NET MAUI baseado em Blazor.

.NET MAUI Class Library
: Essa é a opção para criar uma biblioteca de classe .NET MAUI. Podemos construir uma biblioteca de componentes compartilhados assim como uma biblioteca de classe .NET MAUI.

## Estrutura do projeto

### Common files

MauiProgram.cs
: Este é um arquivo de código que inicializa seu aplicativo. O código neste arquivo serve como ponto de entrada multiplataforma do aplicativo, que configura e inicia o aplicativo. O código de inicialização do modelo aponta para a classe App definida pelo arquivo App.xaml.

App.xaml
: Geralmente há dois arquivos com qualquer arquivo XAML, o próprio arquivo .xaml e um arquivo de código correspondente que é um item filho dele no Solution Explorer. O arquivo .xaml contém marcação XAML e o arquivo de código contém código criado pelo usuário para interagir com a marcação XAML.
: O arquivo App.xaml contém recursos XAML para todo o aplicativo, como cores, estilos ou templates. O arquivo App.xaml.cs geralmente contém código que instancia o aplicativo Shell. Neste projeto, aponta para a classe AppShell.

AppShell.xaml
: Este arquivo define a classe AppShell, que é usada para definir a hierarquia visual do aplicativo.

MainPage.xaml
: Esta é a página inicial exibida pelo aplicativo. O arquivo MainPage.xaml define a UI (interface do usuário) da página. MainPage.xaml.cs contém o code-behind do XAML, como o código para um evento de clique de botão.

### Platform-specific files

### Resources

Uma variedade de recursos desde imagens, fontes, splash screens, estilos e outros arquivos crus ficam neste pasta. Estes recursos podem ser usando por todas as plataformas.

## Gerenciamento do ciclo de vida do app

|Evento|Descrição|Transição de Estado|Método sobrescrito|
|----|----|----|----|
|Created| Este evento é gerado após a criação da janela nativa.|Not running -> Running| OnCreated|
|Activated| Este evento é gerado quando a janela foi ativada e é, ou se tornará, a janela em foco.| Not running -> Running|OnActivated|
|Deactivated|Este evento é gerado quando a janela não é mais a janela em foco. No entanto, a janela ainda pode estar visível.|Running -> Deactivated|OnDeactivated|
|Stopped|Este evento é gerado quando a janela não está mais visível.| Deactivated -> Stopped| OnStopped|
|Resumed|Este evento é gerado quando um aplicativo é retomado após ser interrompido. |Stopped -> Running|OnResumed|
|Destroying|Este evento é gerado quando a janela nativa está sendo destruída e desalocada.|Stopped -> Not running|OnDestroying|

Como se faz a subscrição em cada tipo de evento:

```csharp
public partial class App : Application
{
    public App()
    {
        InitializeComponent();

        MainPage = new AppShell();
    }

    protected override Window CreateWindow(IActivationState activationState)
    {
        Window window = base.CreateWindow(activationState);
        window.Created += (s, e) => {
            Debug.WriteLine("PassXYZ.Vault.App: 1. Created event");
        };

        window.Activated += (s, e) => {
            Debug.WriteLine("PassXYZ.Vault.App: 2. Activated event");
        };

        window.Deactivated += (s, e) => {
            Debug.WriteLine("PassXYZ.Vault.App: 3. Deactivated event");
        };

        window.Stopped += (s, e) => {
            Debug.WriteLine("PassXYZ.Vault.App: 4. Stopped event");
        };

        window.Resumed += (s, e) => {
            Debug.WriteLine("PassXYZ.Vault.App: 5. Resumed event");
        };

        window.Destroying += (s, e) => {
            Debug.WriteLine("PassXYZ.Vault.App: 6. Destroying event");
        };

        return window;
    }
}
```

Depois de lançarmos nosso aplicativo, podemos ver que os eventos Created e Activated são acionados. Então, minimizamos nosso aplicativo. Podemos ver que os eventos Deactivated e Stopped são disparados. Quando retomamos nosso aplicativo, os eventos Resumed e Activated são disparados. Finalmente, fechamos nosso aplicativo e um evento Destroying é disparado.

## Injeção de dependência (DI), Logging e Configuração

Estes 3 recursos podem ser configurados no arquivo MauiProgram.cs, logo após a criação do builder.

```csharp
        var builder = MauiApp.CreateBuilder();
        builder
            .UseMauiApp<App>()
            .ConfigureFonts(fonts =>
            {
                fonts.AddFont("OpenSans-Regular.ttf", "OpenSansRegular");
                fonts.AddFont("OpenSans-Semibold.ttf", "OpenSansSemibold");
            });

#if DEBUG
        builder.Logging.AddDebug();
#endif

        builder.Services.AddSingleton<MainPage>();
        builder.Services.AddSingleton<BeerPage>();
        builder.Services.AddSingleton<IGetCalculatedPricePerLiterQuery, GetCalculatedPricePerLiterQuery>();
        builder.Services.AddSingleton<IDateTimeProvider, LocalDateTimeProvider>();
        builder.Services.AddSingleton(s => ActivatorUtilities.CreateInstance<RepositoryManager>(s, dbPath));
        builder.Services.AddSingleton<ICreateBeerCommand, CreateBeerCommand>();
        builder.Services.AddSingleton<IGetAllBeerQuery, GetAllBeerQuery>();

        return builder.Build();
```

## Como fazer o deploy no Android

Fonte:

- <https://learn.microsoft.com/en-us/dotnet/maui/deployment/?view=net-maui-8.0>
- <https://learn.microsoft.com/en-us/dotnet/maui/android/deployment/?view=net-maui-8.0>
- <https://learn.microsoft.com/en-us/dotnet/maui/android/deployment/publish-ad-hoc?view=net-maui-8.0>

Ao publicar seu aplicativo .NET MAUI para Android, você gera um arquivo Android Package (APK) ou Android App Bundle (AAB). O APK é usado para instalar seu aplicativo em um dispositivo Android e o AAB é usado para publicar seu aplicativo no Google Play.
