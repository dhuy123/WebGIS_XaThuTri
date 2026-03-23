import { apiClient } from './api_config.js';

const getNhaVanHoa = async (page, limit) => {
    try {
        const response = await apiClient.get(`/nha_van_hoa?page=${page}&limit=${limit}`);
        console.log('API-getNhaVanHoa response:', response.data);
        console.log('tổng sô bản ghi:', response);
        return response.data;
    } catch (error) {
        console.error('Lỗi lấy danh sách nhà văn hóa:', error);
        throw error;
    }
}

export {
    getNhaVanHoa
}