const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { join } = require('path');

const controller = require('./controllers/messageController');

const socketIoServer = require('http').createServer();
const io = require('socket.io')(socketIoServer);

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', express.static(join(__dirname, 'public')));

app.get('/messages', controller.getMessages);
app.post('/messages', controller.postMessage(io));

app.listen(3000, () => console.log('Express ouvindo na porta 3000'));
socketIoServer.listen(4555, () => console.log('Socket.io ouvindo na porta 4555'));
