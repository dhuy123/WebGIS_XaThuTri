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
                    <a-table class="table" :columns="columns" :data-source="datalist" :scroll="{ x: '1500px', y: 460 }"
                        :row-key="record => record.id" :loading="loading" :pagination="pagination"
                        @change="handleTableChange" :style="{ margin: 0, padding: 0 }">

                        <template #bodyCell="{ column, text, record }">
                            <template
                                v-if="['user_name', 'email', 'phone', 'role', 'ngay_sinh', 'gioi_tinh', 'gmail'].includes(column.dataIndex)">
                                <div>
                                    <!-- =================== EDIT MODE =================== -->
                                    <template v-if="editableData[record.id]">

                                        <a-select v-if="column.dataIndex === 'role'"
                                            v-model:value="editableData[record.id].role" style="width: 150px">
                                            <a-select-option value="ADMIN">Quản trị viên</a-select-option>
                                            <a-select-option value="EMPLOYEE">Nhân viên</a-select-option>
                                        </a-select>

                                        <a-date-picker v-else-if="column.dataIndex === 'ngay_sinh'"
                                            v-model:value="editableData[record.id].ngay_sinh" format="DD/MM/YYYY"
                                            valueFormat="YYYY-MM-DD" style="width: 150px" />

                                        <a-select v-else-if="column.dataIndex === 'gioi_tinh'"
                                            v-model:value="editableData[record.id].gioi_tinh" style="width: 150px">
                                            <a-select-option value="Nam">Nam</a-select-option>
                                            <a-select-option value="Nữ">Nữ</a-select-option>
                                        </a-select>

                                        <a-input v-else v-model:value="editableData[record.id][column.dataIndex]"
                                            style="margin: -5px 0" />

                                    </template>

                                    <!-- =================== VIEW MODE =================== -->
                                    <template v-else>
                                        <template v-if="column.dataIndex === 'ngay_sinh'">
                                            {{ formatDate(text) }}
                                        </template>
                                        <template v-else-if="column.dataIndex === 'role'">
                                            <span :style="{ color: text === 'ADMIN' ? 'red' : 'green' }">
                                                {{ text === 'ADMIN' ? 'Quản trị viên' : 'Nhân viên' }}
                                            </span>
                                        </template>

                                        <template v-else>
                                            {{ text }}
                                        </template>
                                    </template>
                                </div>
                            </template>
                            <!-- thao tác -->
                            <template v-else-if="column.dataIndex === 'actions'">
                                <div class="operations"
                                    :style="{ display: 'flex', alignItems: 'center', justifyContent: 'center' }">
                                    <div class="editable-row-operations">
                                        <span v-if="editableData[record.id]">
                                            <a-typography-link @click="save(record.id)">Save</a-typography-link>
                                            <a-popconfirm title="Bạn có chắc muốn hủy?" @confirm="cancel(record.id)">
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
        <a-modal v-model:open="openModel" title="Thêm mới người dùng" width="600px" :footer="null">
            <a-form :model="formModel" v-bind="layout" @finish="handleAdd">
                <a-form-item name="user_name" label="Họ và tên"
                    :rules="[{ required: true, message: 'Vui lòng nhập họ và tên!' }]">
                    <a-input v-model:value="formModel.user_name" placeholder="Nhập họ và tên" />
                </a-form-item>
                <a-form-item name="email" label="Email đăng nhập" :rules="[{ required: true, message: 'Vui lòng nhập email đăng nhập!' },
                { type: 'email', message: 'Email không hợp lệ!' }
                ]">
                    <a-input v-model:value="formModel.email" placeholder="Nhập email đăng nhập" />
                </a-form-item>
                <a-form-item name="phone" label="Số điện thoại" :rules="[{
                    pattern: /^0[3|5|7|8|9]\d{8}$/, message: 'Số điện thoại không hợp lệ (10 số, bắt đầu bằng 03/05/07/08/09)!'
                }]">
                    <a-input v-model:value="formModel.phone" placeholder="Nhập số điện thoại" />
                </a-form-item>
                <a-form-item name="ngay_sinh" label="Ngày sinh">
                    <a-date-picker v-model:value="formModel.ngay_sinh" format="DD/MM/YYYY" valueFormat="YYYY-MM-DD"
                        style="width: 100%;" placeholder="Chọn ngày sinh" />
                </a-form-item>
                <a-form-item name="gioi_tinh" label="Giới tính">
                    <a-select v-model:value="formModel.gioi_tinh" placeholder="Chọn giới tính" style="width: 100%;">
                        <a-select-option value="Nam">Nam</a-select-option>
                        <a-select-option value="Nữ">Nữ</a-select-option>
                    </a-select>
                </a-form-item>
                <a-form-item name="gmail" label="Email cá nhân"
                    :rules="[{ type: 'email', message: 'Email không hợp lệ!' }]">
                    <a-input v-model:value="formModel.gmail" placeholder="Nhập email cá nhân" />
                </a-form-item>
                <a-form-item name="role" label="Vai trò"
                    :rules="[{ required: true, message: 'Vui lòng chọn vai trò!' }]">
                    <a-select v-model:value="formModel.role" style="width: 100%;">
                        <a-select-option value="ADMIN">Quản trị viên</a-select-option>
                        <a-select-option value="EMPLOYEE">Nhân viên</a-select-option>
                    </a-select>
                </a-form-item>
                <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
                    <a-button type="primary" html-type="submit">Thêm mới</a-button>
                </a-form-item>
            </a-form>
        </a-modal>
    </div>

