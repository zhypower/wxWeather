Page({

  /**
   * 页面的初始数据
   */
  data: {
    weathers: null,
    logosrc: "../assets/rain.png",
    weatherFuture:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    that.getLocation();
    that.getDates();

  },
  getDates: function() {
    var date = new Date();
    this.setData({
      myYears: date.getFullYear(),
      myMonths: date.getMonth() + 1,
      myDates: date.getDate(),
      myDays: date.getDay(),
      myUpdatetime: date.getHours() + ":" + date.getMinutes()
    })

  },
  getLocation: function() {
    var that = this
    wx.getLocation({
      type: 'wgs84',
      success: function(res) {
        var latitude = res.latitude
        var longitude = res.longitude
        console.log("lat:" + latitude + " lon:" + longitude);
        that.getCity(latitude, longitude);
      }
    })
  },

  //获取城市信息
  getCity: function(latitude, longitude) {
    var that = this
    var url = "https://api.map.baidu.com/geocoder/v2/";
    var params = {
      ak: "ASAT5N3tnHIa4APW0SNPeXN5",
      location: latitude + "," + longitude,
      output: "json",
      pois: 0
    }
    wx.request({
      url: url,
      data: params,
      success: function(res) {
        console.log(res.data);
        var city = res.data.result.addressComponent.city;
        var district = res.data.result.addressComponent.district;
        var street = res.data.result.addressComponent.street;
        that.setData({
          city: city,
          district: district,
          street: street,
        })
        var descCity = city.substring(0, city.length - 1);
        that.getWeahterNow(descCity);
        that.getWeahterFuture(descCity);
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  //获取天气信息
  // getWeahter: function(city) {
  //   var that = this
  //   var url = "https://free-api.heweather.com/v5/weather"
  //   var params = {
  //     city: city,
  //     key: "894fc2a749104d679fa022c3e71afe83"
  //   }
  //   wx.request({
  //     url: url,
  //     data: params,
  //     success: function(res) {
  //       console.log(res.data.HeWeather5[0])
  //       that.setData({
  //         weathers: res.data.HeWeather5[0]
  //       })
  //       if (res.data.HeWeather5[0].now.cond.txt=="阴"){
  //         that.setData({
  //           logosrc: "../assets/yin.png"
  //         })
  //       }
  //       if (res.data.HeWeather5[0].now.cond.txt == "小雨") {
  //         that.setData({
  //           logosrc: "../assets/rain.png"
  //         })
  //       }
  //       if (res.data.HeWeather5[0].now.cond.txt == "晴") {
  //         that.setData({
  //           logosrc: "../assets/qing.png"
  //         })
  //       }
  //       if (res.data.HeWeather5[0].now.cond.txt == "晴转多云") {
  //         that.setData({
  //           logosrc: "../assets/qzdy.png"
  //         })
  //       }
  //     },
  //     fail: function(res) {},
  //     complete: function(res) {},
  //   })
  // },

  getWeahterNow: function (city) {
    var that = this
    var url = "https://free-api.heweather.com/s6/weather/now?location=" + city + "&key=cc33b9a52d6e48de852477798980b76e"
    var params = {
      city: city,
      key: "cc33b9a52d6e48de852477798980b76e"
    }
    wx.request({
      url: url,
      data: params,
      success: function (res) {
        console.log(res.data.HeWeather6[0])
        that.setData({
          weathers: res.data.HeWeather6[0]
        })
        if (res.data.HeWeather6[0].now.cond_txt == "阴") {
          that.setData({
            logosrc: "../assets/yin.png"
          })
        }
        if (res.data.HeWeather6[0].now.cond_txt == "小雨") {
          that.setData({
            logosrc: "../assets/rain.png"
          })
        }
        if (res.data.HeWeather6[0].now.cond_txt == "晴") {
          that.setData({
            logosrc: "../assets/qing.png"
          })
        }
        if (res.data.HeWeather6[0].now.cond_txt == "晴转多云") {
          that.setData({
            logosrc: "../assets/qzdy.png"
          })
        }
        if (res.data.HeWeather6[0].now.cond_txt == "多云") {
          that.setData({
            logosrc: "../assets/dy.png"
          })
        }
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },




  getWeahterFuture: function (city) {
    var that = this
    var url = "https://free-api.heweather.com/s6/weather/forecast?location=" + city + "&key=cc33b9a52d6e48de852477798980b76e"
    var params = {
      city: city,
      key: "cc33b9a52d6e48de852477798980b76e"
    }
    wx.request({
      url: url,
      data: params,
      success: function (res) {
        console.log(res.data.HeWeather6[0])
        that.setData({
          weatherFuture: res.data.HeWeather6[0].daily_forecast
        })
        
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    this.getLocation();
    this.getDates();

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})