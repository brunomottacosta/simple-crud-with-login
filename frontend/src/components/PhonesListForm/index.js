import React from 'react';
import { Form, Col, Card, Button, InputGroup } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus } from '@fortawesome/free-solid-svg-icons';

import Constants from '../../Constants';

import { phoneMask } from '../../helpers/masks';

const PhonesListForm = props => {

  const { form, form: { values, errors, touched }, ...helpers } = props;

  const handlePhoneChange = (event, type = 'CELLPHONE') => {
    event.target.value = phoneMask(event.target.value, type);
    form.handleChange(event);
  }

  const handleTypeChange = (event, index) => {
    values.phones[index].number = '';
    form.handleChange(event);
  }

  const canAddNewItem = () => {
    return (!values.phones[values.phones.length - 1].number && !touched.phones) || !!errors.phones;
  }

  const handleAddNewItem = () => {
    helpers.push({
      number: '',
      type: 'CELLPHONE'
    });
  };

  const handleRemoveItem = (index) => {
    helpers.remove(index);
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>Lista de Telefones</Card.Title>

        {!!values.phones && values.phones.map((phone, index) => (
          <Form.Row key={index}>
            <Form.Group as={Col} controlId={`clientForm.phones${index}.number`}>
              <InputGroup>
                <InputGroup.Prepend>
                  <Button
                    variant="danger"
                    onClick={() => handleRemoveItem(index)}
                    disabled={index === 0}>
                    <FontAwesomeIcon icon={faMinus} />
                  </Button>
                </InputGroup.Prepend>
                <Form.Control
                  placeholder='Número do Telefone'
                  type="text"
                  name={`phones.${index}.number`}
                  value={phone.number}
                  onChange={(e) => handlePhoneChange(e, phone.type)}
                  isInvalid={!!errors.phones && !!errors.phones[index]?.number}
                />
              </InputGroup>
              <Form.Control.Feedback type="invalid">
                {!!errors.phones && !!errors.phones[index] && errors.phones[index].number}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} controlId={`clientForm.phones${index}.type`}>
              <Form.Control
                as="select"
                name={`phones.${index}.type`}
                value={phone.type}
                onChange={(e) => handleTypeChange(e, index)}
                isInvalid={!!errors.phones && !!errors.phones[index]?.type}
              >
                {Constants.PhoneTypes.map((obj, i) => (
                  <option key={i} value={obj.type}>{obj.name}</option>
                ))}
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {!!errors.phones && !!errors.phones[index] && errors.phones[index].type}
              </Form.Control.Feedback>
            </Form.Group>
          </Form.Row>
        ))}

        <Button
          variant="dark"
          onClick={handleAddNewItem}
          disabled={canAddNewItem()}>
          Adicionar
        </Button>
      </Card.Body>
    </Card>
  );
}

export default PhonesListForm;
