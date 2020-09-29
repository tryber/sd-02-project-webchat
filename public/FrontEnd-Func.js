function setUserName(randomNumber256, socket, newName) {
  let newUserName = newName('Qual seu nome?');
  if (!newUserName) {
    newUserName = `User${randomNumber256()}`;
  }
  socket.emit('loginUser', { user: newUserName, newEmit: true });
  return newUserName;
}

function newLoggin(socket, socketUser, ulMsg, divMsgs, createLiNewUser) {
  socket.on('loggedUser', (msg) => {
    if (socketUser === 'Geral') {
      ulMsg.append(createLiNewUser(msg, 'msgContainer', 'userName'));
      divMsgs.scrollTop = divMsgs.scrollHeight;
    }
  });
}

function disconnectUser(socket, socketUser, ulMsg, divMsgs, createLiNewUser) {
  socket.on('disconnectChat', (msg) => {
    if (socketUser === 'Geral') {
      ulMsg.append(createLiNewUser(msg, 'msgContainer', 'userName'));
      divMsgs.scrollTop = divMsgs.scrollHeight;
    }
  });
}

function disconnectList(socket, ulUsers, createLiNewUser) {
  socket.on('disconnectList', (users) => {
    ulUsers.innerText = '';
    ulUsers.append(createLiNewUser('Geral', 'onlineUser', 'onlineSpan'));
    users.forEach(({ user }) => {
      ulUsers.append(createLiNewUser(user, 'onlineUser', 'onlineSpan'));
    });
  });
}

function onlineUsers(socket, ulUsers, createLiNewUser, userName, meSocketId) {
  socket.on('onlineList', ({ users }) => {
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
  return meSocketId;
}

// function receiveMessagePrivate(socket, clicked, socketIdPrivate, ulMsg, createPrivateMsg, divMsgs) {
//   socket.on('messagePrivate', ({ modelAnswer: { user, message, date }, meSocket }) => {
//     if (
//       ((user !== undefined) && (clicked) && (meSocket === socketIdPrivate))
//       || ((user !== undefined) && (clicked) && meSocket === meSocketId)
//     ) {
//       ulMsg.append(createPrivateMsg({ user, message, date }));
//       divMsgs.scrollTop = divMsgs.scrollHeight;
//     }
//   });
// }

// function historyPrivateMessage(socket, clicked, socketIdPrivate, ulMsg, createPrivateMsg, divMsgs) {
//   socket.on('mePrivateHistory', ({ modelAnswer: { user, message, date }, meSocket }) => {
//     if (
//       ((user !== undefined) && (clicked) && (meSocket === socketIdPrivate))
//       || ((user !== undefined) && (clicked) && meSocket === meSocketId)
//     ) {
//       ulMsg.append(createPrivateMsg({ user, message, date }));
//       divMsgs.scrollTop = divMsgs.scrollHeight;
//     }
//   });
// }

module.exports = {
  setUserName,
  newLoggin,
  disconnectUser,
  disconnectList,
  onlineUsers,
  // receiveMessagePrivate,
  // historyPrivateMessage,
};
