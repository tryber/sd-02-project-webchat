const socket = io('http://localhost:3000/');

const inputValue = document.getElementById('messageInput');
const ulMsg = document.getElementById('message');
const ulUsers = document.getElementById('userOnline');
let userName;

function createLi(msg) {
  const li = document.createElement('li');
  li.innerHTML = msg;
  return li;
}

function createLiUser() {
  const li = document.createElement('li');
  li.innerHTML = userName;
  return li;
}

function submitForm(event) {
  event.preventDefault();
  socket.emit('message', { user: userName, message: inputValue.value });
  inputValue.value = '';
}

function receiveMessage() {
  socket.on('message', (msg) => {
    ulMsg.append(createLi(msg));
  });
}

function setUserName() {
  userName = prompt('Qual seu nome?');
}

function setUserNameLi() {
  socket.on('userConnected', () => {
    ulUsers.append(createLiUser());
  });
}

setUserName();
receiveMessage();
setUserNameLi();
