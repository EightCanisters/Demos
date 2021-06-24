import React, { Component } from 'react';

import { withRouter } from 'react-router-dom';
import './menu-home.less';

@withRouter
export default class HomeMenu extends Component {
  onChangePage = (id) => {
    this.props.history.push(`/list/${id}`)
  }

  render() {
    const { menuItems } = this.props;
    return (
      <div className="mp-menu">
        {
          menuItems.map(menuItem => {
            return(
              <dl className="mp-menu-item" key={menuItem.img} onClick={() => {this.onChangePage(menuItem.id)}}>
                <dt>
                  <img src={menuItem.img} alt={menuItem.title}/>
                </dt>
                <dd>{menuItem.title}</dd>
              </dl>
            )
          })
        }
      </div>
    )
  }
}
