import axios from 'axios';

const url = 'http://localhost:3001/messages';

const getLatestMessages = async () =>
  axios.get(url)
    .then((data) => data);

export default getLatestMessages;
