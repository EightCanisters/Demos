import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { Toast } from 'antd-mobile';

import { addToCart } from '../../actions/cart';
import add from '../../images/add.png';

@withRouter
@connect(null, { addToCart })
export default class ListContentItem extends Component {
  onAddToCart = (e) => {
    e.stopPropagation();
    const {
      id,
      img,
      title,
      price
    } = this.props.item;
    this.props.addToCart({
      id,
      image: {url: img},
      title,
      price,
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
      img,
      title,
      desc,
      price,
      count
    } = this.props.item;
    return (
      <div className="list-item" key={id} onClick={this.toPageDetail}>
        <div className="list-item-left">
          <img src={img} alt={title}/>
        </div>
        <div className="list-item-right">
          <div className="list-item-right-top">
            <div className="list-item-right-top-title">
              {title}
            </div>
            <div className="list-item-right-top-desc">
              {desc}
            </div>
          </div>
          <div className="list-item-right-bottom">
            <div className="list-item-right-bottom-txt">
              <span className="list-item-right-bottom-txt-price">￥{price}</span>
              <span className="list-item-right-bottom-txt-count">{count}个/份</span>
            </div>
            <div className="list-item-right-bottom-add" onClick={this.onAddToCart}>
              <img src={add} alt="加入购物车"/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
