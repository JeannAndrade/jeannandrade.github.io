---
layout: internal
---

# Blazor

Fontes:

* [Web Development With Blazor: A Practical Guide to Building Interactive UIs With C# 12 and .NET 8, by Jimmy Engstrom](https://www.amazon.com/Web-Development-Blazor-practical-interactive/dp/1835465919#:~:text=Web%20Development%20with%20Blazor%20is%20your%20essential%20guide%20to%20building)

## Table of contents

## Conceitos

### Latência (Latency)

No desenvolvimento de software web, latência se refere ao tempo decorrido entre a ação de um usuário e a resposta do servidor. Essencialmente, é o tempo que os dados levam para viajar da fonte (como o navegador de um usuário) para o destino (como um servidor web) e voltar novamente.

Por exemplo, quando você clica em um link em uma página web, latência é o tempo que o servidor leva para processar essa solicitação e enviar os dados necessários de volta para o seu navegador. Menor latência significa tempos de resposta mais rápidos, o que é crucial para uma boa experiência de usuário.

## Throughput

No desenvolvimento de software web, throughput se refere à quantidade de dados ou número de transações que um sistema pode processar dentro de um período específico. É uma medida de quanto trabalho pode ser concluído em um determinado período de tempo, geralmente expresso em termos de solicitações por segundo, transações por segundo ou bits/bytes por segundo.

Por exemplo, se um aplicativo web pode lidar com 100 solicitações por segundo, seu throughput é de 100 solicitações por segundo. Um alto throughput indica que o sistema pode processar um grande número de transações rapidamente, o que é crucial para desempenho e escalabilidade.

## Motivação para usar Blazor

Blazor surgiu como uma alternativa ao uso de JavaScript e seus frameworks (React, Angular, Vue, etc) em SPAs. A idea é conseguir criar aplicações web responsivas apenas utilizando C#.

De outra forma, deixa de ser necessário aprender várias das tecnologias envolvidas na Web, utilizando apenas a linguagem que desenvolvedores C# já conhecem.

## O que é Blazor

Blazor é Framework de UI open-source no qual você pode criar aplicativos web interativos usando HTML, CSS e C# com suporte total para bindings, eventos, formulários e validação, injeção de dependência, depuração e muito mais.

## Diferentes maneiras de rodar Blazor

* Blazor Server
* Blazor WebAssembly
* Blazor Hybrid (usando .NET MAUI)
* SSR (Server-Side Rendering)

### Blazor Server

O Blazor Server usa o SignalR para comunicação entre o cliente e o servidor, conforme mostrado no diagrama a seguir:

![Overview Blazor Server](./img/OverviewBlazorServer.png)

SignalR é uma biblioteca de comunicação em tempo real que cria uma conexão entre o cliente e o servidor. O SignalR pode usar muitos meios diferentes de transporte de dados e seleciona automaticamente o melhor protocolo de transporte com base nas capacidades do seu servidor e cliente. O SignalR sempre tentará usar WebSockets, que é um protocolo de transporte integrado ao HTML5. Se o WebSockets não estiver habilitado, ele selecionará outro protocolo.

O Blazor é criado com elementos de UI reutilizáveis ​​chamados **componentes**. Cada componente contém código C# e marcação. Um componente
pode incluir outros componentes. Você pode usar a sintaxe Razor para misturar marcação e código C# ou fazer tudo em C#, se desejar. Os componentes podem ser atualizados pela interação do usuário (pressionando um botão) ou gatilhos (como um cronômetro).

Os componentes são renderizados em uma árvore de renderização, uma representação binária do DOM contendo estados de objetos e quaisquer propriedades ou valores. A árvore de renderização manterá o controle de quaisquer alterações em comparação com a árvore de renderização anterior e, em seguida, enviará apenas as coisas que mudaram no SignalR usando um formato binário para atualizar o DOM.

O JavaScript receberá as alterações no lado do cliente e atualizará a página de acordo. Se compararmos isso ao ASP.NET tradicional, renderizamos apenas o componente em si, não a página inteira, e enviamos apenas as alterações reais para o DOM, não a página inteira.

Existem vantagens no Blazor Server:

* Ele contém apenas código suficiente para estabelecer que a conexão seja baixada para o cliente, então o site tem um pequeno footprint, o que torna a inicialização do site muito rápida.
* Como tudo é renderizado no servidor, o Blazor Server é mais amigável ao SEO.
* Como estamos executando no servidor, o aplicativo pode utilizar totalmente os recursos do servidor.
* O site funcionará em navegadores da web mais antigos que não suportam WebAssembly.
* O código é executado no servidor e permanece no servidor; não há como descompilar o código.
* Como o código é executado no seu servidor (ou na nuvem), você pode fazer chamadas diretas para serviços e bancos de dados dentro da sua organização.

Existem, é claro, algumas desvantagens no Blazor Server também:

* Você precisa estar sempre conectado ao servidor, pois a renderização é feita no servidor. Se você tiver uma conexão de internet ruim, o site pode não funcionar. A grande diferença em comparação a um site que não seja do Blazor Server é que um site que não seja do Blazor Server pode entregar uma página e então desconectar até que solicite outra página. Com o Blazor, essa conexão (SignalR) deve estar sempre conectada (pequenas desconexões são aceitáveis).
* Não há modo offline/PWA (Progressive Web App), pois ele precisa estar conectado.
* Cada clique ou atualização de página deve fazer uma viagem de ida e volta para o servidor, o que pode resultar em maior latência. É importante lembrar que o Blazor Server enviará apenas os dados alterados.
* Como precisamos ter uma conexão com o servidor, a carga naquele servidor aumenta e dificulta o scaling. Para resolver esse problema, você pode usar o hub do Azure SignalR para lidar com as conexões constantes e deixar seu servidor se concentrar na entrega de conteúdo.
* Cada conexão armazena as informações na memória do servidor, aumentando o uso da memória e dificultando o balanceamento de carga.
* Para poder executar o Blazor Server, você precisa hospedá-lo em um servidor habilitado para ASP.NET Core.

### Blazor WebAssembly

O runtime Mono é uma ferramenta que permite que você execute programas feitos com C# e outras linguagens .NET em vários sistemas operacionais, não apenas Windows.

A Microsoft pegou o runtime Mono (que é escrito em C) e o compilou no WebAssembly.

A versão WebAssembly do Blazor funciona de forma muito similar à versão do servidor, como mostrado no diagrama a seguir. Movemos tudo para fora do servidor, e agora está rodando dentro do nosso navegador da web:

![Overview Blazor WebAssembly](./img/OverviewBlazorWebAssembly.png)
