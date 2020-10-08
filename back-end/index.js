const express = require('express');
const http = require('http').createServer(express());
const bodyParser = require('body-parser');
const io = require('socket.io')(http);
const cors = require('cors');
const { savePrivateMessage, getAllPvtMessages } = require('./models/ChatModels');

const {
  saveNickname, insertMessages, getAllChats,
} = require('./controllers/userControllers');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/users', saveNickname);

app.post('/messages', insertMessages);

app.get('/messages', getAllChats);

app.listen(3001, () => console.log('Listening on 3001'));

const onlineArray = {};

io.on('connection', (socket) => {
  console.log(socket.id);
  socket.on('login', ({ nickname }) => {
    onlineArray[nickname] = socket.id;
    console.log('login', onlineArray);
    io.emit('online', onlineArray);
  });
  socket.on('disconnect', () => {
    const removeIndex = Object.values(onlineArray).findIndex((socketId) => socketId === socket.id);
    delete onlineArray[Object.keys(onlineArray)[removeIndex]];
    console.log('disconnect', onlineArray);
    io.emit('online', onlineArray);
  });
  socket.on('mensagem', ({ message, nickname }) => {
    io.emit('serverMsg', { message, nickname });
  });
  socket.on('privatemessage', async ({ message, sender, reciever }) => {
    const pvtRoom = (onlineArray[sender] + onlineArray[reciever])
      .split('')
      .sort()
      .join('');
    await savePrivateMessage(sender, reciever, message);
    io.to(pvtRoom).emit('privatechat', { message, sender });
  });
  socket.on('joinRoom', async ({ sender, reciever }) => {
    const allMessages = await getAllPvtMessages(sender, reciever);
    const pvtRoom = (onlineArray[sender] + onlineArray[reciever])
      .split('')
      .sort()
      .join('');
    console.log(pvtRoom);
    socket.join(pvtRoom);
    io.emit(`${sender}${reciever}`, { allMessages });
  });
});

http.listen(5000, () => console.log('Chat Listening on 5000'));
