// pages/details/details.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    news: null,
    id: '1523074607642',
    defaultImg: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1527405583&di=b92d0dc59b59685d7618a9753bdf085c&imgtype=jpg&er=1&src=http%3A%2F%2Fpic.qqtn.com%2Fup%2F2017-1%2F2017191632235670.jpg',
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const id = options.id
    if (!!id) {
      this.loadNews(id)
      this.setData({
        id: id
      })
    }
  },
  onPullDownRefresh() {
    this.loadNews(this.data.id,() => {
      wx.stopPullDownRefresh()
    })
  },
  loadNews(id, callback) {
    wx.request({
      url: 'https://test-miniprogram.com/api/news/detail',
      data: {id},
      success: ({data}) => {
        if (data.code == 200) {
          this.setData({
            news: {
              ...data.result,
              date: data.result.date.split("T")[0] + ' ' + data.result.date.split("T")[1].replace(".000Z", "").substring(0, 5)
            }
          })
          wx.showToast({
            title: '更新成功',
            duration: 1000
          })
        } else {
          wx.showToast({
            title: '加载数据异常',
            duration: 1000
          })
        }
        console.log(data)
      },
      complete: () => {
        callback && callback()
      },
      fail: () => {
        wx.showToast({
          title: '加载失败',
        })
      }
    })
  }
})