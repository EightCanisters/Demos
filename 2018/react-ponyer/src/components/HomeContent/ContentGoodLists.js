import React, { Component } from 'react';

import ContentGood from './ContentGood';
import './home-content.less';

export default class ContengGoodLists extends Component {
  render() {
    // console.log(this.props.contentData);
    const {
      bigImg,
      goodsList
    } = this.props.contentData;
    return (
      <div className="mp-content">
          <div className="mp-content-img">
            <img src={bigImg.url} alt=""/>
          </div>
          <div className="mp-content-goods">
            {
              goodsList.map(goodItem => {
                return(
                  <ContentGood goodItem={goodItem} key={goodItem.id} />
                )
              })
            }
          </div>
      </div>
    )
  }
}
