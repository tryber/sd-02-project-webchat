import React, { useState } from 'react';

import Form from 'react-bootstrap/Form';

import Button from 'react-bootstrap/Button';

import './chat.css';

function Chat({}) {
  const [content, setContent] = useState(null);

  const body = {};

  return (
    <section className="boxChat">
      <div></div>
      <Form>
        <Form.Control
          data-testid="message-input"
          onChange={(e) => {
            console.log('hey');
          }}
          placeholder="type a message =)"
          required="required"
          type="text"
        />
        <Button type="submit" variant="outline-info">
          Send
        </Button>
      </Form>
    </section>
  );
}

export default Chat;
