//index.js
//获取应用实例
const app = getApp();
var util = require('../../utils/util.js'); 

Page({
  data: {
    motto: '',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    //获取用户信息，并将其放入全局变量name,num,school中
    wx.getStorage({
      key: 'UserName',
      //检测是否曾经登陆过该程序，如果有直接调转入主界面中
      success: function(res) {
        getApp().globalData.name = res.data
        getApp().globalData.num = wx.getStorageSync('UserId')
        getApp().globalData.school = wx.getStorageSync('UserSchool')
        wx.switchTab({
          url: '../index/index',
        })
      },
      fail:function() {

      }
    }) 
  
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  formSubmit:function(x) {
    //定义姓名，学号，学校
    var name = x.detail.value.name;
    var num = x.detail.value.num;
    var school = x.detail.value.school;
    var that = this;
    //姓名是否为空
    if (("" == util.trim(name)) || ("" == util.trim(num)) || (("" == util.trim(school)))) {
      util.isError("信息不能为空", that);
      return;
    } else {
      util.clearError(that);
    }

    //向数据库上传用户信息
    wx.request({
      url: 'http://172.18.159.50/register.php',
      data:{
        name:name,
        id:num,
        university:school
      },
      method: 'POST',
      header: { 'Content-Type': 'application/x-www-form-urlencoded' },
      success:function (res) {
        console.log(name);
        console.log(res.data);
        //将用户信息导入缓存
        wx.setStorageSync('UserName', name);
        wx.setStorageSync('UserId', num);
        wx.setStorageSync('UserSchool', school);
        getApp().globalData.name = name;
        getApp().globalData.num = num;
        getApp().globalData.school = school;

        wx.showModal({
          title: '注册状态',
          content: '注册成功，点击确认进入主页',
          success: function (res) {
            if (res.confirm) {
              // 点击确定后跳转登录页面并关闭当前页面  
              wx.switchTab({
                url: '../index/index'
              })
            }
          }
        })
      }
    })
    }
})
