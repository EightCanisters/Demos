import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import {
  Modal,
  Toast
} from 'antd-mobile';

import { 
  changeGoodChecked,
  increaceCartCount,
  decreaceCartCount,
  deleteCartItem
} from '../../actions/cart';
import {
  ADD,
  REDUCE
} from '../../libs/consts/cartConts';

@withRouter
@connect(null, { changeGoodChecked, increaceCartCount, decreaceCartCount, deleteCartItem })
export default class CartListItem extends Component {
  toPageDetail(id){
    this.props.history.push(`/detail/${id}`);
  }
  toChangeIcon(id, e){
    e.stopPropagation();
    this.props.changeGoodChecked(id);
  }
  deleteCountItem = (id, e) => {
    e.stopPropagation();
    Modal.alert('你确定要删除吗？', '', [
      { text: '确定', onPress: () => {
        this.props.deleteCartItem(id);
        Toast.info('删除成功', 1);
      }},
      { text: '取消', onPress: () => {} },
    ])
    // this.props.deleteCartItem(id);
  }
  onGoodCountChange = ({type, id}, e) => {
    e.stopPropagation();
    switch(type){
      case 'ADD':
        this.props.increaceCartCount(id);
        break;
      case 'REDUCE':
        this.props.decreaceCartCount(id);
        break;
      default:
        break;
    }
  }

  render() {
    const {
      image,
      price,
      title,
      count,
      id,
      isChecked
    } = this.props;
    const iconClass = isChecked ? 'active' : 'normal';
    return (
      <div className="cart-content-item" onClick={this.toPageDetail.bind(this, id)}>
        <div className="cart-content-item-left">
          <i className={`iconfont icon-fuxuan-${iconClass}`} onClick={this.toChangeIcon.bind(this, id)}></i>
          <div className="cart-content-item-left-image">
            <img src={image.url} alt={title}/>
          </div>
        </div>
        <div className="cart-content-item-right">
          <div className="cart-content-item-right-top">
            <div className="cart-content-item-right-top-title">
              {title}
            </div>
            <div className="cart-content-item-right-top-delete" onClick={this.deleteCountItem.bind(this,id)}>
              <i className="iconfont icon-delete-normal"></i>
            </div>
          </div>
          <div className="cart-content-item-right-bottom">
            <span className="cart-content-item-right-bottom-price">￥{price}</span>
            <div className="cart-content-item-right-bottom-count">
              <span className="btn" onClick={this.onGoodCountChange.bind(this,{type:REDUCE,id})}>-</span>
              <span className="txt">{count}</span>
              <span className="btn" onClick={this.onGoodCountChange.bind(this,{type:ADD,id})}>+</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
