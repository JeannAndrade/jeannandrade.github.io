---
layout: internal
---

# Observabilidade

Fontes:

## Table of contents

<!-- TOC start (generated with https://github.com/derlin/bitdowntoc) -->

- [O que é Observabilidade?](#o-que-é-observabilidade)
  - [A Diferença Crucial: Monitoramento vs. Observabilidade](#a-diferença-crucial-monitoramento-vs-observabilidade)
  - [Por que a Observabilidade se tornou tão importante? A "Caixa Preta"](#por-que-a-observabilidade-se-tornou-tão-importante-a-caixa-preta)
- [Os Três Pilares da Observabilidade](#os-três-pilares-da-observabilidade)
  - [Como os Pilares Funcionam Juntos: Resolvendo um Problema na Prática](#como-os-pilares-funcionam-juntos-resolvendo-um-problema-na-prática)
- [Completando o Quebra-Cabeça: Onde entra o OpenTelemetry?](#completando-o-quebra-cabeça-onde-entra-o-opentelemetry)
  - [O Problema: A "Torre de Babel" da Coleta de Dados](#o-problema-a-torre-de-babel-da-coleta-de-dados)
  - [A Solução: OpenTelemetry, o "Adaptador Universal"](#a-solução-opentelemetry-o-adaptador-universal)
  - [Como o OpenTelemetry Funciona na Prática?](#como-o-opentelemetry-funciona-na-prática)
  - [Amarrando tudo com nosso exemplo do Banco](#amarrando-tudo-com-nosso-exemplo-do-banco)

<!-- TOC end -->

<!-- TOC --><a name="o-que-é-observabilidade"></a>

## O que é Observabilidade?

Observabilidade é a capacidade de um sistema de software fornecer informações suficientes, por meio de dados como logs, métricas e rastreamentos (traces), para que seja possível entender seu funcionamento interno, identificar causas de problemas e responder perguntas sobre seu comportamento, mesmo diante de situações inesperadas. Ela permite investigar não apenas se algo está errado, mas por que está errado, facilitando a análise e a resolução de falhas em sistemas complexos.

Imagine que seu sistema de software (um aplicativo, um site) é um paciente em um hospital.

<!-- TOC --><a name="a-diferença-crucial-monitoramento-vs-observabilidade"></a>

### A Diferença Crucial: Monitoramento vs. Observabilidade

- **Monitoramento (O "Monitor de Sinais Vitais"):** É como aquele aparelho ao lado do leito que mede a frequência cardíaca, a temperatura e a pressão arterial. Ele te dá dados pré-definidos e te avisa com um alarme se algo sair do normal (ex: "a febre está alta!"). Você sabe *que* há um problema, mas não sabe exatamente *por quê*.

  - **No mundo do software:** Monitoramento te diz "o uso da CPU está em 95%" ou "o site está fora do ar".

- **Observabilidade (O "Médico Investigador"):** É a capacidade do médico de ir além dos sinais vitais. Ele pode fazer perguntas novas e complexas para entender a causa da febre: "O que você comeu ontem?", "Você viajou para algum lugar diferente?", "Teve contato com alguém doente?". A observabilidade permite que você explore o desconhecido e investigue a fundo para entender o *porquê* do problema.

  - **No mundo do software:** Observabilidade permite perguntar "Por que o site está lento especificamente para usuários do Rio de Janeiro que tentam finalizar uma compra pelo celular?".

**Conclusão principal:** Monitoramento te diz **SE** algo está errado. Observabilidade te ajuda a descobrir **POR QUE** algo está errado, permitindo que você faça perguntas que nem sabia que precisaria fazer.

<!-- TOC --><a name="por-que-a-observabilidade-se-tornou-tão-importante-a-caixa-preta"></a>

### Por que a Observabilidade se tornou tão importante? A "Caixa Preta"

Antigamente, os sistemas eram como um motor de fusca: simples, com todas as peças visíveis em um só lugar (chamado de **monólito**). Se algo desse errado, era fácil abrir o capô e encontrar o problema.

Hoje, os sistemas modernos são como um carro de Fórmula 1: extremamente complexos, formados por centenas de pequenas peças interligadas (os **microsserviços**). Quando um problema acontece, é como tentar descobrir qual dos 200 sensores do carro falhou. O sistema se torna uma **"caixa preta"**: você vê o que entra e o que sai, mas não sabe o que acontece lá dentro.

A Observabilidade é o conjunto de ferramentas que nos permite "iluminar" o interior dessa caixa preta e entender como todas essas pecinhas estão se comunicando.

<!-- TOC --><a name="os-três-pilares-da-observabilidade"></a>

## Os Três Pilares da Observabilidade

Para conseguir essa capacidade de investigação, a Observabilidade se apoia em três tipos de dados (os "pilares"), que trabalham juntos:

1. **Logs (O "Diário de Bordo"):**

    - **O que são?** São registros de texto de tudo o que acontece no sistema, evento por evento, com data e hora. Ex: "14:30:01 - Usuário 'José' fez login", "14:30:05 - Erro ao conectar com o banco de dados".
    - **Analogia:** É como o diário detalhado do paciente, onde a enfermeira anota tudo: "14h tomou o remédio X, 15h sentiu tontura, 16h comeu a sopa". É a fonte de informação mais detalhada.

1. **Métricas (O "Painel do Carro"):**

    - **O que são?** São números que resumem a saúde do sistema ao longo do tempo. Ex: percentual de uso da CPU, quantidade de usuários online, tempo de resposta do site.
    - **Analogia:** É o painel do seu carro, com o velocímetro, o medidor de combustível e a luz de temperatura. Ele te dá uma visão geral e rápida do estado do sistema. É ótimo para criar alertas (o "bip" do monitor de sinais vitais).

1. **Traces ou Rastreamento (A "Rota do GPS"):**

    - **O que são?** É o rastreamento completo da jornada de uma única ação do usuário através dos vários microsserviços do sistema.
    - **Analogia:** É como rastrear uma encomenda da Amazon. Você vê todo o caminho: "Saiu do centro de distribuição A", "Chegou na cidade B", "Saiu para entrega". No software, o trace mostra: "Ação do usuário chegou no serviço de login", "Depois foi para o serviço de pagamento", "O serviço de pagamento demorou 3 segundos para responder". Isso é fundamental para encontrar gargalos (onde as coisas estão lentas) na complexidade dos sistemas modernos.

<!-- TOC --><a name="como-os-pilares-funcionam-juntos-resolvendo-um-problema-na-prática"></a>

### Como os Pilares Funcionam Juntos: Resolvendo um Problema na Prática

1. O **alerta vem da Métrica:** O painel apita! "O tempo para finalizar uma compra está muito alto!".

1. O **Trace mostra onde está o problema:** Usando o rastreamento, você segue a "encomenda" (a tentativa de compra) e descobre que ela está demorando muito para sair do "serviço de verificação de estoque".

1. O **Log explica o porquê:** Agora que você sabe exatamente onde olhar, você abre o "diário de bordo" (os logs) daquele serviço e encontra a mensagem de erro: "Falha de comunicação com o sistema do fornecedor C".

**Pronto! Você foi do "algo está errado" para a causa raiz do problema de forma rápida e precisa.**

<!-- TOC --><a name="completando-o-quebra-cabeça-onde-entra-o-opentelemetry"></a>

## Completando o Quebra-Cabeça: Onde entra o OpenTelemetry?

Já entendemos **O QUÊ** é Observabilidade (a capacidade de investigar seu sistema) e quais são seus **PILARES** (Logs, Métricas e Traces).

A grande pergunta que o OpenTelemetry vem responder é: **COMO** nós geramos e coletamos esses dados de forma padronizada e eficiente dentro dos nossos sistemas complexos?

<!-- TOC --><a name="o-problema-a-torre-de-babel-da-coleta-de-dados"></a>

### O Problema: A "Torre de Babel" da Coleta de Dados

Imagine que você tem vários aparelhos eletrônicos em casa, cada um de uma marca diferente (uma TV da Samsung, um som da Sony, um videogame da Microsoft). Agora, imagine se cada um deles viesse com um formato de tomada completamente diferente e exclusivo. Você precisaria de um adaptador para cada aparelho, e se trocasse a TV por uma da LG, teria que trocar toda a fiação. Seria um caos.

No mundo do software, antes do OpenTelemetry, era exatamente assim:

- Se você quisesse usar a ferramenta de observabilidade **Datadog**, precisava instalar o "agente" (um pedaço de código) da Datadog na sua aplicação.
- Se quisesse usar a **New Relic**, precisava instalar o agente da New Relic.
- Se quisesse usar o **Jaeger** para traces, precisava usar as bibliotecas do Jaeger.

Cada ferramenta falava uma "língua" diferente e exigia sua própria instalação. Se sua empresa decidisse trocar de Datadog para New Relic, os desenvolvedores teriam que reescrever todo o código de monitoramento da aplicação. Isso é caro, demorado e arriscado. É o que chamamos de **"vendor lock-in"** (ficar "preso" a um fornecedor).

<!-- TOC --><a name="a-solução-opentelemetry-o-adaptador-universal"></a>

### A Solução: OpenTelemetry, o "Adaptador Universal"

O OpenTelemetry é um **padrão aberto** e um conjunto de ferramentas criados pela comunidade (sob a mesma fundação que cuida do Kubernetes, a CNCF) para ser a **solução universal** para esse problema.

Pense no OTel como o **padrão USB-C** do mundo da Observabilidade. Não importa se você está conectando um celular Samsung, um fone da Sony ou um MacBook; todos usam o mesmo conector.

**O objetivo do OpenTelemetry é: instrumente seu código UMA VEZ e seja capaz de enviar os dados para QUALQUER LUGAR.**

<!-- TOC --><a name="como-o-opentelemetry-funciona-na-prática"></a>

### Como o OpenTelemetry Funciona na Prática?

O OTel fornece um "kit de ferramentas" que os desenvolvedores usam dentro de suas aplicações. Esse kit é composto por três partes principais, como destacado no vídeo:

1. **API e SDK (A "Tomada" dentro da sua Aplicação):**

    - Os desenvolvedores adicionam a biblioteca (SDK) do OpenTelemetry à sua aplicação (seja ela em Java, Python, Go, etc.).

    - Essa biblioteca já sabe como coletar automaticamente muitos dados (ex: quanto tempo uma requisição web demorou) e permite que os desenvolvedores adicionem informações personalizadas (ex: "ID do usuário 'José' iniciou a transferência").

    - É aqui que os Logs, Métricas e Traces são **gerados** de forma padronizada.

2. **Collector (O "Roteador Inteligente" de Dados):**

    - Este é um componente central e muito poderoso. O Collector é um serviço separado que funciona como uma central de recebimento.

    - Sua aplicação não envia os dados diretamente para a ferramenta final (Datadog, Jaeger), ela envia para o Collector.

    - **Vantagens do Collector:**

        - **Flexibilidade:** Você pode configurar o Collector para enviar os dados para múltiplos destinos ao mesmo tempo. Ex: enviar Métricas para o Prometheus e Traces para o Jaeger, usando a mesma fonte de dados!

        - **Processamento:** Ele pode processar os dados no meio do caminho (ex: remover informações sensíveis como um CPF de um log, ou adicionar informações de contexto).

        - **Eficiência:** Ele agrupa os dados antes de enviá-los, otimizando o uso da rede.

3. **Exporters (Os "Plugs" para Cada Ferramenta):**

    - O Exporter é a parte final do processo. É um "plug" que sabe falar a língua específica de uma ferramenta de backend.

    - Dentro do Collector, você configura: "use o *exporter* do Jaeger para enviar os traces para o meu servidor Jaeger" e "use o *exporter* do Prometheus para enviar as métricas para o meu servidor Prometheus".

<!-- TOC --><a name="amarrando-tudo-com-nosso-exemplo-do-banco"></a>

### Amarrando tudo com nosso exemplo do Banco

Vamos revisitar o seu microsserviço de transferências:

1. **Instrumentação:** Seu desenvolvedor adiciona o **SDK do OpenTelemetry** ao código do serviço de transferência.

    - Automaticamente, o OTel já cria um **Trace** para cada pedido de transferência que chega. Esse trace vai mostrar o tempo gasto dentro do serviço e, crucialmente, o tempo gasto na chamada para o serviço **GBIP**.

    - O desenvolvedor adiciona algumas linhas de código usando a **API do OTel** para criar aquelas **Métricas** que sugerimos: `transferencias_iniciadas_total`, `duracao_chamada_gbip_segundos`, etc. A métrica é incrementada com as dimensões corretas (`tipo_transferencia="Wire"`).

    - Ele também configura o envio de **Logs** importantes através do OTel.

2. **Coleta:** A aplicação é configurada para enviar todos esses dados (traces, métricas, logs) para o **OTel Collector**.

3. **Exportação:** No Collector, você define as regras:

    - "Todos os **Traces** devem ser enviados para o nosso sistema **Jaeger**."

    - "Todas as **Métricas** devem ser enviadas para o nosso sistema **Prometheus** (que alimenta nossos dashboards no Grafana)."

    - "Todos os **Logs** devem ser enviados para o **Elasticsearch**."

**Resultado:** O código da sua aplicação não sabe e **não precisa saber** para onde os dados estão indo. Ele apenas fala "a língua do OpenTelemetry". Se amanhã sua empresa decidir trocar o Jaeger pelo Datadog, você não muda **uma linha sequer** do código da aplicação. Você apenas altera a configuração do OTel Collector para adicionar um novo "plug" (o exporter do Datadog).

---

**Em Resumo:**

- **Observabilidade:** É a meta (entender o sistema).

- **Logs, Métricas e Traces:** São os tipos de informação que precisamos para atingir essa meta.

- **OpenTelemetry:** É o **padrão** e a **ferramenta** que usamos para gerar e coletar essas informações de forma unificada e flexível, nos libertando da "bagunça" de usar um padrão para cada fornecedor.
