const express = require('express');
const { join } = require('path');

const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/public/index.html`);
});

io.on('connection', (socket) => {
  socket.broadcast.emit('message', `User conectado ${socket.id}`);

  socket.on('disconnect', () => {
    socket.broadcast.emit('message', `User conectado ${socket.id}`);
  });

  socket.on('message', (msg) => {
    console.log(msg);
    io.emit('message', msg);
  });
});

app.use('/', express.static(join(__dirname, 'public')));

http.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
