const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log(
    'Usuário conectado, igual ao que fizemos na aula anterior, porém dessa vez em um servidor escalável'
  );
});

http.listen(3000, () => {
  console.log('Servidor ouvindo na porta 3000');
});
