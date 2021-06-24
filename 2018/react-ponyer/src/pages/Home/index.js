import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import {
  Carousel,
  WingBlank,
  WhiteSpace,
  Button
} from 'antd-mobile';

import { changePageTitle } from '../../actions/ui';
import { getHomeCarousel, getHomeMenu, getHomeContent } from '../../service';
import { HomeMenu, HomeContent } from '../../components';
import './home.less';

@connect(null, {changePageTitle})
export default class Home extends Component {
  componentDidMount(){
    this.props.changePageTitle('首页');
    getHomeCarousel()
      .then(resp => {
        if(resp.data.code === 200){
          this.setState({
            carouselImages: resp.data.data.carouselImages
          })
        }
      })
      .catch(err => console.log(err));

      getHomeMenu()
      .then(resp => {
        if(resp.data.code === 200){
          this.setState({
            menuItems: resp.data.data.menuList
          })
        }
      })
      .catch(err => console.log(err))

      this.onLoadMore();
  }
  constructor(){
    super();
    this.totalPage = 6;
    this.limited = 10;
    this.state = {
      carouselImages: [],
      menuItems: [],
      contentDatas: [],
      currentPage: 1
    }
  }
  onLoadMore = () => {
    getHomeContent({
      offset: this.limited * ( this.state.currentPage - 1 ),
      limited: this.limited
    })
    .then(resp => {
      if(resp.data.code === 200){
        this.setState({
          contentDatas: this.state.contentDatas.concat(resp.data.data.bigImgLists),
          currentPage: this.state.currentPage + 1
        })
      }
    })
    .catch(err => console.log(err))
  }
  render() {
    return (
      <Fragment>
        <div className="mp">
          <div className="mp-carousel">
            <Carousel
              autoplay={true}
              infinite
            >
              {
                this.state.carouselImages.map(carouselImage => (
                  <img
                    key={carouselImage.url}
                    src={carouselImage.url}
                    alt=""
                  />
                ))
              }
            </Carousel>
          </div>
          <div className="mp-discount">
            <img src="https://img09.yiguoimg.com/d/items/2018/181017/9710945171580241_1125x344.gif?w=1125&amp;h=344" alt="满199减50" />
          </div>
          <HomeMenu menuItems={this.state.menuItems} />
        </div>
        
        <div className="mp">
          <HomeContent contentDatas={this.state.contentDatas}/>
        </div>
        <div className="mp-button">
        {
          this.totalPage === this.state.currentPage - 1
          ?
          <WingBlank>
            <div style={{textAlign: "center"}}>没有更多啦！！ (╥╯^╰╥)</div>
          </WingBlank>
          :
          <WingBlank>
            <WhiteSpace />
            <Button size="small" onClick={this.onLoadMore}>加载更多…</Button>
          </WingBlank>
        }
        </div>
      </Fragment>
    )
  }
}
