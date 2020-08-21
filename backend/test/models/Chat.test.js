const { MongoClient } = require('mongodb');
const Chat = require('../../models/Chat');

jest.spyOn(MongoClient, 'connect');

const getDbMock = (result) => ({
  db: () => ({
    collection: () => ({
      insertOne: jest.fn().mockResolvedValue({ ops: [result] }),
      find: () => ({
        toArray: jest.fn().mockResolvedValue([result]),
      }),
    }),
  }),
});

const message = 'Oie';
const nickname = 'Nick';
const date = '2020-08-20T20:56:15.365Z';
const result = { _id: 'qdwqdqw', message, nickname, date };

describe('Model User', () => {
  test('findAll', async () => {
    // Arange
    const bdMock = getDbMock(result);
    MongoClient.connect.mockResolvedValueOnce(bdMock);

    // Act
    const expectResult = await Chat.getAll();

    // Assert
    expect(expectResult).toStrictEqual([result]);
  });

  test('insert', async () => {
    // Arange
    const bdMock = getDbMock(result);
    MongoClient.connect.mockResolvedValueOnce(bdMock);

    // Act
    const expectResult = await Chat.add({ nickname, message, date });

    // Assert
    expect(expectResult).toStrictEqual({ ops: [result] });
  });
});
