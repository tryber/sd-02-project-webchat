import { request } from '../../service';

async function handleSubmit({ body, e, endpoint, history, setMessage, setUser }) {
  e.preventDefault();

  const { data, error } = await request.postData({ body, endpoint });

  if (error) {
    return setMessage({ value: error.message, type: 'ALERT' });
  }

  localStorage.setItem('token', data.token);

  const { error: errorUpdate } = await request.patchData({
    endpoint: `/user/${data.user._id}`,
    body: { isOnline: true },
  });

  if (errorUpdate) {
    return setMessage({ value: errorUpdate.message, type: 'ALERT' });
  }

  setUser(data.user);

  history.push('/chat/bolichat');
}

export default handleSubmit;
