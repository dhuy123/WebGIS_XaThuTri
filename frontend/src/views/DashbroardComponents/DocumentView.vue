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
                            <template v-if="['file_name'].includes(column.dataIndex)">
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
                                <div class="operations"
                                    :style="{ display: 'flex', alignItems: 'center', justifyContent: 'center' }">
                                    <div class="operations-view">
                                        <a @click="onView(record.id)" style="color: red; margin-left: 10px;">
                                            <FolderViewOutlined title="Xem"
                                                :style="{ fontSize: '24px', color: 'green' }" />
                                        </a>
                                    </div>
                                    <div class="operations-view">
                                        <a @click="onDownload(record)" style="color: red; margin-left: 10px;">
                                            <DownloadOutlined title="Tải xuống"
                                                :style="{ fontSize: '24px', color: 'yellow' }" />
                                        </a>
                                    </div>
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
                                            <DeleteOutlined title="Xóa" :style="{ fontSize: '24px', color: 'red' }" />
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
        <a-modal v-model:open="openModel" title="Thêm mới file" width="600px" :footer="null">
            <a-form :model="formModel" v-bind="layout" @finish="handleAdd">
                <a-form-item label="Chọn file" name="file_path"
                    :rules="[{ required: true}]">
                    <a-upload  name="file_path" :before-upload="beforeUpload">
                        <a-button>
                            <UploadOutlined />
                            Click to Upload
                        </a-button>
                    </a-upload>
                </a-form-item>
                <a-form-item label="Tên file" name="file_name"
                    :rules="[{ required: true }]">
                    <a-input v-model:value="formModel.file_name" placeholder="Nhập tên file" />
                </a-form-item>
                <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
                    <a-button type="primary" html-type="submit">Thêm mới</a-button>
                </a-form-item>
            </a-form>
        </a-modal>
    </div>

    <!-- MODAL PREVIEW -->
    <a-modal v-model:open="open" width="1400px" title="Xem file" :footer="null"
        :bodyStyle="{ maxHeight: '80vh', overflow: 'auto' }" @cancel="closeModal">

        <!-- IMAGE -->
        <img v-if="isImage && previewUrl" :src="previewUrl" alt="preview"
            style="display:block; max-width:100%; max-height:75vh; margin:0 auto; border:1px solid #ddd; border-radius:8px" />

        <!-- PDF -->
        <iframe v-else-if="isPdf && previewUrl" :src="previewUrl"
            style="width:100%; height:75vh; border:1px solid #ddd; border-radius:8px" />

        <!-- VIDEO -->
        <video v-else-if="isVideo && previewUrl" :src="previewUrl" controls style="width:100%; max-height:75vh" />

        <!-- AUDIO -->
        <audio v-else-if="isAudio && previewUrl" :src="previewUrl" controls style="width:100%" />

        <div v-else>
            <h4>Không thể xem được file này. Vui lòng tải về để xem.</h4>
        </div>
    </a-modal>

</template>
<script setup>
import { computed, onMounted, reactive, ref } from 'vue';
import { getFiles, getFileById, updateById, deleteById, createFile } from '@/api/api_file.js';
import { Alert, message } from 'ant-design-vue';
import { EditOutlined, DeleteOutlined, FolderViewOutlined, DownloadOutlined, UploadOutlined } from '@ant-design/icons-vue';

const datalist = ref([]);
const dataNhomDoiTuong = ref([]);
const editableData = reactive({});

const open = ref(false);
const previewUrl = ref(null);

const current = ref(1);
const pageSize = ref(10);
const total = ref(0);
const loading = ref(false);
const totalPage = ref(0);

const openModel = ref(false);

const currentMime = ref("");

const isImage = computed(() => currentMime.value.startsWith("image/"));
const isPdf = computed(() => currentMime.value === "application/pdf");
const isVideo = computed(() => currentMime.value.startsWith("video/"));
const isAudio = computed(() => currentMime.value.startsWith("audio/"));


