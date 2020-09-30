import { request } from '../../service';

async function handleClick({ e, friend, user, setMessage, history }) {
  e.preventDefault();

  const { data, error } = await request.getData({
    endpoint: `/chat?key=users&value=${[friend, user]}&isPrivate=true`,
  });

  if (error) {
    return setMessage({ value: error.message, type: 'ALERT' });
  }

  if (data.chats.length === 0) {
    const { data: createdData, error: createdError } = await request.postData({
      body: { isPrivate: true, users: [friend, user] },
      endpoint: '/chat',
    });

    if (createdError) {
      return setMessage({ value: error.message, type: 'ALERT' });
    }

    return history.push(`/chat/${createdData.chat._id}`);
  }

  return history.push(`/chat/${data.chats[0]._id}`);
}

export default handleClick;
