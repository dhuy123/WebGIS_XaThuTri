<template>
  <div class="form-panel" v-if="showAttributeForm">
    <div class="close" @click="$emit('update:showAttributeForm', false)"> <button>X</button> </div>
    <div class="content">
      <h3>Thông tin Nhà ở</h3>
        <div class="box"> <label>ID *</label>
        <input v-model="form.id" disabled="" />
      </div>
      <div class="box"> <label>Mã đối tượng *</label>
        <input v-model="form.ma_doi_tuong" required :readonly="readOnly" />
      </div>

      <div class="box"> <label>Loại nhà</label>
        <select v-model="form.loai_nha" :disabled="readOnly">
          <option value="">-- Chọn --</option>
          <option value="Nhà riêng">Nhà riêng</option>
          <option value="Chung cư">Chung cư</option>
        </select>
      </div>

      <div class="box"> <label>Số tầng</label>
        <input type="number" min="0" v-model.number="form.so_tang" :readonly="readOnly" />
      </div>


      <div class="box">
        <label>Tên chủ nhà</label>
        <input v-model="form.ten_chu_nha" :readonly="readOnly" />
      </div>

      <div class="box"><label>Hiện trạng</label>
        <select v-model="form.loai_hien_trang" :disabled="readOnly">
          <option value="">-- Chọn --</option>
          <option value="HT01">HT01</option>
          <option value="HT02">HT02</option>
        </select>
      </div>

      <div class="box">
        <label>Mã thôn</label>
        <input v-model="form.ma_thon" :readonly="readOnly" />
      </div>

      <div class="box"><label>Địa chỉ</label>
        <textarea v-model="form.dia_chi" :readonly="readOnly"></textarea>
      </div>

      <div class="box">
        <label>Nhóm đối tượng</label>
        <input v-model="form.nhom_doi_tuong" :readonly="readOnly" />
      </div>

      <div class="box" v-if="isAuthenticated">
        <label>Ngày tạo</label>
        <input :value="formatDate(form.created_at)" :readonly="readOnly" />
      </div>
      <div class="box" v-if="isAuthenticated">
        <label>Ngày cập nhật</label>
        <input :value="formatDate(form.updated_at)" :readonly="readOnly" />
      </div>

    </div>

    <div class="actions" v-show="isAuthenticated">
      <!-- <button @click="$emit('cancel')"> Hủy</button> -->
      <button @click="$emit('apply')"> Áp dụng</button>
    </div>


  </div>
</template>

<script setup>
import { reactive, watch } from 'vue'
import { useAuthStore } from '@/stores/authStore';

const authStore = useAuthStore();
const isAuthenticated = authStore.isAuthenticated;

const dateNow = () => {
  const now = new Date().toISOString();
  return now;
}

const formatDate = (data) => {
  const date = new Date(data).toLocaleDateString();
  console.log('Formatting date:', date);
  return date;
}

/* ✅ NHẬN DATA TỪ MAP */
const props = defineProps({
  modelValue: {
    type: Object,
    required: true
  },
  showAttributeForm: {
    type: Boolean,
    required: true
  },
  readOnly: { type: Boolean, default: false }
})

const emit = defineEmits([
  'update:modelValue',
  'update:showAttributeForm',
  'apply',
  'cancel'
])

/* ✅ STATE LOCAL */
const form = reactive({
  ma_doi_tuong: '',
  loai_nha: '',
  so_tang: 0,
  ten_chu_nha: '',
  nhom_doi_tuong: 'nha',
  loai_hien_trang: '',
  ma_thon: '',
  dia_chi: '',
  created_at: dateNow(),
  updated_at: dateNow(),
})


/* ✅ SYNC TỪ FEATURE → FORM */
watch(
  () => props.modelValue,
  (val) => {
    console.log('props.modelValue:', val.created_at);
    if (!val) return
    Object.assign(form, val)
  },
  { immediate: true }
)

/* ✅ SYNC FORM → VIEW */
watch(
  form,
  () => {
    emit('update:modelValue', { ...form })
  },
  { deep: true }
)
// onMounted(() => {
//   console.log('NhaForm mounted');
//   dateNow();
// });
</script>

<style scoped>
.form-panel {
  position: absolute;
  top: 218px;
  left: 150px;
  transform: translate(-50%, -25%);
  background: #fff;
  /* border-radius: 6px; */
  padding: 20px;
  margin-left: 20px;
  /* box-shadow: 0 2px 8px rgba(0, 0, 0, .2); */
  z-index: 3000;
  width: 340px;
  height: 680px;
  overflow-y: auto;
}


.close {
  display: flex;
  margin-left: auto;

  align-items: center;
  cursor: pointer;
  width: 20px;

}

.content .box label {
  display: block;
  font-weight: bold;
  margin-top: 8px;
  margin-bottom: 5px;
}

.content .box input,
.content .box select,
.content .box textarea {
  width: 100%;
  padding: 6px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 12px;
  gap: 10px;
}
</style>