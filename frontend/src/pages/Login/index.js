import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Jumbotron, Form, Button, Alert } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import * as api from '../../services/api';

import './style.css';

const schema = Yup.object({
  username: Yup.string()
    .min(2, 'Campo obrigatório')
    .required('Campo obrigatório'),
  password: Yup.string()
    .min(2, 'Campo obrigatório')
    .required('Campo obrigatório'),
});

const Login = () => {
  const history = useHistory();

  const [error, setError] = useState(null);

  const login = useFormik({
    schema: schema,
    initialValues: {
      username: '',
      password: ''
    },
    onSubmit: values => {
      api.login(values.username, values.password)
        .then(res => {
          history.push('/');
        })
        .catch(err => {
          setError('Usuário ou senha inválidos!')
        });
    }
  });

  return (
    <Container fluid className="login">
      <Jumbotron>
        <h3>Login</h3>
        {!!error &&
        <Alert variant="danger">
          {error}
        </Alert>}
        <Form noValidate onSubmit={login.handleSubmit}>
          <Form.Group controlId="login.username">
            <Form.Label>Usuário</Form.Label>
            <Form.Control
              value={login.values.username}
              onChange={login.handleChange}
              isInvalid={!!login.errors.username}
              name="username"
              type="text"
              placeholder="Entre com o nome do usuário"
            />
            <Form.Control.Feedback type="invalid">
              {login.errors.username}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="login.password">
            <Form.Label>Senha</Form.Label>
            <Form.Control
              value={login.values.password}
              onChange={login.handleChange}
              isInvalid={login.errors.password}
              name="password"
              type="password"
              placeholder="Entre com a senha do usuário"
            />
            <Form.Control.Feedback type="invalid">
              {login.errors.password}
            </Form.Control.Feedback>
          </Form.Group>
          <Button variant="dark" type="submit">
            Entrar
          </Button>
        </Form>
      </Jumbotron>
    </Container>
  );
};

export default Login;
