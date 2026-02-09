<template>
    <div class="map-layout">
        <HeaderView class="main-header" />
        <div class="container-map">
            <EditMenu :map="map" :editableLayers="editableLayers" @add-layer="handleAddLayer" @save="handleSave" @cancel="handleCancel"
                @mode="handleMode" />
            <ToolbarMap v-if="map" :map="map" />
            <component v-if="showAttributeForm" :is="currentFormComponent" :modelValue="currentAttrs"
                :showAttributeForm="showAttributeForm" @update:modelValue="handleUpdate"
                @update:showAttributeForm="val => showAttributeForm = val" @apply="handleApplyAttrs" />

            <div class="sidebar">
                <div class="sidebar-left" :style="{ width: isOpen ? '300px' : '0' }">
                    <div class="tab-container">
                        <div @click="activeTab = 'layers'" :class="{ 'active-tab': activeTab === 'layers' }"
                            title="Lớp dữ liệu" class="tab-layer">
                            <IconStackFront class="icon icon-stack-front" /> <span>Lớp dữ liệu</span>
                        </div>
                        <div @click="activeTab = 'legend'" :class="{ 'active-tab': activeTab === 'legend' }"
                            title="Chú giải" class="tab-layer">
                            <IconCalendarDot class="icon icon-calendar-dot" /> <span>Chú giải</span>
                        </div>
                    </div>
                    <hr class="hr" />

                    <div class="tab-content">
                        <!-- LAYERS -->
                        <div v-if="activeTab === 'layers'">

                            <div v-for="item in layerTree" :key="item.title" class="layer-item">
                                <div v-if="item.isGroup" class="layer-group">
                                    <div class="group-header" @click="item.expanded = !item.expanded">
                                        <span class="arrow">
                                            <IconFolderOpen v-if="item.expanded" />
                                            <IconFolder v-else />
                                        </span>
                                        <span>{{ item.title }}</span>

                                    </div>

                                    <div v-show="item.expanded" class="group-content">
                                        <div v-for="layer in item.layers" :key="layer.title" class="layer-child">
                                            <input type="checkbox" v-model="layer.visible"
                                                @change="toggleLayer(layer)" />
                                            {{ layer.title }}
                                            <TableOutlined :style="{ display: layer.visible ? 'inline' : 'none', marginLeft: '20px' }" title="Bảng dữ liệu"/>
                                            <br>

                                            <input type="range" min="0" max="1" step="0.1"
                                                v-model.number="layer.opacity" @input="changeOpacity(layer)"
                                                style="height: 10px; margin-left: 15px;" />
                                            <span>{{ layer.opacity }}</span>
                                        </div>
                                    </div>

                                </div>
                                <div v-else>
                                    <input type="checkbox" v-model="item.visible" @change="toggleLayer(item)" />
                                    {{ item.title }}
                                </div>

                            </div>

                        </div>


                        <div v-if="activeTab === 'legend'">
                            <!-- Nội dung cho tab Chú giải -->
                            <h3>Chú giải bản đồ</h3>
                            
                        </div>
                    </div>

                </div>
                <div class="sidebar-right">
                    <button class="openbtn" @click="openNav" :class="{ rotate: !isOpen }" title="Tắt/Bật Sidebar">
                        <LeftCircleOutlined />
                    </button>
                </div>
            </div>

            <div id="map" class="map">
            </div>
            <!-- <div v-if="showPopup" class="sidebar feature-info-panel">
                <div class="close" @click="showPopup = false"> X </div>
                <div v-for="layer in featureInfo" :key="layer.layerTitle" class="layer-info">
                    <h4>Đối tượng : {{ layer.layerTitle }}</h4>

                    <table>
                        <tr v-for="(value, key) in layer.features[0].properties" :key="key">
                            <td><b>{{ key }}</b> :</td>
                            <td>{{ value }}</td>
                        </tr>
                    </table>
                    <hr />
                </div>

            </div> -->

        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import HeaderView from '@/components/HeaderView.vue';
