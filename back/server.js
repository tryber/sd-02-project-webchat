require('dotenv').config();
const express = require('express');
const messagesController = require('./controllers/messagesController');
const usersController = require('./controllers/usersController');
const { insertMessage } = require('./models/messagesModel');
const { newOnlineUser, deleteUser } = require('./models/usersModel');
const socketServer = require('http').createServer();
const io = require('socket.io')(socketServer);

const app = express();

const usersConnected = [];

const cors = require('cors');

const SOCKET = process.env.SOCKET;
const BACKPORT = process.env.BACKPORT;

app.use(cors({ allowedHeaders: '*' }));
app.use(express.json());

app.use('/messages', messagesController.router);
app.use('/onlineUsers', usersController.router);

io.on('connection', (socket) => {
  socket.on('nickSocketId', async ({ nickname }) => {
    socket.user = nickname;
    console.log(socket.user, 'connected');
    socket.broadcast.emit('serverResponse', {
      nick: nickname, time: Date(), message: 'Conectou-se',
    });
    await newOnlineUser({ nickname, id: socket.id })
    usersConnected.push({ nickname, id: socket.id });
  });

  socket.on('message', async (message) => {
    await insertMessage(message);
    io.emit('serverResponse', message);
  });

  socket.on('disconnect', async () => {
    const indexUser = usersConnected.indexOf({ nickname: socket.user, id: socket.id });
    usersConnected.splice(indexUser);
    await deleteUser(socket.id);
    console.log(`${socket.id} desconectado.`);
  });
});

app.listen(BACKPORT);
console.log(`Listen on ${BACKPORT}`);

socketServer.listen(SOCKET);
console.log(`Socket on ${SOCKET}`);
