---
layout: internal
---

# MongoDB

Fontes:

* Anotações do curso: MongoDB do básico ao avançado (c/ Mongoose e projetos), do Matheus Battisti na Udemy
* Página do MongoDB no [Docker Hub](https://hub.docker.com/r/mongodb/mongodb-community-server)

## Relacional vs Não relacional

* Os bancos relacionais demandam uma forte configuração de tabelas, colunas e relações entre tabelas para o seu funcionamento;
* Os não relacionais não são rigorosos quanto a isso, podemos criar colunas quando um dado é inserido;
* Essa característica gera flexibilidade para o não relacional e também poder ser sinônimo de desorganização;
* Apesar do nome, o não relacional pode ter relações entre collections.

## Instalando o MongoDB

A melhor maneira de se usar o MongoDB é através do Docker. Neste [endereço](https://www.mongodb.com/compatibility/docker) tem as instruções necessárias para subir um container com o MongoDB. A seguir fiz o meu resumo da parte que me interessa.

Vamos criar um container docker a partir de uma imagem do MongoDB versão *6.0-ubi8*. A ideia é acessar esse Mongo através do Compass no endereço mongodb://user:pass@localhost:27017, sendo que para isso publiquei a porta 27017, criei um volume para persistência dos dados e também estou usando variáveis de ambiente para inicializar o MongoDB com o usuário root.

Criando um volume:

`docker volume create mongodb-vol`

Cria uma variável para setar a tag do mongo que irá rodar:

`export MONGODB_VERSION=6.0-ubi8`

Executa o container:

`docker run --name mongodb -d -p 27017:27017 -v mongodb-vol:/data/db -e MONGO_INITDB_ROOT_USERNAME=user -e MONGO_INITDB_ROOT_PASSWORD=pass mongodb/mongodb-community-server:$MONGODB_VERSION`

## Escolhendo os Drivers para diferentes linguagens

Acesse a [página oficial do mongo](https://www.mongodb.com/docs/drivers/) para ter acesso ao driver e instruções de como utilizá-lo.

## Instalando o Compass

Primeiro baixe o pacote do compass [veja aqui a última versão](https://www.mongodb.com/docs/compass/current/install/)

`wget https://downloads.mongodb.com/compass/mongodb-compass_1.40.4_amd64.deb`

Em seguida instale o pacote baixado

`sudo dpkg -i mongodb-compass_1.40.4_amd64.deb`

## Comandos DDL

`db`
: Para listar o banco atual

`show dbs`
: Para listar os bancos de dados

`use nome-banco`
: Para criar um banco ou trocar de banco de dados

`db.dropDatabase()`
: Para remover um banco com todas as suas collections

`db.getCollectionInfos()`
: Para obter informações sobre as coleções presentes no banco

`db.getCollectionNames()`
: Para retornar um array com os nomes das *collections*

`show collections`
: Vai listar as collections do banco atual

`db.createCollection("nome_collection")`
: Para criar uma collection em um banco de forma explícita

`db.nome_collection`
: Para criar (de forma implícita) ou acessar uma collection

`db.nome_collection.drop()`
: Para remover uma collection junto com os seus dados

O exemplo abaixo cria um banco, uma coleção e insere um document dentro. Em seguida pede para listar todos os documents da coleção.

```
use novoBanco
db.novaColecao.insertOne({nome: "Jeann"})
db.novaColecao.find()
```

`mongoimport <arquivo> -d <database> -c <collection>`
: Para importar um banco no formato json

`mongoexport -c <collection> -d <database> -o <output>`
: Para exportar um banco de dados

`mongodump -d <banco> -o <output_directory>`
: Para exportar um banco com mais de uma collection. Será exportado um arquivo para cada collection, por isso é preciso informar uma pasta para os arquivos da exportação.

`mongorestore <input_directory>`
: Para importar a estrutura de arquivos presente na pasta de entrada

Exercício completo de criação de banco, backup, exclusão e restauração:

```
use novoBanco
db.novaColecao.insertOne({nome: "Jeann", idade: 40})
db.novaColecao.find()
mongodump -d novoBanco -o novobancodir
db.dropDatabase()
mongorestore novobancodir
```

`mongostat`
: Comando para monitoramento do mongo. É possível ver, por segundo,  quantas consultas estão rodando, use de rede, memória etc.
: É precisa rodar no shell e não conectado a um banco através do *use*.

## Comandos DML

`db.nome_collection.find()`
: Vai listar todos os documents da coleção
: Pode ser aplicado um filtro db.books.find({pageCount: 342})

`db.nome_collection.findOne()`
: Se a consulta resultar em um registro, retorna o documento, senão retorna null. No find o cursor sempre irá retornar e nunca será nulo.

`db.collection.insertOne({dado})`
: Utilizado para inserir um documento
: exemplo db.collection.insertOne({ nome: "João", idade: 22 , hobbies: ["Jogar", "Programar"]})
: O id do document pode ser fornecido no método de inserção, da seguinte forma: db.collection.insertOne({_id: "meu_id", nome: "abc"})

`db.collection.insertMany([{conteudo},{conteudo},{conteudo}])`
: Para inserir mais de um document de uma vez

`db.mercado.insertMany([{},{},{}],{w: "majority", wtimeout: 200})`
: Write Concern é uma configuração que pode ser adicionada ao insertMany

`db.books.updateOne({_id:314}, {$set: {pageCount: 1000}})`
: O comando terá sucesso se atualizar apenas um documento. O primeiro parâmetro é a condição e o seguinte o que será atualizado. Note que você especifica qual parte do documento será atualizado usando o operador $set.

`db.books.updateMany({pageCount: {$gt: 500}},{$set: {bestseller: true}})`
: Usado para atualizar mais de um documento ao mesmo tempo
: Importante observar que o operador *set* irá criar o atributo caso o mesmo não exista no documento.
: se o *document* de filtro estiver vazio *{}*, vai atualizar todo o banco de dados.

`db.books.updateMany({pageCount: {$gt: 500}, categories: "Java"},{$push: {categories: "Many Pages"}})`
: O operador push serve para adicionar um item a um array
: Note que se tentarmos atualizar um array diretamente com o operador *set* ele será substituído.

`db.books.replaceOne({_id: 120},{foi: "substituido"})`
: Vai trocar todo o conteúdo do documento por outro (replace)

`db.books.deleteOne({_id:314})`
: Remove um documento da coleção

`db.books.deleteMany({categories: "Java"})`
: Remove mais de um registro conforme o filtro
: deleteMany com o filtro vazia vai deixar a collection vazia

## Tipo de dados

Verificando o tipo de dado com typeof
: const matheus = db.strings.findOne({nome: "Matheus"})
: typeof matheus.nome (string)
: typeof matheus (object)

`db.datas.insertOne({nome: "Matheus", created_at: new Date()})`
: Cria uma data no formato ISO

`db.documents.insertOne({nome: "jeann", desc: { profissao: "dev", hobbies: ["Estudar", "Ler", "Caminhar"]}})`
: Cria um registro com um *document* dentro

`db.collections.insertOne({nome: "joao", esta_trabalhando: false})`
: Cria um atributo boolean no documento

`db.number.insertOne({double: 12.2, outro_double: 50, inteiro: NumberInt("5")})`
: No mongo todos os números são classificados como double
: Caso queira forçar o inteiro, use o NumberInt

## Operadores

Operadores mais usados
: Operador *eq* e *ne*: db.books.find({nome: { $eq: "Pedro" }})
: Operador *in*: db.books.find({categories: { $in: ["Java", "C#"]}})
: Operador *gt* e *gte*: db.books.find({pageCount: { $gt: 342 }})
: Operador *lt* e *lte*: db.books.find({pageCount: { $lt: 90 }})
: Operador *or*: db.books.find({ $or: [{pageCount: {$lt:90}, _id: {$lt: 5 }}]})
: Múltiplas condições: db.books.find({ pageCount: 592 , _id: 6}). Equivale ao operador *and*.
: Combinando *and* e *or*: db.books.find({ status: "Publish ", $or: [{pageCount: {$lt:90},_id: {$lt: 5 }}]})
: Operador *exists*: db.restaurants.find({bad_restaurant: {$exists: true}})
: Operador *text*: db.restaurants.find({$text: {$search: "pizza"}}). É preciso criar um indice encima do campo que será usado para busca com o comando db.restaurants.createIndex({name: "text"})

## Arrays

Trabalhando com arrays
: Para pesquisar dentro de um array: db.col.find({notas : 8})
: Para pesquisar exatamente pelo array: db.col.find({notas: [8, 4, 5]})
: Para pesquisar em array de documentos: db.col.find({notas : {cor: "verde", tamanho: "G", qtd: 48}})
: Operador *all*: Para pesquisar parcial pelo array: db.col.find({notas: {$all: [4, 8]}})
: Operador *size*: Para pesquisar pelo tamanho do array: db.col.find({notas: {$size: 4}})

## Funções

Funções mais usadas
: Função count: db.books.find({pageCount: { $lt: 90 }}).count()
: Função pretty: Podemos usar *.pretty()* para formatar a saída

## Relacionamentos

No mongoDb não existe o conceito de tabela, o que se guarda são *documents* dentro de *collections*. Cada documento tem um tamanho máximo de 16Mb.

Existem os seguintes tipos de relacionamento entre Collections

* Subdocuments
* One to One
* One to Many
* Many to Many

### Embedded Documents ou subdocumentos

São documentos adicionados dentro de outro documento. Este relacionamento funciona bem com *One to One* e *One to Many*.

Um exemplo de *One to One*:

db.embedded.insertOne({
    nome: "João",
    idade: 45,
    endereco: {
        rua : "Rua das flores",
        numero: 10,
        Complemento: "casa"
    }
})

Um find fica assim:

db.embedded.find({"endereco.casa.numero" : 10})

Um exemplo de *One to Many*:

db.embedded.insertOne({
    nome: "João",
    idade: 45,
    endereco: {
        casa: {
            rua : "Rua das flores",
            numero: 10,
            Complemento: "casa"
        },
        trabalho: {
            rua : "Rua das árvores",
            numero: 105,
            Complemento: "Galpão"
        }
    }
})

### One to One

A ideia é associar um documento de uma coleção com um documento de outra coleção.

![One to One Relationship](./img/one_to_one.png)

db.pessoas.insertOne({nome: "Jose"})

const jose = db.pessoas.findOne()

db.enderecos.insertOne({rua: "Rua das flores", numero: 455, complemento: "casa", pessoa_id: jose._id})

db.enderecos.find()

```js
{
  _id: ObjectId("656c7793cec781ff54a67afd"),
  rua: 'Rua das flores',
  numero: 455,
  complemento: 'casa',
  pessoa_id: ObjectId("656c7677cec781ff54a67afb")
}
```

### One to Many

A ideia é associar um documento de uma coleção com um ou mais documentos de outra coleção.

![One to Many Relationship](./img/one_to_many.jpg)

db.pessoas.insertMany([{nome: "Gustavo"}, {nome: "Marina"}])

const gustavo = db.pessoas.findOne({nome: "Gustavo"})

const marina = db.pessoas.findOne({nome: "Marina"})

db.compras.insertMany([{produtos:["Liquidificador", "Torneira"], pessoa_id: gustavo._id},{produtos:["prego","martelo"], pessoa_id: gustavo._id}])

db.compras.insertMany([{produtos:["Alicate", "Pá"], pessoa_id: marina._id},{produtos:["parafuso","chave allen"], pessoa_id: marina._id}])

db.compras.find({pessoa_id: marina._id})

### Many to Many

A ideia é associar um documento de uma coleção com um ou mais documentos de outra coleção, e vice-versa, mantendo um collection de relação entre eles.

![Many to Many Relationship](./img/many_to_many.png)

db.pessoas.insertMany([{nome: "Jomar"}, {nome: "Rafael"}])

const jomar = db.pessoas.findOne({nome: "Jomar"})

const rafael = db.pessoas.findOne({nome: "Rafael"})

db.cursos.insertMany([{nome: "PHP"}, {nome: "Go"}])

const php = db.cursos.findOne({nome: "PHP"})

const go = db.cursos.findOne({nome: "Go"})

db.curso_pessoa.insertMany([
{curso_id: php._id, pessoa_id: jomar._id},
{curso_id: php._id, pessoa_id: rafael._id},
{curso_id: go._id, pessoa_id: jomar._id}])

const idsAlunos = [];

db.curso_pessoa.find({curso_id: php._id})
    .forEach(function(aluno){
        idsAlunos.push(aluno.pessoa_id);
});

db.pessoas.find( { _id: { $in : idsAlunos }})

operador $inc
O operador $inc pode acrescentar ou diminuir uma quantidade especificada a um valor
db.blog.updateOne({author: "Matheus Battisti"}, {$inc: {postCount: 2}})

operador $min
O operador $min atualiza um valor, caso o especificado do operador seja menor que o do registro
db.blog.updateOne({author: "Maicon Santos"}, {$min: {postCount: 0, likesReceived: 0}})

operador $max
O operador $max atualiza um valor, caso o especificado do operador seja maior que o do registro
db.blog.updateOne({author: "Maicon Santos"}, {$max: {postCount: 250}})

operador $mul
O operador $mul multiplica o valor de um campo pelo especificado
db.blog.updateOne({author: "Maicon Santos"}, {$mul: {postCount: 2}})

operador $rename
O operador $rename renomeia um campo, por outro nome que definimos
db.blog.updateMany({}, {$rename: { author: "author_fullname"}})

operador $unset
tem como objetivo remover um campo de um item
db.blog.updateMany({},{$unset:{active: ""}})

operador $addToSet
adiciona um ou mais valores em arrays, apenas se eles já não estiverem lá, ou seja, não dulica elementos
db.blog.updateOne({author: "Matheus"},{$addToSet: {categories: {$each: ["PHP","Vue"]}}})

operador $pop
remove o último ou o primeiro elemento de um array
para remover o primeiro utilize -1, para remover o ultimo utilize 1
db.blog.updateOne({author: "Matheus"}, {$pop: {categories: -1}})

Operador $push
adiciona um ou mais valores a um array, mas duplica os valores caso já existam
db.blog.updateOne({author: "Matheus"}, {$push: {categories: "Linux"}})

Operador $pullAll
para remover vários itens de um array utilizando o $pullAll
db.blog.updateOne({author: "Matheus"}, {$pullAll: {categories: ["Linux", "Docker"]}})

Criação de indices
db.inspections.createIndex({certificate_number: 1})

Criação de indices em embedded documents
db.inspections.createIndex({"address.city": 1})

Verificando indices de uma collection
db.inspections.getIndexes()

Para remover um indice
db.inspections.dropIndex({certificate_number: 1})

Para remover todos os indice
db.inspections.dropIndexes()

Agregadores
$bucket
use bookCollection
db.books.aggregate([
{
 $bucket: {
  groupBy: "$pageCount",
  boundaries: [100,200,300,400,500,600,700],
  default: "OTHERS",
  output: {
   "count": {$sum:1}
  }
 }
}
])

using MongoDB.Bson;
using MongoDB.Driver;

new BsonArray
{
    new BsonDocument("$match",
    new BsonDocument("authors", "Gavin King")),
    new BsonDocument("$sort",
    new BsonDocument("pageCount", -1)),
    new BsonDocument("$limit", 3),
    new BsonDocument("$project",
    new BsonDocument
        {
            { "title", 1 },
            { "pageCount", 1 }
        })
}
