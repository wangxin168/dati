// pages/pi_xiang/pi_xiang.js
var WxParse = require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activity_id:'',
    detail:{},
    match_results:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var that=this;
    that.setData({
      activity_id: options.activity_id
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
    var that = this;
    wx.request({
      url: getApp().globalData.url + '/api.php/home/index/pipei_detail',
      data: {
        uid: wx.getStorageSync('uid'),
        activity_id: that.data.activity_id
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res)
        if (res.data.code == 1) {
          that.setData({
            detail: res.data.data.detail,
            match_results: res.data.data.detail.match_results
          })
          let contents = res.data.data.detail.match_results
          WxParse.wxParse('contents', 'html', contents, that);
        }
      }
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