// stores/editStore.js
import { defineStore } from 'pinia'

export const useEditStore = defineStore('edit', {
  state: () => ({
    activeLayer: null,        // layer đang vẽ
    currentFeature: null,     // feature vừa vẽ
    showForm: false
  }),

  actions: {
    startLayer(layer) {
      this.activeLayer = layer
    },

    openForm(feature) {
      this.currentFeature = feature
      this.showForm = true
    },

    closeForm() {
      this.showForm = false
      this.currentFeature = null
    }
  }
})
