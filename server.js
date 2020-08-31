// código baseado na aula ao vivo

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { join } = require('path');

const dbConnection = require('./dbConnection');

const socketIoServer = require('http').createServer();
const io = require('socket.io')(socketIoServer);

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', express.static(join(__dirname, 'public')));

io.on('connection', async (socket) => {
  console.log(`Client ${socket.id} conectado!`);

  socket.on('disconnect', () => {
    console.log(`Client ${socket.id} desconectado`);
  });
});

app.get('/messages', async (_req, res) => {
  const allMessages = await dbConnection()
    .then((db) => db.collection('messages').find().toArray())
    .then((messages) => messages.map(({ nickname, content, sentAt }) => ({
      nickname,
      content,
      sentAt,
    })));

  res.status(200).json(allMessages);
});

app.post('/messages', async (req, res) => {
  const { nickname, message } = req.body;

  if (!nickname || !message) {
    return res.status(422).json({ message: 'Missing message or nickname' });
  }

  await dbConnection()
    .then((db) => db.collection('messages').insertOne({
      nickname,
      content: message,
      sentAt: new Date(),
    }));

  res.status(200).json({ message: 'Notification emitted' });

  io.emit('notification', {});
});

app.listen(3000);
console.log('Express ouvindo na porta 3000');

socketIoServer.listen(4555);
console.log('Socket.io ouvindo na porta 4555');
