import { FILTER_TYPE, config } from '../../utils/constants.js'
const app = getApp()

Page({
  data: {
    userInputValue: '',
    filterType: FILTER_TYPE.ALL,
    todoList: [],
    showTodoList: []
  },
  onShareAppMessage: function () {
    const nickName = app.globalData.userInfo.nickName
    return {
      path: `/pages/share/share?id=${app.globalData.openId}&nickName=${nickName}`
    }
  },
  onLoad: function () {
    const that = this
    if (app.globalData.openId) {
      wx.request({
        url: `${config.host}/api/todo-list/${app.globalData.openId}`,
        success: function (res) {
          const todoList = res.data.todoList
          that.updateShowTodoList(todoList)
          that.updateTodoList(todoList)
        }
      })
    }
  },
  onHide: function () {
    if (app.globalData.openId) {
      wx.request({
        url: `${config.host}/api/todo-list/${app.globalData.openId}`,
        method: 'post',
        data: {
          todoList: this.data.todoList
        }
      })
    }
  },
  bindUserInput: function(e) {
    if (e.detail.value) {
      this.setData({
        userInputValue: e.detail.value
      })
    }
  },
  emptyInputValue: function () {
    this.setData({
      userInputValue: ''
    })
  },
  getTodoList: function() {
    return this.data.todoList
  },
  updateTodoList: function (newTodoList) {
    this.setData({
      todoList: newTodoList
    })
  },
  setTodoList: function(item) {
    const newTodoList = this.data.todoList.concat(item)
    this.updateTodoList(newTodoList)
  },
  getShowTodoList: function() {
    return this.data.showTodoList
  },
  updateShowTodoList: function(newShowTodoList) {
    this.setData({
      showTodoList: newShowTodoList
    });
  },
  setShowTodoList: function (item) {
    const newShowTodoList = this.data.showTodoList.concat(item)
    this.updateShowTodoList(newShowTodoList)
  },
  addItem: function() {
    if(this.data.userInputValue) {
      const newItem = {
        index: Date.now(),
        value: this.data.userInputValue,
        complete: false
      }
      const filterType = this.data.filterType

      if (filterType === FILTER_TYPE.ALL ||
          filterType === FILTER_TYPE.NOT_COMPLETE) {
        this.setTodoList(newItem)
        this.setShowTodoList(newItem)
      }

      if (filterType === FILTER_TYPE.COMPLETE) {
        this.setTodoList(newItem)
      }
      
      this.emptyInputValue()
    }
  },
  deleteFun: function(todoList, itemIndex, updateTodoFun) {
    if (!(todoList || itemIndex || updateTodoFun)) {
      return
    }

    const newTodoList = todoList.filter(function (item) {
      return item.index !== itemIndex
    })
    updateTodoFun(newTodoList)
  },
  deleteItembyIndex: function(deleteItem) {
    const { itemIndex } = deleteItem.detail

    const todoList = this.getTodoList()
    this.deleteFun(todoList, itemIndex, this.updateTodoList)

    const showTodoList = this.getShowTodoList()
    this.deleteFun(showTodoList, itemIndex, this.updateShowTodoList)
  },
  updateFun: function (todoList, itemIndex, updateTodoFun) {
    if (!(todoList || itemIndex || updateTodoFun)) {
      return
    }

    const newTodoList = todoList.map(function (item) {
      if (item.index === itemIndex) {
        return {
          ...item,
          complete: !item.complete
        }
      }
      return item;
    })
    updateTodoFun(newTodoList)
  },
  updateItemCompleteStatusByIndex: function(updateItem) {
    const { itemIndex } = updateItem.detail
    const todoList = this.getTodoList()
    this.updateFun(todoList, itemIndex, this.updateTodoList)

    const showTodoList = this.getShowTodoList()
    this.updateFun(showTodoList, itemIndex, this.updateShowTodoList)

    this.updateShowTodoListByFilterType(this.data.filterType)
  },
  updateShowTodoListByFilterType: function(filterType) {
    switch (filterType) {
      case FILTER_TYPE.COMPLETE:
        this.getCompleteToDoList()
        break
      case FILTER_TYPE.NOT_COMPLETE:
        this.getNotCompleteTodoList()
        break
    }
  },
  setFilterType: function (filterType) {
    this.setData({
      filterType,
    })
  },
  updateShowTodoListByCompleteStatus: function(completeStatus = null) {
    const todoList = this.getTodoList()
    const newTodoList = todoList.filter(function (item) {
      if (completeStatus === null) {
        return item
      }
      return item.complete === completeStatus
    })
    this.updateShowTodoList(newTodoList)
  },
  getAllTodoList: function() {
    this.setFilterType(FILTER_TYPE.ALL)
    this.updateShowTodoListByCompleteStatus()
  },
  getCompleteToDoList: function() {
    this.setFilterType(FILTER_TYPE.COMPLETE)
    const todoList = this.getTodoList()
    this.updateShowTodoListByCompleteStatus(true)
  },
  getNotCompleteTodoList: function() {
    this.setFilterType(FILTER_TYPE.NOT_COMPLETE)
    this.updateShowTodoListByCompleteStatus(false)
  }
})