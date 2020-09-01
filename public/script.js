const socket = io();

const sendNickButton = document.getElementById('send-nick-button');
const nickField = document.getElementById('nick-field');
const sendMessagebutton = document.getElementById('send-message-button');
const messageField = document.getElementById('message-field');

sendNickButton.addEventListener('click', (e) => {
  e.preventDefault();
  if (!nickField.value) { return alert('please inform your nick first!'); }
  socket.emit('record nick', nickField.value);
  nickField.disabled = true;
  sendNickButton.disabled = true;
  sendMessagebutton.disabled = false;
  return false;
});

sendMessagebutton.addEventListener('click', (e) => {
  e.preventDefault();
  console.log(nickField.value);
  socket.emit('chat message', messageField.value);
  return false;
});

socket.on('chat message', (msg) => {
  const messagesArea = document.getElementById('messages-area');
  const newMessage = document.createElement('li');
  newMessage.appendChild(document.createTextNode(msg));
  messagesArea.appendChild(newMessage);
  messagesArea.scrollTop = messagesArea.scrollHeight;
});
