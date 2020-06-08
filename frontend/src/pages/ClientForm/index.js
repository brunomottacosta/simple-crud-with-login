import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Container, Jumbotron, Row, Col, Form, Button, InputGroup } from 'react-bootstrap'
import { FieldArray, Formik } from 'formik';
import * as Yup from 'yup';

import superagent from 'superagent';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import * as api from '../../services/api';

import PhonesListForm from '../../components/PhonesListForm';
import EmailListForm from '../../components/EmailList';

import { cepMask, documentMask, phoneMask } from '../../helpers/masks';

const schema = Yup.object({
  name: Yup.string()
    .min(3, 'Deve ser maior que 3')
    .max(100, 'Deve ser menor que 100')
    .required('Campo obrigatório'),
  document: Yup.string()
    .matches(/^(\d{3}\.?\d{3}\.?\d{3}-?\d{2})$/, 'CPF deve ser no formato 000.000.000-00')
    .required('Campo obrigatório'),
  cep: Yup.string()
    .matches(/^(\d{5}-?\d{3})$/, 'CEP deve ser no formato 00000-000')
    .required('Campo obrigatório'),
  uf: Yup.string()
    .min(2, 'UF deve ter 2 caracteres')
    .max(2, 'UF deve ter 2 caracteres')
    .required('Campo obrigatório'),
  city: Yup.string()
    .required('Campo obrigatório'),
  street: Yup.string()
    .required('Campo obrigatório'),
  neighborhood: Yup.string()
    .required('Campo obrigatório'),
  complement: Yup.string(),
  phones: Yup.array()
    .of(Yup.object().shape({
      number: Yup.string()
        .matches(/^(\(\d{2}\)\s?(\d{4}||\d{5})-?\d{4})$/, 'Telefone dever estar no formato (11)11111-1111')
        .required('Campo obrigatório'),
      type: Yup.string()
        .required()
    }))
    .required('Pelo menos um telefone é obrigatório'),
  emails: Yup.array()
    .of(Yup.object().shape({
      email: Yup.string()
        .email('Deve estar no formato de e-mail')
        .required('Campo obrigatório'),
    }))
    .required('Pelo menos um telefone é obrigatório'),
});

