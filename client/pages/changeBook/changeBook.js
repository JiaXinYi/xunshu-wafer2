var qcloud = require('../../vendor/wafer2-client-sdk/index.js')
var config = require('../../config.js')
var util = require('../../utils/util.js')

// pages/changeBook/changeBook.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    booklist: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var list = JSON.parse(options.booklist);
    var len = list.length;
    var targetlist = [];
    for(var i = 0;i<len;i++){
      targetlist[i] = JSON.parse(list[i].book_info);
      targetlist[i].openId = list[i].open_id;
    }
    console.log(targetlist);
    this.setData({
      booklist: targetlist
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
  changeBook(event){
      var openId= event.currentTarget.dataset.openid;
      //注意是小写
      console.log(openId);
      if(!!openId){
        wx.showModal({
          title: '是否要和对方交换？',
          content: openId,
        })
      }
  }
})