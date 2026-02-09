import { apiClient } from './api_config.js';

const getFiles = async () => {
    try {
        const response = await apiClient.get('/files');
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



export { getFiles, getFileById };