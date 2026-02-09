import { apiClient } from './api_config.js';

const getUsers = async (page, limit) => {
    try {
        const response = await apiClient.get(`/users?page=${page}&limit=${limit}`);
        console.log('API-getUsers response:', response.data);
        return response.data.users;
    } catch (error) {
        console.error('Lỗi lấy danh sách người dùng:', error);
        throw error;
    }
}

const searchUsers = async (query, page, limit) => {
    try {
        const response = await apiClient.get(`/loaiHienTrang/search`, { params: { keyword: query, page, limit } });
        console.log('API-searchLoaiHienTrang response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Lỗi tìm kiếm loại hiện trạng:', error);
        throw error;
    }
}

const createUsers = async (data) => {
    try {
        console.log('Creating user with data:', data);
        const response = await apiClient.post('/auth/register', data);
        console.log('API-createUsers response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Lỗi tạo người dùng:', error);
        throw error;
    }
}

const updateById = async (id, data) => {
    try {
        // console.log('Updating user ID:', id, 'with data:', data);
        const response = await apiClient.put(`/users/${id}`, data);
        console.log('API-updateById response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Lỗi cập nhật người dùng:', error);
        throw error;
    }
}

const deleteById = async (id) => {
    try {
        const response = await apiClient.delete(`/users/${id}`);
        return response.data;
    } catch (error) {
        console.error('Lỗi xóa người dùng:', error);
        throw error;
    }
}

export {
    getUsers,
    createUsers,
    updateById,
    deleteById,
    searchUsers
};