const socket = io();

const sendNickButton = document.getElementById('send-nick-button');
const nickField = document.getElementById('nick-field');
const sendMessagebutton = document.getElementById('send-message-button');
const messageField = document.getElementById('message-field');

const appendMessage = (msg) => {
  const messagesArea = document.getElementById('messages-area');
  const newMessage = document.createElement('li');
  newMessage.appendChild(document.createTextNode(msg));
  messagesArea.appendChild(newMessage);
  messagesArea.scrollTop = messagesArea.scrollHeight;
};

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
  socket.emit('chat message', messageField.value, nickField.value);
  return false;
});

socket.on('chat message', (msg, nick) => appendMessage(msg, nick));

window.onload = async () => {
  const logFetch = await fetch('http://localhost:3000/message').then((log) => log.json());
  const messagesArray = [];
  logFetch.log.forEach((user) => {
    user.log.forEach((logMessage) => {
      messagesArray.push({ ...logMessage, user: user.userName });
    });
  });
  const orderedMessages = messagesArray.sort((a, b) => (a.date > b.date ? 1 : -1));
  orderedMessages.forEach((message) => appendMessage(`(${message.date}) ${message.user}: ${message.text}`));
};
