Component({
  properties: {
    item: {
      type: {
        index: Number,
        value: String,
        complete: Boolean,
      }
    }
  },
  methods: {
    deleteItem: function() {
      const itemIndex = this.data.item.index
      this.triggerEvent('deleteItem', {
        itemIndex
      }, {})
    },
    completeItem: function() {
      const itemIndex = this.data.item.index
      this.triggerEvent('updateItem', {
        itemIndex
      }, {})
    }
  }
})
