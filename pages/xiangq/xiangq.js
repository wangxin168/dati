// pages/xiangq/xiangq.js
var WxParse = require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wanshan:false,
    activity_id:'',
    activity_detail:{},
    openid: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    var that=this;
    that.setData({
      activity_id: options.activity_id
    })
  },
  qvxiao:function(){
    var that=this;
    that.setData({
      wanshan:false
    })
  },
  queding:function(){
    wx.navigateTo({
      url: '/pages/ziliao/ziliao',
    })
  },
  onGotUserInfo: function (event) {
    var that=this;
    console.log(event)
    let allDatas = event.detail.userInfo
    wx.setStorageSync('userImg', allDatas.avatarUrl);
    wx.setStorageSync('userNames', allDatas.nickName);
    wx.login({
      success: res => {
        // 授权
        wx.request({
          url: getApp().globalData.url +'/api.php/home/api/get_openid_api',
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
                openid: wx.getStorageSync('openids')
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
  baoming:function(){
    console.log('报名')
    var that=this;
    wx.request({
      url: getApp().globalData.url + '/api.php/home/index/add_order',
      data: {
        uid: wx.getStorageSync('uid'),
        activity_id: that.data.activity_id
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res)
        that.onShow();
      }
    })
  },
  tianxie:function(){
    var that = this;
    wx.request({
      url: getApp().globalData.url + '/api.php/home/index/check_userinfo',
      data: {
        uid: wx.getStorageSync('uid')
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res)
        if(res.data.code==1){
          if (res.data.data.userinfo.is_complete==0){
            wx.navigateTo({
              url: '/pages/ziliao/ziliao',
            })
          } else{
            // console.log('已完善信息')
            wx.navigateTo({
              url: '/pages/que_act/que_act?activity_id=' + that.data.activity_id,
            })
          }
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
    var that = this;
    if (wx.getStorageSync('openids')) {
      var uid = wx.getStorageSync('uid')
    } else {
      var uid = ''
    }
    wx.request({
      url: getApp().globalData.url + '/api.php/home/index/activity_detail',
      data: {
        // uid: wx.getStorageSync('uid')
        uid: uid,
        activity_id: that.data.activity_id
      },
      success: res => {
        console.log(res)
        if (res.data.code == 1) {
          that.setData({
            activity_detail: res.data.data.activity_detail
          })
          let contents = res.data.data.activity_detail.activity_introduce
          WxParse.wxParse('contents', 'html', contents, that);
        }
      }
    });
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