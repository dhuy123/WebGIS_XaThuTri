<template>
    <div class="table-panel" :class="{ fullscreen }">
        <div class="table-panel__header">
            <div class="title">
                Bảng dữ liệu: {{ layer.title }}
            </div>

            <div class="actions">
                <a-button @click="showAttributeForm = true" title="Lọc dữ liệu">
                    <IconFilter />
                </a-button>
                <a-button @click="exportCSV" :disabled="rows.length === 0">Xuất CSV</a-button>
                <a-button @click="$emit('toggleFullscreen')">
                    <FullscreenOutlined v-if="!fullscreen" title="Phóng to" />
                    <FullscreenExitOutlined v-else title="Thu nhỏ" />
                </a-button>

                <a-button black :style="{ border: 'none', }" @click="$emit('close')" title="Đóng">
                    <CloseOutlined />
                </a-button>
            </div>
        </div>

        <a-table class="table" :columns="columns" :data-source="filteredRows" :loading="loading"
            :pagination="pagination" @change="handleTableChange"
            :scroll=" { y: fullscreen ? 'calc(100vh - 210px)' : 180, x: 1500 }">
            <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'zoom'">
                    <a-button type="link" @click="zoomToFeature(record._feature)">
                        <IconMapPin />
                    </a-button>
                </template>
            </template>
        </a-table>
    </div>

    <!-- form lọc -->
    <div class="form-panel" v-if="showAttributeForm">
        <div class="close" @click="showAttributeForm = false"> <button>X</button> </div>
        <div class="content">
            <h3>Lọc dữ liệu</h3>
            <div class="box"> <label>Mã đối tượng </label>
                <input v-model="form.ma_doi_tuong" />
            </div>

            <div class="box"><label>Hiện trạng</label>
                <input v-model="form.loai_hien_trang" />
            </div>

            <div class="box">
                <label>Ngày tạo</label>
                <input type="date" v-model="form.created_at" />
            </div>
            <div class="box">
                <label>Ngày cập nhật</label>
                <input type="date" v-model="form.updated_at" />
            </div>

        </div>

        <div class="actions">
            <button @click="applyFilter"> Tìm kiếm </button>
            <button type="button" @click="resetFilter">Xóa lọc</button>
        </div>

    </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { message } from 'ant-design-vue'
import { FullscreenExitOutlined, FullscreenOutlined, CloseOutlined } from '@ant-design/icons-vue'
import { IconMapPin, IconFilter } from '@tabler/icons-vue'
import { fetchWFSFeatures } from '@/api/api_WFST'
import { editableLayers } from '@/api/layer_config';
import GeoJSON from 'ol/format/GeoJSON';

const emit = defineEmits(['close', 'toggleFullscreen'])

const props = defineProps({
    layer: { type: Object, required: true },
    fullscreen: { type: Boolean, default: false },
    map: { type: Object, required: false },
})

const showAttributeForm = ref(false)
const form = ref({
    ma_doi_tuong: '',
    loai_hien_trang: '',
    created_at: '',
    updated_at: '',
})

const currentCQL = ref('');

const keyword = ref('')
const loading = ref(false)
const rows = ref([])      // list row objects
const columns = ref([])
// ant columns
const getLayerConfig = (layerName) => {
    return editableLayers.find(l => l.layerName === layerName);
};

const getColumnsByLayer = (layerName) => {
    const cfg = getLayerConfig(layerName);

    return cfg?.columns || [];
};

const pagination = ref({
    current: 1,
    pageSize: 200,
    total: 0,
    showSizeChanger: true,
    pageSizeOptions: ['10', '20', '50', '100', '200', '500'],
    showTotal: (total) => `Tổng ${total} mục`,
});


const handleTableChange = (pager) => {
    pagination.value.current = pager.current;
    pagination.value.pageSize = pager.pageSize;
    loadWfs(); // gọi lại theo trang mới
};



const loadWfs = async () => {
    if (!props.layer) return
    console.log('Tải dữ liệu WFS cho lớp:', props.layer.layerName)
    loading.value = true
    try {
        const data = await fetchWFSFeatures('thutri', props.layer.layerName, {
            cqlFilter: currentCQL.value
        })
        console.log('Dữ liệu WFS nhận được:', data)
        if (!data || !data.features) throw new Error('Dữ liệu WFS không hợp lệ')

        // Parse rows
        rows.value = data.features.map((f, i) => ({
            _id: f.id || i,
            ...f.properties,
            _feature: f,
        })
        )

        console.log('Dữ liệu bảng đã phân tích:', rows.value)

        columns.value = getColumnsByLayer(props.layer.layerName);
        console.log('Cột bảng:', columns.value)

    } catch (e) {
        console.error(e)
        message.error('Không tải được dữ liệu WFS')
        rows.value = []
        columns.value = []
    } finally {
        loading.value = false
    }
}

