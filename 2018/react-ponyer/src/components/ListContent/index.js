import React, { Component, Fragment } from 'react';
import ListContentItem from './ListContentItem';

import './list-content.less';

export default class ListContent extends Component {
  render() {
    return (
      <Fragment>
        {
          this.props.listContent.map(item => {
            return (
              <ListContentItem item={item} key={item.title} />
            )
          })
        }
      </Fragment>
    )
  }
}
