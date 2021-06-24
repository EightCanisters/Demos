import ajax from '../../utils/service.js';
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hots: [],
    searchHistories: [],
    isClickSearch: false,
    inputData: ''
  },

  deleteHistoryItem (e) {
    app.deleteHistoryItem(e.currentTarget.dataset.text);
    this.setData({
      searchHistories: app.searchHistories
    })
  },

  clearSearchHistory () {
    app.clearSearchHistories();
    this.setData({
      searchHistories: []
    })
  },

  clearInputData () {
    this.setData({
      inputData: ''
    });
  },

  bindInputData (e) {
    this.setData({
      inputData: e.detail.value
    })
  },

  toPageList(e) {
    const keyword = encodeURI(e.currentTarget.dataset.keyword);
    const urltype = encodeURI(e.currentTarget.dataset.type);
    //存入localStorage
    app.addSearchHistories(this.data.inputData);
    this.setData({
      inputData: ''
    });
    wx.navigateTo({
      url: `/pages/list/list?keyword=${keyword}&urltype=${urltype}`
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      searchHistories: app.searchHistories
    })
    ajax.get('/api/search/relatedHot.json?number=10')
      .then(resp => {
        this.setData({
          hots: resp
        })
      })
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
    this.setData({
      searchHistories: app.searchHistories
    })
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