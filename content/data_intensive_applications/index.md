---
layout: internal
---

# Data-intensive applications (Table of Contents)

Fontes:

* Este é um resumo do livro Designing Data-Intensive Applications: The Big Ideas Behind Reliable, Scalable, and Maintainable Systems, do Martin Kleppmann.

Índice:

<!-- TOC start (generated with https://github.com/derlin/bitdowntoc) -->

* [Preface](#preface)
* [Conceitos](#conceitos)
  * [Confiabilidade](#confiabilidade)
    * [Falhas no hardware](#falhas-no-hardware)
    * [Erros de software](#erros-de-software)
  * [Escalabilidade](#escalabilidade)
  * [Capacidade de manutenção](#capacidade-de-manutenção)

<!-- TOC end -->

## Preface

Chamamos um aplicativo de uso intensivo de dados se os dados forem seu principal desafio – a quantidade de dados, a complexidade dos dados ou a velocidade com que eles mudam – em oposição a uso intensivo de computação, onde os ciclos de CPU são o gargalo.

Um aplicativo com uso intensivo de dados normalmente é criado a partir de blocos de construção padrão que fornecem funcionalidades comumente necessárias. Por exemplo, muitos aplicativos precisam:

* Armazenar dados para que eles ou outro aplicativo possam encontrá-los novamente mais tarde (bancos de dados)
* Lembre-se do resultado de uma operação cara, para acelerar leituras (caches)
* Permitir que os usuários pesquisem dados por palavra-chave ou os filtrem de várias maneiras (índices de pesquisa)
* Enviar uma mensagem para outro processo, para ser tratada de forma assíncrona (processamento de fluxo ou "stream processing")
* Processar periodicamente uma grande quantidade de dados acumulados (processamento em lote)

## Conceitos

### Confiabilidade

 O sistema deve continuar funcionando corretamente (desempenhando a função correta no nível de desempenho desejado) mesmo diante de adversidades (falhas de hardware ou software, e até erro humano).

 Para software, as expectativas típicas incluem:

* O aplicativo executa a função que o usuário esperava.
* Pode tolerar que o usuário cometa erros ou utilize o software de maneiras inesperadas.
* Seu desempenho é bom o suficiente para o caso de uso necessário, sob a carga e o volume de dados esperados.
* O sistema impede qualquer acesso não autorizado e abuso.

As coisas que podem dar errado são chamadas de falhas (faults), e os sistemas que antecipam as falhas e podem lidar com elas são chamados de tolerantes a falhas ou resilientes.

Observe que uma *fault* não é o mesmo que uma  *failure*. Uma *fault* geralmente é definida como um componente do sistema que se desvia de suas especificações, enquanto uma *failure* ocorre quando o sistema como um todo deixa de fornecer o serviço necessário ao usuário. É impossível reduzir a probabilidade de *fault* a zero; portanto, geralmente é melhor projetar mecanismos tolerância a falhas que evitem que *fault* causem *failure*.

#### Falhas no hardware

O tema de falha no hardware pode ser tratado de duas maneiras:

* Construindo sistemas que possam tolerar a perda de máquinas inteiras, usando preferencialmente técnicas de tolerância a falhas de software
* Adicionando redundância de hardware

#### Erros de software

Outra classe de falha é um erro sistemático dentro do sistema:

* Um bug de software que faz com que todas as instâncias de um servidor de aplicativos travem quando recebem uma entrada incorreta específica.
* Um processo descontrolado que consome algum recurso compartilhado
* Um serviço do qual o sistema depende que fica lento, não responde ou começa a retornar respostas corrompidas.
* Falhas em cascata, onde uma pequena falha em um componente desencadeia uma falha em outro componente, que por sua vez desencadeia outras falhas

Não existe uma solução rápida para o problema das falhas sistemáticas de software. Muitas pequenas coisas podem ajudar: pensar cuidadosamente sobre suposições e interações no sistema; testes completos; isolamento de processos; permitindo que processos travem e reiniciem; medir, monitorar e analisar o comportamento do sistema na produção.

### Escalabilidade

 À medida que o sistema cresce (em volume de dados, volume de tráfego ou complexidade), devem existir formas razoáveis de lidar com esse crescimento.

### Capacidade de manutenção

Com o tempo, muitas pessoas diferentes trabalharão no sistema (engenharia e operações, mantendo o comportamento atual e adaptando o sistema a novos casos de uso), e todas deverão ser capazes de trabalhar nele de forma produtiva.
