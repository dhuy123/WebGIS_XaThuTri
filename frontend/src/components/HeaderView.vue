<template>
    <header class="header" :class="{ 'header-transparent': route.path === '/' }">
        <div class="container">
            <div class="menu">
                <div class="header-left">
                    <router-link to="/">
                        <img src="/android-chrome-512x512.png" alt="Logo">
                    </router-link>
                </div>

                <div class="header-menu">
                    <RouterLink to="/" class="menu-item">Trang chủ</RouterLink>
                    <RouterLink to="/dashboard/tongquan" class="menu-item"
                        v-if="authStore.isAuthenticated && authStore.role == 'ADMIN'">Quản lý chung</RouterLink>
                    <RouterLink to="/about" class="menu-item">Giới thiệu</RouterLink>

                    <div class="menu-item expand">
                        <span @click="toggleService">Dịch vụ
                            <IconCaretDown :class="{ rotate: isOpen }" class="icon" />
                        </span>
                        <div class="expand-menu" v-if="isOpen">
                            <div class="expand-menu1">
                                <RouterLink to="/vanhoaxahoi" class="expand-item">Văn hóa - xã hội</RouterLink>
                                <RouterLink to="/nongnghiepmoitruong" class="expand-item">Nông nghiệp - môi trường
                                </RouterLink>
                            </div>
                            <div class="expand-menu2">
                                <RouterLink to="/diagioi" class="expand-item">Địa giới hành chính </RouterLink>
                                <RouterLink to="/giaothong" class="expand-item">Giao thông</RouterLink>
                            </div>
                        </div>
                    </div>
                    <RouterLink to="/document" class="menu-item">Tài liệu, Văn bản</RouterLink>
                </div>

                <div class="header-right">
                    <div class="menu-item expand">
                        <span @click="toggleUser" class="login">
                            <IconUserFilled /> |
                            <IconCaretDown :class="{ rotate: isUserOpen }" class="icon" />
                        </span>
                        <div class="expand-menu" v-if="isUserOpen">
                            <div class="expand-menu1">
                                <RouterLink to="/login" class="expand-item" v-if="!authStore.isAuthenticated">
                                    <IconLogout /> | Đăng nhập
                                </RouterLink>
                                <div v-if="authStore.isAuthenticated" class="expand-item user-box">

                                    <div class="expand-item anhdaidien">
                                        <IconUserFilled /> |
                                        <span style="margin-left: 5px; font-weight: 600;">
                                            {{ authStore.user.user_name }}
                                        </span>
                                    </div>

                                    <button type="primary" @click="showModal" class=" expand-item information"
                                        :style="{ 'border': 'none', 'background': 'transparent', }">
                                        <IconEdit /> | Cập nhật thông tin
                                    </button>

                                    <RouterLink to="/" class="expand-item logout" @click="handleLogout">
                                        <IconLogout /> | Đăng xuất
                                    </RouterLink>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div>
            <a-modal v-model:open="openModal" title="Cập nhật thông tin" :footer="null">
                <a-form :model="formState" v-bind="layout" name="nest-messages" :validate-messages="validateMessages"
                    @finish="onFinish">
                    <!-- <a-form-item :name="['user', 'id']" label="ID" :rules="[{ required: true }]" >
                        <a-input v-model:value="formState.user.id" disabled />
                    </a-form-item> -->
                    <a-form-item :name="['user', 'user_name']" label="Tên người dùng" :rules="[{ required: true }]">
                        <a-input v-model:value="formState.user.user_name" />
                    </a-form-item>
                    <a-form-item :name="['user', 'email']" label="Email" :rules="[{ type: 'email' }]">
                        <a-input v-model:value="formState.user.email" disabled />
                    </a-form-item>

                    <a-form-item label="Giới tính" :name="['user', 'gioi_tinh']">
                        <a-select v-model:value="formState.user.gioi_tinh">
                            <a-select-option value="Nam">Nam</a-select-option>
                            <a-select-option value="Nữ">Nữ</a-select-option>
                        </a-select>
                    </a-form-item>

                    <a-form-item :name="['user', 'ngay_sinh']" label="Ngày sinh">
                        <a-date-picker v-model:value="formState.user.ngay_sinh" format="DD/MM/YYYY"
                            valueFormat="YYYY-MM-DD" placeholder="Chọn ngày sinh" :allowClear="true"
                            style="width: 100%;" />
                    </a-form-item>

                    <a-form-item :name="['user', 'phone']" label="Phone" :rules="[
                        { pattern: /^0[3|5|7|8|9]\d{8}$/, message: 'Số điện thoại không hợp lệ (10 số, bắt đầu bằng 03/05/07/08/09)!' }
                    ]">
                        <a-input v-model:value="formState.user.phone" />
                    </a-form-item>
                    <a-form-item :name="['user', 'gmail']" label="Gmail (Cá nhân)"
                        :rules="[{ type: 'email', message: 'Gmail không hợp lệ' }]">
                        <a-input v-model:value="formState.user.gmail" />
                    </a-form-item>
                    <div class="footer" style="display: flex; justify-content: flex-end; margin-right: 30px;">
                        <a-form-item :wrapper-col="{ ...layout.wrapperCol, offset: 8 }">
                            <a-button type="primary" html-type="submit">Lưu</a-button>
                        </a-form-item>
                        <a-form-item :wrapper-col="{ ...layout.wrapperCol, offset: 8 }">
                            <a-button type="default" @click="onCancel">Đóng</a-button>
                        </a-form-item>
                    </div>
                </a-form>
            </a-modal>
        </div>
    </header>