const zoomToFeature = (geojsonFeature) => {
    console.log('Zoom tới đối tượng:', geojsonFeature);
    if (!props.map) return;
    console.log('Bản đồ hiện tại:', props.map);
    if (!geojsonFeature?.geometry) return;

    const olFeature = new GeoJSON().readFeature(geojsonFeature, {
        dataProjection: 'EPSG:4326',     // CRS WFS trả về (do bạn set srsName=3857)
        featureProjection: 'EPSG:3857'   // CRS map
    });

    const geom = olFeature.getGeometry();
    if (!geom) return;

    // Point thì animate center + zoom
    if (geom.getType() === 'Point') {
        props.map.getView().animate({
            center: geom.getCoordinates(),
            zoom: 18,
            duration: 500
        });
        return;
    }

    // Line/Polygon thì fit extent
    props.map.getView().fit(geom.getExtent(), {
        duration: 600,
        padding: [40, 40, 40, 40],
        maxZoom: 20
    });
};


watch(() => props.layer, loadWfs, { immediate: true })

const filteredRows = computed(() => {
    const q = keyword.value.trim().toLowerCase()
    if (!q) return rows.value
    return rows.value.filter(r =>
        Object.values(r).some(v => String(v ?? '').toLowerCase().includes(q))
    )
})

const exportCSV = () => {
    if (!rows.value.length) return
    const keys = columns.value.map(c => c.dataIndex)

    const esc = (v) => `"${String(v ?? '').replaceAll('"', '""')}"`
    const csv = [
        keys.join(','),
        ...filteredRows.value.map(r => keys.map(k => esc(r[k])).join(',')),
    ].join('\n')

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${props.layer.layerName || 'layer'}_data.csv`
    a.click()
    URL.revokeObjectURL(url)
}

const esc = (s) => String(s).replaceAll("'", "''");

const formatDay = (field, date) => {
    if (!date) return '';
    const from = `${date}T00:00:00`;
    const to = `${date}T23:59:59`;

    return `${field} BETWEEN "${from}" AND "${to}"`;
};

const formatString = () => {
    const parts = [];

    if (form.value.ma_doi_tuong?.trim()) {
        parts.push(`ma_doi_tuong LIKE '%${esc(form.value.ma_doi_tuong.trim())}%'`);
    }

    if (form.value.loai_hien_trang) {
        parts.push(`loai_hien_trang = '${esc(form.value.loai_hien_trang)}'`);
    }

    if (form.value.created_at) {
        parts.push(
            `created_at BETWEEN '${form.value.created_at}T00:00:00' AND '${form.value.created_at}T23:59:59'`
        );
    }

    if (form.value.updated_at) {
        parts.push(
            `updated_at BETWEEN '${form.value.updated_at}T00:00:00' AND '${form.value.updated_at}T23:59:59'`
        );
    }

    return parts.join(' AND ');
}

const applyFilter = async () => {
    currentCQL.value = formatString();

    await loadWfs();
}

const resetFilter = async () => {
    form.value = {
        ma_doi_tuong: '',
        loai_hien_trang: '',
        created_at: '',
        updated_at: '',
    };
    currentCQL.value = '';

    await loadWfs();
}



</script>

<style scoped>
.table-panel {
    height: 340px;
    width: calc(100% - 300px);
    border-top: 1px solid #e5e5e5;
    background: #fff;
    display: flex;
    flex-direction: column;
    position: absolute;
    /* left: 0; */
    right: 0;
    bottom: 0;
    box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.15);
    z-index: 999;
    overflow: hidden;
}

.table-panel.fullscreen {
    position: fixed;
    /* left: 0; */
    right: 0;
    bottom: 0;
    top: 50px;
    z-index: 9999;
    height: auto;
    overflow: hidden;

}

.table-panel__header {
    padding: 10px 12px;
    display: flex;
    gap: 12px;
    align-items: center;
    justify-content: space-between;
}

.actions {
    display: flex;
    gap: 8px;
    align-items: center;
}

.table {
    flex: 1;
    min-height: 0;
}

/* form lọc */
.form-panel {
    position: absolute;
    top: 218px;
    left: 150px;
    transform: translate(-50%, -25%);
    background: #fff;
    /* border-radius: 6px; */
    padding: 20px;
    /* margin-left: 20px; */
    /* box-shadow: 0 2px 8px rgba(0, 0, 0, .2); */
    z-index: 3000;
    width: 300px;
    height: 680px;
    /* overflow-y: auto; */
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

@media screen and (max-width: 768px) {
    .table-panel {
        width: 100%;
        height: 300px;
        bottom: 0;
        right: 0;
    }

    .table-panel.fullscreen {
        top: 50px;
        height: calc(100% - 50px);
    }
}
</style>
