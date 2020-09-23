const request = require('supertest');

const faker = require('faker');

const chatId = require('mongoose').Types.ObjectId();

const mockChatId = `${chatId}`;

const { app } = require('../../apps');

afterEach(async () => {
  jest.clearAllMocks();
});

jest.setTimeout(30000);

async function getToken() {}

describe('Message Router', () => {
  let mockToken, mockId;

  const mockContent = faker.lorem.words();

  const mockNickname = faker.name.firstName();

  const mockUser = {
    email: faker.internet.email(),
    nickname: mockNickname,
    password: faker.internet.password(),
  };

  describe('Post /message', () => {
    it('on succes - create message', async () => {
      const mockDataSent = {
        chatId: mockChatId,
        content: mockContent,
      };

      const {
        body: {
          token: mockToken,
          user: { _id: mockUserId },
        },
      } = await request.agent(app).post('/user').send(mockUser);

      const response = await request
        .agent(app)
        .post('/message')
        .set('Authorization', mockToken)
        .send(mockDataSent);

      expect(response.error).toBeFalsy();

      expect(response.status).toBe(201);

      expect(response.body.message._id).toBeTruthy();

      mockId = response.body.message._id;

      expect(response.body.message.content).toBe(mockContent);

      expect(response.body.message.chatId).toBe(mockChatId);

      expect(response.body.message.nickname).toBe(mockNickname);

      await request.agent(app).delete(`/user/${mockUserId}`).set('Authorization', mockToken);
    });

    it('on failure - invalid data', async () => {
      const mockDataSent = {
        chatId: mockChatId,
        content: '',
      };

      const {
        body: {
          token: mockToken,
          user: { _id: mockUserId },
        },
      } = await request.agent(app).post('/user').send(mockUser);

      const mockError = {
        error: {
          details: ['content is not allowed to be empty'],
          message: 'Invalid Data',
        },
      };

      const response = await request
        .agent(app)
        .post('/message')
        .set('Authorization', mockToken)
        .send(mockDataSent);

      expect(response.status).toBe(400);

      expect(JSON.parse(response.text)).toStrictEqual(mockError);

      await request.agent(app).delete(`/user/${mockUserId}`).set('Authorization', mockToken);
    });
  });

  describe('Get /message', () => {
    it('on succes - list messages', async () => {
      const {
        body: {
          token: mockToken,
          user: { _id: mockUserId },
        },
      } = await request.agent(app).post('/user').send(mockUser);

      const response = await request
        .agent(app)
        .get(`/message`)
        .query({ key: 'chatId', value: mockChatId })
        .set('Authorization', mockToken);

      const messages = JSON.parse(response.text).messages;
      console.log(response.body);
      expect(response.status).toBe(200);

      expect(messages[messages.length - 1].content).toBe(mockContent);

      await request.agent(app).delete(`/user/${mockUserId}`).set('Authorization', mockToken);
    });

    it('on failure - no authentication', async () => {
      const mockError = {
        error: {
          details: null,
          message: 'Token not found',
        },
      };

      const response = await request.agent(app).get('/message');

      expect(response.status).toBe(401);

      expect(JSON.parse(response.text)).toStrictEqual(mockError);
    });
  });

  describe('Patch  /message/id', () => {
    it('on success - change nickname', async () => {
      const mockmessage = {
        friends: [],
        _id: mockId,
        email: mockEmail,
        nickname: mockNewNickname,
      };

      const response = await request
        .agent(app)
        .patch(`/message/${mockId}`)
        .set('Authorization', mockToken)
        .send({ nickname: mockNewNickname });
      console.log(mockToken);
      console.log(response.text);
      expect(response.status).toBe(200);

      expect(JSON.parse(response.text)).toStrictEqual({ message: mockmessage });
    });

    it('on failure - no authentication', async () => {
      const mockError = {
        error: {
          details: null,
          message: 'Token not found',
        },
      };

      const response = await request
        .agent(app)
        .patch(`/message/${mockId}`)
        .send({ nickname: mockNewNickname });

      expect(response.status).toBe(401);

      expect(JSON.parse(response.text)).toStrictEqual(mockError);
    });

    // it('on failure - message not found', async () => {
    //   const mockError = {
    //     error: {
    //       details: null,
    //       message: 'Usuário não encontrado',
    //     },
    //   };

    //   const response = await request
    //     .agent(app)
    //     .patch(`/message/${mockId}`)
    //     .set('Authorization', mockToken)
    //     .send({ nickname: mockNewNickname });
    //   console.log(response.text);
    //   expect(response.status).toBe(400);

    //   expect(JSON.parse(response.text)).toStrictEqual(mockError);
    // });
  });

  describe('Get  /message/id', () => {
    it('on succes - find message', async () => {
      const mockmessage = {
        friends: [],
        _id: mockId,
        email: mockEmail,
        nickname: mockNewNickname,
      };

      const response = await request
        .agent(app)
        .get(`/message/${mockId}`)
        .set('Authorization', mockToken);

      expect(response.status).toBe(200);

      expect(JSON.parse(response.text)).toStrictEqual({ message: mockmessage });
    });

    it('on failure - no authentication', async () => {
      const mockError = {
        error: {
          details: null,
          message: 'Token not found',
        },
      };

      const response = await request.agent(app).get(`/message/${mockId}`);

      expect(response.status).toBe(401);

      expect(JSON.parse(response.text)).toStrictEqual(mockError);
    });
  });

  describe('Delete  /message/id', () => {
    it('on succes', async () => {
      const response = await request
        .agent(app)
        .delete(`/message/${mockId}`)
        .set('Authorization', mockToken);

      expect(response.status).toBe(204);
    });
  });

  describe('message not found', () => {
    it('GET /message/id', async () => {
      const mockError = {
        error: {
          details: null,
          message: 'Error by looking a message with this token',
        },
      };

      const response = await request
        .agent(app)
        .get(`/message/${mockId}`)
        .set('Authorization', mockToken);

      expect(response.status).toBe(401);

      expect(JSON.parse(response.text)).toStrictEqual(mockError);
    });
  });
});
