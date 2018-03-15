// pages/booklists/booklists.js
//获取应用实例
const app = getApp()

var bookData = require("../../json/listdata.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: [],
    booklists: [],
    indicatorDots: true,
    autoplay: false,
    interval: 2000,
    duration: 1000
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var groupLen = bookData.listdata.length;
    var listdata = [];
    var listname = [];
    for (var i = 0; i < groupLen; i++) {
      var data = bookData.listdata[i];
      listdata.push(data.res.subjects);
      listname.push(data.res.payload.title);
    }
    console.log(listdata)
    this.setData({
      booklists: listdata,
      title: listname
    })
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
  getBooklists: function () {
    console.log(bookData.listdata);
  }
})