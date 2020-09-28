const { MongoClient, ObjectId } = require('mongodb');
const ChatModel = require('./ChatModel');

jest.spyOn(MongoClient, 'connect');
afterEach(() => jest.clearAllMocks());

const mongoMocked = (result) => ({
  db: () => ({
    collection: () => ({
      aggregate: () => ({
        toArray: jest.fn().mockResolvedValue(result),
      }),
      find: () => ({
        toArray: jest.fn().mockResolvedValue(result),
      }),
      findOne: jest.fn().mockResolvedValue(result),
      insertOne: jest.fn().mockResolvedValue(result),
      updateOne: jest.fn().mockResolvedValue(result),
      deleteOne: jest.fn().mockResolvedValue(result),
    }),
  }),
});

describe('Testing Chat Model', () => {
  describe('Testing chat model features', () => {
    test('Testing if saveUsers save user in collection', async () => {
      const user = 'lipe';
      const meSocket = 'wRKKVh9K7SE16iZKAAAE';

      MongoClient.connect.mockResolvedValue(mongoMocked());

      const modelAnswer = await ChatModel.saveUsers(user, meSocket);

      expect(modelAnswer).toEqual(undefined);
    });

    test('Testing onlineUsers return array of objects with online users', async () => {
      const resultMock = [
        {
          _id: ObjectId('5f6fd17617c61ac6785287f1'),
          socket: 'wRKKVh9K7SE16iZKAAAE',
          user: 'lipe',
        },
      ];

      MongoClient.connect.mockResolvedValue(mongoMocked(resultMock));

      const modelAnswer = await ChatModel.onlineUsers();

      expect(modelAnswer).toEqual(resultMock);
    });

    test('Testing savedHistory return array of object with messages', async () => {
      const resultMock = [
        {
          _id: ObjectId('5f6fcf0a4e54b966bb27b9be'),
          user: 'lipe',
          message: 'qual foi povo',
          date: 1601163018366,
        },
      ];

      MongoClient.connect.mockResolvedValue(mongoMocked(resultMock));

      const modelAnswer = await ChatModel.savedHistory();

      expect(modelAnswer).toEqual(resultMock);
    });

    test('Testing findAndDelete delete object in DB', async () => {
      const meSocket = 'wRKKVh9K7SE16iZKAAAE';

      MongoClient.connect.mockResolvedValue(mongoMocked());

      const modelAnswer = await ChatModel.findAndDelete(meSocket);

      expect(modelAnswer).toEqual(undefined);
    });

    test('Testing saveHistory save message to history', async () => {
      const paramMock = {
        user: 'lipe',
        mesage: 'iae bro',
        date: 1601163018366,
      };

      MongoClient.connect.mockResolvedValue(mongoMocked());

      const modelAnswer = await ChatModel.saveHistory(paramMock);

      expect(modelAnswer).toEqual(undefined);
    });

    test('Testing savedMessageByDate return message', async () => {
      const date = 1601163018366;
      const resultMock = {
        _id: ObjectId('5f6fcf0a4e54b966bb27b9be'),
        user: 'lipe',
        message: 'qual foi povo',
        date: 1601163018366,
      };

      MongoClient.connect.mockResolvedValue(mongoMocked(resultMock));

      const modelAnswer = await ChatModel.savedMessageByDate(date);

      expect(modelAnswer).toEqual(resultMock);
    });

    test('Testing if existPrivateChat return object with message private', async () => {
      const user = 'lipe';
      const userFor = 'lipe2';
      const resultMock = {
        _id: ObjectId('5f712286649eac045cd2042e'),
        users: [
          'lipe',
          'lipe2',
        ],
        messages: [
          {
            user: 'lipe',
            message: 'Oieeee kd vc',
            date: 1601249926612,
          },
          {
            user: 'lipe2',
            message: 'Too aqui',
            date: 1601249953195,
          },
        ],
      };

      MongoClient.connect.mockResolvedValue(mongoMocked(resultMock));

      const modelAnswer = await ChatModel.existPrivateChat(user, userFor);

      expect(modelAnswer).toEqual(resultMock);
    });

    test('savePrivateHistory saves messages', async () => {
      const messageTo = {
        user: 'lipe',
        message: 'eae men suave',
        date: 1601249953195,
        userFor: 'lipe2',
      };

      MongoClient.connect.mockResolvedValue(mongoMocked());

      const modelAnswer = await ChatModel.savePrivateHistory(messageTo);

      expect(modelAnswer).toEqual(undefined);
    });

    test('Testing if updatePrivateHistory updates object into DB', async () => {
      const messageTo = {
        user: 'lipe',
        message: 'eae men suave',
        date: 1601249953195,
        userFor: 'lipe2',
      };

      MongoClient.connect.mockResolvedValue(mongoMocked());

      const modelAnswer = await ChatModel.updatePrivateHistory(messageTo);

      expect(modelAnswer).toEqual(undefined);
    });

    test('savedPrivateMessages return array with messages private History', async () => {
      const user = 'lipe';
      const userFor = 'lipe2';
      const resultMock = {
        _id: ObjectId('5f712286649eac045cd2042e'),
        users: [
          'lipe',
          'lipe2',
        ],
        messages: [
          {
            user: 'lipe2',
            message: 'Too aqui',
            date: 1601249953195,
          },
          {
            user: 'lipe',
            message: 'Oieeee kd vc',
            date: 1601249926612,
          },
        ],
      };

      MongoClient.connect.mockResolvedValue(mongoMocked(resultMock));

      const modelAnswer = await ChatModel.savedPrivateMessages(user, userFor);

      expect(modelAnswer).toEqual(resultMock);
    });

    test('savePrivateHistory return array with messages', async () => {
      const user = 'lipe';
      const userFor = 'lipe2';
      const resultMock = {
        _id: ObjectId('5f712286649eac045cd2042e'),
        users: [
          'lipe',
          'lipe2',
        ],
        messages: [
          {
            user: 'lipe2',
            message: 'Too aqui',
            date: 1601249953195,
          },
          {
            user: 'lipe',
            message: 'Oieeee kd vc',
            date: 1601249926612,
          },
        ],
      };

      MongoClient.connect.mockResolvedValue(mongoMocked(resultMock));

      const modelAnswer = await ChatModel.savedPrivateHistory(user, userFor);

      expect(modelAnswer).toEqual(resultMock);
    });
  });
});
