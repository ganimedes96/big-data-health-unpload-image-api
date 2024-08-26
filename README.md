<h1 align='center'>API de Gerenciamento de Imagens</h1>
<p>Esta API permite a criação de contas de usuário, autenticação, upload de imagens para o Cloudinary, recuperação de imagens registradas e exclusão de imagens.</p>

## 🚀 Technologies

Tecnologias utilizadas no projeto

- NestJs
- Vitest
- TypeScript
- Zod
- Eslint
- Prisma
- Swc

  # 💻 Getting started

### Requirements

**Clone o projeto**

```bash
$ git clone https://github.com/ganimedes96/big-data-health-unpload-image-api && cd CoffeeDelivery
```

**Siga as etapas abaixo para instalar as dependências necessárias**

```bash

Criar o .env na raiz da aplicacao


Só copiar e colar tudo no terminal (estou usando linux Pop OS!)
ele cria a chave e já coloca no .env sem apagar o conteudo.

# Gerar a chave privada
openssl genpkey -algorithm RSA -out private.key -pkeyopt rsa_keygen_bits:2048

# Gerar a chave pública
openssl rsa -pubout -in private.key -out public.key -outform PEM

# Converter a chave privada para base64
JWT_PRIVATE_KEY=$(openssl base64 -in private.key -A)

# Converter a chave pública para base64
JWT_PUBLIC_KEY=$(openssl base64 -in public.key -A)

# Adicionar as chaves ao arquivo .env
echo "JWT_PRIVATE_KEY=\"$JWT_PRIVATE_KEY\"" >> .env
echo "JWT_PUBLIC_KEY=\"$JWT_PUBLIC_KEY\"" >> .env

# Remover os arquivos de chave
rm private.key public.key

# Adicionar a DATABASE_URL do POSTGRES

DATABASE_URL="postgresql://postgres:docker@localhost:5432/big_data_health_db?schema=public"


Subir o CONTAINER DO DOCKER
$ docker compose up -d

Rodar as migrates do PRISMA
$ npx prisma migrate dev 

# Install the dependencies
$ pnpm install

```

## Endpoints

### 1. Criação de Conta

**Endpoint:** `/accounts`  
**Método:** `POST`  
**Descrição:** Cria uma nova conta de usuário.

**Corpo da Requisição:**
```json
{
  "name": "string",
  "email": "string"
  "password": "string"
}
```

### 2. Autenticação do usuario

**Endpoint:** `/sessions`  
**Método:** `POST`  
**Descrição:** Autenticação do usuario.

**Corpo da Requisição:**
```json
{
  "email": "string"
  "password": "string"
}
```
**Corpo da Resposta:**
```json
{
  "accessToken": "string"
  
}
```


### 3. Fazer unpload da imagem

**Authorization: Bearer <jwt_token>**

**Endpoint:** `/images`  
**Método:** `POST`  
**Descrição:** Salvar a imagem no cloudnary e a url da imagem no banco de dados.

**Corpo da Resposta:**
```json
  STATUSCODE: 201
```

### 4. Listar Imagens

**Authorization: Bearer <jwt_token>**

**Endpoint:** `/images`  
**Método:** `GET`  
**Descrição:** Listagem de imagens paseado no ID do usuario 

**Corpo da Resposta:**
```json
  {
  "images": [
    {
      "id": "00aeea0a-41d3-46bb-8571-0cec03065241",
      "url": "http://res.cloudinary.com/dyd5chidz/image/upload/v1724630336/images/gstqq1huoxssloaypaxr.png",
      "publicId": "images/gstqq1huoxssloaypaxr",
      "assetId": "81aec9787f42d6606dc740355bc2b5eb",
      "displayName": "gstqq1huoxssloaypaxr",
      "accountId": "9113a159-cf29-409c-8a54-1a68ea3c711a",
      "createdAt": "2024-08-25T23:58:56.683Z",
      "updatedAt": null
    }
  ]
}
```

### 5. Listar Imagens

**Authorization: Bearer <jwt_token>**

**Endpoint:** `/delete/:assetId`  
**Método:** `DELETE`  
**Descrição:** Deletar uma imagem pelo asset_id 

**Corpo da Resposta:**
```json
  STATUSCODE: 204
 
```