const columns = [
    {
        title: 'STT',
        dataIndex: 'stt',
        customRender: ({ index }) => index + 1,
        width: '5%',
        align: 'center',
    },
    {
        title: 'Url',
        dataIndex: 'file_path',
        // width: '10%',
        align: 'center',
    },
    {
        title: 'Tên tài liệu, văn bản',
        dataIndex: 'file_name',
    },
    {
        title: 'Kiểu file',
        dataIndex: 'file_type',
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
    file_name: '',
    file_path: '',
});

const searchKeyword = ref('');

const formatDate = (data) => {
    const date = new Date(data).toLocaleDateString();
    // console.log('Formatting date:', date);
    return date;
}

const fetchData = async (page = current.value, limit = pageSize.value) => {
    try {
        console.log('Fetching data with page:', page, 'and limit:', limit);
        // loading.value = true;
        const response = await getFiles(page, limit);
        datalist.value = response.files.data;
        console.log('Datalist:', datalist.value);
        // console.log('Total records:', response.data.total);
        total.value = response.files.total;
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
    // searchLoaiHienTrang(current.value, pageSize.value);
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
    formModel.file_name = ''
    formModel.file_path = ''
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

const beforeUpload = (file) => {
    if (!file) {
        message.error('Vui lòng chọn file hợp lệ!');
        return false;
    }
  // lưu file vào form
  formModel.file_path = file;
  console.log('Selected file:', file);

  // tự động điền tên file
  formModel.file_name = file.name;
  console.log('Auto-filled file name:', formModel.file_name);

  // không upload tự động
  return false;
};

const handleAdd = async () => {

    const formData = new FormData();

    formData.append("file_name", formModel.file_name);
    formData.append("file_path", formModel.file_path);

    await createFile(formData);
    message.success('Thêm mới file thành công');
    openModel.value = false;

    // reset form
    formModel.file_name = '';
    formModel.file_path = '';
    await fetchData(1, pageSize.value);
}

const canPreview = (mime) => {
    if (!mime) return false;
    if (mime === "application/pdf") return true;
    if (mime.startsWith("image/")) return true;
    if (mime.startsWith("video/")) return true;
    if (mime.startsWith("audio/mp4")) return false;
    if (mime.startsWith("text/")) return true;
    return false;
}

const onView = async (id) => {
    try {
        const res = await getFileById(id);
        console.log("File details response:", res);

        const mime =
            res?.headers?.["content-type"] ||
            "application/octet-stream";
        currentMime.value = mime;

        // ✅ ép blob chắc chắn để tránh lỗi createObjectURL overload
        const data = res.data;
        const blob = data instanceof Blob ? data : new Blob([data], { type: mime });

        const url = URL.createObjectURL(blob);

        if (!canPreview(mime)) {
            open.value = false; // đảm bảo modal không mở
        }

        // preview
        previewUrl.value = url;
        open.value = true;

    } catch (error) {
        console.error("Error viewing file:", error);
    }
};

const parseFilenameFromHeader = (contentDisposition, fallback = "download-file") => {
    // console.log('Parsing filename from header:', contentDisposition);
    if (!contentDisposition) return fallback;
    const match = contentDisposition.match(/filename="?([^"]+)"?/);
    return match ? decodeURIComponent(match[1]) : fallback;
};

const downloadBlob = (url, filename) => {
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
};

const onDownload = async (file) => {
    try {
        const res = await getFileById(file.id);
        console.log("File details response for download:", res);

        const mime =
            res?.headers?.["content-type"] ||
            file.file_type ||
            "application/octet-stream";

        const data = res.data;
        const blob = data instanceof Blob ? data : new Blob([data], { type: mime });

        const url = URL.createObjectURL(blob);
        const filename = parseFilenameFromHeader(res.headers?.["content-disposition"] || "", file.file_name || `file-${file.id}`);
        downloadBlob(url, filename);

        setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch (error) {
        console.error("Error downloading file:", error);
    }
};

const closeModal = () => {
    open.value = false;
    if (previewUrl.value) {
        URL.revokeObjectURL(previewUrl.value);
        previewUrl.value = null;
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