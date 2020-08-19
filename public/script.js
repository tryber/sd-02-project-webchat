const caixaDeTexto = document.getElementById('caixa-de-texto');

const socket = io('http://localhost:3005/');
let nomeUsuario = prompt('Qual seu nome?');

if (nomeUsuario === null || nomeUsuario === '') {
  nomeUsuario = `Usuário #${[Math.floor(Math.random() * 50)]}`;
}

socket.emit('chat message', `Bem vindo! ${nomeUsuario}`);

function enviarMensagem() {
  const msg = caixaDeTexto.value;
  console.log('cxTexto', caixaDeTexto);
  if (msg.length > 0) {
    console.log(nomeUsuario);
    console.log(msg);
    socket.emit('chat message', `${nomeUsuario}: ${msg}`);
    caixaDeTexto.value = '';
  }
}

socket.on('chat message', (msg) => {
  const ul = document.getElementById('mensagens');
  const li = document.createElement('li');
  li.appendChild(document.createTextNode(msg));
  ul.appendChild(li);
});

caixaDeTexto.addEventListener('keypress', (e) => {
  console.log('fora');
  const key = e.which || e.keyCode;
  if (key === 13) {
    console.log('dentro');
    enviarMensagem('http://localhost:3005');
  }
});

document.getElementById('envia-msg').addEventListener('click', enviarMensagem);
