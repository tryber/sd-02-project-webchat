const MessageRepository = require('./messageRepository');

const faker = require('faker');

describe('Message Repository', () => {
  it('Create Message', async () => {
    const mockDataSent = { ...faker.random.objectElement() };

    const mockDataReceived = {
      id: faker.random.number(),
      ...mockDataSent,
    };

    const mockCreate = jest.fn().mockResolvedValue(mockDataReceived);

    const mockModels = {
      Messages: {
        create: mockCreate,
      },
    };

    const repository = new MessageRepository({ models: mockModels, data: mockDataSent });

    const data = await repository.create();

    expect(mockCreate).toHaveBeenCalledTimes(1);

    expect(mockCreate).toHaveBeenCalledWith(mockDataSent);

    expect(data).toStrictEqual(mockDataReceived);
  });

  it('Find Message', async () => {
    const mockDataSent = {
      id: faker.random.number(),
    };

    const mockDataReceived = {
      id: mockDataSent.id,
      ...faker.random.objectElement(),
    };

    const mockFind = jest.fn().mockResolvedValue(mockDataReceived);

    const mockModels = {
      Messages: {
        find: mockFind,
      },
    };

    const repository = new MessageRepository({ models: mockModels, data: mockDataSent });

    const data = await repository.find();

    expect(mockFind).toHaveBeenCalledTimes(1);

    expect(mockFind).toHaveBeenCalledWith({ _id: mockDataSent.id });

    expect(data).toStrictEqual(mockDataReceived);
  });

  it('Find Message By UserId', async () => {
    const mockDataSent = {
      id: faker.random.number(),
      email: faker.internet.email(),
    };

    const mockDataReceived = {
      id: mockDataSent.id,
      email: mockDataSent.email,
      ...faker.random.objectElement(),
    };

    const mockFind = jest.fn().mockResolvedValue(mockDataReceived);

    const mockModels = {
      Messages: {
        find: mockFind,
      },
    };

    const repository = new MessageRepository({ models: mockModels, data: mockDataSent });

    const data = await repository.findBy('email');

    expect(mockFind).toHaveBeenCalledTimes(1);

    expect(mockFind).toHaveBeenCalledWith({ email: mockDataSent.email });

    expect(data).toStrictEqual(mockDataReceived);
  });

  it('List Message By ChatId', async () => {
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

    const mockSort = jest.fn().mockResolvedValue(mockDataMessagesReceived);

    const mockFind = jest.fn().mockReturnValue({ sort: mockSort });

    const mockModels = {
      Messages: {
        find: mockFind,
      },
    };

    const repository = new MessageRepository({ models: mockModels, data: mockDataSent });

    const data = await repository.listBy('chatId');

    expect(mockFind).toHaveBeenCalledTimes(1);

    expect(mockFind).toHaveBeenCalledWith({ chatId: mockDataSent.chatId });

    expect(data).toStrictEqual(mockDataMessagesReceived);
  });

  it('Remove Message', async () => {
    const mockDataSent = {
      id: faker.random.number(),
    };

    const mockDeleteOne = jest.fn();

    const mockModels = {
      Messages: {
        deleteOne: mockDeleteOne,
      },
    };

    const repository = new MessageRepository({ models: mockModels, data: mockDataSent });

    await repository.remove();

    expect(mockDeleteOne).toHaveBeenCalledTimes(1);

    expect(mockDeleteOne).toHaveBeenCalledWith({ _id: mockDataSent.id });
  });

  it('Update Message', async () => {
    const mockDataSent = {
      id: faker.random.number(),
      content: faker.lorem.words(),
    };

    const mockDataReceived = {
      id: mockDataSent.id,
      content: faker.lorem.words(),
      ...faker.random.objectElement(),
    };

    const mockFindOneAndUpdate = jest.fn().mockResolvedValue(mockDataReceived);

    const mockModels = {
      Messages: {
        findOneAndUpdate: mockFindOneAndUpdate,
      },
    };

    const repository = new MessageRepository({ models: mockModels, data: mockDataSent });

    const data = await repository.update();

    expect(mockFindOneAndUpdate).toHaveBeenCalledTimes(1);

    expect(mockFindOneAndUpdate).toHaveBeenCalledWith(
      { _id: mockDataSent.id },
      { content: mockDataSent.content },
      { new: true },
    );

    expect(data).toStrictEqual(mockDataReceived);
  });
});
