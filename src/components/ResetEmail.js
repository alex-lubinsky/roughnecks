import React from "react";
import { resetPassword } from "../actions/auth";
import useForm from "../hooks/useForm";
import validate from "../validation/resetemail";
import ValidationMessage from "./ValidationMessage";

import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import history from "../history";

const ResetEmail = () => {
  
  const { values, handleChange, handleSubmit, errors } = useForm(
    onSubmit,
    validate
  );

  function onSubmit() {
    resetPassword(values.email).then((res) => {
      if (res.status === 200) {
        history.push("/reset/successful/");
      }
    });
  }

  return (
    <Container className="form-container form-bump-down">
      <Form onSubmit={handleSubmit} className="link-margin">
        <Form.Group>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="text"
            name="email"
            value={values.email || ""}
            onChange={handleChange}
            placeholder="Enter your Email Address"
          />
          <ValidationMessage valid={!errors.email} message={errors.email} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default ResetEmail;