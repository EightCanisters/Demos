import React, { Component } from 'react';
import { connect } from 'react-redux';

import { changePageTitle } from '../../actions/ui';
import { changeGoodChecked } from '../../actions/cart';
import { CartList, CartGuessList } from '../../components';
import { getCartGuess } from '../../service';
import './cart.less';
import guess from  '../../images/guess.png';

const mapStateToProps = (state) => {
  const { cartDatas } = state.cart;
  const totalNum = cartDatas.reduce((total, item) => {
    if(item.isChecked === true)
      total += item.count;
    return total;
  }, 0);
  const totalPrice = cartDatas.reduce((total, item) => {
    if(item.isChecked === true){
      total += item.count * item.price;
    }
    return total;
  }, 0)
  return {
    cartDatas,
    totalNum,
    totalPrice
  }
}


@connect(mapStateToProps, { changePageTitle, changeGoodChecked })
export default class Cart extends Component {
  constructor(){
    super();
    this.state = {
      isTotalChecked: false,
      totalPrice: 0,
      guessDatas: []
    }
  }
  componentDidMount(){
    this.props.changePageTitle('购物车');

    getCartGuess()
    .then(resp => {
      this.setState({
        guessDatas: resp.data.data
      })
    })
  }

  static getDerivedStateFromProps(props, state){
    const isCartBlank = props.cartDatas.length === 0;
    const isTotalChecked = isCartBlank ? false : !props.cartDatas.some(item => item.isChecked === false);
    return {
      isTotalChecked
    }
  }

  toChangeAllChecked = () => {
    this.setState({
      isTotalChecked: !this.state.isTotalChecked
    })
    this.props.cartDatas.filter(
      item => item.isChecked === this.state.isTotalChecked
    ).map(data => {
      this.props.changeGoodChecked(data.id)
      return data;
    })
  }
 
  render() {
    const iconClass = this.state.isTotalChecked ? 'active' : 'normal';
    return (
      <div className="cart">
        <div className="cart-content">
          <CartList cartDatas={this.props.cartDatas} />
          <div className="cart-content-guess">
            <div className="cart-content-guess-title">
              <img src={guess} alt=""/>
            </div>
            <div className="cart-content-guess-list">
              <CartGuessList guessDatas={this.state.guessDatas} />
            </div>
          </div>
        </div>
        <div className="cart-tabbar">
          <div className="cart-tabbar-left" onClick={this.toChangeAllChecked}>
            <i className={`iconfont icon-fuxuan-${iconClass}`}></i>
            <span>全选</span>
          </div>
          <div className="cart-tabbar-center">
            合计(不含运费)：<span>￥{this.props.totalPrice.toFixed(2)}</span>
          </div>
          <div className="cart-tabbar-right">去结算({this.props.totalNum})</div>
        </div>
      </div>
    )
  }
}
