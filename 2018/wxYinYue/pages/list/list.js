// pages/category/category.js
import ajax from '../../utils/service.js';

const app = getApp();

Page({
  data: {
    isShowBottomMask: false,
    bottomMaskData: [
      {
        icon: 'new',
        text: '最新发布',
        type: {
          updateTime: 'DESC'
        }
      }, {
        icon: 'up',
        text: '价格从低到高',
        type: {
          priceSort: 'ASC'
        }
      }, {
        icon: 'down',
        text: '价格从高到低',
        type: {
          priceSort: 'DESC'
        }
      }, {
        icon: 'xiaoliang',
        text: '销量',
        type: {
          sellNumSort: 'DESC'
        }
      }
    ],
    currentPage: 0,
    totalPage: 0,
    pageDatas: [],
    currentSelect: '发布时间',
    pageTitle: '公演周边',
    currentType: '公演周边'
  },

  // 跳转到详情页
  toPageDetail(e) {
    wx.navigateTo({
      url: `/pages/detail/detail?id=${e.currentTarget.dataset.id}`
    })
  },

  // 发布时间选择
  selectTimeTap(e) {
    this.setData({
      // currentPage: 0,
      // totlaPage: 0,
      // pageDatas: [],
      currentSelect: e.currentTarget.dataset.title,
      isShowBottomMask: false
    }, () => {
      // this.getPageData({
      //   currentPage: this.data.currentPage,
      //   ...e.currentTarget.dataset.type
      // });
    })
  },
  loadMore() {
    if (this.data.totalPage - 1 === this.data.currentPage) {
      return;
    }
    this.setData({
      currentPage: this.data.currentPage += 1
    }, () => {
      this.getPageData({
        currentPage: this.data.currentPage,
        bannerType: this.data.bannertype
      });
    })
  },

  refresh() {
    if (this.data.currentPage === 0) {
      return;
    }
    this.setData({
      currentPage: 0,
      totlaPage: 0,
      pageDatas: []
    }, () => {
      this.getPageData({
        currentPage: this.data.currentPage,
        bannerType: this.data.bannertype
      });
    })
  },

  closeBottomMask() {
    this.setData({
      isShowBottomMask: false
    })
  },

  openBottomMask() {
    this.setData({
      isShowBottomMask: true
    })
  },

  getPageData() {
    let url = '';
    switch(this.data.currentType){
      case '新品首发':
        url = `/api/goods/findNewGoods.json?num=4`;
        break;
      case '热门艺人':
        url = `/api/search/getListGoods.json?pageSize=10&pageNum=0&isArtist=true&keyWord=${encodeURI(this.data.pageTitle)}`;
        break;
      default:
        url = `/api/search/getListGoods.json?pageSize=10&pageNum=0&keyWord=${encodeURI(this.data.pageTitle)}`;
        break;
    };
    ajax.get(url)
      .then(resp => {
        switch(this.data.currentType){
          case '新品首发':
            let newPageData  = [];
            for(let item in resp.goodsMap){
              newPageData.push(...resp.goodsMap[item])
            }
            console.log(newPageData)
            this.setData({
              totalPage: 1,
              pageDatas: newPageData
            });
          default:
            this.setData({
              totalPage: resp.goodsPage.totalPage,
              // totalPage: 2,
              pageDatas: this.data.pageDatas.concat(resp.goodsPage.list)
            })
        }
      })
      .catch(err => console.log(err));
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let { keyword, urltype } = options;
    keyword = decodeURI(keyword);
    urltype = decodeURI(urltype);
    wx.setNavigationBarTitle({
      title: keyword
    })
    if (keyword) {
      if(keyword === '签名商品'){
        keyword = '签名';
      };
      this.setData({
        pageTitle: keyword,
        currentType: urltype
      });
    };
    const {
      currentPage
    } = this.data;
    this.getPageData({ currentPage });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    app.setBadge();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})