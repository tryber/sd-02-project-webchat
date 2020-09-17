import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Context } from '../../context';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FormGroup, Message, SubmitButton } from '../../components';
import './login.css';

function Login() {
  const { message, setMessage, setUser } = useContext(Context);

  const [email, setEmail] = useState({ value: null, error: null });

  const [password, setPassword] = useState({ value: null, error: null });

  const history = useHistory();

  const isDisabled = !email.value || !password.value || email.error || password.error;

  const body = { email: email.value, password: password.value };

  return (
    <section className="boxHome">
      <header>
        <h1>Welcome to Bolichat!</h1>
      </header>

      {/* {message.value && <Message />}
      <Form className="box50 boxColorYellow flexColumnCenter H80 spaceThin">
        <FormGroup callback={setEmail} field="email" state={email} testId="emailLoginInput" />
        <FormGroup
          callback={setPassword}
          field="password"
          state={password}
          testId="passwordLoginInput"
        />
        <section className="box60 flexRowAround spaceLarge">
          <SubmitButton
            body={body}
            className="box50 spaceThin"
            isDisabled={isDisabled}
            label="Login"
            testId="loginButton"
            type="LOGIN"
          />
          <Button
            className="box30 spaceThin"
            data-testid="registerRouterButton"
            onClick={() => history.push('/register')}
            type="button"
            variant="outline-info"
          >
            Register
          </Button>
        </section>
      </Form> */}
    </section>
  );
}

export default Login;
