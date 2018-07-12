import { config } from './utils/constants.js'

App({
  onLaunch: function () {
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          this.getUserInfo()
          this.getOpenIdAndRedirect()
        }
      }
    })
  },
  getOpenIdAndRedirect: function () {
    wx.login({
      success: res => {

        wx.request({
          url: `${config.host}/api/user/${res.code}`,
          success: (res) => {
            this.globalData.openId = res.data.openId
  
            wx.redirectTo({
              url: '../todo/todo',
            })
          }
        })
      }
    })
  },
  getUserInfo: function () {
    wx.getUserInfo({
      success: res => {
        this.globalData.userInfo = res.userInfo

        if (this.userInfoReadyCallback) {
          this.userInfoReadyCallback(res)
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    openId: ''
  }
})