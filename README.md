# Back end do sistema agenda

## Requisitos minimos para executar

- Ter instalado o npm
- Ter instalado o POSTGRES e criar uma base de dados chamada pj_pessoas

## Passo a Passo para execução correta

1. clona o projeto
1. Abrir a pasta do projeto em um terminal e executar o comando npm install ou npm i
1. Abrir o arquivo ormconfig.json e alterar as informações de acesso a base de dados com as informações do seu postgres
1. Depois criar a base de dados pj_pessoas
1. Agora executa o comando npm typeorm migration:run
