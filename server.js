require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const socketServer = require('http').createServer();
const io = require('socket.io')(socketServer);
const { join } = require('path');
const messagesController = require('./controllers/messagesController');

const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', express.static(join(__dirname, 'public')));

app.get('/messages', messagesController.getAllMessages);
app.post('/messages', messagesController.createMessage);
app.post('/name', messagesController.createName);

io.on('connection', (socket) => {
  socket.on('historico', (info) => {
    const { mensagensDB } = info;
    mensagensDB.forEach(({ name, messages }) => socket
      .emit(
        'historico',
        `${new Date(messages.postedAt).toLocaleString()} - ${name}: ${messages.content}`,
      ));
    const horarioLocale = new Date().toLocaleString();
    io.emit('novoUsuario', `${horarioLocale} - Bem vindo(a) ${info.nomeUsuario}`);
  });

  socket.on('mensagemChat', ({ nomeUsuario, mensagemEnviada }) => {
    const horarioLocale = new Date().toLocaleString();
    io.emit('mensagemChat', `${horarioLocale} - ${nomeUsuario}: ${mensagemEnviada}`);
  });
});

const PORT_EXPRESS = process.env.PORT_EXPRESS || 3000;
app.listen(PORT_EXPRESS, () =>
  console.log(`Express escutando na porta ${PORT_EXPRESS}`));

const PORT_SOCKET_IO = process.env.PORT_SOCKET_IO || 3005;
socketServer.listen(PORT_SOCKET_IO, () =>
  console.log(`Socket.IO escutando na porta ${PORT_SOCKET_IO}`));