const ClientForm = () => {

  const [cepSearch, setCepSearch] = useState(false);

  const [initialState, setInitialState] = useState({
    name: '',
    document: '',
    cep: '',
    uf: '',
    city: '',
    street: '',
    neighborhood: '',
    complement: '',
    phones: [{ number: '', type: 'CELLPHONE' }],
    emails: [{ email: '' }]
  });

  const history = useHistory();

  const { id } = useParams();

  useEffect(() => {
    if (!!id) {
      api.getClient(id)
        .then(res => {
          const data = res.body;
          const client = {
            ...data,
            document: documentMask(data.document),
            cep: cepMask(data.cep),
            phones: data.phones.map((phone) => {
              return {
                ...phone,
                number: phoneMask(phone.number, phone.type)
              };
            }),
          }
          setInitialState(client);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, [id]);

  // Handle CEP search with rest API
  const handleSearchAddress = (cep, values) => {
    superagent.get(`https://viacep.com.br/ws/${cep}/json/`)
      .then(res => {
        console.log(res);
        if (res.body.error) {
          // Handle CEP search error
        } else {
          values.uf = res.body.uf;
          values.city = res.body.localidade;
          values.street = res.body.logradouro;
          values.complement = res.body.complemento;
          values.neighborhood = res.body.bairro;
          setCepSearch(true);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  // Submits form when its valid
  // Formik deals with form errors
  const onSubmitForm = (data) => {
    const client = {
      ...data,
      document: data.document.onlyNumbers(),
      cep: data.cep.onlyNumbers(),
      phones: data.phones.map((phone) => {
        return {
          ...phone,
          number: phone.number.onlyNumbers()
        };
      }),
    };

    if (!!id) {
      api.updateClient(id, client)
        .then(res => {
          history.push('/clients',);
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      api.createClient(client)
        .then(res => {
          history.push('/clients');
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  const handleMaskDocument = (event, callback) => {
    event.target.value = documentMask(event.target.value);
    return callback(event);
  }

  const handleMaskCep = (event, callback) => {
    event.target.value = cepMask(event.target.value);
    return callback(event);
  }

  return (
    <Container fluid>
      <Jumbotron>
        <h1>Formulário de Cliente</h1>
        <Button variant="dark" onClick={() => history.push('/clients')}>
          <FontAwesomeIcon icon={faArrowLeft} /> Voltar
        </Button>
      </Jumbotron>

      <Row className="justify-content-md-center">
        <Col lg={6}>

          <Formik
            validationSchema={schema}
            initialValues={initialState}
            enableReinitialize={true}
            onSubmit={onSubmitForm}
          >
            {({
              handleSubmit,
              handleChange,
              values,
              touched,
              isValid,
              errors,
            }) => (
                <Form noValidate onSubmit={handleSubmit}>
                  <Form.Row>
                    <Form.Group as={Col} controlId="clientForm.name">
                      <Form.Label>Nome</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                        isInvalid={!!errors.name}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.name}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} controlId="clientForm.document">
                      <Form.Label>CPF</Form.Label>
                      <Form.Control
                        type="text"
                        name="document"
                        value={values.document}
                        onChange={(e) => handleMaskDocument(e, handleChange)}
                        isInvalid={!!errors.document}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.document}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Form.Row>

                  <Form.Row>
                    <Form.Group as={Col} controlId="clientForm.cep">
                      <Form.Label>CEP</Form.Label>
                      <InputGroup>
                        <InputGroup.Prepend>
                          <Button
                            variant="outline-dark"
                            onClick={() => handleSearchAddress(values.cep, values)}
                            disabled={!values.cep || !!errors.cep}>
                            <FontAwesomeIcon icon={faSearch} />
                          </Button>
                        </InputGroup.Prepend>
                        <Form.Control
                          type="text"
                          name="cep"
                          value={values.cep}
                          onChange={(e) => handleMaskCep(e, handleChange)}
                          isInvalid={!!errors.cep}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.cep}
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>

                    <Form.Group as={Col} controlId="clientForm.uf">
                      <Form.Label>UF</Form.Label>
                      <Form.Control
                        type="text"
                        name="uf"
                        value={values.uf}
                        onChange={handleChange}
                        isInvalid={!!errors.uf}
                        disabled={!cepSearch}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.uf}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} controlId="clientForm.city">
                      <Form.Label>Cidade</Form.Label>
                      <Form.Control
                        type="text"
                        name="city"
                        value={values.city}
                        onChange={handleChange}
                        isInvalid={!!errors.city}
                        disabled={!cepSearch}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.city}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Form.Row>

                  <Form.Row>
                    <Form.Group as={Col} controlId="clientForm.street">
                      <Form.Label>Logradouro</Form.Label>
                      <Form.Control
                        type="text"
                        name="street"
                        value={values.street}
                        onChange={handleChange}
                        isInvalid={!!errors.street}
                        disabled={!cepSearch}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.street}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} controlId="clientForm.complement">
                      <Form.Label>Complemento</Form.Label>
                      <Form.Control
                        type="text"
                        name="complement"
                        value={values.complement}
                        onChange={handleChange}
                        isInvalid={!!errors.complement}
                        disabled={!cepSearch}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.complement}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} controlId="clientForm.neighborhood">
                      <Form.Label>Bairro</Form.Label>
                      <Form.Control
                        type="text"
                        name="neighborhood"
                        value={values.neighborhood}
                        onChange={handleChange}
                        isInvalid={!!errors.neighborhood}
                        disabled={!cepSearch}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.neighborhood}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Form.Row>

                  <FieldArray
                    name="phones"
                    component={PhonesListForm}
                  />

                  <div style={{ marginTop: '20px' }} />

                  <FieldArray
                    name="emails"
                    component={EmailListForm}
                  />

                  <div style={{ marginTop: '20px' }} />

                  <Button variant="dark" type="submit">
                    Enviar
                  </Button>
                </Form>
              )}
          </Formik>
        </Col>
      </Row>
    </Container >
  );
};

export default ClientForm;
