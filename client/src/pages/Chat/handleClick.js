import { request } from '../../service';

async function handleClick({ e, content, id, setMessage, setUpdate, title }) {
  e.preventDefault();

  const body = {
    content,
    chatId: id,
    chatTitle: title,
  };

  const { error } = await request.postData({ body, endpoint: '/message' });

  if (error) {
    return setMessage({ value: error.message, type: 'ALERT' });
  }

  document.getElementById('ChatForm').reset();

  setUpdate((state) => !state);
}

export default handleClick;
