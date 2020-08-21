const controller = require('../../controllers');
const Chat = require('../../models/Chat');

describe('Chat Controller', () => {
  test('Find chat', async () => {
    const mockMessage = { message: 'Oiee.', nickname: 'Nik', date: '2020-08-20T20:56:15.365Z' };

    const findAllSpy = jest
      .spyOn(Chat, 'getAll')
      .mockReturnValueOnce(mockMessage);

    const mockJson = jest.fn();
    const mockReq = {};
    const mockRes = { status: jest.fn().mockReturnValueOnce({ json: mockJson }) };

    // Act
    await controller.chats.findAll(mockReq, mockRes);

    // Assert
    expect(findAllSpy).toBeCalledTimes(1);
    expect(mockRes.status).toBeCalledWith(200);
    expect(mockJson).toBeCalledWith(mockMessage);

    findAllSpy.mockRestore();
  });

  test('Add user', async () => {
    const mockMessage = { message: 'Oiee.', nickname: 'Nik', date: '2020-08-20T20:56:15.365Z' };
    const mockResponse = { ops: [mockMessage] };

    const addSpy = jest
      .spyOn(Chat, 'add')
      .mockReturnValueOnce(mockResponse);

    const mockBody = { message: 'Oiee.', nickname: 'Nick' };

    const mockJson = jest.fn();
    const mockReq = { body: { ...mockBody } };
    const mockRes = { status: jest.fn().mockReturnValueOnce({ json: mockJson }) };

    // Act
    await controller.chats.add(mockReq, mockRes);

    // Assert
    expect(addSpy).toBeCalledTimes(1);
    expect(mockRes.status).toBeCalledWith(201);
    expect(mockJson).toBeCalledWith(mockMessage);

    addSpy.mockRestore();
  });
});
