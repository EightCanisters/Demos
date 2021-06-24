import React, { Component } from 'react';
import { isSubpage, changePageTitle } from '../../actions/ui';
import { addToCart } from '../../actions/cart';
import { connect } from 'react-redux';

import {
  Carousel,
  Badge
} from 'antd-mobile';

import {
  ADD,
  REDUCE
} from '../../libs/consts/cartConts';
import { getDetailContent } from '../../service';
import './detail.less';

const mapStateToProps = (state) => {
  const totalNum = state.cart.cartDatas.reduce((total, item) => {
    total += item.count;
    return total;
  }, 0);
  return {
    totalNum,
    cartDatas: state.cart.cartDatas
  }
}

@connect(mapStateToProps, { isSubpage, addToCart, changePageTitle })
export default class Detail extends Component {
  componentDidMount(){
    this.props.isSubpage(true);
    this.props.changePageTitle('首页');

    getDetailContent(this.props.match.params.id)
    .then(resp => {
      if(resp.data.code === 200){
        this.setState({
          goodDetail: {
            ...resp.data.data,
            count: 1
          }
        });
      }
    })
    .then(() => {
      this.props.changePageTitle(this.state.goodDetail.title)
    })
  }
  componentWillUnmount(){
    this.props.isSubpage(false);
  }

  constructor(){
    super();
    this.state = {
      goodDetail: {}
    }
  }

  toPageCart = () => {
    this.props.history.push('/cart')
  }
  toPageHome = () => {
    this.props.history.push('/home')
  }
  onAddToCart = () => {
    const {
      title,
      images,
      price,
      count
    } = this.state.goodDetail;
    const image = images[0];
    this.props.addToCart({
      id: this.props.match.params.id,
      title,
      image,
      price,
      count
    })
  }
  onGoodCountChange = (type, e) => {
    e.stopPropagation();
    const good = Object.assign({}, this.state.goodDetail);
    switch(type){
      case 'ADD':
        good.count += 1;
        break;
      case 'REDUCE':
        if(good.count > 1)
          good.count -= 1;
        break;
      default:
        break;
    }
    this.setState({
      goodDetail: good
    });
  }

  render() {
    const {
      title,
      description,
      address,
      images,
      price,
      province,
      count
    } = this.state.goodDetail;
    return (
      <div className="mp-detail">
        <div className="mp-detail-body">
          <div>
            <div className="mp-detail-body-carousel">
              {
                Object.keys(this.state.goodDetail).length !== 0
                &&
                <Carousel
                  autoplay={true}
                  infinite
                >
                  {
                    images.map(carouselImage => (
                      <img
                        key={carouselImage.url}
                        src={carouselImage.url}
                        alt=""
                      />
                    ))
                  }
                </Carousel>
              }
            </div>
            <div className="mp-detail-desc">
              <h3>{title}</h3>
              <p>{description}</p>
              <div className="mp-detail-body-price">
                <span>￥{price}</span>
                <i><span>产地：</span>{province}</i>
              </div>
              <span>不支持7天无理由退货</span>
            </div>
            <div className="mp-detail-count">
              数量
              <div className="mp-detail-count-change">
                <span className="btn" onClick={this.onGoodCountChange.bind(this, REDUCE)}>-</span>
                <span className="txt">{count}</span>
                <span className="btn" onClick={this.onGoodCountChange.bind(this, ADD)}>+</span>
              </div>
            </div>
          </div>
          <div className="mp-detail-address">
            送至
            <span>{address}</span>
          </div>
        </div>

        <div className="mp-detail-tabbar">
          <div className="mp-detail-tabbar-left">
            <div className="mp-detail-tabbar-left-item" onClick={this.toPageHome}>
              <div className="mp-detail-tabbar-left-item-icon">
                <i className={`iconfont icon-home-normal`}></i>
              </div>
              <div className="mp-detail-tabbar-left-item-text">
                首页
              </div>
            </div>
            <div className="mp-detail-tabbar-left-item" onClick={this.toPageCart}>
              <div className="mp-detail-tabbar-left-item-icon">
                <Badge text={this.props.totalNum} overflowCount={99}>
                  <i className={`iconfont icon-cart-normal`}></i>
                </Badge>
              </div>
              <div className="mp-detail-tabbar-left-item-text">
                购物车
              </div>
            </div>
          </div>
          <div className="mp-detail-tabbar-right" onClick={this.onAddToCart}>加入购物车</div>
        </div>
      </div>
    )
  }
}
