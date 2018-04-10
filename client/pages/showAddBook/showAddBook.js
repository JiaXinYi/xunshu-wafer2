// pages/showAddBook/showAddBook.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    openId: '',
    tbname: '',
    booklist: {},
    requestResult: '',
    indicatorDots: true,
    autoplay: false,
    interval: 2000,
    duration: 1000,
    bookimg: 'https://img3.doubanio.com/lpic/s29376146.jpg'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    this.setData({
      openId: options.openId,
      tbname: options.tbname
    });
    wx.setNavigationBarTitle({
      title: this.data.tbname == 'cBooklist' ? '我的书籍' : '愿望书单'
    })
    var value = {
      openId: options.openId,
      tbname: options.tbname
    }
    // console.log(value);
    qcloud.request({
      url: `${config.service.host}/weapp/showbook`,
      login: true,
      data: value,
      success(result) {
        // util.showSuccess('请求成功完成')
        // console.log(result);
        var len = result.data.data.length;
        var list = [];
        for (var i = 0; i < len; i++) {
          list.push(JSON.parse(result.data.data[i].book_info));
        }
        // console.log(list);
        that.setData({
          booklist: list,
          requestResult: JSON.stringify(result.data)
        })
      },
      fail(error) {
        util.showModel('请求失败', error);
        console.log('request fail', error);
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
    var that = this
    var value = {
      openId: this.data.openId,
      tbname: this.data.tbname
    }
    qcloud.request({
      url: `${config.service.host}/weapp/showbook`,
      login: true,
      data: value,
      success(result) {
        // util.showSuccess('请求成功完成')
        // console.log(result);
        var len = result.data.data.length;
        var list = [];
        for (var i = 0; i < len; i++) {
          list.push(JSON.parse(result.data.data[i].book_info));
        }
        that.setData({
          booklist: list,
          requestResult: JSON.stringify(result.data)
        })
      },
      fail(error) {
        util.showModel('请求失败', error);
        console.log('request fail', error);
      }
    })
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
  showAddBook(event) {
    var Id = this.data.openId;
    var tbname = this.data.tbname;
    wx.navigateTo({
      url: '../addBook/addBook?openId=' + Id + '&tbname=' + tbname
    })
  },
  changeBook(event) {
    var that = this
    var bookname = event.currentTarget.dataset.bookname;
    var value = {
      bookname: bookname
    }
    qcloud.request({
      url: `${config.service.host}/weapp/selectbook`,
      login: false,
      data: value,
      success(result) {
        var booklist = result.data.data;
        var targetlist = [];
        var len = result.data.data.length;
        if (!!len) {
          for (var i = 0; i < len; i++) {
            //筛选掉自己发布的
            if (booklist.open_id !== that.data.openId) {
              targetlist.push(booklist[i]);
            }
          }
          if (!!targetlist.length) {
            // console.log(JSON.stringify(targetlist));
            wx.navigateTo({
              url: '../changeBook/changeBook?booklist=' + JSON.stringify(targetlist) +'&openId=' + that.data.openId,
            })
          } else {
            util.showModel('请求成功', '但是没有能匹配的书籍');
          }
        } else {
          util.showModel('请求成功', '但是没有能匹配的书籍');
        }
      },
      fail(error) {
        util.showModel('请求失败', error);
        console.log('request error', error);
      }

    })
  }
})