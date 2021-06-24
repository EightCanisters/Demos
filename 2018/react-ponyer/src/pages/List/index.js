import React, { Component } from 'react';
import { connect } from 'react-redux'

import { Tabs, Badge } from 'antd-mobile';

import { ListContent } from '../../components'
import { getListContent } from '../../service';
import { showNavbar, isSubpage } from '../../actions/ui';
import './list.less';

const mapStateToProps = (state) => {
  const totalNum = state.cart.cartDatas.reduce((total, item) => {
    total += item.count;
    return total;
  }, 0);
  return {
    totalNum
  }
}

@connect(mapStateToProps, { showNavbar, isSubpage })
export default class List extends Component {
  componentDidMount(){
    this.props.showNavbar(false)
    this.props.isSubpage(true)

    //获取列表数据
    getListContent({id: this.props.match.params.id})
    .then(resp => {
      if(resp.data.code === 200){
        this.setState({
          listContent: resp.data.data
        })
      }
    })
  }
  componentWillUnmount(){
    this.props.showNavbar(true)
    this.props.isSubpage(false)
  }

  toPageCart = () => {
    this.props.history.push('/cart');
  }

  constructor(){
    super();
    this.state = {
      listContent: []
    }
  }

  render() {
    const tabs = [
      { title: '销量' },
      { title: '新品' },
      { title: '价格' },
    ];
    return (
      <div className="mp-list">
        <Tabs tabs={tabs}
        >
          {
            tabs.map(item => {
              return (
                <div key={item.title} className="mp-list-content">
                  <ListContent listContent={this.state.listContent} />
                </div>
              )
            })
          }
        </Tabs>
        <div className="mp-list-cart" onClick={this.toPageCart}>
          <Badge text={this.props.totalNum} overflowCount={99}>
            <img src="https://img05.yiguoimg.com/d/web/180508/01311/150610/cart1.png" alt=""/>
          </Badge>
        </div>
      </div>
    )
  }
}
