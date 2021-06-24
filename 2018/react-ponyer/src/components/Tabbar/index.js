import React, { Component } from 'react';
import  PropTypes from 'prop-types';

import './tabbar.less';
import '../../libs/less/icon.less';

import Item from './Item';

export default class Tabbar extends Component {
  static propTypes = {
    routes: PropTypes.arrayOf(PropTypes.shape({
      text: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired
    }))
  }
  render() {
    const { routes } = this.props;
    return (
      <div className="mp-tabbar">
        {
          routes.map(route => {
            return(
              <Item 
                key={route.path}
                text={route.text}
                icon={route.icon}
                path={route.path}
              />
            )
          })
        }
      </div>
    )
  }
}
