import React from "react";
import { resetPasswordConfirm } from "../actions/auth";
import ValidationMessage from "./ValidationMessage";
import useForm from "../hooks/useForm";
import validate from "../validation/passwordreset";
import history from "../history";

import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

const ResetForm = (props) => {
  const { values, handleChange, handleSubmit, errors } = useForm(
    onSubmit,
    validate
  );

  function onSubmit() {
    resetPasswordConfirm({
      uid: props.match.params.uid,
      token: props.match.params.token,
      new_password1: values.passwordOne,
      new_password2: values.passwordTwo,
    }).then((res) => {
      if (res.status === 200) {
        history.push("/");
      }
    });
  }

  return (
    <Container className="form-container form-bump-down">
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="passwordOne"
            value={values.passwordOne || ""}
            onChange={handleChange}
            placeholder="Enter new password"
            required
          />
          <ValidationMessage
            valid={!errors.passwordOne}
            message={errors.passwordOne}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            className={`${errors.passwordTwo && "is-danger"}`}
            type="password"
            name="passwordTwo"
            value={values.passwordTwo || ""}
            onChange={handleChange}
            placeholder="Confirm Password"
          />
          <ValidationMessage
            valid={!errors.passwordTwo}
            message={errors.passwordTwo}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Change Password
        </Button>
      </Form>
    </Container>
  );
};

export default ResetForm;
