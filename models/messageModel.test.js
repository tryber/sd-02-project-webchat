// Código baseado no projeto do johnatas

const { MongoClient, ObjectId } = require('mongodb');
const model = require('./messageModel');

jest.spyOn(MongoClient, 'connect');

afterEach(() => jest.clearAllMocks());

const mockGetDb = (result) => ({
  db: () => ({
    collection: () => ({
      find: () => ({
        toArray: jest.fn().mockResolvedValue(result),
      }),
      insertOne: jest.fn().mockResolvedValue(result),
    }),
  }),
});

describe('models', () => {
  test('getAllMessages', async () => {
    const result = [
      { nickname: 'Urias', content: 'Ei', sentAt: '2020-08-01T07:09:35.269Z' },
      { nickname: 'Fábio', content: 'Tudo bem?', sentAt: '2020-09-07T07:09:46.130Z' },
    ];

    MongoClient.connect.mockResolvedValueOnce(mockGetDb(result));

    const expectedResult = await model.getAllMessages();

    expect(expectedResult).toStrictEqual(result);
  });

  test('createMessage', async () => {
    const result = {
      acknowledged : true,
      insertedId: ObjectId('5f4e25e53de47ec237f4b24a'),
    };

    MongoClient.connect.mockResolvedValueOnce(mockGetDb(result));

    const expectedResult = await model.createMessage({
      nickname: 'Leandro',
      message: 'Legal',
    });

    expect(expectedResult).toStrictEqual(result);
  });
});
