const express = require('express');
const bodyParser = require('body-parser');

const socketServer = require('http').createServer();
const io = require('socket.io')(socketServer);

const app = express();

app.use(bodyParser.json());

const PORT_EXPRESS = process.env.PORT_EXPRESS || 3000;
app.listen(PORT_EXPRESS, () =>
  console.log(`Express escutando na porta ${PORT_EXPRESS}`));

const PORT_SOCKET_IO = process.env.PORT_SOCKET_IO || 3005;
socketServer.listen(PORT_SOCKET_IO, () =>
  console.log(`Socket.IO escutando na porta ${PORT_SOCKET_IO}`));
