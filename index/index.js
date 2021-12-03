// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      // 轮播图数组
      swiperList: [
          {
              id:0,
              src:'https://static.oschina.net/uploads/space/2021/0618/082709_qiFl_4937141.png'
          },
          {
              id:1,
              src:'https://img-home.csdnimg.cn/images/20210926052450.jpg'
          },
          {
              id:2,
              src:'https://static.oschina.net/uploads/space/2021/0616/080930_6f9J_4937141.png'
          }
      ],
      articleList:[
           
      ]
  },
  sendLike: function (e) {
    // console.log(e.currentTarget.dataset.index)
    var _url = this.data.articleList[e.currentTarget.dataset.index].blogUrl
    var _title = this.data.articleList[e.currentTarget.dataset.index].blogTitle
    var that = this;
    wx.request({
        url: 'http://127.0.0.1:5000/hotlist',
        data: {//传递给后端的数据：所点击的URL和用户信息
            url: _url,
            userinfo: wx.getStorageSync('userinfo'),
        },
        header: {
            'content-type': 'application/json'
        },
        method: 'GET',
        dataType: 'json',
        success: function (res) {
            console.log(res.data); //res.data为后台返回的数据
            that.setData({ //用that而不是this，用this就是success的this就错了
                list:res.data.result
            })
        },
        fail: function (err) {}, //请求失败
        complete: function () {} //请求完成后执行的函数
    })
    wx.showToast({
      title: '收藏成功'
    })
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      // 发送异步请求获取轮播图数据
      wx.request({
      // url内存放服务器的地址
        url: 'http://127.0.0.1:5000/hotlist',
        data:{},
        dataType:'json',
      //   成功时的回调函数
        success: (result) => {
          this.setData({
              // 获取文章信息
              articleList:result.data.result
          })
        }
      });
  },
  gotoURL: function (e) {
      wx.setStorageSync('web1', this.data.articleList[e.currentTarget.dataset.index].blogUrl)
      console.log(wx.getStorageSync('web1'))
      wx.navigateTo({
        url: '/pages/out/out'
    })
    this.sendMsg()
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

  },
  onPageScroll: function () {

  },
  onTabItemTap:function(item){
      
  }
})