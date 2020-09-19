const MessageService = require('./messageService');

const faker = require('faker');

describe('Message Service', () => {
  describe('Create Message', () => {
    it('on success', async () => {
      const mockDataMessageSent = {
        createdAt: faker.date.recent(),
        content: faker.lorem.words(),
        userId: faker.random.number(),
        chatId: faker.random.number(),
      };

      const mockDataMessageReceived = {
        id: faker.random.number(),
        createdAt: mockDataMessageSent.createdAt,
        content: mockDataMessageSent.content,
        userId: mockDataMessageSent.userId,
        chatId: mockDataMessageSent.chatId,
      };

      const mockModel = jest.fn().mockReturnValue({
        create: jest.fn().mockResolvedValue(mockDataMessageReceived),
      });

      const data = await MessageService.create({ data: mockDataMessageSent, Model: mockModel });

      expect(mockModel).toHaveBeenCalledTimes(1);

      expect(mockModel).toHaveBeenCalledWith(mockDataMessageSent);

      expect(data).toStrictEqual(mockDataMessageReceived);
    });
  });

  describe('Find Message', () => {
    it('on success', async () => {
      const mockDataMessageSent = {
        id: faker.random.number(),
      };

      const mockDataMessageReceived = {
        id: mockDataMessageSent.id,
        createdAt: faker.date.recent(),
        content: faker.lorem.words(),
        userId: faker.random.number(),
        chatId: faker.random.number(),
      };

      const mockModel = jest.fn().mockReturnValue({
        find: jest.fn().mockResolvedValue(mockDataMessageReceived),
      });

      const data = await MessageService.find({ id: mockDataMessageSent.id, Model: mockModel });

      expect(mockModel).toHaveBeenCalledTimes(1);

      expect(mockModel).toHaveBeenCalledWith({ id: mockDataMessageSent.id });

      expect(data).toStrictEqual({ data: mockDataMessageReceived, error: null });
    });

    it('on failure - Message not found', async () => {
      const mockId = faker.random.number();

      const mockModel = jest.fn().mockReturnValue({
        find: jest.fn().mockResolvedValue(null),
      });

      const data = await MessageService.find({ id: mockId, Model: mockModel });

      expect(mockModel).toHaveBeenCalledTimes(1);

      expect(mockModel).toHaveBeenCalledWith({ id: mockId });

      expect(data).toStrictEqual({ data: null, error: 'notFound' });
    });
  });

  describe('List Message', () => {
    it('on success', async () => {
      const createMessage = () => ({
        id: faker.random.number(),
        title: faker.name.title(),
        content: faker.lorem.text(),
        user: {
          id: faker.random.number(),
          email: faker.internet.email(),
          displayName: faker.name.findName(),
          image: faker.internet.url(),
        },
        published: faker.date.past(),
        updated: faker.date.recent(),
      });

      const mockDataMessagesReceived = new Array(10).fill(undefined).map(createMessage);

      const mockModel = jest.fn().mockReturnValue({
        list: jest.fn().mockResolvedValue(mockDataMessagesReceived),
      });

      const data = await MessageService.listBy({ Model: mockModel });

      expect(mockModel).toHaveBeenCalledTimes(1);

      expect(data).toStrictEqual(mockDataMessagesReceived);
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

  describe('Search Message', () => {
    it('on success', async () => {
      const mockName = faker.lorem.word();

      const createMessage = () => ({
        id: faker.random.number(),
        title: faker.name.title(),
        content: faker.lorem.text(),
        user: {
          id: faker.random.number(),
          email: faker.internet.email(),
          displayName: faker.name.findName(),
          image: faker.internet.url(),
        },
        published: faker.date.past(),
        updated: faker.date.recent(),
      });

      const mockDataMessageReceived = new Array(5).fill(undefined).map(createMessage);

      const mockFindBy = jest.fn().mockResolvedValue(mockDataMessageReceived);

      const mockModel = jest.fn().mockReturnValue({
        findBy: mockFindBy,
      });

      const data = await MessageService.search({ name: mockName, Model: mockModel });

      expect(mockModel).toHaveBeenCalledTimes(1);

      expect(mockFindBy).toHaveBeenCalledWith(mockName);

      expect(data).toStrictEqual({ data: mockDataMessageReceived, error: null });
    });

    it('on failure - post not found', async () => {
      const mockName = faker.lorem.word();

      const mockFindBy = jest.fn().mockResolvedValue([]);

      const mockModel = jest.fn().mockReturnValue({
        findBy: mockFindBy,
      });

      const data = await MessageService.search({ name: mockName, Model: mockModel });

      expect(mockModel).toHaveBeenCalledTimes(1);

      expect(mockFindBy).toHaveBeenCalledWith(mockName);

      expect(data).toStrictEqual({ data: null, error: 'notFound' });
    });
  });

  describe('Update Message', () => {
    it('on success', async () => {
      const mockId = faker.random.number();

      const mockDataMessageSent = {
        title: faker.name.title(),
        content: faker.lorem.text(),
      };

      const mockDataMessageReceived = {
        id: mockId,
        title: mockDataMessageSent.title,
        content: mockDataMessageSent.content,
        user: {
          id: faker.random.number(),
          email: faker.internet.email(),
          displayName: faker.name.findName(),
          image: faker.internet.url(),
        },
        published: faker.date.past(),
        updated: faker.date.recent(),
      };

      const mockUpdate = jest.fn().mockResolvedValue();

      const mockModel = jest.fn().mockReturnValue({
        find: jest.fn().mockResolvedValueOnce(true).mockResolvedValueOnce(mockDataMessageReceived),
        update: mockUpdate,
      });

      const data = await MessageService.update({
        data: mockDataMessageSent,
        id: mockId,
        Model: mockModel,
      });

      expect(mockModel).toHaveBeenCalledTimes(1);

      expect(mockModel).toHaveBeenCalledWith({ id: mockId, ...mockDataMessageSent });

      expect(mockUpdate).toHaveBeenCalledTimes(1);

      expect(data).toStrictEqual({
        data: mockDataMessageReceived,
        error: null,
      });
    });

    it('on failure - Message not found', async () => {
      const mockId = faker.random.number();

      const mockDataMessageSent = {
        displayName: faker.name.findName(),
      };

      const mockUpdate = jest.fn().mockResolvedValue();

      const mockModel = jest.fn().mockReturnValue({
        find: jest.fn().mockResolvedValueOnce(false),
        update: mockUpdate,
      });

      const data = await MessageService.update({
        data: mockDataMessageSent,
        id: mockId,
        Model: mockModel,
      });

      expect(mockModel).toHaveBeenCalledTimes(1);

      expect(mockModel).toHaveBeenCalledWith({ id: mockId, ...mockDataMessageSent });

      expect(mockUpdate).toHaveBeenCalledTimes(0);

      expect(data).toStrictEqual({
        data: null,
        error: 'notFound',
      });
    });
  });
});
