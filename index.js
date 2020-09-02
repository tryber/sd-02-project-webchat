/* eslint-disable no-param-reassign */
const express = require('express');
const { join } = require('path');

const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const { saveHistory, savedHistory, savedMessageByDate } = require('./models/ChatModel');

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/public/index.html`);
});

function randomNumber() {
  return Math.floor(Math.random() * 256);
}

io.on('connection', (socket) => {
  socket.on('loginUser', async ({ user }) => {
    socket.id = user;
    if (!user || user === ' ') {
      const userName = `User${randomNumber()}`;
      socket.id = userName;
    }
    const historyMessages = await savedHistory();
    historyMessages.forEach(({ user: userHistory, message, date }) => {
      socket.emit('history', { modelAnswer: { userHistory, message, date } });
    });
  });

  io.emit('userConnect', `${socket.id} acabou de se conectar`);

  socket.on('disconnect', () => {
    socket.broadcast.emit('message', `Usuário ${socket.id} desconectou-se`);
  });

  socket.on('message', async ({ user: userName, message }) => {
    const date = Date.now();
    if (!userName) {
      userName = `User${randomNumber()}`;
    }
    await saveHistory({ user: userName, message, date });
    const modelAnswer = await savedMessageByDate(date);
    io.emit('message', { modelAnswer });
  });
});

app.use('/', express.static(join(__dirname, 'public')));

http.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
