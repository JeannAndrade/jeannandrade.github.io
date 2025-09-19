---
layout: internal_NoButton
---

# K9S

Conteúdo:

<!-- TOC start (generated with https://github.com/derlin/bitdowntoc) -->

- [Introdução](#introdução)
- [Principais Funcionalidades](#principais-funcionalidades)
  - [Navegação Rápida e Contextual](#navegação-rápida-e-contextual)
  - [Gerenciamento e Interação Direta](#gerenciamento-e-interação-direta)
  - [Diagnóstico e Depuração (Onde ele mais brilha)](#diagnóstico-e-depuração-onde-ele-mais-brilha)
  - [Ferramentas Integradas de Análise](#ferramentas-integradas-de-análise)
  - [Customização](#customização)
  - [Por que os desenvolvedores e SREs amam o k9s?](#por-que-os-desenvolvedores-e-sres-amam-o-k9s)
- [Explicação das Colunas do k9s](#explicação-das-colunas-do-k9s)
  - [Name](#name)
  - [PF (Port Forward)](#pf-port-forward)
  - [Ready](#ready)
  - [Status](#status)
  - [Restarts](#restarts)
- [Colunas de Uso de Recursos](#colunas-de-uso-de-recursos)
  - [CPU e MEM](#cpu-e-mem)
  - [%CPU/R (%CPU/Request)](#cpur-cpurequest)
  - [%CPU/L (%CPU/Limit)](#cpul-cpulimit)
  - [%MEM/R (%MEM/Request)](#memr-memrequest)
  - [%MEM/L (%MEM/Limit)](#meml-memlimit)
  - [Node](#node)
  - [Age](#age)
- [Resumo Prático para Diagnóstico](#resumo-prático-para-diagnóstico)

<!-- TOC end -->

<!-- TOC --><a name="introdução"></a>

## Introdução

O **k9s** é uma ferramenta de linha de comando (CLI) que fornece uma **interface de usuário baseada em texto (TUI - Text-based User Interface)** para interagir com clusters Kubernetes.

Em vez de você digitar comandos longos e complexos como `kubectl get pods -n meu-namespace --watch`, o k9s apresenta as informações do seu cluster de forma visual, organizada em tabelas e painéis que são atualizados em tempo real, diretamente no seu terminal.

**Analogia para Facilitar:**

Pense no `kubectl` como as ferramentas de linha de comando de um sistema operacional (como `ps`, `kill`, `top`). O k9s seria o equivalente ao **"Gerenciador de Tarefas"** do Windows ou ao **"Monitor de Atividade"** do macOS: uma interface gráfica (neste caso, de texto) que te dá uma visão geral e permite interagir com os processos de forma muito mais rápida e intuitiva.

<!-- TOC --><a name="principais-funcionalidades"></a>

## Principais Funcionalidades

O poder do k9s vem da combinação de visualização de dados com ações rápidas, geralmente acessíveis por atalhos de teclado.

<!-- TOC --><a name="navegação-rápida-e-contextual"></a>

### Navegação Rápida e Contextual

- **Mover-se entre Recursos:** Você pode alternar rapidamente entre a visualização de diferentes recursos do Kubernetes simplesmente digitando `:recurso` (ex: `:pods`, `:svc` para services, `:deploy` para deployments, `:cm` para configmaps).

- **Visão Hierárquica:** O k9s entende as relações entre os recursos. Por exemplo, se você está vendo um `Deployment` e pressiona `Enter`, ele te mostra os `ReplicaSets` associados. Pressionando `Enter` em um `ReplicaSet`, ele te mostra os `Pods` que ele gerencia. Isso é chamado de "drill-down" e é extremamente útil para entender a estrutura da sua aplicação.

- **Filtros e Labels:** Você pode filtrar qualquer visualização por labels ou texto livre usando a tecla `/`, facilitando a busca por um recurso específico em um ambiente com centenas de pods.

<!-- TOC --><a name="gerenciamento-e-interação-direta"></a>

### Gerenciamento e Interação Direta

- **Ações Rápidas:** Você pode realizar as operações mais comuns com atalhos de teclado simples:

  - **`d`**: Descreve um recurso (equivalente a `kubectl describe`).

  - **`e`**: Edita a definição YAML do recurso ao vivo (equivalente a `kubectl edit`).

  - **`ctrl-d`**: Deleta um recurso (com confirmação).

  - **`ctrl-k`**: Mata um pod diretamente.

- **Escalonamento:** Em um `Deployment` ou `ReplicaSet`, você pode usar a tecla `s` para escalar o número de réplicas para cima ou para baixo de forma interativa.

<!-- TOC --><a name="diagnóstico-e-depuração-onde-ele-mais-brilha"></a>

### Diagnóstico e Depuração (Onde ele mais brilha)

- **Visualização de Logs:** Selecione um pod e pressione `l` para ver seus logs em tempo real (streaming). Você pode pausar, filtrar e até mesmo ver logs de contêineres anteriores (se houver).

- **Shell Interativo:** Selecione um pod e pressione `s` para abrir um shell diretamente dentro de um de seus contêineres. Isso é fundamental para depurar problemas em tempo real.

- **Port-Forwarding Simplificado:** Com `shift-f`, você pode criar um *port-forward* de um pod para sua máquina local com poucos cliques, sem precisar decorar a sintaxe do `kubectl`.

- **Análise com "XRay":** Pressione `x` em um recurso para ver uma "radiografia" de suas conexões e dependências, como a quais `Services`, `ConfigMaps` ou `Secrets` ele está associado.

<!-- TOC --><a name="ferramentas-integradas-de-análise"></a>

### Ferramentas Integradas de Análise

- **Popeye:** O k9s integra uma ferramenta chamada Popeye. Ao digitar `:popeye`, ele escaneia seu cluster em busca de más configurações, recursos não utilizados, potenciais problemas de segurança e outras "más práticas", gerando um relatório com notas para cada recurso. É como ter um "check-up" de sanidade para seu cluster.

- **Pulses:** A visão `:pulse` mostra um resumo do estado de saúde geral do seu cluster, consolidando informações de vários recursos em um único painel.

<!-- TOC --><a name="customização"></a>

### Customização

- **Aliases:** Você pode criar seus próprios atalhos para visualizações, por exemplo, configurar `po` para ser um alias de `pods`.

- **Skins:** É possível customizar completamente o esquema de cores do k9s para se adequar à sua preferência.

- **Plugins:** Usuários avançados podem criar seus próprios comandos e scripts e integrá-los ao k9s como plugins.

<!-- TOC --><a name="por-que-os-desenvolvedores-e-sres-amam-o-k9s"></a>

### Por que os desenvolvedores e SREs amam o k9s?

- **Agilidade:** Reduz drasticamente o tempo gasto digitando comandos `kubectl`.

- **Contexto:** Mantém o contexto visual do que está acontecendo, evitando que você se perca entre múltiplas abas de terminal.

- **Descoberta:** É uma ferramenta fantástica para explorar e entender um cluster com o qual você não está familiarizado.

- **Eficiência:** Concentra 90% das tarefas diárias de gerenciamento e depuração em uma única interface, acessível com atalhos de teclado.

Em resumo, **k9s não substitui o `kubectl`, mas o aprimora**, oferecendo uma camada visual, interativa e extremamente eficiente que acelera o fluxo de trabalho diário com Kubernetes.

<!-- TOC --><a name="explicação-das-colunas-do-k9s"></a>

## Explicação das Colunas do k9s

<!-- TOC --><a name="name"></a>

### Name

- **O que é:** O nome do pod.

- **Importância:** É o identificador único do pod dentro de um determinado *namespace*. É como você se refere a ele em comandos `kubectl`, por exemplo.

<!-- TOC --><a name="pf-port-forward"></a>

### PF (Port Forward)

- **O que é:** Indica se existe um *port-forward* ativo para este pod.

- **Importância:** O *port-forward* é uma funcionalidade que permite que você acesse uma porta do contêiner diretamente da sua máquina local. É extremamente útil para depuração. Se você usar a ação `shift-f` no k9s para criar um *port-forward*, um símbolo `✓` aparecerá nesta coluna.

<!-- TOC --><a name="ready"></a>

### Ready

- **O que é:** Mostra a proporção de contêineres dentro do pod que estão no estado "pronto" (Ready) em relação ao total de contêineres.

- **Exemplo:** `1/1` significa que o pod tem 1 contêiner e ele está pronto. `0/1` significa que o pod tem 1 contêiner, ele pode até estar rodando (*Running*), mas ainda não está pronto para receber tráfego (provavelmente falhou no `readinessProbe`).

- **Importância:** Um pod só começa a receber tráfego de um *Service* quando seus contêineres estão "Ready". Se estiver `0/1`, sua aplicação pode estar no ar, mas inacessível pela rede do cluster.

<!-- TOC --><a name="status"></a>

### Status

- **O que é:** O estado atual do pod no ciclo de vida do Kubernetes.

- **Valores comuns:**

  - **`Running`**: O pod está rodando normalmente e todos os seus contêineres foram criados.

  - **`Pending`**: O pod foi aceito pelo Kubernetes, mas um ou mais de seus contêineres ainda não foram iniciados. Isso pode acontecer por falta de recursos no cluster, ou porque está baixando uma imagem de contêiner grande.

  - **`Succeeded`**: Todos os contêineres no pod terminaram sua execução com sucesso. Geralmente visto em *Jobs* ou *CronJobs*.

  - **`Failed`**: Todos os contêineres no pod terminaram, mas pelo menos um deles falhou (saiu com um código de erro).

  - **`CrashLoopBackOff`**: Um contêiner no pod está iniciando, falhando, e o Kubernetes está tentando reiniciá-lo repetidamente. **Este é um sinal claro de problema na sua aplicação.**

  - **`Terminating`**: O pod está no processo de ser desligado.

<!-- TOC --><a name="restarts"></a>

### Restarts

- **O que é:** O número de vezes que os contêineres dentro do pod foram reiniciados.

- **Importância:** Um número alto de *restarts* (qualquer coisa acima de 0, na verdade) é um forte indicador de que algo está errado. A aplicação pode estar quebrando por um bug, falha de conexão com o banco de dados, ou estourando o limite de memória (OOMKilled).

<!-- TOC --><a name="colunas-de-uso-de-recursos"></a>

## Colunas de Uso de Recursos

Para entender as próximas colunas, é crucial conhecer dois conceitos do Kubernetes: **Requests** e **Limits**.

- **Request (R):** A quantidade de recursos (CPU/Memória) que você **pede** para o Kubernetes **garantir** para o seu pod. Isso é usado para decidir em qual *Node* o pod será alocado.

- **Limit (L):** A quantidade **máxima** de recursos que o seu pod pode consumir. Se ele ultrapassar esse limite, ele sofrerá consequências.

<!-- TOC --><a name="cpu-e-mem"></a>

### CPU e MEM

- **O que é:** O uso **atual e absoluto** de CPU e Memória pelo pod.

- **Unidades:**

  - **CPU:** Medido em `m` (millicores). `1000m` equivale a 1 core de CPU.

  - **MEM:** Medido em `Mi` (Mebibytes) ou `Gi` (Gibibytes).

<!-- TOC --><a name="cpur-cpurequest"></a>

### %CPU/R (%CPU/Request)

- **O que é:** A porcentagem do uso atual de CPU em relação à quantidade que foi **solicitada (Request)**.

- **Importância:** Se este valor estiver acima de 100%, significa que seu pod está usando mais CPU do que o garantido para ele. Isso não é necessariamente um problema se houver CPU sobrando no *Node*, mas indica que sua estimativa de *Request* pode estar baixa.

<!-- TOC --><a name="cpul-cpulimit"></a>

### %CPU/L (%CPU/Limit)

- **O que é:** A porcentagem do uso atual de CPU em relação ao **limite (Limit)** máximo permitido.

- **Importância:** Esta é uma métrica crítica. Se o valor se aproximar de 100%, o Kubernetes começará a fazer **"throttling"** no seu pod, ou seja, ele vai artificialmente limitar a performance da sua aplicação para que ela não ultrapasse o limite. Isso pode causar lentidão e degradação do serviço.

<!-- TOC --><a name="memr-memrequest"></a>

### %MEM/R (%MEM/Request)

- **O que é:** A porcentagem do uso atual de memória em relação à quantidade que foi **solicitada (Request)**.

- **Importância:** Similar ao `%CPU/R`, ajuda a entender se o seu *Request* de memória está bem dimensionado.

<!-- TOC --><a name="meml-memlimit"></a>

### %MEM/L (%MEM/Limit)

- **O que é:** A porcentagem do uso atual de memória em relação ao **limite (Limit)** máximo permitido.

- **Importância:** **Esta é talvez a métrica mais importante para a estabilidade do pod.** Se um pod tenta usar mais memória que o seu limite, o Kubernetes o **mata** imediatamente. Isso é conhecido como **OOMKilled** (Out Of Memory Killed). Quando isso acontece, você verá o contador de `Restarts` aumentar e o pod reiniciar. Se você tem pods reiniciando "do nada", verifique esta coluna.

<!-- TOC --><a name="node"></a>

### Node

- **O que é:** O nome do nó (servidor/máquina virtual) do cluster onde o pod está sendo executado.

- **Importância:** Útil para saber a distribuição dos seus pods e para investigar problemas específicos de um nó (por exemplo, se todos os pods em um nó estão com problema).

<!-- TOC --><a name="age"></a>

### Age

- **O que é:** Há quanto tempo o pod foi criado.

- **Importância:** Ajuda a ter uma noção do ciclo de vida dos seus pods. Se você vê um pod com `Age` de poucos segundos e um número alto de `Restarts`, o problema é grave e acontece logo na inicialização.

<!-- TOC --><a name="resumo-prático-para-diagnóstico"></a>

## Resumo Prático para Diagnóstico

- **Pod não funciona?** Olhe `Status` (está `CrashLoopBackOff`?), `Ready` (está `0/1`?) e `Restarts`.

- **Aplicação está lenta?** Olhe `%CPU/L`. Se estiver perto de 100%, ela está sofrendo *throttling*.

- **Pod está reiniciando sem motivo aparente?** Olhe `%MEM/L`. Provavelmente está sendo "OOMKilled". Verifique também os logs do pod (`l` no k9s).
