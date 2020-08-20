const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const socketServer = require('http').createServer();
const io = require('socket.io')(socketServer);
const { join } = require('path');

const app = express();
app.use(cors());

app.use(bodyParser.json());

app.use('/', express.static(join(__dirname, 'public')));

io.on('connection', (socket) => {
  socket.on('historico', ({ nomeUsuario }) => {
    const array = ['hist00', 'hist01', 'hist99'];
    array.forEach((elem) => socket.emit('historico', elem));

    const horarioNumSegundos = new Date();
    const horarioLocale = horarioNumSegundos.toLocaleString();

    io.emit('novoUsuario', `${horarioLocale} - Boas vindas ${nomeUsuario}`);
  });

  socket.on('mensagemChat', ({ nomeUsuario, mensagemEnviada }) => {
    const horarioNumSegundos = new Date();
    const horarioLocale = horarioNumSegundos.toLocaleString();

    io.emit('mensagemChat', `${horarioLocale} - ${nomeUsuario}: ${mensagemEnviada}`);
  });
});

const PORT_EXPRESS = process.env.PORT_EXPRESS || 3000;
app.listen(PORT_EXPRESS, () =>
  console.log(`Express escutando na porta ${PORT_EXPRESS}`));

const PORT_SOCKET_IO = process.env.PORT_SOCKET_IO || 3005;
socketServer.listen(PORT_SOCKET_IO, () =>
  console.log(`Socket.IO escutando na porta ${PORT_SOCKET_IO}`));
