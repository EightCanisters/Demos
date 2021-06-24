
import React, { Component } from 'react';

import { withRouter } from 'react-router-dom';

@withRouter
export default class ContentGood extends Component {
  onChangePage = (id) => {
    this.props.history.push(`/detail/${id}`)
  }
  render() {
    // console.log(this.props);
    const {
      count,
      price,
      title,
      url,
      id
    } = this.props.goodItem;
    return (
      <dl className="mp-content-goods-item" onClick={() => {this.onChangePage(id)}}>
        <dt>
          <img src={url} alt=""/>
        </dt>
        <dd>
          <div>{title}{id}</div>
          <div>
            <span className="price">￥{price}&nbsp;</span>
            <span className="count">/&nbsp;{count}kg</span>
          </div>
        </dd>
      </dl>
    )
  }
}
