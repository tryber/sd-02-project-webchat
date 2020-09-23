import { request } from '../../service';

async function handleSubmit({ body, event, history, setMessage, setUser, endpoint }) {
  event.preventDefault();

  const { data, error } = await request.postData({ body, endpoint });

  if (error) {
    return setMessage({ value: error.message, type: 'ALERT' });
  }

  const { token, ...user } = data;

  localStorage.setItem('token', token);

  setUser(user);

  history.push('/home');
}

export default handleSubmit;
