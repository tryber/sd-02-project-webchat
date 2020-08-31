const socket = io('http://localhost:4555');

const getMessages = async () => {
  const messagesElement = document.getElementById('messages');

  const messages = await fetch('http://localhost:3000/messages')
    .then((response) => response.json())
    .then((data) => data.map((msg) => ({
      ...msg,
      sentAt: new Date(msg.sentAt),
    })))
    .then((messages) => messages.sort((a, b) => a.sentAt - b.sentAt));

  messagesElement.innerHTML = '';

  messages.forEach(({ nickname, content, sentAt }) => {
    const msgChild = document.createElement('div');
    msgChild.innerHTML = `${sentAt.toLocaleString()} - ${nickname} disse: ${content}`;
    messagesElement.appendChild(msgChild);
  });
};

socket.on('notification', async () => {
  await getMessages();
});

const enableMessageSending = () => {
  const nicknameInput = document.getElementById('nickname-input');
  const messageInput = document.getElementById('message-input');
  const sendButton = document.getElementById('send-button');
  
  sendButton.addEventListener('click', async () => {
    const nickname = nicknameInput.value;
    const message = messageInput.value;

    if (!nickname || !message) return;

    nicknameInput.disabled = true;
    messageInput.value = '';

    await fetch('http://localhost:3000/messages', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ nickname, message }),
    });
  });
};

window.onload = async () => {
  enableMessageSending();
  await getMessages();
};
