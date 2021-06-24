import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import {
  getCateContent
} from '../../service';
import './category-nav.less';

@withRouter
export default class CategoryNav extends Component {
  constructor(){
    super();
    this.state = {
      cateContentData: []
    }
  }

  toPageList = (id) =>{
    this.props.history.push(`/list/${id}`)
  }

  componentDidMount(){
    //获取右侧内容栏数据
    getCateContent({id:this.props.id})
    .then(resp => {
      if(resp.data.code === 200){
        this.setState({
          cateContentData: resp.data.data
        })
      }
    })
    .catch(err => console.log(err));
  }
  render() {
    return (
      <div className="mp-cate-content">
        {
          this.state.cateContentData.map(item => {
            return (
              <dl key={item.img} className="mp-cate-content-item" onClick={this.toPageList.bind(this, item.id)}>
                <dt><img src={item.img} alt={item.title} className="mp-cate-content-item-img"/></dt>
                <dd className="mp-cate-content-item-title">{item.title}</dd>
              </dl>
            )
          })
        }
      </div>
    )
  }
}
