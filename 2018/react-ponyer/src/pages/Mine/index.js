import React, { Component } from 'react';
import { connect } from 'react-redux';


import { showNavbar } from '../../actions/ui';
import { mineBanner } from '../../libs/consts/mineBanner';
import { mineContent } from '../../libs/consts/mineContent';
import './mine.less';

@connect(null, { showNavbar })
export default class Mine extends Component {
  constructor(){
    super();
    this.state = {
      loginUser: ''
    }
  }
  componentDidMount(){
    this.props.showNavbar(false);
    const loginUser = window.localStorage.getItem('login-user');
    this.setState({
      loginUser
    })
  }
  componentWillUnmount(){
    this.props.showNavbar(true);
  }

  toPageLogin = () => {
    this.props.history.push('/login');
  }

  logOut = () => {
    window.localStorage.removeItem('login-token');
    window.localStorage.removeItem('login-user');
    this.props.history.push('/home');
  }
  render() {
    return (
      <div className="mine">
        <div className="mp-mine">
          <div className="mp-mine-header">
            <div className="mp-mine-header-left">
              <div className="mp-mine-header-left-img">
                <img src="https://img02.yiguo.com/e/web/150703/00781/140145/no-pic.jpg" alt=""/>
              </div>
              {
                this.state.loginUser
                ?
                <div>
                  {this.state.loginUser}
                </div>
                :
                <div onClick={this.toPageLogin}>登录/注册</div>
              }
            </div>
            <div className="mp-mine-header-right" onClick={this.logOut}>
              <i className="iconfont icon-tuichudenglu"></i>
            </div>
          </div>
          <div className="mp-mine-banner">
            {
              mineBanner.map(item =>{
                return (
                  <div className="mp-mine-banner-item" key={item.icon}>
                    <div className="mp-mine-banner-item-icon">
                      <i className={`iconfont icon-${item.icon}`}></i>
                    </div>
                    <div className="mp-mine-banner-item-text">
                      {item.text}
                    </div>
                  </div>
                )
              })
            }
          </div>
          <div className="mp-mine-content">
            {
              mineContent.map(item =>{
                return (
                  <div className="mp-mine-content-item" key={item.icon}>
                    <div className="mp-mine-content-item-icon">
                      <i className={`iconfont icon-${item.icon}`}></i>
                    </div>
                    <div className="mp-mine-content-item-text">
                      {item.text}
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    )
  }
}
