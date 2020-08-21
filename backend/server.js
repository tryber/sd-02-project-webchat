require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const rescue = require('express-rescue');
const cors = require('cors');

const app = express();
const server = require('http').createServer();
const io = require('socket.io')(server);

const controller = require('./controllers');
const Chat = require('./models/Chat');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const sendMessage = async ({ nickname, message }) => {
  const date = new Date();
  const newMessage = { nickname, message, date };
  await Chat.add(newMessage);
  io.emit('receive-message', newMessage);
};

io.on('connection', (socket) => {
  console.log(`Client ${socket.id} conectado!`);

  socket.on('login', () => {
    io.emit('users');
  });

  socket.on('send-message', async ({ yourUser, message }) =>
    sendMessage({ nickname: yourUser, message }),
  );

  socket.on('disconnect', () => {
    console.log(`Client ${socket.id} desconectado`);
  });
});

app.get('/user', rescue(controller.users.findAll));
app.post('/user', rescue(controller.users.add));

app.get('/chat', rescue(controller.chats.findAll));
app.post('/chat', rescue(controller.chats.add));

app.listen(process.env.APP_PORT, () => console.log(`Listening on ${process.env.APP_PORT}`));
server.listen(process.env.IO_PORT, () => console.log(`Listening on ${process.env.IO_PORT}`));
