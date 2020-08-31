const socket = io('http://localhost:4555');

const getMessages = async () => {
  const messages = document.getElementById('messages');

  const data = await fetch('http://localhost:3000/messages')
    .then((response) => response.json());

  messages.innerHTML = '';

  data.forEach(({ nickname, content, sentAt }) => {
    const child = document.createElement('div');
    child.innerHTML = `${nickname} disse: ${content} - ${(new Date(sentAt)).toLocaleString()}`;
    messages.appendChild(child);
  });
};

socket.on('notification', async ({ nickname, message }) => {
  await getMessages();
  const notification = document.getElementById('notification');
  notification.innerHTML = 'Nova mensagem!';
  setTimeout(() => notification.innerHTML = '', 5000);
});

const enableMessageSending = () => {
  const nicknameInput = document.getElementById('nickname-input');
  const messageInput = document.getElementById('message-input');
  const sendButton = document.getElementById('send-button');
  
  sendButton.addEventListener('click', async () => {
    const nickname = nicknameInput.value;
    const message = messageInput.value;

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
