const Func = require('./script');

afterEach(() => jest.clearAllMocks());

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
    });

    test('Creating a random user when don\'t text a userName', () => {
      const lsMock = jest.fn();
      const randomMocked = jest.fn().mockReturnValue(200);
      const resultMocked = { user: 'User200', newEmit: true };
      const newNameMocked = jest.fn().mockReturnValue(false);
      const socketMocked = ({ emit: jest.fn().mockImplementation((_, cb) => cb) });
      const setUserSpy = jest.spyOn(Func, 'setUserName');

      const result = Func.setUserName(socketMocked, newNameMocked, randomMocked, lsMock);

      expect(setUserSpy).toBeCalled();
      expect(setUserSpy).toBeCalledTimes(1);
      expect(result).toEqual(undefined);
      expect(newNameMocked).toBeCalled();
      expect(newNameMocked).toBeCalledTimes(1);
      expect(randomMocked).toBeCalled();
      expect(randomMocked).toBeCalledTimes(1);
      expect(lsMock).toBeCalled();
      expect(lsMock).toBeCalledTimes(3);
      expect(socketMocked.emit.mock.results[0].value).toStrictEqual(resultMocked);

      setUserSpy.mockRestore();
    });
  });

  describe('Testing loggedUser event', () => {
    // test('Testing if socket return undefined with socketUser = Geral', () => {
    //   const ulSpy = jest.spyOn(Func, 'ulMsg').mockImplementation(() => ({
    //     document: {
    //       getElementById: jest.fn().mockImplementation(() => ({
    //         append: jest.fn(),
    //       })),
    //     },
    //   }));
    //   // const ulMsg = document.getElementById('message');

    //   // const createLiNewUser = jest.fn();
    //   // const ulMocked = {

    //   //   append: jest.fn().mockImplementation(() => createLiNewUser()),
    //   // };
    //   const mock = {
    //     socketUser: 'Geral',
    //     ulMsg: {
    //       append: jest.fn().mockImplementation(() => jest.fn()),
    //     },
    //   };
    //   const msgMocked = 'Usuário lipe acabou de se conectar';
    //   const socketMocked = ({ on: jest.fn().mockImplementation((_, cb) => {
    //     cb(mock);
    //     return mock;
    //   }) });
    //   const newSpy = jest.spyOn(Func, 'newLoggin').mockImplementation((a) => {
    //     console.log(a);
    //   });
    //   Func.newLoggin(socketMocked.on.mock);
    //   console.log(ulSpy);
    //   expect(newSpy).toBeCalled();
    //   // expect(divMsgs.scrollTop).toEqual(divMsgs.scrollHeight);
    //   // expect(divMsgs.scrollTop).toEqual(10);
    //   // expect(createLiNewUser).toBeCalled();
    //   // expect(createLiNewUser).toBeCalledTimes(1);
    //   // expect(ulMsg.append).toBeCalled();
    //   // expect(ulMsg.append).toBeCalledTimes(1);
    //   // expect(socketMocked.on).toBeCalled();
    //   // expect(socketMocked.on).toBeCalledTimes(1);

    //   ulSpy.mockRestore();
    // });

    // test('Testing if socket doen\'t enter on branch with socketUser !== \'Geral\'', () => {
    //   const createLiNewUser = jest.fn();
    //   const ulMsg = {
    //     append: jest.fn(),
    //   };
    //   const divMsgs = {
    //     scrollTop: 0,
    //     scrollHeight: 10,
    //   };
    //   const socketMocked = ({ on: jest.fn().mockImplementation((event, callback) => {
    //     if (event === 'loggedUser') {
    //       return callback();
    //     }
    //   }) });

    //   const result = func.newLoggin(socketMocked, 'Lipe', ulMsg, divMsgs, createLiNewUser);

    //   expect(result).toEqual(undefined);
    //   expect(createLiNewUser).not.toBeCalled();
    //   expect(createLiNewUser).toBeCalledTimes(0);
    //   expect(divMsgs.scrollTop).toEqual(0);
    //   expect(ulMsg.append).toBeCalledTimes(0);
    // });
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
