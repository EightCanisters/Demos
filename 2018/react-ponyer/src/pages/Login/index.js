import React, { Component } from 'react';
import { connect } from 'react-redux';

import { changePageTitle } from '../../actions/ui';

import {
  InputItem,
  Toast,
  WingBlank,
  WhiteSpace,
  Button
} from 'antd-mobile';

import {
  login
} from '../../service';
import './login.less';

@connect(null,  { changePageTitle })
export default class Login extends Component {
  componentDidMount(){
    this.props.changePageTitle('登录');
  }
  constructor(){
    super();
    this.state = {
      username: {
        value: '',
        err: false,
        errMsg: '用户名6-16个字符'
      },
      password: {
        value: '',
        err: false,
        errMsg: '用户名6-16个字符'
      }
    }
  }

  handleUsernameChange = (value) => {
    let err = false;
    if(value.length < 6 || value.length > 16) {
      err = true;
    }
    this.setState({
      username: {
        ...this.state.username,
        value,
        err
      }
    })
  }
  handlePasswordChange = (value) => {
    let err = false;
    if(value.length < 6 || value.length > 16) {
      err = true;
    }
    this.setState({
      password: {
        ...this.state.password,
        value,
        err
      }
    })
  }

  handleSubmit = () => {
    if(this.state.username.value === '' || this.state.password.value === ''){
      return Toast.fail('用户名和密码都不能为空');
    }
    if(this.state.username.err || this.state.password.err){
      return Toast.fail('用户名和密码错误');
    }
    login({
      username: this.state.username.value,
      password: this.state.password.value
    }).then(resp => {
      console.log(resp)
      if(resp.data.code === 200){
        window.localStorage.setItem('login-token', resp.data.data.token);
        window.localStorage.setItem('login-user', this.state.username.value);
        this.props.history.push('/home');
      }
    }).catch(err => console.log(err))
  }

  render() {
    return (
      <div>
        <div className="mp-login-input">
          <InputItem
              placeholder="请输入用户名"
              value={this.state.username.value}
              onChange={this.handleUsernameChange}
              error={this.state.username.err}
              onErrorClick={() => {
                Toast.fail(this.state.username.errMsg)
              }}
            >用户名</InputItem>
          <InputItem
            value={this.state.password.value}
            onChange={this.handlePasswordChange}
            placeholder="请输入密码"
            type="password"
            error={this.state.password.err}
            onErrorClick={() => {
              Toast.fail(this.state.password.errMsg)
            }}
          >密码</InputItem>
        </div>
        <WhiteSpace />
          <div className="mp-login-submit">
            <WingBlank>
              <Button inline onClick={this.handleSubmit} type="primary">登录</Button>
              <Button inline type="success">注册</Button>
            </WingBlank>
          </div>
      </div>
    )
  }
}
