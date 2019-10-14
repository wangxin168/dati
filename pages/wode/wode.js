// pages/wode/wode.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatar:'',
    nickname:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  huodong:function(){
    wx.navigateTo({
      url: '/pages/huodong/huodong',
    })
  },  
  ziliao:function(){
    wx.navigateTo({
      url: '/pages/ziliao/ziliao',
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
      url: getApp().globalData.url + '/api.php/home/index/user_center',
      data: {
        uid: wx.getStorageSync('uid')
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res)
        if(res.data.code==1){
          that.setData({
            avatar: res.data.data.userinfo.avatar,
            nickname: res.data.data.userinfo.nickname
          })
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