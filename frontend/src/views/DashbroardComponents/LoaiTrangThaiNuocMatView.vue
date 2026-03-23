<template>
    <div class="container1">
        <div class="content-document">
            <div class="tile-document">
                <h1>THÔNG TIN LOẠI HIỆN TRẠNG </h1>
            </div>
            <hr />

            <div class="main-document">
                <div class="search">
                    <button style="background-color: green; color: white; border: 0; border-radius: 5px; "
                        @click="showModel"> Thêm mới
                    </button>
                    <div class="search1">
                        <a-input v-model:value="searchKeyword" placeholder="Nhập mã hoặc tên hiện trạng"
                            style="width: 220px" @pressEnter="onSearch" />
                        <a-button type="primary" @click="onSearch">Tìm</a-button>
                        <a-button @click="onReset" :loading="loading">Reset</a-button>
                    </div>
                </div>

                <div class="box box-document">
                    <a-table class="table" :columns="columns" :data-source="datalist" :scroll="{ x: '400px', y: 460 }"
                        :row-key="record => record.id" :loading="loading" :pagination="pagination"
                        @change="handleTableChange" :style="{ margin: 0, padding: 0 }">

                        <template #bodyCell="{ column, text, record }">
                            <!-- <template v-if="column.dataIndex === 'stt'">
                                {{ record.index + 1 }}
                            </template> -->
                            <template v-if="['ten_hien_trang', 'mo_ta'].includes(column.dataIndex)">
                                <div>
                                    <a-input v-if="editableData[record.id]"
                                        v-model:value="editableData[record.id][column.dataIndex]"
                                        style="margin: -5px 0" />
                                    <template v-else>
                                        {{ text }}
                                    </template>
                                </div>
                            </template>
                            <!-- thao tác -->
                            <template v-else-if="column.dataIndex === 'actions'">
                                <div class="operations" :style="{ display: 'flex', alignItems: 'center', justifyContent: 'center' }">
                                    <div class="editable-row-operations">
                                        <span v-if="editableData[record.id]">
                                            <a-typography-link @click="save(record.id)">Save</a-typography-link>
                                            <a-popconfirm title="Sure to cancel?" @confirm="cancel(record.id)">
                                                <a>Cancel</a>
                                            </a-popconfirm>
                                        </span>
                                        <span v-else>
                                            <a @click="edit(record.id)">
                                                <EditOutlined :style="{ fontSize: '24px', color: '#08c' }"
                                                    title="Chỉnh sửa" />
                                            </a>
                                        </span>
                                    </div>
                                    <div class="operations-delete">
                                        <a @click="detete(record.id)" style="color: red; margin-left: 10px;">
                                            <DeleteOutlined title="Xóa" :style="{fontSize: '24px', color: 'red'}" />
                                        </a>
                                    </div>
                                </div>
                            </template>
                        </template>

                    </a-table>
                </div>

            </div>
        </div>
    </div>

    <!-- model thêm mới  -->
    <div class="model-add">
        <a-modal v-model:open="openModel" title="Thêm mới loại hiện trạng" width="600px" :footer="null">
            <a-form :model="formModel" v-bind="layout" @finish="handleAdd">
                <a-form-item name="ma_hien_trang" label="Mã hiện trạng"
                    :rules="[{ required: true, message: 'Vui lòng nhập mã hiện trạng!' }]">
                    <a-auto-complete v-model:value="formModel.ma_hien_trang" :options="dataNhomDoiTuong"
                        placeholder="Chọn hoặc nhập mã hiện trạng" />
                </a-form-item>
                <a-form-item name="ten_hien_trang" label="Tên hiện trạng"
                    :rules="[{ required: true, message: 'Vui lòng nhập tên hiện trạng!' }]">
                    <a-input v-model:value="formModel.ten_hien_trang" placeholder="Nhập tên hiện trạng" />
                </a-form-item>
                <a-form-item name="mo_ta" label="Mô tả">
                    <a-input v-model:value="formModel.mo_ta" placeholder="Nhập mô tả" />
                </a-form-item>
                <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
                    <a-button type="primary" html-type="submit">Thêm mới</a-button>
                </a-form-item>
            </a-form>
        </a-modal>
    </div>

</template>
<script setup>
import { computed, onMounted, reactive, ref } from 'vue';
import { getTrangThaiNuocMat, updateById, createLoaiHienTrang, deleteById, searchTrangThaiNuocMat } from '@/api/api_loai_trang_trang_thai_mat_nuoc';
import { Alert, message } from 'ant-design-vue';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons-vue';

const datalist = ref([]);
const dataNhomDoiTuong = ref([]);
const editableData = reactive({});

const current = ref(1);
const pageSize = ref(10);
const total = ref(0);
const loading = ref(false);
const totalPage = ref(0);

const openModel = ref(false);

const columns = [
    {
        title: 'STT',
        dataIndex: 'stt',
        customRender: ({ index }) => index + 1,
        width: '5%',
        align: 'center',
    },
    {
        title: 'Tên trạng thái',
        dataIndex: 'ten',
        width: '10%',
        align: 'center',
    },
    {
        title: 'Mô tả',
        dataIndex: 'mo_ta',
    },
    {
        title: 'Thời gian tạo',
        dataIndex: 'created_at',
        customRender: ({ text }) => formatDate(text),
        width: '12%',
        align: 'center',
    },
    {
        title: 'Thời gian cập nhật',
        dataIndex: 'updated_at',
        customRender: ({ text }) => formatDate(text),
        width: '15%',
        align: 'center',
    },
    {
        title: 'Thao tác',
        dataIndex: 'actions',
        width: '17%',
        align: 'center',
    },
];

