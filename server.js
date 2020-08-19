const express = require('express');
const bodyParser = require('body-parser');

const socketIoServer = require('http').createServer();
const io = require('socket.io')(socketIoServer);
const { join } = require('path');

var random = require('random-name')

const app = express();

app.use(bodyParser.json());

app.use('/', express.static(join(__dirname, 'public')));

io.on('connection', (socket) => {
  socket.name = random.first();
  console.log(`Client ${socket.name} conectado!`);
  socket.on('disconnect', () => {
    console.log(`Client ${socket.name} desconectado`);
  });

  socket.on('new message user', (msg) => {
    io.emit('new message', { msg, user: socket.name });
  });
});

app.post('/message', (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(422).json({ message: 'Missing message or title' });
  }

  io.emit('new message', { message });

  res.status(200).json({ message: `Notification emitted: ${message}` });
});

app.listen(3000);
console.log('Express ouvindo na porta 3000');

socketIoServer.listen(4555);
console.log('Socket.io ouvindo na porta 4555');