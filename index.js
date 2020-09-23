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
  findAndDelete } = require('./models/ChatModel');

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/public/index.html`);
});

io.on('connection', (socket) => {
  socket.on('loginUser', async ({ user }) => {
    socket.user = user;
    await saveUsers(user);
    const modelAnswer = await onlineUsers();
    await io.emit('onlineList', { users: modelAnswer });
    const historyMessages = await savedHistory();
    historyMessages.forEach(({ user: userHistory, message, date }) => {
      socket.emit('history', { modelAnswer: { userHistory, message, date } });
    });
    await socket.broadcast.emit('loggedUser', `${socket.user} acabou de se conectar.`);
  });

  socket.on('disconnect', async () => {
    await findAndDelete(socket.user);
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
});

app.use('/', express.static(join(__dirname, 'public')));

http.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
