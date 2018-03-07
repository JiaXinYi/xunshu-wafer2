// pages/account/account.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasUserInfo: false,
    userInfo: 'ddd'

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

  },
  login: function () {
    var that = this;
    wx.showToast({
      title: '正在登录...',
      icon: 'loading',
      duration: 10000
    });
    wx.login({
      success: function (res) {
        // if(res.code){
        //   wx.request({
        //     url: '',
        //     data:{
        //       code:res.code
        //     }
        //   })
        // }
        wx.getUserInfo({
          success: function (res) {
            console.log(res.userInfo);
            
            that.setData({
              userInfo: res.userInfo,
              hasUserInfo: true
            })
            wx.hideToast();
          }
        })
      }

    })
  }
})