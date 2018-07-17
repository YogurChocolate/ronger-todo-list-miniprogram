import { config } from '../../utils/constants.js'
Page({
  data: {
    nickName: '',
    shareTodoList: []
  },
  onLoad: function (options) {
    const { id, nickName } = options
    this.setData({
      nickName: nickName
    })
    const that = this
    if (id) {
      wx.request({
        url: `${config.host}/api/todo-list/${id}`,
        success: function (res) {
          const todoList = res.data.todoList
          that.setData({
            shareTodoList: todoList
          })
        }
      })
    }
  },
  goToMyTodoList: function () {
    wx.redirectTo({
      url: '../todo/todo',
    })
  }
})