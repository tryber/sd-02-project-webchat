import React, { useContext, useEffect, useState } from 'react';

import { useHistory } from 'react-router-dom';

import Button from 'react-bootstrap/Button';

import { LogoutButton, Message } from '../../components';

import { Context } from '../../context';

import { request } from '../../service';

import handleClick from './handleClick';

import './people.css';

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

        setUser(data.user);
      });
  }, []);

  useEffect(() => {
    request.getData({ endpoint: '/user' }).then(({ data, error }) => {
      if (error) {
        return setMessage({ value: error.message, type: 'ALERT' });
      }

      setUsers(data.users);
    });
  }, [update]);

  event.on('update', () => {
    setUpdate((state) => !state);
  });

  return (
    <section className="People">
      <section className="BoxButtons">
        <Button
          className="BolichatPeopleButton"
          onClick={() => history.push('/chat/bolichat')}
          variant="outline-warning"
        >
          Bolichat
        </Button>
        <Button
          data-testid="DirectPeopleButton"
          onClick={() => history.push('/direct')}
          variant="outline-success"
        >
          Direct
        </Button>
        <LogoutButton />
      </section>

      {message.value && <Message />}

      {user && (
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
      )}

      {user && users && (
        <section className="BoxUsers">
          {users
            .sort((userA, userB) =>
              (userA.isOnline === userB.isOnline ? 0 : userA.isOnline) ? -1 : 1,
            )
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
      )}
    </section>
  );
}

export default People;
