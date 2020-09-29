const express = require('express');
const http = require('http').createServer(express());
const io = require('socket.io')(http);

io.on('connection', (socket) => {
  console.log('Conectado');
  socket.on('disconnect', () =>{
    console.log('Desconectado');
  });
  socket.on('mensagem', (msg) => {
    io.emit('serverMsg', msg);
  });
  socket.broadcast.emit('serverMsg');
});

http.listen(5000, () => console.log('Chat Listening on 5000'));
