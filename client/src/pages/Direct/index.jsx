import React, { useContext, useEffect, useState } from 'react';

import { useHistory } from 'react-router-dom';

import Button from 'react-bootstrap/Button';

import Form from 'react-bootstrap/Form';

import { FormGroup, LogoutButton, Message } from '../../components';

import { Context } from '../../context';

import { request } from '../../service';

function Direct() {
  const { message, setMessage, user, event } = useContext(Context);

  const history = useHistory();

  const [chats, setChats] = useState(null);

  const [ownerChat, setOwnerChat] = useState(true);

  const [update, setUpdate] = useState(null);

  useEffect(() => {
    request.getData({ endpoint: `chat?key=userId&value=${user._id}` }).then(({ data, error }) => {
      if (error) {
        return setMessage({ value: error.message, type: 'ALERT' });
      }

      setOwnerChat(data.chat);
    });
  }, []);

  useEffect(() => {
    request.getData({ endpoint: `/message?key=user&value=${user._id}` }).then(({ data, error }) => {
      if (error) {
        return setMessage({ value: error.message, type: 'ALERT' });
      }

      setChats(data.messages);
    });
  }, [update]);

  event.on('newChat', () => {
    setUpdate((state) => !state);
  });

  return (
    <section className="Direct">
      <section className="BoxButtons">
        <Button
          className="BolichatDirectButton"
          onClick={() => history.push('/chat/bolichat')}
          variant="outline-warning"
        >
          Bolichat
        </Button>
        <Button
          data-testid="PeopleDirectButton"
          onClick={() => history.push('/group')}
          variant="outline-success"
        >
          People
        </Button>
        <LogoutButton />
      </section>

      {message.value && <Message />}

      <section className="MyChats">
        {ownerChat.map(({ image, title, _id }) => (
          <button type="submit" onClick={() => history.push(`/chat/${_id}`)}>
            {image ? <img alt={title} src={`${image}`} /> : <p>@{title}</p>}
          </button>
        ))}
      </section>

      <section className="Chats">
        {chats.map(({ image, title, _id }) => (
          <button type="submit" onClick={() => history.push(`/chat/${_id}`)}>
            {image ? <img alt={title} src={`${image}`} /> : <p>@{title}</p>}
          </button>
        ))}
      </section>

      <Button
        data-testid="CreateChatButton"
        onClick={async () => await history.push('/newchat')}
        variant="outline-success"
      >
        People
      </Button>
    </section>
  );
}

export default Direct;
