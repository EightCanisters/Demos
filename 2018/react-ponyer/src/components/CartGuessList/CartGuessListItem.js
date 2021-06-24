import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { Toast } from 'antd-mobile';

import { addToCart } from '../../actions/cart';
import add from '../../images/add.png';

@withRouter
@connect(null, { addToCart })
export default class CartGuessListItem extends Component {
  onAddToCart = (e) => {
    e.stopPropagation();
    this.props.addToCart({
      ...this.props.item,
      count: 1
    })
    Toast.info('加入购物车成功', 1);
  }
  toPageDetail = () => {
    this.props.history.push(`/detail/${this.props.item.id}`)
  }
  render() {
    const {
      id,
      image,
      title,
      price
    } = this.props.item;
    return (
      <div className="guesslist-item" key={id} onClick={this.toPageDetail}>
        <div className="guesslist-item-img">
          <img src={image.url} alt={title}/>
        </div>
        <div className="guesslist-item-title">
          {title}
        </div>
        <div className="guesslist-item-bottom">
          <span className="guesslist-item-bottom-txt">￥{price}</span>
          <div className="guesslist-item-bottom-add" onClick={this.onAddToCart}>
            <img src={add} alt="加入购物车"/>
          </div>
        </div>
      </div>
    )
  }
}
