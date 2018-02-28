var app = getApp();
var bmap = require('../../libs/bmap-wx/bmap-wx.min.js');
var wxMarkerData = [];  //定位成功回调对象  
Page({
  data: {
    ak: "6eQIBOGeEr90jvkCgeAl14VZTW9WU2Kf",
    markers: [],
    longitude: '',
    latitude: '',
    address: '',
    cityInfo: {}
  },
  onLoad: function (options) {
    var that = this;
    var BMap = new bmap.BMapWX({
      ak: that.data.ak
    });
    var fail = function (data) {
      console.log(data);
    };
    var success = function (data) {
      console.log(data);
      wxMarkerData = data.wxMarkerData;
      console.log(wxMarkerData);
      that.setData({
        markers: wxMarkerData,
        latitude: wxMarkerData[0].latitude,
        longitude: wxMarkerData[0].longitude,
        address: wxMarkerData[0].address,
        cityInfo: data.originalData.result.addressComponent
      });
    }
    // 发起regeocoding检索请求   
    BMap.regeocoding({
      fail: fail,
      success: success
    });
  },
})