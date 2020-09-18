const MessageRepository = require('./messageRepository');

const faker = require('faker');

describe('Message Repository', () => {
  it('Create Message', async () => {
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

    const mockCreate = jest.fn().mockResolvedValue(mockDataMessageReceived);

    const mockModels = {
      Messages: {
        create: mockCreate,
      },
    };

    const repository = new MessageRepository({ models: mockModels, data: mockDataMessageSent });

    const data = await repository.create();

    expect(mockCreate).toHaveBeenCalledTimes(1);

    expect(mockCreate).toHaveBeenCalledWith(mockDataMessageSent);

    expect(data).toStrictEqual(mockDataMessageReceived);
  });

  it('Find Message', async () => {
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

    const mockFind = jest.fn().mockResolvedValue(mockDataMessageReceived);

    const mockModels = {
      Messages: {
        find: mockFind,
      },
    };

    const repository = new MessageRepository({ models: mockModels, data: mockDataMessageSent });

    const data = await repository.find();

    expect(mockFind).toHaveBeenCalledTimes(1);

    expect(mockFind).toHaveBeenCalledWith({ _id: mockDataMessageSent.id });

    expect(data).toStrictEqual(mockDataMessageReceived);
  });

  it('Find Message By UserId', async () => {
    const mockDataMessageSent = {
      id: faker.random.number(),
      userId: faker.random.number(),
    };

    const mockDataMessageReceived = {
      id: mockDataMessageSent.id,
      createdAt: faker.date.recent(),
      content: faker.lorem.words(),
      userId: mockDataMessageSent.userId,
      chatId: faker.random.number(),
    };

    const mockFind = jest.fn().mockResolvedValue(mockDataMessageReceived);

    const mockModels = {
      Messages: {
        find: mockFind,
      },
    };

    const repository = new MessageRepository({ models: mockModels, data: mockDataMessageSent });

    const data = await repository.findBy('email');

    expect(mockFind).toHaveBeenCalledTimes(1);

    expect(mockFind).toHaveBeenCalledWith({ email: mockDataMessageSent.email });

    expect(data).toStrictEqual(mockDataMessageReceived);
  });

  it('List Message By ChatId', async () => {
    const mockDataMessageSent = {
      chatId: faker.random.number(),
    };

    const createMessage = () => ({
      id: faker.random.number(),
      createdAt: faker.date.recent(),
      content: faker.lorem.words(),
      userId: faker.random.number(),
      chatId: mockDataMessageSent.chatId,
    });

    const mockDataMessagesReceived = new Array(10).fill(undefined).map(createMessage);

    const mockSort = jest.fn().mockResolvedValue(mockDataMessagesReceived);

    const mockFind = jest.fn().mockReturnValue({ sort: mockSort });

    const mockModels = {
      Messages: {
        find: mockFind,
      },
    };

    const repository = new MessageRepository({ models: mockModels, data: mockDataMessageSent });

    const data = await repository.listBy('chatId');

    expect(mockFind).toHaveBeenCalledTimes(1);

    expect(mockFind).toHaveBeenCalledWith({ chatId: mockDataMessageSent.chatId });

    expect(data).toStrictEqual(mockDataMessagesReceived);
  });

  it('Remove Message', async () => {
    const mockDataMessageSent = {
      id: faker.random.number(),
    };

    const mockDeleteOne = jest.fn();

    const mockModels = {
      Messages: {
        deleteOne: mockDeleteOne,
      },
    };

    const repository = new MessageRepository({ models: mockModels, data: mockDataMessageSent });

    await repository.remove();

    expect(mockDeleteOne).toHaveBeenCalledTimes(1);

    expect(mockDeleteOne).toHaveBeenCalledWith({ _id: mockDataMessageSent.id });
  });

  it('Update Message', async () => {
    const mockDataMessageSent = {
      id: faker.random.number(),
      content: faker.lorem.words(),
    };

    const mockDataMessageUpdate = {
      content: mockDataMessageSent.content,
    };

    const mockDataMessageReceived = {
      id: mockDataMessageSent.id,
      content: mockDataMessageSent.content,
      createdAt: faker.date.recent(),
      userId: faker.random.number(),
      chatId: faker.random.number(),
    };

    const mockFindOneAndUpdate = jest.fn().mockResolvedValue(mockDataMessageReceived);

    const mockModels = {
      Messages: {
        findOneAndUpdate: mockFindOneAndUpdate,
      },
    };

    const repository = new MessageRepository({ models: mockModels, data: mockDataMessageSent });

    const data = await repository.update();

    expect(mockFindOneAndUpdate).toHaveBeenCalledTimes(1);

    expect(mockFindOneAndUpdate).toHaveBeenCalledWith(
      { _id: mockDataMessageSent.id },
      mockDataMessageUpdate,
      { new: true },
    );

    expect(data).toStrictEqual(mockDataMessageReceived);
  });
});
