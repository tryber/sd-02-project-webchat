import axios from 'axios'; 

const getMessages = async () =>
  axios
    .get(`${process.env.REACT_APP_ENDPOINT_AXIOS}/chat`);

const getUsers = async () =>
  axios
    .get(`${process.env.REACT_APP_ENDPOINT_AXIOS}/user`);

const addUser = async (nickname) =>
  axios
    .post(`${process.env.REACT_APP_ENDPOINT_AXIOS}/user`, { nickname });

export { getMessages, getUsers, addUser };
