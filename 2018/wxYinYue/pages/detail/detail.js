import ajax from '../../utils/service.js';
import store from '../../store/store.js';
import { addToCart } from '../../store/actions/cart.js';
const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    pageId: '4447',
    title: '',
    price: '',
    modalHeadImg: '',
    swipers: [],
    isModalShow: false,
    count: 1,
    totalCount: 0
  },

  // 跳转至购物车页面
  toPageCart () {
    // 这里有坑
    wx.switchTab({
      url: '/pages/cart/cart'
    })
  },

  // 减
  decreaceCount () {
    if (this.data.count < 2) {
      return;
    }
    this.setData({
      count: this.data.count -= 1
    })
  },

  // 加
  increaceCount () {
    this.setData({
      count: this.data.count += 1
    })
  },

  // 关闭模态框
  closeModal () {
    this.setData({
      isModalShow: false,
      count: 1
    });
  },

  // 加入购物车
  addToCart() {
    if (this.data.isModalShow === false) {
      this.setData({
        isModalShow: true
      });
    } else {
      const {
        pageId,
        title,
        price,
        modalHeadImg,
        count
      } = this.data;
      store.dispatch(addToCart({
        id: pageId,
        title,
        price,
        img: modalHeadImg,
        count
      }));
      wx.showToast({
        title: '加入购物车成功',
      });
      this.setData({
        isModalShow: false,
        count: 1
      });
    }
  },

  // 计算购物车总件数
  calcCartItemCount() {
    const count = store.getState().cart.cartDatas.reduce((result, item) => {
      result += item.count;
      return result;
    }, 0);
    this.setData({
      totalCount: count
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.calcCartItemCount();
    store.subscribe(this.calcCartItemCount);
    this.setData({
      pageId: options.id || '4447'
    }, () => {
      ajax.getDetail(`/details?goodsId=${this.data.pageId}&refUrl=`)
        .then(resp => {
          // console.log(resp)
          this.setData({
            title: resp.goodsDetail.title,
            price: resp.goodsDetail.price,
            swipers: resp.goodsDetail.descImages,
            modalHeadImg: resp.goodsDetail.bigHeadImg
          })
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