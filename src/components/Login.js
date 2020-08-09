//imports React/Redux
import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

// import components
import ValidationMessage from "./ValidationMessage";

//import actions
import { startLogin } from "../actions/auth";

//import hooks
import useForm from "../hooks/useForm";

//import validation
import validate from "../validation/login";

//imports from Bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const LoginForm = (props) => {
  const { values, handleChange, handleSubmit, errors } = useForm(
    onSubmit,
    validate
  );

  function onSubmit() {
    props.startLogin({
      username: values.email,
      password: values.password,
    });
  }

  if (props.isAuthenticated) {
    return <Redirect to="/" />;
  } else {
    return (
      <Container className="form-container form-bump-down">
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="loginUsername">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              name="email"
              value={values.email || ""}
              onChange={handleChange}
              placeholder="Email"
            />
            <ValidationMessage valid={!errors.email} message={errors.email} />
          </Form.Group>
          <Form.Group controlId="loginPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={values.password || ""}
              onChange={handleChange}
              placeholder="Password"
            />
            <ValidationMessage
              valid={!errors.password}
              message={errors.password}
            />
          </Form.Group>
          <Row>
            <Col>
              <Button variant="primary" type="submit">
                Login
              </Button>
              <Button href="/reset" variant="link" className="float-right">
                Click here to reset your password
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    );
  }
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = (dispatch) => ({
  startLogin: (loginInfo) => dispatch(startLogin(loginInfo)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
