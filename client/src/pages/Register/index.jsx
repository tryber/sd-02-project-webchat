import React, { useState, useContext } from 'react';
import Form from 'react-bootstrap/Form';
import { Context } from '../../context';
import { FormGroup, Message, SubmitButton } from '../../components';
import './register.css';

const Register = () => {
  const { message } = useContext(Context);

  const [nickname, setNickname] = useState({ value: null, error: null });

  const [password, setPassword] = useState({ value: null, error: null });

  const isDisabled = nickname.error || !nickname.value || password.error || !password.value;

  const body = {
    nickname: nickname.value,
    password: password.value,
  };

  return (
    <section className="boxRegister">
      <header>
        <h1>Register</h1>
      </header>

      {message.value && <Message infinity />}

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
          label="Create User"
          testId="registerButton"
          type="REGISTER"
        />
      </Form>
    </section>
  );
};

export default Register;
