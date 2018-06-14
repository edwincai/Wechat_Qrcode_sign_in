// pages/sign_in/sign_in.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    studentNum:"",
    userName:""
  },
  
  formSubmit:function(e){
    wx.request({

      url: 'https://127.0.0.1/test.php',
      data: {
        studentID: e.detail.value.studentID,
        userName: e.detail.value.userName
      },
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"  
      },
      success: function (res) {
        console.log(e.detail.value.studentID);
        console.log(res.data)
      }
    })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
  
  }
})