const { MongoClient } = require('mongodb');
const connect = require('../../models/connection');

jest.spyOn(MongoClient, 'connect');

const ERROR_CODE = 1;

describe('Model User', () => {
  test('findAll', async () => {
    // Arange
    MongoClient.connect.mockImplementation(() => Promise.reject("error"));
    const exitMock = jest.spyOn(process, 'exit').mockImplementation(() => {});

    // Act
    await connect();

    // Assert
    expect(exitMock).toHaveBeenCalledWith(ERROR_CODE);
  });
});
