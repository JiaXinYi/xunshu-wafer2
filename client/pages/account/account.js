// pages/account/account.js
// wafer2-client-sdk用法：https://cloud.tencent.com/document/product/619/11449
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasUserInfo: false,
    userInfo: {},
    logged: false,
    openId: '',
    bookTable: 'cBooklist',
    wantBookTable: 'cWantlist'

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '我的'
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
  login: function () {
    if (this.data.logged) return

    util.showBusy('正在登录')
    var that = this

    // 调用登录接口
    qcloud.login({
      success(result) {
        qcloud.request({
          url: config.service.requestUrl,
          login: true,
          success(result) {
            util.showSuccess('登录成功')
            that.setData({
              hasUserInfo: true,
              userInfo: result.data.data,
              logged: true,
              openId: result.data.data.openId
            })
            console.log(result.data.data.openId, result.data.data.nickName);
            let value = {
              openId: result.data.data.openId,
              nickName: result.data.data.nickName
            }
            qcloud.request({
              url:`${config.service.host}/weapp/adduser`,
              login:false,
              data:value,
              success(result){
                console.log(result.data.data);
              },
              fail(err){
                console.log(err);
              }

            })
            // console.log(result);
          },
          fail(error) {
            util.showModel('请求失败', error)
            console.log('request fail', error)
          }
        })
        // }
      },

      fail(error) {
        util.showModel('登录失败', error)
        console.log('登录失败', error)
      }
    })
  },
  showAddBook(event) {
    if (!!this.data.openId) {
      var Id = this.data.openId;
      var tbname = event.currentTarget.dataset.tbname;
      console.log(tbname, Id);
      wx.navigateTo({
        url: '../showAddBook/showAddBook?openId=' + Id + '&tbname=' + tbname
      })
    } else {
      util.showModel('未登录', '请先登录');
    }

  },
  showMessageList(event){
    if (!!this.data.openId) {
      var Id = this.data.openId;
      wx.navigateTo({
        url: '../msgList/msgList?openId=' + Id
      })
    } else {
      util.showModel('未登录', '请先登录');
    }
  }
})