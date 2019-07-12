//index.js
//获取应用实例 最复杂的逻辑文件以及动态的交换效果
const app = getApp()
//const 是定义 app 为常量
Page({
  data: {//这里都是数据解析
    motto: '欢迎进入小程序!',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
 
  //事件处理函数
  //一旦触发，则立马跳转
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {//页面加载的调用
    //console.log(app.globalData.userInfo) //获取得到的数据在控制台输出
    if (app.globalData.userInfo) {
    // console.log(app.globalData.userInfo) //获取得到的数据在控制台输出
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
      //console.log(app.globalData.userInfo) //获取得到的数据在控制台输出
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
        //console.log(app.globalData.userInfo) //获取得到的数据在控制台输
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
   //console.log(app.globalData.userInfo) //获取得到的数据在控制台输出
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
