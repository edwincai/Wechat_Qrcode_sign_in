// This is our App Service.
// This is our data
// Register a Page.
var app = getApp()
Page({
  data: {
    imgalist: [/*二维码地址*/],
    tempFilePaths: app.globalData.url
  },
  /**   
   * 预览图片  
   */
  previewImage:function (e) {
    var current = e.target.dataset.src;
    wx.previewImage({
      current: current, // 当前显示图片的http链接  
      urls: this.data.imgalist // 需要预览的图片http链接列表  
    })
  },    

  onLoad: function (option) {
    //console.log(option.query)
    this.setData({
      tempFilePaths: app.globalData.url
    })
  }

})