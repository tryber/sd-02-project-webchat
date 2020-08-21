const caixaDeTexto = document.getElementById('caixa-de-texto');
const socket = io('http://localhost:3005/');

let nomeUsuario = prompt('Qual seu nome?');

if (nomeUsuario === null || nomeUsuario === '') {
  nomeUsuario = `Usuário #${[Math.floor(Math.random() * 50)]}`;
}

const pegaHistorico = async () => {
  const { data } = await axios.get('http://localhost:3000/messages');
  return data;
};

const criaUsuario = async (user) => axios
  .post('http://localhost:3000/name', { name: user });

const salvaMensagem = async (messageInfo) => axios
  .post('http://localhost:3000/messages', messageInfo);

const enviarMensagem = () => {
  const mensagemEnviada = caixaDeTexto.value;
  if (mensagemEnviada.length > 0) {
    salvaMensagem({ nomeUsuario, mensagemEnviada, data: new Date() });
    socket.emit('mensagemChat', { nomeUsuario, mensagemEnviada });
    caixaDeTexto.value = '';
  }
};

const colocaMensagemNoDOM = (msg, classe) => {
  const ul = document.getElementById('mensagens');
  const li = document.createElement('li');
  li.classList.add(classe);
  li.appendChild(document.createTextNode(msg));
  ul.appendChild(li);
  ul.scrollTop = ul.scrollHeight;
};

caixaDeTexto.addEventListener('keypress', (e) => {
  const key = e.which || e.keyCode;
  if (key === 13) {
    enviarMensagem('http://localhost:3005');
  }
});

const carregarChat = async () => {
  await criaUsuario(nomeUsuario);
  const mensagensDB = await pegaHistorico();
  await socket.emit('historico', { nomeUsuario, mensagensDB });
};

carregarChat();

socket.on('historico', (msg) => {
  colocaMensagemNoDOM(msg, 'historico');
});

socket.on('novoUsuario', (msg) => {
  colocaMensagemNoDOM(msg, 'novo_usuario');
});

socket.on('mensagemChat', (msg) => {
  colocaMensagemNoDOM(msg, 'mensagens');
});

document.getElementById('envia-msg').addEventListener('click', enviarMensagem);
