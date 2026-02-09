<template>
    <div class="main">
        <div class="main-container">
            <div class="container-left">
                <div class="form-login">
                    <h1 class="login-title">ĐĂNG NHẬP</h1>
                    <a-form :model="formState" name="basic" :label-col="{ span: 24 }" :wrapper-col="{ span: 24 }"
                        autocomplete="off" @finish="handleLogin" >
                        <a-form-item label="Tên đăng nhập" name="email"
                            :rules="[{ required: true, message: 'Vui lòng nhập tên đăng nhập!' }]">
                            <a-input v-model:value="formState.email" type="email" placeholder="Nhập tên đăng nhập hoặc email" />
                        </a-form-item>

                        <a-form-item label="Mật khẩu" name="pass_word"
                            :rules="[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]">
                            <a-input-password v-model:value="formState.pass_word" type="password" placeholder="Nhập mật khẩu" />
                        </a-form-item>

                        <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
                            <a-button type="primary" html-type="submit">Đăng nhập</a-button>
                        </a-form-item>
                    </a-form>
                </div>
            </div>
            <div class="container-right">
                <div class="text-content">
                    <h1>HỆ THỐNG WEBGIS THÔNG TIN XÃ THƯ TRÌ - TỈNH HƯNG YÊN</h1>
                    <span> Chào mừng bạn đến với hệ thống WebGIS thông tin xã Thư Trì - Tỉnh Hưng Yên. Truy cập vào hệ
                        thống để thực hiện biên tập dữ liệu không gian và tra cứu thông tin một cách dễ dàng và hiệu
                        quả.</span>
                </div>
                <div class="box-top"></div>
                <div class="box-bottom"></div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { message, notification } from 'ant-design-vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';

const router = useRouter();

const formState = ref({
    email: '',
    pass_word: ''
});

const handleLogin = async (values) => {
    try {
        const { email, pass_word } = values;

        if (pass_word.length < 6) {
            notification.error({
                message: 'Mật khẩu phải có ít nhất 6 ký tự',
            });
            return;
        }
       
        const authStore = useAuthStore();
        const res = await authStore.login({ email, pass_word });
         console.log('API Response:', res.user_name);
         console.log('User Role:', authStore.user.role);

         notification.success({
                message: 'Đăng nhập thành công',
                description: 'Chào mừng bạn đã đến với hệ thống.',
                duration: 2,
            });

            if (authStore.user.role === 'ADMIN') {
                router.push('/dashboard/tongquan');
            } else if (authStore.user.role === 'EMPLOYEE') {
                router.push('/');
            } else {
                router.push('/');
            }
    } catch (error) {
         notification.error({
                message: 'Đăng nhập thất bại',
                description: 'Vui lòng kiểm tra lại tên đăng nhập và mật khẩu.',
            });
    }
};

onMounted(() => {
    console.log("LoginView mounted");
});

</script>

<style scoped>
.main {
    height: 100vh;
    background-color: var(--bg-header);
    display: flex;
    justify-content: center;
    align-items: center;
}

.main-container {
    width: 60%;
    height: 80%;
    background-color: white;
    margin: auto;
    display: flex;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    border-radius: 10px;
    overflow: hidden;
    justify-content: center;
    align-items: center;
}

.container-left {
    width: 50%;
    height: 100%;
    background-color: white;
    position: relative;
    z-index: 1;
}

.container-right {
    width: 50%;
    height: 100%;
    background-color: #91d4af;
    position: relative;
}

.box-top {
    width: 80%;
    height: 80%;
    background-color: #a3dbbc;
    margin: 20px auto 10px auto;
    border-radius: 50%;
    position: absolute;
    top: -100px;
    right: -100px;
}

.box-bottom {
    width: 40%;
    height: 40%;
    background-color: #a3dbbc;
    margin: 10px auto 20px auto;
    border-radius: 50%;
    position: absolute;
    bottom: -50px;
    left: -50px;
    z-index: 0;


}

.form-login {
    width: 90%;
    padding-top: 50px;
    margin: auto;
}

.login-title {
    text-align: center;
    margin-bottom: 30px;
    color: var(--bg-header);
}

:deep(.ant-form) {
    width: 100%;
}

:deep(.ant-form) .ant-form-item {
    width: 100%;
}

:deep(.ant-form-item-label > label) {
    font-size: 18px;
}

:deep(.ant-btn) {
    padding-bottom: 35px;
    font-size: 18px;
    background-color: #399362;
}

:deep(.ant-btn:hover) {
    background-color: #2e7d46;
    border-color: #2e7d46;
    color: black;
}

:deep(.ant-form) .ant-input {
    padding: 16px;
    font-size: 16px;
}




.text-content {
    color: white;
    /* text-align: center; */
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80%;
    z-index: 1;
    font-size: 15px;
}



@media (max-width: 992px) {
    .main-container {
        width: 70%;
    }

    .container-right {
        display: none;
    }

    .container-left {
        width: 100%;
    }
}
</style>