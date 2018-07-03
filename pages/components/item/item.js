Component({
  properties: {
    item: {
      type: {
        id: Number,
        value: String,
        complete: Boolean,
      }
    }
  },
  methods: {
    deleteItem: function() {
      const itemId = this.data.item.id
      this.triggerEvent('deleteItem', {
        itemId
      }, {})
    },
    completeItem: function() {
      const itemId = this.data.item.id
      this.triggerEvent('updateItem', {
        itemId
      }, {})
    }
  }
})
