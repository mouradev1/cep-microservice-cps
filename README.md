
# cep-microservice-cps


API de consulta de CEPs com cache, registro de requisições por IP e integração com MongoDB, Redis, ViaCEP e BrasilAPI.

Você pode testar a API em produção pelo endpoint público:
**https://cep.mrmoura.com.br/**

* curl exemplo:
    ```sh
    curl https://cep.mrmoura.com.br/cep/01001000
    ```

## Funcionalidades
- Consulta de CEPs usando ViaCEP e BrasilAPI
- Cache de resultados e de CEPs não encontrados (Redis)
- Registro de requisições por IP (MongoDB)
- Pronto para deploy com Docker Compose

## Como rodar com Docker Compose

1. Copie `.env.example` para `.env` e ajuste as variáveis conforme necessário.
2. Copie `.env.mongo` para configurar o MongoDB.
3. Execute:
	 ```sh
	 docker compose up --build
	 ```
4. Acesse a API em `http://localhost:3000` ou `http://localhost:3001`.

## Variáveis de ambiente

**.env**
```
PORT=3000
MONGO_URI=mongodb://root:teste@mongo:27017/cepdb?authSource=admin
REDIS_URL=redis://localhost:6379
REDIS_USER=
REDIS_PASS=
```

**.env.mongo**
```
MONGO_INITDB_ROOT_USERNAME=root
MONGO_INITDB_ROOT_PASSWORD=teste
MONGO_INITDB_DATABASE=cepdb
```

## Endpoints

- `GET /cep/:cep` — Consulta um CEP (ex: `/cep/01001000`)
	- Retorna dados do CEP ou `{ error: "CEP não encontrado" }`


## Referências
- [ViaCEP](https://viacep.com.br/)
- [BrasilAPI - CEP](https://brasilapi.com.br/docs#tag/CEP)
- [MongoDB Docker](https://hub.docker.com/_/mongo)
- [Node.js Docker](https://hub.docker.com/_/node)


