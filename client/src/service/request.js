const headers = () => ({ Authorization: localStorage.getItem('token') });

const enpoints = {
  LOGIN: '/user/login',
};

const mockUser = {
  id: 1,
  email: 'bolivar.anderson@hotmail.com',
  avatar: null,
  status: 'queria star morta',
  token: 'çasjdklfjasçldjfçlajsdçf',
};

const postData = async ({ body, flag }) => mockUser;

const request = {
  postData,
};

export default request;
