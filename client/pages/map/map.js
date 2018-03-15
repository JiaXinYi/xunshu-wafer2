var app = getApp();
var bmap = require('../../libs/bmap-wx/bmap-wx.min.js');
var wxMarkerData = [];  //定位成功回调对象  
var bookstoreData = require('../../json/bookstoreList.js')

Page({
  data: {
    ak: "6eQIBOGeEr90jvkCgeAl14VZTW9WU2Kf",
    markers: [],
    longitude: '',
    latitude: '',
    address: '',
    cityInfo: {},
    bookstoreAddress: []
  },
  onLoad: function (options) {
    var that = this;
    var groupLen = bookstoreData.length;
    var Addresses = [];
    var count = 0;
    for (var i = 0; i < groupLen; i++) {
      var data = bookstoreData[i];
      var bookaddress = data.location;
      console.log(bookaddress);
      for (var index = 0; index < bookaddress.length; index++) {
        var lng = bookaddress[index].location.lng;
        var lat = bookaddress[index].location.lat;
        var name = bookaddress[index].name;
        //坐标是百度坐标，要纠偏
        Addresses.push({
          id: count++,
          longitude: lng,
          latitude: lat,
          iconPath: undefined,
          title: name
        });
      }
    }
    var BMap = new bmap.BMapWX({
      ak: that.data.ak
    });
    var fail = function (data) {
      console.log(data);
    };
    var success = function (data) {
      console.log(data);
      wxMarkerData = data.wxMarkerData;
      that.setData({
        markers: Addresses,
        latitude: wxMarkerData[0].latitude,
        longitude: wxMarkerData[0].longitude,
        address: wxMarkerData[0].address,
        cityInfo: data.originalData.result.addressComponent,
        bookstoreAddress: Addresses
      });
    }
    // 发起regeocoding检索请求   
    BMap.regeocoding({
      fail: fail,
      success: success
    });

  },
  markertap(e) {
    console.log(e.markerId)
  },
})