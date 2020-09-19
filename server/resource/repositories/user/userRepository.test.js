const UserRepository = require('./userRepository');

const faker = require('faker');

describe('User Repository', () => {
  it('Create User', async () => {
    const mockDataSent = { ...faker.random.objectElement() };

    const mockDataReceived = {
      id: faker.random.number(),
      ...mockDataSent,
    };

    const mockCreate = jest.fn().mockResolvedValue(mockDataReceived);

    const mockModels = {
      Users: {
        create: mockCreate,
      },
    };

    const repository = new UserRepository({ models: mockModels, data: mockDataSent });

    const data = await repository.create();

    expect(mockCreate).toHaveBeenCalledTimes(1);

    expect(mockCreate).toHaveBeenCalledWith(mockDataSent);

    expect(data).toStrictEqual(mockDataReceived);
  });

  it('Find User', async () => {
    const mockDataSent = {
      id: faker.random.number(),
    };

    const mockDataReceived = {
      id: mockDataSent.id,
      ...faker.random.objectElement(),
    };

    const mockFind = jest.fn().mockResolvedValue(mockDataReceived);

    const mockModels = {
      Users: {
        find: mockFind,
      },
    };

    const repository = new UserRepository({ models: mockModels, data: mockDataSent });

    const data = await repository.find();

    expect(mockFind).toHaveBeenCalledTimes(1);

    expect(mockFind).toHaveBeenCalledWith({ _id: mockDataSent.id });

    expect(data).toStrictEqual(mockDataReceived);
  });

  it('Find User By Email', async () => {
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
      Users: {
        find: mockFind,
      },
    };

    const repository = new UserRepository({ models: mockModels, data: mockDataSent });

    const data = await repository.findBy('email');

    expect(mockFind).toHaveBeenCalledTimes(1);

    expect(mockFind).toHaveBeenCalledWith({ email: mockDataSent.email });

    expect(data).toStrictEqual(mockDataReceived);
  });

  it('List User', async () => {
    const createUser = () => ({
      id: faker.random.number(),
      email: faker.internet.email(),
      nickname: faker.name.findName(),
      password: faker.internet.password(),
    });

    const mockDataUsersReceived = new Array(10).fill(undefined).map(createUser);

    const mockFind = jest.fn().mockResolvedValue(mockDataUsersReceived);

    const mockModels = {
      Users: {
        find: mockFind,
      },
    };

    const repository = new UserRepository({ models: mockModels, data: null });

    const data = await repository.list();

    expect(mockFind).toHaveBeenCalledTimes(1);

    expect(data).toStrictEqual(mockDataUsersReceived);
  });

  it('Remove User', async () => {
    const mockDataSent = {
      id: faker.random.number(),
    };

    const mockDeleteOne = jest.fn();

    const mockModels = {
      Users: {
        deleteOne: mockDeleteOne,
      },
    };

    const repository = new UserRepository({ models: mockModels, data: mockDataSent });

    await repository.remove();

    expect(mockDeleteOne).toHaveBeenCalledTimes(1);

    expect(mockDeleteOne).toHaveBeenCalledWith({ _id: mockDataSent.id });
  });

  it('Update User', async () => {
    const mockDataSent = {
      id: faker.random.number(),
      nickname: faker.name.findName(),
    };

    const mockDataUpdated = {
      nickname: mockDataSent.nickname,
    };

    const mockDataReceived = {
      id: mockDataSent.id,
      nickname: mockDataSent.nickname,
      ...faker.random.objectElement(),
    };

    const mockFindOneAndUpdate = jest.fn().mockResolvedValue(mockDataReceived);

    const mockModels = {
      Users: {
        findOneAndUpdate: mockFindOneAndUpdate,
      },
    };

    const repository = new UserRepository({ models: mockModels, data: mockDataSent });

    const data = await repository.update();

    expect(mockFindOneAndUpdate).toHaveBeenCalledTimes(1);

    expect(mockFindOneAndUpdate).toHaveBeenCalledWith({ _id: mockDataSent.id }, mockDataUpdated, {
      new: true,
    });

    expect(data).toStrictEqual(mockDataReceived);
  });
});
