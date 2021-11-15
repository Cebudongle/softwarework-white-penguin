// pages/page2/page2.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    start: "分类",
    slist: [
     { id: 1, name: "开源项目" },
     { id: 1, name: "月刊" },
    ],
    isstart: false,
    openimg: "/img/下拉箭头小.png",
    offimg: "/img/下拉.png"
    
  },
  opens: function (e) {
    switch (e.currentTarget.dataset.item) {
     case "1":
      if (this.data.isstart) {
       this.setData({
        isstart: false,
       });
      }
      else {
       this.setData({
        isstart: true,
       });
      }
      break;
    }
   },
   onclicks1: function (e) {
    var index = e.currentTarget.dataset.index;
    let name = this.data.slist[index].name;
    this.setData({
     isstart: false,
     isfinish: false,
     isdates: false,
     start: this.data.slist[index].name,
     finish: "目的地"
    })
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