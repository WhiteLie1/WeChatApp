// pages/gouwuche/gouwuche.js
// 默认请求第一页
var numbers = 1;
var bool = true;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageNum: 1,       // 设置加载的第几次，默认是第一次
    isFirstLoad: true,   // 用于判断List数组是不是空数组，默认true，空的数组
    hasMore: false,    // “加载更多”

    //购物车页面的显示
    show_edit: "block",
    edit_name: "编辑",
    edit_show: "none",
    // list: [],               // 购物车列表
    // hasList: false,          // 列表是否有数据
    // 默认展示数据
    hasList: true,
    // 商品列表数据
    list: [{
      id: 1,
      title: 'Real Techniques修容化妆刷套装 初学者定妆高光阴影人气美妆工具',
      image: '../../image/XiuRongTaoZhuang.png',
      pro_name: "30ml",
      num: 1,
      price: 180,
      selected: true
    },
    {
      id: 2,
      title: '泰国美妆蛋抖音爆款干湿两用葫芦美妆蛋化妆海绵粉扑水滴化妆蛋软 ',
      image: '../../image/MeiZhuangDan.png',
      pro_name: "25g",
      num: 1,
      price: 62,
      selected: true
    },
    {
      id: 2,
      title: '小包总的美妆店 三月兔化妆刷套装 腮红刷散粉刷眼影刷10支装礼盒',
      image: '../../image/MeiBao.png',
      pro_name: "75ml",
      num: 1,
      price: 175,
      selected: true
    }
    ],
    // 金额
    totalPrice: 0, // 总价，初始为0
    // 全选状态
    selectAllStatus: true, // 全选状态，默认全选

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

    //购物车功能的实现
    
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
    wx.showToast({
      title: '加载中',
      icon:'loading',
      duration:1000
    })
    //价格方法
    this.count_price();
  },

  selectList(e) {
    var that = this;
    // 获取选中的radio索引
    var index = e.currentTarget.dataset.index;
    // 获取到商品列表数据
    var list = that.data.list;
    // 默认全选
    that.data.selectAllStatus = true;
    // 循环数组数据，判断----选中/未选中[selected]
    list[index].selected = !list[index].selected;
    // 如果数组数据全部为selected[true],全选
    for (var i = list.length - 1; i >= 0; i--) {
      if (!list[i].selected) {
        that.data.selectAllStatus = false;
        break;
      }
    }
    // 重新渲染数据
    that.setData({
      list: list,
      selectAllStatus: that.data.selectAllStatus
    })
    // 调用计算金额方法
    that.count_price();
  },
  // 编辑
  btn_edit: function () {
    var that = this;
    if (bool) {
      that.setData({
        edit_show: "block",
        edit_name: "取消",
        show_edit: "none"
      })
      bool = false;
    } else {
      that.setData({
        edit_show: "none",
        edit_name: "编辑",
        show_edit: "block"
      })
      bool = true;
    }

  },
  // 删除
  deletes: function (e) {
    var that = this;
    // 获取索引
    const index = e.currentTarget.dataset.index;
    // 获取商品列表数据
    let list = this.data.list;
    wx.showModal({
      title: '提示',
      content: '确认删除吗',
      success: function (res) {
        if (res.confirm) {
          // 删除索引从1
          list.splice(index, 1);
          // 页面渲染数据
          that.setData({
            list: list
          });
          // 如果数据为空
          if (!list.length) {
            that.setData({
              hasList: false
            });
          } else {
            // 调用金额渲染数据
            that.count_price();
          }
        } else {
          console.log(res);
        }
      },
      fail: function (res) {
        console.log(res);
      }
    })
  },
  /**
     * 购物车全选事件
     */
  selectAll(e) {
    // 全选ICON默认选中
    let selectAllStatus = this.data.selectAllStatus;
    // true  -----   false
    selectAllStatus = !selectAllStatus;
    // 获取商品数据
    let list = this.data.list;
    // 循环遍历判断列表中的数据是否选中
    for (let i = 0; i < list.length; i++) {
      list[i].selected = selectAllStatus;
    }
    // 页面重新渲染
    this.setData({
      selectAllStatus: selectAllStatus,
      list: list
    });
    // 计算金额方法
    this.count_price();
  },

  /**
   * 绑定加数量事件
   */
  btn_add(e) {
    // 获取点击的索引
    const index = e.currentTarget.dataset.index;
    // 获取商品数据
    let list = this.data.list;
    // 获取商品数量
    let num = list[index].num;
    // 点击递增
    num = num + 1;
    list[index].num = num;
    // 重新渲染 ---显示新的数量
    this.setData({
      list: list
    });
    // 计算金额方法
    this.count_price();
  },
  canvas: function (object) {
    let _this = this;
    let realWidth, realHeight;
    //创建节点选择器
    var query = wx.createSelectorQuery();
    //选择id
    query.select('#mycanvas').boundingClientRect()
    query.exec(function (res) {
      //res就是 该元素的信息 数组
      realWidth = res[0].width;
      realHeight = res[0].height;
      console.log('realHeight', realHeight);
      console.log('realWidth', realWidth);
      const ctx = wx.createCanvasContext('mycanvas');
      ctx.drawImage("../../images/ctx-bg.jpg", 0, 0, realWidth, realHeight);
      ctx.drawImage(_this.data.canvasUserPic, (realWidth * 0.099), (realHeight * 0.052), (realWidth * 0.091), (realWidth * 0.091));
      ctx.setFontSize(12);
      ctx.setFillStyle("#a38874");
      ctx.fillText(object.date, (realWidth * 0.201), (realHeight * 0.076));
      ctx.setFontSize(14);
      ctx.setFillStyle("#a38874");
      ctx.fillText("农历" + object.lunar, (realWidth * 0.201), (realHeight * 0.099));
      ctx.drawImage("../../images/swiper-bg.png", (realWidth * 0.099), (realHeight * 0.112), (realWidth * 0.8), (realHeight * 0.60));
      ctx.drawImage(_this.data.canvasShowImg, (realWidth * 0.099), (realHeight * 0.112), (realWidth * 0.8), (realHeight * 0.30));
      ctx.drawImage("../../images/swiper-detail.png", (realWidth * 0.099), (realHeight * 0.395), (realWidth * 0.8), (realHeight * 0.03));
      ctx.setFontSize(16);
      ctx.setFillStyle("#8d7665");

      ctx.setTextAlign('center')
      ctx.fillText(object.title1, realWidth / 2, _this.calculateWH(2, 620, realWidth, realHeight));
      ctx.fillText(object.title2, realWidth / 2, _this.calculateWH(2, 666, realWidth, realHeight));

      ctx.drawImage("../../images/swiper-line.png", (realWidth - realWidth * 0.71) / 2, (realHeight * 0.528), (realWidth * 0.71), (realHeight * 0.0195));
      ctx.drawImage("../../images/luckpic.png", _this.calculateWH(1, 267, realWidth, realHeight), _this.calculateWH(2, 763, realWidth, realHeight), _this.calculateWH(1, 204, realWidth, realHeight), _this.calculateWH(2, 60, realWidth, realHeight));
      ctx.setFontSize(12);
      ctx.fillText(object.luck_title, realWidth / 2, _this.calculateWH(2, 880, realWidth, realHeight));
      ctx.drawImage("../../images/code.jpg", _this.calculateWH(1, 229, realWidth, realHeight), _this.calculateWH(2, 989, realWidth, realHeight), _this.calculateWH(1, 292, realWidth, realHeight), _this.calculateWH(1, 292, realWidth, realHeight))
      ctx.draw();

      setTimeout(function () {
        wx.canvasToTempFilePath({
          canvasId: 'mycanvas',
          success: function (res) {
            var tempFilePath = res.tempFilePath;
            _this.setData({
              canvasUrl: tempFilePath
            })
            if (tempFilePath !== '') {
              _this.setData({
                isShowCav: false
              });
              wx.hideLoading();
              wx.previewImage({
                current: _this.data.canvasUrl, // 当前显示图片的http链接  
                urls: [_this.data.canvasUrl], // 需要预览的图片http链接列表  
              })
            }
          },
          fail: function (res) {
            console.log(res);
          }
        });
      }, 500);
    })
  },//下载图片
  onShow1: function (object) {
    let _this = this;
    _this.setData({
      isShowCav: true
    })
    wx.downloadFile({
      url: object.avatarurl,
      success: function (sres) {
        _this.setData({
          canvasUserPic: sres.tempFilePath
        });
        wx.downloadFile({
          url: object.show_img,
          success: function (sres1) {
            _this.setData({
              canvasShowImg: sres1.tempFilePath
            });
            _this.canvas(object);
          }
        })
      }
    })
  },
  /**
   * 绑定减数量事件
   */
  btn_minus(e) {
    //   // 获取点击的索引
    const index = e.currentTarget.dataset.index;
    // const obj = e.currentTarget.dataset.obj;
    // console.log(obj);
    // 获取商品数据
    let list = this.data.list;
    // 获取商品数量
    let num = list[index].num;
    // 判断num小于等于1  return; 点击无效
    if (num <= 1) {
      return false;
    }
    // else  num大于1  点击减按钮  数量--
    num = num - 1;
    list[index].num = num;
    // 渲染页面
    this.setData({
      list: list
    });
    // 调用计算金额方法
    this.count_price();
  },
  // 提交订单
  btn_submit_order: function () {
    var that = this;
    console.log(that.data.totalPrice);

    // 调起支付
    // wx.requestPayment(
    //   {
    //     'timeStamp': '',
    //     'nonceStr': '',
    //     'package': '',
    //     'signType': 'MD5',
    //     'paySign': '',
    //     'success': function (res) { },
    //     'fail': function (res) { },
    //     'complete': function (res) { }
    //   })
    wx.showModal({
      title: '提示',
      content: '合计金额-' + that.data.totalPrice + "暂未开发",
    })
  },
  // 收藏
  btn_collert: function () {
    wx.showToast({
      title: '收藏暂未开发',
      duration: 2000
    })
  },
  /**
   * 计算总价
   */
  count_price() {
    // 获取商品列表数据
    let list = this.data.list;
    // 声明一个变量接收数组列表price
    let total = 0;
    // 循环列表得到每个数据
    for (let i = 0; i < list.length; i++) {
      // 判断选中计算价格
      if (list[i].selected) {
        // 所有价格加起来 count_money
        total += list[i].num * list[i].price;
      }
    }
    // 最后赋值到data中渲染到页面
    this.setData({
      list: list,
      totalPrice: total.toFixed(2)
    });
  },
  // 下拉刷新
  // onPullDownRefresh: function () {
  //   // 显示顶部刷新图标  
  //   wx.showNavigationBarLoading();
  //   var that = this;

  //   console.log(that.data.types_id);
  //   console.log(that.data.sel_name);
  //   wx.request({
  //     url: host + '请求后台数据地址',
  //     method: "post",
  //     data: {
  //       // 刷新显示最新数据
  //       page: 1,
  //     },
  //     success: function (res) {

  //       // console.log(res.data.data.datas);
  //       that.setData({
  //         list: res.data.data.datas
  //       })
  //     }
  //   })

  //   // 隐藏导航栏加载框  
  //   wx.hideNavigationBarLoading();
  //   // 停止下拉动作  
  //   wx.stopPullDownRefresh();

  // },

  // 加载更多
  // onReachBottom: function () {
  //   var that = this;
  //   // 显示加载图标  
  //   wx.showLoading({
  //     title: '正在加载中...',
  //   })
  //   numbers++;

  //   // 页数+1  
  //   wx.request({
  //     url: host + '后台数据地址',
  //     method: "post",
  //     data: {
  //     // 分页
  //       page: numbers,
  //     },
  //     // 请求头部  
  //     header: {
  //       'content-type': 'application/json'
  //     },
  //     success: function (res) {
  //       // 回调函数 

  //       var num = res.data.data.datas.length;
  //       // console.log(num);
  //       // 判断数据长度如果不等于0，前台展示数据，false显示暂无订单提示信息
  //       if (res.data.data.status == 0) {

  //         for (var i = 0; i < res.data.data.datas.length; i++) {
  //           that.data.list.push(res.data.data.datas[i]);
  //         }
  //         // 设置数据  
  //         that.setData({
  //           list: that.data.list
  //         })

  //       } else {
  //         wx.showToast({ title: '没有更多了', icon: 'loading', duration: 2000 })
  //       }


  //       // 隐藏加载框  
  //       wx.hideLoading();
  //     }
  //   })

  // },
 
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