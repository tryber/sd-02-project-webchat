const socket = io('http://localhost:4555');

const formatDate = () => {
  const addingZero = (date) => (date < 10 ? `0${date}` : date);
  const date = new Date();
  const day = addingZero(date.getDate());
  const month = addingZero(date.getMonth() + 1);
  const year = addingZero(date.getFullYear());
  const hour = addingZero(date.getHours());
  const minutes = addingZero(date.getMinutes());
  const seconds = addingZero(date.getSeconds());
  return `${hour}:${minutes}:${seconds} - ${day}/${month}/${year}`;
};

window.onload = async () => {
  const { messages } = await fetch('http://localhost:3000/messages').then((data) => data.json());
  messages.forEach((el) => {
    const message = document.createElement('li');
    message.innerHTML = `${el.user}: ${el.message} (${formatDate(new Date(el.timestamp))})`;
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

socket.on('newMessage', ({ user, message }) => {
  const newMessage = document.createElement('li');
  newMessage.innerHTML = `${user}: ${message} (${formatDate()})`;
  document.getElementById('messages-list').appendChild(newMessage);
  document.getElementById('message-input').value = '';
});