const formModel = reactive({
    ma_hien_trang: '',
    ten_hien_trang: '',
    mo_ta: '',
});

const searchKeyword = ref('');

const formatDate = (data) => {
    const date = new Date(data).toLocaleDateString();
    // console.log('Formatting date:', date);
    return date;
}

const fetchData = async (page = current.value, limit = pageSize.value) => {
    try {
        loading.value = true;
        const response = await getTrangThaiNuocMat(page, limit);
        datalist.value = response.data.data;
        console.log('Datalist:', datalist.value);
        // console.log('Total records:', response.data.total);
        total.value = response.data.total;
        loading.value = false;
        current.value = page;
        pageSize.value = limit;
        totalPage.value = Math.ceil(total.value / pageSize.value);
        console.log('Total pages:', totalPage.value);
        console.log('Current page:', current.value);
        console.log('Page size:', pageSize.value);
        // message.success('Dữ liệu đã được tải thành công');
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

const pagination = computed(() => ({
    total: total.value,
    current: current.value,
    pageSize: pageSize.value,
    showSizeChanger: true,
}));
const handleTableChange = (pagination) => {
    console.log('Table pagination changed:', pagination);
    current.value = pagination.current;
    pageSize.value = pagination.pageSize;
    searchLoaiHienTrang(current.value, pageSize.value);
    fetchData(current.value, pageSize.value);
};

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};

const showModel = () => {
    formModel.ma_doi_tuong = ''
    formModel.ten_doi_tuong = ''
    formModel.nhom_doi_tuong = ''
    openModel.value = true
};

// const fetchNhom = async () => {
//     try {
//         const response = await getAllNhomDoiTuong();
//         console.log('Response nhóm đối tượng:', response.data);
//         dataNhomDoiTuong.value = response.data.map(item => ({
//             value: item.nhom_doi_tuong,
//             label: item.nhom_doi_tuong,
//         }));
//         console.log('dataNhomDoiTuong:', dataNhomDoiTuong.value);
//     } catch (error) {
//         console.error('Lỗi lấy danh sách nhóm đối tượng:', error);
//     }
// }

const handleAdd = async (data) => {
    try {
        console.log('form data to add:', data);
        await createLoaiHienTrang(data);
        message.success('Thêm mới loại hiện trạng thành công');
        openModel.value = false;
        await fetchData(current.value, pageSize.value);
    } catch (error) {
        console.error('Lỗi khi thêm mới loại hiện trạng:', error);
    }
};

const edit = (id) => {
    console.log('Editing id:', id);
    const record = datalist.value.find(item => item.id === id);
    editableData[id] = { ...record };
    console.log('Editing record:', editableData[id]);
};

const save = async (id) => {
    try {
        console.log('Saving id:', id);
        const data = editableData[id];
        console.log('Data to save:', data);
        const updatedRecord = await updateById(id, data);
        console.log('Updated record from API:', updatedRecord);
        message.success('Cập nhật dữ liệu thành công');
        delete editableData[id];
        await fetchData(current.value, pageSize.value);
    }
    catch (error) {
        console.error('Lỗi cập nhật dữ liệu:', error);
    }
}

const cancel = (id) => {
    delete editableData[id];
}

const detete = async (id) => {
    try {
        if (!confirm(`Bạn có chắc chắn muốn xóa loại đối tượng ${id} này không?`)) {
            return;
        }
        await deleteById(id);
        message.success('Xóa loại đối tượng thành công');
        await fetchData(current.value, pageSize.value);
    } catch (error) {
        console.error('Lỗi khi xóa loại đối tượng:', error);
    }
}

const searchLoaiHienTrang = async (page = current.value, limit = pageSize.value) => {
    try {
        loading.value = true;
        const query = searchKeyword.value;
        console.log('Search query:', query);
        const response = await searchLoaiHienTrang1(searchKeyword.value, page, limit);
        console.log('Search API response:', response.data);
        datalist.value = response.data.data;
        total.value = response.data.total;
        loading.value = false;
        console.log('Search results:', datalist.value);
    } catch (error) {
        console.error('Lỗi khi tìm kiếm loại đối tượng:', error);
    }
};

const onSearch = async () => {
    console.log('Search model:', searchKeyword.value);
    current.value = 1;
    await searchLoaiHienTrang(current.value, pageSize.value);
};

const onReset = async () => {
    searchKeyword.value = '';
    current.value = 1;
    await fetchData(1, pageSize.value);
};


onMounted(() => {
    fetchData();
    // fetchNhom();
    // searchLoaiDoiTuong(current.value, pageSize.value);

});


</script>
<style scoped>
.container1 {
    padding: 0 10px;
    background-color: white;
}

.tile-document h1 {
    padding: 0px;
    margin: 10px 10px;
    font-size: 20px;
    /* padding: 20px 0 0 20px; */
}

.search1 {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    /* padding: 10px; */
}

.main-document {
    /* margin-top: 20px; */
    overflow: hidden;
}

.main-document .search {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    padding: 10px;
}

.table :deep(.ant-table-tbody > tr > td, .ant-table-thead > tr > th) {
    padding: 7.5px 0 !important;
}


.editable-row-operations a {
    margin-right: 8px;
}
</style>