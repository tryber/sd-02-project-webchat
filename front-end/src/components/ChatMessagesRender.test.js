import React from 'react';
import { render } from '@testing-library/react'
import ChatMessagesRender from './ChatMessagesRender';

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

describe('test component Chat Messages Render', () => {
  it('component is render', () => {
    const { queryByText } = render(
      <ChatMessagesRender chatMessages={mock} />
    );
    expect(queryByText(/ola/i)).toBeInTheDocument();
  });
  it('dont exist any messages', () => {
    const { queryByText } = render(
      <ChatMessagesRender chatMessages={[]} />
    );
    expect(queryByText(/ola/i)).not.toBeInTheDocument();
  });
});
