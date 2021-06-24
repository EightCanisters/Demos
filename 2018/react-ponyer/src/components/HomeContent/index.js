import React, { Component } from 'react';

import ContentGoodLists from './ContentGoodLists';
import './home-content.less';

export default class HomeContent extends Component {
  render() {
    // console.log(this.props.contentDatas)
    return(
      <div>
        {
          this.props.contentDatas.map(contentData => {
            return(
              <ContentGoodLists 
                key={contentData.id}
                contentData={contentData}
              />
            )
          })
        }
      </div>
    )
  }
}
