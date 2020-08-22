require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { join } = require('path');
const socketServer = require('http').createServer();
const io = require('socket.io')(socketServer);
const messagesController = require('./controllers/messagesController');
const { historicoCallback, mensagemChatCallback } = require('./socketFunctions');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/', express.static(join(__dirname, 'public')));

app.get('/messages', messagesController.getAllMessages);
app.post('/messages', messagesController.createMessage);
app.post('/name', messagesController.createName);

io.on('connection', (socket) => {
  socket.on('historico', historicoCallback(socket, io));
  socket.on('mensagemChat', mensagemChatCallback(io));
});

const PORT_EXPRESS = process.env.PORT_EXPRESS || 3000;
const PORT_SOCKET_IO = process.env.PORT_SOCKET_IO || 3005;

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT_EXPRESS, () => console.log(`Express na porta ${PORT_EXPRESS}`));
  socketServer.listen(PORT_SOCKET_IO, () => console.log(`Socket.IO na porta ${PORT_SOCKET_IO}`));
}
