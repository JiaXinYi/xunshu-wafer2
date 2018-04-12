// pages/msgList/msgList.js
var qcloud = require('../../vendor/wafer2-client-sdk/index.js')
var config = require('../../config.js')
var util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    openId: '',
    msgData: [],
    personData: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var fromId = options.openId;
    this.setData({
      openId: fromId
    })
    wx.setNavigationBarTitle({
      title: '消息列表',
    })
    var value = {
      fromId: fromId
    }
    qcloud.request({
      url: `${config.service.host}/weapp/myrecivelist`,
      login: false,
      data: value,
      success(result) {
        console.log(result);
        let data = result.data.data;
        that.setData({
          personData: data
        })
      },
      fail(err) {
        console.log(err);

      }
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
  sendmsg(event) {
    wx.navigateTo({
      url: '../msgDetail/msgDetail?fromId=' + this.data.openId + '&toId=' + event.currentTarget.dataset.id
    })
  }
})