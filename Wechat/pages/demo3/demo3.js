// pages/demo4/demo4.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
      openid: wx.getStorageSync('openid'),
        select:false,
        grade_name:'--请选择--',
        grades: [
          'Github',
          'Gitee',
          'Oschina',
         ]
       },/**
       * 点击下拉框
       */
       bindShowMsg() {
         console.log(wx.getStorageSync('openid'));
        this.setData({
         select: !this.data.select
        })
       },
       userLogin: function () {

        var that = this
        //根据code获取openid等信息
        wx.login({
            //获取code
            success: function (res) {
                var code = res.code; //返回code
                console.log(code);
                var appId = 'wx08bdfe75b20beb79'; //小程序的appid
                var secret = 'a41a53dc89852890e9be2c41538b8667'; //小程序的appsecret
                wx.request({
                    url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appId + '&secret=' + secret + '&js_code=' + code + '&grant_type=authorization_code',
                    data: {},
                    header: {
                        'content-type': 'json'
                    },
                    success: function (res) {
                        var openid = res.data.openid //返回openid
                        wx.setStorageSync('openid', openid)
                        console.log(wx.getStorageSync('openid'))
                        console.log('openid为' + openid);
                        that.setData({
                            openid: res.data.openid
                        })
                    }
                })
            }
        })

    },
    /**
      /**
       * 已选下拉框
       */
       mySelect(e) {
        console.log(e);
        var name = e.currentTarget.dataset.name
        this.setData({
         grade_name: name,
         select: false
        })
       },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      this.userLogin();
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