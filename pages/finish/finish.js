// pages/finish/finish.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    poster:'',
    activity_id:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that=this;
    that.setData({
      activity_id: options.activity_id
    })
    wx.request({
      url: getApp().globalData.url + '/api.php/home/index/get_message',
      data: {
        // uid: wx.getStorageSync('uid')
        activity_id: that.data.activity_id
      },
      success: res => {
        console.log(res)
        if (res.data.code == 1) {
          that.setData({
            poster: res.data.data.poster
          })
        }
      }
    });
  },
  canvasdraw: function () {
    var that = this;
    wx.showToast({
      title: '图片正在生成保存中',
      icon: 'loading',
      duration: 2000
    });
    wx.downloadFile({
      url: that.data.poster,     //仅为示例，并非真实的资源
      success: function (res) {
        // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
        if (res.statusCode === 200) {
          wx.saveImageToPhotosAlbum({
            filePath: res.tempFilePath,
            success(res) {
              wx.showToast({
                title: '保存图片成功！',
              })
            },
            fail(res) {
              wx.showToast({
                title: '保存图片失败！',
              })
            }
          })
        }
      }
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
    var uid = wx.getStorageSync('uid');
    var thst=this;
    return {
      // title: '免费线路等你来拿',
      desc: '',
      imageUrl: that.data.poster,
      path: '/pages/index/index', // 路径，传递参数到指定页面。
      success: function (res) {
        console.log("成功")
      },
      fail: function (err) {
        console.log("失败")
      }
    }
  },
})