</template>
<script setup>
import { h } from 'vue';
import { computed, onMounted, reactive, ref } from 'vue';
import { getUsers, createUsers, updateById, deleteById } from '@/api/api_users';
import { Alert, message } from 'ant-design-vue';
import { EditOutlined, DeleteOutlined, UserOutlined } from '@ant-design/icons-vue';

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
        width: 50,
        align: 'center',
    },
    {

        title: 'Ảnh',
        dataIndex: 'thumb',
        customRender: ({ text }) => {
            if (text) {
                return h('img', {
                    src: text,
                    style: {
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        objectFit: 'cover'
                    }
                });
            }
            return h(UserOutlined);
        },
        width: 100,
        align: 'center',
    },
    {
        title: 'Họ và tên',
        dataIndex: 'user_name',
        width: 150,
        align: 'center',
    },
    {
        title: 'Tên đăng nhập',
        dataIndex: 'email',
        width: 150,
        align: 'center',
    },
    {
        title: 'Vai trò',
        dataIndex: 'role',
        width: 150,
        align: 'center',
    },
    {
        title: 'Số điện thoại',
        dataIndex: 'phone',
        width: 150,
        align: 'center',
    },
    {
        title: 'Ngày sinh',
        dataIndex: 'ngay_sinh',
        width: 150,
        align: 'center',
    },

    {
        title: 'gioi_tinh',
        dataIndex: 'gioi_tinh',
        width: 150,
        align: 'center',
    },
    {
        title: 'email cá nhân',
        dataIndex: 'gmail',
        width: 150,
        align: 'center',
    },
    {
        title: 'Thời gian tạo',
        dataIndex: 'created_at',
        customRender: ({ text }) => formatDate(text),
        width: 150,
        align: 'center',
    },
    {
        title: 'Thời gian cập nhật',
        dataIndex: 'updated_at',
        customRender: ({ text }) => formatDate(text),
        width: 150,
        align: 'center',
    },
    {
        title: 'Thao tác',
        dataIndex: 'actions',
        width: 150,
        align: 'center',
        fixed: 'right',
    },
];

const formModel = reactive({
    user_name: '',
    email: '',
    phone: '',
    ngay_sinh: '',
    gioi_tinh: '',
    gmail: '',
    role: 'EMPLOYEE',
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
        const response = await getUsers(page, limit);
        datalist.value = response.data;
        console.log('Datalist:', datalist.value);
        // console.log('Total records:', response.data.total);
        total.value = response.total;
        current.value = page;
        pageSize.value = limit;
        totalPage.value = Math.ceil(total.value / pageSize.value);
        console.log('Total pages:', totalPage.value);
        console.log('Current page:', current.value);
        console.log('Page size:', pageSize.value);
        // console.log('ngay sinh', datalist.value.map(item => formatDate(item.ngay_sinh)));
        // message.success('Dữ liệu đã được tải thành công');
    } catch (error) {
        loading.value = false;
        console.error('Error fetching data:', error);
    } finally {
        loading.value = false;
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
    formModel.email = ''
    formModel.user_name = ''
    formModel.phone = ''
    formModel.ngay_sinh = ''
    formModel.gioi_tinh = ''
    formModel.gmail = ''
    formModel.role = 'EMPLOYEE'
    openModel.value = true
};

const handleAdd = async (data) => {
    try {
        console.log('form data to add:', data);
        await createUsers(data);
        message.success('Thêm mới người dùng thành công');
        openModel.value = false;
        await fetchData(current.value, pageSize.value);
    } catch (error) {
        console.error('Lỗi khi thêm mới người dùng:', error);
        if (error.response && error.response.data && error.response.data.message) {
            message.error(`Lỗi: ${error.response.data.message}`);
        } else {
            message.error('Đã xảy ra lỗi khi thêm mới người dùng');
        }
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
        // console.log('Updated record from API:', updatedRecord);
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

const searchUsers = async (page = current.value, limit = pageSize.value) => {
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
    loading.value = true;
    searchKeyword.value = '';
    current.value = 1;
    await fetchData(1, pageSize.value);
};


onMounted(() => {
    fetchData();
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