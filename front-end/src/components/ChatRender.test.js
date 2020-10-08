import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react'
import axios from 'axios';
import socketIOClient from 'socket.io-client';
import ChatRender from './ChatRender';

jest.mock('axios');

jest.mock('socket.io-client', () => {
  const mSocket = {
    emit: jest.fn(),
    teste: jest.fn().mockReturnValueOnce('teste'),
  };
  return jest.fn(() => mSocket);
});

describe('test component Chat Render', () => {
  it.only('component is render and dispatch emit socket event', async () => {
    const ENDPOINT = 'http://localhost:5000/';
    const mockSocket = socketIOClient(ENDPOINT);
    const { queryByTestId } = render(
      <ChatRender sender={'Julio Cezar'} />
    );
    expect(queryByTestId('chat-render-input')).toBeInTheDocument();
    expect(queryByTestId('chat-render-button')).toBeInTheDocument();
    expect(queryByTestId('chat-render-button').innerHTML).toBe('Send');

    fireEvent.change(queryByTestId('chat-render-input'),
      { target: { value: 'Julio Cezar' } });
    expect(queryByTestId('chat-render-input').value).toBe('Julio Cezar');
    fireEvent.click(queryByTestId('chat-render-button'));

    expect(axios).toBeCalledTimes(1);
    await wait();
    expect(mockSocket.emit)
      .toHaveBeenCalledWith('mensagem', { message: 'Julio Cezar', nickname: 'Julio Cezar' });
    expect(queryByTestId('chat-render-input').value).toBe('');
  });
});
