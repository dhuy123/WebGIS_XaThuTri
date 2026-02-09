<template>
  <div v-if="store.showForm" class="attr-form">
    <h3>Thuộc tính</h3>

    <input v-model="attrs.ten" placeholder="Tên" />
    <input v-model="attrs.loai" placeholder="Loại" />

    <button @click="save">💾 Lưu</button>
    <button @click="cancel">❌ Hủy</button>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useEditStore } from '@/stores/editStore'

const store = useEditStore()

const attrs = reactive({
    ten: '',
    loai: ''
})

const save = () => {
    store.editingFeature.setProperties(attrs)
    store.showForm = false
}

const cancel = () => {
    store.activeLayer
        .getSource()
        .removeFeature(store.editingFeature)

    store.clear()
}
</script>
