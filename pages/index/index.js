//获取应用实例
const app = getApp()

Page({
  data: {
    defaultImg: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1527405583&di=b92d0dc59b59685d7618a9753bdf085c&imgtype=jpg&er=1&src=http%3A%2F%2Fpic.qqtn.com%2Fup%2F2017-1%2F2017191632235670.jpg',
    catagoryList: [
      {
        key: 'gn',
        display: '国内'
      },
      {
        key: 'gg',
        display: '国际'
      },
      {
        key: 'cj',
        display: '财经'
      },
      {
        key: 'yl',
        display: '娱乐'
      },
      {
        key: 'js',
        display: '军事'
      },
      {
        key: 'ty',
        display: '体育'
      },
      {
        key: 'other',
        display: '其他'
      }
    ],
    newsList: [],
    activeCategory: 'gn'
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    this.loadData()
  },
  onPullDownRefresh() {
    this.loadData(() => {
      wx.stopPullDownRefresh()
    })
  },
  loadData(callback) {
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: 'https://test-miniprogram.com/api/news/list',
      data: {
        'type': this.data.activeCategory
      },
      success: ({ data}) => {
        if (data.code === 200) {
          const newsList = []
          data.result.forEach(news => {
            newsList.push({
              ...news,
              date: news.date.split("T")[0] + ' ' + news.date.split("T")[1].replace(".000Z", "").substring(0, 5)
            })
          })
          wx.showToast({
            title: '更新成功',
            duration: 1000
          })
          this.setData({
            newsList
          })
        } else {
          wx.showToast({
            title: '加载数据异常',
            duration: 1000
          })
        }
      },
      complete: () => {
        callback && callback()
      },
      fail:()=> {
        wx.showToast({
          title: '加载失败',
        })
      }
    })
  },
  onChangeCategory(event) {
    const newCategory = event.target.dataset.category
    if (newCategory !== this.data.activeCategory) {
      this.setData({
        activeCategory: newCategory
      })
      this.loadData()
    }
  }

  
})
