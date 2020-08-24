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

function createLiUser(user) {
  const li = document.createElement('li');
  li.innerHTML = user;
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
  socket.emit('connection', { user: userName });
}

function setUserNameLi() {
  socket.on('userConnected', (user) => {
    ulUsers.append(createLiUser(user));
  });
}

setUserName();
receiveMessage();
setUserNameLi();
