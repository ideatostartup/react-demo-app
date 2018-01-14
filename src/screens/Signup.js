import React, { Component } from "react";

import { Form, Input } from '../ui'
import styles from '../styles';


class Signup extends Component {
  state = {
    email: "",
    name: "",
    password: ""
  };

  render() {
    const { email, name, password } = this.state;
    const { onSignup, setScreen, error } = this.props;
    return (
      <Form
        title="Sign Up"
        inputs={
          <div style={styles.inputWrapper}>
            <Input
              placeholder="Name"
              onChange={event => {
                this.setState({ name: event.target.value });
              }}
            />
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
        footerButtonText="SIGN UP"
        onFooterButtonClick={() => {
          onSignup(
            JSON.stringify({
              email,
              name,
              password
            })
          );
        }}
        footerSecondaryText="Already have an account?"
        onFooterLinkClick={() => {
          setScreen("login");
        }}
        footerLinkText="Log in"
        error={error}
      />
    );
  }
}

export default Signup;