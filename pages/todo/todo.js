Page({
  data: {
    userInputValue: '',
    todoList: []
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
    return this.data.todoList;
  },
  setTodoList: function(item) {
    this.data.todoList.push(item)
    this.updateTodoList(this.data.todoList)
  },
  updateTodoList: function(newTodoList) {
    this.setData({
      todoList: newTodoList
    })
  },
  addItem: function() {
    if(this.data.userInputValue) {
      const newItem = {
        id: this.data.todoList.length,
        value: this.data.userInputValue,
        complete: false
      }
      this.setTodoList(newItem)
      this.emptyInputValue()
    }
  },
  deleteItembyId: function(deleteItem) {
    const { itemId } = deleteItem.detail
    const todoList = this.getTodoList()

    const newTodoList = todoList.filter(function (item) {
      return item.id !== itemId
    })

    this.updateTodoList(newTodoList)
  },
  updateItemCompleteStatusById: function(updateItem) {
    const { itemId } = updateItem.detail
    const todoList = this.getTodoList()

    const netTodoList = todoList.map(function(item) {
      if (item.id === itemId) {
        return {
          ...item,
          complete: !item.complete
        }
      }
      return item;
    })

    this.updateTodoList(netTodoList)
  }
})