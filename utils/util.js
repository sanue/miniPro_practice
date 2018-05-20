const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function errorFunction (e){
  if (e.type == "error") {
    var errorImgIndex = e.target.dataset.errorimg //获取错误图片循环的下标
    var imgList = this.data.imgList 　　　　　　　//将图片列表数据绑定到变量
    imgList[errorImgIndex] = this.data.defaultImg //错误图片替换为默认图片
    this.setData({
      evaluteUserPic: evaluteUserPic
    })
  }
}
/**
 * 封封微信的的request
 */
function request(url, data = {}, callback, method = "GET") {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: url,
      data: data,
      method: method,
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(data);
        if (res.statusCode == 200) {
          resolve(res.data);
        } else {
          reject(res.errMsg);
        }

      },
      fail: function (err) {
        reject(err)
        console.log("failed")
      },
      complete: () => {
        callback && callback()
      }
    })
  });
}
module.exports = {
  formatTime: formatTime,
  request
}
