// pages/tuijian/tuijian.js
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    //推荐设置
    // 推荐图片数组的设置
    images: [],
    //刷新设置
    pageNum: 1,       // 设置加载的第几次，默认是第一次
    isFirstLoad: true,   // 用于判断List数组是不是空数组，默认true，空的数组
    hasMore: false,    // “加载更多”
  },
  // 下拉刷新
  onPullDownRefresh: function () {
    // 显示导航栏loading
    wx.showNavigationBarLoading();
    // 调用接口加载数据
    this.loadData();
    // 隐藏导航栏loading
    wx.hideNavigationBarLoading();
    // 当处理完数据刷新后，wx.stopPullDownRefresh可以停止当前页面的下拉刷新
    wx.stopPullDownRefresh();
  },
  // 上拉加载
  onReachBottom(e) {
    let that = this;
    if (that.data.hasMore) {
      that.setData({
        pageNum: that.data.pageNum + 1,  // 每次触发上拉事件，把pageNum+1
        isFirstLoad: false                // 触发到上拉事件，把isFirstLoad设为为false
      });

      that.loadData();
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //在这里实现前后端的交互和对接功能
    const requestTask = wx.request({
      //这个url是本机的IP地址 会出现不合法域名，在 >>这里设置忽略不校验合法域名
      url: 'http://192.168.111.1:8360/tuijiansql', //仅为示例，并非真实的接口地址
      data: {
        x: '',
        y: ''
      },
      header: {
        'content-type': 'application/json'
      },
      success: (res) => { //这边要用 res => 来记录历史
        console.log(res.data)
        this.setData({
          //src: '../../image/goo1.png',
          //src: res.data,
          images: res.data //返回数据
        })
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

  }
})