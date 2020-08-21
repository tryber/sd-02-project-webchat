const { MongoClient } = require('mongodb');
const connection = require('./connection');

jest.spyOn(MongoClient, 'connect');

describe('Connection tes', () => {
  test('Error', async () => {

    MongoClient.connect.mockImplementation(() => Promise.reject("error"));
    const exitMock = jest.spyOn(process, 'exit').mockImplementation(() => { });

    await connection();
    expect(exitMock).toHaveBeenCalledWith(1);
  });
});