import React, { Component } from "react";

import { getResponse } from '../utils';
import { Login, Signup, Home} from '../screens'; 

class MainLayout extends Component {
  state = {
    screen: this.props.user ? "home" : "signup",
    loginError: "",
    signupError: ""
  };

  componentWillReceiveProps(nextProps) {
    if(!this.props.user && nextProps.user){
      this.setState({screen: 'home'})
    } else if (this.props.user && !nextProps.user) {
      this.setState({screen: 'login'})
    }
  }

  onLogin = async body => {
    const res = await getResponse({
      method: "POST",
      path: "access-tokens",
      body
    });
    if (res) {
      if(res.reason) {
        this.setState({
          loginError: res.reason
        })
        setTimeout(() => {
          this.setState({
            loginError: ''
          })  
        }, 5 * 1000)
      } else {
        this.props.login(res);
      }
    }
  };

  onSignup = async body => {
    const res = await getResponse({
      method: "POST",
      path: "users",
      body
    });
    if (res) {
      if(res.reason) {
        this.setState({
          signupError: res.reason
        })
        setTimeout(() => {
          this.setState({
            signupError: ''
          })  
        }, 5 * 1000)
      } else {
        this.props.login(res);
      }
    }
  };

  setScreen = screen => {
    this.setState({ screen });
  };

  render() {
    const { style } = this.props;
    const { screen, loginError, signupError } = this.state;
    let component;
    switch (screen) {
      case "login":
        component = <Login 
          error={loginError}  
          onLogin={this.onLogin}
          setScreen={this.setScreen}
        />;
        break;
      case "signup":
        component = (
          <Signup 
            error={signupError}  
            onSignup={this.onSignup}
            setScreen={this.setScreen}
          />
        );
        break;
      default:
        component = <Home />;
        break;
    }
    return <div style={style}>{component}</div>;
  }
}


export default MainLayout;