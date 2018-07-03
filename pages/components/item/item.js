import {PAGES} from '../../../utils/constant.js'

Component({
  properties: {
    item: {
      type: {
        id: {
          type: Number
        },
        value: {
          type: String
        },
        complete: {
          type: Boolean
        },
      }
    }
  },
  methods: {
    getTodoListPage: function() {
      return getCurrentPages().find(function (page) {
        return page.is === PAGES.TODO
      })
    },
    deleteItem: function() {
      const todoPage = this.getTodoListPage()
      const deleteItemId = this.data.item.id
      if (todoPage) {
        todoPage.deleteItembyId(deleteItemId)
      }
    },
    completeItem: function() {
      const todoPage = this.getTodoListPage()
      const completeItemId = this.data.item.id
      if (todoPage) {
        todoPage.updateItemCompleteStatusById(completeItemId)
      }
    }
  }
})