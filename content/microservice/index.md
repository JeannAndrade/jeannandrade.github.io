---
layout: internal
---

# Microsserviço

Fontes: Microservices: The big picture, Antonio Gonçalves, PluralSight

* Comparação entre arquitetura de microsserviço e arquitetura de monólito
* Como o ciclo de desenvolvimento de software pode ser afetado pela escolha entre estas abordagem
* Terminologia e microsserviço
* Conceitos e padrões de design utilizados em microsserviço
* Prós e contras de microsserviço

## Ciclo de vida do desenvolvimento de software

Independente do modelo seguido, o desenvolvimento de software tem um ciclo de vida que faz com que um software chegue até o ambiente de produção. Esse processo envolve pessoas para desenhar, desenvolver, por e executar o software em produção. microsserviço impacta este ciclo de desenvolvimento, seja na tecnologia, na organização da equipe ou na forma em como você roda o seu software em produção.

1. Durante a fase de análise, reunimos os requisitos. Durante os primeiros sprints, esta é a base da aplicação que define os requisitos mínimos para fazer a aplicação decolar.
2. Depois vem a fase de planejamento e design, onde planejamos esse sprint para garantir que podemos atender aos requisitos no cronograma determinado, bem como extrair os elementos de design dos requisitos.
3. A fase de desenvolvimento é a mais longa. É aqui que entramos em ação e desenvolvemos tudo o que foi planejado. Isso anda de mãos dadas com a fase de testes.
4. Ao final deste sprint, liberamos todos os recursos planejados em produção. Agora o produto está vivo e funcionando. É aí que nossos clientes começam a usar nosso aplicativo que agora precisa ser monitorado.
5. Esta é uma fase importante, pois nos dará algum feedback sobre como nossos clientes utilizam o aplicativo. Com base nesses resultados, podemos construir uma lista de requisitos para a próxima iteração.
6. E é claro que no longo prazo teremos que manter o aplicativo.

Durante este ciclo de vida de desenvolvimento, várias pessoas diferentes estão envolvidas:

1. Usuários e analistas de negócios reunirão seus requisitos e anotarão as histórias de usuários para um determinado sprint.
2. Desenvolvedores, web designers e arquitetos projetarão e desenvolverão o software.
3. Os gerentes de projeto coordenarão o projeto e garantirão a sincronização de todos, para que a meta possa ser alcançada.
4. Uma vez em produção, a equipe operacional é responsável por monitorar, lidar com a segurança e garantir que o software esteja funcionando 24/7.

Uma organização normalmente terá vários desses projetos, maiores, menores, execuções cruciais, funcionando 24/7, projetos paralelos executados apenas em determinadas ocasiões. Podem ser relacionados ou não, desenvolvidos em diferentes países por diferentes equipes. Cada projeto é em sua maioria independente, então alguns podem ter usado uma abordagem em cascata, outros ágeis. Alguns projetos podem levar algumas semanas para serem construídos, outros, alguns anos. Alguns terão sucesso e outros falharão. O projeto seguinte se transformará em software. E, finalmente, cada software será implantado. Alguns serão implantados em servidores ou máquinas virtuais, outros serão implantados diretamente na nuvem. Este é um rápido resumo do que a maioria das empresas de TI faz ao construir software. Microsserviços também são softwares e seguem aproximadamente o mesmo ciclo de vida de desenvolvimento, com algumas pequenas alterações.

## O que são Microsserviços?

O termo microsserviços descreve um estilo de desenvolvimento de software que cresceu a partir de tendências recentes para estabelecer práticas destinadas a aumentar a velocidade e a eficiência do desenvolvimento e gerenciamento de soluções de software em escala. Este conjunto de práticas é agnóstico em termos de tecnologia, tata-se mais de aplicar um certo número de princípios e padrões arquitetônicos que finalmente criarão uma arquitetura de microsserviços.

Cada microsserviço deve fazer uma coisa e bem. Portanto, o micro refere-se ao escopo da funcionalidade do serviço. Um microsserviço é um serviço construído em torno de um recurso de negócios específico, **que pode ser implantado de forma independente**. Chamamos isso de contexto delimitado. Portanto, para construir um aplicativo corporativo de grande porte, precisamos identificar os subdomínios do nosso domínio comercial principal e construir cada subdomínio como um microsserviço. Por exemplo, um aplicativo de comércio eletrônico tem um domínio grande, mas pensando bem, você pode dividi-lo em vários subdomínios menores, como gerenciamento de usuários, catálogo, faturamento e assim por diante.

Um serviço é um componente de código limitado implementável de forma independente que oferece suporte à interoperabilidade por meio de comunicação baseada em mensagens. James Lewis e Martin Fowler, ambos da Thoughtworks, foram quem cunhou o termo microsserviço. A definição original que eles deram diz: o estilo arquitetural de microsserviços é uma abordagem para desenvolver um único aplicativo como um conjunto de pequenos serviços, cada um executando seu próprio processo e se comunicando com mecanismos leves. Por mecanismos leves, eles queriam dizer recursos HTTP. Esses serviços são construídos em torno de capacidades de negócios, o famoso contexto delimitado, e podem ser implantados de forma independente.

Sam Newman, também da Thoughtworks, tem uma definição mais concisa, microsserviços são serviços pequenos e autônomos que funcionam juntos. Esta citação enfatiza o nível de independência, o escopo delimitado e a decomposição de uma aplicação em serviços altamente coesos e pouco acoplados.

A maneira como desenvolvemos software é basicamente um projeto que resulta em um produto, um aplicativo, que é um software. Quanto maior o projeto, maior será o seu ciclo de vida. Pode levar alguns meses ou anos para reunir os requisitos e realmente lançá-lo em produção. Quanto maior o projeto, maiores serão as equipes, pois você precisa de mais pessoas para projetar, mais pessoas para desenvolver e mais pessoas para testar. Vamos chamar esse grande software de monólito por enquanto. Agora, se você conseguir dividir esse monólito em microsserviços menores, poderá se concentrar em algo menor. O ciclo de vida de desenvolvimento ainda é o mesmo, com as mesmas fases diferentes pelas quais deve passar. Mas um projeto menor itera mais rápido desde os requisitos até o desenvolvimento e a liberação para produção. Isso é bom para o tempo de lançamento no mercado. Um projeto menor também significa uma equipe menor. Na verdade, em vez de ter várias equipes localizadas em escritórios diferentes, cada uma trabalhando em sua tarefa e não se comunicando muito com as outras equipes, você pode ter uma única trabalhando em estreita colaboração.

Os microsserviços vão obrigar você a ser mais ágil, aos demais usuários, aos desenvolvedores, à equipe operacional, à equipe de QA, todos juntos trabalhando no mesmo produto. Mas é claro, se você subdividiu um aplicativo em partes menores, isso significa que você acabará com vários projetos vivendo em paralelo. Por serem pequenos, todos se beneficiarão por terem equipes pequenas, ciclo de vida de desenvolvimento mais rápido e chegarem à produção no prazo. Cada microsserviço vive de forma independente, mas todos dependem uns dos outros. Ser pequeno em termos de funcionalidades de negócio significa que você precisa interagir com outros microsserviços, para que todos juntos possam realizar as tarefas da sua aplicação. Todos eles são implantados em produção em seu próprio ritmo, on-premise, na nuvem, convivendo lado a lado com outros microsserviços.

## microsserviço Patterns

Sugestões de curso:

Microservice Architecture by Rag Dhiman

Modern Software Architecture by Dino Esposito
