const { MongoClient } = require('mongodb');
const messagesModel = require('../../models/messagesModel');

jest.spyOn(MongoClient, 'connect');
afterEach(() => jest.clearAllMocks());

const mockGetDB = (result, insertResult) => ({
  db: () => ({
    collection: () => ({
      aggregate: () => ({
        toArray: jest.fn().mockResolvedValue(result),
      }),
      findOne: jest.fn().mockResolvedValue(result),
      insertOne: jest.fn().mockResolvedValue({ ops: [insertResult || result] }),
      updateOne: jest.fn().mockResolvedValue(result),
    }),
  }),
});

describe('Messages Model tests', () => {
  it('Should getAll and aggregate', async () => {
    const result = [{
      _id: '5f3f2dcb7c90b0de1cf4a930',
      name: 'Johnatas',
      messages: { postedAt: '2020-08-21T03:48:20.451Z', content: 'chat bolado!' },
    },
    {
      _id: '5f3f305ab87db85d110210c2',
      name: 'Thawane',
      messages: { postedAt: '2020-08-21T03:48:34.173Z', content: 'tudo funcionando' },
    },
    {
      _id: '5f3fdf28a0cd401f9b5aa69c',
      name: 'Willy',
      messages: { postedAt: '2020-08-21T14:50:43.174Z', content: 'blz man?' },
    },
    ];
    const bdMock = mockGetDB(result);
    MongoClient.connect.mockResolvedValueOnce(bdMock);

    const expectResult = await messagesModel.getAllMessages();

    expect(expectResult).toStrictEqual(result);
  });

  it('Should use createName and find the user', async () => {
    const result = {
      _id: '5f3f2dcb7c90b0de1cf4a930',
      name: 'Johnatas',
      messages: [{ content: 'teste', postedAt: '2020-08-21T02:13:31.100Z' }],
    };
    const bdMock = mockGetDB(result);
    MongoClient.connect.mockResolvedValueOnce(bdMock);

    const expectResult = await messagesModel.createName(result.name);

    expect(expectResult).toStrictEqual(result);
  });

  it('Should use createName and does not find the user, then create', async () => {
    const result = {
      _id: '5f3f2dcb7c90b0de1cf4a930',
      name: 'Johnatas',
      messages: [{ content: 'teste', postedAt: '2020-08-21T02:13:31.100Z' }],
    };
    const bdMock = mockGetDB(null, result);
    MongoClient.connect.mockResolvedValueOnce(bdMock);

    const expectResult = await messagesModel.createName(result.name);

    expect(expectResult).toStrictEqual(result);
  });

  it('Should use createMessage and append the new message on right user', async () => {
    const params = {
      name: 'Johnatas',
      message: 'Olá!',
      messageDate: '2020-08-21T02:13:31.100Z',
    };
    const result = [{ n: 1, nModified: 1, ok: 1 }];
    const bdMock = mockGetDB(result);
    MongoClient.connect.mockResolvedValueOnce(bdMock);

    const expectResult = await messagesModel.createMessage(params);

    expect(expectResult).toEqual(result);
  });
});
