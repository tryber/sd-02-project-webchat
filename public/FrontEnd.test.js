// jest.spyOn(global, 'io').mockResolvedValueOnce(true);

const setUserName = require('./setUserName.js');

describe('Testing FrontEnd Functions', () => {
  describe('Testing setUserName', () => {
    test('Creating a name lipe', () => {
      const randomMocked = jest.fn();
      const socketMocked = ({ emit: jest.fn() });
      const newNameMocked = jest.fn().mockReturnValueOnce('lipe');

      const result = setUserName(randomMocked, socketMocked, newNameMocked);

      expect(result).toEqual('lipe');
    });
    test('Creating a random user when don\'t text a userName', () => {
      const randomMocked = jest.fn().mockReturnValueOnce(200);
      const socketMocked = ({ emit: jest.fn() });
      const newNameMocked = jest.fn();

      const result = setUserName(randomMocked, socketMocked, newNameMocked);

      expect(result).toEqual('User200');
    });
  });
});
