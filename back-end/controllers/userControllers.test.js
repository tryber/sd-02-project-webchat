const { MongoClient } = require('mongodb');
const userControllers = require('./userControllers');

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

describe('userController tests', () => {
  describe('save nickNames', () => {
    it('if nickname inserted into db', async () => {
      const mockResponse = undefined;
      const mockReq = { body: { nickname: 'Julio Cezar' } };
      const mockEnd = jest.fn();
      const mockRes = { status: jest.fn().mockReturnValueOnce({ end: mockEnd }) };

      const bdMock = mockGetDB(mockResponse);
      jest.spyOn(MongoClient, 'connect')
        .mockResolvedValueOnce(bdMock);

      await userControllers.saveNickname(mockReq, mockRes);

      expect(MongoClient.connect).toBeCalledTimes(1);
      expect(mockRes.status).toBeCalledWith(200);
    });
    it('if nickname already exist into db', async () => {
      const mockResponse = [{ nickname: 'Julio Cezar' }];
      const mockReq = { body: { nickname: 'Julio Cezar' } };
      const mockEnd = jest.fn();
      const mockRes = { status: jest.fn().mockReturnValueOnce({ end: mockEnd }) };

      const bdMock = mockGetDB(mockResponse);
      jest.spyOn(MongoClient, 'connect')
        .mockResolvedValueOnce(bdMock);

      await userControllers.saveNickname(mockReq, mockRes);

      expect(MongoClient.connect).toBeCalledTimes(1);
      expect(mockRes.status).toBeCalledWith(500);
    });
    it('if cant connect to db', async () => {
      const mockReq = { body: { nickname: 'Julio Cezar' } };
      const mockEnd = jest.fn();
      const mockRes = { status: jest.fn().mockReturnValueOnce({ end: mockEnd }) };

      jest.spyOn(MongoClient, 'connect')
        .mockImplementationOnce(() => {
          throw new Error('internal error');
        });

      await userControllers.saveNickname(mockReq, mockRes);

      expect(MongoClient.connect).toBeCalledTimes(1);
      expect(mockRes.status).toBeCalledWith(500);
    });
  });
  describe('insert messages', () => {
    it('if nickname inserted into db', async () => {
      const mockResponse = true;
      const mockReq = { body: { nickname: 'Julio Cezar', message: 'Fala po' } };
      const mockEnd = jest.fn();
      const mockRes = { status: jest.fn().mockReturnValueOnce({ end: mockEnd }) };

      const bdMock = mockGetDB(mockResponse);
      jest.spyOn(MongoClient, 'connect')
        .mockResolvedValueOnce(bdMock);

      await userControllers.insertMessages(mockReq, mockRes);

      expect(MongoClient.connect).toBeCalledTimes(1);
      expect(mockRes.status).toBeCalledWith(200);
    });
    it('if cant connect to db', async () => {
      const mockReq = { body: { nickname: 'Julio Cezar' } };
      const mockEnd = jest.fn();
      const mockRes = { status: jest.fn().mockReturnValueOnce({ end: mockEnd }) };

      jest.spyOn(MongoClient, 'connect')
        .mockImplementationOnce(() => {
          throw new Error('internal error');
        });

      await userControllers.insertMessages(mockReq, mockRes);

      expect(MongoClient.connect).toBeCalledTimes(1);
      expect(mockRes.status).toBeCalledWith(500);
    });
  });
  describe('get all chats', () => {
    it('if nickname inserted into db', async () => {
      const mockResponse = [
        { nickname: 'Julio Cezar', message: 'e ae' },
        { nickname: 'Julio Cezar', message: 'fala' },
      ];
      const mockJson = jest.fn();
      const mockEnd = jest.fn();
      const mockRes = {
        status: jest.fn()
          .mockReturnValueOnce({ end: mockEnd, json: mockJson })
      };

      const bdMock = mockGetDB(mockResponse);
      jest.spyOn(MongoClient, 'connect')
        .mockResolvedValueOnce(bdMock);

      await userControllers.getAllChats(null, mockRes);

      expect(MongoClient.connect).toBeCalledTimes(1);
      expect(mockRes.status).toBeCalledWith(200);
    });
    it('if cant connect to db', async () => {
      const mockEnd = jest.fn();
      const mockJson = jest.fn();
      const mockRes = {
        status: jest.fn()
          .mockReturnValueOnce({ end: mockEnd, json: mockJson })
      };

      jest.spyOn(MongoClient, 'connect')
        .mockImplementationOnce(() => {
          throw new Error('internal error');
        });

      await userControllers.getAllChats(null, mockRes);

      expect(MongoClient.connect).toBeCalledTimes(1);
      expect(mockRes.status).toBeCalledWith(500);
    });
  });
});