import ToolbarMap from '@/components/ToolbarMap.vue';
import { LeftCircleOutlined,TableOutlined } from '@ant-design/icons-vue';
import { IconStackFront, IconCalendarDot } from '@tabler/icons-vue';
import { IconFolderOpen, IconFolder } from '@tabler/icons-vue';
import EditMenu from '@/components/EditMenuView.vue';
import { useEditMap, selectStyle } from '@/api/api_edit_map.js';
import { useAuthStore } from '@/stores/authStore';
import { getLayerByPage } from '@/api/layer_config.js';

const editableLayers = getLayerByPage('VanHoaXaHoiView');

import Map from 'ol/Map.js';
import View from 'ol/View.js';
import TileLayer from 'ol/layer/Tile.js';
import { XYZ } from 'ol/source';
import 'ol/ol.css';
import LayerGroup from 'ol/layer/Group.js';
import VectorLayer from 'ol/layer/Vector.js';
import VectorSource from 'ol/source/Vector.js';
import { GeoJSON } from 'ol/format.js';
import { fromLonLat } from 'ol/proj'

import NhaForm from '@/components/forms/NhaForm.vue';
// import CongTrinhYTeForm from '@/components/forms/CongTrinhYTeForm.vue';
// import CongTrinhGiaoDucForm from '@/components/forms/CongTrinhGiaoDucForm.vue';
// import CongTrinhTonGiaoForm from '@/components/forms/CongTrinhTonGiaoForm.vue';
// import NhaVanHoaForm from '@/components/forms/NhaVanHoaForm.vue';

import { sendWFSInsert, fetchWFSFeatures, sendWFSDelete, sendWFSUpdate } from '@/api/api_WFST.js';
 
const authStore = useAuthStore();
const isAuthenticated = computed(() => authStore.isAuthenticated);

import { createWMSLayer } from '@/api/api_geoserver.js';
import { notification } from 'ant-design-vue';

let map = ref(null);
const isOpen = ref(true);
const activeTab = ref('layers');
const layerTree = ref([]);

let editMap = null;

const featureInfo = ref([])
const showPopup = ref(false)
const clickCoordinate = ref(null)

const showAttributeForm = ref(false)
const selectedFeature = ref(null)
const currentAttrs = ref({})


const editMode = ref('select');
const insertQueue = ref([])
const updateQueue = ref([])

const formMap = {
    NhaForm
    // Thêm các ánh xạ khác nếu có
}

const openNav = () => {
    isOpen.value = !isOpen.value;
    // console.log(isOpen.value);
}

const toggleLayer = (item) => {
    console.log(item.layerRef.getVisible());
    console.log(item.visible);
    item.layerRef.setVisible(item.visible);
    console.log(item.layerRef.getVisible());
};

const changeOpacity = (item) => {
    item.layerRef.setOpacity(item.opacity);
    console.log(item.layerRef.getOpacity());
};

const googleRoadmap = new TileLayer({
    title: 'GoogleMap',
    isBaseLayer: true,
    visible: true,
    source: new XYZ({
        url: 'https://mt1.google.com/vt/lyrs=r&x={x}&y={y}&z={z}',
        maxZoom: 20
    }),
});

const googleSatellite = new TileLayer({
    title: 'Vệ tinh',
    isBaseLayer: true,
    visible: false,
    source: new XYZ({
        url: 'https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',
        maxZoom: 20
    }),
});

const googleHybrid = new TileLayer({
    title: 'Không nền',
    isBaseLayer: true,
    visible: false,
    source: new XYZ({
        url: '',
        // https://mt1.google.com/vt/lyrs=h&x={x}&y={y}&z={z}
        maxZoom: 20
    }),
});


// const vanHoaXaHoi = new LayerGroup({
//     title: 'Văn hóa xã hội',
//     isBaseLayers: false,
//     layers: [
//         createWMSLayer({ layerName: 'cong_trinh_giao_duc', title: 'Công trình giáo dục', visible: true }),
//         createWMSLayer({ layerName: 'nha_van_hoa', title: 'Nhà văn hóa', visible: false }),
//         createWMSLayer({ layerName: 'cong_trinh_ton_giao', title: 'Công trình tôn giáo', visible: false }),
//         createWMSLayer({ layerName: 'cong_trinh_y_te', title: 'Công trình y tế', visible: false }),
//         createWMSLayer({ layerName: 'nha', title: 'Nhà', visible: true }),
//     ]
// })

