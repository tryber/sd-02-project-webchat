import React, { useState, useContext } from 'react';

import { useHistory } from 'react-router-dom';

import { Context } from '../../context';

import Form from 'react-bootstrap/Form';

import Button from 'react-bootstrap/Button';

import { FormGroup, Message, SubmitButton } from '../../components';

import './login.css';

function Login() {
  const history = useHistory();

  const { message } = useContext(Context);

  const [nickname, setNickname] = useState({ value: null, error: null });

  const [password, setPassword] = useState({ value: null, error: null });

  const isDisabled = !nickname.value || !password.value || nickname.error || password.error;

  const body = { nickname: nickname.value, password: password.value };

  return (
    <section className="boxLogin">
      <header>
        <h1>Welcome to Bolichat!</h1>
      </header>

      {message.value && <Message />}

      <Form>
        <FormGroup
          callback={setNickname}
          field="nickname"
          state={nickname}
          testId="nickname-login-input"
        />
        <FormGroup
          callback={setPassword}
          field="password"
          state={password}
          testId="password-login-input"
        />
        <SubmitButton
          body={body}
          isDisabled={isDisabled}
          label="Login"
          testId="loginButton"
          type="LOGIN"
        />
      </Form>
      <Button
        className="buttonRouter"
        variant="outline-danger"
        onClick={() => history.push('/register')}
      >
        Register
      </Button>
    </section>
  );
}

export default Login;
