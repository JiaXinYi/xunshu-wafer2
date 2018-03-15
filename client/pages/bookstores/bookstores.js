// pages/bookstores/bookstores.js
//获取应用实例
const app = getApp()
var bookstoreData = require('../../json/bookstoreList.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookstoreList: [],
    bookstoreAddress: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var groupLen = bookstoreData.length;
    var Addresses = [];
    var Lists = [];
    for (var i = 0; i < groupLen; i++) {
      var data = bookstoreData[i];
      var bookstore = {
        title: data.title,
        description: data.description,
        url: data.url
      };
      var bookaddress = data.location;
      Addresses.push(bookaddress);
      Lists.push(bookstore);
    }
    // console.log(Lists);
    this.setData({
      bookstoreList: Lists,
      bookstoreAddress: Addresses
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

  }
})
