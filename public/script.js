const socket = io();

const sendMessagebutton = document.getElementById('send-message-button');
const messageField = document.getElementById('message-field');

sendMessagebutton.addEventListener('click', (e) => {
  e.preventDefault(); // prevents page reloading
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
