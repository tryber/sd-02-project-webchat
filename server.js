const express = require('express');
const bodyParser = require('body-parser');

const dotenv = require('dotenv');
const socketIoServer = require('http').createServer();
const io = require('socket.io')(socketIoServer);
const { join } = require('path');

dotenv.config();
const app = express();
const axios = require('axios')

const messagesControllers = require('./controllers/messagesControllers')

app.use(bodyParser.json());

app.use('/', express.static(join(__dirname, 'public')));

io.on('connection', (socket) => {
  socket.on('disconnect', () => {
    console.log(`Client ${socket.name} desconectado`);
  });

  socket.on('new user', async (name) => {
    socket.name = name;
    await axios.post('http://localhost:3000/name', { name: socket.name });
  });

  socket.on('new message user', async (msg) => {
    console.log(msg);
    const message = await axios.post('http://localhost:3000/message', { user: socket.name, message: msg });
    io.emit('new message', { ...message.data, user: socket.name });
  });
});

app.get('/message', messagesControllers.getMessages);
app.post('/message', messagesControllers.sendMessage);
app.post('/name', messagesControllers.sendName);

app.listen(3000);
console.log('Express ouvindo na porta 3000');

socketIoServer.listen(4555);
console.log('Socket.io ouvindo na porta 4555');