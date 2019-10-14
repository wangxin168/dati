// pages/ziliao/ziliao.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tishi_box:false,
    userinfo:{},
    email:'',
    wx:'',
    tel:'',
    switch1:'',
    switch2:'',
    avatar:'',
    tempFilePaths: [],
    tempFile: [],
    wx_codeimg: [],
    wxwx_code: [],
    img_act: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // 邮箱输入的内容
  email:function(e){
    var that=this;
    that.setData({
      email:e.detail.value
    })
  },
  // 微信输入的内容
  wx: function (e) {
    var that = this;
    that.setData({
      wx: e.detail.value
    })
  },
  // 手机号输入的内容
  tel: function (e) {
    var that = this;
    that.setData({
      tel: e.detail.value
    })
  },
  // 弹框确定
  queding:function(){
    var that=this;
    that.setData({
      tishi_box:false
    })
  },
  // 微信开关
  switch1Change: function (e) {
    var that=this;
    console.log(e)
    that.setData({
      switch1: e.detail.value
    })
  },
  // 手机号开关
  switch2Change: function (e) {
    var that=this;
    console.log(e)
    that.setData({
      switch2: e.detail.value
    })
  },
  // 提交按钮
  loginSubmit: function (data) {
    console.log(data)
    var that=this;
    
    if (that.data.switch1 == true){
      var is_wx_open=1
    }else{
      var is_wx_open = 0
    }
    if (that.data.switch2 == true) {
      var is_tel_open = 1
    } else {
      var is_tel_open = 0
    }
    if (that.data.wx_codeimg[0]==undefined){
      that.setData({
        avatar: ''
      })
    }else{
      that.setData({
        avatar: that.data.wx_codeimg[0]
      })
    }
    if (data.detail.value.weixin != '' && that.data.switch1 == true || data.detail.value.dianhua != '' && that.data.switch2 == true){
      var that = this;
      wx.request({
        url: getApp().globalData.url + '/api.php/home/index/save_userinfo',
        data: {
          uid: wx.getStorageSync('uid'),
          avatar: that.data.avatar,
          nickname: data.detail.value.nicheng,
          email: data.detail.value.youx,
          is_wx_open: is_wx_open,
          wx: data.detail.value.weixin,
          is_tel_open: is_tel_open,
          tel: data.detail.value.dianhua
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res) {
          console.log(res)
          wx.showToast({
            title: '提交成功',
            icon:'none'
          })
        }
      })
    }else{
      that.setData({
        tishi_box: true
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
    wx.request({
      url: getApp().globalData.url + '/api.php/home/index/my_userinfo',
      data: {
        uid: wx.getStorageSync('uid')
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        // console.log(res)
        if(res.data.code==1){
          that.setData({
            userinfo: res.data.data.userinfo,
            avatar: res.data.data.userinfo.avatar
          })
          if (res.data.data.userinfo.is_wx_open == 1) {
            that.setData({
              switch1: true
            })
          }
          if (res.data.data.userinfo.is_tel_open==1){
            that.setData({
              switch2: true
            })
          }
          
        }
      }
    })
  },
  //微信图片上传
  wx_img: function () {
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        // console.log(res)
        var tempFilePaths = res.tempFilePaths;
        that.setData({
          tempFile: res.tempFilePaths,
          img_act: res.tempFilePaths[0]
        })
        console.log(that.data.img_act)
        var successUp = 0; //成功个数
        var failUp = 0; //失败个数
        var length = res.tempFilePaths.length; //总共个数
        var i = 0; //第几个
        that.uploading(res.tempFilePaths, successUp, failUp, i, length);
      }
    })
  },
  uploading: function (filePaths, successUp, failUp, i, length) {

    var that = this;
    // console.log(filePaths[i])
    wx.uploadFile({
      url: getApp().globalData.url + '/api.php/home/index/upload_img',
      filePath: filePaths[i],
      name: 'image',
      success: function (res) {
        // console.log(res)
        var res_data = JSON.parse(res.data);
        console.log(res_data)
        // ---------------------------------------------------------------------------------
        if (res_data.code == 1) {
          successUp++;
          var arrimg = that.data.wxwx_code;
          var now_upload_img = that.data.wx_codeimg
          arrimg.push(filePaths[i]);
          now_upload_img.push(res_data.data.img_thumb);
          that.setData({
            wxwx_code: arrimg,
            wx_codeimg: now_upload_img
          })
          console.log(that.data.wx_codeimg)
        } else {
          wx.showToast({
            // title: res_data.error,
            title: '上传错误',
            icon: 'loading'
          })
        }
      },
      fail: function (e) {
        failUp++;
        wx.showToast({
          title: '请求失败',
          icon: 'loading'
        })
      },
      complete: function () {
        i++;
        if (i == length) {
          wx.showToast({
            title: '总共' + successUp + '张上传成功,' + failUp + '张上传失败！',
            icon: 'loading'
          })
          that.setData({
            chuan: 1
          })
        } else { //递归调用uploadDIY函数
          that.upload(filePaths, successUp, failUp, i, length);
          that.setData({
            chuan: 0
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