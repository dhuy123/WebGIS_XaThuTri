import { apiClient } from './api_config.js';

const getLoaiDoiTuong = async (page, limit) => {
    try {
        const response = await apiClient.get(`/loaiDoiTuong?page=${page}&limit=${limit}`);
        console.log('API-getLoaiDoiTuong response:', response.data);
        console.log('tổng sô bản ghi:', response);
        return response.data;
    } catch (error) {
        console.error('Lỗi lấy danh sách loại đối tượng:', error);
        throw error;
    }
}

const searchLoaiDoiTuong1 = async (query) => {
    try {
        const response = await apiClient.get(`/loaiDoiTuong/search`, { params: query });
        return response.data;
    } catch (error) {
        console.error('Lỗi tìm kiếm loại đối tượng:', error);
        throw error;
    }
}

const getAllNhomDoiTuong = async () => {
    try {
        const response = await apiClient.get('/loaiDoiTuong/nhomDoiTuong');
        console.log('API-getAllNhomDoiTuong response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Lỗi lấy danh sách nhóm đối tượng:', error);
        throw error;
    }
}

const createLoaiDoiTuong = async (data) => {
    try {
        const response = await apiClient.post('/loaiDoiTuong', data);
        console.log('API-createLoaiDoiTuong response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Lỗi tạo loại đối tượng:', error);
        throw error;
    }
}

const updateById = async (id, data) => {
    try {
        const response = await apiClient.put(`/loaiDoiTuong/${id}`, data);
        // console.log('API-updateById response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Lỗi cập nhật loại đối tượng:', error);
        throw error;
    }
}

const deleteById = async (id) => {
    try {
        const response = await apiClient.delete(`/loaiDoiTuong/${id}`);
        return response.data;
    } catch (error) {
        console.error('Lỗi xóa loại đối tượng:', error);
        throw error;
    }
}

export {
    getLoaiDoiTuong,
    updateById,
    createLoaiDoiTuong,
    getAllNhomDoiTuong,
    deleteById,
    searchLoaiDoiTuong1
};