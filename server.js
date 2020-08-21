const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const socketIoServer = require('http').createServer();
const io = require('socket.io')(socketIoServer);
const { join } = require('path');

const app = express();
app.use(cors());
app.use('/', express.static(join(__dirname, 'public')));

const { saveUser, saveMessage, getAllMessages } = require('./controller');

app.use(bodyParser.json());

io.on('connection', (socket) => {
  socket.on('user', ({ name }) => saveUser(name));

  socket.on('message', async ({ user, message }) => {
    const date = await saveMessage(user, message);
    io.emit('new Message', {
      user,
      message,
      date: date.toLocaleString(),
    });
  });

  socket.on('disconnect', () => {
    console.log(`Client ${socket.id} desconectado`);
  });
});

app.get('/users', getAllMessages);
app.listen(3000);
console.log('Express ouvindo na porta 3000');

socketIoServer.listen(4555);
console.log('Socket.io ouvindo na porta 4555');
