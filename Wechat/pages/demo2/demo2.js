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
   // 输入操作
    searchInput(e) {
        console.log(e);
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
// 获取输入信息然后设置showKeywords: false, showResult: true
    keywordHandle(e) {
        const text = e.target.dataset.text;
        this.setData({
            value: text,
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