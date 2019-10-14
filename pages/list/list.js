// pages/list/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: [{
        id: 1,
        text: '你的性别是？',
        da: 0
      },
      {
        id: 2,
        text: '你的出生地是？',
        da: 1
      },
      {
        id: 3,
        text: '你的出生日期是？',
        da: 0
      },
      {
        id: 4,
        text: '你的身高是多少？',
        da: 1
      }
    ],
    name:'',
    cate_id:'',
    question_lst:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: options.name
    })
    var that=this;
    that.setData({
      name: options.name,
      cate_id:options.cate_id
    })

  },
  zuoti:function(){
    var that=this;
    wx.navigateTo({
      url: '/pages/zuoti/zuoti?name=' + that.data.name,
    })
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
      url: getApp().globalData.url + '/api.php/home/index/get_cate_ques',
      data: {
        uid: wx.getStorageSync('uid'),
        cate_id: that.data.cate_id
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res)
        if (res.data.code == 1) {
          that.setData({
            question_lst: res.data.data.question_lst
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