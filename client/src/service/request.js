import axios from 'axios';

const headers = () => ({ Authorization: localStorage.getItem('token') });

const BASE_URL = 'http://localhost:3001';

const handleError = ({ error = {} }) => {
  if (error.response) {
    return { error: { ...error.response.data.error, status: error.message } };
  }
  if (error.request || !error.message) {
    return {
      error: { message: 'Server internal error', status: error.message },
    };
  }
  return { error: { status: error.message } };
};

const postData = async ({ body, endpoint }) =>
  axios
    .post(`${BASE_URL}${endpoint}`, body, { headers: headers() })
    .catch((error) => handleError({ error }));

const getData = async ({ endpoint }) => {
  console.log(endpoint, headers());
  return axios
    .get(`${BASE_URL}${endpoint}`, { headers: headers() })
    .catch((error) => handleError({ error }));
};

const patchData = async (endpoint, params) =>
  axios
    .patch(endpoint, { ...params }, { headers: headers() })
    .catch((error) => handleError({ error }));

const validToken = async (endpoint) =>
  axios.get(endpoint, {
    headers: headers(),
  });

const postSale = async (endpoint, body) =>
  axios
    .post(endpoint, { ...body }, { headers: headers() })
    .catch((error) => handleError({ error }));

const getUser = async (endpoint) =>
  axios.get(endpoint, {
    headers: headers(),
  });

const request = { getData, patchData, postData, validToken, getUser, postSale };

export default request;
