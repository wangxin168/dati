Page({

  /**
   * 页面的初始数据
   */
  data: {
    all: {},
    // 单选的值
    danid: '',

    // 总权重值
    quanzhong: '',
    // 剩余权重
    shengqaun: '',
    disa: 0,
    xuanze: 0,
    xuanze2: 0,
    xuanze3:0,
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
    duo_sec:[],
    totalpage:1,
    zimu: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'],
    shux_id:[],
    timedan_id:'',
    nali3:'',
    date:''
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
        var key_con = that.data.zimu[that.data.page - 1]
        var answer = that.data.all[key_con]
        answer.forEach(function (element, index) {
          if (element.id == ti_id){
            // 选项
            // console.log(that.data.zimu[dan_index])
            // 当前这个题的对象
            // console.log(that.data.all[key_con][index])
            that.data.all[key_con][index].answer = that.data.zimu[dan_index]
            console.log(that.data.all[key_con][index])
          }
        });
      }
      that.setData({
        tiku: tiku,
        // 第几个
        danid: dan_index
      })
    }
  },
  // 多选
  duoxuan: function(e) {
    var that = this;
    // 这个题的下标
    var duo_index_aa = e.currentTarget.dataset.duo;
    // 下表变成字母
    var duo_index = that.data.zimu[duo_index_aa]
    // console.log(duo_index)
    var duo_id = e.currentTarget.dataset.id;
    var tiku = that.data.tiku
    for (var i = 0; i < tiku.length; i++) {
      if (tiku[i].ti_type == 2 && tiku[i].id == duo_id) {
        var duoxuanxiang = tiku[i].options;
        duoxuanxiang[duo_index_aa].is_f = !duoxuanxiang[duo_index_aa].is_f
        

        var key_con = that.data.zimu[that.data.page - 1]
        var answer = that.data.all[key_con]
        answer.forEach(function (element, index) {
          if (element.id == duo_id) {
            // 有就删除没有就添加
            let pos = that.data.duoarr.indexOf(duo_index);
            if (pos < 0) {
              that.data.duoarr.push(duo_index)
            } else {
              that.data.duoarr.splice(pos, 1)
            }
            console.log(that.data.duoarr)
            var duo_aa = that.data.duoarr.join(";");
            // 选项
            // console.log(that.data.zimu[dan_index])
            // 当前这个题的对象
            // console.log(that.data.all[key_con][index])
            that.data.all[key_con][index].answer = duo_aa
            console.log(that.data.all[key_con])
          }
        });
      }
    }

    that.setData({
      tiku: tiku
    })

  },
  // 表格左边单选
  time: function(e) {
    var that = this;
    var timedan_id = e.currentTarget.dataset.id
    that.data.timedan_id = timedan_id
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
          var key_con = that.data.zimu[that.data.page - 1]
          var answer = that.data.all[key_con]
          answer.forEach(function (element, index) {
            if (element.id == timedan_id) {
              // 选项
              // console.log(that.data.zimu[timedan_index])
              // 当前这个题的对象
              // console.log(that.data.all[key_con][index])
              that.data.all[key_con][index].answer = that.data.zimu[timedan_index]
              console.log(that.data.all[key_con][index])
            }
          });
        }
      }
      that.setData({
        tiku: tiku,
        // 第几个
        timedanid: that.data.zimu[timedan_index],
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
    that.data.timedan_id = oldd_id
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
          that.data.olddarr.push(that.data.zimu[oldd_index])
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
    that.data.timedan_id = cheng_id
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
        chengid: that.data.zimu[cheng_index]
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
    that.data.shux_id = shux_id
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
    var that=this;
    console.log(e)
    var xiala = e.currentTarget.dataset.id
    this.setData({
      nali: e.detail.value,
      xuanze: 1
    })
    var key_con = that.data.zimu[that.data.page - 1]
    var answer = that.data.all[key_con]
    answer.forEach(function (element, index) {
      if (element.id == xiala) {
        that.data.all[key_con][index].answer = that.data.all[key_con][index].options_1[that.data.nali]
        console.log(that.data.all[key_con][index])
      }
    });
  },
  // 下拉选择
  bindPickerChange3: function (e) {
    var that = this;
    // console.log(e)
    var xiala = e.currentTarget.dataset.id
    this.setData({
      nali3: e.detail.value,
      xuanze3: 1
    })
    var key_con = that.data.zimu[that.data.page - 1]
    var answer = that.data.all[key_con]
    answer.forEach(function (element, index) {
      if (element.id == xiala) {
        that.data.all[key_con][index].answer = that.data.all[key_con][index].options_1[that.data.nali3]
        console.log(that.data.all[key_con][index])
      }
    });
  },
  bindPickerChange2: function(e) {
    var that=this;
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var xiala = e.currentTarget.dataset.id
    this.setData({
      diernali: e.detail.value,
      xuanze2: 1
    })
    var key_con = that.data.zimu[that.data.page - 1]
    var answer = that.data.all[key_con]
    answer.forEach(function (element, index) {
      if (element.id == xiala) {
        that.data.all[key_con][index].answer = that.data.all[key_con][index].options_2[that.data.diernali]
        console.log(that.data.all[key_con][index])
      }
    });
  },
  // 时间
  bindDateChange: function (e) {
    var that=this;
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var xiala = e.currentTarget.dataset.id
    this.setData({
      date: e.detail.value,
      xuanze: 1
    })
    var key_con = that.data.zimu[that.data.page - 1]
    var answer = that.data.all[key_con]
    answer.forEach(function (element, index) {
      if (element.id == xiala) {
        that.data.all[key_con][index].answer = that.data.date
        console.log(that.data.all[key_con][index])
      }
    });
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
    var id = e.currentTarget.dataset.id
    var value = e.detail.value
    that.setData({
      tiankong: {
        'id': e.currentTarget.dataset.id,
        'value': e.detail.value,
        'ti_type': e.currentTarget.dataset.titype
      }
    })
    console.log(that.data.tiankong)
    var key_con = that.data.zimu[that.data.page - 1]
    var answer = that.data.all[key_con]
    answer.forEach(function (element, index) {
      if (element.id == id) {
        // 选项
        // console.log(that.data.zimu[dan_index])
        // 当前这个题的对象
        // console.log(that.data.all[key_con][index])
        that.data.all[key_con][index].answer = value
        console.log(that.data.all[key_con][index])
      }
    });
  },
  jianda: function(e) {
    // console.log(e)
    var that = this;
    var id = e.currentTarget.dataset.id
    var value = e.detail.value
    that.setData({
      jianda: {
        'id': e.currentTarget.dataset.id,
        'value': e.detail.value,
        'ti_type': e.currentTarget.dataset.titype
      }
    })
    console.log(that.data.jianda)
    var key_con = that.data.zimu[that.data.page - 1]
    var answer = that.data.all[key_con]
    answer.forEach(function (element, index) {
      if (element.id == id) {
        // 选项
        // console.log(that.data.zimu[dan_index])
        // 当前这个题的对象
        // console.log(that.data.all[key_con][index])
        that.data.all[key_con][index].answer = value
        console.log(that.data.all[key_con][index])
      }
    });
  },
  subm: function() {
    var that = this;
    // 属性加点
    var tiku = that.data.tiku
    var shuxing_arr = that.data.shuxing
    for (var i = 0; i < tiku.length; i++) {
      if (tiku[i].id == that.data.shux_id) {
        var shuxing_con = tiku[i].options
        console.log(shuxing_con)
        shuxing_con.forEach(function (element, index) {
          shuxing_arr.push(element.chu)
          that.data.shuxing = shuxing_arr.join(";");
          console.log(that.data.shuxing)
        });
      }
    }
    var key_con = that.data.zimu[that.data.page - 1]
    var answer = that.data.all[key_con]
    answer.forEach(function (element, index) {
      // console.log(element)
      // console.log(that.data.shux_id)
      if (element.id == that.data.shux_id) {
        // 当前这个题的对象
        that.data.all[key_con][index].answer = that.data.shuxing
        console.log(that.data.all[key_con])
      }
    });
    // 复合
    var ollarr_l = that.data.olddarr.join(";");
    var fuhe_con = that.data.timedanid + "|" + ollarr_l + "|" + that.data.chengid
    answer.forEach(function (element, index) {
      if (element.id == that.data.timedan_id) {
        that.data.all[key_con][index].answer = fuhe_con
        console.log(that.data.all[key_con][index])
      }
    });
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
          var array = that.data.all
          var key_con = that.data.zimu[that.data.page - 1]
          // 给对象加key
          that.data.all[key_con] = res.data.data.tiku
          // console.log(that.data.all)
          console.log(that.data.all[key_con])

          var answer = that.data.all[key_con]
          answer.forEach(function (element, index) {
            console.log(element)
            
          });




          var tiku = res.data.data.tiku
          that.data.totalpage = res.data.data.totalpage
          var classid=''
          for (var i = 0; i < tiku.length; i++) {
            if (tiku[i].ti_type == 7) {
              that.setData({
                quanzhong: tiku[i].total_score,
                shengqaun: tiku[i].total_score
              })
            } else if (tiku[i].ti_type == 3){
              // console.log(tiku[i].options)
              // var xiala = tiku[i].options
              // xiala.forEach(function (element, index) {
              //   that.data.duo_sec.push(element.area_name)
              //   that.setData({
              //     multiArray: [that.data.duo_sec,[]],
              //   })
              //   classid = element.id
              //   // console.log(that.data.multiArray)
              // });
              
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
    
    if (that.data.page <= that.data.totalpage){
      that.xuanran();
    }
    
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