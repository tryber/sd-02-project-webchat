import React, { useState, useContext } from 'react';

import { useHistory } from 'react-router-dom';

import { Context } from '../../context';

import Form from 'react-bootstrap/Form';

import Button from 'react-bootstrap/Button';

import { FormGroup, Message, SubmitButton } from '../../components';

import './login.css';

function Login() {
  const history = useHistory();

  const [email, setEmail] = useState({ value: null, error: null });

  const [password, setPassword] = useState({ value: null, error: null });

  const { message } = useContext(Context);

  const isDisabled = !email.value || !password.value || email.error || password.error;

  const body = { email: email.value, password: password.value };

  return (
    <section className="boxLogin">
      <header>
        <h1>Welcome to Bolichat!</h1>
      </header>

      {message.value && <Message />}

      <Form>
        <FormGroup callback={setEmail} field="email" state={email} testId="email-input" />
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
          endpoint="/user/login"
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