const ranhGioi = new LayerGroup({
    title: 'Ranh giới hành chính',
    isBaseLayers: false,
    layers: [
        createWMSLayer({ layerName: 'duong_dia_gioi_hanh_chinh', title: 'Đường địa giới hành chính', visible: true }),
        createWMSLayer({ layerName: 'dia_phan_hanh_chinh', title: 'Địa phận hành chính', visible: false }),
        createWMSLayer({ layerName: 'tru_so_co_quan_nha_nuoc', title: 'Ủy ban nhân dân', visible: false }),
    ]
})

// Lấy lớp từ bản đồ theo nhóm
const getLayerTree = (map) => {
    console.log(map.getLayers().getArray());
    return map.getLayers().getArray()
        .filter(layer =>
            layer instanceof LayerGroup &&
            !layer.get('isBaseLayers')
        )
        .map(group => ({
            title: group.get('title'),
            isGroup: true,
            expanded: true,
            layers: group.getLayers().getArray().map(l => ({
                title: l.get('title'),
                visible: l.getVisible(),
                opacity: l.getOpacity(),
                layerRef: l,
            })),
        }));
};

// lưu tạm thời trên ram
const editSource = new VectorSource({
    // url: 'http://localhost:8080/geoserver/thutri/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=thutri%3Anha&outputFormat=application%2Fjson',
    format: new GeoJSON()
}
);



const editLayer = new VectorLayer({
    // background: 'white',
    source: editSource,
    style: null
});


const getFeatureInfo = async (evt) => {
    const view = map.value.getView()
    const resolution = view.getResolution()
    const projection = view.getProjection()

    const layers = map.value.getLayers().getArray()

    for (const group of layers) {
        if (!(group instanceof LayerGroup)) continue

        for (const layer of group.getLayers().getArray()) {
            if (!layer.getVisible()) continue
            if (!layer.getSource()?.getFeatureInfoUrl) continue

            const url = layer.getSource().getFeatureInfoUrl(
                evt.coordinate,
                resolution,
                projection,
                { INFO_FORMAT: 'application/json' }
            )

            if (!url) continue

            const res = await fetch(url)
            const json = await res.json()

            if (json.features?.length) {
                return {
                    layerName: layer.getSource().getParams().LAYERS.split(':').pop(),
                    fid: json.features[0].id
                }
            }
        }
    }
    return null
}



const createMap = async () => {
    map.value = new Map({
        target: 'map',
        layers: [
            googleRoadmap,
            googleSatellite,
            googleHybrid,
            ranhGioi,
            // vanHoaXaHoi,
            editLayer
        ],
        view: new View({
            projection: 'EPSG:3857',
            center: fromLonLat([106.25853830720988, 20.489806531567343]),
            zoom: 14,
        })
    });
    map.value.on('singleclick', async (evt) => {
        featureInfo.value = []
        showPopup.value = false
        clickCoordinate.value = evt.coordinate //lấy tọa độ

        const result = await getFeatureInfo(evt)
        if (!result) return

        const { layerName, fid } = result
        console.log('Feature info:', result)
        console.log('FID:', fid)


        const layerConfig = editableLayers.find(l => l.layerName === layerName)
        if (!layerConfig) return

        currentEditLayer.value = layerConfig
        await loadEditFeatures(layerName)

        const feature = editSource.getFeatures().find(f =>
            f.getId() === fid || String(f.getId()) === String(fid)
        )
        console.log('Tìm thấy feature:', feature)
        feature.setStyle(selectStyle)
        if (editMode.value === 'select') {
            handleSelect(feature)
        }
        else if (editMode.value === 'modify') {
            editMap.clearInteractions()
            editMap.enableSelect(handleSelect)
            editMap.enableModify(geometryModify)

            editMap.selectFeature(feature)
            handleModify(feature)
        } else if (editMode.value === 'delete') {
            console.log('2')
            handleDelete(feature)
        }
    })
    map.value.addLayer(editLayer);
};

