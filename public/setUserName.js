function setUserName(randomNumber256, socket, newName) {
  let newUserName = newName('Qual seu nome?');
  if (!newUserName) {
    newUserName = `User${randomNumber256()}`;
  }
  socket.emit('loginUser', { user: newUserName, newEmit: true });
  return newUserName;
}

module.exports = setUserName;
