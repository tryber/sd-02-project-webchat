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
  socket.on('connection', ({ user }) => {
    socket.id = user;
    io.emit('message', `${user.charAt(0).toUpperCase() + user.slice(1)} acabou de se conectar`);
    io.emit('userConnected', user);
  });

  socket.on('disconnect', () => {
    socket.broadcast.emit('message', `Usuário ${socket.id} desconectou-se`);
  });

  socket.on('message', ({ user, message }) => {
    io.emit('message', `${user}: ${message}`);
  });
});

app.use('/', express.static(join(__dirname, 'public')));

http.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
