<template>
  <div class="form-panel" v-if="showAttributeForm">
    <div class="close" @click="$emit('update:showAttributeForm', false)"> <button>X</button> </div>
    <div class="content">
      <h3>Thông tin Nhà ở</h3>
      <div class="box" v-if="isModify" > <label>ID *</label>
        <input v-model="form.id" disabled="disabled" />
      </div>
      <div class="box"> <label>Tên đối tượng *</label>
        <select v-model="form.ma_doi_tuong" :disabled="isSelect">
          <option value="">-- Chọn loại đối tượng --</option>
          <option v-for="item in filteredLoaiDoiTuong" :key="item.ma_doi_tuong" :value="item.ma_doi_tuong">
            {{ item.ten_doi_tuong }}
          </option>
        </select>
      </div>

      <div class="box" v-if="isSelect">
        <label>Mã đối tượng * </label>
        <input v-model="form.ma_doi_tuong" disabled />
      </div>

      <div class="box"> <label>Loại trạng thái</label>
        <input type="text" v-model.number="form.loai_trang_thai" :disabled="isSelect" />
      </div>

      <div class="box">
        <label>Tên chủ nhà</label>
        <input v-model="form.ten_chu_nha" :disabled="isSelect" />
      </div>

     <div class="box"> <label>Loại hiện trạng *</label >
        <select v-model="form.loai_hien_trang" :disabled="isSelect">
          <option value="">-- Chọn loại hiện trạng --</option>
          <option v-for="item in dataHienTrang" :key="item.ma_hien_trang" :value="item.ma_hien_trang">
            {{ item.ten_hien_trang }}
          </option>
        </select>
      </div>

      <div class="box" v-if="isSelect">
        <label>Mã hiện trạng * </label>
        <input v-model="form.loai_hien_trang" :disabled="isSelect" />
      </div>

      <div class="box"> <label>Thôn *</label >
        <select v-model="form.ma_thon" :disabled="isSelect">
          <option value="">-- Chọn thôn --</option>
          <option v-for="item in dataNhaVanHoa" :key="item.ten" :value="item.ma_doi_tuong">
            {{ item.ten }}
          </option>
        </select>
      </div>

      <div class="box" v-if="isSelect">
        <label>Mã thôn * </label>
        <input v-model="form.ma_thon" disabled />
      </div>

      <div class="box"><label>Địa chỉ</label>
        <textarea v-model="form.dia_chi" :disabled="isSelect"></textarea>
      </div>

      <div class="box">
        <label>Nhóm đối tượng</label>
        <input v-model="form.nhom_doi_tuong" :disabled="isSelect" />
      </div>

      <div class="box" v-if="isAuthenticated">
        <label>Ngày tạo</label>
        <input :value="formatDate(form.created_at)" :disabled="isSelect" />
      </div>
      <div class="box" v-if="isAuthenticated">
        <label>Ngày cập nhật</label>
        <input :value="formatDate(form.updated_at)" :disabled="isSelect" />
      </div>

    </div>

    <div class="actions" v-show="isAuthenticated && !isSelect" >
      <!-- <button @click="$emit('cancel')"> Hủy</button> -->
      <button @click="$emit('apply')"> Áp dụng</button>
    </div>


  </div>
</template>

<script setup>
import { reactive, ref, watch, onMounted, computed } from 'vue'
import { useAuthStore } from '@/stores/authStore';
import { getLoaiDoiTuong } from '@/api/api_loai_doi_tuong';
import { getLoaiHienTrang } from '@/api/api_loai_hien_trang';
import { getNhaVanHoa } from '@/api/api_nha_van_hoa';

const authStore = useAuthStore();
const isAuthenticated = authStore.isAuthenticated;
const dataList = ref([]);
const dataHienTrang = ref([]);
const dataNhaVanHoa = ref([]);

const isSelect = computed(() => props.mode === 'select')
const isAdd = computed(() => props.mode === 'add')
const isModify = computed(() => props.mode === 'modify')

const dateNow = () => {
  const now = new Date().toISOString();
  return now;
}

const formatDate = (data) => {
  const date = new Date(data).toLocaleDateString();
  console.log('Formatting date:', date);
  return date;
}

/* NHẬN DATA TỪ MAP */
const props = defineProps({
  modelValue: {
    type: Object,
    required: true
  },
  showAttributeForm: {
    type: Boolean,
    required: true
  },
  mode: {
    type: String,
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
  loai_trang_thai: '',
  nhom_doi_tuong: 'nha',
  loai_hien_trang: '',
  dien_tich_m2:'',
  created_at: dateNow(),
  updated_at: dateNow(),
})


/* ✅ SYNC TỪ FEATURE → FORM */
watch(
  () => props.modelValue,
  (val) => {
    console.log('props.modelValue:', val);
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

const fetchLoaiDoiTuong = async () => {
  try {
    const response = await getLoaiDoiTuong(1, 10000);
    dataList.value = response.data.data;
    console.log('Danh sách loại đối tượng:', dataList.value);
  } catch (error) {
    console.error('Error fetching loại đối tượng:', error);
  }
}

const filteredLoaiDoiTuong = computed(() => {
  return dataList.value.filter(
    item => item.nhom_doi_tuong === 'nha'
  )
})

const fetchLoaiHienTrang = async () => {
  try {
    const response = await getLoaiHienTrang(1, 10000);
    dataHienTrang.value = response.data.data;
    console.log('Danh sách loại hiện trạng:', dataHienTrang.value);
  } catch (error) {
    console.error('Error fetching loại hiện trạng:', error);
  }
}

const fetchNhaVanHoa = async () => {
  try {
    const response = await getNhaVanHoa(1, 10000);
    console.log('Danh sách nhà văn hóa:', response.data);
    dataNhaVanHoa.value = response.data;
  } catch (error) {
    console.error('Error fetching nhà văn hóa:', error);
  }
}


onMounted(() => {
  fetchLoaiDoiTuong();
  fetchLoaiHienTrang();
  fetchNhaVanHoa();
  console.log('NhaForm mounted');
  // dateNow();
});
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