</template>

<script setup>
import { IconCaretDown, IconLogout, IconUserFilled, IconEdit } from '@tabler/icons-vue';
import { message, notification } from 'ant-design-vue';
import { useRoute } from 'vue-router';
import { ref, watch } from 'vue';
import { onMounted } from 'vue';
import { useAuthStore } from '@/stores/authStore';

const props = defineProps({});

const authStore = useAuthStore();

const route = useRoute();
const isOpen = ref(false);
const isUserOpen = ref(false);
const openModal = ref(false);
const loading = ref(false);

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
};

const formState = ref({
    user: {
        // id: null,
        user_name: '',
        gioi_tinh: '',
        ngay_sinh: null,
        phone: '',
        gmail: '',

    }
});

const onFinish = async (values) => {
    loading.value = true;
    try {
        const user_id = authStore.user.id;
        console.log('id user:', user_id);
        const data = { id: user_id, ...values.user };
        console.log('Updated values to submit:', data);
        await authStore.updateUserById(data);
        formState.value.user = { id: user_id, ...authStore.user };
        message.success('Cập nhật thông tin thành công');
        openModal.value = false;
    } catch (error) {
        if (error.response && error.response.status === 403) {
            notification.error({
                message: 'Bạn không có quyền thực hiện hành động này',
            });
        } else {
            console.error('Error updating user information:', error);
            notification.error({
                message: 'Cập nhật thông tin thất bại',
                description: 'Có thể do trùng dữ liệu, dữ liệu trống. Vui lòng thử lại sau.',
            });
        }
    } finally {
        loading.value = false;
    }
};

const onCancel = () => {
    openModal.value = false;
};

const showModal = () => {
    if (!authStore.isAuthenticated) {
        notification.warning({
            message: 'Vui lòng đăng nhập để cập nhật thông tin',
        });
        return;
    }
    openModal.value = true;
};

const toggleService = () => {
    isOpen.value = !isOpen.value;
    isUserOpen.value = false;
};

const toggleUser = () => {
    isUserOpen.value = !isUserOpen.value;
    isOpen.value = false;
};



const handleLogout = () => {
    authStore.logout();
    notification.success({
        message: 'Đăng xuất thành công',
    });
    window.location.href = '/'
};

watch(openModal, (newVal) => {
    if (newVal) {
        // formState.value.user.id = authStore.user.id;
        formState.value.user.user_name = authStore.user.user_name;
        formState.value.user.gioi_tinh = authStore.user.gioi_tinh;
        formState.value.user.email = authStore.user.email;
        formState.value.user.ngay_sinh = authStore.user.ngay_sinh;
        formState.value.user.phone = authStore.user.phone;
        formState.value.user.gmail = authStore.user.gmail;
    }
});


onMounted(() => {
    console.log("HeaderView mounted");
});

</script>

<style>
.header {
    width: 100%;
    height: 50px;
    background-color: var(--bg-header);
    color: white;
    display: flex;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;

}

.header-transparent {
    background-color: transparent;
}

.container .menu {
    display: flex;
    justify-content: space-between;
    align-items: center;

}

.header-left img {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;
}

.header-menu {
    display: flex;
    gap: 30px;
    font-size: 18px;
    font-weight: 500;
    cursor: pointer;
}

.header-menu .menu-item,
.header-right .menu-item {
    position: relative;
    text-decoration: none;
    color: white;
    font-weight: 600;
}

.menu-item::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -6px;
    width: 0;
    height: 2px;
    background-color: #00ff99;
    transition: width 0.3s ease;
}

.menu-item:hover::after {
    width: 100%;
}

.menu-item.router-link-exact-active {
    /* color: #00ff99; */
    font-weight: 600;
}


.menu-item.router-link-exact-active::after {
    width: 100%;
}



/* ----------expand---------- */
.expand {
    position: relative;
}

.expand span {
    padding-top: 4px;
    display: flex;
    align-items: center;
    font-weight: 600;
}

.expand .icon-caret-down {
    width: 16px;
    height: 16px;
    transition: transform 0.3s ease;
    margin-top: 5px;

}

.expand-menu {
    display: flex;
    position: absolute;
    top: 100%;
    left: 0;
    background-color: #645555fa;
    margin-top: 10px;
    /* padding: 10px 0; */
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    overflow: hidden;
    /* z-index: 1000; */
}

.expand-menu1,
.expand-menu2 {
    display: flex;
    flex-direction: column;
}

.expand-menu .expand-item {
    display: flex;
    padding: 8px 8px;
    text-decoration: none;
    color: white;
    white-space: nowrap;
    width: 100%;
    min-height: 44px;
    font-weight: 600;
}

.rotate {
    transform: rotate(180deg);
}

.expand span.login {
    background-color: #645555fa;
    padding: 8px 12px;
    border-radius: 25px;
}

.user-box {
    display: flex;
    flex-direction: column;
    gap: 10px;
    min-width: 200px;
}

.anhdaidien {
    display: flex;
    align-items: center;
}

.information {
    font-weight: 600;
    cursor: pointer;
    color: white;
}

.logout {
    color: #ffdddd;
    cursor: pointer;
    font-weight: 600;
}

.logout:hover {
    color: #656565;
}

@media (max-width: 992px) {
    .container {
        padding: 0;
        margin: 0;
    }
}
</style>
