require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();

const socketServer = require('http').createServer();
const io = require('socket.io')(socketServer);

const bodyParser = require('body-parser');
const cors = require('cors');

const SOCKET = process.env.SOCKET;
const PORT = process.env.PORT;

app.use(cors({ allowedHeaders: '*' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {

  console.log(`${socket.id} conectado`);

  socket.on('message', (message) => {
    console.log(message);
    io.emit('serverResponse', {
      message,
      clientId: socket.id,
    });
  });

  socket.on('disconnect', () => {
    console.log('desconectado.')
  });
});


app.listen(PORT);
console.log(`Listen on ${PORT}`)

socketServer.listen(SOCKET);
console.log(`Socket on ${SOCKET}`);
