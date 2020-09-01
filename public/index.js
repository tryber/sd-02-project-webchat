const socket = io('http://localhost:4555');

window.onload = async () => {
  const { messages } = await fetch('http://localhost:3000/messages').then((data) => data.json());
  messages.forEach((el) => {
    const message = document.createElement('li');
    message.innerHTML = `${el.user}: ${el.message} (${new Date(el.timestamp).toLocaleString('pt-br')})`;
    document.getElementById('messages-list').appendChild(message);
  });
};

let username;
const inputMessage = document.getElementById('message-input');
const messageSubmit = document.getElementById('message-submit');
const inputNickname = document.getElementById('nickname-input');
const nicknameButton = document.getElementById('nickname-button');
const messageList = document.getElementById('messages-list');

nicknameButton.addEventListener('click', () => {
  if (inputNickname.value) {
    socket.emit('user', { user: inputNickname.value });
    username = inputNickname.value;
    nicknameButton.style.display = 'none';
    inputNickname.style.display = 'none';
    inputMessage.style.display = 'block';
    messageSubmit.style.display = 'block';
    messageList.style.display = 'block';
  }
});

messageSubmit.addEventListener('click', () => {
  if (inputMessage.value) {
    socket.emit('newMessage', { user: username, message: inputMessage.value });
  }
});

socket.on('newMessage', ({ user, message, timestamp }) => {
  const newMessage = document.createElement('li');
  newMessage.innerHTML = `${user}: ${message} (${new Date(timestamp).toLocaleString('pt-br')})`;
  document.getElementById('messages-list').appendChild(newMessage);
  document.getElementById('message-input').value = '';
});
