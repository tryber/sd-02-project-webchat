const caixaDeTexto = document.getElementById('caixa-de-texto');

const socket = io('http://localhost:3005/');
let nomeUsuario = prompt('Qual seu nome?');

if (nomeUsuario === null || nomeUsuario === '') {
  nomeUsuario = `Usuário #${[Math.floor(Math.random() * 50)]}`;
}

socket.emit('historico', { nomeUsuario });

const enviarMensagem = () => {
  const mensagemEnviada = caixaDeTexto.value;
  if (mensagemEnviada.length > 0) {
    socket.emit('mensagemChat', { nomeUsuario, mensagemEnviada });
    caixaDeTexto.value = '';
  }
};

socket.on('historico', (msg) => {
  const ul = document.getElementById('mensagens');
  const li = document.createElement('li');
  li.classList.add('historico');
  li.appendChild(document.createTextNode(msg));
  ul.appendChild(li);
});

socket.on('novoUsuario', (msg) => {
  const ul = document.getElementById('mensagens');
  const li = document.createElement('li');
  li.classList.add('novo_usuario');
  li.appendChild(document.createTextNode(msg));
  ul.appendChild(li);
});

socket.on('mensagemChat', (msg) => {
  const ul = document.getElementById('mensagens');
  const li = document.createElement('li');
  li.appendChild(document.createTextNode(msg));
  ul.appendChild(li);
  ul.scrollTop = ul.scrollHeight;
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
