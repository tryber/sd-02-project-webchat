// jest.spyOn(global, 'io').mockResolvedValueOnce(true);

const func = require('./FrontEnd-Func');

describe('Testing FrontEnd Functions', () => {
  describe('Testing setUserName', () => {
    test('Creating a name lipe', () => {
      const randomMocked = jest.fn();
      const objResul = { user: 'lipe', newEmit: true };
      const socketMocked = ({ emit: jest.fn().mockImplementation((_, cb) => cb) });
      const newNameMocked = jest.fn().mockReturnValueOnce('lipe');

      const result = func.setUserName(randomMocked, socketMocked, newNameMocked);

      expect(result).toEqual('lipe');
      expect(socketMocked.emit).toBeCalled();
      expect(socketMocked.emit).toBeCalledTimes(1);
      expect(newNameMocked).toBeCalled();
      expect(newNameMocked).toBeCalledTimes(1);
      expect(socketMocked.emit.mock.results[0].value).toEqual(objResul);
    });

    test('Creating a random user when don\'t text a userName', () => {
      const randomMocked = jest.fn().mockReturnValueOnce(200);
      const objResul = { user: 'User200', newEmit: true };
      const socketMocked = ({ emit: jest.fn().mockImplementation((_, cb) => cb) });
      const newNameMocked = jest.fn();

      const result = func.setUserName(randomMocked, socketMocked, newNameMocked);

      expect(result).toEqual('User200');
      expect(randomMocked).toBeCalled();
      expect(randomMocked).toBeCalledTimes(1);
      expect(newNameMocked).toBeCalled();
      expect(newNameMocked).toBeCalledTimes(1);
      expect(socketMocked.emit.mock.results[0].value).toEqual(objResul);
    });
  });

  describe('Testing loggedUser', () => {
    test('Testing if socket return undefined with socketUser = Geral', () => {
      const createLiNewUser = jest.fn();
      const ulMsg = {
        append: jest.fn(),
      };
      const divMsgs = {
        scrollTop: 0,
        scrollHeight: 10,
      };
      const socketMocked = ({ on: jest.fn().mockImplementation((event, callback) => {
        if (event === 'loggedUser') {
          return callback();
        }
      }) });

      const result = func.newLoggin(socketMocked, 'Geral', ulMsg, divMsgs, createLiNewUser);

      expect(result).toEqual(undefined);
      expect(divMsgs.scrollTop).toEqual(divMsgs.scrollHeight);
      expect(divMsgs.scrollTop).toEqual(10);
      expect(createLiNewUser).toBeCalled();
      expect(createLiNewUser).toBeCalledTimes(1);
      expect(ulMsg.append).toBeCalled();
      expect(ulMsg.append).toBeCalledTimes(1);
      expect(socketMocked.on).toBeCalled();
      expect(socketMocked.on).toBeCalledTimes(1);
    });

    test('Testing if socket doen\'t enter on branch with socketUser !== \'Geral\'', () => {
      const createLiNewUser = jest.fn();
      const ulMsg = {
        append: jest.fn(),
      };
      const divMsgs = {
        scrollTop: 0,
        scrollHeight: 10,
      };
      const socketMocked = ({ on: jest.fn().mockImplementation((event, callback) => {
        if (event === 'loggedUser') {
          return callback();
        }
      }) });

      const result = func.newLoggin(socketMocked, 'Lipe', ulMsg, divMsgs, createLiNewUser);

      expect(result).toEqual(undefined);
      expect(createLiNewUser).not.toBeCalled();
      expect(createLiNewUser).toBeCalledTimes(0);
      expect(divMsgs.scrollTop).toEqual(0);
      expect(ulMsg.append).toBeCalledTimes(0);
    });
  });

  describe('Testing disconnectUser', () => {
    test('Testing func call when disconnect user !== Geral', () => {
      const createLiNewUser = jest.fn();
      const ulMsg = {
        append: jest.fn(),
      };
      const divMsgs = {
        scrollTop: 0,
        scrollHeight: 10,
      };
      const socketMocked = ({ on: jest.fn().mockImplementation((event, callback) => {
        if (event === 'disconnectChat') {
          return callback();
        }
      }) });

      const result = func.disconnectUser(socketMocked, 'lipe', ulMsg, divMsgs, createLiNewUser);

      expect(result).toEqual(undefined);
      expect(divMsgs.scrollTop).not.toEqual(divMsgs.scrollHeight);
      expect(divMsgs.scrollTop).toEqual(0);
      expect(createLiNewUser).toBeCalledTimes(0);
      expect(ulMsg.append).toBeCalledTimes(0);
      expect(socketMocked.on).toBeCalled();
      expect(socketMocked.on).toBeCalledTimes(1);
    });

    test('Testing func call when disconnect user === Geral', () => {
      const createLiNewUser = jest.fn();
      const ulMsg = {
        append: jest.fn(),
      };
      const divMsgs = {
        scrollTop: 0,
        scrollHeight: 10,
      };
      const socketMocked = ({ on: jest.fn().mockImplementation((event, callback) => {
        if (event === 'disconnectChat') {
          return callback();
        }
      }) });

      const result = func.disconnectUser(socketMocked, 'Geral', ulMsg, divMsgs, createLiNewUser);

      expect(result).toEqual(undefined);
      expect(divMsgs.scrollTop).toEqual(divMsgs.scrollHeight);
      expect(divMsgs.scrollTop).toEqual(10);
      expect(createLiNewUser).toBeCalled();
      expect(createLiNewUser).toBeCalledTimes(1);
      expect(ulMsg.append).toBeCalled();
      expect(ulMsg.append).toBeCalledTimes(1);
      expect(socketMocked.on).toBeCalled();
      expect(socketMocked.on).toBeCalledTimes(1);
    });
  });

  describe('Testing disconnectList', () => {
    test('When user disconnect, clean online list and update', () => {
      const createLiNewUser = jest
        .fn()
        .mockReturnValueOnce('Geral', 'onlineUser', 'onlineSpan')
        .mockReturnValueOnce('lipe', 'onlineUser', 'onlineSpan')
        .mockReturnValueOnce('lala', 'onlineUser', 'onlineSpan');
      const users = [
        { user: 'lipe' },
        { user: 'lala' },
      ];
      const ulUsers = {
        innerText: '',
        append: jest.fn(),
      };

      const socketMocked = ({ on: jest.fn().mockImplementation((_, cb) => {
        cb(users);
        return users;
      }) });

      const result = func.disconnectList(socketMocked, ulUsers, createLiNewUser);

      expect(result).toEqual(undefined);
      expect(createLiNewUser).toBeCalled();
      expect(createLiNewUser).toBeCalledTimes(3);
      expect(socketMocked.on).toBeCalled();
      expect(socketMocked.on.mock.results[0].value).toEqual(users);
      expect(createLiNewUser).toHaveBeenNthCalledWith(1, 'Geral', 'onlineUser', 'onlineSpan');
      expect(createLiNewUser).toHaveBeenNthCalledWith(2, 'lipe', 'onlineUser', 'onlineSpan');
      expect(createLiNewUser).toHaveBeenNthCalledWith(3, 'lala', 'onlineUser', 'onlineSpan');
    });
  });

  // describe('Testing onlineUsers', () => {
  //   test('Create a Li \'Geral\' and not create li with user\'s when user === userName', () => {
  //     // eslint-disable-next-line prefer-const
  //     const ulUsers = {
  //       innerText: '',
  //       append: jest.fn(),
  //     };
  //     const createLiNewUser = jest
  //       .fn()
  //       .mockReturnValueOnce('Geral', 'onlineUser', 'onlineSpan');
  //     const users = {
  //       users: [
  //         { user: 'lipe', socket: 'xbIAleIiPn3ULEPtAAAD' },
  //       ],
  //     };

  //     const socketMocked = ({ on: jest.fn().mockImplementation(async (_, cb) => {
  //       cb(users);
  //       return users;
  //     }) });

  //     const result = func.onlineUsers(
  //       socketMocked, ulUsers, createLiNewUser, 'lipe', 'WcUYSNLCTdrTRB4wAAAE',
  //     );
  //     expect(ulUsers.innerText).toEqual('');
  //     expect(ulUsers.append).toBeCalled();
  //     expect(ulUsers.append).toBeCalledTimes(1);
  //     expect(createLiNewUser).toBeCalled();
  //     expect(createLiNewUser).toBeCalledTimes(1);
  //     expect(createLiNewUser).toHaveBeenNthCalledWith(1, 'Geral', 'onlineUser', 'onlineSpan');
  //     console.log(result);
  //     // console.log(socketMocked.on.mock.results[0].value);
  //     // console.log(socketMocked.on.mock.results[0].value);
  //     // expect(meSocketId).toEqual(users.users[0].socket);
  //   });
  // });
});
