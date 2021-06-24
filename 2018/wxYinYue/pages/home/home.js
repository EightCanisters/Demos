// pages/home/home.js
import ajax from '../../utils/service.js';
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiper:[],
    nav:[],
    news:[],
    hots:[],
    currentHot:[],
    currentCity: '',
    latitude:'',
    longitude: ''
  },

  toPageAddress() {
    wx.navigateTo({
      url: '/pages/address/address'
    })
  },
  // 跳转到详情页
  toPageDetail(e) {
    wx.navigateTo({
      url: `/pages/detail/detail?id=${e.currentTarget.dataset.id}`
    })
  },
  toPageSearch(e) {
    wx.navigateTo({
      url: `/pages/search/search`
    })
  },
  toPageList(e) {
    const keyword = encodeURI(e.currentTarget.dataset.keyword);
    const urltype = encodeURI(e.currentTarget.dataset.type);
    wx.navigateTo({
      url: `/pages/list/list?keyword=${keyword}&urltype=${urltype}`
    })
  },
  // 获取热门艺人数据
  getHotsData(e){
    let artistId = '';
    let artistName = '';
    if (this.data.currentHot.length === 0) {
      artistId = '36176';
      artistName = '鹿晗';
    } else {
      if (e.currentTarget.dataset.artistname == this.data.currentHot[0].artistName) {
        return false;
      }
      artistId = e.currentTarget.dataset.artistid;
      artistName = e.currentTarget.dataset.artistname;
    }
    ajax.get(`/api/goods/indexList.json?num=6&artistId=${artistId}&artistName=${artistName}`)
      .then(resp => {
        this.setData({
          currentHot: resp
        })
      })
      .catch(err => {
        console.log(err);
      });
  },

  getCurrentCity () {
    wx.getLocation({
      success: (res) => {
        this.setData({
          latitude: res.latitude,
          longitude: res.longitude
        })
        wx.request({
          url: `https://apis.map.qq.com/ws/geocoder/v1/?location=${res.latitude},${res.longitude}&key=JBNBZ-LUUK3-TOG3M-3NO5Y-RJRJ6-IMBQY`,
          success: (resp =>{
            this.setData({
              currentCity: resp.data.result.address_component.city
            })
          })
        })
      },
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCurrentCity();
    const that = this;
    // 加载轮播图数据
    ajax.get('/api/carousel/indexList.json?equipmentName=WAP&num=5')
      .then(resp => {
        that.setData({
          swiper: resp
        })
      })
      .catch(err => {
        console.log(err);
      });

    // 加载nav数据
    ajax.get('/api/hotKeyword/indexList.json?equipmentName=WAP&num=6')
      .then(resp => {
        that.setData({
          nav: resp
        })
      })
      .catch(err => {
        console.log(err);
      });
    // 新品首发数据
    ajax.get('/api/goods/findNewGoods.json?num=1')
      .then(resp => {
        that.setData({
          news: Object.values(resp.goodsMap)
        })
      })
      .catch(err => {
        console.log(err);
      });
    // 热门艺人
    ajax.get('/api/artist/indexList.json?equipmentName=WAP&num=10')
      .then(resp => {
        that.setData({
          hots: resp,
        })
      })
      .catch(err => {
        console.log(err);
      });
    that.getHotsData(that)
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