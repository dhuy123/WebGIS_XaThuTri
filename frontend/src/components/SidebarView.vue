<template>
    <div class="sidebar">
        <div class="sidebar-left" :style="{ width: isOpen ? '300px' : '0' }">
            <div class="tab-container">
                <div @click="activeTab = 'layers'" :class="{ 'active-tab': activeTab === 'layers' }" title="Lớp dữ liệu"
                    class="tab-layer">
                    <IconStackFront class="icon icon-stack-front" /> <span>Lớp dữ liệu</span>
                </div>
                <div @click="activeTab = 'legend'" :class="{ 'active-tab': activeTab === 'legend' }" title="Chú giải"
                    class="tab-layer">
                    <IconCalendarDot class="icon icon-calendar-dot" /> <span>Chú giải</span>
                </div>
            </div>
            <hr class="hr" />

            <div class="tab-content">
                <!-- LAYERS -->
                <div v-if="activeTab === 'layers'">
                    <a-directory-tree checkable :tree-data="treeData" :checked-keys="checkedKeys" @check="onCheck">
                        <template #title="{ title, key }">
                            <div class="layer-row">
                                <span>{{ title }}</span>

                                <input type="range" min="0" max="1" step="0.1" :value="getOpacity(key)"
                                    @input="onOpacityChange(key, $event)" />
                            </div>
                        </template>
                    </a-directory-tree>
                </div>

                <div v-if="activeTab === 'legend'">
                    <!-- Nội dung cho tab Chú giải -->
                    <h3>Chú giải bản đồ</h3>
                    <ul>
                        <li><span style="color: blue;">●</span> Đường giao thông</li>
                        <li><span style="color: green;">■</span> Khu vực xanh</li>
                        <li><span style="color: red;">▲</span> Cơ sở hạ tầng</li>
                        <li>...</li>
                    </ul>
                </div>
            </div>

        </div>
        <div class="sidebar-right">
            <button class="openbtn" @click="openNav" :class="{ rotate: !isOpen }" title="Tắt/Bật Sidebar">
                <LeftCircleOutlined />
            </button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from 'vue';
import { onMounted } from 'vue';
import { LeftCircleOutlined, AppleOutlined, AndroidOutlined } from '@ant-design/icons-vue';
import { IconStackFront, IconCalendarDot } from '@tabler/icons-vue';

const isOpen = ref(true);
const activeTab = ref('layers');

const openNav = () => {
    isOpen.value = !isOpen.value;
}

const props = defineProps({
    layers: Array
})

const emit = defineEmits(['toggle-layer', 'change-opacity'])

const treeData = computed(() =>
    props.layers.map(l => ({
        key: l.key,
        title: l.title,
    }))
)

/* ===== checked keys ===== */
const checkedKeys = ref([])

watch(
    () => props.layers,
    layers => {
        checkedKeys.value = layers
            .filter(l => l.visible) // lọc các lớp có thuộc tính visible là true
            .map(l => l.key) // lấy key của các lớp đã được lọc
    },
    { immediate: true }
)

/* ===== bật / tắt ===== */
const onCheck = keys => {
    console.log('Checked keys:', keys);
    props.layers.forEach(layer => {
        emit('toggle-layer', layer.key, keys.includes(layer.key))
    })
}

/* ===== opacity ===== */
const getOpacity = key => {
    const layer = props.layers.find(l => l.key === key)
    return layer ? layer.opacity : 1
}

const onOpacityChange = (key, e) => {
    emit('change-opacity', key, Number(e.target.value))
}

onMounted(() => {
    console.log("SidebarView mounted");
});
</script>

<style scoped>
.sidebar {
    position: fixed;
    top: 50px;
    left: 0;
    height: calc(100% - 50px);
    display: flex;
    z-index: 100;
}

/* LEFT */
.sidebar-left {
    background-color: white;
    overflow-x: hidden;
    transition: width 0.3s ease;
}

.sidebar-left a {
    display: block;
    padding: 10px 20px;
    color: #818181;
    font-size: 18px;
}

.sidebar-left a:hover {
    color: #fff;
}

/* RIGHT */
.sidebar-right {
    display: flex;
    align-items: flex-start;
    padding: 10px 0;
    background: transparent;
}


.openbtn {
    font-size: 30px;
    /* background: #111; */
    color: rgb(9, 213, 1);
    border: none;
    cursor: pointer;
}

.rotate {
    transform: rotate(180deg);
}

.openbtn:hover {
    color: #036513;
    font-size: 35px;
}


.tab-container {
    display: flex;
    justify-content: flex-start;
    gap: 20px;
}

.tab-container .tab-layer {
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    padding: 10px;
    border-radius: 5px;
}

.active-tab {
    background-color: #207cde;
    color: white;
    padding: 10px;
}

.hr {
    background-color: rgb(107, 107, 107);
    width: 100%;
    height: 2px;
    border: none;
}

/* @media (max-width: 992px) {
    .sidebar-left {
        width: 200px ;
    }

    .sidebar-left a {
        display: block;
        padding: 10px 20px;
        color: #818181;
        font-size: 18px;
    }

    .sidebar-left a:hover {
        color: #fff;
    }

    .sidebar-right {
        display: flex;
        align-items: flex-start;
        padding: 10px 0;
        background: transparent;
    }


    .openbtn {
        font-size: 30px;
        color: rgb(9, 213, 1);
        border: none;
        cursor: pointer;
    }

    .rotate {
        transform: rotate(180deg);
    }

    .openbtn:hover {
        color: #036513;
        font-size: 35px;
    }



    .tab-container span {
        display: none;
    }
} */
</style>