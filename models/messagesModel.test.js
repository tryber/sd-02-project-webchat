const model = require('../models/messagesModel');
const { MongoClient } = require('mongodb');

jest.spyOn(MongoClient, 'connect');

const getDbMock = (result) => ({
  db: () => ({
    collection: () => ({
      aggregate: () => ({
        toArray: jest.fn().mockResolvedValue(result),
      }),
      findOneAndUpdate: jest.fn().mockResolvedValue(result),
      updateOne: jest.fn().mockResolvedValue(result),
    }),
  }),
});

describe('Model User', () => {
  test('getAllMessages', async () => {

    const result = 'Resultado';
    const bdMock = getDbMock(result);
    MongoClient.connect.mockResolvedValueOnce(bdMock);

    const expectResult = await model.getAllMessages();

    expect(expectResult).toStrictEqual(result);
  });

  test('createNewUser', async () => {

    const result = 'Resultado';
    const bdMock = getDbMock(result);
    MongoClient.connect.mockResolvedValueOnce(bdMock);

    const expectResult = await model.createNewUser();

    expect(expectResult).toStrictEqual(result);
  });

  test('messageToDb', async () => {

    const result = 'Resultado';
    const bdMock = getDbMock(result);
    MongoClient.connect.mockResolvedValueOnce(bdMock);

    const expectResult = await model.messageToDb();

    expect(expectResult).toStrictEqual(result);
  });
});