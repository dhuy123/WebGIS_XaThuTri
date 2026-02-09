import { apiClient } from "./api_config";

const countCongTrinhGiaoDuc = async () => {
    try {
        const response = await apiClient.get('/congTrinhGiaoDuc/count');
        // console.log('API-countCongTrinhGiaoDuc response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Lỗi đếm tổng số công trình giáo dục:', error);
        throw error;
    }
}

export {
    countCongTrinhGiaoDuc,

}