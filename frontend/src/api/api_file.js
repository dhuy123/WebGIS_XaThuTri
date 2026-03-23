import { apiClient } from './api_config.js';

const getFiles = async (page, limit) => {
    try {
        const response = await apiClient.get(`/files?page=${page}&limit=${limit}`);
        console.log('API-getFiles response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Lỗi lấy danh sách file:', error);
        throw error;
    }
}

const getFileById = async (id) => {
    try {
        const response = await apiClient.get(`/files/${id}`,{
            responseType: 'blob'
        });
      return response;
    } catch (error) {
        console.error('Lỗi lấy thông tin file:', error);
        throw error;
    }
}

const createFile = async (data) => {
    try {
        console.log('API-createFile data:', data);
        const response = await apiClient.post('/files/upload', data,
        {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
        );
        return response.data;
    } catch (error) {
        console.error('Lỗi tạo file:', error);
        throw error;
    }
}

const updateById = async (id, data) => {
    try {
        const response = await apiClient.put(`/files/${id}`, data);
        return response.data;
    } catch (error) {
        console.error('Lỗi cập nhật file:', error);
        throw error;
    }
}

const deleteById = async (id) => {
    try {
        const response = await apiClient.delete(`/files/${id}`);
        return response.data;
    } catch (error) {
        console.error('Lỗi xóa file:', error);
        throw error;
    }       
}



export { getFiles, getFileById, updateById, deleteById, createFile };