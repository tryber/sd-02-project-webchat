const chatService = require('./chatService');

const faker = require('faker');

describe('Chat Service', () => {
  describe('Create Chat', () => {
    it('on success', async () => {
      const mockDataSent = { ...faker.random.objectElement() };

      const mockDataReceived = {
        id: faker.random.number(),
        ...mockDataSent,
      };

      const mockModel = jest.fn().mockReturnValue({
        create: jest.fn().mockResolvedValue(mockDataReceived),
      });

      const data = await chatService.create({ data: mockDataSent, Model: mockModel });

      expect(mockModel).toHaveBeenCalledTimes(1);

      expect(mockModel).toHaveBeenCalledWith(mockDataSent);

      expect(data).toStrictEqual(mockDataReceived);
    });
  });

  describe('Find User', () => {
    it('on success', async () => {
      const mockId = faker.random.number();

      const mockDataSent = {
        id: faker.random.number(),
      };

      const mockDataUserReceived = {
        ...mockDataSent,
        ...faker.random.objectElement(),
      };

      const mockModel = jest.fn().mockReturnValue({
        find: jest.fn().mockResolvedValue(mockDataUserReceived),
      });

      const data = await chatService.find({ id: mockId, Model: mockModel });

      expect(mockModel).toHaveBeenCalledTimes(1);

      expect(mockModel).toHaveBeenCalledWith({ id: mockId });

      expect(data).toStrictEqual({
        data: mockDataUserReceived,
        error: null,
      });
    });

    it('on failure - user not found', async () => {
      const mockId = faker.random.number();

      const mockModel = jest.fn().mockReturnValue({
        find: jest.fn().mockResolvedValue(null),
      });

      const data = await chatService.find({ id: mockId, Model: mockModel });

      expect(mockModel).toHaveBeenCalledTimes(1);

      expect(mockModel).toHaveBeenCalledWith({ id: mockId });

      expect(data).toStrictEqual({ data: null, error: 'notFound' });
    });
  });

  describe('List Chat By UserId', () => {
    it('on success', async () => {
      const mockDataSent = {
        userId: faker.random.number(),
      };

      const createChat = () => ({
        id: faker.random.number(),
        createdAt: faker.date.recent(),
        title: faker.lorem.words(),
        users: new Array(10).fill(undefined).map(() => faker.random.word),
        userId: mockDataSent.userId,
      });

      const mockDataChatsReceived = new Array(10).fill(undefined).map(createChat);

      const mockListBy = jest.fn().mockReturnValue(mockDataChatsReceived);

      const mockModel = jest.fn().mockReturnValue({
        listBy: mockListBy,
      });

      const data = await chatService.listBy({ Model: mockModel, field: mockDataSent.chatId });

      expect(mockModel).toHaveBeenCalledTimes(1);

      expect(mockListBy).toHaveBeenCalledTimes(1);

      expect(mockListBy).toHaveBeenCalledWith(mockDataSent.chatId);

      expect(data).toStrictEqual({ data: mockDataChatsReceived, error: null });
    });

    it('on failure', async () => {
      const mockDataSent = {
        userId: faker.random.number(),
      };

      const mockListBy = jest.fn().mockReturnValue([]);

      const mockModel = jest.fn().mockReturnValue({
        listBy: mockListBy,
      });

      const data = await chatService.listBy({ Model: mockModel, field: mockDataSent.userId });

      expect(mockModel).toHaveBeenCalledTimes(1);

      expect(mockListBy).toHaveBeenCalledTimes(1);

      expect(mockListBy).toHaveBeenCalledWith(mockDataSent.userId);

      expect(data).toStrictEqual({ data: null, error: 'notFound' });
    });
  });

  describe('Remove Chat', () => {
    it('on success', async () => {
      const mockId = faker.random.number();

      const mockRemove = jest.fn();

      const mockModel = jest.fn().mockReturnValue({
        remove: mockRemove,
      });

      await chatService.remove({ id: mockId, Model: mockModel });

      expect(mockModel).toHaveBeenCalledTimes(1);

      expect(mockModel).toHaveBeenCalledWith({ id: mockId });

      expect(mockRemove).toHaveBeenCalledTimes(1);
    });
  });

  describe('Update Chat', () => {
    it('on success', async () => {
      const mockDataSent = {
        id: faker.random.number(),
        content: faker.lorem.words(),
      };

      const mockDataReceived = {
        id: mockDataSent.id,
        content: faker.lorem.words(),
        ...faker.random.objectElement(),
      };

      const mockUpdate = jest.fn().mockResolvedValueOnce(mockDataReceived);

      const mockModel = jest.fn().mockReturnValue({
        update: mockUpdate,
      });

      const data = await chatService.update({
        data: { content: mockDataSent.content },
        id: mockDataSent.id,
        Model: mockModel,
      });

      expect(mockModel).toHaveBeenCalledTimes(1);

      expect(mockModel).toHaveBeenCalledWith({ id: mockDataSent.id, ...mockDataSent });

      expect(mockUpdate).toHaveBeenCalledTimes(1);

      expect(data).toStrictEqual({
        data: mockDataReceived,
        error: null,
      });
    });

    it('on failure - Chat not found', async () => {
      const mockId = faker.random.number();

      const mockDataSent = {
        id: faker.random.number(),
        content: faker.lorem.words(),
      };

      const mockUpdate = jest.fn().mockResolvedValue(null);

      const mockModel = jest.fn().mockReturnValue({
        update: mockUpdate,
      });

      const data = await chatService.update({
        data: { content: mockDataSent.content },
        id: mockDataSent.id,
        Model: mockModel,
      });

      expect(mockModel).toHaveBeenCalledTimes(1);

      expect(mockModel).toHaveBeenCalledWith({ id: mockId, ...mockDataSent });

      expect(mockUpdate).toHaveBeenCalledTimes(1);

      expect(data).toStrictEqual({
        data: null,
        error: 'notFound',
      });
    });
  });
});
