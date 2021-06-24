import React, { Component,Fragment } from 'react';

import './loading.less';

export default class Loading extends Component {
  render() {
    return (
      // <a className="button">Button</a>
      <Fragment>
        <div className="loading-modal"></div>
        <div className="loading-modal-img">
          <img src="https://img07.yiguoimg.com/e/web/170113/01851/110053/1.gif" alt=""/>
        </div>
      </Fragment>
    )
  }
}
