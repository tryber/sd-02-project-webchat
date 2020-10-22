require('dotenv').config();
const express = require('express');
const messagesController = require('./controllers/messagesController');
const usersController = require('./controllers/usersController');
const { insertMessage, createPrivateChat, findPrivateChat, updateMessagePrivate } = require('./models/messagesModel');
const { newOnlineUser, deleteUser } = require('./models/usersModel');
const socketServer = require('http').createServer();
const io = require('socket.io')(socketServer);

const app = express();

const usersConnected = [];

const cors = require('cors');
const { setMaxListeners } = require('process');

const SOCKET = process.env.SOCKET;
const BACKPORT = process.env.BACKPORT;

app.use(cors({ allowedHeaders: '*' }));
app.use(express.json());

app.use('/messages', messagesController.router);
app.use('/onlineUsers', usersController.router);

io.on('connection', (socket) => {
  socket.on('nickSocketId', async ({ nickname }) => {
    socket.user = nickname;
    console.log(socket.user, 'conectado.');
    socket.broadcast.emit('serverResponse', {
      nick: nickname, time: Date(), message: 'Conectou-se',
    });
    await newOnlineUser({ nickname, id: socket.id })
    usersConnected.push({ nickname, id: socket.id });
    io.emit('userOnline', { nickname, id: socket.id });
  });

  socket.on('message', async (message) => {
    await insertMessage(message);
    io.emit('serverResponse', message);
  });

  socket.on('privateHistory', async ({ sendUser, receiveUser }) => {
    const messages = await findPrivateChat(sendUser, receiveUser);
    if (!messages) return null;
    io.to(socket.id).emit('startPrivate', messages);
  });

  socket.on('privateMessage', async ({ sendUser, receiveUser, message }) => {
    const { nickname } = usersConnected.find(({ id }) => id === receiveUser);
    const searchChat = async () => findPrivateChat(sendUser, nickname);
    const firstSearch = await searchChat();
    if (!firstSearch) {
      await createPrivateChat({ sendUser, receiveUser: nickname, message });
    } else {
      await updateMessagePrivate({ sendUser, receiveUser: nickname, message });
    }
    const updatedData = await searchChat();
    io.to(receiveUser).to(socket.id).emit('receivePrivateMessage', updatedData);
  });

  socket.on('disconnect', async () => {
    io.emit('userOff', { nickname: socket.user, id: socket.id });
    const indexUser = usersConnected.indexOf({ nickname: socket.user, id: socket.id });
    usersConnected.splice(indexUser);
    await deleteUser(socket.id);
    socket.broadcast.emit('serverResponse', {
      nick: socket.user, time: Date(), message: 'Desconectou-se',
    });
    console.log(`${socket.user} desconectado.`);
  });
});

app.listen(BACKPORT);
console.log(`Listen on ${BACKPORT}`);

socketServer.listen(SOCKET);
console.log(`Socket on ${SOCKET}`);
