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
  deleteItembyId: function(deleteItemId) {
    const todoList = this.getTodoList()
    const newTodoList = todoList.filter(function(item) {
      return item.id !== deleteItemId
    })
    this.updateTodoList(newTodoList)
  },
  addItem: function() {
    if(this.data.userInputValue) {
      const newItem = {
        id: this.data.todoList.length,
        value: this.data.userInputValue,
        complete: true
      }
      this.setTodoList(newItem);
      this.setData({
        userInputValue: ''
      })
    }
  }
})