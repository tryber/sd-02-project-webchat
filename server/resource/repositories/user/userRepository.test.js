const userRepository = require('./userRepository');

const faker = require('faker');

describe('User Repository', () => {
  it('Create User', async () => {
    const mockDataUserSent = {
      email: faker.internet.email(),
      nickname: faker.name.findName(),
      password: faker.random.hexaDecimal(),
    };

    const mockDataUserReceived = {
      id: faker.random.number(),
      email: mockDataUserSent.email,
      nickname: mockDataUserSent.nickname,
      password: mockDataUserSent.password,
    };

    const mockCreate = jest.fn().mockResolvedValue(mockDataUserReceived);

    const mockModels = {
      Users: {
        create: mockCreate,
      },
    };

    const repository = new userRepository({ models: mockModels, data: mockDataUserSent });

    const data = await repository.create();

    expect(mockCreate).toHaveBeenCalledTimes(1);

    expect(mockCreate).toHaveBeenCalledWith(mockDataUserSent);

    expect(data).toStrictEqual(mockDataUserReceived);
  });

  it('Find User', async () => {
    const mockDataUserSent = {
      id: faker.random.number(),
    };

    const mockDataUserReceived = {
      id: mockDataUserSent.id,
      email: faker.internet.email(),
      nickname: faker.name.findName(),
      password: faker.random.hexaDecimal(),
    };

    const mockFind = jest.fn().mockResolvedValue(mockDataUserReceived);

    const mockModels = {
      Users: {
        find: mockFind,
      },
    };

    const repository = new userRepository({ models: mockModels, data: mockDataUserSent });

    const data = await repository.find();

    expect(mockFind).toHaveBeenCalledTimes(1);

    expect(mockFind).toHaveBeenCalledWith({ _id: mockDataUserSent.id });

    expect(data).toStrictEqual(mockDataUserReceived);
  });

  it('Find User By Email', async () => {
    const mockDataUserSent = {
      id: faker.random.number(),
      email: faker.internet.email(),
    };

    const mockDataUserReceived = {
      id: mockDataUserSent.id,
      email: mockDataUserSent.email,
      nickname: faker.name.findName(),
      password: faker.random.hexaDecimal(),
    };

    const mockFind = jest.fn().mockResolvedValue(mockDataUserReceived);

    const mockModels = {
      Users: {
        find: mockFind,
      },
    };

    const repository = new userRepository({ models: mockModels, data: mockDataUserSent });

    const data = await repository.findBy('email');

    expect(mockFind).toHaveBeenCalledTimes(1);

    expect(mockFind).toHaveBeenCalledWith({ email: mockDataUserSent.email });

    expect(data).toStrictEqual(mockDataUserReceived);
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

    const repository = new userRepository({ models: mockModels, data: null });

    const data = await repository.list();

    expect(mockFind).toHaveBeenCalledTimes(1);

    expect(data).toStrictEqual(mockDataUsersReceived);
  });

  it('Remove User', async () => {
    const mockDataUserSent = {
      id: faker.random.number(),
    };

    const mockDeleteOne = jest.fn();

    const mockModels = {
      Users: {
        deleteOne: mockDeleteOne,
      },
    };

    const repository = new userRepository({ models: mockModels, data: mockDataUserSent });

    await repository.remove();

    expect(mockDeleteOne).toHaveBeenCalledTimes(1);

    expect(mockDeleteOne).toHaveBeenCalledWith({ _id: mockDataUserSent.id });
  });

  it('Update User', async () => {
    const mockDataUserSent = {
      id: faker.random.number(),
      nickname: faker.name.findName(),
    };

    const mockDataUserUpdate = {
      nickname: mockDataUserSent.nickname,
    };

    const mockDataUserReceived = {
      id: mockDataUserSent.id,
      email: mockDataUserSent.email,
      nickname: mockDataUserSent.nickname,
      password: faker.random.hexaDecimal(),
    };

    const mockFindOneAndUpdate = jest.fn().mockResolvedValue(mockDataUserReceived);

    const mockModels = {
      Users: {
        findOneAndUpdate: mockFindOneAndUpdate,
      },
    };

    const repository = new userRepository({ models: mockModels, data: mockDataUserSent });

    const data = await repository.update();

    expect(mockFindOneAndUpdate).toHaveBeenCalledTimes(1);

    expect(mockFindOneAndUpdate).toHaveBeenCalledWith(
      { _id: mockDataUserSent.id },
      mockDataUserUpdate,
      { new: true },
    );

    expect(data).toStrictEqual(mockDataUserReceived);
  });
});
