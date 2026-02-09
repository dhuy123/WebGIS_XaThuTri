import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { logAPI, updateUser, getUserById } from '@/api/api_login';

const useAuthStore = defineStore('auth', () => {

  const user = ref(null)
  const id = ref(null)
  const role = ref(localStorage.getItem('role') || null)
  const token = ref(localStorage.getItem('token'))
  if (token.value) {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      try {
        user.value = JSON.parse(storedUser)
      } catch (e) {
        console.error('Invalid user data in localStorage:', e)
        // Optional: Xóa dữ liệu hỏng
        localStorage.removeItem('user')
        localStorage.removeItem('token')
      }
    }
  }

  const isAuthenticated = computed(() => !!token.value)

  const login = async ({ email, pass_word }) => {
    const response = await logAPI(email, pass_word)

    token.value = response.token.token
    user.value = response.token.user
    id.value = response.token.user.id
    role.value = response.token.user.role

    localStorage.setItem('token', token.value)
    localStorage.setItem('user', JSON.stringify(user.value))
    localStorage.setItem('role', (role.value))

    // console.log('Response from login API:', response)
    // console.log('JWT:', token.value)
    // console.log('USER:', user.value)
    // console.log('Role of user:', user.value.role);
    // console.log('user name is:', user.value.user_name);
    // console.log('user id is:', user.value.id);
    // console.log('Is Authenticated:', isAuthenticated.value);
    console.log('role', role.value);
    return user.value.user_name, user.value.id, user.value.role

  }

  const logout = () => {
    token.value = null;
    user.value = null;
    // isAuthenticated.value = false;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    console.log('User logged out');
  };

  const updateUserById = async (data) => {
    try {
      console.log('id user to update:', data.id);
      console.log("Updating user with data:", data);
      const response = await updateUser(data);
      console.log('Updated user data from API:', response);
      // await getUserById(data.id);
      user.value = {...user.value, ...data};
      console.log('Updated user in store:', user.value);
      localStorage.setItem('user', JSON.stringify(user.value));
      console.log('Local storage user data after update:', localStorage.getItem('user'));

      return response;
    } catch (error) {
      console.error('Lỗi cập nhật người dùng:', error);
      throw error;
    }
  }

  return {
    user,
    id,
    role,
    token,
    isAuthenticated,
    login,
    logout,
    updateUserById,
  }
});

export { useAuthStore };
