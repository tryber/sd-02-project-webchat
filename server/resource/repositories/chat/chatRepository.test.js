const ChatRepository = require('./chatRepository');

const faker = require('faker');

describe('Chat Repository', () => {
  it('Create Chat', async () => {
    const mockDataSent = { ...faker.random.objectElement() };

    const mockDataReceived = {
      id: faker.random.number(),
      ...mockDataSent,
    };

    const mockCreate = jest.fn().mockResolvedValue(mockDataReceived);

    const mockModels = {
      Chats: {
        create: mockCreate,
      },
    };

    const repository = new ChatRepository({ models: mockModels, data: mockDataSent });

    const data = await repository.create();

    expect(mockCreate).toHaveBeenCalledTimes(1);

    expect(mockCreate).toHaveBeenCalledWith(mockDataSent);

    expect(data).toStrictEqual(mockDataReceived);
  });

  it('Find Chat', async () => {
    const mockDataSent = {
      id: faker.random.number(),
    };

    const mockDataReceived = {
      id: mockDataSent.id,
      ...faker.random.objectElement(),
    };

    const mockFind = jest.fn().mockResolvedValue(mockDataReceived);

    const mockModels = {
      Chats: {
        find: mockFind,
      },
    };

    const repository = new ChatRepository({ models: mockModels, data: mockDataSent });

    const data = await repository.find();

    expect(mockFind).toHaveBeenCalledTimes(1);

    expect(mockFind).toHaveBeenCalledWith({ _id: mockDataSent.id });

    expect(data).toStrictEqual(mockDataReceived);
  });

  it('List Chat By UserId', async () => {
    const mockDataSent = {
      userId: faker.random.number(),
    };

    const createChat = () => ({
      id: faker.random.number(),
      createdAt: faker.date.recent(),
      title: faker.lorem.words(),
      userId: mockDataSent.userId,
    });

    const mockDataChatsReceived = new Array(10).fill(undefined).map(createChat);

    const mockSort = jest.fn().mockResolvedValue(mockDataChatsReceived);

    const mockFind = jest.fn().mockReturnValue({ sort: mockSort });

    const mockModels = {
      Chats: {
        find: mockFind,
      },
    };

    const repository = new ChatRepository({ models: mockModels, data: mockDataSent });

    const data = await repository.listBy('chatId');

    expect(mockFind).toHaveBeenCalledTimes(1);

    expect(mockFind).toHaveBeenCalledWith({ chatId: mockDataSent.chatId });

    expect(data).toStrictEqual(mockDataChatsReceived);
  });

  it('Remove Chat', async () => {
    const mockDataSent = {
      id: faker.random.number(),
    };

    const mockDeleteOne = jest.fn();

    const mockModels = {
      Chats: {
        deleteOne: mockDeleteOne,
      },
    };

    const repository = new ChatRepository({ models: mockModels, data: mockDataSent });

    await repository.remove();

    expect(mockDeleteOne).toHaveBeenCalledTimes(1);

    expect(mockDeleteOne).toHaveBeenCalledWith({ _id: mockDataSent.id });
  });

  it('Update Chat', async () => {
    const mockDataSent = {
      id: faker.random.number(),
      title: faker.lorem.words(),
    };

    const mockDataReceived = {
      id: mockDataSent.id,
      title: mockDataSent.title,
      createdAt: faker.date.recent(),
      userId: faker.random.number(),
    };

    const mockFindOneAndUpdate = jest.fn().mockResolvedValue(mockDataReceived);

    const mockModels = {
      Chats: {
        findOneAndUpdate: mockFindOneAndUpdate,
      },
    };

    const repository = new ChatRepository({ models: mockModels, data: mockDataSent });

    const data = await repository.update();

    expect(mockFindOneAndUpdate).toHaveBeenCalledTimes(1);

    expect(mockFindOneAndUpdate).toHaveBeenCalledWith(
      { _id: mockDataSent.id },
      { title: mockDataSent.title },
      { new: true },
    );

    expect(data).toStrictEqual(mockDataReceived);
  });
});
