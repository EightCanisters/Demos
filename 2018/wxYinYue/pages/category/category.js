// pages/category/category.js
import ajax from '../../utils/service.js';

const app = getApp();

Page({
  data: {
    header: [
      {
        id: Math.random(),
        bannerType: 'ALBUM',
        title: '专辑'
      }, {
        id: Math.random(),
        bannerType: 'SURROUNDING',
        title: '周边'
      }, {
        id: Math.random(),
        bannerType: 'CHAORENGUAN',
        title: '明星潮款'
      }, {
        id: Math.random(),
        bannerType: 'CAIZHUANG',
        title: '个护美妆'
      }, {
        id: Math.random(),
        bannerType: 'DIGIT',
        title: '影漫周边'
      }, {
        id: Math.random(),
        bannerType: 'CROWD_FUNDING',
        title: '众筹'
      }
    ],
    currentHeader: '专辑',
    isShowBottomMask: false,
    isShowRightMask: true,
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
    currentBannerType: 'ALBUM',
    totalPage: 0,
    pageDatas: [],
    selects: [],
    currentSelect: '发布时间'
  },

  // 跳转到详情页
  toPageDetail(e) {
    wx.navigateTo({
      url:`/pages/detail/detail?id=${e.currentTarget.dataset.id}`
    })
  },

  // 发布时间选择
  selectTimeTap(e) {
    this.setData({
      currentPage: 0,
      totlaPage: 0,
      pageDatas: [],
      isShowBottomMask: false,
      currentSelect: e.currentTarget.dataset.title
    }, () => {
      this.getPageData({
        currentPage: this.data.currentPage,
        bannerType: this.data.bannertype,
        ...e.currentTarget.dataset.type
      });
    })
  },
  loadMore() {
    if(this.data.totalPage === this.data.currentPage) {
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

  closeBottomMask () {
    this.setData({
      isShowBottomMask: false
    })
  },

  openBottomMask() {
    this.setData({
      isShowBottomMask: true
    })
  },

  changeCurrentHeader (e) {
    this.setData({
      currentHeader: e.currentTarget.dataset.title,
      bannertype: e.currentTarget.dataset.bannertype,
      currentPage: 0,
      totlaPage: 0,
      pageDatas: [],
    }, () =>{
      this.getPageData({
        currentPage: this.data.currentPage,
        bannerType: this.data.bannertype
      });
    });
  },

  getPageData({currentPage = 0, bannerType = 'ALBUM', priceSort = '', sellNumSort = '', updateTime = ''}) {
    // console.log(currentPage, bannerType, priceSort, sellNumSort, updateTime)
    ajax.get(`/api/search/getListGoods.json?bannerType=${bannerType}&priceSort=${priceSort}&sellNumSort=${sellNumSort}&updateTime=${updateTime}&ppath=&pageNum=${currentPage}&pageSize=10`)
      .then(resp => {
        this.setData({
          // totalPage: resp.goodsPage.totalPage,
          totalPage: 2,
          pageDatas: this.data.pageDatas.concat(resp.goodsPage.list),
          selects: resp.goodsPage.nav
        })
      })
      .catch(err => console.log(err));
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    const {
      currentPage
    } = this.data;
    this.getPageData({currentPage})
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