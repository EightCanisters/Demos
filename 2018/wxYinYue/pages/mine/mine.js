// pages/mine/mine.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLogin: false,
    userName: wx.getStorageSync('yy-username') || '',
    userImg: wx.getStorageSync('yy-img') || '',
    datas: [
      {
        icon: 'dingdan',
        text: '全部订单'
      }, {
        icon: 'fukuan',
        text: '待付款'
      }, {
        icon: 'fahuo',
        text: '待发货'
      }, {
        icon: 'shouhuo',
        text: '待收货'
      }
    ]
  },

  toPageAddress() {
    wx.navigateTo({
      url: '/pages/address/address',
    })
  },

  logout () {
    app.logout();
    this.setData({
      isLogin: false,
      userName: '',
      userImg: ''
    })
    wx.showToast({
      title: '退出登录成功',
    })
    wx.navigateBack();
  },

  bindgetuserinfo(e) {
    if (e.detail.errMsg === 'getUserInfo:ok') {
      app.login();
      const userDatas = JSON.parse(e.detail.rawData)
      this.setData({
        isLogin: true,
        userName: userDatas.nickName,
        userImg: userDatas.avatarUrl,
      })
      wx.setStorageSync('yy-username', this.data.userName)
      wx.setStorageSync('yy-img', this.data.userImg)
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      isLogin: app.isLogin
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