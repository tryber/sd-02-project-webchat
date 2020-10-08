const { MongoClient } = require('mongodb');
const ChatModels = require('./ChatModels');

afterEach(() => jest.clearAllMocks());

const mockGetDB = (result, insertResult) => ({
  db: () => ({
    collection: () => ({
      find: () => ({
        toArray: jest.fn().mockResolvedValue(result),
      }),
      findOne: jest.fn().mockResolvedValue(result),
      insertOne: jest.fn().mockResolvedValue({ ops: [insertResult || result] }),
    }),
  }),
});

describe('chatModel tests', () => {
  describe('getAllPvtMessages', () => {
    it('if messages is returned with sucess', async () => {
      const mockResponse = [{ sender: 'Julio Cezar', reciever: 'Rodrigo', message: 'Coeh' }];
      const mockSender = 'Julio Cezar';
      const mockReciever = 'Rodrigo';

      const bdMock = mockGetDB(mockResponse);
      jest.spyOn(MongoClient, 'connect')
        .mockResolvedValueOnce(bdMock);

      const resp = await ChatModels.getAllPvtMessages(mockSender, mockReciever);

      expect(resp).toBe(mockResponse);
    });
    it('if cant connect to db', async () => {
      const mockSender = 'Julio Cezar';
      const mockReciever = 'Rodrigo';

      jest.spyOn(MongoClient, 'connect')
        .mockImplementationOnce(() => {
          throw new Error('internal error');
        });

      const resp = await ChatModels.getAllPvtMessages(mockSender, mockReciever);

      expect(resp).toBeFalsy();
    });
  });
  describe('savePrivateMessage', () => {
    it('if messages has been saved and returned with sucess', async () => {
      const mockSender = 'Julio Cezar';
      const mockReciever = 'Rodrigo';

      const bdMock = mockGetDB(true);
      jest.spyOn(MongoClient, 'connect')
        .mockResolvedValueOnce(bdMock);

      const resp = await ChatModels.savePrivateMessage(mockSender, mockReciever);

      expect(resp).toBeTruthy();
    });
    it('if cant connect to db', async () => {
      const mockSender = 'Julio Cezar';
      const mockReciever = 'Rodrigo';

      jest.spyOn(MongoClient, 'connect')
        .mockImplementationOnce(() => {
          throw new Error('internal error');
        });

      const resp = await ChatModels.savePrivateMessage(mockSender, mockReciever);

      expect(resp).toBeFalsy();
    });
  });
});
