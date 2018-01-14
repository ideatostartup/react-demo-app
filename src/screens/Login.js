import React, { Component } from "react";

import { Form, Input } from '../ui';
import styles from '../styles';

class Login extends Component {
  state = {
    email: "",
    password: ""
  };

  render() {
    const { email, password } = this.state;
    const { error, onLogin, setScreen } = this.props;
    return (
      <Form
        title="Log In"
        inputs={
          <div style={styles.inputWrapper}>
            <Input
              placeholder="Email"
              onChange={event => {
                this.setState({ email: event.target.value });
              }}
            />
            <Input
              placeholder="Password"
              type="password"
              onChange={event => {
                this.setState({ password: event.target.value });
              }}
            />
          </div>
        }
        onFooterButtonClick={() => {
          onLogin(
            JSON.stringify({
              email,
              password
            })
          );
        }}
        footerButtonText="LOG IN"
        footerSecondaryText="Don't have an account?"
        onFooterLinkClick={() => {
          setScreen("signup");
        }}
        footerLinkText="Create an account"
        error={error}
      />
    );
  }
}

export default Login;