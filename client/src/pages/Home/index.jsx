import React, { useState, useContext } from 'react';

import { useHistory } from 'react-router-dom';

import { Context } from '../../context';

import Form from 'react-bootstrap/Form';

import Button from 'react-bootstrap/Button';

import { Chat, FormGroup, Message, SubmitButton } from '../../components';

import './home.css';

function Home() {
  const history = useHistory();

  return (
    <section className="boxHome">
      <section className="homeMenu">
        <Button variant="outline-danger" onClick={() => history.push('/people')}>
          People
        </Button>
        <Button variant="outline-danger" onClick={() => history.push('/groups')}>
          Groups
        </Button>
      </section>
      <Chat />
    </section>
  );
}

export default Home;
