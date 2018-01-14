import React, { Component } from "react";

import { getResponse } from './utils';
import { Loader } from './ui';
import { Sidebar, MainLayout} from './layout';
import styles from './styles';


class App extends Component {

  state = {
    user: null,
    loading: true,
  }

  setTokens = ({ jwt, refresh_token }) => {
    if (jwt) {
      localStorage.setItem("jwt", jwt);
      localStorage.setItem("refresh_token", refresh_token);
    }
  }
  
  login = (tokens) => {
    this.setTokens(tokens);
    this.setUser();
  }

  logout = () => {
    localStorage.removeItem("jwt");
    this.setState({user: null})
  }

  setUser = async () => {
    const user = await getResponse({
      method: "GET",
      path: "me",            
    })
    this.setState({
      user,
    })
  }

  refreshToken = async () => {
    if(localStorage.getItem('jwt')) {

      const {jwt} = await getResponse({
        method: "POST",
        path: "access-tokens/refresh",
        body: JSON.stringify({
          refresh_token: localStorage.getItem("refresh_token")
        })
      })
      if(jwt) {
        localStorage.setItem("jwt", jwt); 
        this.setUser();
      }
    } 
    this.setState({
      loading: false
    })
  }

  componentWillMount() {
    this.refreshToken();
    this.interval = setInterval(() => {
      this.refreshToken();
    }, 10 * 60 * 1000)
  } 

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render() {
    const {loading, user} = this.state;
    if(loading) {
      return <Loader />
    }
    return (
      <div style={styles.app}>
        <Sidebar 
          style={styles.sidebar} 
          user={user}
          logout={this.logout}  
        />
        <MainLayout 
          user={user}
          login={this.login}
          style={styles.mainLayout} 
        />
      </div>
    );
  }
}

export default App;