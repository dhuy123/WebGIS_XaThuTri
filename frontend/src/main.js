import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'


import 'ant-design-vue/dist/reset.css'
import Antd from 'ant-design-vue'



// 4. Import CSS tùy chỉnh của dự án (Đặt sau cùng để có độ ưu tiên cao nhất)
import './assets/css/reset.css'
import './assets/css/main.css'

// 5. Khởi tạo và Mount ứng dụng
const app = createApp(App)

app.use(router)
app.use(Antd)
app.use(createPinia())

app.mount('#app')
