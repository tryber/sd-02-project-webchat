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
      const socketMock = ({
        on: jest.fn().mockImplementation((_, b) => {
          b((__, ifCase) => ifCase);
        }),
      });
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
      const getLsMock = jest.fn().mockReturnValue('lipe');
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

  describe('Testing disconnectUser', () => {
    test('Testing func call when disconnect user !== Geral doens\'t create liNewUs', () => {
      const socketMocked = ({ on: jest.fn().mockImplementation((_, cb) => cb()) });
      const uMsgMock = {
        append: jest.fn(),
      };
      const divMock = { scrollTop: 0, scrollHeight: 10 };
      const liNewUsMock = jest.fn();
      const getLsMock = jest.fn().mockReturnValue('lipe');
      const setLsMock = jest.fn();
      const discoUserSpy = jest.spyOn(Func, 'disconnectUser');

      const result = Func.disconnectUser(
        socketMocked, uMsgMock, divMock, liNewUsMock, getLsMock, setLsMock,
      );

      expect(result).toEqual(undefined);
      expect(uMsgMock.append).toBeCalledTimes(0);
      expect(socketMocked.on).toBeCalled();
      expect(socketMocked.on).toBeCalledTimes(1);
      expect(getLsMock).toBeCalled();
      expect(getLsMock).toBeCalledTimes(1);
      expect(setLsMock).toBeCalledTimes(0);
      expect(divMock.scrollTop).not.toEqual(divMock.scrollHeight);
      expect(discoUserSpy.mock.calls[0].length).toEqual(6);

      discoUserSpy.mockRestore();
    });

    test('Testing func call when disconnect user === Geral, create liNewUs', () => {
      const socketMocked = ({ on: jest.fn().mockImplementation((_, cb) => cb()) });
      const uMsgMock = {
        append: jest.fn(),
      };
      const divMock = { scrollTop: 0, scrollHeight: 10 };
      const liNewUsMock = jest.fn();
      const getLsMock = jest.fn().mockReturnValue('Geral');
      const setLsMock = jest.fn();
      const discoUserSpy = jest.spyOn(Func, 'disconnectUser');

      const result = Func.disconnectUser(
        socketMocked, uMsgMock, divMock, liNewUsMock, getLsMock, setLsMock,
      );

      expect(result).toEqual(undefined);
      expect(uMsgMock.append).toBeCalled();
      expect(uMsgMock.append).toBeCalledTimes(1);
      expect(socketMocked.on).toBeCalled();
      expect(socketMocked.on).toBeCalledTimes(1);
      expect(getLsMock).toBeCalled();
      expect(getLsMock).toBeCalledTimes(1);
      expect(setLsMock).toBeCalledTimes(0);
      expect(divMock.scrollTop).toEqual(divMock.scrollHeight);
      expect(discoUserSpy.mock.calls[0].length).toEqual(6);

      discoUserSpy.mockRestore();
    });
  });

  describe('Testing disconnectList', () => {
    test('when socket.on call createliNewUs to update onlineUsers', () => {
      const usersArray = [
        { user: 'lipe' },
        { user: 'john' },
      ];
      const socketMocked = ({
        on: jest.fn().mockImplementation((_, users) => {
          users(usersArray);
          return usersArray;
        }),
      });
      const uUsersMocked = {
        innerText: '',
        append: jest.fn(),
      };
      const liNewUs = jest.fn();

      const discoListSpy = jest.spyOn(Func, 'disconnectList');

      const result = Func.disconnectList(socketMocked, uUsersMocked, liNewUs);

      expect(discoListSpy).toBeCalled();
      expect(result).toEqual(undefined);
      expect(socketMocked.on).toBeCalled();
      expect(socketMocked.on).toBeCalledTimes(1);
      expect(socketMocked.on.mock.results[0].value).toStrictEqual(usersArray);
      expect(uUsersMocked.append).toBeCalled();
      expect(uUsersMocked.append).toBeCalledTimes(3);
      expect(liNewUs).toBeCalled();
      expect(liNewUs).toBeCalledTimes(3);
      expect(liNewUs).toHaveBeenNthCalledWith(
        1, 'Geral', 'onlineUser', 'onlineSpan', null, socketMocked,
      );
      expect(liNewUs).toHaveBeenNthCalledWith(
        2, 'lipe', 'onlineUser', 'onlineSpan', null, socketMocked,
      );
      expect(liNewUs).toHaveBeenNthCalledWith(
        3, 'john', 'onlineUser', 'onlineSpan', null, socketMocked,
      );
      expect(discoListSpy.mock.calls[0].length).toEqual(3);

      discoListSpy.mockRestore();
    });
  });

  describe('Testing onlineUsers', () => {
    test('Create a Li \'Geral\' setLocalStorage for user === userName and Li when !== userName', () => {
      const usersArray = {
        users: [
          { user: 'lipe', socket: 'lRJt-E_v0ebgxDOOAAAB' },
          { user: 'john', socket: 'nKpl8dEsTlqXMSHwAAAg' },
        ],
      };
      const socketMocked = ({
        on: jest.fn().mockImplementation((_, users) => {
          users(usersArray);
          return usersArray;
        }),
      });
      const ulUsMock = { innerText: '', append: jest.fn() };
      const newLiUsMock = jest.fn();
      const getLsMock = jest.fn().mockReturnValue('lipe');
      const setLsMock = jest.fn();

      const onlineSpy = jest.spyOn(Func, 'onlineUsers');

      const result = Func.onlineUsers(socketMocked, ulUsMock, newLiUsMock, getLsMock, setLsMock);

      expect(result).toEqual(undefined);
      expect(onlineSpy).toBeCalled();
      expect(getLsMock).toBeCalled();
      expect(getLsMock).toBeCalledTimes(1);
      expect(setLsMock).toBeCalled();
      expect(setLsMock).toBeCalledTimes(1);
      expect(ulUsMock.innerText).toEqual('');
      expect(ulUsMock.append).toBeCalled();
      expect(ulUsMock.append).toBeCalledTimes(2);
      expect(newLiUsMock).toBeCalled();
      expect(newLiUsMock).toBeCalledTimes(2);
      expect(newLiUsMock).toHaveBeenNthCalledWith(
        1, 'Geral', 'onlineUser', 'onlineSpan', null, socketMocked, getLsMock, setLsMock,
      );
      expect(newLiUsMock).toHaveBeenNthCalledWith(
        2, 'john', 'onlineUser', 'onlineSpan', 'nKpl8dEsTlqXMSHwAAAg', socketMocked, getLsMock, setLsMock,
      );
      expect(onlineSpy.mock.calls[0].length).toEqual(5);

      onlineSpy.mockRestore();
    });
  });

  describe('Testing receiveHistory', () => {
    test('Create a Li with history messages when call \'history\' event of socket', () => {
      const historyArray = {
        modelAnswer: { userHistory: 'lipe', message: 'eae gerat', date: 1601617374867 },
      };
      const socketMocked = ({
        on: jest.fn().mockImplementation((_, users) => {
          users(historyArray);
          return historyArray;
        }),
      });
      const uMsgMock = { innerText: '', append: jest.fn() };
      const divMsgMock = {
        scrollTop: 10,
      };
      const liMsgMock = jest.fn();
      const getLsMock = jest.fn().mockReturnValue('Geral');

      const receiveHisSpy = jest.spyOn(Func, 'receiveHistory');

      const result = Func.receiveHistory(socketMocked, uMsgMock, divMsgMock, liMsgMock, getLsMock);

      expect(result).toEqual(undefined);
      expect(receiveHisSpy).toBeCalled();
      expect(getLsMock).toBeCalled();
      expect(getLsMock).toBeCalledTimes(1);
      expect(uMsgMock.innerText).toEqual('Falando com: Geral');
      expect(uMsgMock.append).toBeCalled();
      expect(uMsgMock.append).toBeCalledTimes(1);
      expect(liMsgMock).toBeCalled();
      expect(liMsgMock).toBeCalledTimes(1);
      expect(liMsgMock).toHaveBeenNthCalledWith(
        1, { user: 'lipe', message: 'eae gerat', date: 1601617374867 },
      );
      expect(divMsgMock.scrollTop).toEqual(0);
      expect(receiveHisSpy.mock.calls[0].length).toEqual(5);

      receiveHisSpy.mockRestore();
    });
  });

  describe('Testing receiveMessagePrivate', () => {
    test(
      'user !== undefined, clicked === true and meSocket === meSocketId create li with message',
      () => {
        const historyArray = {
          modelAnswer: { user: 'john', message: 'eae dog', date: 1601617374867 },
          meSocket: 'nKpl8dEsTlqXMSHwAAAg',
        };
        const socketMocked = ({
          on: jest.fn().mockImplementation((_, users) => {
            users(historyArray);
            return historyArray;
          }),
        });
        const uMsgMock = { append: jest.fn() };
        const divMsgMock = { scrollTop: 0, scrollHeight: 10 };
        const privMsgMock = jest.fn();
        const getLsMock = jest.fn()
          .mockReturnValueOnce('true')
          .mockReturnValueOnce('nKpl8dEsTlqXMSHwAAAg')
          .mockReturnValueOnce('lRJt-E_v0ebgxDOOAAAB');

        const receiveMsgPvtSpy = jest.spyOn(Func, 'receiveMessagePrivate');

        const result = Func.receiveMessagePrivate(
          socketMocked, uMsgMock, divMsgMock, privMsgMock, getLsMock,
        );

        expect(result).toEqual(undefined);
        expect(receiveMsgPvtSpy).toBeCalled();
        expect(getLsMock).toBeCalled();
        expect(getLsMock).toBeCalledTimes(3);
        expect(getLsMock).toHaveBeenNthCalledWith(1, 'clicked');
        expect(getLsMock).toHaveBeenNthCalledWith(2, 'socketIdPrivate');
        expect(getLsMock).toHaveBeenNthCalledWith(3, 'meSocketId');
        expect(uMsgMock.append).toBeCalled();
        expect(uMsgMock.append).toBeCalledTimes(1);
        expect(privMsgMock).toBeCalled();
        expect(privMsgMock).toBeCalledTimes(1);
        expect(privMsgMock).toHaveBeenNthCalledWith(
          1, { user: 'john', message: 'eae dog', date: 1601617374867 },
        );
        expect(divMsgMock.scrollTop).toEqual(divMsgMock.scrollHeight);
        expect(receiveMsgPvtSpy.mock.calls[0].length).toEqual(5);

        receiveMsgPvtSpy.mockRestore();
      },
    );

    test(
      'user !== undefined, clicked === true and meSocket === socketPrivate create li with message',
      () => {
        const historyArray = {
          modelAnswer: { user: 'john', message: 'eae dog', date: 1601617374867 },
          meSocket: 'lRJt-E_v0ebgxDOOAAAB',
        };
        const socketMocked = ({
          on: jest.fn().mockImplementation((_, users) => {
            users(historyArray);
            return historyArray;
          }),
        });
        const uMsgMock = { append: jest.fn() };
        const divMsgMock = { scrollTop: 0, scrollHeight: 10 };
        const privMsgMock = jest.fn();
        const getLsMock = jest.fn()
          .mockReturnValueOnce('true')
          .mockReturnValueOnce('nKpl8dEsTlqXMSHwAAAg')
          .mockReturnValueOnce('lRJt-E_v0ebgxDOOAAAB');

        const receiveMsgPvtSpy = jest.spyOn(Func, 'receiveMessagePrivate');

        const result = Func.receiveMessagePrivate(
          socketMocked, uMsgMock, divMsgMock, privMsgMock, getLsMock,
        );

        expect(result).toEqual(undefined);
        expect(receiveMsgPvtSpy).toBeCalled();
        expect(getLsMock).toBeCalled();
        expect(getLsMock).toBeCalledTimes(3);
        expect(getLsMock).toHaveBeenNthCalledWith(1, 'clicked');
        expect(getLsMock).toHaveBeenNthCalledWith(2, 'socketIdPrivate');
        expect(getLsMock).toHaveBeenNthCalledWith(3, 'meSocketId');
        expect(uMsgMock.append).toBeCalled();
        expect(uMsgMock.append).toBeCalledTimes(1);
        expect(privMsgMock).toBeCalled();
        expect(privMsgMock).toBeCalledTimes(1);
        expect(privMsgMock).toHaveBeenNthCalledWith(
          1, { user: 'john', message: 'eae dog', date: 1601617374867 },
        );
        expect(divMsgMock.scrollTop).toEqual(divMsgMock.scrollHeight);
        expect(receiveMsgPvtSpy.mock.calls[0].length).toEqual(5);

        receiveMsgPvtSpy.mockRestore();
      },
    );

    test('Testing case if any is true', () => {
      const historyArray = {
        modelAnswer: { user: 'john', message: 'eae dog', date: 1601617374867 },
        meSocket: 'lRJt-E_v0ebgxDOOAAAB',
      };
      const socketMocked = ({
        on: jest.fn().mockImplementation((_, users) => {
          users(historyArray);
          return historyArray;
        }),
      });
      const uMsgMock = { append: jest.fn() };
      const divMsgMock = { scrollTop: 0, scrollHeight: 10 };
      const privMsgMock = jest.fn();
      const getLsMock = jest.fn()
        .mockReturnValueOnce('false')
        .mockReturnValueOnce('nKpl8dEsTlqXMSHwAAAg')
        .mockReturnValueOnce('lRJt-E_v0ebgxDOOAAAB');

      const receiveMsgPvtSpy = jest.spyOn(Func, 'receiveMessagePrivate');

      const result = Func.receiveMessagePrivate(
        socketMocked, uMsgMock, divMsgMock, privMsgMock, getLsMock,
      );

      expect(result).toEqual(undefined);
      expect(receiveMsgPvtSpy).toBeCalled();
      expect(getLsMock).toBeCalled();
      expect(getLsMock).toBeCalledTimes(3);
      expect(getLsMock).toHaveBeenNthCalledWith(1, 'clicked');
      expect(getLsMock).toHaveBeenNthCalledWith(2, 'socketIdPrivate');
      expect(getLsMock).toHaveBeenNthCalledWith(3, 'meSocketId');
      expect(uMsgMock.append).toBeCalledTimes(0);
      expect(privMsgMock).toBeCalledTimes(0);
      expect(divMsgMock.scrollTop).toEqual(0);
      expect(receiveMsgPvtSpy.mock.calls[0].length).toEqual(5);

      receiveMsgPvtSpy.mockRestore();
    });
  });

  describe('Testing historyPrivateMessage', () => {
    test(
      'user !== undefined, clicked === true and meSocket === meSocketId create li with message',
      () => {
        const historyArray = {
          modelAnswer: { user: 'john', message: 'eae dog', date: 1601617374867 },
          meSocket: 'nKpl8dEsTlqXMSHwAAAg',
        };
        const socketMocked = ({
          on: jest.fn().mockImplementation((_, users) => {
            users(historyArray);
            return historyArray;
          }),
        });
        const uMsgMock = { append: jest.fn() };
        const divMsgMock = { scrollTop: 0, scrollHeight: 10 };
        const privMsgMock = jest.fn();
        const getLsMock = jest.fn()
          .mockReturnValueOnce('true')
          .mockReturnValueOnce('nKpl8dEsTlqXMSHwAAAg')
          .mockReturnValueOnce('lRJt-E_v0ebgxDOOAAAB');

        const histPvtSpy = jest.spyOn(Func, 'historyPrivateMessage');

        const result = Func.historyPrivateMessage(
          socketMocked, uMsgMock, divMsgMock, privMsgMock, getLsMock,
        );

        expect(result).toEqual(undefined);
        expect(histPvtSpy).toBeCalled();
        expect(getLsMock).toBeCalled();
        expect(getLsMock).toBeCalledTimes(3);
        expect(getLsMock).toHaveBeenNthCalledWith(1, 'clicked');
        expect(getLsMock).toHaveBeenNthCalledWith(2, 'socketIdPrivate');
        expect(getLsMock).toHaveBeenNthCalledWith(3, 'meSocketId');
        expect(uMsgMock.append).toBeCalled();
        expect(uMsgMock.append).toBeCalledTimes(1);
        expect(privMsgMock).toBeCalled();
        expect(privMsgMock).toBeCalledTimes(1);
        expect(privMsgMock).toHaveBeenNthCalledWith(
          1, { user: 'john', message: 'eae dog', date: 1601617374867 },
        );
        expect(divMsgMock.scrollTop).toEqual(divMsgMock.scrollHeight);
        expect(histPvtSpy.mock.calls[0].length).toEqual(5);

        histPvtSpy.mockRestore();
      },
    );

    test(
      'user !== undefined, clicked === true and meSocket === socketPrivate create li with message',
      () => {
        const historyArray = {
          modelAnswer: { user: 'john', message: 'eae dog', date: 1601617374867 },
          meSocket: 'lRJt-E_v0ebgxDOOAAAB',
        };
        const socketMocked = ({
          on: jest.fn().mockImplementation((_, users) => {
            users(historyArray);
            return historyArray;
          }),
        });
        const uMsgMock = { append: jest.fn() };
        const divMsgMock = { scrollTop: 0, scrollHeight: 10 };
        const privMsgMock = jest.fn();
        const getLsMock = jest.fn()
          .mockReturnValueOnce('true')
          .mockReturnValueOnce('nKpl8dEsTlqXMSHwAAAg')
          .mockReturnValueOnce('lRJt-E_v0ebgxDOOAAAB');

        const histPvtSpy = jest.spyOn(Func, 'historyPrivateMessage');

        const result = Func.historyPrivateMessage(
          socketMocked, uMsgMock, divMsgMock, privMsgMock, getLsMock,
        );

        expect(result).toEqual(undefined);
        expect(histPvtSpy).toBeCalled();
        expect(getLsMock).toBeCalled();
        expect(getLsMock).toBeCalledTimes(3);
        expect(getLsMock).toHaveBeenNthCalledWith(1, 'clicked');
        expect(getLsMock).toHaveBeenNthCalledWith(2, 'socketIdPrivate');
        expect(getLsMock).toHaveBeenNthCalledWith(3, 'meSocketId');
        expect(uMsgMock.append).toBeCalled();
        expect(uMsgMock.append).toBeCalledTimes(1);
        expect(privMsgMock).toBeCalled();
        expect(privMsgMock).toBeCalledTimes(1);
        expect(privMsgMock).toHaveBeenNthCalledWith(
          1, { user: 'john', message: 'eae dog', date: 1601617374867 },
        );
        expect(divMsgMock.scrollTop).toEqual(divMsgMock.scrollHeight);
        expect(histPvtSpy.mock.calls[0].length).toEqual(5);

        histPvtSpy.mockRestore();
      },
    );

    test('Testing case if any is true', () => {
      const historyArray = {
        modelAnswer: { user: 'john', message: 'eae dog', date: 1601617374867 },
        meSocket: 'lRJt-E_v0ebgxDOOAAAB',
      };
      const socketMocked = ({
        on: jest.fn().mockImplementation((_, users) => {
          users(historyArray);
          return historyArray;
        }),
      });
      const uMsgMock = { append: jest.fn() };
      const divMsgMock = { scrollTop: 0, scrollHeight: 10 };
      const privMsgMock = jest.fn();
      const getLsMock = jest.fn()
        .mockReturnValueOnce('false')
        .mockReturnValueOnce('nKpl8dEsTlqXMSHwAAAg')
        .mockReturnValueOnce('lRJt-E_v0ebgxDOOAAAB');

      const histPvtSpy = jest.spyOn(Func, 'historyPrivateMessage');

      const result = Func.historyPrivateMessage(
        socketMocked, uMsgMock, divMsgMock, privMsgMock, getLsMock,
      );

      expect(result).toEqual(undefined);
      expect(histPvtSpy).toBeCalled();
      expect(getLsMock).toBeCalled();
      expect(getLsMock).toBeCalledTimes(3);
      expect(getLsMock).toHaveBeenNthCalledWith(1, 'clicked');
      expect(getLsMock).toHaveBeenNthCalledWith(2, 'socketIdPrivate');
      expect(getLsMock).toHaveBeenNthCalledWith(3, 'meSocketId');
      expect(uMsgMock.append).toBeCalledTimes(0);
      expect(privMsgMock).toBeCalledTimes(0);
      expect(divMsgMock.scrollTop).toEqual(0);
      expect(histPvtSpy.mock.calls[0].length).toEqual(5);

      histPvtSpy.mockRestore();
    });
  });

  describe('Testing receiveMessageAll', () => {
    test('When socketUser === Geral, create Li with message', () => {
      const messageObj = {
        modelAnswer: { user: 'john', message: 'eae dog', date: 1601617374867 },
      };
      const socketMocked = ({
        on: jest.fn().mockImplementation((_, users) => {
          users(messageObj);
          return messageObj;
        }),
      });
      const uMsgMock = { append: jest.fn() };
      const divMsgMock = { scrollTop: 0, scrollHeight: 10 };
      const liMsgMock = jest.fn();
      const getLsMock = jest.fn().mockReturnValue('Geral');

      const receiveAllSpy = jest.spyOn(Func, 'receiveMessageAll');

      const result = Func.receiveMessageAll(
        socketMocked, uMsgMock, divMsgMock, liMsgMock, getLsMock,
      );

      expect(result).toEqual(undefined);
      expect(receiveAllSpy).toBeCalled();
      expect(getLsMock).toBeCalled();
      expect(getLsMock).toBeCalledTimes(1);
      expect(uMsgMock.append).toBeCalled();
      expect(uMsgMock.append).toBeCalledTimes(1);
      expect(liMsgMock).toBeCalled();
      expect(liMsgMock).toBeCalledTimes(1);
      expect(divMsgMock.scrollTop).toEqual(divMsgMock.scrollHeight);
      expect(liMsgMock).toHaveBeenNthCalledWith(
        1, { user: 'john', message: 'eae dog', date: 1601617374867 },
      );
      expect(receiveAllSpy.mock.calls[0].length).toEqual(5);

      receiveAllSpy.mockRestore();
    });

    test('When socketUser !== Geral, not create Li with message', () => {
      const messageObj = {
        modelAnswer: { user: 'john', message: 'eae dog', date: 1601617374867 },
      };
      const socketMocked = ({
        on: jest.fn().mockImplementation((_, users) => {
          users(messageObj);
          return messageObj;
        }),
      });
      const uMsgMock = { append: jest.fn() };
      const divMsgMock = { scrollTop: 0, scrollHeight: 10 };
      const liMsgMock = jest.fn();
      const getLsMock = jest.fn().mockReturnValue('lipe');

      const receiveAllSpy = jest.spyOn(Func, 'receiveMessageAll');

      const result = Func.receiveMessageAll(
        socketMocked, uMsgMock, divMsgMock, liMsgMock, getLsMock,
      );

      expect(result).toEqual(undefined);
      expect(receiveAllSpy).toBeCalled();
      expect(getLsMock).toBeCalled();
      expect(getLsMock).toBeCalledTimes(1);
      expect(uMsgMock.append).toBeCalledTimes(0);
      expect(liMsgMock).toBeCalledTimes(0);
      expect(divMsgMock.scrollTop).toEqual(0);
      expect(receiveAllSpy.mock.calls[0].length).toEqual(5);

      receiveAllSpy.mockRestore();
    });
  });

  describe('Testing createLiMsg', () => {
    test('Create li with obj with user, message and date', () => {
      const message = { user: 'lipe', message: 'eae men', date: 1601617374867 };
      const expectResult = '<div class="msgContainer"><span class="userName">lipe</span> <span class="msgSpan">eae men</span> <span class="date">02/10/2020 02:42:54</span></div>';
      const createLiSpy = jest.spyOn(Func, 'createLiMsg');
      const result = Func.createLiMsg(message);

      expect(createLiSpy).toBeCalled();
      expect(result.innerHTML).toEqual(expectResult);
      expect(createLiSpy.mock.calls[0][0]).toEqual(message);
      expect(createLiSpy.mock.calls[0].length).toEqual(1);

      createLiSpy.mockRestore();
    });
  });

  describe('Testing createPrivateMsg', () => {
    test('Create li with obj with user, message and date', () => {
      const message = { user: 'lipe', message: 'eae men', date: 1601617374867 };
      const expectResult = '<div class="msgContainer"><span class="userName">lipe</span> <span class="msgSpan">eae men</span> <span class="date">02/10/2020 02:42:54</span></div>';
      const createPvtMsgSpy = jest.spyOn(Func, 'createPrivateMsg');
      const result = Func.createPrivateMsg(message);

      expect(createPvtMsgSpy).toBeCalled();
      expect(result.innerHTML).toEqual(expectResult);
      expect(createPvtMsgSpy.mock.calls[0][0]).toEqual(message);
      expect(createPvtMsgSpy.mock.calls[0].length).toEqual(1);

      createPvtMsgSpy.mockRestore();
    });
  });

  describe('Testing randomNumber256', () => {
    test('Return randomNumber', () => {
      const randomSpy = jest.spyOn(Func, 'randomNumber256');
      const result = Func.randomNumber256();

      expect(randomSpy).toBeCalled();
      expect(typeof result).toEqual('number');

      randomSpy.mockRestore();
    });
  });

  describe('Testing setLocalStorage', () => {
    test('setItem to localStorage', () => {
      const setLsSpy = jest.spyOn(Func, 'setLocalStorage');
      const result = Func.setLocalStorage('userName', 'lipe');

      expect(setLsSpy).toBeCalled();
      expect(result).toEqual(undefined);
      expect(setLsSpy.mock.calls[0].length).toEqual(2);
      expect(setLsSpy.mock.calls[0][0]).toEqual('userName', 'lipe');

      setLsSpy.mockRestore();
    });
  });

  describe('Testing getLocalStorage', () => {
    beforeEach(() => {
      localStorage.setItem('userName', 'lipe');
    });
    afterEach(() => {
      localStorage.clear();
    });
    test('getItem from localStorage with userName return \'lipe\'', () => {
      const getLsSpy = jest.spyOn(Func, 'getLocalStorage');
      const result = Func.getLocalStorage('userName');

      expect(getLsSpy).toBeCalled();
      expect(result).toEqual('lipe');
      expect(getLsSpy.mock.calls[0].length).toEqual(1);
      expect(getLsSpy.mock.calls[0][0]).toEqual('userName');

      getLsSpy.mockRestore();
    });
  });

  describe('Testing setBgColor', () => {
    test('Testing case when socketUser !== Geral socket.emit to \'privateHistory\'', () => {
      const event = {
        target: {
          innerText: 'lipe',
          getAttribute: jest.fn().mockReturnValue('nKpl8dEsTlqXMSHwAAAg'),
        },
      };
      const socketMocked = ({ emit: jest.fn().mockImplementation((_, cb) => cb) });
      const getLsMock = jest.fn()
        .mockReturnValueOnce('lipe')
        .mockReturnValueOnce('john');
      const setLsMock = jest.fn();
      const emitObj = { user: 'lipe', forUser: 'john' };
      const uMsgMock = { innerText: '' };

      const setBgSpy = jest.spyOn(Func, 'setBgColor');

      const result = Func.setBgColor(event, socketMocked, getLsMock, setLsMock, uMsgMock);

      expect(result).toEqual(undefined);
      expect(setBgSpy).toBeCalled();
      expect(setLsMock).toBeCalled();
      expect(setLsMock).toBeCalledTimes(3);
      expect(setLsMock).toHaveBeenNthCalledWith(1, 'socketUser', 'lipe');
      expect(setLsMock).toHaveBeenNthCalledWith(2, 'socketIdPrivate', 'nKpl8dEsTlqXMSHwAAAg');
      expect(setLsMock).toHaveBeenNthCalledWith(3, 'clicked', true);
      expect(getLsMock).toBeCalled();
      expect(getLsMock).toBeCalledTimes(2);
      expect(getLsMock).toHaveBeenNthCalledWith(1, 'userName');
      expect(getLsMock).toHaveBeenNthCalledWith(2, 'socketUser');
      expect(socketMocked.emit).toBeCalled();
      expect(socketMocked.emit).toBeCalledTimes(1);
      expect(setBgSpy.mock.calls[0][1].emit.mock.calls[0][0]).toEqual('privateHistory', emitObj);
      expect(uMsgMock.innerText).toEqual('Falando com: john');

      setBgSpy.mockRestore();
    });

    test('Testing case when socketUser === Geral socket.emit to \'loginUser\'', () => {
      const event = {
        target: {
          innerText: 'lipe',
          getAttribute: jest.fn().mockReturnValue('nKpl8dEsTlqXMSHwAAAg'),
        },
      };
      const socketMocked = ({ emit: jest.fn().mockImplementation((_, cb) => cb) });
      const getLsMock = jest.fn()
        .mockReturnValueOnce('lipe')
        .mockReturnValueOnce('Geral');
      const setLsMock = jest.fn();
      const emitObj = { user: 'lipe', newEmit: false };
      const uMsgMock = { innerText: '' };

      const setBgSpy = jest.spyOn(Func, 'setBgColor');

      const result = Func.setBgColor(event, socketMocked, getLsMock, setLsMock, uMsgMock);

      expect(result).toEqual(undefined);
      expect(setBgSpy).toBeCalled();
      expect(setLsMock).toBeCalled();
      expect(setLsMock).toBeCalledTimes(3);
      expect(setLsMock).toHaveBeenNthCalledWith(1, 'socketUser', 'lipe');
      expect(setLsMock).toHaveBeenNthCalledWith(2, 'socketIdPrivate', 'nKpl8dEsTlqXMSHwAAAg');
      expect(setLsMock).toHaveBeenNthCalledWith(3, 'clicked', false);
      expect(getLsMock).toBeCalled();
      expect(getLsMock).toBeCalledTimes(2);
      expect(getLsMock).toHaveBeenNthCalledWith(1, 'userName');
      expect(getLsMock).toHaveBeenNthCalledWith(2, 'socketUser');
      expect(socketMocked.emit).toBeCalled();
      expect(socketMocked.emit).toBeCalledTimes(1);
      expect(setBgSpy.mock.calls[0].length).toEqual(5);
      expect(setBgSpy.mock.calls[0][1].emit.mock.calls[0][0]).toEqual('loginUser', emitObj);
      expect(uMsgMock.innerText).toEqual('Falando com: Geral');
    });
  });

  describe('Testing createLiNewUser', () => {
    test('Testing create of new user when newUser !== Geral', () => {
      const newUser = 'lipe';
      const divClass = 'onlineUser';
      const spanClass = 'onlineSpan';
      const socketIdUser = 'lRJt-E_v0ebgxDOOAAAB';
      const socketMocked = jest.fn();
      const getLsMock = jest.fn();
      const setLsMock = jest.fn();
      const expected = '<div value="lRJt-E_v0ebgxDOOAAAB" class="onlineUser"><span value="lRJt-E_v0ebgxDOOAAAB" class="onlineSpan">lipe</span></div>';

      const createNewUsSpy = jest.spyOn(Func, 'createLiNewUser');

      const result = Func.createLiNewUser(
        newUser, divClass, spanClass, socketIdUser, socketMocked, getLsMock, setLsMock,
      );

      expect(createNewUsSpy).toBeCalled();
      expect(result.innerHTML).toEqual(expected);
    });

    test('Testing create of new user when newUser === Geral', () => {
      const newUser = 'Geral';
      const divClass = 'onlineUser';
      const spanClass = 'onlineSpan';
      const socketIdUser = 'lRJt-E_v0ebgxDOOAAAB';
      const socketMocked = jest.fn();
      const getLsMock = jest.fn();
      const setLsMock = jest.fn();
      const expected = '<div value="0.5660375682017729" class="onlineUser"><span value="0.5660375682017729" class="onlineSpan">Geral</span></div>';

      const randomSpy = jest.spyOn(Math, 'random').mockReturnValue(0.5660375682017729);
      const createNewUsSpy = jest.spyOn(Func, 'createLiNewUser');

      const result = Func.createLiNewUser(
        newUser, divClass, spanClass, socketIdUser, socketMocked, getLsMock, setLsMock,
      );

      expect(randomSpy).toBeCalled();
      expect(createNewUsSpy).toBeCalled();
      expect(result.innerHTML).toEqual(expected);

      randomSpy.mockRestore();
      createNewUsSpy.mockRestore();
    });
  });

  describe('Testing submitForm', () => {
    test('Testing case to emit event \'message\'', () => {
      const event = {
        preventDefault: jest.fn(),
      };
      const input = {
        value: 'salve dogs',
      };
      const emitObj = { user: 'lipe', message: 'salve dogs' };
      const socketMocked = ({ emit: jest.fn().mockImplementation((_, cb) => cb) });

      const getLsMock = jest.fn()
        .mockReturnValueOnce('lipe')
        .mockReturnValueOnce('Geral')
        .mockReturnValueOnce('lRJt-E_v0ebgxDOOAAAB')
        .mockReturnValueOnce('false');

      const submitSpy = jest.spyOn(Func, 'submitForm');

      const result = Func.submitForm(event, input, socketMocked, getLsMock);

      expect(result).toEqual(undefined);
      expect(input.value).toEqual('');
      expect(submitSpy).toBeCalled();
      expect(submitSpy.mock.calls[0].length).toEqual(4);
      expect(getLsMock).toBeCalled();
      expect(getLsMock).toBeCalledTimes(4);
      expect(getLsMock).toHaveBeenNthCalledWith(1, 'userName');
      expect(getLsMock).toHaveBeenNthCalledWith(2, 'socketUser');
      expect(getLsMock).toHaveBeenNthCalledWith(3, 'socketIdPrivate');
      expect(getLsMock).toHaveBeenNthCalledWith(4, 'clicked');
      expect(socketMocked.emit).toBeCalled();
      expect(socketMocked.emit).toBeCalledTimes(1);
      expect(socketMocked.emit.mock.calls[0]).toEqual(['message', emitObj]);
      expect(input.value).toEqual('');

      submitSpy.mockRestore();
    });

    test('Testing case to emit event \'messagePrivate\'', () => {
      const event = {
        preventDefault: jest.fn(),
      };
      const input = {
        value: 'salve catiorro',
      };
      const emitObj = { user: 'lipe', message: 'salve catiorro', forId: 'nKpl8dEsTlqXMSHwAAAg' };
      const socketMocked = ({ emit: jest.fn().mockImplementation((_, cb) => cb) });

      const getLsMock = jest.fn()
        .mockReturnValueOnce('lipe')
        .mockReturnValueOnce('john')
        .mockReturnValueOnce('nKpl8dEsTlqXMSHwAAAg')
        .mockReturnValueOnce('true');

      const submitSpy = jest.spyOn(Func, 'submitForm');

      const result = Func.submitForm(event, input, socketMocked, getLsMock);

      expect(result).toEqual(undefined);
      expect(input.value).toEqual('');
      expect(submitSpy).toBeCalled();
      expect(submitSpy.mock.calls[0].length).toEqual(4);
      expect(getLsMock).toBeCalled();
      expect(getLsMock).toBeCalledTimes(4);
      expect(getLsMock).toHaveBeenNthCalledWith(1, 'userName');
      expect(getLsMock).toHaveBeenNthCalledWith(2, 'socketUser');
      expect(getLsMock).toHaveBeenNthCalledWith(3, 'socketIdPrivate');
      expect(getLsMock).toHaveBeenNthCalledWith(4, 'clicked');
      expect(socketMocked.emit).toBeCalled();
      expect(socketMocked.emit).toBeCalledTimes(1);
      expect(socketMocked.emit.mock.calls[0]).toEqual(['messagePrivate', emitObj]);
      expect(input.value).toEqual('');

      submitSpy.mockRestore();
    });

    test('Testing when not enter in any case', () => {
      const event = {
        preventDefault: jest.fn(),
      };
      const input = {
        value: '',
      };
      const socketMocked = ({ emit: jest.fn().mockImplementation((_, cb) => cb) });

      const getLsMock = jest.fn()
        .mockReturnValueOnce('lipe')
        .mockReturnValueOnce('Geral')
        .mockReturnValueOnce('nKpl8dEsTlqXMSHwAAAg')
        .mockReturnValueOnce('true');

      const submitSpy = jest.spyOn(Func, 'submitForm');

      const result = Func.submitForm(event, input, socketMocked, getLsMock);

      expect(result).toEqual(undefined);
      expect(input.value).toEqual('');
      expect(submitSpy).toBeCalled();
      expect(submitSpy.mock.calls[0].length).toEqual(4);
      expect(getLsMock).toBeCalled();
      expect(getLsMock).toBeCalledTimes(4);
      expect(getLsMock).toHaveBeenNthCalledWith(1, 'userName');
      expect(getLsMock).toHaveBeenNthCalledWith(2, 'socketUser');
      expect(getLsMock).toHaveBeenNthCalledWith(3, 'socketIdPrivate');
      expect(getLsMock).toHaveBeenNthCalledWith(4, 'clicked');
      expect(socketMocked.emit).toBeCalledTimes(0);
      expect(socketMocked.emit.mock.calls[0]).toEqual(undefined);
      expect(input.value).toEqual('');

      submitSpy.mockRestore();
    });
  });

  describe('Testing loadAll', () => {
    test('Testing if window.onload run all functions', () => {
      const onloadSpy = jest.spyOn(window, 'onload')
        .mockImplementation(() => ({
          io: jest.fn(() => ({
            emit: jest.fn(),
            on: jest.fn(),
          })),
        }));

      window.onload();

      expect(onloadSpy).toBeCalled();
      expect(onloadSpy).toBeCalledTimes(1);

      onloadSpy.mockRestore();
    });
  });
});
