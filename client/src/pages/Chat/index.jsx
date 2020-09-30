import React, { useState, useContext, useEffect } from 'react';

import { useHistory } from 'react-router-dom';

import Button from 'react-bootstrap/Button';

import Form from 'react-bootstrap/Form';

import { LogoutButton, Message } from '../../components';

import { Context } from '../../context';

import handleClick from './handleClick';

import { request } from '../../service';

import './chat.css';

function Chat({
  match: {
    params: { id },
  },
}) {
  const { event, message, setMessage, user } = useContext(Context);

  const history = useHistory();

  const [chat, setChat] = useState(null);

  const [content, setContent] = useState(null);

  const [messages, setMessages] = useState([]);

  const [update, setUpdate] = useState(true);

  useEffect(() => {
    if (id === 'bolichat' && user) {
      return setChat({ title: 'Bolichat', image: user.image, nickname: user.nickname });
    }

    request.getData({ endpoint: `/chat/${id}` }).then(({ data, error }) => {
      console.log(error);
      if (error) {
        return setMessage({ value: error.message, type: 'ALERT' });
      }
      console.log('Chat', data.chat);

      if (data.chat[0].isPrivate && user) {
        const index = data.chat[0].users.indexOf(user._id) === 0 ? 1 : 0;

        return request
          .getData({ endpoint: `/user/${data.chat[0].users[index]}` })
          .then(({ data, error }) => {
            if (error) {
              return setMessage({ value: error.message, type: 'ALERT' });
            }

            setChat({
              title: data.user.nickname,
              image: data.user.image,
              nickaname: data.user.nickname,
            });
          });
      }

      setChat({ title: chat.title, image: chat.image, nickname: chat.title });
    });
  }, []);

  useEffect(() => {
    request.getData({ endpoint: `/message?key=chatId&value=${id}` }).then(({ data, error }) => {
      if (error) {
        return setMessage({ value: error.message, type: 'ALERT' });
      }

      setMessages(data.messages);
    });
  }, [update]);

  event.on('message', (msg) => {
    if (msg.chatId !== id) {
      setMessage({
        value: `${msg.user}: ${
          msg.content.length >= 10 ? msg.content.slice(0, 10) : msg.content
        }... (${msg.chatTitle})`,
        type: 'SUCCESS',
      });
    }

    setUpdate((state) => !state);
  });

  event.on('chat', (msg) => {
    if (msg.chatId !== id) {
      setMessage({
        value: `${msg.user} creat ${msg.title}`,
        type: 'SUCCESS',
      });
    }

    setUpdate((state) => !state);
  });

  return (
    <section className="Chat">
      {message.value && <Message />}

      <section className="BoxButtons">
        <Button
          data-testid="PeopleChatButton"
          onClick={() => history.push('/people')}
          variant="outline-success"
        >
          People
        </Button>
        <Button
          data-testid="DirectChatButton"
          onClick={() => history.push('/direct')}
          variant="outline-success"
        >
          Direct
        </Button>

        <LogoutButton />
      </section>

      {chat && (
        <section className="BoxChat">
          <header>
            {chat.image ? <img src={chat.image} /> : <p>{chat.nickname}</p>}
            <h1>{chat.title}</h1>
          </header>

          <section className="BoxMessage">
            {messages.map(({ content, nickname, createdAt, _id, image }) => {
              return (
                <div className="UserMessage" key={_id}>
                  <div className="MessageContent">
                    {image ? <img src={image} /> : <strong>{nickname} :</strong>}
                    <p>{content}</p>
                  </div>
                  <div className="MessageDate">
                    <em>{createdAt.slice(0, 10)}</em>
                    <em>{createdAt.slice(11, 19)}</em>
                  </div>
                </div>
              );
            })}
          </section>

          <Form id="ChatForm">
            <Form.Control
              data-testid="MessageInput"
              onChange={(e) => {
                setContent(e.target.value);
              }}
              placeholder="type a message =)"
              required="required"
              type="text"
            />
            <Button
              className="material-icons"
              data-testid="MessageButton"
              onClick={async (e) =>
                await handleClick({ e, content, id, title: chat.title, setMessage, setUpdate })
              }
              type="submit"
              variant="outline-success"
            >
              near_me
            </Button>
          </Form>
        </section>
      )}
    </section>
  );
}

export default Chat;
