const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');

const socketIoServer = require('http').createServer();
const io = require('socket.io')(socketIoServer);

const { recordMessage, recordUser, getAllMessages } = require('./controllers');

const app = express();

app.use(cors());

app.use(express.static('public'));

app.use(bodyParser.json());

io.on('connection', (socket) => {
  socket.emit('message', 'Boas vindas ao servidor!');

  socket.on('allMessages', async () =>
    axios
      .get('http://localhost:3000/messages')
      .then(({ messages }) => socket.emit('newMessage', { messages }))
      .catch((error) => socket.emit('error', { error })));

  socket.on('newMessage', async ({ user, message }) =>
    axios
      .post('http://localhost:3000/message', { user, message })
      .then(({ data }) => io.emit('newMessage', { user: data.user, message: data.message }))
      .catch((error) => io.emit('error', { error })));

  socket.on('user', async ({ user }) =>
    axios
      .post('http://localhost:3000/user', { user })
      .then(({ data }) => io.emit('user', { user: data.user }))
      .catch((error) => io.emit('error', { error })));

  socket.on('disconnect', () => {
    io.emit('disconnect', `Client ${socket.id} saiu`);
  });
});

app.get('/messages', getAllMessages);
app.post('/message', recordMessage);
app.post('/user', recordUser);

app.listen(3000);
console.log('Express ouvindo na porta 3000');

socketIoServer.listen(4555);
console.log('Socket.io ouvindo na porta 4555');
