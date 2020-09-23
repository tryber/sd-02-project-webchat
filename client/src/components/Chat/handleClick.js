import { request } from '../../service';

async function handleClick({ event, content, id, setMessage, setUpdate }) {
  event.preventDefault();

  const body = {
    content,
    chatId: id,
  };

  const { data, error } = await request.postData({ body, endpoint: '/message' });
  console.log(error, data);
  if (error) {
    return setMessage({ value: error.message, type: 'ALERT' });
  }

  setUpdate((state) => !state);
}

export default handleClick;
