require('dotenv').config();
const express = require('express');
const messagesController = require('./controllers/messagesController');
const { insertMessage } = require('./models/messagesModel');

const app = express();

const socketServer = require('http').createServer();
const io = require('socket.io')(socketServer);

const bodyParser = require('body-parser');
const cors = require('cors');

const SOCKET = process.env.SOCKET;
const BACKPORT = process.env.BACKPORT;

app.use(cors({ allowedHeaders: '*' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/messages', messagesController.router);

io.on('connection', (socket) => {

  console.log(`${socket.id} conectado`);

  socket.on('message', async (message) => {
    await insertMessage(message);
    io.emit('serverResponse', {
      ...message,
    });
  });

  socket.on('disconnect', () => {
    console.log(`${socket.id} desconectado.`)
  });
});


app.listen(BACKPORT);
console.log(`Listen on ${BACKPORT}`)

socketServer.listen(SOCKET);
console.log(`Socket on ${SOCKET}`);
