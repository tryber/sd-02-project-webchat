window.onload = () => {
  messageData();
  loadMessages();
}

const messageData = () => (
  document
    .getElementById('submitValue')
    .addEventListener('click', () => {
      const message = document.getElementById('sendMessages');
      socket.emit('message', message.value);
    })
);

const loadMessages = () => {
  socket.on('serverResponse', (data) => {
    const chatTable = document
      .getElementById('chatMessages');
    const newCell = document.createElement('td');
    const newRow = document.createElement('tr');
    newRow.appendChild(newCell);
    chatTable.appendChild(newRow);
    newCell.innerHTML = data.message;
  });
}
