const model = require('../models/messageModel');
const controller = require('./messageController');

describe('controllers', () => {
  test('getMessages retorna um array de mensagens com status 200', async () => {
    const mockData = [
      { nickname: 'Albert', content: 'Oi', sentAt: '2020-09-01T07:09:35.269Z' },
      { nickname: 'Alex', content: 'Olá', sentAt: '2020-09-01T07:09:46.130Z' },
    ];

    const getAllMessagesSpy = jest
      .spyOn(model, 'getAllMessages')
      .mockReturnValueOnce(mockData);

    const mockJson = jest.fn();
    const mockRes = {
      status: jest
        .fn()
        .mockReturnValueOnce({ json: mockJson })
    };

    await controller.getMessages(null, mockRes);

    expect(getAllMessagesSpy).toBeCalledTimes(1);
    expect(mockRes.status).toBeCalledWith(200);
    expect(mockJson).toBeCalledWith(mockData);

    getAllMessagesSpy.mockRestore();
  });

  test('postMessage retorna status 422 se não houver message no body', async () => {
    const mockReq = {
      body: { nickname: 'Flávio' }
    };
    const mockJson = jest.fn();
    const mockRes = {
      status: jest
        .fn()
        .mockReturnValueOnce({ json: mockJson })
    };

    await controller.postMessage()(mockReq, mockRes);

    expect(mockRes.status).toBeCalledWith(422);
    expect(mockJson).toBeCalledWith({ message: 'Missing message or nickname' });
  });

  test('postMessage chama model para criar mensagem e emite notificação', async () => {
    const createMessageSpy = jest.spyOn(model, 'createMessage');

    const mockReq = {
      body: { nickname: 'Paulo', message: 'Eu gosto de você' }
    };

    const mockJson = jest.fn();
    const mockRes = {
      status: jest
        .fn()
        .mockReturnValueOnce({ json: mockJson })
    };

    const mockEmit = jest.fn();
    const mockIo = { emit: mockEmit };

    await controller.postMessage(mockIo)(mockReq, mockRes);

    expect(createMessageSpy).toBeCalledTimes(1);
    expect(mockRes.status).toBeCalledWith(200);
    expect(mockJson).toBeCalledWith({ message: 'Notification emitted' });

    createMessageSpy.mockRestore();
  });
});