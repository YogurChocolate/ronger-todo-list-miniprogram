import { FILTER_TYPE } from '../../utils/constants.js'

Page({
  data: {
    userInputValue: '',
    filterType: FILTER_TYPE.ALL,
    todoList: [],
    showTodoList: []
  },
  onLoad: function (options) {  
  },
  onUnload: function () {
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
    this.data.todoList.push(item)
    this.updateTodoList(this.data.todoList)
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
    this.data.showTodoList.push(item)
    this.updateShowTodoList(this.data.showTodoList)
  },
  addItem: function() {
    if(this.data.userInputValue) {
      const newItem = {
        id: Date.now(),
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
  deleteFun: function(todoList, itemId, updateTodoFun) {
    if (!(todoList || itemId || updateTodoFun)) {
      return
    }

    const newTodoList = todoList.filter(function (item) {
      return item.id !== itemId
    })
    updateTodoFun(newTodoList)
  },
  deleteItembyId: function(deleteItem) {
    const { itemId } = deleteItem.detail

    const todoList = this.getTodoList()
    this.deleteFun(todoList, itemId, this.updateTodoList)

    const showTodoList = this.getShowTodoList()
    this.deleteFun(showTodoList, itemId, this.updateShowTodoList)
  },
  updateFun: function (todoList, itemId, updateTodoFun) {
    if (!(todoList || itemId || updateTodoFun)) {
      return
    }

    const newTodoList = todoList.map(function (item) {
      if (item.id === itemId) {
        return {
          ...item,
          complete: !item.complete
        }
      }
      return item;
    })
    updateTodoFun(newTodoList)
  },
  updateItemCompleteStatusById: function(updateItem) {
    const { itemId } = updateItem.detail
    const todoList = this.getTodoList()
    this.updateFun(todoList, itemId, this.updateTodoList)

    const showTodoList = this.getShowTodoList()
    this.updateFun(showTodoList, itemId, this.updateShowTodoList)

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
  getAllTodoList: function(d) {
    this.setFilterType(FILTER_TYPE.ALL)
    this.updateShowTodoList(this.getTodoList())
  },
  getCompleteToDoList: function() {
    this.setFilterType(FILTER_TYPE.COMPLETE)
    const todoList = this.getTodoList()
    const newTodoList = todoList.filter(function(item) {
      return item.complete
    })
    this.updateShowTodoList(newTodoList)
  },
  getNotCompleteTodoList: function() {
    this.setFilterType(FILTER_TYPE.NOT_COMPLETE)
    const todoList = this.getTodoList()
    const newTodoList = todoList.filter(function (item) {
      return !item.complete
    })
    this.updateShowTodoList(newTodoList)
  }
})