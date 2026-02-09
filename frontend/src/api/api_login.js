import {apiClient} from './api_config.js';

const logAPI = async (email,pass_word) => {
try {
    const response = await apiClient.post('/auth/login', {email, pass_word});
    // console.log('Login API response:', response.data);
    return response.data;
} catch (error) {
    console.error('Lỗi đăng nhập:', error);
    throw error;
}
}

const getUserById = async (id) => {
    try {
        const response = await apiClient.get(`/users/${id}`);
        console.log('API-getUserById response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Lỗi lấy thông tin người dùng:', error);
        throw error;
    }
}

const updateUser = async (data) => {
    try {
        const user_id = data.id;
        if (!user_id) {
            throw new Error('User ID is required for updating user information.');
        }
        console.log('API-id user to update:', user_id);
        console.log("API-Updating user with data:", data);
        const response = await apiClient.put(`/users/${user_id}`, data);
        return response.data;
    } catch (error) {
        console.error('Lỗi cập nhật người dùng:', error);
        throw error;
    }
}

export { logAPI, updateUser, getUserById };
