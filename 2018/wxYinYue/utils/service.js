export default {
  get: (url) => {
    wx.showLoading({
      title: '加载中…',
    })
    return new Promise((resolve, reject) => {
      wx.request({
        url: `https://shop2.m.yinyuetai.com${url}`,
        success: (resp) => {
          resolve(resp.data.data);
        },
        fail: (err) => {
          reject(err);
        },
        complete: (res) => {
          wx.hideLoading();
        }
      })
    })
  },
  getDetail: (url) => {
    wx.showLoading({
      title: '加载中…',
    })
    return new Promise((resolve, reject) => {
      wx.request({
        url: `https://shop.m.yinyuetai.com${url}`,
        success: (resp) => {
          resolve(resp.data);
        },
        fail: (err) => {
          reject(err);
        },
        complete: (res) => {
          wx.hideLoading();
        }
      })
    })
  },
  getLogin: (url) => {
    wx.showLoading({
      title: '加载中…',
    })
    return new Promise((resolve, reject) => {
      wx.request({
        url,
        success: (resp) => {
          resolve(resp.data);
        },
        fail: (err) => {
          reject(err);
        },
        complete: (res) => {
          wx.hideLoading();
        }
      })
    })
  }
}