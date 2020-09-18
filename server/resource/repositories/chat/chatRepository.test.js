const ChatRepository = require('./chatRepository');

const faker = require('faker');

describe('Chat Repository', () => {
  it('Create Chat', async () => {
    const mockDataChatSent = {
      createdAt: faker.date.recent(),
      title: faker.lorem.words(),
      userId: faker.random.number(),
    };

    const mockDataChatReceived = {
      id: faker.random.number(),
      createdAt: mockDataChatSent.createdAt,
      title: mockDataChatSent.title,
      userId: mockDataChatSent.userId,
    };

    const mockCreate = jest.fn().mockResolvedValue(mockDataChatReceived);

    const mockModels = {
      Chats: {
        create: mockCreate,
      },
    };

    const repository = new ChatRepository({ models: mockModels, data: mockDataChatSent });

    const data = await repository.create();

    expect(mockCreate).toHaveBeenCalledTimes(1);

    expect(mockCreate).toHaveBeenCalledWith(mockDataChatSent);

    expect(data).toStrictEqual(mockDataChatReceived);
  });

  it('Find Chat', async () => {
    const mockDataChatSent = {
      id: faker.random.number(),
    };

    const mockDataChatReceived = {
      id: mockDataChatSent.id,
      createdAt: faker.date.recent(),
      title: faker.lorem.words(),
      userId: faker.random.number(),
    };

    const mockFind = jest.fn().mockResolvedValue(mockDataChatReceived);

    const mockModels = {
      Chats: {
        find: mockFind,
      },
    };

    const repository = new ChatRepository({ models: mockModels, data: mockDataChatSent });

    const data = await repository.find();

    expect(mockFind).toHaveBeenCalledTimes(1);

    expect(mockFind).toHaveBeenCalledWith({ _id: mockDataChatSent.id });

    expect(data).toStrictEqual(mockDataChatReceived);
  });

  it('List Chat By UserId', async () => {
    const mockDataChatSent = {
      userId: faker.random.number(),
    };

    const createChat = () => ({
      id: faker.random.number(),
      createdAt: faker.date.recent(),
      title: faker.lorem.words(),
      userId: mockDataChatSent.userId,
    });

    const mockDataChatsReceived = new Array(10).fill(undefined).map(createChat);

    const mockSort = jest.fn().mockResolvedValue(mockDataChatsReceived);

    const mockFind = jest.fn().mockReturnValue({ sort: mockSort });

    const mockModels = {
      Chats: {
        find: mockFind,
      },
    };

    const repository = new ChatRepository({ models: mockModels, data: mockDataChatSent });

    const data = await repository.listBy('chatId');

    expect(mockFind).toHaveBeenCalledTimes(1);

    expect(mockFind).toHaveBeenCalledWith({ chatId: mockDataChatSent.chatId });

    expect(data).toStrictEqual(mockDataChatsReceived);
  });

  it('Remove Chat', async () => {
    const mockDataChatSent = {
      id: faker.random.number(),
    };

    const mockDeleteOne = jest.fn();

    const mockModels = {
      Chats: {
        deleteOne: mockDeleteOne,
      },
    };

    const repository = new ChatRepository({ models: mockModels, data: mockDataChatSent });

    await repository.remove();

    expect(mockDeleteOne).toHaveBeenCalledTimes(1);

    expect(mockDeleteOne).toHaveBeenCalledWith({ _id: mockDataChatSent.id });
  });

  it('Update Chat', async () => {
    const mockDataChatSent = {
      id: faker.random.number(),
      title: faker.lorem.words(),
    };

    const mockDataChatUpdate = {
      title: mockDataChatSent.title,
    };

    const mockDataChatReceived = {
      id: mockDataChatSent.id,
      title: mockDataChatSent.title,
      createdAt: faker.date.recent(),
      userId: faker.random.number(),
    };

    const mockFindOneAndUpdate = jest.fn().mockResolvedValue(mockDataChatReceived);

    const mockModels = {
      Chats: {
        findOneAndUpdate: mockFindOneAndUpdate,
      },
    };

    const repository = new ChatRepository({ models: mockModels, data: mockDataChatSent });

    const data = await repository.update();

    expect(mockFindOneAndUpdate).toHaveBeenCalledTimes(1);

    expect(mockFindOneAndUpdate).toHaveBeenCalledWith(
      { _id: mockDataChatSent.id },
      mockDataChatUpdate,
      { new: true },
    );

    expect(data).toStrictEqual(mockDataChatReceived);
  });
});
