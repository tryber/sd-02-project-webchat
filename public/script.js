const socket = io('http://localhost:3000/');

const inputValue = document.getElementById('messageInput');
const ulMsg = document.getElementById('message');
const ulUsers = document.getElementById('onlineUsers');
const divMsgs = document.querySelector('.messagesBox');
const spaceSpan1 = document.createTextNode(' ');
const spaceSpan2 = document.createTextNode(' ');
const userList = [];
let userName;
let clicked = false;
let socketUser;

function createLiMsg({ user, message, date }) {
  const liMsg = document.createElement('li');
  const divTagMsg = document.createElement('div');
  const span1 = document.createElement('span');
  const span2 = document.createElement('span');
  const span3 = document.createElement('span');
  liMsg.append(divTagMsg);
  divTagMsg.append(span1, spaceSpan1, span2, spaceSpan2, span3);
  span1.innerHTML = user;
  span2.innerHTML = message;
  span3.innerHTML = new Date(date).toLocaleString();
  divTagMsg.className = 'msgContainer';
  span1.className = 'userName';
  span2.className = 'msgSpan';
  span3.className = 'date';
  return liMsg;
}

function randomNumber() {
  return Math.floor(Math.random() * 256);
}

function setBgColor({ target }) {
  const main = target;
  const color = target.style.backgroundColor === 'white' ? '' : 'white';
  main.style.backgroundColor = color;
  clicked = !clicked;
  socketUser = target.getAttribute('value');
  console.log(socketUser);
}

function createLiNewUser(newUser, divClass, spanClass) {
  const liUser = document.createElement('li');
  const divTagNewUser = document.createElement('div');
  const spanNew1 = document.createElement('span');
  liUser.append(divTagNewUser);
  divTagNewUser.onclick = (e) => setBgColor(e);
  divTagNewUser.setAttribute('value', newUser);
  spanNew1.setAttribute('value', newUser);
  divTagNewUser.append(spanNew1);
  spanNew1.innerHTML = newUser;
  divTagNewUser.className = divClass;
  spanNew1.className = spanClass;
  return liUser;
}

function submitForm(event) {
  event.preventDefault();
  const lengthMsg = inputValue.value;
  if (lengthMsg.length > 0) {
    socket.emit('message', { user: userName, message: inputValue.value });
    inputValue.value = '';
  }
  if (clicked) {
    socket.emit(`message${socketUser}`, { user: userName, message: inputValue.value });
    inputValue.value = '';
  }
  return null;
}

function receiveMessage() {
  if (!clicked) {
    socket.on('message', ({ modelAnswer: { user, message, date } }) => {
      ulMsg.append(createLiMsg({ user, message, date }));
      divMsgs.scrollTop = divMsgs.scrollHeight;
    });
  }
  socket.on(`message${userName}`, ({ modelAnswer: { user, message, date } }) => {
    ulMsg.append(createLiMsg({ user, message, date }));
    divMsgs.scrollTop = divMsgs.scrollHeight;
  });
}

function receiveHistory() {
  ulMsg.innerText = '';
  socket.on('history', ({ modelAnswer: { userHistory: user, message, date } }) => {
    ulMsg.append(createLiMsg({ user, message, date }));
    divMsgs.scrollTop = 0;
  });
}

function setUserName() {
  userName = `User${randomNumber()}`;
  userList.push(userName);
  socketUser = userName;
  return socket.emit('loginUser', { user: userName });
}

function newLoggin() {
  socket.on('loggedUser', (msg) => {
    ulMsg.append(createLiNewUser(msg, 'msgContainer', 'userName'));
    divMsgs.scrollTop = divMsgs.scrollHeight;
  });
}

function disconectUser() {
  socket.on('disconnectChat', (msg) => {
    ulMsg.append(createLiNewUser(msg, 'msgContainer', 'userName'));
    divMsgs.scrollTop = divMsgs.scrollHeight;
  });
}

function onlineUsers() {
  socket.on('onlineList', async ({ users }) => {
    ulUsers.innerText = '';
    users.forEach(({ user }) => {
      userList.push(user);
      ulUsers.append(createLiNewUser(user, 'onlineUser', 'onlineSpan'));
    });
  });
}

function disconnectList() {
  socket.on('disconnectList', (users) => {
    ulUsers.innerText = '';
    users.forEach(({ user }) => {
      ulUsers.append(createLiNewUser(user, 'onlineUser', 'onlineSpan'));
    });
  });
}

function changeName({ target }) {
  userName = target.value;
  socket.disconnect();
  socket.connect();
  socket.emit('loginUser', { user: userName });
}

setUserName();
receiveMessage();
receiveHistory();
disconectUser();
newLoggin();
onlineUsers();
disconnectList();
