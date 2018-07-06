// pages/Message_2Form/Message_2Form.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list : ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
  InitialFind: function (e) {
    this.getConnectToDB();
    wx.switchTab({
      url: '../Message_1Form/Message_1Form'
    })
  },

  //查看已签到
  Sign_inFind: function (e) {
    wx.switchTab({
      url: '../Message_2Form/Message_2Form'
    })
  },

  getConnectToDB : function () {
    var that = this;
    wx.request({
      url: 'http://172.18.159.50/lookparticipate.php',
      method: 'POST',
      data: {
        studentID: getApp().globalData.num,
        studentName :getApp().globalData.name
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success : function(res) {
        console.log(res.data)
        var list = new Array();
        list = res.data;
        that.setData({
          list: list
        })
      },
      
    })
  }
})
