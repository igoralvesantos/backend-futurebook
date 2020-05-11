<h1 align="center">
  [Backend] FutureBook
</h1>

## Stack
Esse é um projeto de Backend inspirado em algumas funcionalidades presentes no Facebook feito utilizando NodeJS, Express, Typescript e MySQL. Além disso, ele segue uma arquitetura em camadas simples:
1. Presentation: responsável pela comunicação com agentes externos (como o Frontend)
1. Data: responsável pela comunicação direta com o banco de dados
1. Business: responsável pela lógica de negócio
Por fim, ressalta-se que a comunicação da camada `Data` e a `Business` é feita através de interfaces denominadas `Gateway`, para possibilitar os testes unitários desta última camada (inversão de dependências)
## Sobre
Esse foi um projeto de Backend que utilizei para treinar os casos básicos de CRUD de uma API: Create, Read, Update e Delete. Para isso, utilizei um tema de redes sociais: login/signup/fazer amizade/desfazer amizade/criar post/feed/like e dislike de post. Além disso, pratiquei o feed reverso, aproveitei para ver conceitos sobre buscas por termos utilizando um banco relacional e práticar o deploy em uma infraestrutura real, no caso no Heroku.
## Documentação
- Postman - https://documenter.getpostman.com/view/9731716/Szmh1vzU
## Deploy
- Heroku - https://futurebook-api.herokuapp.com
## Instruções para rodar
Pré-requisitos:  
Possuir um arquivo `.env` na raiz do projeto com as informações do banco de dados e com a chave secreta do jwt.    
```
HOST=<Nome do host do banco>
USER=<Nome do usuário do banco>
PASS=<Senha do seu banco>
DB=<Nome do seu banco>
JWT_KEY=<Sua chave secreta do JWT>
```

As instruções são:
1. `npm install` para instalar todas as dependências
1. `npm run start` para rodar localmente o projeto
1. `npm run build` para gerar uma versão possível de ser deployada com os arquivos transpilados para Javascript
## Contato  
[<img src="https://avatars2.githubusercontent.com/u/55074758?s=460&u=dceeb9d0aad05e49216632d0e956fff23ac8d70f&v=4" width=115 > <br>  Igor Alves ](https://github.com/igoralvesantos) |
| :---: |  
| [Email](mailto:igoralvesantos@gmail.com)  |
| [Linkedin](https://www.linkedin.com/in/igor-alves-santos/)   | 