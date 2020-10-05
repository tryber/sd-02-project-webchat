import React, { useContext, useEffect, useState } from 'react';

import { useHistory } from 'react-router-dom';

import Button from 'react-bootstrap/Button';

import Form from 'react-bootstrap/Form';

import { FormGroup, LogoutButton, Message } from '../../components';

import { Context } from '../../context';

import { request } from '../../service';

import './direct.css';

async function getData({ user }) {
  const { data, error } = request.postData({ body: { users: [user._id] }, endpoint: '/chat/user' });

  if (error) return { data: null, error };
  console.log('bolivar', data, user, error);
  return Promise.all(
    data.map(async (each) => {
      const { users, ...rest } = each;

      const index = users.indexOf(user._id) === 0 ? 1 : 0;

      const { data: user } = await request.getData({ endpoint: `/user/${users[index]}` });

      return { nickname: user.nickname, ...rest };
    }),
  );
}

function Direct() {
  const { message, setMessage, user, event } = useContext(Context);

  const history = useHistory();

  const [chats, setChats] = useState([]);

  const [ownerChat, setOwnerChat] = useState(null);

  const [update, setUpdate] = useState(null);

  useEffect(() => {
    request.getData({ endpoint: `/chat/user/${user._id}` }).then(({ data, error }) => {
      if (error) {
        return setMessage({ value: error.message, type: 'ALERT' });
      }

      setOwnerChat(data);
    });
  }, []);

  useEffect(() => {
    getData({ user }).then(({ data, error }) => {
      if (error) {
        return setMessage({ value: error.message, type: 'ALERT' });
      }

      setChats(data);
    });
  }, [update]);

  event.on('newChat', () => {
    setUpdate((state) => !state);
  });
  console.log('chats', chats);
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
        {ownerChat &&
          ownerChat.map(({ image, title, _id }) => (
            <button type="submit" onClick={() => history.push(`/chat/${_id}`)}>
              {image ? <img alt={title} src={`${image}`} /> : <p>@{title}</p>}
            </button>
          ))}
      </section>

      <section className="Chats">
        {chats &&
          chats.map(async ({ title, _id, image, isPrivate, nickname }) => {
            if (isPrivate) {
              return (
                <button type="submit" onClick={() => history.push(`/chat/${_id}`)}>
                  {nickname}
                </button>
              );
            }

            return (
              <button type="submit" onClick={() => history.push(`/chat/${_id}`)}>
                {image ? <img alt={title} src={`${image}`} /> : <p>@{title}</p>}
              </button>
            );
          })}
      </section>

      <Button
        data-testid="CreateChatButton"
        onClick={async () => await history.push('/newchat')}
        variant="outline-success"
      >
        Create Chat
      </Button>
    </section>
  );
}

export default Direct;
