const controller = require('../../controllers');
const User = require('../../models/User');


describe('User Controller', () => {
  test('Find users', async () => {
    const mock = ['Joelamn'];

    const findAllSpy = jest.spyOn(User, 'getAll').mockReturnValueOnce(mock);

    const mockJson = jest.fn();
    const mockReq = {};
    const mockRes = { status: jest.fn().mockReturnValueOnce({ json: mockJson }) };

    // Act
    await controller.users.findAll(mockReq, mockRes);

    // Assert
    expect(findAllSpy).toBeCalledTimes(1);
    expect(mockRes.status).toBeCalledWith(200);
    expect(mockJson).toBeCalledWith(mock);

    findAllSpy.mockRestore();
  });

  test('Add user', async () => {
    const mockResponse = { ops: ['Nick'] };

    const addSpy = jest.spyOn(User, 'add').mockReturnValueOnce(mockResponse);

    const mockBody = { nickname: 'Nick' };

    const mockJson = jest.fn();
    const mockReq = { body: { ...mockBody } };
    const mockRes = { status: jest.fn().mockReturnValueOnce({ json: mockJson }) };

    // Act
    await controller.users.add(mockReq, mockRes);

    // Assert
    expect(addSpy).toBeCalledTimes(1);
    expect(mockRes.status).toBeCalledWith(201);
    expect(mockJson).toBeCalledWith('Nick');

    addSpy.mockRestore();
  });
});
