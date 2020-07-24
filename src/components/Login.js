import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { startLogin, startLoadUser } from "../actions/auth";

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
      <form onSubmit={this.onSubmit}>
        <label>Email</label>
        <input
          type="text"
          value={this.state.username}
          onChange={this.onUsernameChange}
          placeholder="Email"
        />
        <label>Password</label>
        <input
          type="password"
          value={this.state.password}
          onChange={this.onPasswordChange}
          placeholder="Password"
        />
        <button variant="primary" type="submit">
          Login
        </button>
        <button href="/reset" variant="link" className="float-right">
          Click here to reset your password
        </button>
      </form>
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
