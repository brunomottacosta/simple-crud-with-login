import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { Container, Jumbotron, Table, Row, Col, Button } from 'react-bootstrap'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

import * as api from '../../services/api';

import Constants from '../../Constants';
import { isAuthorized } from '../../helpers/utils';
import { phoneMask, documentMask, cepMask } from '../../helpers/masks';

const ClientList = () => {
  const [clientList, setClientList] = useState([]);
  const [userRoles] = useState(JSON.parse(sessionStorage.getItem(Constants.UserRoles)));

  const history = useHistory();

  useEffect(() => {
    loadClientList();
  }, []);

  const loadClientList = async () => {
    try {
      const res = await api.getClients();
      setClientList(res.body);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    sessionStorage.removeItem(Constants.JwtToken);
    sessionStorage.removeItem(Constants.UserRoles);
    history.push('/login');
  };

  return (
    <>
      <Container fluid>
        <Jumbotron>
          <h1>Lista de Clientes</h1>
          <div style={{ flexGrow: 1 }}>
            {isAuthorized(userRoles, ['ADMIN']) &&
              <Button
                variant="dark"
                onClick={() => history.push('/clients/add')}>
                Adicionar Cliente
              </Button>
            }
            <Button
              style={{ marginLeft: '20px' }}
              variant="danger"
              onClick={logout}>
              <FontAwesomeIcon icon={faSignOutAlt} /> Sair
            </Button>
          </div>
        </Jumbotron>

        <Row>
          <Col>
            <Table bordered striped hover>
              <thead>
                <tr>
                  <th align="center">#</th>
                  <th align="center">Nome</th>
                  <th align="center">CPF</th>
                  <th align="center">Telefone(s)</th>
                  <th align="center">E-mail(s)</th>
                  <th align="center">CEP</th>
                  <th align="center">Logradouro</th>
                  <th align="center">Complemento</th>
                  <th align="center">Bairro</th>
                  <th align="center">Cidade</th>
                  <th align="center">Estado</th>
                  {isAuthorized(userRoles, ['ADMIN']) &&
                    <th>Ação</th>
                  }
                </tr>
              </thead>
              <tbody>
                {clientList.map((client, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{client.name}</td>
                    <td>{documentMask(client.document)}</td>
                    <td>
                      {client.phones.map((phone, j) => (
                        <p key={j}>{phoneMask(phone.number, phone.type)}</p>
                      ))}
                    </td>
                    <td>
                      {client.emails.map((email, j) => (
                        <p key={j}>{email.email}</p>
                      ))}
                    </td>
                    <td>{cepMask(client.cep)}</td>
                    <td>{client.street}</td>
                    <td>{client.complement || '-'}</td>
                    <td>{client.neighborhood}</td>
                    <td>{client.city}</td>
                    <td>{client.uf}</td>
                    {isAuthorized(userRoles, ['ADMIN']) &&
                      <td>
                        <Link to={`/clients/edit/${client.id}`}>
                          <FontAwesomeIcon icon={faEdit} />
                        </Link>
                      </td>
                    }
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ClientList;
