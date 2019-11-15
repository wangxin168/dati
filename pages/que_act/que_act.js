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
    xuanze3: 0,
    activity_id: '',
    tiku: [],
    // 多选的值
    duoarr: [],
    // 表格单选的值
    timedanid: '',
    // 表格多选的值
    olddarr: '',
    // 程度的值
    chengid: '',
    page: 1,
    tiankong: '',
    elmrnt_d: '',
    fuhe_id: '',
    shuxing: [],
    duo_sec: [],
    totalpage: 1,
    zimu: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'],
    shux_id: [],
    timedan_id: '',
    nali3: '',
    date: '',
    classone: [],
    classerji: [],
    one_id: 1,
    multiIndex: [0, 0],
    multiArray: [],
    daan_arr:[],
    answer_arr:[],
    duo_id:'',
    json:{},
    json2:{},
    prev_page:0,
    next_page:0,
    active:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '匹配答题'
    })
    var that = this;
    that.setData({
      activity_id: options.activity_id
    })
  },
  // 单选
  danxuan_w: function (e) {
    var that = this;
    var ti_id = e.currentTarget.dataset.id
    var tiku = that.data.active
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
          if (element.id == ti_id) {
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
        active: tiku,
        // 第几个
        danid: dan_index
      })
    }
  },
  // 多选
  duoxuan: function (e) {
    var that = this;
    let json = JSON.parse(JSON.stringify(this.data.json))
    // 这个题的下标
    var duo_index_aa = e.currentTarget.dataset.duo;
    // 下表变成字母
    var duo_index = that.data.zimu[duo_index_aa]
    // console.log(duo_index)
    var duo_id = e.currentTarget.dataset.id;
    if (json[duo_id].indexOf(duo_index) === -1) {
      json[duo_id].push(duo_index)
    } else {
      json[duo_id].splice(json[duo_id].indexOf(duo_index), 1)
    }
    that.data.duo_id = duo_id
    var tiku = that.data.active
    for (var i = 0; i < tiku.length; i++) {
      if (tiku[i].ti_type == 2 && tiku[i].id == duo_id) {
        var duoxuanxiang = tiku[i].options;
        duoxuanxiang[duo_index_aa].is_f = !duoxuanxiang[duo_index_aa].is_f
        var answer = that.data.all
        console.log(answer)

        var key_con = that.data.zimu[that.data.page - 1]
        var answer  = that.data.all[key_con]
        console.log(answer)
        answer.forEach(function (element, index) {
          // console.log(element)
          console.log(json[duo_id])
          if (element.id == duo_id) {
            console.log(json[duo_id])
            that.data.all[key_con][index].answer = json[duo_id].join(';')
          }
        });
        console.log(that.data.all[key_con])
      }
    }
    that.setData({
      active: tiku,
      json: json
    })
  },
  // 表格左边单选
  time: function (e) {
    var that = this;
    var timedan_id = e.currentTarget.dataset.id
    that.data.timedan_id = timedan_id
    var tiku = that.data.active
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
              that.data.all[key_con][index].answer = that.data.zimu[timedan_index] + '|' + that.data.olddarr + '|'+that.data.chengid
              console.log(that.data.all[key_con][index])
            }
          });
        }
      }
      that.setData({
        active: tiku,
        // 第几个
        timedanid: that.data.zimu[timedan_index],
        fuhe_id: tiku[i].id
      })
    }
    console.log(that.data.timedanid)
    // console.log(that.data.tiku)
  },
  // 表格多选
  newold: function (e) {
    var that = this;
    let json2 = JSON.parse(JSON.stringify(this.data.json2))
    var oldd_index = e.currentTarget.dataset.oldd;
    var oldd_index2 = that.data.zimu[oldd_index]
    // console.log(duo_index)
    var oldd_id = e.currentTarget.dataset.id;
    that.data.timedan_id = oldd_id
    var tiku = that.data.active
    if (json2[oldd_id].indexOf(oldd_index2) === -1) {
      json2[oldd_id].push(oldd_index2)
    } else {
      json2[oldd_id].splice(json2[oldd_id].indexOf(oldd_index2), 1)
    }
    for (var i = 0; i < tiku.length; i++) {
      if (tiku[i].ti_type == 6 && tiku[i].id == oldd_id) {
        var duoxuanxiang = tiku[i].options;
        duoxuanxiang[oldd_index].is_f2 = !duoxuanxiang[oldd_index].is_f2

        var answer = that.data.all
        // console.log(answer)
        var key_con = that.data.zimu[that.data.page - 1]
        var answer = that.data.all[key_con]
        console.log(answer)
        answer.forEach(function (element, index) {
          // console.log(element)
          // console.log(json2[oldd_id])
          if (element.id == oldd_id) {
            console.log(json2[oldd_id])
            that.data.all[key_con][index].answer = that.data.timedanid + '|' + json2[oldd_id].join(';') + '|'+that.data.chengid
          }
        });
        console.log(that.data.all[key_con])
        // let detailValue = duoxuanxiang.filter(it => it.is_f).map(it => duo_index)
        // console.log('所有选中的值为：', detailValue)

        // 有就删除没有就添加
        // let pos = that.data.olddarr.indexOf(oldd_index);
        // if (pos < 0) {
        //   that.data.olddarr.push(that.data.zimu[oldd_index])
        // } else {
        //   that.data.olddarr.splice(pos, 1)
        // }
        // console.log(that.data.olddarr)

      }
      // console.log(that.data.all[key_con])
    }
    // console.log(that.data.olddarr)
    that.setData({
      active: tiku,
      json2: json2,
      olddarr: json2[oldd_id].join(';')
    })
  },
  // 表格程度选择
  chengxuan: function (e) {
    var that = this;
    var cheng_id = e.currentTarget.dataset.id
    that.data.chengid = cheng_id
    console.log(that.data.chengid)
    var tiku = that.data.active
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
          var key_con = that.data.zimu[that.data.page - 1]
          var answer = that.data.all[key_con]
          answer.forEach(function (element, index) {
            if (element.id == cheng_id) {
              // 选项
              // console.log(that.data.zimu[timedan_index])
              // 当前这个题的对象
              // console.log(that.data.all[key_con][index])
              that.data.all[key_con][index].answer = that.data.timedanid + '|' + that.data.olddarr + '|' + that.data.zimu[cheng_index]
              console.log(that.data.all[key_con][index])
            }
          });
        }
      }
      that.setData({
        active: tiku,
        // 第几个
        chengid: that.data.zimu[cheng_index]
      })
    }
    console.log(that.data.chengid)
    console.log(that.data.tiku)
  },
  // 属性加点
  jia: function (e) {
    var that = this;
    var zongfen = 0
    // console.log(e.currentTarget.dataset.index)
    var index = e.currentTarget.dataset.index
    var shux_id = e.currentTarget.dataset.id
    that.data.shux_id = shux_id
    var tiku = that.data.active
    var shu = that.data.shuxing=[]
    for (var i = 0; i < tiku.length; i++) {
      if (tiku[i].ti_type == 7 && tiku[i].id == shux_id) {
        var shuxing = tiku[i].options
        shuxing[index].chu = shuxing[index].chu + 1
        for (var j = 0; j < shuxing.length; j++) {
          zongfen += shuxing[j].chu
        }
        shuxing.forEach(function (element, index) {
          shu.push(element.chu)
          that.data.shuxing = shu.join(";");
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
    that.setData({
      active: tiku
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
  jian: function (e) {
    var that = this;
    var zongfen = 0
    var index = e.currentTarget.dataset.index
    var shux_id = e.currentTarget.dataset.id
    var tiku = that.data.active
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
    var key_con = that.data.zimu[that.data.page - 1]
    var answer = that.data.all[key_con]
    answer.forEach(function (element, index) {
      // console.log(element)
      // console.log(that.data.shux_id)
      if (element.id == that.data.shux_id) {
        // 当前这个题的对象
        that.data.all[key_con][index].answer = shuxing
        console.log(that.data.all[key_con])
      }
    });

    that.setData({
      active: tiku
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
  bindPickerChange: function (e) {
    var that = this;
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
  bindPickerChange2: function (e) {
    var that = this;
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
    var that = this;
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var xiala = e.currentTarget.dataset.id
    this.setData({
      date: e.detail.value,
      xuanze2: 1
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
  tiankong: function (e) {
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
  jianda: function (e) {
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
  subm: function () {
    var that = this;
    // 属性加点
    var tiku = that.data.tiku
    // var shu = that.data.shuxing=[]
    // // console.log(shu)
    // for (var i = 0; i < tiku.length; i++) {
    //   if (tiku[i].id == that.data.shux_id) {
    //     var shuxing_con = tiku[i].options
    //     // console.log(shuxing_con)
    //     shuxing_con.forEach(function (element, index) {
    //       shu.push(element.chu)
    //       that.data.shuxing = shu.join(";");
    //       console.log(that.data.shuxing)
    //     });
    //   }
    // }
    // var key_con = that.data.zimu[that.data.page - 1]
    // var answer = that.data.all[key_con]
    // answer.forEach(function (element, index) {
    //   // console.log(element)
    //   // console.log(that.data.shux_id)
    //   if (element.id == that.data.shux_id) {
    //     // 当前这个题的对象
    //     that.data.all[key_con][index].answer = that.data.shuxing
    //     console.log(that.data.all[key_con])
    //   }
    // });
    
    // // 复合
    // var ollarr_l = that.data.olddarr.join(";");
    // var fuhe_con = that.data.timedanid + "|" + ollarr_l + "|" + that.data.chengid
    // console.log(fuhe_con)
    // answer.forEach(function (element, index) {
    //   if (element.id == that.data.timedan_id) {
    //     that.data.all[key_con][index].answer = fuhe_con
    //     console.log(that.data.all[key_con][index])
    //   }
    // });
    console.log(that.data.all)
    var is_sub=0
    for (var j=0;j<=that.data.page-1;j++){
      var a = that.data.zimu[j]
      // console.log(that.data.all[a].concat(that.data.all[a]))
      var app = that.data.all[a];
      app.forEach(function (element, index) {
        // console.log(element)
        if (element.answer == '' && element.is_xuantian==0){
          wx.showToast({
            title: '有必答题没有填哦',
            icon:'none'
          })
          console.log(element.ti_tree)
          is_sub=1
        }
        var b = { 'id': element.id, 'value': element.answer, 'ti_type': element.ti_type }
        // console.log(b)
        that.data.daan_arr.push(b)
        // console.log(that.data.daan_arr)
      });
    }
    if (is_sub==0){
      console.log(that.data.daan_arr)
      return;
      wx.request({
        url: getApp().globalData.url + '/api.php/home/index/add_act_ques_answer',
        data: {
          uid: wx.getStorageSync('uid'),
          activity_id: that.data.activity_id,
          answer: that.data.daan_arr
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res) {
          console.log(res)
        }
      })
    }
    
    // that.data.daan_arr.forEach(function(element,index){
    //   console.log(element)
    // })
    
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  bindMultiPickerColumnChange: function (e) {
    //e.detail.column 改变的数组下标列, e.detail.value 改变对应列的值
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);

    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    var teach_area_id_session = this.data.teach_id;　　　　// 保持之前的校区id 与新选择的id 做对比，如果改变则重新请求数据
    switch (e.detail.column) {
      case 0:
        var xiaoquList = this.data.class_one;
        var teach_area_id = xiaoquList[e.detail.value]['id'];
        // 一级的选中的id
        this.setData({
          one_id: teach_area_id
        })
        if (teach_area_id_session != teach_area_id) {　　　　// 与之前保持的校区id做对比，如果不一致则重新请求并赋新值
          this.erji(teach_area_id);
        }
        data.multiIndex[1] = 0;
        break;
    }
    this.setData(data);
  },
  bindMultiPickerChange: function (e) {
    var that = this;
    console.log(e)
    var id = e.currentTarget.dataset.id
    var opt = e.detail.value
    var opt_c = opt[0]
    var opt_n = opt[1] = 0
    var class_key = 0;
    var classList = this.data.classerji;

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
      multiIndex: e.detail.value,
      xuanze: 1
    })
    // console.log(this.data.class_id)
    console.log(that.data.classArr[opt_c])
    console.log(classList[0].area_name)

    var key_con = that.data.zimu[that.data.page - 1]
    var answer = that.data.all[key_con]
    answer.forEach(function (element, index) {
      if (element.id == id) {
        that.data.all[key_con][index].answer = that.data.classArr[opt_c] + ';' + classList[0].area_name
        console.log(that.data.all[key_con][index])
      }
    });

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
        // console.log(res)
        that.setData({
          classerji: res.data.data
        })
        var class_two = that.data.classerji
        var classarr2 = []
        for (var i = 0; i < class_two.length; i++) {
          classarr2.push(class_two[i].area_name)
        }
        var classArr = that.data.classone
        that.setData({
          multiArray: [classArr, classarr2],
          classArr
        })
      }
    })
  },
  xuanran: function () {
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
          // console.log(that.data.all[key_con])

          that.data.answer_arr = that.data.all[key_con]
          console.log(that.data.answer_arr)
          that.setData({
            tiku: res.data.data.tiku,
            totalpage: res.data.data.totalpage,
            active: that.data.all[key_con]
          })
          var classid = ''
          var tiku = that.data.tiku
          let json = {}
          let json2={}
          for (var i = 0; i < tiku.length; i++) {
            if (tiku[i].ti_type === 2) {
              json[tiku[i].id] = []
            }
            if (tiku[i].ti_type === 6) {
              json2[tiku[i].id] = []
            }
            if (tiku[i].ti_type == 7) {
              that.setData({
                quanzhong: tiku[i].total_score,
                shengqaun: tiku[i].total_score
              })
            }
            else if (tiku[i].ti_type == 3 && tiku[i].select_type == 3) {
              var classArr = that.data.classone
              var class_one = tiku[i].options
              class_one.forEach(function (element, index) {
                classArr.push(element.area_name)
              });
              that.setData({
                multiArray: [classArr, []],
                class_one,
                classArr
              })
              classid = class_one[0].id
              if (classid) {
                that.erji(classid)
              }
            }
          }
          // let obj = JSON.parse(JSON.stringify(that.data.json))
          //  json 是多选存放答案的容器
          that.setData({
            // json: Object.assign(obj, json)
            json:json,
            json2: json2
          })
          
          if(that.data.page==1){
            that.setData({
              prev_page:1
            })
          }else{
            that.setData({
              prev_page: 0
            })
          }

          if (that.data.page == that.data.totalpage) {
            that.setData({
              next_page: 1
            })
          } else {
            that.setData({
              next_page: 0
            })
          }
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    that.xuanran();
  },
  next: function () {
    var that = this;
    that.setData({
      page: that.data.page + 1
    })

    if (that.data.page <= that.data.totalpage) {
      that.xuanran();
    }

  },
  prev: function () {
    var that = this;
    that.setData({
      page: that.data.page - 1
    })

    that.xuanran();
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