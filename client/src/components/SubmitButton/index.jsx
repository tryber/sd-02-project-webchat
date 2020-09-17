import React, { useContext } from 'react';

import { Context } from '../../context';

import Button from 'react-bootstrap/Button';

import { useHistory } from 'react-router-dom';

import handleSubmit from './handleSubmit';

import './submitButton.css';

const SubmitButton = ({ body, isDisabled, label, testId, type }) => {
  const { setMessage, setUser } = useContext(Context);

  const history = useHistory();

  return (
    <Button
      data-testid={testId}
      disabled={isDisabled}
      onClick={async (event) =>
        await handleSubmit({ event, body, history, label, setMessage, setUser, type })
      }
      type="submit"
      variant="outline-danger"
    >
      {label}
    </Button>
  );
};

export default SubmitButton;
