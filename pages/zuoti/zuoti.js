// pages/zuoti/zuoti.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 单选选项
    xuanxiang: [{
        text: 'A、没有或很少时间',
        idd: 1,
        danxuan: false
      },
      {
        text: 'B、小部分时间',
        idd: 2,
        danxuan: false
      },
      {
        text: 'C、相当多时间',
        idd: 3,
        danxuan: false
      },
      {
        text: 'D、大部分或全部时间',
        idd: 4,
        danxuan: false
      }
    ],
    // 多选选项
    xuanxiang2: [{
        text: 'A、没有或很少时间',
        idd: 1,
        duoxuan: false
      },
      {
        text: 'B、小部分时间',
        idd: 2,
        duoxuan: false
      },
      {
        text: 'C、相当多时间',
        idd: 3,
        duoxuan: false
      },
      {
        text: 'D、大部分或全部时间',
        idd: 4,
        duoxuan: false
      }
    ],
    // 单选的值
    danid: '',
    // 表格的内容
    time: [
      { id: 1, text: '博士', isSeleted: false, idsele: false },
      { id: 2, text: '硕士', isSeleted: false, idsele: false },
      { id: 3, text: '本科', isSeleted: false, idsele: false },
      { id: 4, text: '高中', isSeleted: false, idsele: false },
    ],
    // 表格左边单选的值
    timeid: '',
    // 表格底部的单选选项
    chengxuan:[
      { text:'比较看重',id:1,chengdu:false},
      { text: '略微看重', id: 2, chengdu: false},
      { text: '极其看重', id: 3, chengdu: false}
    ],
    chengid:'',
    jiadian:[
      { id: 1, text: '政治学',shuxz: 0},
      { id: 2, text: '生物学', shuxz: 0},
      { id: 3, text: '医学', shuxz: 0},
      { id: 4, text: '计算机科学', shuxz: 0}
    ],
    // 总权重值
    quanzhong:12,
    // 剩余权重
    shengqaun:12,
    disa:0,
    array:['荔枝','龙眼','桃','苹果','葡萄'],
    xuanze:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: options.name + '答题'
    })
  },
  // 单选
  danxuan_w: function(e) {
    var that = this;
    var newxuanxiang = that.data.xuanxiang;
    var dan_index = e.currentTarget.dataset.dan;
    newxuanxiang[dan_index].danxuan = !newxuanxiang[dan_index].danxuan
    if (newxuanxiang[dan_index].danxuan == true) {
      for (let ii in newxuanxiang) {
        //下标不为 e.currentTarget.dataset.index 全为 false
        if (ii != dan_index) {
          newxuanxiang[ii].danxuan = false;
        }
      }
    }
    that.setData({
      xuanxiang: newxuanxiang,
      danid: newxuanxiang[dan_index].idd
    })
    console.log(that.data.danid)
  
  },
  // 多选
  duoxuan: function(e) {
    var that = this;
    var newxuanxiang2 = that.data.xuanxiang2;
    var duo_index = e.currentTarget.dataset.duo;
    newxuanxiang2[duo_index].duoxuan = !newxuanxiang2[duo_index].duoxuan
    that.setData({
      xuanxiang2: newxuanxiang2
    })
    // console.log(that.data.xuanxiang2)
    let detailValue = this.data.xuanxiang2.filter(it => it.duoxuan).map(it => it.idd)
    console.log('所有选中的值为：', detailValue)
  },
  // 表格左边单选
  time: function (e) {
    var that = this;
    var data_index = e.currentTarget.dataset.time
    var time = that.data.time;
    time[data_index].isSeleted = !time[data_index].isSeleted
    if (time[data_index].isSeleted == true) {
      for (let ii in time) {
        //下标不为 e.currentTarget.dataset.index 全为 false
        if (ii != data_index) {
          time[ii].isSeleted = false;
        }
      }
    }
    that.setData({
      time: time,
      timeid: time[data_index].id
    })
    console.log(that.data.timeid)
  },
  // 表格多选
  newold: function (e) {
    var that = this;
    var newoldData = that.data.time
    var nwo = e.currentTarget.dataset.oldd

    newoldData[nwo].idsele = !newoldData[nwo].idsele
    that.setData({
      time: newoldData
    })
    let detailValue = this.data.time.filter(it => it.idsele).map(it => it.id)
    console.log('所有选中的值为：', detailValue)
  },
  // 表格程度选择
  chengxuan:function(e){
    var that = this;
    var cheng_che = e.currentTarget.dataset.chengx
    var cheng_xuan = that.data.chengxuan;
    cheng_xuan[cheng_che].chengdu = !cheng_xuan[cheng_che].chengdu
    if (cheng_xuan[cheng_che].chengdu == true) {
      for (let ii in cheng_xuan) {
        //下标不为 e.currentTarget.dataset.index 全为 false
        if (ii != cheng_che) {
          cheng_xuan[ii].chengdu = false;
        }
      }
    }
    that.setData({
      chengxuan: cheng_xuan,
      chengid: cheng_xuan[cheng_che].id
    })
    console.log(that.data.chengxuan)
  },
  // 属性加点
  jia:function(e){
    var that=this;
    var zongfen = 0
    // console.log(e.currentTarget.dataset.index)
    var index = e.currentTarget.dataset.index
    
    var jiadian = that.data.jiadian
    jiadian[index].shuxz = jiadian[index].shuxz+1

    that.setData({
      jiadian: jiadian
    })
    for (var i = 0; i < jiadian.length;i++){
      zongfen += jiadian[i].shuxz
    }
    // console.log(zongfen)
    
    // 总分不可以大于总权重
    if (zongfen >= that.data.quanzhong) {
      that.setData({
        disa:1
      })
    }
    // 剩余的权重用来渲染到页面上  剩余的权重等于总权重减去总分
    that.setData({
      shengqaun: that.data.quanzhong-zongfen
    })
  },
  jian: function (e) {
    var that = this;
    var zongfen = 0
    var index = e.currentTarget.dataset.index
    var jiadian = that.data.jiadian
    jiadian[index].shuxz = jiadian[index].shuxz - 1
    if (jiadian[index].shuxz<=0){
      jiadian[index].shuxz = 0
    }
    that.setData({
      jiadian: jiadian
    })
    for (var i = 0; i < jiadian.length; i++) {
      zongfen += jiadian[i].shuxz
    }
    // console.log(zongfen)

    // 总分不可以大于总权重
    if (zongfen < that.data.quanzhong) {
      that.setData({
        disa: 0
      })
    }
    // 剩余的权重用来渲染到页面上  剩余的权重等于总权重减去总分
    that.setData({
      shengqaun: that.data.quanzhong - zongfen
    })
  },
  // 下拉选择
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value,
      xuanze:1
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