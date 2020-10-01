const Func = require('./script');

describe('Testing FrontEnd Functions', () => {
  describe('Testing setUserName', () => {
    test('Creating a name lipe', () => {
      const randomMocked = jest.fn();
      const lsMock = jest.fn();
      const objResul = { user: 'lipe', newEmit: true };
      const socketMocked = ({ emit: jest.fn().mockImplementation((_, cb) => cb) });
      const newNameMocked = jest.fn().mockImplementation(() => 'lipe');
      const setSpy = jest.spyOn(Func, 'setUserName');

      const result = Func.setUserName(socketMocked, newNameMocked, randomMocked, lsMock);

      expect(result).toEqual(undefined);
      expect(socketMocked.emit).toBeCalled();
      expect(socketMocked.emit).toBeCalledTimes(1);
      expect(newNameMocked).toBeCalled();
      expect(newNameMocked).toBeCalledTimes(1);
      expect(randomMocked).toBeCalledTimes(0);
      expect(lsMock).toBeCalled();
      expect(lsMock).toBeCalledTimes(3);
      expect(socketMocked.emit.mock.results[0].value).toStrictEqual(objResul);
      expect(setSpy.mock.calls[0].length).toEqual(4);

      setSpy.mockRestore();
    });

    test('Creating a random user when don\'t text a userName', () => {
      const lsMock = jest.fn();
      const randomMocked = jest.fn().mockReturnValue(200);
      const resultMocked = { user: 'User200', newEmit: true };
      const newNameMocked = jest.fn().mockReturnValue(false);
      const socketMocked = ({ emit: jest.fn().mockImplementation((_, cb) => cb) });
      const setSpy = jest.spyOn(Func, 'setUserName');

      const result = Func.setUserName(socketMocked, newNameMocked, randomMocked, lsMock);

      expect(setSpy).toBeCalled();
      expect(setSpy).toBeCalledTimes(1);
      expect(result).toEqual(undefined);
      expect(newNameMocked).toBeCalled();
      expect(newNameMocked).toBeCalledTimes(1);
      expect(randomMocked).toBeCalled();
      expect(randomMocked).toBeCalledTimes(1);
      expect(lsMock).toBeCalled();
      expect(lsMock).toBeCalledTimes(3);
      expect(socketMocked.emit.mock.results[0].value).toStrictEqual(resultMocked);

      setSpy.mockRestore();
    });
  });

  describe('Testing newLoggin', () => {
    test('Testing creation of newLiUs with socketUser === Geral ', () => {
      const socketMock = ({ on: jest.fn().mockImplementation((_, b) => {
        b((__, ifCase) => ifCase);
      }) });
      const ulUsMock = { append: jest.fn() };
      const divMock = { scrollTop: 0, scrollHeight: 10 };
      const newLiUsMock = jest.fn();
      const getLsMock = jest.fn().mockReturnValue('Geral');
      const setLsMock = jest.fn();

      const newSpy = jest.spyOn(Func, 'newLoggin');
      const result = Func.newLoggin(
        socketMock, ulUsMock, divMock, newLiUsMock, getLsMock, setLsMock,
      );
      expect(result).toEqual(undefined);
      expect(socketMock.on).toBeCalled();
      expect(socketMock.on).toBeCalledTimes(1);
      expect(getLsMock).toBeCalled();
      expect(getLsMock).toBeCalledTimes(1);
      expect(ulUsMock.append).toBeCalled();
      expect(ulUsMock.append).toBeCalledTimes(1);
      expect(divMock.scrollTop).toEqual(divMock.scrollHeight);
      expect(divMock.scrollTop).toEqual(10);
      expect(setLsMock).toBeCalledTimes(0);
      expect(newSpy.mock.calls[0].length).toEqual(6);

      newSpy.mockRestore();
    });

    test('Testing undefined of socket.on with socketUser !== Geral ', () => {
      const socketMock = ({ on: jest.fn().mockImplementation((_, b) => b()) });
      const ulUsMock = { append: jest.fn() };
      const divMock = { scrollTop: 0, scrollHeight: 10 };
      const newLiUsMock = jest.fn();
      const getLsMock = jest.fn().mockReturnValue('lala');
      const setLsMock = jest.fn();

      const newSpy = jest.spyOn(Func, 'newLoggin');
      const result = Func.newLoggin(
        socketMock, ulUsMock, divMock, newLiUsMock, getLsMock, setLsMock,
      );
      expect(result).toEqual(undefined);
      expect(socketMock.on).toBeCalled();
      expect(socketMock.on).toBeCalledTimes(1);
      expect(getLsMock).toBeCalled();
      expect(getLsMock).toBeCalledTimes(1);
      expect(ulUsMock.append).toBeCalledTimes(0);
      expect(divMock.scrollTop).toEqual(0);
      expect(setLsMock).toBeCalledTimes(0);
      expect(newSpy.mock.calls[0].length).toEqual(6);

      newSpy.mockRestore();
    });
  });

  // describe('Testing disconnectUser', () => {
  //   test('Testing func call when disconnect user !== Geral', () => {
  //     const createLiNewUser = jest.fn();
  //     const ulMsg = {
  //       append: jest.fn(),
  //     };
  //     const divMsgs = {
  //       scrollTop: 0,
  //       scrollHeight: 10,
  //     };
  //     const socketMocked = ({ on: jest.fn().mockImplementation((event, callback) => {
  //       if (event === 'disconnectChat') {
  //         return callback();
  //       }
  //     }) });

  //     const result = func.disconnectUser(socketMocked, 'lipe', ulMsg, divMsgs, createLiNewUser);

  //     expect(result).toEqual(undefined);
  //     expect(divMsgs.scrollTop).not.toEqual(divMsgs.scrollHeight);
  //     expect(divMsgs.scrollTop).toEqual(0);
  //     expect(createLiNewUser).toBeCalledTimes(0);
  //     expect(ulMsg.append).toBeCalledTimes(0);
  //     expect(socketMocked.on).toBeCalled();
  //     expect(socketMocked.on).toBeCalledTimes(1);
  //   });

  //   test('Testing func call when disconnect user === Geral', () => {
  //     const createLiNewUser = jest.fn();
  //     const ulMsg = {
  //       append: jest.fn(),
  //     };
  //     const divMsgs = {
  //       scrollTop: 0,
  //       scrollHeight: 10,
  //     };
  //     const socketMocked = ({ on: jest.fn().mockImplementation((event, callback) => {
  //       if (event === 'disconnectChat') {
  //         return callback();
  //       }
  //     }) });

  //     const result = func.disconnectUser(socketMocked, 'Geral', ulMsg, divMsgs, createLiNewUser);

  //     expect(result).toEqual(undefined);
  //     expect(divMsgs.scrollTop).toEqual(divMsgs.scrollHeight);
  //     expect(divMsgs.scrollTop).toEqual(10);
  //     expect(createLiNewUser).toBeCalled();
  //     expect(createLiNewUser).toBeCalledTimes(1);
  //     expect(ulMsg.append).toBeCalled();
  //     expect(ulMsg.append).toBeCalledTimes(1);
  //     expect(socketMocked.on).toBeCalled();
  //     expect(socketMocked.on).toBeCalledTimes(1);
  //   });
  // });

  // describe('Testing disconnectList', () => {
  //   test('When user disconnect, clean online list and update', () => {
  //     const createLiNewUser = jest
  //       .fn()
  //       .mockReturnValueOnce('Geral', 'onlineUser', 'onlineSpan')
  //       .mockReturnValueOnce('lipe', 'onlineUser', 'onlineSpan')
  //       .mockReturnValueOnce('lala', 'onlineUser', 'onlineSpan');
  //     const users = [
  //       { user: 'lipe' },
  //       { user: 'lala' },
  //     ];
  //     const ulUsers = {
  //       innerText: '',
  //       append: jest.fn(),
  //     };

  //     const socketMocked = ({ on: jest.fn().mockImplementation((_, cb) => {
  //       cb(users);
  //       return users;
  //     }) });

  //     const result = func.disconnectList(socketMocked, ulUsers, createLiNewUser);

  //     expect(result).toEqual(undefined);
  //     expect(createLiNewUser).toBeCalled();
  //     expect(createLiNewUser).toBeCalledTimes(3);
  //     expect(socketMocked.on).toBeCalled();
  //     expect(socketMocked.on.mock.results[0].value).toEqual(users);
  //     expect(createLiNewUser).toHaveBeenNthCalledWith(1, 'Geral', 'onlineUser', 'onlineSpan');
  //     expect(createLiNewUser).toHaveBeenNthCalledWith(2, 'lipe', 'onlineUser', 'onlineSpan');
  //     expect(createLiNewUser).toHaveBeenNthCalledWith(3, 'lala', 'onlineUser', 'onlineSpan');
  //   });
  // });

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
