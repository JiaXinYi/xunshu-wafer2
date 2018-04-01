// pages/addBook/addBook.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')

Page({
  data: {
    focus: false,
    inputValue: '',
    openId:'',
    tbname:'',
    imgUrl:'../../imgs/logo.png'
  },
  onLoad: function (options) {
    this.setData({
      openId: options.openId,
      tbname:options.tbname
    })
    wx.setNavigationBarTitle({
      title: this.data.tbname == 'cBooklist' ? '添加我有的书' : '添加想要的书'//页面标题为路由参数
    })
  },
  bindButtonTap: function () {
    this.setData({
      focus: true
    })
  },
  bindKeyInput: function (e) {
    this.setData({
      inputValue: e.detail.value
    })
  },
  bindReplaceInput: function (e) {
    var value = e.detail.value
    var pos = e.detail.cursor
    if (pos != -1) {
      //光标在中间
      var left = e.detail.value.slice(0, pos)
      //计算光标的位置
      pos = left.replace(/11/g, '2').length
    }

    //直接返回对象，可以对输入进行过滤处理，同时可以控制光标的位置
    return {
      value: value.replace(/11/g, '2'),
      cursor: pos
    }

    //或者直接返回字符串,光标在最后边
    //return value.replace(/11/g,'2'),
  },
  // 上传图片接口
  doUpload: function () {
    var that = this

    // 选择图片
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        util.showBusy('正在上传')
        var filePath = res.tempFilePaths[0]

        // 上传图片
        wx.uploadFile({
          url: config.service.uploadUrl,
          filePath: filePath,
          name: 'file',

          success: function (res) {
            util.showSuccess('上传图片成功')
            console.log(res)
            res = JSON.parse(res.data)
            console.log(res)
            that.setData({
              imgUrl: res.data.imgUrl
            })
          },

          fail: function (e) {
            util.showModel('上传图片失败')
          }
        })

      },
      fail: function (e) {
        console.error(e)
      }
    })
  },
  // 提交数据
  formSubmit(e) {
    e.detail.value.tbname = this.data.tbname;
    e.detail.value.openId = this.data.openId;
    e.detail.value.imgUrl = this.data.imgUrl;
    console.log(e.detail.value);
    //判断是否为空--待做
    util.showBusy('请求中...')
    var that = this
    qcloud.request({
      url: `${config.service.host}/weapp/addbook`,
      login: true,
      data: e.detail.value,
      success(result) {
        util.showSuccess('请求成功完成')
        that.setData({
          requestResult: JSON.stringify(result.data)
        })
      },
      fail(error) {
        util.showModel('请求失败', error);
        console.log('request fail', error);
      }
    })
  }
})