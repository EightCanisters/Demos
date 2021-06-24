//app.js
import store from './store/store.js';
import ajax from './utils/service.js';
App({
  // 初始化搜索历史
  searchHistories: wx.getStorageSync('yy-search-histories') || [],

  // 添加搜索历史
  addSearchHistories(data){
    const isInHistory = this.searchHistories.some(item => item.text === data);
    if(data){
      if (isInHistory){
        this.searchHistories.map(i => {
          if(i.text === data) {
            i.count += 1;
          }
          return i;
        })
      } else {
        this.searchHistories.unshift({
          text: data,
          count: 1
        })
      }
    }
    wx.setStorageSync('yy-search-histories', this.searchHistories);
  },
  // 清除搜索历史
  clearSearchHistories(){
    wx.removeStorageSync('yy-search-histories');
    this.searchHistories = [];
  },
  // 删除一条搜索历史
  deleteHistoryItem (data) {
    this.searchHistories =  this.searchHistories.filter(item => item.text !== data);
    wx.setStorageSync('yy-search-histories', this.searchHistories);
  },

  // setBadge
  setBadge() {
    const count = store.getState().cart.cartDatas.reduce((result, item) => {
      result += item.count;
      return result;
    }, 0)
    if(count === 0){
      wx.removeTabBarBadge({
        index: 2,
      });
      return;
    }
    wx.setTabBarBadge({
      index: 2,
      text: `${count>99?'99+':count}`,
    })
  },

  isLogin: false,
  justifyLogin () {
    const token = wx.getStorageSync('yy-login-token') || '';
    // ajax.getLogin(`https://api.weixin.qq.com/sns/jscode2session?appid=wx2024c56bdbb63f0e&secret=bfa66bf4da0b4aa8cdc8980e36a0ce9b&js_code=${token}&grant_type=authorization_code`)
    //   .then(resp => {
    //     if (resp.session_key) {
    //       this.isLogin = true;
    //       console.log(this.isLogin)
    //     }
    //   })
    if(token === ''){
      this.isLogin = false;
    } else {
      this.isLogin = true;
    }
  },
  login () {
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code !== '') {
          wx.setStorageSync('yy-login-token', res.code);
          this.isLogin = true;
        }
      }
    })
  },
  logout() {
    wx.removeStorageSync('yy-username');
    wx.removeStorageSync('yy-img');
    wx.removeStorageSync('yy-login-token');
    this.isLogin = false;
    wx.switchTab({
      url: '/pages/home/home',
    })
  },
  // 获取用户信息
  getUserInfo () {
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // console.log(this.globalData.userInfo)
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },

  onLaunch: function () {
    this.setBadge();
    this.justifyLogin(this.token)
  },
  globalData: {
    userInfo: null
  }
})