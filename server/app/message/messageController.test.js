const messageController = require('./messageController');

const faker = require('faker');

describe('Message Controller', () => {
  describe('Create Message', () => {
    it('on success', async () => {
      const mockMessageModel = jest.fn();

      const mockDataSent = { ...faker.random.objectElement() };

      const mockDataReceived = {
        id: faker.random.number(),
        ...mockDataSent,
      };

      const mockMessage = jest.fn().mockReturnValue({
        create: jest.fn().mockResolvedValue(mockDataReceived),
      });

      const mockReq = { body: mockDataSent };

      const mockJson = jest.fn();

      const mockRes = { status: jest.fn().mockReturnValue({ json: mockJson }) };

      const act = messageController.create({
        Message: mockMessage,
        messageModel: mockMessageModel,
      });

      await act(mockReq, mockRes);

      expect(mockMessage).toHaveBeenCalledTimes(1);

      expect(mockMessage).toHaveBeenCalledWith({ ...mockReq.body, messageModel: mockMessageModel });

      expect(mockRes.status).toHaveBeenCalledTimes(1);

      expect(mockRes.status).toHaveBeenCalledWith(201);

      expect(mockJson).toHaveBeenCalledTimes(1);

      expect(mockJson).toHaveBeenCalledWith({
        message: mockDataReceived,
      });
    });
  });

  describe('List Message By ChatId', () => {
    it('on success', async () => {
      const mockMessageModel = jest.fn();

      const mockChatId = faker.random.number();

      const createMessage = () => ({
        id: faker.random.number(),
        createdAt: faker.date.recent(),
        content: faker.lorem.words(),
        userId: faker.random.number(),
        chatId: mockChatId,
      });

      const mockDataReceived = new Array(10).fill(undefined).map(createMessage);

      const mockMessage = jest.fn().mockReturnValue({
        listBy: jest.fn().mockResolvedValue({ data: mockDataReceived, error: null }),
      });

      const mockJson = jest.fn();

      const mockReq = { params: { key: 'chatId', value: mockChatId } };

      const mockRes = { status: jest.fn().mockReturnValue({ json: mockJson }) };

      const act = messageController.listBy({
        Message: mockMessage,
        messageModel: mockMessageModel,
      });

      await act(mockReq, mockRes);

      expect(mockMessage).toHaveBeenCalledTimes(1);

      expect(mockMessage).toHaveBeenCalledWith({
        messageModel: mockMessageModel,
        chatId: mockChatId,
      });

      expect(mockRes.status).toHaveBeenCalledTimes(1);

      expect(mockRes.status).toHaveBeenCalledWith(200);

      expect(mockJson).toHaveBeenCalledTimes(1);

      expect(mockJson).toHaveBeenCalledWith({ messages: mockDataReceived });
    });
  });

  describe('Remove Message', () => {
    it('on success', async () => {
      const mockMessageModel = jest.fn();

      const mockId = faker.random.number();

      const mockMessage = jest.fn().mockReturnValue({
        remove: jest.fn(),
      });

      const mockReq = { params: { id: mockId } };

      const mockEnd = jest.fn();

      const mockRes = { status: jest.fn().mockReturnValue({ end: mockEnd }) };

      const act = messageController.remove({
        Message: mockMessage,
        messageModel: mockMessageModel,
      });

      await act(mockReq, mockRes);

      expect(mockMessage).toHaveBeenCalledTimes(1);

      expect(mockMessage).toHaveBeenCalledWith({ messageModel: mockMessageModel, id: mockId });

      expect(mockRes.status).toHaveBeenCalledTimes(1);

      expect(mockRes.status).toHaveBeenCalledWith(204);

      expect(mockEnd).toHaveBeenCalledTimes(1);
    });
  });

  describe('Update Message', () => {
    it('on success', async () => {
      const mockMessageModel = jest.fn();

      const mockId = faker.random.number();

      const mockDataSent = {
        id: faker.random.number(),
        content: faker.lorem.words(),
      };

      const mockDataReceived = {
        id: mockDataSent.id,
        content: faker.lorem.words(),
        ...faker.random.objectElement(),
      };

      const mockMessage = jest.fn().mockReturnValue({
        update: jest.fn().mockResolvedValue({ data: mockDataReceived, error: null }),
      });

      const mockReq = { params: { id: mockDataSent.id }, body: mockDataSent };

      const mockJson = jest.fn();

      const mockRes = { status: jest.fn().mockReturnValue({ json: mockJson }) };

      const act = messageController.update({
        Message: mockMessage,
        messageModel: mockMessageModel,
      });

      await act(mockReq, mockRes);

      expect(mockMessage).toHaveBeenCalledTimes(1);

      expect(mockMessage).toHaveBeenCalledWith({
        id: mockId,
        messageModel: mockMessageModel,
        ...mockReq.body,
      });

      expect(mockRes.status).toHaveBeenCalledTimes(1);

      expect(mockRes.status).toHaveBeenCalledWith(200);

      expect(mockJson).toHaveBeenCalledTimes(1);

      expect(mockJson).toHaveBeenCalledWith({ Message: mockDataReceived });
    });

    it('on failure - Message not found', async () => {
      const mockMessageModel = jest.fn();

      const mockDataSent = {
        id: faker.random.number(),
        nickname: faker.name.findName(),
      };

      const mockMessage = jest.fn().mockReturnValue({
        update: jest.fn().mockResolvedValue({ data: null, error: 'notFound' }),
      });

      const mockReq = { params: { id: mockDataSent.id }, body: mockDataSent };

      const mockRes = jest.fn();

      const act = messageController.update({
        Message: mockMessage,
        messageModel: mockMessageModel,
      });

      try {
        await act(mockReq, mockRes);
      } catch (err) {
        const {
          output: {
            payload: { statusCode, message },
          },
        } = err;

        expect(statusCode).toBe(400);

        expect(message).toBe('Mensagem não encontrada');
      } finally {
        expect(mockMessage).toHaveBeenCalledTimes(1);

        expect(mockMessage).toHaveBeenCalledWith({
          id: mockDataSent.id,
          messageModel: mockMessageModel,
          ...mockReq.body,
        });

        expect(mockRes).toHaveBeenCalledTimes(0);
      }
    });
  });
});
