import axios from 'axios';

const url = 'http://localhost:3001/onlineUsers';

const getOnlineUsers = async () =>
  axios.get(url)
    .then((data) => data);

export default getOnlineUsers;
