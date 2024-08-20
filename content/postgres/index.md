---
layout: internal
---

# PostgreSQL (Table of Contents)

É um banco de dados relacional que possui todos os requisitos de um banco de dados transacional e é totalmente compatível com as propriedades ACID (Atomicidade, Consistência, Isolamento e Durabilidade). O programa que roda o servidor do banco de dados chama-se postgres.

## Terminologia do PostgreSQL

Termo da indústria | Termo Postgre
---- | ----
Tabela | Relação
Linha | Tupla
Coluna | Atributo
Bloco de dados | Página (quando o bloco está no disco)
Página | Buffer (quando o bloco está na memória)

## Como instalar o PostgreSQL no Ubuntu

`sudo apt install postgresql postgresql-contrib`

para ver a versão do postgres

`psql --version`

## Como iniciar o serviço do PostgreSQL

Há três comandos que você precisará saber quando o PostgreSQL estiver instalado:

Descrição cmd básicos | Comando
--- | ---
verificar o status | `sudo service postgresql status`
iniciar a execução | `sudo service postgresql start`
interromper a execução | `sudo service postgresql stop`
entrar no prompt do postgres | `sudo -u postgres psql postgres`
outra variação | `sudo -i -u postgres` seguido de `psql`

Opções do sudo:

* -i, --login - executa um shell de login como usuário alvo; um comando também pode ser especificado
* -u, --user=user - executa um comando (ou edita um arquivo) como o nome ou ID do usuário especificado

## Trocar a senha do usuário padrão

`\password postgres` | Para trocar a senha do usuário padrão. Exemplo de senha: post1234gres

## Instalar o pacote AdminPack

Um pacote que traz várias ferramentas para administração do banco de dados. No prompt do postgres, digite o comando:

`CREATE EXTENSION adminpack;`

## Manutenção de Usuários

Para criar um novo usuário, **no prompt do Linux**, digite o comando:

`sudo -i -u postgres`

`createuser -dRP jeann`

Opções:

* -d, --createdb            role can create new databases
* -D, --no-createdb         role cannot create databases (default)
* -P, --pwprompt            assign a password to new role
* -r, --createrole          role can create new roles
* -R, --no-createrole       role cannot create roles (default)

Para apagar:

`dropuser jeann`

## Manutenção de Banco de Dados

Para criar um novo banco de dados:

`sudo -i -u postgres`

`createdb -O jeann dbTeste`

Nota: Todos estes comandos podem ser executados com o usuário Linux postgres. Este usuário além de ser usuário Linux também é o admin do Postgres. Dessa forma vc pode trocar de usuário primeiro (sudo -i -u postgres), em seguida rodar os comandos sem precisar do "sudo -u postgres" antes de cada comando.

Para entrar no banco com o novo usuário digite:

`psql database_name`

Para excluir um banco de dados:

`dropdb database_name`

## Comandos básicos do psql

dentro do prompt do postgres os comandos parecem sempre começar com "\", por exemplo:

Comando | Descrição
--- | ---
`\q` | Para voltar ao terminal
`\conninfo` | mostra informações sobre a conexão sendo usada no momento. Ex: You are connected to database "postgres" as user "postgres" via socket in "/var/run/postgresql" at port "5432".
`\l` | lista os banco que existem no postgres
`Ctrl + l` | limpa a tela do terminal
`\h` | lista os comandos que podem ser executados
`\du` | listar os usuários do banco, inicialmente deve existir apenas o postgres
`\c` | troca o banco de dados acessado, ex: \c template1 --> You are now connected to database "template1" as user "postgres".
`\d` | lista as tabelas (relações) que existem no banco de dados atual
`\dS` | lista as tabelas de sistema
`\! comando` | executa um comando no shell sem sair do psql.
`show hba_file;` | (este comando é executado sem a \ e é executado de dentro do postgres) vai exibir o caminho no disco onde o arquivo de configuração pode ser encontrado. Ex: /etc/postgresql/12/main/pg_hba.conf

sudo nano /etc/postgresql/12/main/pg_hba.conf

Uma vez alterado o arquivo, é preciso reiniciar o serviço do postgresql

Para saber o nome do serviço, liste todos com o comando

systemctl list-units --type=service

para reiniciar: sudo systemctl restart postgresql-14
