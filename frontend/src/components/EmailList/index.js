import React from 'react';
import { Form, Col, Card, Button, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus } from '@fortawesome/free-solid-svg-icons';


const EmailListForm = props => {

  const { form: { values, errors, touched, handleChange: outerHandleChange }, ...helpers } = props;

  const handleChange = (event) => {
    event.persist();
    outerHandleChange(event);
  }

  const canAddNewItem = () => {
    return (!values.emails[values.emails.length - 1].email && !touched.emails) || !!errors.emails;
  }

  const handleAddNewItem = () => {
    helpers.push({
      email: '',
    });
  };

  const handleRemoveItem = (index) => {
    helpers.remove(index);
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>Lista de E-mails</Card.Title>

        {!!values.emails && values.emails.map((email, index) => (
          <Form.Row key={index}>
            <Form.Group as={Col} controlId={`clientForm.emails${index}.emails`}>
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
                  type="text"
                  name={`emails.${index}.email`}
                  value={values.emails[index].email}
                  onChange={handleChange}
                  isInvalid={!!errors.emails && !!errors.emails[index]?.email}
                />
              </InputGroup>
              <Form.Control.Feedback type="invalid">
                {!!errors.emails && !!errors.emails[index] && errors.emails[index].email}
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

export default EmailListForm;
