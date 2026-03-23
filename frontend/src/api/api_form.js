import { apiClient } from './api_config.js';

const getLayerById = async (layer,id) => {
    try {
        const response = await apiClient.get(`/${layer}/${id}`);
        console.log('API-getLayerById response:', response.data);
      return response.data;
    } catch (error) {
        console.error('Lỗi lấy thông tin file:', error);
        throw error;
    }
}

export {
    getLayerById
};