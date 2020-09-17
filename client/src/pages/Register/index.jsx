import React, { useState, useContext } from 'react';
import Form from 'react-bootstrap/Form';
import { Context } from '../../context';
import { FormGroup, Message, SubmitButton } from '../../components';

const Register = () => {
  const { message, setMessage, setUser } = useContext(Context);

  const [email, setEmail] = useState({ value: null, error: null });

  const [name, setName] = useState({ value: null, error: null });

  const [password, setPassword] = useState({ value: null, error: null });

  const isDisabled =
    email.error || !email.value || name.error || !name.value || password.error || !password.value;

  const body = {
    email: email.value,
    name: name.value,
    password: password.value,
  };

  return (
    <section className="register_page">
      <header className="title">
        <h1>Trybeer</h1>
        <h2>Register</h2>
      </header>
      {message.value && <Message infinity />}
      <Form className="box50 boxColorYellow flexColumnCenter H80 spaceThin">
        <FormGroup state={email} callback={setEmail} field="email" testId="emailRegisterInput" />
        <FormGroup state={name} callback={setName} field="name" testId="nameRegisterInput" />
        <FormGroup
          callback={setPassword}
          field="password"
          state={password}
          testId="passwordRegisterInput"
        />
        <SubmitButton
          body={body}
          className="box50 spaceThin"
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
