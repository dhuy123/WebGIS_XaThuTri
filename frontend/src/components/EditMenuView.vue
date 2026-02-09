<template>
    <div class="edit-menu-view" v-show="isAuthenticated == true">
        <button class="tool-edit" @click="toggleMenu" title="Công cụ biên tập">
            <IconEdit />
        </button>
        <div class="edit-menu" v-show="isOpen">
            <div class="box" @click="toggleSetting">
                <button title="Thao tác" @click="$emit('mode', 'select')">
                    <IconSettings />
                </button>
            </div>
            <div class="box" >
                <button title="Chọn đối tượng" @click="emitMode('select')" style=" background-color: turquoise;">
                  <IconLocation />
                </button>
            </div>
            <div class="box"> <button title="Thêm đối tượng" @click="toggleLayerMenu"><IconCirclePlus /></button>
                <div v-if="showAddMenu" class="layer-menu" style="position: absolute; background: white; border: 1px solid #ccc; padding: 5px; margin-top: 5px; z-index: 1001;">
                    <div v-for="layer in editableLayers" :key="layer.layerName" style=" display:flex; justify-content: space-between; padding: 3px; cursor: pointer;" @click="selectAddLayer(layer)">
                        <div class="layer"> {{ layer.title }}</div>
                       <div class="icon">
                        <IconPoint v-if="layer.geometryType === 'Point'" />
                        <IconLine v-else-if="layer.geometryType === 'LineString'" />
                        <IconPolygon v-else-if="layer.geometryType === 'Polygon'" />
                       </div>
                    </div>
                </div>
            </div>
            <div class="box"> <button title="Sửa đối tượng" @click="emitMode('modify')"><IconEdit /></button></div>
            <div class="box"> <button title="Xóa đối tượng" @click="emitMode('delete')"><IconTrash /></button></div>

            <div class="divider"></div>

            <!-- <div class="box"> <button title="Bắt điểm" @click="$emit('mode', 'snap')"></button></div>
            <div class="box"><button title="Xét vùng" @click="$emit('mode', 'box')"></button></div> -->

            <div class="divider"></div>
            <div class="box"> <button title="Thoát" class="exit" @click="toggleMenu"> <IconDoorExit /> </button></div>

        </div>
        <div class="box1" v-show="isOpenSetting">
             <div class="box"> 
                <button title="Hủy biên tập" class="cancel" @click="cancelEdits"><IconCircleX /> <span class="title-setting">Hủy biên tập</span> 
                </button>
            </div>
            <div class="box"> 
                <button title="Lưu kết quả" class="save" @click="saveEdits"><IconDeviceFloppy /> <span class="title-setting">Lưu kết quả</span> 
                </button>
            </div>
        </div>
    </div>

</template>

<script setup>
const emit = defineEmits([ 'add-layer', 'mode', 'save', 'cancel', ]);
import { ref, computed } from 'vue';
import { IconEdit, IconSettings, IconCircleX , IconDeviceFloppy, IconPoint, IconPolygon, IconLine,
IconLocation, IconX, IconCirclePlus, IconTrash, IconDoorExit
 } from '@tabler/icons-vue';
import { useAuthStore } from '@/stores/authStore';

const props = defineProps({
    map: {
        type: Object,
        required: true
    },
    editableLayers: {
        type: Array,
        required: true
    }
});

const authStore = useAuthStore();
const isAuthenticated = computed(() => authStore.isAuthenticated);
console.log('isAuthenticated:', isAuthenticated.value);
// const isAuthenticated = authStore.isAuthenticated;


const isOpen = ref(false);
const isOpenSetting = ref(false);

const showAddMenu = ref(false);

const toggleMenu = () => {
    isOpen.value = !isOpen.value;
    isOpenSetting.value = false;
    console.log('menu biên tập:', isOpen.value);
    
};
const toggleSetting = () => {
    isOpenSetting.value = !isOpenSetting.value;
    showAddMenu.value = false;
    console.log('cài đặt:', isOpenSetting.value);
};

const toggleLayerMenu = () => {
    isOpenSetting.value = false;
    showAddMenu.value = !showAddMenu.value;
    console.log('thêm mới:', showAddMenu.value);
};

const selectAddLayer = (layer) => {
    console.log('Chọn thêm lớp:', layer);
    showAddMenu.value = false;
    emit ('add-layer', layer);
};


const emitMode = (mode) => {
    isOpenSetting.value = false;
    showAddMenu.value = false;
    console.log('Chế độ biên tập:', mode);
    emit('mode', mode);
};
const saveEdits = () => {
    isOpenSetting.value = false;
    console.log('Lưu biên tập');
    if (confirm('Bạn có chắc muốn lưu các thay đổi?')) {
        console.log('Người dùng đã xác nhận lưu thay đổi.');
    } else {
        console.log('Người dùng đã hủy lưu thay đổi.');
        return; // Dừng hàm nếu người dùng hủy
    }
    emit('save' );
};

const cancelEdits = () => {
    isOpenSetting.value = false;
    console.log('Hủy biên tập ');
    emit('cancel');
};



</script>

<style scoped>
.tool-edit {
    position: absolute;
    top: 300px;
    right: 10px;
    z-index: 1000;
}

.edit-menu {
    display: flex;
    position: absolute;
    top: 60px;
    left: 680px;
    gap: 6px;
    background: #fff;
    padding: 5px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, .2);
    z-index: 1000;
}

.box1 {
    /* display: flex; */
    position: absolute;
    top: 100px;
    left: 680px;
    gap: 6px;
    background: #fff;
    padding: 5px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, .2);
    z-index: 1000;
}


button {

    border: none;
    /* background: #f5f5f5; */
    cursor: pointer;
    /* font-size: 18px; */
    padding: 3px;
    border-radius: 4px;
}

button:hover {
    background: #e0e0e0;
}



/* .exit {
    background: #f44336;
    color: white;
} */

.divider {
    height: 1px;
    background: #ccc;
    margin: 4px 0;
}

@media (max-width: 992px) {
    .edit-menu {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 200px;
        left: 680px;
        gap: 6px;
        background: #fff;
        padding: 5px;
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, .2);
        z-index: 1000;
    }

    .box1 {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 200px;
        left: 640px;
        gap: 6px;
        background: #fff;
        padding: 5px;
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, .2);
        z-index: 1000;
    }
}
</style>
