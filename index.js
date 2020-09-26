/* eslint-disable no-param-reassign */
const express = require('express');
const { join } = require('path');

const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const {
  saveHistory,
  savedHistory,
  savedMessageByDate,
  saveUsers,
  onlineUsers,
  findAndDelete,
  savePrivateHistory,
  savedPrivateHistory,
  savedPrivateMessages,
  existPrivateChat,
  updatePrivateHistory } = require('./models/ChatModel');

const PORT = process.env.PORT || 3000;

const usersOnline = [];

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/public/index.html`);
});

io.on('connection', (socket) => {
  socket.on('loginUser', async ({ user, newEmit }) => {
    socket.user = user;
    const socketId = socket.id;
    usersOnline.push({ user, socket: socketId });
    await saveUsers(user, socketId);
    const modelAnswer = await onlineUsers();
    await io.emit('onlineList', { users: modelAnswer });
    const historyMessages = await savedHistory();
    historyMessages.forEach(({ user: userHistory, message, date }) => {
      socket.emit('history', { modelAnswer: { userHistory, message, date } });
    });
    if (newEmit) {
      await socket.broadcast.emit('loggedUser', `${socket.user} acabou de se conectar.`);
    }
  });

  socket.on('disconnect', async () => {
    await findAndDelete(socket.id);
    io.emit('disconnectChat', `Usuário ${socket.user} desconectou-se`);
    const modelAnswer = await onlineUsers();
    await io.emit('disconnectList', modelAnswer);
  });

  socket.on('message', async ({ user: userName, message }) => {
    const date = Date.now();
    await saveHistory({ user: userName, message, date });
    const modelAnswer = await savedMessageByDate(date);
    io.emit('message', { modelAnswer });
  });

  socket.on('messagePrivate', async ({ user, message, forId }) => {
    const date = Date.now();
    const meSocket = socket.id;
    const { user: userFor } = usersOnline.find(({ socket: userSocket }) => userSocket === forId);
    const chatExist = await existPrivateChat(user, userFor);
    if (!chatExist) {
      await savePrivateHistory({ user, message, date, userFor });
    } else {
      await updatePrivateHistory({ user, message, date, userFor });
    }
    const [{ messages }] = await savedPrivateMessages(user, userFor);
    io.to(forId).emit('messagePrivate', { modelAnswer: messages, meSocket });
    io.to(meSocket).emit('messagePrivate', { modelAnswer: messages, meSocket });
  });

  socket.on('privateHistory', async ({ user, forUser }) => {
    const allHistory = await savedPrivateHistory(user, forUser);
    const meSocket = socket.id;
    if (allHistory.length !== 0) {
      allHistory.forEach((modelAnswer) => {
        console.log(modelAnswer);
        // io.to(meSocket).emit('mePrivateHistory', { modelAnswer, meSocket });
      });
    }
  });
});

app.use('/', express.static(join(__dirname, 'public')));

http.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
