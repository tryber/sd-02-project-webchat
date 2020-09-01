require('dotenv').config();
const app = require('express')();
const http = require('http').createServer(app)
const io = require('socket.io')(http, { origins: '*:*' });
const cors = require('cors');

const SOCKET = process.env.SOCKET;
const PORT = process.env.PORT;

app.use(cors());

io.on('connection', (socket) => {
  console.log('conectado');

  socket.on('disconnect', () => {
    console.log('desconectado.')
  })
});

app.listen(PORT, () => console.log(`Listen on ${PORT}`));