const setWMSLayerVisible = (layerName, visible) => {
    const groups = map.value.getLayers().getArray()
    groups.forEach(group => {
        if (!(group instanceof LayerGroup)) return
        group.getLayers().getArray().forEach(layer => {
            const lname = layer.getSource()?.getParams?.().LAYERS?.split(':').pop()
            if (lname === layerName) layer.setVisible(visible)
        })
    })
}


const reloadWMSLayer = (layerName) => {
    const groups = map.value.getLayers().getArray()

    groups.forEach(group => {
        if (!(group instanceof LayerGroup)) return

        group.getLayers().getArray().forEach(layer => {
            if (layer.getSource()?.getParams &&
                layer.getSource().getParams().LAYERS.endsWith(layerName)) {

                const params = layer.getSource().getParams()
                layer.getSource().updateParams({
                    ...params,
                    _t: Date.now() // ép reload
                })
            }
        })
    })
}

const currentEditLayer = ref(null);

//---------------------chọn đối tượng ------------------
const handleMode = async (mode) => {
    console.log('Chế độ biên tập được chọn:', mode)

    editMode.value = mode
    showAttributeForm.value = false
    selectedFeature.value = null

    if (!currentEditLayer.value) return

    // await loadEditFeatures(currentEditLayer.value.layerName)

    editMap.clearInteractions()

    editMap.enableSelect(handleSelect)

    if (mode === 'modify') {
        editMap.enableModify(geometryModify)
    } else if (mode === 'delete') {
        // Không cần thêm tương tác nào khác
    }

}

const loadEditFeatures = async (layerName) => {
    editSource.clear()

    const geojson = await fetchWFSFeatures('thutri', layerName)

    const features = new GeoJSON().readFeatures(geojson, {
        dataProjection: 'EPSG:4326',      // CRS của WFS từ GeoServer
        featureProjection: 'EPSG:3857'
    })

    features.forEach(f => {
        const fid = f.getId()
        if (!fid && f.get('id')) f.setId(f.get('id'))
    })

    editSource.addFeatures(features)
}

const handleSelect = (feature) => {
    if (!feature) return

    selectedFeature.value = feature
    console.log('feature', feature)

    const { geometry, geom, ...attrs } = feature.getProperties()
    currentAttrs.value = attrs
    showAttributeForm.value = true
    feature.setStyle(selectStyle)
    console.log('Đối tượng được chọn:', feature.getId());
}



// -----------------        Thêm đối tượng------------------

const handleAddLayer = async (layer) => {
    if (!editMap) return;
    console.log('layer được chọn:', layer);

    currentEditLayer.value = layer;
    // editMap.clearInteractions()
    // await loadEditFeatures(layer.layerName)
    editMap.enableDraw(layer.geometryType, (feature) => {
        console.log('Đã vẽ đối tượng mới:', feature);
        selectedFeature.value = feature;
        showAttributeForm.value = true;
        insertQueue.value.push(feature);
    }, handleSelect);
};

const currentFormComponent = computed(() => {
    return formMap[currentEditLayer.value?.form]
})

const handleApplyAttrs = () => {
    if (!selectedFeature.value) return
    console.log('Áp dụng thuộc tính cho đối tượng:', selectedFeature.value.getId())
    console.log('Thuộc tính hiện tại:', currentAttrs.value)
    Object.entries(currentAttrs.value).forEach(([key, val]) => {
        selectedFeature.value.set(key, val)
    })
    console.log('Đã áp dụng thuộc tính cho đối tượng:', selectedFeature.value.getId())

    if (!insertQueue.value.includes(selectedFeature.value) &&
        !updateQueue.value.includes(selectedFeature.value)
    ) {
        updateQueue.value.push(selectedFeature.value)
    }

    showAttributeForm.value = false
}


