import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import {
  Button
} from 'antd-mobile';

import CartListItem from './CartListItem';
import './cart-list.less';

@withRouter
export default class CartList extends Component {
  toPageHome = () => {
    this.props.history.push('/home');
  }
  render() {
    const {
      cartDatas
    } = this.props;
    return (
      <div>
        {
          cartDatas.length === 0
          ?
          <div className="cart-blank">
            <i className="iconfont icon-cart-normal"></i>
            <p>购物车空空的，快去逛逛吧！</p>
            <Button type="ghost" inline onClick={this.toPageHome}>去逛逛</Button>
          </div>
          :
          cartDatas.map(cartData => {
            return(
              <CartListItem {...cartData} key={cartData.title}/>
            )
          })
        }
      </div>
    )
  }
}
