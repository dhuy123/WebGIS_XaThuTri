import axios from 'axios';
import { useAuthStore } from '@/stores/authStore';
import { notification } from 'ant-design-vue';

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});


apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      console.error('Unauthorized access - 401');
      const authStore = useAuthStore();
      authStore.logout();
      window.location.href = '/';

      notification.error({
        message: 'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.'
      });
    }
    return Promise.reject(error);
  }
);

export { apiClient };
