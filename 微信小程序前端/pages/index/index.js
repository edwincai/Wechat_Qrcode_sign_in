      //index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },
  //事件处理函数
  bindViewTap: function() {
  },
  onLoad: function () {
    if (getApp().globalData.test == 0) {
    wx.redirectTo({
      url: '../register/register'
    })
    getApp().globalData.test = getApp().globalData.test + 1
    }
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
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  
  InitialSignIn : function() {
    wx.navigateTo({
      url:'ini'
  })

  },
  scan : function() {
    wx.scanCode({
      success: (res) => {
        console.log(res)

          var str = res.result;
          var arr = str.split("*");        
        
          wx.request({
            url: "http://172.18.159.50/participate.php",
            //str=”jpg|bmp | gif | ico | png”; arr = str.split(”|”);


            data: {

              FormID:arr[0],
              studentID:app.globalData.num,
              studentName:app.globalData.name,
              topic:arr[1],
            },

            method: "POST",

            header: {
              "Content-type": "application/x-www-form-urlencoded"
            },

            success: function (res) {
              wx.showToast({
                title: '签到成功',
                icon: 'none',
                duration: 2000
              })
              console.log(res);
              console.log("succ");
            },
            fail: function (res) {
              wx.showToast({
                title: '签到失败',
                icon: 'none',
                duration: 2000
              })
              console.log(this.record);
              console.log("failed");
            }
          });
      }
    })
  }
})
