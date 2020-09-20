const chatController = require('./chatController');

const faker = require('faker');

describe('Chat Controller', () => {
  describe('Create Chat', () => {
    it('on success', async () => {
      const mockChatModel = jest.fn();

      const mockDataSent = { ...faker.random.objectElement() };

      const mockDataReceived = {
        id: faker.random.number(),
        ...mockDataSent,
      };

      const mockChat = jest.fn().mockReturnValue({
        create: jest.fn().mockResolvedValue(mockDataReceived),
      });

      const mockReq = { body: mockDataSent };

      const mockJson = jest.fn();

      const mockRes = { status: jest.fn().mockReturnValue({ json: mockJson }) };

      const act = chatController.create({
        Chat: mockChat,
        chatModel: mockChatModel,
      });

      await act(mockReq, mockRes);

      expect(mockChat).toHaveBeenCalledTimes(1);

      expect(mockChat).toHaveBeenCalledWith({ ...mockReq.body, chatModel: mockChatModel });

      expect(mockRes.status).toHaveBeenCalledTimes(1);

      expect(mockRes.status).toHaveBeenCalledWith(201);

      expect(mockJson).toHaveBeenCalledTimes(1);

      expect(mockJson).toHaveBeenCalledWith({
        chat: mockDataReceived,
      });
    });
  });

  describe('List Chat By ChatId', () => {
    it('on success', async () => {
      const mockChatModel = jest.fn();

      const mockChatId = faker.random.number();

      const createChat = () => ({
        id: faker.random.number(),
        createdAt: faker.date.recent(),
        content: faker.lorem.words(),
        userId: faker.random.number(),
        chatId: mockChatId,
      });

      const mockDataReceived = new Array(10).fill(undefined).map(createChat);

      const mockChat = jest.fn().mockReturnValue({
        listBy: jest.fn().mockResolvedValue({ data: mockDataReceived, error: null }),
      });

      const mockJson = jest.fn();

      const mockReq = { params: { key: 'chatId', value: mockChatId } };

      const mockRes = { status: jest.fn().mockReturnValue({ json: mockJson }) };

      const act = chatController.listBy({
        Chat: mockChat,
        chatModel: mockChatModel,
      });

      await act(mockReq, mockRes);

      expect(mockChat).toHaveBeenCalledTimes(1);

      expect(mockChat).toHaveBeenCalledWith({
        chatModel: mockChatModel,
        chatId: mockChatId,
      });

      expect(mockRes.status).toHaveBeenCalledTimes(1);

      expect(mockRes.status).toHaveBeenCalledWith(200);

      expect(mockJson).toHaveBeenCalledTimes(1);

      expect(mockJson).toHaveBeenCalledWith({ chats: mockDataReceived });
    });

    it('on failure - Chat not found', async () => {
      const mockChatModel = jest.fn();

      const mockChat = jest.fn().mockReturnValue({
        listBy: jest.fn().mockResolvedValue({ data: null, error: 'notFound' }),
      });

      const mockRes = jest.fn();

      const mockChatId = faker.random.number();

      const mockReq = { params: { key: 'chatId', value: mockChatId } };

      const act = chatController.listBy({
        Chat: mockChat,
        chatModel: mockChatModel,
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

        expect(message).toBe('Chat não encontrado');
      } finally {
        expect(mockChat).toHaveBeenCalledTimes(1);

        expect(mockChat).toHaveBeenCalledWith({
          chatModel: mockChatModel,
          chatId: mockChatId,
        });

        expect(mockRes).toHaveBeenCalledTimes(0);
      }
    });
  });

  describe('Remove Chat', () => {
    it('on success', async () => {
      const mockChatModel = jest.fn();

      const mockId = faker.random.number();

      const mockChat = jest.fn().mockReturnValue({
        remove: jest.fn(),
      });

      const mockReq = { params: { id: mockId } };

      const mockEnd = jest.fn();

      const mockRes = { status: jest.fn().mockReturnValue({ end: mockEnd }) };

      const act = chatController.remove({
        Chat: mockChat,
        chatModel: mockChatModel,
      });

      await act(mockReq, mockRes);

      expect(mockChat).toHaveBeenCalledTimes(1);

      expect(mockChat).toHaveBeenCalledWith({ chatModel: mockChatModel, id: mockId });

      expect(mockRes.status).toHaveBeenCalledTimes(1);

      expect(mockRes.status).toHaveBeenCalledWith(204);

      expect(mockEnd).toHaveBeenCalledTimes(1);
    });
  });

  describe('Update Chat', () => {
    it('on success', async () => {
      const mockChatModel = jest.fn();

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

      const mockChat = jest.fn().mockReturnValue({
        update: jest.fn().mockResolvedValue({ data: mockDataReceived, error: null }),
      });

      const mockReq = { params: { id: mockDataSent.id }, body: mockDataSent };

      const mockJson = jest.fn();

      const mockRes = { status: jest.fn().mockReturnValue({ json: mockJson }) };

      const act = chatController.update({
        Chat: mockChat,
        chatModel: mockChatModel,
      });

      await act(mockReq, mockRes);

      expect(mockChat).toHaveBeenCalledTimes(1);

      expect(mockChat).toHaveBeenCalledWith({
        id: mockId,
        chatModel: mockChatModel,
        ...mockReq.body,
      });

      expect(mockRes.status).toHaveBeenCalledTimes(1);

      expect(mockRes.status).toHaveBeenCalledWith(200);

      expect(mockJson).toHaveBeenCalledTimes(1);

      expect(mockJson).toHaveBeenCalledWith({ chat: mockDataReceived });
    });

    it('on failure - Chat not found', async () => {
      const mockChatModel = jest.fn();

      const mockDataSent = {
        id: faker.random.number(),
        nickname: faker.name.findName(),
      };

      const mockChat = jest.fn().mockReturnValue({
        update: jest.fn().mockResolvedValue({ data: null, error: 'notFound' }),
      });

      const mockReq = { params: { id: mockDataSent.id }, body: mockDataSent };

      const mockRes = jest.fn();

      const act = chatController.update({
        Chat: mockChat,
        chatModel: mockChatModel,
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

        expect(message).toBe('Chat não encontrado');
      } finally {
        expect(mockChat).toHaveBeenCalledTimes(1);

        expect(mockChat).toHaveBeenCalledWith({
          id: mockDataSent.id,
          chatModel: mockChatModel,
          ...mockReq.body,
        });

        expect(mockRes).toHaveBeenCalledTimes(0);
      }
    });
  });
});
