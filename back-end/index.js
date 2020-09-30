const express = require('express');
const http = require('http').createServer(express());
const bodyParser = require('body-parser');
const io = require('socket.io')(http);
const cors = require('cors');

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

const onlineArray = [];

io.on('connection', (socket) => {
  socket.on('login', ({ nickname }) => {
    onlineArray.push(nickname);
    console.log(`a user ${nickname} connected`);
    console.log(onlineArray);
  });
  socket.on('disconnect', () => {
    // apps.splice( apps.findIndex(a => a.id === 37) , 1);
    console.log('Desconectado');
  });
  socket.on('mensagem', ({ message, nickname }) => {
    io.emit('serverMsg', { message, nickname });
  });
});

http.listen(5000, () => console.log('Chat Listening on 5000'));
