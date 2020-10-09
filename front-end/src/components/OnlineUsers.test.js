import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react'
import socketIOClient from 'socket.io-client';
import OnlineUsers from './OnlineUsers';

const mockOnline = {
  'Julio Cezar': '123123123',
  'Rodrigo': '1231241asdaw',
  'Joao': '1231231asdqw',
};

jest.mock('socket.io-client', () => {
  const mSocket = {
    emit: jest.fn(),
    on: jest.fn()
      .mockImplementationOnce((_, funct) => funct(mockOnline))
      .mockImplementationOnce((_, funct) => funct(mockOnline))
      .mockImplementationOnce((_, funct) => funct([]))
  };
  return jest.fn(() => mSocket);
});

const setRec = jest.fn();
const setPvt = jest.fn();

describe('test component Online Users', () => {
  it('component is render with pvt false and dispatch on socket event', async () => {
    const ENDPOINT = 'http://localhost:5000/';
    const mockSocket = socketIOClient(ENDPOINT);
    const { queryByTestId, queryAllByTestId } = render(
      <OnlineUsers
        sender={'Julio Cezar'}
        setRec={setRec}
        setPvt={setPvt}
        pvt={false}
      />
    );
    expect(mockSocket.on).toHaveBeenCalledWith('online', expect.any(Function));
    await wait();
    Object.keys(mockOnline).map((nickname) => {
      if (nickname === 'Julio Cezar') {
        expect(queryByTestId(`li-${nickname}`)).not.toBeInTheDocument();
      } else {
        expect(queryByTestId(`li-${nickname}`)).toBeInTheDocument();
      }
      expect(queryAllByTestId("private-chat-button")[0]).toBeInTheDocument();
      expect(queryAllByTestId("private-chat-button")[0].innerHTML)
        .toBe('Enviar mensagem privada');
      fireEvent.click(queryAllByTestId("private-chat-button")[0]);
      expect(setPvt).toHaveBeenCalledWith(true);
      expect(setRec).toHaveBeenCalledWith('Rodrigo');
    });
  });
  it('component is render with pvt true and dispatch on socket event', async () => {
    const ENDPOINT = 'http://localhost:5000/';
    const mockSocket = socketIOClient(ENDPOINT);
    const { queryByTestId, queryAllByTestId } = render(
      <OnlineUsers
        sender={'Julio Cezar'}
        setRec={setRec}
        setPvt={setPvt}
        pvt={true}
      />
    );
    expect(mockSocket.on).toHaveBeenCalledWith('online', expect.any(Function));
    await wait();
    Object.keys(mockOnline).map((nickname) => {
      if (nickname === 'Julio Cezar') {
        expect(queryByTestId(`li-${nickname}`)).not.toBeInTheDocument();
      } else {
        expect(queryByTestId(`li-${nickname}`)).toBeInTheDocument();
      }
      expect(queryAllByTestId("private-chat-button")[0])
        .toBeInTheDocument();
      expect(queryAllByTestId("private-chat-button")[0].innerHTML)
        .toBe('Voltar pro chat geral');
    });
  });
  it('component is render and has no online users', async () => {
    const ENDPOINT = 'http://localhost:5000/';
    const mockSocket = socketIOClient(ENDPOINT);
    const { queryByTestId } = render(
      <OnlineUsers
        sender={'Julio Cezar'}
        setRec={setRec}
        setPvt={setPvt}
        pvt={true}
      />
    );
    expect(mockSocket.on).toHaveBeenCalledWith('online', expect.any(Function));
    await wait();
  });
});
