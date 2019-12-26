// pages/wode/wode.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatar:'',
    nickname:'',
    openids:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  huodong:function(){
    var that=this;
    if (that.data.openids==''){
      wx.showToast({
        title: '您未登录，请先登录哦',
        icon:'none'
      })
    }else{
      wx.navigateTo({
        url: '/pages/huodong/huodong',
      })
    }
    
  },  
  ziliao:function(){
    var that=this;
    if (that.data.openids == '') {
      wx.showToast({
        title: '您未登录，请先登录哦',
        icon: 'none'
      })
    }else{
      wx.navigateTo({
        url: '/pages/ziliao/ziliao',
      })
    }
    
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
    that.setData({
      openids: wx.getStorageSync('openids')
    })
    console.log(that.data.openids=="")
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
  onGotUserInfo: function (event) {
    var that = this;
    console.log(event)
    let allDatas = event.detail.userInfo
    wx.setStorageSync('userImg', allDatas.avatarUrl);
    wx.setStorageSync('userNames', allDatas.nickName);
    wx.login({
      success: res => {
        // 授权
        wx.request({
          url: getApp().globalData.url + '/api.php/home/api/get_openid_api',
          data: {
            code: res.code
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success(res) {
            console.log(res)
            if (res.data.code == 1) {
              wx.setStorageSync('openids', res.data.data.user_info.openid);
              wx.setStorageSync('uid', res.data.data.user_info.uid);
              that.setData({
                openids: wx.getStorageSync('openids')
              })
              // 成功之后传头像昵称给后台
              wx.request({
                url: getApp().globalData.url + '/api.php/home/api/save_info',
                data: {
                  uid: res.data.data.user_info.uid,
                  avatar: allDatas.avatarUrl,
                  nickname: allDatas.nickName
                },
                header: {
                  'content-type': 'application/json' // 默认值
                },
                success(res) {
                  console.log(res)
                  that.onShow()
                }
              })
            }
          }
        })
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