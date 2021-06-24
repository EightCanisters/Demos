import React, { Component, Fragment } from 'react';

import CartGuessListItem from './CartGuessListItem';
import './cart-guess-list.less';

export default class CartGuessList extends Component {
  render() {
    return (
      <Fragment>
        {
          this.props.guessDatas.map(item => {
            return (
              <CartGuessListItem item={item} key={item.id} />
            )
          })
        }
      </Fragment>
    )
  }
}
