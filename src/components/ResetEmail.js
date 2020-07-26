import React, { useState } from "react";
import { resetPassword } from "../actions/auth";
import { NavLink } from "react-router-dom";
import useForm from '../hooks/useForm';
import validate from '../validation/resetemail';
import ValidationMessage from './ValidationMessage';

import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

const ResetEmail = () => {

  const [showLogInLink, setShowLogInLink] = useState(false)
  const { values, handleChange, handleSubmit, errors } = useForm(onSubmit, validate);

  function onSubmit() {
    resetPassword(values.email);
    setShowLogInLink(true);
  };

  return (
    <Container className="form-container form-bump-down">
      <Form onSubmit={handleSubmit} className="link-margin">
        <Form.Group>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="text"
            name="email"
            value={values.email || ''}
            onChange={handleChange}
            placeholder="Enter your Email Address"
          />
          <ValidationMessage valid={!errors.email} message={errors.email} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      {showLogInLink ? <NavLink
          to={`/login`}
          activeClassName="is-active"
        >
          We are sending you an email now. You can click on this link to return to the log in page.
        </NavLink> : null}
    </Container>
  );
};

export default ResetEmail;
