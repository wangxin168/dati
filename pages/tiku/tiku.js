// pages/tiku/tiku.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tiku:[
      {img:'../../img/jiben.png',text:'基本信息类'},
      { img: '../../img/hab.png', text: '兴趣爱好类' },
      { img: '../../img/succ.png', text: '个人成就类' }
    ],
    category_lst:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  list:function(e){
    wx.navigateTo({
      url: '/pages/list/list?name=' + e.currentTarget.dataset.name + '&cate_id=' + e.currentTarget.dataset.id,
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
      url: getApp().globalData.url + '/api.php/home/index/get_category',
      data: {
        // uid: wx.getStorageSync('uid')
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res)
        if (res.data.code == 1) {
          that.setData({
            category_lst: res.data.data.category_lst
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