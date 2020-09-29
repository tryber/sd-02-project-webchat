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

module.exports = {
  setUserName,
  newLoggin,
  disconnectUser,
  disconnectList,
};
