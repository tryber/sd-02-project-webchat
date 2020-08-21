const socket = io('http://localhost:4555');
let name = '';

function messageCreate({ user, date, message }) {
  const pTag = document.createElement('p');
  pTag.innerText = `${date} - ${user} - ${message}`;
  document.querySelector('.containMessages').appendChild(pTag);
}

async function initialComments() {
  const { data } = await axios.get('http://localhost:3000/users');
  const arrayMessages = data
    .reduce(
      (acc, curr) => [
        ...acc,
        ...(curr.message.map((ele) => ({
          date: new Date(ele.date),
          message: ele.content,
          user: curr.name,
        })) || {}),
      ],
      [],
    )
    .sort((a, b) => a.date - b.date);
  arrayMessages.forEach((message) => {
    messageCreate({ ...message, date: message.date.toLocaleString() });
  });
}

function onSubmit() {
  const form = document.querySelector('.form-input');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!document.querySelector('.input').value) {
      alert('Você deve digitar uma mensagem');
      return;
    }
    socket.emit('message', { user: name, message: document.querySelector('.input').value });
    document.querySelector('.input').value = '';
  });
}

function scroll() {
  const objScrDiv = document.querySelector('.containMessages');
  objScrDiv.scrollTop = objScrDiv.scrollHeight;
}

function promptName() {
  name = prompt('Digite seu nome:', 'Robson Cruzoe');
  if (!name) return promptName();
  socket.emit('user', { name });
}
socket.on('new Message', (data) => {
  messageCreate(data);
  scroll();
});

window.onload = () => {
  promptName();
  onSubmit();
  initialComments();
};
