//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    act:[]
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function() {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  xuanran:function(){
    var that=this;
    if (wx.getStorageSync('openids')){
      var uid = wx.getStorageSync('uid')
    }else{
      var uid=''
    }
    wx.request({
      url: getApp().globalData.url + '/api.php/home/index/activity_lst',
      data: {
        // uid: wx.getStorageSync('uid')
        uid: uid
      },
      success: res => {
        // console.log(res)
        if (res.data.code == 1) {
          that.setData({
            act: res.data.data.act
          })
        }
      }
    });
  },
  onShow: function() {
    var that=this;
    that.xuanran();
  },
  xiangq: function(e) {
    // console.log(e)
    wx.navigateTo({
      url: '/pages/xiangq/xiangq?activity_id=' + e.currentTarget.dataset.activity_id,
    })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})