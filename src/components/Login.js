import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { startLogin, startLoadUser } from "../actions/auth";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
    };
  }

  onUsernameChange = (e) => {
    const username = e.target.value;
    this.setState({ username });
  };

  onPasswordChange = (e) => {
    const password = e.target.value;
    this.setState({ password });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.startLogin({
      username: this.state.username,
      password: this.state.password,
    });
  };

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/" />;
    }
    return (
      <Container className="form-container">
        <Form onSubmit={this.onSubmit}>
          <Container className="input-container">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              value={this.state.username}
              onChange={this.onUsernameChange}
              placeholder="Email"
            />
          </Container>
          <Container className="input-container">
            <Form.Label className="form-label">Password</Form.Label>
            <Form.Control
              type="password"
              value={this.state.password}
              onChange={this.onPasswordChange}
              placeholder="Password"
            />
          </Container>
          <Container className="button-container">
            <Button variant="primary" type="submit">
              Login
            </Button>
            <Button href="/reset" variant="link" className="float-right">
              Click here to reset your password
            </Button>
          </Container>
        </Form>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = (dispatch) => ({
  startLogin: (loginInfo) => dispatch(startLogin(loginInfo)),
  startLoadUser: (authKey) => dispatch(startLoadUser(authKey)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
