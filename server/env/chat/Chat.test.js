const chatService = require('./chatService');

const Chat = require('./Chat');

const faker = require('faker');

describe('Chat', () => {
  it('Create', async () => {
    const mockDataSent = { a: 0 };

    const mockDataReceived = { b: 1 };

    const mockId = faker.random.number();

    const mockModel = jest.fn();

    const mockCreate = jest.spyOn(chatService, 'create').mockReturnValue(mockDataReceived);

    const chat = new Chat({ ChatModel: mockModel, id: mockId, ...mockDataSent });

    const data = await chat.create();

    expect(mockCreate).toHaveBeenCalledTimes(1);

    expect(mockCreate).toHaveBeenCalledWith({ Model: mockModel, data: mockDataSent });

    expect(data).toStrictEqual(mockDataReceived);
  });

  it('Find', async () => {
    const mockDataSent = { a: 0 };

    const mockDataReceived = { b: 1 };

    const mockId = faker.random.number();

    const mockModel = jest.fn();

    const mockFind = jest.spyOn(chatService, 'find').mockReturnValue(mockDataReceived);

    const chat = new Chat({ ChatModel: mockModel, id: mockId });

    const data = await chat.find();

    expect(mockFind).toHaveBeenCalledTimes(1);

    expect(mockFind).toHaveBeenCalledWith({ Model: mockModel, id: mockId });

    expect(data).toStrictEqual(mockDataReceived);
  });

  it('ListBy', async () => {
    const mockDataSent = { a: 0 };

    const mockDataReceived = { b: 1 };

    const mockField = faker.random.word();

    const mockModel = jest.fn();

    const mockList = jest.spyOn(chatService, 'listBy').mockReturnValue(mockDataReceived);

    const chat = new Chat({ ChatModel: mockModel, ...mockDataSent });

    const data = await chat.listBy(mockField);

    expect(mockList).toHaveBeenCalledTimes(1);

    expect(mockList).toHaveBeenCalledWith({ field: mockField, Model: mockModel });

    expect(data).toStrictEqual(mockDataReceived);
  });

  it('Remove', async () => {
    const mockId = faker.random.number();

    const mockModel = jest.fn();

    const mockRemove = jest.spyOn(chatService, 'remove').mockImplementation(jest.fn());

    const chat = new Chat({ ChatModel: mockModel, id: mockId });

    await chat.remove();

    expect(mockRemove).toHaveBeenCalledTimes(1);

    expect(mockRemove).toHaveBeenCalledWith({ Model: mockModel, id: mockId });
  });

  it('Update', async () => {
    const mockDataSent = { email: faker.internet.email(), password: faker.internet.password() };

    const mockId = faker.random.number();

    const mockModel = jest.fn();

    const mockUpdate = jest.spyOn(chatService, 'update').mockImplementation(jest.fn());

    const chat = new Chat({ ChatModel: mockModel, id: mockId, ...mockDataSent });

    await chat.update();

    expect(mockUpdate).toHaveBeenCalledTimes(1);

    expect(mockUpdate).toHaveBeenCalledWith({ Model: mockModel, id: mockId, data: mockDataSent });
  });
});
