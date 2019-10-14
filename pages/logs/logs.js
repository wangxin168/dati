// pages/xiangq/xiangq.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pipei: [{
        open: 0,
        img: '../../img/pipei1.png'
      },
      {
        open: 1,
        img: '../../img/pipei2.png'
      }
    ],
    act:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  pi_xiang: function(e) {
    var xiang = e.currentTarget.dataset.xiang
    if (xiang == 0) {
      wx.showToast({
        title: '正在匹配，请稍后...',
        icon: 'none'
      })
    } else {
      wx.navigateTo({
        url: '/pages/pi_xiang/pi_xiang?activity_id=' + e.currentTarget.dataset.activity_id,
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var that = this;
    wx.request({
      url: getApp().globalData.url + '/api.php/home/index/my_pipei',
      data: {
        uid: wx.getStorageSync('uid')
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res)
        if (res.data.code == 1) {
          that.setData({
            act: res.data.data.act
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})