const handleSave = async () => {

    try {
        for (const feature of insertQueue.value) {
            Object.entries(currentAttrs.value).forEach(([key, value]) => {
                feature.set(key, value)
            })
            await sendWFSInsert(
                feature,
                currentEditLayer.value.layerName
            )
        }
        insertQueue.value = []

        for (const feature of updateQueue.value) {
            await sendWFSUpdate(
                feature,
                currentEditLayer.value.layerName
            )
        }
        updateQueue.value = []

        showAttributeForm.value = false
        currentAttrs.value = {}
        selectedFeature.value = null

        reloadWMSLayer(currentEditLayer.value.layerName)
        await loadEditFeatures(currentEditLayer.value.layerName)

        alert(' Lưu dữ liệu thành công')
    } catch (err) {
        console.error(err)
        alert('❌ Lỗi khi lưu dữ liệu')
    }


}
const handleUpdate = (attrs) => {
    currentAttrs.value = attrs
    console.log('Cập nhật thuộc tính từ form:', attrs)
}

const handleCancel = () => {
    if (selectedFeature.value) {
        editSource.removeFeature(selectedFeature.value)
    }
    selectedFeature.value = null
    showAttributeForm.value = false
    // editMap.clearInteractions()
}

watch(currentEditLayer, (val) => {
    console.log('currentEditLayer:', val)
    console.log('form:', val?.form)
})

//------------------chỉnh sửa đối tượng ------------------
const geometryModify = (feature) => {
    if (!feature) return
    if (updateQueue.value.includes(feature)) { }
    updateQueue.value.push(feature);
    console.log('Update Queue:', updateQueue.value.length);
    // feature.setStyle(selectStyle)
}
const handleModify = (feature) => {
    if (!feature) return

    selectedFeature.value = feature;

    const { geometry, geom, ...attrs } = feature.getProperties()
    currentAttrs.value = attrs
    showAttributeForm.value = true

    feature.setStyle(selectStyle)


}

//------------------Xóa đối tượng ------------------
const handleDelete = async (feature) => {
    if (!feature) return

    const fid = feature.getId()
    console.log('Xóa đối tượng với FID:', fid)

    if (!confirm('Bạn có chắc chắn muốn xóa đối tượng này không?')) {
        return;
    }

    try {
        console.log('5')
        await sendWFSDelete(
            feature,
            currentEditLayer.value.layerName
        )
        editSource.removeFeature(feature)
        alert('✅ Xóa đối tượng thành công')
        // reload layer
        reloadWMSLayer(currentEditLayer.value.layerName)
    } catch (err) {
        console.error(err)
        alert('❌ Lỗi khi xóa đối tượng')
    }

}


onMounted(() => {
    createMap();
    layerTree.value = getLayerTree(map.value);
    console.log(map.value.getLayers().getArray());

    editMap = useEditMap(map.value, editSource, editLayer);
    editMap.enableSelect(handleSelect);

    console.log("VanHoaXaHoiView mounted");
});
</script>

<style scoped>
.map-layout {
    width: 100%;
    height: 100vh;
    background-color: white;
}

.main-header {
    height: 50px;
}

#map {
    width: 100%;
    height: 100%;
}


.container-map {
    position: relative;
    /* margin-top: 50px; */
    width: 100%;
    height: 100%;
    background-color: #f0f0f0;
    display: flex;
    /*justify-content: center;
    align-items: center; */
}

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

.layer-group {
    margin-bottom: 10px;
}

.group-header {
    display: flex;
    /* justify-content: space-between; */
    align-items: center;
    background: #f3f6fa;
    padding: 8px 10px;
    font-weight: 600;
    cursor: pointer;
    border-radius: 4px;
}

.group-header:hover {
    background: #e6edf7;
}

.group-content {
    padding-left: 10px;
    margin-top: 5px;
}

.layer-child {
    margin-bottom: 6px;
}

.arrow {
    margin-right: 8px;
    font-size: 12px;
}



#map {
    width: 100%;

}

.group-content {
    margin-left: 15px;
}

.feature-info-panel {
    display: inline-block;
    position: absolute;
    top: 50px;
    right: 10px;
    width: 300px;
    /* max-height: 400px; */
    /* overflow-y: auto; */
    background: white;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    z-index: 1000;
    overflow-y: scroll;

}
</style>