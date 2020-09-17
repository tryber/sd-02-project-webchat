import { request } from '../../service';

async function handleSubmit({ body, event, history, setMessage, setUser, type }) {
  event.preventDefault();

  const { data, error } = await request.postData({ body, type });

  if (error) {
    return setMessage({ content: error.message, type: 'ALERT' });
  }

  if (type === 'REGISTER') {
    setMessage({ content: 'User registered with success', type: 'SUCCESS' });
  }

  const { token, ...user } = data;

  localStorage.setItem('token', token);

  setUser(user);

  history.push('/home');
}

export default handleSubmit;
