const express = require('express');
const http = require('http').createServer(express());
const bodyParser = require('body-parser');
const io = require('socket.io')(http);
const cors = require('cors');

const { saveNickname } = require('./controllers/userControllers');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/users', saveNickname);

app.listen(3001, () => console.log('Listening on 3001'));

io.on('connection', (socket) => {
  console.log('Conectado');
  socket.on('disconnect', () => {
    console.log('Desconectado');
  });
  socket.on('mensagem', (msg) => {
    io.emit('serverMsg', msg);
  });
  socket.broadcast.emit('serverMsg');
});

http.listen(5000, () => console.log('Chat Listening on 5000'));
