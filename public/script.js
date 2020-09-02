const socket = io('http://localhost:3000/');

const inputValue = document.getElementById('messageInput');
const ulMsg = document.getElementById('message');
const divMsgs = document.querySelector('.messagesBox');
let userName;

function createLi({ user, message, date }) {
  const li = document.createElement('li');
  const divTag = document.createElement('div');
  const span1 = document.createElement('span');
  const span2 = document.createElement('span');
  const span3 = document.createElement('span');
  const spaceSpan1 = document.createTextNode(' ');
  const spaceSpan2 = document.createTextNode(' ');
  li.append(divTag);
  divTag.append(span1, spaceSpan1, span2, spaceSpan2, span3);
  span1.innerHTML = user;
  span2.innerHTML = message;
  span3.innerHTML = new Date(date).toLocaleString();
  divTag.className = 'msgContainer';
  span1.className = 'userName';
  span2.className = 'msgSpan';
  span3.className = 'date';
  return li;
}

function submitForm(event) {
  event.preventDefault();
  const lengthMsg = inputValue.value;
  if (lengthMsg.length > 0) {
    socket.emit('message', { user: userName, message: inputValue.value });
    inputValue.value = '';
  }
  return null;
}

function receiveMessage() {
  socket.on('message', ({ modelAnswer: { user, message, date } }) => {
    ulMsg.append(createLi({ user, message, date }));
    divMsgs.scrollTop = divMsgs.scrollHeight;
  });
}

function receiveHistory() {
  socket.on('history', ({ modelAnswer: { userHistory: user, message, date } }) => {
    ulMsg.append(createLi({ user, message, date }));
    divMsgs.scrollTop = 0;
  });
}

function setUserName() {
  userName = prompt('Qual seu nome?');
  socket.emit('loginUser', { user: userName });
}

setUserName();
receiveMessage();
receiveHistory();
