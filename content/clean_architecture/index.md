---
layout: internal
---

# Clean Architecture

## Introdução

### Arquitetura ou Design?

A palavra "arquitetura" é frequentemente usada no contexto de algo mais alto nível, dissociado dos detalhes práticos, enquanto "design" parece implicar estruturas e decisões em um nível mais básico. Mas esse uso é não faz muito sentido quando se observa o trabalho de um arquiteto de verdade.

Na construção de um software os detalhes de baixo nível e a estrutura de alto nível fazem parte de um mesmo todo. Eles formam um tecido contínuo que define a forma do sistema. Não se pode ter um sem o outro; na verdade, não há uma linha divisória clara que os separe. Existe simplesmente um contínuo de decisões, do nível mais alto ao mais baixo.

O objetivo da Arquitetura de Software é minimizar os recursos humanos necessários para construir e manter um sistema.

Para construir um sistema com um design e uma arquitetura que minimize esforços e maximize produtividade, você precisa saber quais atributos da arquitetura de sistemas levam a este fim.

### Valores do software

Todo sistema de software fornece dois valores diferentes aos seus stakeholder:

* Comportamento: programadores são contratados para fazer máquinas se comportarem de forma a fazer ou economizar dinheiro para os stakeholders.
* Estrutura: o software precisa ser fácil de ser alterado. A dificuldade para se fazer uma mudança deve ser proporcional apenas ao escopo da mudança, não ao “formato” (shape) da mudança.

## Princípios de projeto (Design Principles) - SOLID

Bom software começa com Clean Code.

Entenda o Clean Code como os tijolos de construção que temos as mãos para fazer software. Se os tijolos não estão bem feitos, a arquitetura da construção não importa muito. Por outro lado, ainda podemos fazer um grande bagunça com bons tijolos. É neste ponto que entram os princípios do SOLID.

Os princípios do SOLID nos dizem como organizar nossas funções e dados em classes e como essas classes deveriam estar interconectadas.

O objetivo dos princípios é a criação de estrutura de software a nível de módulos e componentes que:

* Toleram mudanças
* São fáceis de entender
* São a base de componentes que podem ser usados em muitos sistemas de software.

### Single Responsability Principle (SRP)

Lembre-se que o SOLID se aplica a nível de módulos e componentes.

**O módulo deve ter uma, e apenas uma, razão para mudar.** Mas o que isso quer dizer?

Sistemas de software são alterados para satisfazer usuários e stakeholders. Estes são a razão para mudar a que o princípio se
refere. Podemos reescrever o princípio assim: **Um módulo deve ser responsável por um, e apenas um, ator**.

Módulo aqui é entendido como arquivo-fonte (source file)

Se uma determinada classe atende a mais de um ator, ela já está ferindo o SRP. Veja a situação abaixo e uma possível solução.

![Violação do SRP](./img/SRP.png)

## old

Fiz um resumo do livro do Robert C. Martin, mas ainda não está no formato Markdown.

PDF neste [link](docs/Meu%20entendimento%20Clean%20Architec%20-%20Jeann%20Andrade.pdf)
