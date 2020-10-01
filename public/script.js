const inputValue = document.getElementById('messageInput');
const ulMsg = document.getElementById('message');
const ulUsers = document.getElementById('onlineUsers');
const divMsgs = document.querySelector('.messagesBox');
const spaceSpan1 = document.createTextNode(' ');
const spaceSpan2 = document.createTextNode(' ');

let sockeToButton;
let clicked = false;
// let socketUser = 'Geral';
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

function setLocalStorage(name, obj) {
  return localStorage.setItem(name, obj);
}

function getLocalStorage(name) {
  return localStorage.getItem(name);
}

function setBgColor({ target }, socket) {
  socketUser = target.innerText;
  socketIdPrivate = target.getAttribute('value');
  if (socketUser !== 'Geral') {
    socket.emit('privateHistory', {
      user: userName,
      forUser: socketUser,
    });
    clicked = true;
  } else if (socketUser === 'Geral') {
    socket.emit('loginUser', {
      user: userName,
      newEmit: false,
    });
  }
  clicked = false;
  ulMsg.innerText = `Falando com: ${socketUser}`;
}

function createLiNewUser(newUser, divClass, spanClass, socketIdUser, socket) {
  const liUser = document.createElement('li');
  const divTagNewUser = document.createElement('div');
  const spanNew1 = document.createElement('span');
  const socketNum = Math.random();
  liUser.append(divTagNewUser);
  divTagNewUser.onclick = (e) => setBgColor(e, socket);
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

function receiveMessageAll(socket, uMsg, divMsg, liMsg) {
  socket.on('message', ({ modelAnswer: { user, message, date } }) => {
    if (socketUser === 'Geral') {
      uMsg.append(liMsg({ user, message, date }));
      divMsg.scrollTop = divMsg.scrollHeight;
    }
  });
}

function receiveMessagePrivate(socket, click, socketPrivate, meIdSocket, uMsg, divMsg, privMsg) {
  socket.on('messagePrivate', ({ modelAnswer: { user, message, date }, meSocket }) => {
    if (
      ((user !== undefined) && (click) && (meSocket === socketPrivate))
      || ((user !== undefined) && (click) && meSocket === meIdSocket)
    ) {
      uMsg.append(privMsg({ user, message, date }));
      divMsg.scrollTop = divMsg.scrollHeight;
    }
  });
}

function historyPrivateMessage(socket, uMsg, divMsg, privMsg) {
  socket.on('mePrivateHistory', ({
    modelAnswer: { user, message, date },
    meSocket,
    click,
    socketPrivate,
  }) => {
    if (
      ((user !== undefined) && (click) && (meSocket === socketPrivate))
      || ((user !== undefined) && (click) && meSocket === meIdSocket)
    ) {
      uMsg.append(privMsg({ user, message, date }));
      divMsg.scrollTop = divMsg.scrollHeight;
    }
  });
}

function receiveHistory(socket, uMsg, divMsg, liMsg, socketUs) {
  uMsg.innerText = '';
  socket.on('history', ({ modelAnswer: { userHistory: user, message, date } }) => {
    uMsg.append(liMsg({ user, message, date }));
    divMsg.scrollTop = 0;
  });
  uMsg.innerText = `Falando com: ${socketUs}`;
}

function setUserName(socket, newName, randNum, setLs) {
  let userName = newName('Qual seu nome?');
  if (!userName) {
    userName = `User${randNum()}`;
  }
  setLs('userName', userName);
  setLs('socketUser', 'Geral');
  socket.emit('loginUser', { user: userName, newEmit: true });
}

function newLoggin(socket, ulUs, divMsg, newliUs) {
  socket.on('loggedUser', (msg) => {
    if (socketUser === 'Geral') {
      ulUs.append(newliUs(msg, 'msgContainer', 'userName', null, socket));
      divMsg.scrollTop = divMsg.scrollHeight;
    }
  });
}

function disconnectUser(socket, socketUs, uMsg, divMsg, liNewUs) {
  socket.on('disconnectChat', (msg) => {
    if (socketUs === 'Geral') {
      uMsg.append(liNewUs(msg, 'msgContainer', 'userName', null, socket));
      divMsg.scrollTop = divMsg.scrollHeight;
    }
  });
}

function disconnectList(socket, uUsers, liNewUs) {
  socket.on('disconnectList', (users) => {
    uUsers.innerText = '';
    uUsers.append(liNewUs('Geral', 'onlineUser', 'onlineSpan', null, socket));
    users.forEach(({ user }) => {
      uUsers.append(liNewUs(user, 'onlineUser', 'onlineSpan', null, socket));
    });
  });
}

function onlineUsers(socket, ulUs, newliUs, getLs, setLs) {
  socket.on('onlineList', ({ users }) => {
    const userName = getLs('userName');
    ulUs.innerText = '';
    ulUs.append(newliUs('Geral', 'onlineUser', 'onlineSpan', null, socket));
    users.forEach(({ user, socket: socketIdUser }) => {
      if (user === userName) {
        setLs('meSocketId', socketIdUser);
      }
      if (user !== userName) {
        ulUs.append(newliUs(user, 'onlineUser', 'onlineSpan', socketIdUser, socket));
      }
    });
  });
}

function submitForm(event) {
  event.preventDefault();
  const lengthMsg = inputValue.value;
  if (lengthMsg.length > 0 && !clicked) {
    sockeToButton.emit('message', { user: userName, message: lengthMsg });
    inputValue.value = '';
  }
  if (clicked && socketUser !== 'Geral') {
    sockeToButton.emit('messagePrivate', {
      user: userName,
      message: inputValue.value,
      forId: socketIdPrivate,
    });
    inputValue.value = '';
  }
}

window.onload = (param) => {
  const socketIo = param.path[0].io('http://localhost:3000/');
  sockeToButton = socketIo;
  setUserName(socketIo, prompt, randomNumber256, setLocalStorage);
  onlineUsers(socketIo, ulUsers, createLiNewUser, getLocalStorage, setLocalStorage);
  newLoggin(socketIo, ulMsg, divMsgs, createLiNewUser);
  receiveMessageAll(socketIo, ulMsg, divMsgs, createLiMsg);
  receiveMessagePrivate(
    socketIo, clicked, socketIdPrivate, meSocketId, ulMsg, divMsgs, createPrivateMsg,
  );
  receiveHistory(socketIo, ulMsg, divMsgs, createLiMsg, socketUser);
  historyPrivateMessage(
    socketIo, ulMsg, divMsgs, createPrivateMsg,
  );
  disconnectList(socketIo, ulUsers, createLiNewUser);
  disconnectUser(socketIo, socketUser, ulMsg, divMsgs, createLiNewUser);
};

module.exports = {
  setUserName,
  newLoggin,
  disconnectUser,
  disconnectList,
  onlineUsers,
  receiveMessageAll,
  receiveMessagePrivate,
  historyPrivateMessage,
  receiveHistory,
  randomNumber256,
  createLiNewUser,
  submitForm,
};
