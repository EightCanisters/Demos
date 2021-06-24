// pages/cart/cart.js
import store from '../../store/store.js';
import {
  changeGoodChecked,
  isCheckedAllSelect,
  deleteCheckedGoods,
  increaseGoodCount,
  decreaseGoodCount
} from '../../store/actions/cart.js';

const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isCartNull: true,
    isTodoShow: false,
    isAllChecked: false,
    bottomCheckedAllValue: false,
    cartTotalCount: 0,
    cartTotalPrice: 0,
    cartData: [
      // {
      //   id: 2,
      //   title: 'jafsnfke',
      //   price: '21453',
      //   count: 1,
      //   isChecked: true,
      //   img: 'http://img3.yytcdn.com/user/myHomeSquare/160311/0/-M-db8efba6880d58683c2e67c7d79e3f0e_200x200.jpg'
      // }
    ]
  },

  changeTodoShow() {
    this.setData({
      isTodoShow: !this.data.isTodoShow
    })
  },

  toPageHome() {
    wx.switchTab({
      url: '/pages/home/home',
    })
  },
  
  toPageDetail(e) {
    wx.navigateTo({
      url: `/pages/detail/detail?id=${e.currentTarget.dataset.id}`
    });
  },

  changeGoodSelect(e) {
    const id = e.currentTarget.dataset.id;
    store.dispatch(changeGoodChecked(id));
  },

  isAllGoodsChecked () {
    const isAll = store.getState().cart.cartDatas.every(item => item.isChecked === true);
    this.setData({
      isAllChecked: isAll
    });
  },

  changeAllChecked() {
    const bottomCheckedAllValue = !this.data.isAllChecked;
    store.dispatch(isCheckedAllSelect(bottomCheckedAllValue))
  },

  deleteChecked() {
    store.dispatch(deleteCheckedGoods());
    app.setBadge();
  },

  addGoodCount(e) {
    store.dispatch(increaseGoodCount(e.currentTarget.dataset.id))
    app.setBadge();
  },

  reduceGoodCount(e) {
    store.dispatch(decreaseGoodCount(e.currentTarget.dataset.id))
    app.setBadge();
  },

  getCartDataFromStore() {
    this.setData({
      cartData: store.getState().cart.cartDatas
    })
  },

  calcTotalCount() {
    const newData = this.data.cartData.filter(item => item.isChecked === true);
    const totalnumber = newData.reduce((result, item) => {
      result += item.count;
      return result;
    }, 0);
    this.setData({
      cartTotalCount: totalnumber
    });
  },
  
  calcTotalPrice() {
    const newData = this.data.cartData.filter(item => item.isChecked === true);
    const totalPrice = newData.reduce((result, item) => {
      result += item.count * item.price;
      return result;
    }, 0);
    this.setData({
      cartTotalPrice: totalPrice.toFixed(2)
    });
  },

  //登录检查，未登录跳转至登录
  loginCheck () {
    if (app.isLogin === false) {
      wx.showToast({
        title: '登录后才能查看哦~',
        icon: 'none'
      })
      wx.switchTab({
        url: '/pages/mine/mine',
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loginCheck();
    this.getCartDataFromStore();
    store.subscribe(this.getCartDataFromStore);
    this.isAllGoodsChecked();
    store.subscribe(this.isAllGoodsChecked);
    this.calcTotalCount();
    store.subscribe(this.calcTotalCount);
    this.calcTotalPrice();
    store.subscribe(this.calcTotalPrice);
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
    this.loginCheck();
    // app.setBadge();
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