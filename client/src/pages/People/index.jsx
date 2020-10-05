import React, { useContext, useEffect, useState } from 'react';

import { useHistory } from 'react-router-dom';

import Button from 'react-bootstrap/Button';

import { LogoutButton, Message } from '../../components';

import { Context } from '../../context';

import { request } from '../../service';

import handleClick from './handleClick';

import './people.css';

function renderPeopleUsers({ users, user }) {
  return (
    <section className="BoxUsers">
      {users
        .sort((userA, userB) => ((userA.isOnline === userB.isOnline ? 0 : userA.isOnline) ? -1 : 1))
        .map(
          (each) =>
            each._id !== user._id && (
              <button
                key={each._id}
                type="submit"
                className={each.isOnline ? 'online' : 'offline'}
                onClick={async (e) =>
                  await handleClick({
                    e,
                    friend: each._id,
                    user: user._id,
                    setMessage,
                    history,
                  })
                }
              >
                {each.image ? (
                  <img alt={each.nickname} src={`${each.image}`} />
                ) : (
                  <p>@{each.nickname}</p>
                )}
              </button>
            ),
        )}
    </section>
  );
}

function renderPeopleUser({ user, history }) {
  return (
    <section className="AboutMe">
      {user.image && <img src={user.image} />}

      <div>
        <p>{user.nickname}</p>
        <p>{user.email}</p>
      </div>

      <Button
        onClick={() => history.push('/user')}
        className="material-icons"
        variant="outline-success"
      >
        edit
      </Button>
    </section>
  );
}

function renderButtons({ history }) {
  return (
    <section className="BoxButtons">
      <Button
        className="BolichatPeopleButton"
        onClick={() => history.push('/chat/bolichat')}
        variant="outline-warning"
      >
        Bolichat
      </Button>

      <LogoutButton />
    </section>
  );
}

function People() {
  const { event, message, setMessage, setUser, user } = useContext(Context);

  const history = useHistory();

  const [update, setUpdate] = useState(true);

  const [users, setUsers] = useState(null);

  useEffect(() => {
    user &&
      request.getData({ endpoint: `/user/${user._id}` }).then(({ data, error }) => {
        if (error) {
          return setMessage({ value: error.message, type: 'ALERT' });
        }

        setUser(data);
      });
  }, []);

  useEffect(() => {
    request.getData({ endpoint: '/user' }).then(({ data, error }) => {
      if (error) {
        return setMessage({ value: error.message, type: 'ALERT' });
      }

      setUsers(data);
    });

    event.once('message', (msg) => {
      console.log('msg', msg);

      setMessage({
        value: `${msg.user} said ${
          msg.content.length >= 10 ? `${msg.content.slice(0, 25)}...` : msg.content
        } on ${msg.chatTitle}`,
        type: 'SUCCESS',
      });

      setUpdate((state) => !state);
    });

    event.on('chat', (msg) => {
      setMessage({
        value: `${msg.user} creat ${msg.title}`,
        type: 'SUCCESS',
      });

      setUpdate((state) => !state);
    });
  }, [update]);

  event.on('update', () => {
    setUpdate((state) => !state);
  });

  return (
    <section className="People">
      {message.value && <Message />}

      {renderButtons({ history })}

      {user && renderPeopleUser({ user, history })}

      {users && user && renderPeopleUsers({ users, user })}
    </section>
  );
}

export default People;
