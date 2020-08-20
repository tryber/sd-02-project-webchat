const socket = io('http://localhost:4555');

const sendButton = document.getElementById('sendButton');
const nameButton = document.getElementById('nameButton');

nameButton.addEventListener('click', () => {
  const nameInput = document.getElementById('nameInput');
  socket.emit('new user', nameInput.value);
  nameInput.disabled = true;
  nameButton.disabled = true;
  sendButton.disabled = false;
  document.getElementById('mensagemInput').disabled = false;
});

sendButton.addEventListener('click', () => {
  const mensagemInput = document.getElementById('mensagemInput').value;
  socket.emit('new message user', mensagemInput);
  document.getElementById('mensagemInput').value = '';
})

socket.on('new message', ({ message, user }) => {
  const messageBox = document.getElementById('messages');
  const printedMessage = document.createElement('li');
  printedMessage.innerHTML = `${user} diz: ${message}`;
  printedMessage.className = 'messagePrinted';
  messageBox.appendChild(printedMessage);

  if (user !== document.getElementById('nameInput').value) {
    alert('Nova mensagem!')
  }
});
