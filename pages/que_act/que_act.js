Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 单选的值
    danid: '',

    // 总权重值
    quanzhong: '',
    // 剩余权重
    shengqaun: '',
    disa: 0,
    xuanze: 0,
    xuanze2: 0,
    activity_id: '',
    tiku: [],
    // 多选的值
    duoarr: [],
    // 表格单选的值
    timedanid: '',
    // 表格多选的值
    olddarr: [],
    // 程度的值
    chengid: '',
    page: 1,
    tiankong: '',
    elmrnt_d: '',
    fuhe_id: '',
    shuxing: [],
    duo_sec:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: '匹配答题'
    })
    var that = this;
    that.setData({
      activity_id: options.activity_id
    })
  },
  // 单选
  danxuan_w: function(e) {
    var that = this;
    var ti_id = e.currentTarget.dataset.id
    var tiku = that.data.tiku
    for (var i = 0; i < tiku.length; i++) {
      if (tiku[i].ti_type == 1 && tiku[i].id == ti_id) {
        var newxuanxiang = tiku[i].options;
        var dan_index = e.currentTarget.dataset.dan;
        newxuanxiang[dan_index].is_f = !newxuanxiang[dan_index].is_f
        if (newxuanxiang[dan_index].is_f == true) {
          for (let ii in newxuanxiang) {
            //下标不为 e.currentTarget.dataset.index 全为 false
            if (ii != dan_index) {
              newxuanxiang[ii].is_f = false;
            }
          }
        }
      }
      that.setData({
        tiku: tiku,
        // 第几个
        danid: dan_index
      })
    }
    console.log(that.data.danid)
    console.log(that.data.tiku)
  },
  // 多选
  duoxuan: function(e) {
    var that = this;
    var duo_index = e.currentTarget.dataset.duo;
    // console.log(duo_index)
    var duo_id = e.currentTarget.dataset.id;
    var tiku = that.data.tiku

    for (var i = 0; i < tiku.length; i++) {
      if (tiku[i].ti_type == 2 && tiku[i].id == duo_id) {
        var duoxuanxiang = tiku[i].options;
        duoxuanxiang[duo_index].is_f = !duoxuanxiang[duo_index].is_f
        // let detailValue = duoxuanxiang.filter(it => it.is_f).map(it => duo_index)
        // console.log('所有选中的值为：', detailValue)

        // 有就删除没有就添加
        // let pos = that.data.duoarr.indexOf(duo_index);
        // if (pos < 0) {
        // that.data.duoarr.push(duo_index)
        // } else {
        // that.data.duoarr.splice(pos, 1)
        // }
        // console.log(that.data.duoarr)
      }
    }

    that.setData({
      tiku: tiku
    })
    // console.log(that.data.xuanxiang2)

  },
  // 表格左边单选
  time: function(e) {
    var that = this;
    var timedan_id = e.currentTarget.dataset.id
    var tiku = that.data.tiku
    for (var i = 0; i < tiku.length; i++) {
      if (tiku[i].ti_type == 6 && tiku[i].id == timedan_id) {
        var newxuanxiang = tiku[i].options;
        var timedan_index = e.currentTarget.dataset.time;
        newxuanxiang[timedan_index].is_f = !newxuanxiang[timedan_index].is_f
        if (newxuanxiang[timedan_index].is_f == true) {
          for (let ii in newxuanxiang) {
            //下标不为 e.currentTarget.dataset.index 全为 false
            if (ii != timedan_index) {
              newxuanxiang[ii].is_f = false;
            }
          }
        }
      }
      that.setData({
        tiku: tiku,
        // 第几个
        timedanid: timedan_index,
        fuhe_id: tiku[i].id
      })
    }
    console.log(that.data.timedanid)
    // console.log(that.data.tiku)
  },
  // 表格多选
  newold: function(e) {
    var that = this;
    var oldd_index = e.currentTarget.dataset.oldd;
    // console.log(duo_index)
    var oldd_id = e.currentTarget.dataset.id;
    var tiku = that.data.tiku

    for (var i = 0; i < tiku.length; i++) {
      if (tiku[i].ti_type == 6 && tiku[i].id == oldd_id) {
        var duoxuanxiang = tiku[i].options;
        duoxuanxiang[oldd_index].is_f2 = !duoxuanxiang[oldd_index].is_f2
        // let detailValue = duoxuanxiang.filter(it => it.is_f).map(it => duo_index)
        // console.log('所有选中的值为：', detailValue)

        // 有就删除没有就添加
        let pos = that.data.olddarr.indexOf(oldd_index);
        if (pos < 0) {
          that.data.olddarr.push(oldd_index)
        } else {
          that.data.olddarr.splice(pos, 1)
        }
        console.log(that.data.olddarr)


      }
    }

    that.setData({
      tiku: tiku
    })
  },
  // 表格程度选择
  chengxuan: function(e) {
    var that = this;
    var cheng_id = e.currentTarget.dataset.id
    var tiku = that.data.tiku
    for (var i = 0; i < tiku.length; i++) {
      if (tiku[i].ti_type == 6 && tiku[i].id == cheng_id) {
        var newxuanxiang = tiku[i].other_options;
        var cheng_index = e.currentTarget.dataset.chengx;
        newxuanxiang[cheng_index].is_f3 = !newxuanxiang[cheng_index].is_f3
        if (newxuanxiang[cheng_index].is_f3 == true) {
          for (let ii in newxuanxiang) {
            //下标不为 e.currentTarget.dataset.index 全为 false
            if (ii != cheng_index) {
              newxuanxiang[ii].is_f3 = false;
            }
          }
        }
      }
      that.setData({
        tiku: tiku,
        // 第几个
        chengid: cheng_index
      })
    }
    console.log(that.data.chengid)
    console.log(that.data.tiku)
  },
  // 属性加点
  jia: function(e) {
    var that = this;
    var zongfen = 0
    // console.log(e.currentTarget.dataset.index)
    var index = e.currentTarget.dataset.index
    var shux_id = e.currentTarget.dataset.id
    var tiku = that.data.tiku
    for (var i = 0; i < tiku.length; i++) {
      if (tiku[i].ti_type == 7 && tiku[i].id == shux_id) {
        var shuxing = tiku[i].options
        shuxing[index].chu = shuxing[index].chu + 1
        for (var j = 0; j < shuxing.length; j++) {
          zongfen += shuxing[j].chu
        }
      }
    }
    that.setData({
      tiku: tiku
    })

    // console.log(zongfen)

    // 总分不可以大于总权重
    if (zongfen >= that.data.quanzhong) {
      that.setData({
        disa: 1
      })
    }
    // 剩余的权重用来渲染到页面上  剩余的权重等于总权重减去总分
    that.setData({
      shengqaun: that.data.quanzhong - zongfen
    })
  },
  jian: function(e) {
    var that = this;
    var zongfen = 0
    var index = e.currentTarget.dataset.index
    var shux_id = e.currentTarget.dataset.id
    var tiku = that.data.tiku
    for (var i = 0; i < tiku.length; i++) {
      if (tiku[i].ti_type == 7 && tiku[i].id == shux_id) {
        var shuxing = tiku[i].options

        shuxing[index].chu = shuxing[index].chu - 1
        if (shuxing[index].chu <= 0) {
          shuxing[index].chu = 0
        }
        for (var j = 0; j < shuxing.length; j++) {
          zongfen += shuxing[j].chu
        }
      }
    }

    that.setData({
      tiku: tiku
    })

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
  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      nali: e.detail.value,
      xuanze: 1
    })
  },
  bindPickerChange2: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      diernali: e.detail.value,
      xuanze2: 1
    })
  },
  bindMultiPickerChange: function (e) {
    console.log(e)
    var class_key = 0;
    var classList = this.data.duo_sec;

    var select_key = e.detail.value[1];
    var real_key = select_key;
    if (real_key < class_key) {
      this.setData({
        class_id: 0
      })
    } else {
      this.setData({
        class_id: classList[real_key]['id']　　　　　　// class_id 二级id
      })
    }
    this.setData({
      multiIndex: e.detail.value
    })
  },
  tiankong: function(e) {
    console.log(e)
    var that = this;
    that.setData({
      tiankong: {
        'id': e.currentTarget.dataset.id,
        'value': e.detail.value,
        'ti_type': e.currentTarget.dataset.titype
      }
    })
    console.log(that.data.tiankong)
  },
  jianda: function(e) {
    console.log(e)
    var that = this;
    that.setData({
      jianda: {
        'id': e.currentTarget.dataset.id,
        'value': e.detail.value,
        'ti_type': e.currentTarget.dataset.titype
      }
    })
    console.log(that.data.jianda)
  },
  subm: function() {
    var that = this;
    console.log(that.data.jianda)
    console.log(that.data.tiankong)
    console.log(that.data.timedanid)
    var ollarr_l = that.data.olddarr.join(";");
    var fuhe = {
      'id': that.data.fuhe_id,
      'value': that.data.timedanid + "|" + ollarr_l + "|" + that.data.chengid,
      'ti_type': '1'
    }
    console.log(fuhe)
    var tiku = that.data.tiku
    for (var i = 0; i < tiku.length; i++) {
      // 单选
      if (tiku[i].ti_type == 1) {
        var xiang = tiku[i].options;
        xiang.forEach(function(element, index) {
          if (element.is_f == true) {
            console.log(element.v)
            console.log(index)
            that.data.elmrnt_d = {
              'id': tiku[i].id,
              'value': that.data.timedanid,
              'ti_type': '1'
            }
            // -------------------
            console.log(that.data.elmrnt_d)
          }
        });
      } else if (tiku[i].ti_type == 2) {
        var xiang = tiku[i].options;
        xiang.forEach(function(element, index) {
          if (element.is_f == true) {
            that.data.duoarr.push(index)
            // console.log(that.data.duoarr)
            var index_Arr = that.data.duoarr.join(";");
            that.data.elmrnt_duo = {
              'id': tiku[i].id,
              'value': index_Arr,
              'ti_type': '2'
            }
            // -------------------
            console.log(that.data.elmrnt_duo)
          }
        });
      } else if (tiku[i].ti_type == 7) {
        var xiang = tiku[i].options;
        xiang.forEach(function(element, index) {
          console.log(element.chu)
          that.data.shuxing.push(element.chu)
          var shuxing_arr = that.data.shuxing.join(";");
          var shuxing_id = {
            'id': tiku[i].id,
            'value': shuxing_arr,
            'ti_type': '2'
          }
          console.log(shuxing_id)
        });
      }

    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  erji: function (classid) {
    if (classid) {
      this.setData({
        teach_id: classid
      })
    }
    var that = this
    wx.request({
      url: getApp().globalData.url + "/api.php/home/index/get_citys",
      data: {
        province_id: that.data.teach_id
      },
      success: res => {
        console.log(res)
        // that.setData({
        //   classerji: res.data.data
        // })
        // var class_two = that.data.classerji
        // var classarr2 = []
        // for (var i = 0; i < class_two.length; i++) {
        //   classarr2.push(class_two[i].name)
        // }

        // var classArr = that.data.classone
        // that.setData({
        //   multiArray: [classArr, classarr2],
        //   classArr
        // })
      }
    })
  },
  xuanran: function() {
    var that = this;
    wx.request({
      url: getApp().globalData.url + '/api.php/home/index/show_questions',
      data: {
        uid: wx.getStorageSync('uid'),
        activity_id: that.data.activity_id,
        page: that.data.page
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res)
        if (res.data.code == 1) {
          var tiku = res.data.data.tiku
          var classid=''
          for (var i = 0; i < tiku.length; i++) {
            console.log()
            if (tiku[i].ti_type == 7) {
              that.setData({
                quanzhong: tiku[i].total_score,
                shengqaun: tiku[i].total_score
              })
            } else if (tiku[i].ti_type == 3){
              // console.log(tiku[i].options)
              var xiala = tiku[i].options
              xiala.forEach(function (element, index) {
                that.data.duo_sec.push(element.area_name)
                that.setData({
                  multiArray: [that.data.duo_sec,[]],
                })
                classid = element.id
                // console.log(that.data.multiArray)
              });
              
            }
          }
          
          if (classid) {
            that.erji(classid)
          }
          that.setData({
            tiku: res.data.data.tiku
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var that = this;
    that.xuanran();
  },
  next: function() {
    var that = this;
    that.setData({
      page: that.data.page + 1
    })
    that.xuanran();
  },
  prev: function() {
    var that = this;
    that.setData({
      page: that.data.page - 1
    })
    that.xuanran();
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