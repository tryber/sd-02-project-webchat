document.write(
  'https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.3.0/socket.io.js',
);

const socket = io('http://localhost:3000/');

const inputValue = document.getElementById('messageInput');
const ulMsg = document.getElementById('message');
const ulUsers = document.getElementById('onlineUsers');
const divMsgs = document.querySelector('.messagesBox');
const spaceSpan1 = document.createTextNode(' ');
const spaceSpan2 = document.createTextNode(' ');
let userName;
let clicked = false;
let socketUser = 'Geral';
let socketIdPrivate;
let meSocketId;

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

function createPrivateMsg({ user, message, date }) {
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

function randomNumber256() {
  return Math.floor(Math.random() * 256);
}

function setBgColor({ target }) {
  socketUser = target.innerText;
  socketIdPrivate = target.getAttribute('value');
  if (socketUser !== 'Geral') {
    socket.emit('privateHistory', { user: userName, forUser: socketUser });
    clicked = true;
  } else if (socketUser === 'Geral') {
    socket.emit('loginUser', { user: userName, newEmit: false });
    clicked = false;
  }
  ulMsg.innerText = `Falando com: ${socketUser}`;
}

function createLiNewUser(newUser, divClass, spanClass, socketIdUser) {
  const liUser = document.createElement('li');
  const divTagNewUser = document.createElement('div');
  const spanNew1 = document.createElement('span');
  const socketNum = Math.random();
  liUser.append(divTagNewUser);
  divTagNewUser.onclick = (e) => setBgColor(e);
  if (newUser !== 'Geral') {
    divTagNewUser.setAttribute('value', socketIdUser);
    spanNew1.setAttribute('value', socketIdUser);
  } else if (newUser === 'Geral') {
    divTagNewUser.setAttribute('value', socketNum);
    spanNew1.setAttribute('value', socketNum);
  }
  divTagNewUser.append(spanNew1);
  spanNew1.innerHTML = newUser;
  divTagNewUser.className = divClass;
  spanNew1.className = spanClass;
  return liUser;
}

function submitForm(event) {
  event.preventDefault();
  const lengthMsg = inputValue.value;
  if (lengthMsg.length > 0 && !clicked) {
    socket.emit('message', { user: userName, message: lengthMsg });
    inputValue.value = '';
  }
  if (clicked && socketUser !== 'Geral') {
    socket.emit('messagePrivate', {
      user: userName,
      message: inputValue.value,
      forId: socketIdPrivate,
    });
    inputValue.value = '';
  }
}

function receiveMessageAll() {
  socket.on('message', ({ modelAnswer: { user, message, date } }) => {
    if (socketUser === 'Geral') {
      ulMsg.append(createLiMsg({ user, message, date }));
      divMsgs.scrollTop = divMsgs.scrollHeight;
    }
  });
}

function receiveMessagePrivate() {
  socket.on('messagePrivate', ({ modelAnswer: { user, message, date }, meSocket }) => {
    if (
      ((user !== undefined) && (clicked) && (meSocket === socketIdPrivate))
      || ((user !== undefined) && (clicked) && meSocket === meSocketId)
    ) {
      ulMsg.append(createPrivateMsg({ user, message, date }));
      divMsgs.scrollTop = divMsgs.scrollHeight;
    }
  });
}

function historyPrivateMessage() {
  socket.on('mePrivateHistory', ({ modelAnswer: { user, message, date }, meSocket }) => {
    if (
      ((user !== undefined) && (clicked) && (meSocket === socketIdPrivate))
      || ((user !== undefined) && (clicked) && meSocket === meSocketId)
    ) {
      ulMsg.append(createPrivateMsg({ user, message, date }));
      divMsgs.scrollTop = divMsgs.scrollHeight;
    }
  });
}

function receiveHistory() {
  ulMsg.innerText = '';
  socket.on('history', ({ modelAnswer: { userHistory: user, message, date } }) => {
    ulMsg.append(createLiMsg({ user, message, date }));
    divMsgs.scrollTop = 0;
  });
  ulMsg.innerText = `Falando com: ${socketUser}`;
}

// function newLoggin() {
//   socket.on('loggedUser', (msg) => {
//     if (socketUser === 'Geral') {
//       ulMsg.append(createLiNewUser(msg, 'msgContainer', 'userName'));
//       divMsgs.scrollTop = divMsgs.scrollHeight;
//     }
//   });
// }

// function disconnectUser() {
//   socket.on('disconnectChat', (msg) => {
//     if (socketUser === 'Geral') {
//       ulMsg.append(createLiNewUser(msg, 'msgContainer', 'userName'));
//       divMsgs.scrollTop = divMsgs.scrollHeight;
//     }
//   });
// }

function onlineUsers() {
  socket.on('onlineList', async ({ users }) => {
    ulUsers.innerText = '';
    ulUsers.append(createLiNewUser('Geral', 'onlineUser', 'onlineSpan'));
    users.forEach(({ user, socket: socketIdUser }) => {
      if (user === userName) {
        meSocketId = socketIdUser;
      }
      if (user !== userName) {
        ulUsers.append(createLiNewUser(user, 'onlineUser', 'onlineSpan', socketIdUser));
      }
    });
  });
}

// function disconnectList() {
//   socket.on('disconnectList', (users) => {
//     ulUsers.innerText = '';
//     ulUsers.append(createLiNewUser('Geral', 'onlineUser', 'onlineSpan'));
//     users.forEach(({ user }) => {
//       ulUsers.append(createLiNewUser(user, 'onlineUser', 'onlineSpan'));
//     });
//   });
// }

window.onload = () => {
  userName = setUserName(randomNumber256, socket, prompt);
  receiveMessageAll();
  receiveHistory();
  disconnectUser(socket, socketUser, ulMsg, divMsgs, createLiNewUser);
  newLoggin(socket, socketUser, ulMsg, divMsgs, createLiNewUser);
  onlineUsers();
  disconnectList(socket, ulUsers, createLiNewUser);
  receiveMessagePrivate();
  historyPrivateMessage();
};
