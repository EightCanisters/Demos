import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  Tabs
} from 'antd-mobile';

import {
  getCateNav
} from '../../service';
import { CategoryNav } from '../../components';
import { changePageTitle } from '../../actions/ui';
import './category.less';

@connect(null, { changePageTitle })
export default class Category extends Component {
  componentDidMount(){
    this.props.changePageTitle('分类');
    
    //获取左侧菜单栏数据
    getCateNav()
    .then(resp => {
      if(resp.data.code === 200){
        this.setState({
          cateNavData: resp.data.data
        })
      }
    })
    .catch(err => console.log(err));
  }

  constructor(){
    super();
    this.state = {
      cateNavData: []
    }
  }

  render() {
    return (
     <div className="mp-cate">
        <Tabs tabs={this.state.cateNavData}
          tabBarPosition="left"
          tabDirection="vertical"
        >
          {
            this.state.cateNavData.map(item => {
              return(
                <CategoryNav id={item.id} key={item.title}/>
              )
            })
          }
        </Tabs>
     </div>
    )
  }
}
