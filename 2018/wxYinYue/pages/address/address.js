// pages/address/address.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    latitude: 0,
    longitude: 0,
    isModalShow: false,
    username: '',
    mobile: '',
    address: '',
    addresses: wx.getStorageSync('yy-addresses') || []
  },

  closeModal() {
    this.setData({
      isModalShow: false,
    });
  },

  addAddress() {
    this.setData({
      isModalShow: true
    })
  },

  inputUsername(e) {
    this.setData({
      username: e.detail.value
    })
  },

  inputMobile(e) {
    this.setData({
      mobile: e.detail.value
    })
  },

  selectAddress() {
    wx.chooseLocation({
      success: (res) => {
        this.setData({
          latitude: res.latitude,
          longitude: res.longitude
        }, () => {
          wx.request({
            url: `https://apis.map.qq.com/ws/geocoder/v1/?location=${res.latitude},${res.longitude}&key=JBNBZ-LUUK3-TOG3M-3NO5Y-RJRJ6-IMBQY`,
            success: (resp => {
              this.setData({
                address: resp.data.result.address
              })
            })
          })
        })
      },
      fail: function(res) {},
      complete: function(res) {
      },
    })
  },

  addOneAddress() {
    if(this.data.username === '' || this.data.mobile === '' || this.data.address === ''){
      wx.showToast({
        icon: 'none',
        title: '信息不能为空'
      });
      return;
    }
    const oneAddress = {
      username: this.data.username,
      mobile: this.data.mobile,
      address: this.data.address,
      id: Math.floor(Math.random() * (9999 - 1) + 1)
    };
    const newAddress = this.data.addresses;
    newAddress.unshift(oneAddress);
    this.setData({
      addresses: newAddress,
      isModalShow: false
    });
    wx.setStorageSync('yy-addresses', this.data.addresses);
    this.setData({
      username: '',
      mobile: '',
      address: ''
    })
  },

  deleteOneAddress(e) {
    const newAddresses = this.data.addresses.filter(item => item.id !== e.currentTarget.dataset.id);
    this.setData({
      addresses: newAddresses
    });
    wx.setStorageSync('yy-addresses', newAddresses)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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