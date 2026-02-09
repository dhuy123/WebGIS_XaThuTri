import { apiClient } from './api_config.js';

const getLoaiHienTrang = async (page, limit) => {
    try {
        const response = await apiClient.get(`/loaiHienTrang?page=${page}&limit=${limit}`);
        console.log('API-getLoaiHienTrang response:', response.data);
        console.log('tổng sô bản ghi:', response);
        return response.data;
    } catch (error) {
        console.error('Lỗi lấy danh sách loại hiện trạng:', error);
        throw error;
    }
}

const searchLoaiHienTrang1 = async (query, page, limit) => {
    try {
        const response = await apiClient.get(`/loaiHienTrang/search`, { params: { keyword: query, page, limit } });
        console.log('API-searchLoaiHienTrang response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Lỗi tìm kiếm loại hiện trạng:', error);
        throw error;
    }
}

const createLoaiHienTrang = async (data) => {
    try {
        const response = await apiClient.post('/loaiHienTrang', data);
        // console.log('API-createLoaiHienTrang response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Lỗi tạo loại hiện trạng:', error);
        throw error;
    }
}

const updateById = async (id, data) => {
    try {
        const response = await apiClient.put(`/loaiHienTrang/${id}`, data);
        // console.log('API-updateById response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Lỗi cập nhật loại hiện trạng:', error);
        throw error;
    }
}

const deleteById = async (id) => {
    try {
        const response = await apiClient.delete(`/loaiHienTrang/${id}`);
        return response.data;
    } catch (error) {
        console.error('Lỗi xóa loại hiện trạng:', error);
        throw error;
    }
}

export {
    getLoaiHienTrang,
    updateById,
    createLoaiHienTrang,
    deleteById,
    searchLoaiHienTrang1
};