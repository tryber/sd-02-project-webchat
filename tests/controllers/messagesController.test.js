const { ObjectId } = require('mongodb');
const messagesController = require('../../controllers/messagesController');
const messagesModel = require('../../models/messagesModel');

afterEach(() => jest.clearAllMocks());

describe('Messages Controller tests', () => {
  describe('Get All Messages', () => {
    it('Should retrieve all posts ordered by date', async () => {
      const mockUnordered = [
        {
          _id: ObjectId('5f3f2dcb7c90b0de1cf4a930'),
          name: 'Johnatas',
          messages: { content: 'sim', postedAt: '2020-08-21T02:14:07.569Z' },
        },
        {
          _id: ObjectId('5f3f2de5d98cee4053d64362'),
          name: 'Taw',
          messages: { content: 'oi', postedAt: '2020-08-21T02:13:59.019Z' },
        },
        {
          _id: ObjectId('5f3f2de5d98cee4053d64362'),
          name: 'Taw',
          messages: { content: 'tudo', postedAt: '2020-08-21T02:14:00.282Z' },
        },
      ];
      const mockResponse = [
        {
          _id: ObjectId('5f3f2de5d98cee4053d64362'),
          name: 'Taw',
          messages: { content: 'oi', postedAt: '2020-08-21T02:13:59.019Z' },
        },
        {
          _id: ObjectId('5f3f2de5d98cee4053d64362'),
          name: 'Taw',
          messages: { content: 'tudo', postedAt: '2020-08-21T02:14:00.282Z' },
        },
        {
          _id: ObjectId('5f3f2dcb7c90b0de1cf4a930'),
          name: 'Johnatas',
          messages: { content: 'sim', postedAt: '2020-08-21T02:14:07.569Z' },
        },
      ];
      const mockJson = jest.fn();
      const mockNext = jest.fn();
      const mockRes = { status: jest.fn().mockReturnValueOnce({ json: mockJson }) };
      const getAllMessagesSpy = jest
        .spyOn(messagesModel, 'getAllMessages')
        .mockReturnValueOnce(mockUnordered);

      await messagesController.getAllMessages(null, mockRes, mockNext);

      expect(mockNext).toBeCalledTimes(0);
      expect(getAllMessagesSpy).toBeCalledTimes(1);
      expect(mockRes.status).toBeCalledWith(200);
      expect(mockJson).toBeCalledWith(mockResponse);
    });
  });
  describe('Create User Name', () => {
    it('Should create an user if not exists', async () => {
      const mockReq = { body: { name: 'Johnatas' } };
      const mockJson = jest.fn();
      const mockNext = jest.fn();
      const mockRes = { status: jest.fn().mockReturnValueOnce({ json: mockJson }) };
      const bdReturn = { name: 'Johnatas', _id: 'mongoToken' };
      const createNameSpy = jest
        .spyOn(messagesModel, 'createName')
        .mockReturnValueOnce(bdReturn);

      await messagesController.createName(mockReq, mockRes, mockNext);

      expect(mockNext).toBeCalledTimes(0);
      expect(createNameSpy).toBeCalledTimes(1);
      expect(createNameSpy).toBeCalledWith(mockReq.body.name);
      expect(mockRes.status).toBeCalledWith(201);
      expect(mockJson).toBeCalledWith(bdReturn);
    });
  });
  describe('Insert Messages in User Name', () => {
    it('Append a message into an already created user', async () => {
      const mockReq = { body: {
        name: 'Johnatas',
        message: 'Aprendendo testes',
        messageDate: '2020-08-21T19:49:06.141Z',
      } };
      const mockJson = jest.fn();
      const mockNext = jest.fn();
      const mockRes = { status: jest.fn().mockReturnValueOnce({ json: mockJson }) };
      const bdReturn = { name: 'Johnatas', _id: 'mongoToken' };
      const createMessageSpy = jest
        .spyOn(messagesModel, 'createMessage')
        .mockReturnValueOnce(bdReturn);

      await messagesController.createMessage(mockReq, mockRes, mockNext);

      expect(mockNext).toBeCalledTimes(0);
      expect(createMessageSpy).toBeCalledTimes(1);
      expect(createMessageSpy).toBeCalledWith(mockReq.body);
      expect(mockRes.status).toBeCalledWith(201);
      expect(mockJson).toBeCalledWith(bdReturn);
    });
  });
});
