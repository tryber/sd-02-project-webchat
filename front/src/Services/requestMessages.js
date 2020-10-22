import axios from 'axios';

const url = 'http://localhost:3001/messages';

export const getLatestMessages = async () =>
  axios.get(url)
    .then((data) => data);

export const getPrivateMessages = async (sendUser, receiveUser) =>
  axios.get(`${url}/private/${sendUser};${receiveUser}`)
    .then((data) => data);
