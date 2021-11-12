let timeId = null;
Page({
    data: {
        // 搜索历史
        history: [],
        // 热词推送
        hot: ['java', 'c++', 'python'],
        // 结果
        result: [
            {
                id: 1,
                url: '../details/details',
                thumb: '/image/1.png',
                title: 'javaScript',
            },
            {
                id: 2,
                url: '../details/details',
                thumb: '/image/2.png',
                title: '月刊',
            }
        ],
        // 关键词展示
        showKeywords: false,
        // 关键词
        keywords: ['java', 'c++', 'c', 'python'],
        // 输入值
        value: '',
        // 搜索结果
        showResult: false,
        isSearch: true,
        isClear: false,
        like: true,
        islike: false,
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
        // 判断是否为空，为空showKeywords:false
        if(!e.detail.value){
            this.setData({
                showKeywords: false,
                isSearch:true,
                isClear:false
            })
        }
       // 不为空时 showKeywords: true
        else{
            this.setData({
                isSearch:false,
                isClear:true,
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
            isClear: false,
            showKeywords: false,
            showResult: true
        })
        this.historyHandle(text);
    },

    clearTap(){
        console.log(e)
        this.setData({
            isSearch:true,
            isClear:false,
            showKeywords: false, 
            showResult: false,
            value: '',
        })
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
    tapLike(){
        this.setData({
            like:false,
            islike:true,
        });
    },
    cancelLike()
    {
        this.setData({
            like:true,
            islike:false,
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