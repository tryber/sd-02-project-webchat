const model = require('../models/messagesModel');
const controller = require('./messagesControllers');

const createSpy = (func, method, value) => jest
  .spyOn(func, method)
  .mockReturnValueOnce(value);

describe('controller test', () => {
  describe('send message', () => {
    test('Missing user', async () => {

      const jestFnJason = jest.fn();
      const mockRes = { status: jest.fn().mockReturnValueOnce({ json: jestFnJason }) };
      await controller.sendMessage({ body: { message: 'oi' } }, mockRes);

      expect(mockRes.status).toBeCalledWith(422);
      expect(jestFnJason).toBeCalledWith({ message: 'Missing message or title' });
    })


    test('Missing message', async () => {

      const jestFnJason = jest.fn();
      const mockRes = { status: jest.fn().mockReturnValueOnce({ json: jestFnJason }) };
      await controller.sendMessage({ body: { user: 'Pedro' } }, mockRes);

      expect(mockRes.status).toBeCalledWith(422);
      expect(jestFnJason).toBeCalledWith({ message: 'Missing message or title' });
    });

    test('Message sent', async () => {

      const createSpyMessage = createSpy(model, 'messageToDb', { message: 'Oi' });

      const jestFnJason = jest.fn();
      const mockRes = { status: jest.fn().mockReturnValueOnce({ json: jestFnJason }) };
      await controller.sendMessage({ body: { message: 'Oi', user: 'Pedro' } }, mockRes);

      expect(createSpyMessage).toBeCalledTimes(1);
      expect(mockRes.status).toBeCalledWith(200);
      expect(jestFnJason).toBeCalledWith({ message: 'Oi' });

      createSpyMessage.mockRestore();
    });
  });

  describe('Send name', () => {
    test('name sent', async () => {
      const createSpyName = createSpy(model, 'createNewUser', 'Nome');

      const jestFnJason = jest.fn();
      const mockRes = { status: jest.fn().mockReturnValueOnce({ json: jestFnJason }) };
      await controller.sendName({ body: { name: 'Pedro' } }, mockRes);

      expect(createSpyName).toBeCalledTimes(1);
      expect(mockRes.status).toBeCalledWith(201);
      expect(jestFnJason).toBeCalledWith({ message: 'Sucess' });

      createSpyName.mockRestore();
    });
  });

  describe('Getting messages', () => {
    test('name sent', async () => {
      const createSpyName = createSpy(model, 'getAllMessages', ['msg1', 'msg2']);

      const jestFnJason = jest.fn();
      const mockRes = { status: jest.fn().mockReturnValueOnce({ json: jestFnJason }) };
      await controller.getMessages({}, mockRes);

      expect(createSpyName).toBeCalledTimes(1);
      expect(mockRes.status).toBeCalledWith(200);
      expect(jestFnJason).toBeCalledWith({ message: ['msg1', 'msg2'] });

      createSpyName.mockRestore();
    });
  });
});