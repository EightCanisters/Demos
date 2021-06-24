import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import {
  Badge
} from 'antd-mobile';

const mapStateToProps = (state) => {
  const totalNum = state.cart.cartDatas.reduce((total, item) => {
    total += item.count;
    return total;
  }, 0)
  return {
    totalNum
  }
}

@withRouter
@connect(mapStateToProps)
export default class Item extends Component {
  static getDerivedStateFromProps(props){
    return {
      isCurrentItem: props.path === props.location.pathname
    }
  }

  shouldComponentUpdate(nextProps, nextState){
    return this.state.isCurrentItem !== nextState.isCurrentItem || this.props.totalNum !== nextProps.totalNum;
  }
  
  state = {
    isCurrentItem: false
  }

  handlePageClick = () => {
    const { history, path } = this.props;
    history.push(path);
  }
  render() {
    const {
      text,
      icon,
      path
    } = this.props;
    const isCurrentItem = this.state.isCurrentItem;
    const currentItemClass = isCurrentItem ? 'mp-tabbar-item active' : 'mp-tabbar-item'
    const currentIconClass = isCurrentItem ? 'active' : 'normal';
    return (
      <div className={currentItemClass} onClick={this.handlePageClick}>
        <div className="mp-tabbar-item-icon">
        {
          path === '/cart'
          ?
          <Badge text={this.props.totalNum} overflowCount={99}>
            <i className={`iconfont icon-${icon}-${currentIconClass}`}></i>
          </Badge>
          :
          <i className={`iconfont icon-${icon}-${currentIconClass}`}></i>
        }  
        </div>
        <div className="mp-tabbar-item-text">
          {text}
        </div>
      </div>
    )
  }
}
