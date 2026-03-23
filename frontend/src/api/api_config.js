import axios from 'axios';
import { useAuthStore } from '@/stores/authStore';
import { notification } from 'ant-design-vue';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// const isTokenExpired = (token) => {
//   console.log('Checking token:', token);
//   try {
//     console.log('Checking token expiration:', token);
//     console.log('Checking token expiration1:', token.split('.'));
//     console.log('Checking token expiration2:', token.split('.')[1]);
//     console.log('Checking token expiration3:', atob(token.split('.')[1]));
//     console.log('Checking token expiration4:', JSON.parse(atob(token.split('.')[1])));

//     const payload = JSON.parse(atob(token.split('.')[1]));
//     const exp = payload.exp;
//     const now = Math.floor(Date.now() / 1000);

//     console.log('Token exp:', exp, 'Current time:', now);
//     if (exp < now) {
//       console.log('Token expired');
//       return true;
//     }
//     console.log('Token valid');
//     return false;
//   }
//   catch (error) {
//     console.error('Error checking token expiration:', error);
//     return true;
//   }
// }


apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      // if (isTokenExpired(token)) {
      //   const authStore = useAuthStore();
      //   authStore.logout();
      //   window.location.href = '/';

      //   notification.error({
      //     message: 'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.'
      //   });

      //   return Promise.reject('Token expired');
      // }
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
      const authStore = useAuthStore();
      if (authStore.token) {
        console.error('Token hết hạn');

        authStore.logout();
        window.location.href = '/';

        notification.error({
          message: 'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.'
        });
      } else {
        console.warn('401 nhưng chưa đăng nhập → bỏ qua');
      }
    }
    return Promise.reject(error);
  }
);

export { apiClient };
