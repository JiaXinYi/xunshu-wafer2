// pages/msgDetail/msgDetail.js
var qcloud = require('../../vendor/wafer2-client-sdk/index.js')
var config = require('../../config.js')
var util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    fromId: '',
    toId: '',
    msgData: [],
    message: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    let value = {
      fromId: options.fromId,
      toId: options.toId
    }
    qcloud.request({
      url: `${config.service.host}/weapp/mysendlist`,
      login: false,
      data: value,
      success(result) {
        console.log(result);
        let msg = result.data.data.msg;
        that.setData({
          msgData: msg,
          fromId: options.fromId,
          toId: options.toId
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
  bindKeyInput(event){
    this.setData({
      message: event.detail.value
    })
  },
  sendmsg() {
    //书籍拥有者的id
    if (!!this.data.message) {
      var value = {
        toId: this.data.toId,
        fromId: this.data.fromId,
        message: this.data.message
      }
      qcloud.request({
        url: `${config.service.host}/weapp/sendmsg`,
        login: false,
        data: value,
        success(result) {
          console.log('发送成功');
          
          // qcloud.request({
          //   url: `${config.service.host}/weapp/readmsg`,
          //   login: false,
          //   data: value,
          //   success(result) {
          //     console.log(result);
          //   },
          //   fail(err) {
          //     console.log(err);

          //   }
          // })
        },
        fail(err) {
          console.log(err);
        }
      })
    }else{
      console.log('请输入信息')
    }

  }
})