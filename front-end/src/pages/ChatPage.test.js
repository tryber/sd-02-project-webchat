import React from 'react';
import axios from 'axios';
import { render, fireEvent, wait } from '@testing-library/react'
import socketIOClient from 'socket.io-client';
import ChatPage from './ChatPage';

const mockSocketEvent = {
  message: 'Falaaaa manolo',
  nickname: 'Julio Cezar',
};


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
    id: '123123123',
    emit: jest.fn(),
    on: jest.fn()
      .mockImplementationOnce((_, funct) => funct(mockSocketEvent)),
  };
  return jest.fn(() => mSocket);
});

describe('test component Private Chat', () => {
  axios.mockImplementationOnce(() => Promise.resolve(data));
  it('component is render dispatch on sockets event', async () => {
    const ENDPOINT = 'http://localhost:5000/';
    const mockSocket = socketIOClient(ENDPOINT);
    const { queryAllByTestId, queryByText, queryByTestId } = render(
      <ChatPage />
    );
    await wait();
    await expect(axios).toHaveBeenCalledTimes(1);
    expect(mockSocket.on).toHaveBeenCalledWith('serverMsg', expect.any(Function));
    await wait();
    expect(queryByTestId('input-chat-page')).toBeInTheDocument();
    expect(queryByText(/Send/i)).toBeInTheDocument();

    fireEvent.change(queryByTestId('input-chat-page'), { target: { value: 'Julio Cezar' } });
    expect(queryByTestId('input-chat-page').value).toBe('Julio Cezar');

    fireEvent.click(queryByText(/Send/i));
    await expect(axios).toHaveBeenCalledTimes(2);
    expect(mockSocket.emit).toHaveBeenCalledWith('login',
      { nickname: 'Julio Cezar', id: '123123123' });
  });
});