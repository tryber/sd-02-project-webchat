import React, { useState as useStateMock } from 'react';
import { render, fireEvent, wait } from '@testing-library/react'
import axios from 'axios';
import socketIOClient from 'socket.io-client';
import OnlineUsers from './OnlineUsers';

jest.mock('axios');

jest.mock('socket.io-client', () => {
  const mSocket = {
    emit: jest.fn(),
    on: jest.fn(),
  };
  return jest.fn(() => mSocket);
});

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}));

const mock = [
  {
    message: 'ola',
    timestamp: Date.now(),
    sender: 'Julio Cezar',
  },
  {
    message: 'blz',
    timestamp: Date.now(),
    sender: 'Rodrigo',
  },
  {
    message: 'fala',
    timestamp: Date.now(),
    sender: 'Julio Cezar',
  },
];

const setRec = jest.fn();
const setPvt = jest.fn();

describe('test component Online Users', () => {
  const setState = jest.fn();
  beforeEach(() => {
    useStateMock.mockImplementation(init => [init, setState])
  })
  it.only('component is render and dispatch emit socket event', async () => {
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
    expect(setState).toHaveBeenCalledTimes(1);
  });
});