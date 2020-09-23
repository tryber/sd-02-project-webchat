import React, { useState, useContext } from 'react';
import Form from 'react-bootstrap/Form';
import { Context } from '../../context';
import { FormGroup, Message, SubmitButton } from '../../components';
import './register.css';

const Register = () => {
  const { message } = useContext(Context);

  const [email, setEmail] = useState({ value: null, error: null });

  const [nickname, setNickname] = useState({ value: null, error: null });

  const [password, setPassword] = useState({ value: null, error: null });

  const isDisabled =
    !email.value ||
    email.error ||
    nickname.error ||
    !nickname.value ||
    password.error ||
    !password.value;

  const body = {
    email: email.value,
    nickname: nickname.value,
    password: password.value,
  };

  return (
    <section className="boxRegister">
      <header>
        <h1>Register</h1>
      </header>

      {message.value && <Message />}

      <Form>
        <FormGroup callback={setEmail} field="email" state={email} testId="email-register-input" />
        <FormGroup
          callback={setNickname}
          field="nickname"
          state={nickname}
          testId="nickname-register-input"
        />
        <FormGroup
          callback={setPassword}
          field="password"
          state={password}
          testId="password-register-input"
        />
        <SubmitButton
          body={body}
          isDisabled={isDisabled}
          label="Create User"
          testId="registerButton"
          endpoint="/user"
        />
      </Form>
    </section>
  );
};

export default Register;
