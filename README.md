# websocket-test

## Explicando
Primeiramente, entenda que este projeto é dividido em duas partes.
- client
- server

### Estrutura
/client foi desenvolvido em ReactJS, utilizando o [ViteJS](https://vitejs.dev/) como framework;

/server foi desenvolvido em NodeJS, utilizando o [Express](https://expressjs.com/) como framework;

Ambos utilizam [Socket.io](https://socket.io/) para gerenciamento do Web Socket;

## Start
Abra dois terminais.
O comando para os dois é praticamente o mesmo:

```bash
cd client
npm install
(...)
npm run dev
```

```bash
cd server
npm install
(...)
npm run dev
```

## Utilização
Client: [http://localhost:3000](http://localhost:3000)

Server: [http://localhost:3001](http://localhost:3001)

Ao inicializar os dois ambientes em paralelo nos terminais, no client digite o nome de usuário e aguarde nesta tela para o sorteio.

Abra quantas instâncias quiser, preenchendo o nome de usuário e conectando ao websocket.

Para realizar o sorteio, acesse [http://localhost:3000/admin](http://localhost:3000/admin). Nesta tela você verá quantas pessoas estão participando do sorteio e terá o botão de ação para realização do sorteio. Ao realizar, será sinalizado o vencedor na tela do admin e, via web socket será exibido nas instâncias dos participantes se o usuário venceu ou não.

