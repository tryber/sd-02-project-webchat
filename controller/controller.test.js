const { MongoClient } = require('mongodb');
const { saveUser, saveMessage, getAllMessages } = require('./index.js');

jest.spyOn(MongoClient, 'connect');

const getDbMock = (result) => ({
  db: () => ({
    collection: () => ({
      insertOne: jest.fn().mockResolvedValue({ ops: [result] }),
      find: () => ({
        toArray: jest.fn().mockResolvedValue(result),
      }),
      updateOne: jest.fn().mockResolvedValue({ result }),
    }),
  }),
});

describe('test controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('saveUser', async () => {
    const mockUser = ['Douglas'];
    const bdMock = getDbMock(mockUser);
    const mongo = MongoClient.connect.mockResolvedValueOnce(bdMock);
    const functioReturn = await saveUser(mockUser);
    expect(mongo.mock.calls[0][0]).toBe('mongodb://127.0.0.1:27017');
    expect(mongo.mock.calls[0][1]).toEqual({ useNewUrlParser: true, useUnifiedTopology: true });
    expect(functioReturn).toBe(undefined);
  });

  it('saveUser', async () => {
    const mockUser = 'Douglas';
    const bdMock = getDbMock([]);
    const mongo = MongoClient.connect.mockResolvedValue(bdMock);
    const functioReturn = await saveUser(mockUser);
    expect(mongo.mock.calls[0][0]).toBe('mongodb://127.0.0.1:27017');
    expect(mongo.mock.calls[0][1]).toEqual({ useNewUrlParser: true, useUnifiedTopology: true });
    expect(functioReturn).toBe(undefined);
  });

  it('saveMessage', async () => {
    const mockDate = new Date(1466424490000);
    const spyData = jest.spyOn(global, 'Date').mockImplementation(() => mockDate);
    const mockUser = { name: 'teste', message: 'teste de mensagem' };
    const bdMock = getDbMock(mockUser);
    const mongo = MongoClient.connect.mockResolvedValueOnce(bdMock);
    const functioReturn = await saveMessage(mockUser);

    expect(mongo.mock.calls[0][0]).toBe('mongodb://127.0.0.1:27017');
    expect(mongo.mock.calls[0][1]).toEqual({ useNewUrlParser: true, useUnifiedTopology: true });
    expect(functioReturn).toBe(mockDate);
    expect(spyData).toBeCalledTimes(1);

    spyData.mockRestore();
  });
  it('getAllMessages', async () => {
    const mockUsers = [
      { name: 'teste', message: ['teste de mensagem'] },
      { name: 'teste2', message: ['teste de mensagem'] },
    ];
    const bdMock = getDbMock(mockUsers);
    const mongo = MongoClient.connect.mockResolvedValueOnce(bdMock);
    const mockJson = jest.fn();
    const mockRes = { status: jest.fn().mockReturnValueOnce({ json: mockJson }) };

    await getAllMessages({}, mockRes);

    expect(mockRes.status).toBeCalledWith(200);
    expect(mockJson).toBeCalledWith(mockUsers);
    expect(mongo.mock.calls[0][0]).toBe('mongodb://127.0.0.1:27017');
    expect(mongo.mock.calls[0][1]).toEqual({ useNewUrlParser: true, useUnifiedTopology: true });
  });
  it('error teste', async () => {
    const mockProcess = jest.spyOn(process, 'exit').mockResolvedValue({});
    MongoClient.connect.mockImplementation(() => Promise.reject("error"));
    await saveUser('fakeName');
    expect(mongo.mock.calls[0][0]).toBe('mongodb://127.0.0.1:27017');
    expect(mongo.mock.calls[0][1]).toEqual({ useNewUrlParser: true, useUnifiedTopology: true });
    expect(mockProcess).toBeCalledTimes(1);
  });
});
