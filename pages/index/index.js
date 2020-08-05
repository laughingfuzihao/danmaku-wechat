//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    danmaku: '',
    content: 0,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  getInput:function(e){
    this.setData({
      danmaku: e.detail.value,
      content: e.detail.value.length
    })
},
  send:function(){
    if(this.data.danmaku != null &&this.data.danmaku!=''){
      wx.request({
        url: 'https://laughing-blog.cn/danmaku/get/'+this.data.danmaku, 
        header: {
          'content-type': 'application/json' // 默认值
        },
        success (res) {
          console.log(res);
          wx.showToast({
            icon: 'none',
            title: '发送成功',
        })
        }
      }) 
    }else{
      wx.showToast({
        icon: 'none',
        title: '请输入弹幕',
    })
    }
  }
})
