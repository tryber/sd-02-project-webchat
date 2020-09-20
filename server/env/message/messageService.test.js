const MessageService = require('./messageService');

const faker = require('faker');

describe('Message Service', () => {
  describe('Create Message', () => {
    it('on success', async () => {
      const mockDataSent = { ...faker.random.objectElement() };

      const mockDataReceived = {
        id: faker.random.number(),
        ...mockDataSent,
      };

      const mockModel = jest.fn().mockReturnValue({
        create: jest.fn().mockResolvedValue(mockDataReceived),
      });

      const data = await MessageService.create({ data: mockDataSent, Model: mockModel });

      expect(mockModel).toHaveBeenCalledTimes(1);

      expect(mockModel).toHaveBeenCalledWith(mockDataSent);

      expect(data).toStrictEqual(mockDataReceived);
    });
  });

  describe('List Message By ChatId', () => {
    it('on success', async () => {
      const mockDataSent = {
        chatId: faker.random.number(),
      };

      const createMessage = () => ({
        id: faker.random.number(),
        createdAt: faker.date.recent(),
        content: faker.lorem.words(),
        userId: faker.random.number(),
        chatId: mockDataSent.chatId,
      });

      const mockDataMessagesReceived = new Array(10).fill(undefined).map(createMessage);

      const mockListBy = jest.fn().mockReturnValue(mockDataMessagesReceived);

      const mockModel = jest.fn().mockReturnValue({
        listBy: mockListBy,
      });

      const data = await MessageService.listBy({ Model: mockModel, field: mockDataSent.chatId });

      expect(mockModel).toHaveBeenCalledTimes(1);

      expect(mockListBy).toHaveBeenCalledTimes(1);

      expect(mockListBy).toHaveBeenCalledWith(mockDataSent.chatId);

      expect(data).toStrictEqual({ data: mockDataMessagesReceived, error: null });
    });

    it('on failure', async () => {
      const mockDataSent = {
        chatId: faker.random.number(),
      };

      const mockListBy = jest.fn().mockReturnValue([]);

      const mockModel = jest.fn().mockReturnValue({
        listBy: mockListBy,
      });

      const data = await MessageService.listBy({ Model: mockModel, field: mockDataSent.chatId });

      expect(mockModel).toHaveBeenCalledTimes(1);

      expect(mockListBy).toHaveBeenCalledTimes(1);

      expect(mockListBy).toHaveBeenCalledWith(mockDataSent.chatId);

      expect(data).toStrictEqual({ data: null, error: 'notFound' });
    });
  });

  describe('Remove Message', () => {
    it('on success', async () => {
      const mockId = faker.random.number();

      const mockRemove = jest.fn();

      const mockModel = jest.fn().mockReturnValue({
        remove: mockRemove,
      });

      await MessageService.remove({ id: mockId, Model: mockModel });

      expect(mockModel).toHaveBeenCalledTimes(1);

      expect(mockModel).toHaveBeenCalledWith({ id: mockId });

      expect(mockRemove).toHaveBeenCalledTimes(1);
    });
  });

  describe('Update Message', () => {
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

      const data = await MessageService.update({
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

    it('on failure - Message not found', async () => {
      const mockId = faker.random.number();

      const mockDataSent = {
        id: faker.random.number(),
        content: faker.lorem.words(),
      };

      const mockUpdate = jest.fn().mockResolvedValue(null);

      const mockModel = jest.fn().mockReturnValue({
        update: mockUpdate,
      });

      const data = await MessageService.update({
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
