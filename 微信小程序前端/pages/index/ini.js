// pages/ini/ini.js
var util = require('../../utils/util.js');  
var status = true;
var inputTopic = "";
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    test:"",
    logs: [],
    topic: "",
    inputTopic: "a",
    inputActivity:"",
    inputTime:"12:00",
    time:"",
    stime:"",
    endtime:"",
    show: "",
    show1:"",
    show2:"?",
    src:"",
    status: status,
    tempFilePaths: 'http://qr.liantu.com/api.php?text=a',
    imgwidth: 0,
    imgheight: 0,
    temp: app.globalData.inner,
    formID:"",
    formerID:"",
    num: app.globalData.num,
    name: app.globalData.name,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //this.getdata();
    //setData({
    //  temp : app.globalData.inner
    //})
    //app.global.Data.inner = inputTopic
    var stime = util.formatTime(new Date());  
    this.setData({
      stime: stime
    });
    console.log(stime);
  },

  bindTimeChange: function (e) {
    this.endtime = e.detail.value;
    this.setData({
      inputTime: e.detail.value,
      endtime: e.detail.value,
    })
    //console.log(this.endtime);
    //console.log(e.detail.value);
  },
  bindInput_1: function(e) {
    this.inputTopic = e.detail.value;
    this.setData({
      inputTopic: e.detail.value,
    })
  },
  bindInput_2: function (e) {
    this.inputActivity = e.detail.value;
    this.setData({
      inputActivity: e.detail.value
    })
  },
  formSubmit: function(e) {
    if (e.detail.value.topic.length==0&&e.detail.value.endtime.length==0) {
      wx.showToast({
        title: '签到主题和结束时间不能为空',
        icon: 'none',
        duration: 2000
      })
    }
    else if(e.detail.value.topic.length==0) {
      wx.showToast({
        title: '签到主题不能为空',
        icon: 'none',
        duration: 2000
      })   
    }
    else if (e.detail.value.endtime.length == 0) {
      wx.showToast({
        title: '结束时间不能为空',
        icon: 'none',
        duration: 2000
      })
    }
    else {
      var that = this;
      var a = "http://qr.liantu.com/api.php?text=";
      var t1 = e.detail.value.topic + e.detail.value.endtime;
      var t2 = a + t1 + "*" + e.detail.value.topic;
      this.tempFilePaths = t2;
      this.formID = t1;
      this.setData({
        tempFilePaths: t2,
        formID: t1,
      });
      app.globalData.inner = e.detail.value.topic;
      app.globalData.url = this.tempFilePaths;
      console.log(app.globalData.url);
      console.log(app.globalData.inner);
      console.log(that.tempFilePaths);

      console.log(this.formID);
      console.log(this.endtime);


      //提交数据
      
      wx.request({
        url:"http://172.18.159.50/launchsignin.php",

        data:{
          topic:this.data.inputTopic,
          startTime:this.data.stime,
          endTime:this.data.endtime,
          content:this.data.inputActivity,
          FormerID: app.globalData.num +  app.globalData.name,//学号和姓名标识一个用户
          FormID: e.detail.value.topic + e.detail.value.endtime,//话题和时间标识一次发起签到
        },

        method:"POST",

        header:{
          "Content-type":"application/x-www-form-urlencoded"
        },

        success:function(res) {
            //console.log(res.data);
            console.log("succ");
        },
        fail:function(res) {
          //console.log(this.record);
          console.log("failed");
        }
      });

      wx.navigateTo({
        url: 'next'
      }) 
    }

    //wx.navigateTo({
    //  url: 'next'
    //}) 
  },

  toastHide: function (event) {
    status = true
    this.setData({ status: status })
  },

})