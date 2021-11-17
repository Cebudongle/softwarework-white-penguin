let timeId = null;
Page({
    data: {
        // 搜索历史
        history: [],
        // 热词推送
        hot: ['java', 'c++', 'python','one','tow','three'],
        // 结果
        result: [
            {
                id: 1,
                url: '../demo5/demo5',
                title: 'javaScript',
                text:'************************',
                writer:'yuanP',
                pointNum:'1000',
                like: true,
                islike: false,
            },
            {
                id: 2,
                url: '../demo6/demo6',
                title: '月刊',
                text:'************************',
                writer:'农P',
                pointNum:'2000',
                like: true,
                islike: false,
            },
            {
                id: 3,
                url: '../demo5/demo5',
                title: 'javaScript',
                text:'************************',
                writer:'yuanP',
                pointNum:'1000',
                like: true,
                islike: false,
            },
            {
                id: 4,
                url: '../demo6/demo6',
                title: 'javaScript',
                text:'************************',
                writer:'yuanP',
                pointNum:'1000',
                like: true,
                islike: false,
            },
            {
                id: 5,
                url: '../demo6/demo6',
                title: 'javaScript',
                text:'************************',
                writer:'yuanP',
                pointNum:'1000',
                like: true,
                islike: false,
                match:false,
            },
        ],
        // 关键词展示
        showKeywords: false,
        // 关键词
        keywords: ['java', 'c++', 'c', 'python','emmm','sdad'],
        // 输入值
        value: '',
        // 搜索结果
        showResult: false,
        isSearch: true,
        like: true,
        islike: false,
        isNULL: false,
    },
     // 取消输入时候showResult: false,showKeywords: false,
    cancelSearch() {
        this.setData({
            showResult: false,
            showKeywords: false,
            value: ''
        })
    },
    // onReachBottom: function () {
    //     console.log('加载更多')
    //     setTimeout(() => {
    //       this.setData({
    //         isHideLoadMore: true,
    //         recommends: [
    //           {
    //             goodId: 7,
    //             name: 'OLAY玉兰油精油沐浴露玫瑰滋养二合一450ml',
    //             url: 'bill',
    //             imageurl: 'http://mz.djmall.xmisp.cn/files/product/20161213/148162245074.jpg',
    //             newprice: "￥36.60",
    //             oldprice: "￥40.00",
    //           },
    //           {
    //             goodId: 10,
    //             name: '兰蔻玫瑰清滢保湿柔肤水嫩肤水化妆水400ml补水保湿温和不刺激',
    //             url: 'bill',
    //             imageurl: 'http://mz.djmall.xmisp.cn/files/product/20161201/148057937593.jpg',
    //             newprice: "￥30.00",
    //             oldprice: "￥80.00",
    //           }, {
    //             goodId: 11,
    //             name: 'Lancome/兰蔻清莹柔肤爽肤水/粉水400ml补水保湿玫瑰水化妆水',
    //             url: 'bill',
    //             imageurl: 'http://mz.djmall.xmisp.cn/files/product/20161201/148057953326.jpg',
    //             newprice: "￥30.00",
    //             oldprice: "￥80.00",
    //           },
    //           {
    //             goodId: 12,
    //             name: '美国CLINIQUE倩碧黄油无油/特效润肤露125ml',
    //             url: 'bill',
    //             imageurl: 'http://mz.djmall.xmisp.cn/files/product/20161201/14805828016.jpg',
    //             newprice: "￥239.00",
    //             oldprice: "￥320.00",
    //           },
    //           {
    //             goodId: 13,
    //             name: '法国LANCOME兰蔻柔皙轻透隔离防晒乳霜50ML2017年3月到期',
    //             url: 'bill',
    //             imageurl: 'http://mz.djmall.xmisp.cn/files/product/20161201/148058014894.jpg',
    //             newprice: "￥130.00",
    //             oldprice: "￥180.00",
    //           },
    //         ],
    //       })
    //     }, 1000)
    //   },
    
    //     onPullDownRefresh:function()
    //     {
    //       wx.showNavigationBarLoading() //在标题栏中显示加载
    //       //模拟加载
    //       setTimeout(function()
    //       {
    //         // complete
    //         wx.hideNavigationBarLoading() //完成停止加载
    //         wx.stopPullDownRefresh() //停止下拉刷新
    //       },1500);
    //     },
   // 输入操作
    searchInput(e) {
        // 判断是否为空，为空showKeywords:false
        if(!e.detail.value){
            this.setData({
                showKeywords: false,
                isSearch:true,
                isNULL:true,
            })
        }
       // 不为空时 showKeywords: true
        else{
            this.setData({
                isSearch:false,
            })
            if(!this.data.showKeywords){
                timeId && clearTimeout(timeId);
                timeId = setTimeout(() => {
                    this.setData({
                        showKeywords: true
                    })
                }, 1000)
            }
        }
    },
    searchconfirm(e){
        const text = e.detail.value;
        let keywords = this.data.keywords;
        // 判断是否为空，为空showKeywords:false
        if(!e.detail.value){
            this.setData({
                showKeywords: false,
                isSearch:true,
                isNULL:true,
            })
        }
       // 不为空时 showKeywords: true
        else{
            this.setData({
                value:text,
                isSearch:false,
                showKeywords:false
            })
            console.log(this.data.value);
            this.historyHandle(text);
            var i;
            for(i=0;i<keywords.length;i++)
            {
                if(keywords[i]==text)
                {
                    this.setData({
                        match:true,
                        showResult:true,
                        showKeywords:false
                    })
                    console.log(i);
                    break;
                }
            }
            console.log(i);
            if(i==keywords.length)
            {
                this.setData({
                    showResult: true,
                    match:false,
                    showKeywords:false
                })
            }
        }
    },
// 获取输入信息然后设置showKeywords: false, showResult: true
    keywordHandle(e) {
        const text = e.target.dataset.text;
        this.setData({
            value: text,
            match:true,
            showKeywords: false,
            showResult: true
        })
        this.historyHandle(text);
    },

 // 存储历史记录
    historyHandle(value) {
        let history = this.data.history;
        const idx = history.indexOf(value);
        if (idx === -1) {
            // 搜索记录只保留8个
            if (history.length > 7) {
                history.pop();
            }
        } else {
            history.splice(idx, 1);
        }
        history.unshift(value);
        wx.setStorageSync('history', JSON.stringify(history));
        this.setData({
            history
        });
    },
    // 清理历史记录
    clearHistory()
    {
        let history = this.data.history;
        const length = history.length;
        history.splice(0, length);
        wx.removeStorage({
            key: 'history',
            success: function(res) {
              that.setData({
                storageData: []
              })
            },
          });
        this.setData({
            history
        });
    },
    // 喜欢按钮事件
    tapLike(e){
        console.log(e);
        var index = e.currentTarget.dataset.index;
        var result=this.data.result;
        result[index].islike=true;
        result[index].like=false;
        this.setData({
            result:result,
        });
    },
    cancelLike(e)
    { 
        console.log(e);
        var index = e.currentTarget.dataset.index;
        var result=this.data.result;
        result[index].islike=false;
        result[index].like=true;
        this.setData({
            result:result,
        });
    },

    onLoad() {
        const history = wx.getStorageSync('history');
        if (history) {
            this.setData({
                history: JSON.parse(history)
            })
            console.log(this.data.history);
        }
    }
})


