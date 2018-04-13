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
    message: '',
    toView: ''
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
    if (value.fromId == "ogZMb5IsGSKJplkr2igp4Otc6_Kk" && value.toId == "ogZMb5DTIe6bCdW4ZmHXgMRkrc4s") {
      wx.setNavigationBarTitle({
        title: '最爱的宝宝',
      })
    } else if (value.fromId == "ogZMb5DTIe6bCdW4ZmHXgMRkrc4s" && value.toId == "ogZMb5IsGSKJplkr2igp4Otc6_Kk") {
      wx.setNavigationBarTitle({
        title: '最爱的宝贝',
      })
    } else {
      wx.setNavigationBarTitle({
        title: value.toId,
      })
    }

    that.setData({
      fromId: options.fromId,
      toId: options.toId
    })
    that.doLoadMsg(value);
    setTimeout(() => {
      that.doLoadMsg(value);
      // this.scrollToBottom();
    }, 1000);


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
  bindKeyInput(event) {
    this.setData({
      message: event.detail.value
    })
  },
  sendmsg() {
    //书籍拥有者的id
    var that = this
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
          that.doLoadMsg(value);
          that.setData({
            message: ''
          })
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
    } else {
      console.log('请输入信息')
    }

  },
  doLoadMsg(value) {
    var that = this
    qcloud.request({
      url: `${config.service.host}/weapp/mysendlist`,
      login: false,
      data: value,
      success(result) {
        console.log(result);
        let msg = result.data.data.msg;
        that.setData({
          msgData: msg,
          toView: 'msg-' + msg[msg.length - 1].id
        })

      },
      fail(err) {
        console.log(err);
      }
    })
  }
})