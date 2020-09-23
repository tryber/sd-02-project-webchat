import React, { useState, useContext, useEffect } from 'react';

import { Context } from '../../context';

import Form from 'react-bootstrap/Form';

import Button from 'react-bootstrap/Button';

import handleClick from './handleClick';

import { request } from '../../service';

import './chat.css';

function Chat({ id }) {
  const [content, setContent] = useState(null);
  const [update, setUpdate] = useState(true);
  const [messages, setMessages] = useState([]);

  const { setMessage } = useContext(Context);

  useEffect(() => {
    request.getData({ endpoint: `/message?key=chatId&value=${id}` }).then(({ data, error }) => {
      if (error) {
        return setMessage({ value: error.message, type: 'ALERT' });
      }
      console.log(data.messages);
      setMessages(data.messages);
    });
  }, [update]);

  return (
    <section className="boxChat">
      <section>
        {messages.map(({ content, nickname, createdAt, _id }) => {
          return (
            <div className="message" key={_id}>
              <strong>{nickname}</strong>
              <p>{content}</p>
              <em>{createdAt.slice(0, 10)}</em>
              <em>{createdAt.slice(11, 19)}</em>
            </div>
          );
        })}
      </section>
      <Form>
        <Form.Control
          data-testid="message-input"
          onChange={(e) => {
            setContent(e.target.value);
          }}
          placeholder="type a message =)"
          required="required"
          type="text"
        />
        <Button
          type="submit"
          variant="outline-info"
          onClick={async (event) =>
            await handleClick({ event, content, id, setMessage, setUpdate })
          }
        >
          Send
        </Button>
      </Form>
    </section>
  );
}

export default Chat;
