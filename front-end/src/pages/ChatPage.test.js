import React from 'react';
import axios from 'axios';
import { render, fireEvent, wait } from '@testing-library/react'
import socketIOClient from 'socket.io-client';
import ChatPage from './ChatPage';

const mockBdMessages = [
  {
    message: 'Falaaaa manolo',
    nickname: 'Julio Cezar',
  },
  {
    message: 'E ai man',
    nickname: 'Rodrigo',
  },
  {
    message: 'Tudo bom',
    nickname: 'Julio Cezar',
  },
];

const data = {
  data: {
    allMessages: [
      {
        message: 'Falaaaa manolo',
        nickname: 'Julio Cezar',
      },
      {
        message: 'E ai man',
        nickname: 'Rodrigo',
      },
      {
        message: 'Tudo bom',
        nickname: 'Julio Cezar',
      },
    ],
  },
};

jest.mock('axios');

jest.mock('socket.io-client', () => {
  const mSocket = {
    emit: jest.fn(),
    on: jest.fn()
      .mockImplementationOnce((_, funct) => funct(mockBdMessages)),
  };
  return jest.fn(() => mSocket);
});

describe('test component Private Chat', () => {
  axios.mockImplementationOnce(() => Promise.resolve(data));
  it.only('component is render dispatch on sockets event', async () => {
    const ENDPOINT = 'http://localhost:5000/';
    const mockSocket = socketIOClient(ENDPOINT);
    const { queryByText, queryByTestId } = render(
      <ChatPage />
    );
    await wait();
    await expect(axios).toHaveBeenCalledTimes(1);
    expect(mockSocket.on).toHaveBeenCalledWith('serverMsg', expect.any(Function));
    await wait();
    // const buttonPvt = queryByText(/Send/i);
    // const inputPvt = queryByTestId('input-private-chat');
    // expect(buttonPvt).toBeInTheDocument();
    // expect(inputPvt).toBeInTheDocument();

    // fireEvent.change(inputPvt, { target: { value: 'Falaaaa manolo' } });
    // await wait();
    // expect(inputPvt.value).toBe('Falaaaa manolo');
    // fireEvent.click(buttonPvt);
    // expect(mockSocket.emit.mock.calls[1][0]).toBe('privatemessage');
    // expect(mockSocket.emit.mock.calls[1][1]).toStrictEqual({
    //   message: 'Falaaaa manolo',
    //   sender: 'Julio Cezar',
    //   reciever: 'Rodrigo'
    // });
    // expect(queryByText(/Falaaaa manolo/i)).toBeInTheDocument();
  });
  it('component is render bd messages', async () => {
    const ENDPOINT = 'http://localhost:5000/';
    const mockSocket = socketIOClient(ENDPOINT);
    const { queryByText, queryByTestId } = render(
      <PrivateChat
        sender={'Julio Cezar'}
        reciever={'Rodrigo'}
      />
    );

    const sender = 'Julio Cezar';
    const reciever = 'Rodrigo';
    expect(mockSocket.on).toHaveBeenCalledWith('privatechat', expect.any(Function));
    expect(mockSocket.emit)
      .toHaveBeenCalledWith('joinRoom', { sender: 'Julio Cezar', reciever: 'Rodrigo' });
    expect(mockSocket.on).toHaveBeenCalledWith(`${sender}${reciever}`, expect.any(Function));
    await wait();
    const buttonPvt = queryByText(/Send/i);
    const inputPvt = queryByTestId('input-private-chat');
    expect(buttonPvt).toBeInTheDocument();
    expect(inputPvt).toBeInTheDocument();

    fireEvent.change(inputPvt, { target: { value: 'Falaaaa manolo' } });
    await wait();
    expect(inputPvt.value).toBe('Falaaaa manolo');
    fireEvent.click(buttonPvt);
    expect(mockSocket.emit.mock.calls[1][0]).toBe('privatemessage');
    expect(mockSocket.emit.mock.calls[1][1]).toStrictEqual({
      message: 'Falaaaa manolo',
      sender: 'Julio Cezar',
      reciever: 'Rodrigo'
    });
    mockBdMessages.allMessages.map(({ message }, index) => {
      expect(queryByTestId(`chat-message-${index}`)).toBeInTheDocument();
      expect(queryByTestId(`chat-message-${index}`).innerHTML)
        .toMatch(message);
    })
  });
});