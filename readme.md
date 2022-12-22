### Encurtador de URL API com Express.js

---

Nessa Aplicação é possível criar pessoas utilizadoras e cada pessoa pode enviar uma URL para ser encurtada, sendo cada uma destas armazenada em um repositório individual que pode ser consultado após login.

As rotas principais são

---

`- GET /:id`
É a rota que realiza o redirect para a URL original.

Exemplo: Supondo que você encurtou uma url para um assunto no google, basta acessar a URL encurtada gerada e a API irá realizar o redirecionamento

---

`- GET /urls`

Rota que exibe o repositório particular de URLs encurtadas de cada pessoa utilizadora.

Para isso, é necessário possuir o token de autorização obtido após login

---

`- POST /short-url`

Rota que permite encurtar as URLs, é necesssário estar "logado". Portanto, um token é requerido. A aplicação irá vincular os dados da URL ao id do usuário conectado.

Exemplo de Body:

```json
{
  "url": "https://www.google.com/search?q=naruto&oq=naruto&aqs=chrome.0.0i271j46i433i512j46i131i433i512j46i433i512j0i512l2j0i131i433j0i433i512j0i3j46i512.651j0j4&sourceid=chrome&ie=UTF-8"
}
```
---

`- POST /new-user`

Rota que permite criar um novo usuário e devolve um token.

Exemplo de body:


```json
{
  "name": "Jacob",
  "email": "new232321124@teste.com",
  "password": 1234
}
```

---

`- POST /login`

Rota que permite realizar o login na aplicação e obter o token de acesso.

Exemplo de body:

```json
{
  "email": "new23324@teste.com",
  "password": 1234
}
```

---

Para subir a aplicação e o banco de dados execute com `Docker`


```bash
    docker-compose up -d
```

Também é necessário preencher as variavéis de ambiente. Para isso, renomeie o arquivo .env-example e adicione as informações apropriadas.

Após, execute para iniciar a aplicação:

```bash
    npm start
```