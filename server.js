const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const http = require('http').createServer(app);

const io = require('socket.io')(http);

const messagesController = require('./controllers/messagesController');

app.use(bodyParser.json());
app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('record nick', async (name) => {
    await axios.post('http://localhost:3000/name', { userName: name });
  });

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

// app.get('/message', messagesControllers.getMessages);
// app.post('/message', messagesControllers.sendMessage);
app.use('/name', messagesController.sendName);

http.listen(3000, () => {
  console.log('listening on *:3000');
});

// socketIoServer.listen(4555);
// console.log('Socket.io ouvindo na porta 4555');
