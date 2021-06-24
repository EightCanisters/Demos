import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  NavBar,
  Icon
} from 'antd-mobile';

const mapStateToProps = (state) => {
  return {
    title: state.ui.pageTitle,
    isShowNavbar: state.ui.isShowNavbar,
    isSubpage: state.ui.isSubpage
  }
}

@withRouter
@connect(mapStateToProps)
export default class Navbar extends Component {
  render() {
    const extraProps = {};
    if(this.props.isSubpage === true){
      extraProps.icon = <Icon type="left" />;
      extraProps.leftContent = "返回";
      extraProps.onLeftClick = () => {
        this.props.history.goBack();
      }
    }
    return (
      this.props.isShowNavbar
      ?
      <NavBar
        className="mp-navbar"
        mode="dark"
        rightContent={[
          <Icon key="0" type="search" style={{ marginRight: '16px' }} />
        ]}
        {...extraProps}
        style={{"cursor":"pointer"}}
      >{this.props.title}</NavBar>
      :
      ''
    )
  }
}

