import { apiClient } from './api_config.js';

const getXepHangDiTich = async (page, limit) => {
    try {
        const response = await apiClient.get(`/xepHangDiTich?page=${page}&limit=${limit}`);
        console.log('API-getXepHangDiTich response:', response.data);
        console.log('tổng sô bản ghi:', response);
        return response.data;
    } catch (error) {
        console.error('Lỗi lấy danh sách xếp hạng địa danh:', error);
        throw error;
    }
}

const searchXepHangDiTich = async (query, page, limit) => {
    try {
        const response = await apiClient.get(`/xepHangDiTich/search`, { params: { keyword: query, page, limit } });
        console.log('API-searchXepHangDiTich response:', response.data);
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
    getXepHangDiTich,
    updateById,
    createLoaiHienTrang,
    deleteById,
    searchXepHangDiTich
};