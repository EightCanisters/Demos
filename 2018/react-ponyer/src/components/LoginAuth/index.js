import { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { checkLogin } from '../../service';

@withRouter
export default class LoginAuth extends Component {
  isLogin = false;
  componentDidMount() {
    this.checkLogin();
  }
  componentDidUpdate() {
    this.checkLogin();
  }
  checkLogin() {
    if(this.isLogin === true){
      return
    }
    const token = window.localStorage.getItem('login-token');
    if(token) {
      checkLogin({token})
      .then(resp => {
        if(resp.data.code === 200){
          if(resp.data.data.errMsg === "SUCCESS"){
            if(resp.data.data.token){
              window.localStorage.setItem('login-token', resp.data.data.token);
            }
            // this.props.history.push('/home');
            this.isLogin = true;
          }
        }
      })
    }else{
      this.isLogin = false;
    }
  }
  render() {
    return null;
  }
}
