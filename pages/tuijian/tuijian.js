// pages/tuijian/tuijian.js
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    //推荐设置
    // 推荐图片数组的设置
    images: [
      {
        id: '1',
        src: '../../image/01.png',
        name: '照片01',
        data: '2017/11/1'
      }, {
        id: '2',
        src: '../../image/1.png',
        name: '照片02',
        data: '2017/11/2'
      }, {
        id: '3',
        src: '../../image/2.png',
        name: '照片03',
        data: '2017/11/3'
      }, {
        id: '4',
        src: '../../image/3.png',
        name: '照片04',
        data: '2017/11/4'
      }, {
        id: '5',
        src: '../../image/4.png',
        name: '照片05',
        data: '2017/11/5'
      }, {
        id: '6',
        src: '../../image/5.png',
        name: '照片06',
        data: '2017/11/6'
      }, {
        id: '7',
        src: '../../image/6.png',
        name: '照片07',
        data: '2017/11/7'
      }, {
        id: '8',
        src: '../../image/Camera.png',
        name: '照片08',
        data: '2017/11/8'
      }, {
        id: '9',
        src: '../../image/Hot.png',
        name: '照片09',
        data: '2017/11/9'
      }

    ],


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