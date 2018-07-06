// pages/Message_1Form/Message_1Form.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    delBtnWidth: 180,//删除按钮宽度单位（rpx）
    turn_to_detial : true,
    str : "",
    arr :""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initEleWidth();
    this.getConnectToDB();
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
  
  },


  /*************************************************************************** */
  /******************************************************************************* */
  /********************************************************************************** */
  touchS: function (e) {
    if (e.touches.length == 1) {
      this.setData({
        //设置触摸起始点水平方向位置
        startX: e.touches[0].clientX
      });
    }
  },
  touchM: function (e) {
    if (e.touches.length == 1) {
      //手指移动时水平方向位置
      var moveX = e.touches[0].clientX;
      //手指起始点位置与移动期间的差值
      var disX = this.data.startX - moveX;
      var delBtnWidth = this.data.delBtnWidth;
      var txtStyle = "";
      if (disX == 0 || disX < 0) {//如果移动距离小于等于0，文本层位置不变
        txtStyle = "left:0px";
      } else if (disX > 0) {//移动距离大于0，文本层left值等于手指移动距离
        txtStyle = "left:-" + disX + "px";
        if (disX >= delBtnWidth) {
          //控制手指移动距离最大值为删除按钮的宽度
          txtStyle = "left:-" + delBtnWidth * 2 + "px";
        }
      }
      //获取手指触摸的是哪一项
      var index = e.target.dataset.index;
      var list = this.data.list;
      list[index].txtStyle = txtStyle;
      //更新列表的状态
      this.setData({
        list: list
      });
    }
  },

  touchE: function (e) {
    if (e.changedTouches.length == 1) {
      //手指移动结束后水平位置
      var endX = e.changedTouches[0].clientX;
      //触摸开始与结束，手指移动的距离
      var disX = this.data.startX - endX;
      var delBtnWidth = this.data.delBtnWidth;
      //如果距离小于删除按钮的1/2，不显示删除按钮
      var txtStyle = disX > delBtnWidth / 2 ? "left:-" + delBtnWidth * 2 + "px" : "left:0px";
      //获取手指触摸的是哪一项
      var index = e.target.dataset.index;
      var list = this.data.list;
      list[index].txtStyle = txtStyle;
      //更新列表的状态
      this.setData({
        list: list,
      });
    }
  },
  //获取元素自适应后的实际宽度
  getEleWidth: function (w) {
    var real = 0;
    try {
      var res = wx.getSystemInfoSync().windowWidth;
      var scale = (750 / 2) / (w / 2);//以宽度750px设计稿做宽度的自适应
      // console.log(scale);
      real = Math.floor(res / scale);
      return real;
    } catch (e) {
      return false;
      // Do something when catch error
    }
  },
  initEleWidth: function () {
    var delBtnWidth = this.getEleWidth(this.data.delBtnWidth);
    this.setData({
      delBtnWidth: delBtnWidth
    });
  },
  //点击删除按钮事件
  DeleteItem: function (e) {
    //获取列表中要删除项的下标
    var index = e.target.dataset.index;
    var list = this.data.list;

    console.log(list[index].FormID);
    //移除列表中下标为index的项
    //list.splice(index, 1);
    //更新列表的状态
    wx.request({
      url: 'http://172.18.159.50/delete.php',
      data : {
        FormID: list[index].FormID,
      },
      method : 'POST',
      header : {
        "Content-Type": "application/x-www-form-urlencoded"
      },

      success : function(res) {
        //that.record = res.data;
        console.log(res.data);
      }
    })
    this.data.turn_to_detial = false;
    this.setData({
      list: list
    });
    this.getConnectDB();
  },
 
  //获取数据
  getConnectToDB: function() {
    var that = this;
    wx.request({
      url: 'http://172.18.159.50/lookup.php',
      //url: 'http://127.0.0.1/phpmyadmin/test/find.php',
      method: 'POST',
      data: {
        FormerID: getApp().globalData.num + getApp().globalData.name
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        console.log(res.data)
        var list = new Array();
        list = res.data;
        for(var i = 0; i < list.length; i++) {
          list[i].txtStyle = "";
          list[i].txt = list[i].topic;
          var timestamp = Date.parse(new Date());
          var date = new Date(timestamp);
          var nowtime = date.getFullYear() + '/' + date.getUTCMonth() + '/' + date.getDay() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
          if(list[i].endTime > nowtime) {
            list[i].IfEnd = "end",
              list[i].state = "进行中"
          }
          else {
            list[i].IfEnd = "ongoing"
            list[i].state = "已结束"
          }
        }
        console.log(nowtime)
        that.setData({
          list: list
        });
      }
      /*
      success: function (res) {
        console.log(res.data)
        that.setData({arr : res.data.split(" ")});
        var list = new Array();
        for (var i = 0; i < that.data.arr.length - 4; i = i + 4) {
          var ob = {
            txtStyle : "",
            IfEnd: that.data.arr[i],

            txt: that.data.arr[i + 1],

            state: that.data.arr[i + 2],

            FormID : that.data.arr[i+3]

          };
          list.push(ob);
          that.setData({
            list: list
          });
        }
  },*/

    })
  },
  

  //查看已发起
  InitialFind:function(e) {
    this.getConnectToDB();
    wx.switchTab({
      url: '../Message_1Form/Message_1Form'
    })
  },

  //查看已签到
  Sign_inFind:function(e) {
    wx.switchTab({
      url: '../Message_2Form/Message_2Form'
    })
  },

  //获取已发起签到的签到名单
  GetDetialMessage:function(e) {
    var index = e.target.dataset.index;
    var list = this.data.list;
    var key = list[index].FormID;
    console.log(key)
    if (this.data.turn_to_detial == true) {
      wx.navigateTo({
        url: "../Detial_Message/Detial_Message?detail=" + key
        
      })
    }
    this.data.turn_to_detial = true
  },

  //导出
  ExportItem:function(e) {
    /******** */
  }
  
})
