//app.js
//app.js文件管理整个程序的生命周期
App({ //App函数，调用这个函数。所有对象用大括号括起来
  onLaunch: function () {//onLanuch小程序的入口，相当于key
                //函数
    // 展示本地存储能力
    console.log('App Launch') //自己写的
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录接口
    wx.login({ //wx 接口 login接口
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息接口
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              //globaData存储小程序的所有信息

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  onShow: function (){
    console.log('App Show')
  },
  onHide: function (){
    console.log('App Hide')

  },
  globalData: {
    userInfo: null
  }
})