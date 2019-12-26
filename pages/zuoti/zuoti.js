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
    chengxuan: [
      { text: '比较看重', id: 1, chengdu: false },
      { text: '略微看重', id: 2, chengdu: false },
      { text: '极其看重', id: 3, chengdu: false }
    ],
    chengid: '',
    jiadian: [
      { id: 1, text: '政治学', shuxz: 0 },
      { id: 2, text: '生物学', shuxz: 0 },
      { id: 3, text: '医学', shuxz: 0 },
      { id: 4, text: '计算机科学', shuxz: 0 }
    ],
    // 总权重值
    quanzhong: '',
    // 剩余权重
    shengqaun: '',
    disa: 0,
    array: ['荔枝', '龙眼', '桃', '苹果', '葡萄'],
    xuanze: 0,
    xuanze2: 0,
    // 题的id
    cate_id: '',
    // 排序
    sorts: '',
    // 当前页
    before: '',
    // 类型
    ti_type: '',
    // 总页数
    total: '',
    // 数组要遍历的
    ques_detail: [],
    next_num: 1,
    prev_num: 1,
    daan: '',
    question_id: '',
    write_daan: '',
    zimu: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'],
    options: [],
    // 承载多选的容器
    duoarr:[],
    arr_duo:[],
    // 属性加点承载
    shuxing_con:[],
    // 属性单选
    shu_dan:'',
    // 属性多选
    shu_duo:'',
    shu_dan2:'',
    duo_sec: [],
    // 一个下拉
    xiala_options:[],
    xiala_options2:[],
    // 一个还是两个
    opt_count:'',
    // 一个的下标
    index:'',
    // 第二个下表
    diernali:'',
    xiala:[],
    date: '',
    classone:[],
    classerji:[],
    one_id: '',
    multiIndex: [0, 0],
    multiArray: [],
    class_id:0,
    opt_xuanze:0,
    sub_sheng:'',
    sub_shi:'',
    diqv_gaibian:0,
    json:{},
    openids:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: options.name + '答题'
    })
    var that = this;
    that.setData({
      cate_id: options.id,
      sorts: options.sorts
    })
  },
  // 单选
  danxuan_w: function (e) {
    var that = this;
    var newxuanxiang = that.data.options;
    var dan_index = e.currentTarget.dataset.dan;
    newxuanxiang[dan_index].is_f = !newxuanxiang[dan_index].is_f;
    if (newxuanxiang[dan_index].is_f == true) {
      for (let ii in newxuanxiang) {
        //下标不为 e.currentTarget.dataset.index 全为 false
        if (ii != dan_index) {
          newxuanxiang[ii].is_f = false;
        }
      }
    }
    that.setData({
      options: that.data.options,
      // write_daan: that.data.zimu[dan_index]
    })
    // console.log(that.data.options)

  },
  // 多选
  duoxuan: function (e) {
    var that = this;
    // let json = JSON.parse(JSON.stringify(that.data.json))
    var newxuanxiang2 = that.data.options;
    var duo_index = e.currentTarget.dataset.duo;
    console.log(duo_index)
    // console.log(json[duo_index])

    newxuanxiang2[duo_index].is_f = !newxuanxiang2[duo_index].is_f
    
    that.setData({
      options: newxuanxiang2
    })

    // 有就删除没有就添加
    var zimu_duo = that.data.zimu[duo_index]
    let pos = that.data.options.indexOf(zimu_duo);
    // console.log(newxuanxiang2[duo_index].is_f)
    if (pos < 0 && (newxuanxiang2[duo_index].is_f)==true) {
      console.log(111)
      that.data.duoarr.push(zimu_duo)
      
    } else {
      console.log(zimu_duo)
      // that.data.duoarr.splice(duo_index, 1)
      that.data.duoarr.forEach(function(element,index){
        if (element == zimu_duo){
          that.data.duoarr.splice(index, 1)
        }
      })
      
    }

    console.log(that.data.duoarr)
    // for (var i = 0; i < that.data.duoarr.length; i++) {
    //   var duoarr_i = that.data.duoarr[i]
    //   that.data.arr_duo.push(that.data.zimu[duoarr_i])
    // }
    
    // var arr = Array.from(new Set(that.data.arr_duo))
    // console.log(arr)
    var arr_duoxuan = that.data.duoarr.join(";");
    that.setData({
      write_daan: arr_duoxuan
    })
  },
  // 表格左边单选
  time: function (e) {
    var that = this;
    var time = that.data.options;
    var data_index = e.currentTarget.dataset.time
    time[data_index].is_f = !time[data_index].is_f;
    if (time[data_index].is_f == true) {
      for (let ii in time) {
        //下标不为 e.currentTarget.dataset.index 全为 false
        if (ii != data_index) {
          time[ii].is_f = false;
        }
      }
    }
    that.setData({
      options: that.data.options,
      // write_daan: that.data.zimu[data_index]
    })
  },
  // 表格多选
  newold: function (e) {
    var that = this;
    var newoldData = that.data.options;
    var nwo = e.currentTarget.dataset.oldd;
    newoldData[nwo].is_f2 = !newoldData[nwo].is_f2
    that.setData({
      options: newoldData
    })
    // 有就删除没有就添加
    let pos = that.data.options.indexOf(nwo);
    if (pos < 0) {
      that.data.duoarr.push(nwo)
    } else {
      that.data.duoarr.splice(pos, 1)
    }
    for (var i = 0; i < that.data.duoarr.length; i++) {
      var duoarr_i = that.data.duoarr[i]
      that.data.arr_duo.push(that.data.zimu[duoarr_i])
    }
    var arr = Array.from(new Set(that.data.arr_duo))
    var arr_duoxuan = arr.join(";");
    that.setData({
      shu_duo: arr_duoxuan
    })
  },
  // 表格程度选择
  chengxuan: function (e) {
    var that = this;
    var cheng_xuan = that.data.other_options;
    var cheng_che = e.currentTarget.dataset.chengx;
    cheng_xuan[cheng_che].is_f3 = !cheng_xuan[cheng_che].is_f3;
    if (cheng_xuan[cheng_che].is_f3 == true) {
      for (let ii in cheng_xuan) {
        //下标不为 e.currentTarget.dataset.index 全为 false
        if (ii != cheng_che) {
          cheng_xuan[ii].is_f3 = false;
        }
      }
    }
    that.setData({
      other_options: that.data.other_options
    })
  },
  // 属性加点
  jia: function (e) {
    var that = this;
    var zongfen = 0
    // console.log(e.currentTarget.dataset.index)
    var index = e.currentTarget.dataset.index

    var jiadian = that.data.options
    jiadian[index].chu = jiadian[index].chu + 1

    that.setData({
      options: jiadian
    })
    for (var i = 0; i < jiadian.length; i++) {
      zongfen += jiadian[i].chu
      // console.log(jiadian[i].chu)
    }
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
    var jiadian = that.data.options
    jiadian[index].chu = jiadian[index].chu - 1
    if (jiadian[index].chu <= 0) {
      jiadian[index].chu = 0
    }
    that.setData({
      options: jiadian
    })
    for (var i = 0; i < jiadian.length; i++) {
      zongfen += jiadian[i].chu
      // console.log(jiadian[i].chu)
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
      xuanze: 1
    })
  },
  bindPickerChange2: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      diernali: e.detail.value,
      xuanze2: 1
    })
  },
  // 时间
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value,
      xuanze: 1
    })
  },
  jianda: function (e) {
    var that = this;
    console.log(e)
    that.data.write_daan = e.detail.value
  },
  tiankong: function (e) {
    var that = this;
    console.log(e)
    that.data.write_daan = e.detail.value
  },
  // 提交
  subm: function () {
    var that = this;
    console.log(1111)
    // 属性加点
    if (that.data.ti_type == 7) {
      if (that.data.shengqaun!=0){
        wx.showToast({
          title: '属性加点未全部分配',
          icon:'none'
        })
        return;
      }
      for(var i=0;i<that.data.options.length;i++){
        that.data.shuxing_con.push(that.data.options[i].chu)
      }
      var arr_duoxuan = that.data.shuxing_con.join(";");
      that.setData({
        write_daan: arr_duoxuan
      })
      // 单选
    } else if (that.data.ti_type == 1){
      var xiang=that.data.options
      xiang.forEach(function (element, index) {
        if (element.is_f == true) {
          that.setData({
            options: that.data.options,
            write_daan: that.data.zimu[index]
          })
        }
      });
      // 属性单选
    } else if (that.data.ti_type == 6) {
      var xiang = that.data.options
      var xiang2 = that.data.other_options
      xiang.forEach(function (element, index) {
        if (element.is_f == true) {
          that.setData({
            options: that.data.options,
            shu_dan: that.data.zimu[index]
          })
        }
      });
      xiang2.forEach(function (element, index) {
        if (element.is_f3 == true) {
          that.setData({
            other_options: that.data.other_options,
            shu_dan2: that.data.zimu[index]
          })
        }
      });
      that.setData({
        write_daan: that.data.shu_dan + '|' + that.data.shu_duo + '|' + that.data.shu_dan2
      })
      // 下拉
    } else if (that.data.ti_type == 3){
      if (that.data.opt_count==1){
        if (that.data.index!=''){
          that.setData({
            write_daan: that.data.xiala_options[that.data.index]
          })
        }else{
          console.log('为空')
        }
        
      } else if (that.data.opt_count == 2){
        if (that.data.select_type==1){
          console.log(that.data.diernali)
          if (that.data.diernali != '' && that.data.index!=''){
            that.setData({
              xiala: [that.data.xiala_options[that.data.index], that.data.xiala_options2[that.data.diernali]]
            })
            var xiala = that.data.xiala.join(";");
            console.log(xiala)
            that.setData({
              write_daan: xiala
            })
          }else{
            console.log('为空')
          }
         
        } else if (that.data.select_type == 2){
          that.setData({
            write_daan:that.data.date
          })
        } else if (that.data.select_type == 3) {
          console.log(that.data.one_id)
          console.log(that.data.class_id)
          console.log(that.data.class_one)
          if (that.data.one_id!=''){
            that.data.class_one.forEach(function (element, index) {
              // console.log(element)
              if (element.id == that.data.one_id) {
                // console.log(element.area_name)
                that.data.sub_sheng = element.area_name
              }
            })
            that.data.classerji.forEach(function (element, index) {
              if (element.id == that.data.class_id) {
                // console.log(element.area_name)
                that.data.sub_shi = element.area_name
              }
            })
            // console.log(that.data.multiArray)
            if (that.data.daan != '' && that.data.diqv_gaibian == 0) {
              that.setData({
                write_daan: that.data.daan
              })
            } else {
              that.setData({
                write_daan: that.data.sub_sheng + ';' + that.data.sub_shi
              })
            }
          }else{
            console.log('为空')
          }
        }
          
        
      }
    }
    wx.request({
      url: getApp().globalData.url + '/api.php/home/index/add_tiku_ques',
      data: {
        uid: wx.getStorageSync('uid'),
        question_id: that.data.question_id,
        ti_type: that.data.ti_type,
        answer: that.data.write_daan
      },
      success: res => {
        console.log(res)
        that.data.write_daan=''
        if (res.data.code == 1) {
          wx.showToast({
            title: '提交成功',
          })
        }else{
          wx.showToast({
            title: res.data.msg,
            icon:'none'
          })
        }
      }
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  xuanran: function () {
    var that = this;
    wx.request({
      url: getApp().globalData.url + '/api.php/home/index/get_cate_ques_all',
      data: {
        uid: wx.getStorageSync('uid'),
        cate_id: that.data.cate_id,
        sorts: that.data.sorts
      },
      success: res => {
        console.log(res)
        if (res.data.code == 1) {
          that.setData({
            before: res.data.data.before,
            ti_type: res.data.data.ti_type,
            total: res.data.data.total,
            ques_detail: res.data.data.ques_detail,
            question_id: res.data.data.ques_detail.id,
            options: res.data.data.ques_detail.options,
            
          })
          if (res.data.data.ti_type==7){
            that.setData({
              shengqaun: res.data.data.ques_detail.total_score,
              quanzhong: res.data.data.ques_detail.total_score
            })
          } else if (res.data.data.ti_type == 6){
            that.setData({
              other_options: res.data.data.ques_detail.options
            })
          } else if (res.data.data.ti_type == 3){
            that.setData({
              xiala_options: res.data.data.ques_detail.options_1,
              opt_count: res.data.data.ques_detail.opt_count,
              xiala_options2: res.data.data.ques_detail.options_2,
              select_type: res.data.data.ques_detail.select_type,
            })
            var classid=''
            if (that.data.select_type==3){
              
              var class_one = res.data.data.ques_detail.options
              var classArr = that.data.classone
              for (var i = 0; i < class_one.length; i++) {
                classArr.push(class_one[i].area_name)
              }
              that.setData({
                multiArray: [classArr, []],
                class_one,
                classArr
              })
              var classid = class_one[0].id
              if (classid) {
                that.erji(classid)
              }
            }
          }
          // 上一题下一题显示隐藏
          if (that.data.sorts == 1) {
            that.setData({
              prev_num: 0
            })
          } else {
            that.setData({
              prev_num: 1
            })
          }
          // 答案
          // console.log(res.data.data.answer)
          if (res.data.data.answer != null) {
            if (res.data.data.ti_type == 4 || res.data.data.ti_type == 5) {
              if (res.data.data.answer!=''){
                that.setData({
                  daan: res.data.data.answer,
                  write_daan: res.data.data.answer
                })
              }
              // 单选渲染
            } else if (res.data.data.ti_type == 1) {
              if (res.data.data.answer!=''){
                that.setData({
                  daan: res.data.data.answer,
                  write_daan: res.data.data.answer
                })
              }
              var danxuan = that.data.zimu.indexOf(that.data.daan)
              let completeStatus = that.data.options[danxuan].is_f;
              that.data.options[danxuan].is_f = !that.data.options[danxuan].is_f
              that.setData({
                options: that.data.options
              })
              // 多选渲染
            } else if (res.data.data.ti_type == 2) {
              if (res.data.data.answer!=''){
                that.setData({
                  daan: res.data.data.answer,
                  write_daan: res.data.data.answer
                })
                var duoxuan = that.data.daan.split(";");
                that.data.duoarr = that.data.duoarr.concat(duoxuan);
                console.log(that.data.duoarr)
                if (duoxuan.length >= 1) {
                  console.log(222)
                  for (var i = 0; i < duoxuan.length; i++) {
                    var danxuan = that.data.zimu.indexOf(duoxuan[i])

                    that.data.options[danxuan].is_f = !that.data.options[danxuan].is_f
                    that.setData({
                      options: that.data.options
                    })
                  }
                }
              }
            } else if (res.data.data.ti_type == 7) {
              that.setData({
                daan: res.data.data.answer,
                write_daan: res.data.data.answer
              })
              var duoxuan = that.data.daan.split(";");
              for (var i = 0; i < duoxuan.length; i++) {
                that.data.options[i].chu = duoxuan[i]
                that.setData({
                  options: that.data.options
                })
              }
              // 属性单选
            } else if (res.data.data.ti_type == 6) {
              that.setData({
                daan: res.data.data.answer,
                write_daan: res.data.data.answer
              })
              // console.log(that.data.daan.split('|'))
              var rrrrr = that.data.daan.split('|')
              var danxuan = that.data.zimu.indexOf(rrrrr[0])
              that.data.options[danxuan].is_f = !that.data.options[danxuan].is_f

              var danxuan2 = that.data.zimu.indexOf(rrrrr[2])
              that.data.other_options[danxuan2].is_f3 = !that.data.other_options[danxuan2].is_f3
              that.setData({
                options: that.data.options,
                other_options: that.data.other_options
              })
              var more_check = rrrrr[1]
              var duoxuan = more_check.split(";");
              for (var i = 0; i < duoxuan.length; i++) {
                var danxuan = that.data.zimu.indexOf(duoxuan[i])
                console.log(danxuan)
                that.data.options[danxuan].is_f2 = !that.data.options[danxuan].is_f2
                that.setData({
                  options: that.data.options
                })
              }
            } else if (res.data.data.ti_type == 3){
              if(that.data.opt_count==1){
                that.setData({
                  daan: res.data.data.answer,
                  xuanze: 1,
                  write_daan: res.data.data.answer
                })
                that.setData({
                  index: that.data.xiala_options.indexOf(that.data.daan)
                })
              }else{
                if (that.data.select_type==1){
                  that.setData({
                    daan: res.data.data.answer,
                    xuanze: 1,
                    xuanze2: 1,
                    write_daan: res.data.data.answer
                  })
                  
                  var duoxuan = that.data.daan.split(";");
                  that.setData({
                    index: that.data.xiala_options.indexOf(duoxuan[0]),
                    diernali: that.data.xiala_options2.indexOf(duoxuan[1]),
                  })
                } else if (that.data.select_type == 2) {
                  that.setData({
                    daan: res.data.data.answer,
                    xuanze: 1,
                    write_daan: res.data.data.answer
                  })
                  that.setData({
                    date: that.data.daan
                  })
                }else{
                  that.setData({
                    daan: res.data.data.answer,
                    xuanze: 1,
                    xuanze2: 1,
                    write_daan: res.data.data.answer
                  })
                  console.log(that.data.opt_xuanze)
                  console.log(that.data.daan)
                }
              }
            }
          }

        }
      }
    });
  },
  bindMultiPickerColumnChange: function (e) {
    //e.detail.column 改变的数组下标列, e.detail.value 改变对应列的值
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    this.data.diqv_gaibian=1
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex,
      opt_xuanze:1
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
    console.log(e.detail.value)
    var class_key = 0;
    var classList = this.data.classerji;

    var select_key = e.detail.value[1];
    if (select_key==null){
      select_key=0
    }
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
    // console.log(this.data.class_id)
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
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    that.setData({
      openids: wx.getStorageSync('openids')
    })
    console.log(that.data.openids)
    that.xuanran();
  },
  next: function () {
    var that = this;
    that.data.sorts = Number(that.data.sorts) + 1
    that.xuanran();
    if (that.data.sorts == that.data.total) {
      that.setData({
        next_num: 0,
        opt_xuanze:0
      })
    }
  },
  prev: function () {
    var that = this;
    that.data.sorts = Number(that.data.sorts) - 1
    that.xuanran()
    that.setData({
      next_num: 1,
      opt_xuanze:0
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