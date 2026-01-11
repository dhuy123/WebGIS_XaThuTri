const jwt = require('jsonwebtoken');
require('dotenv').config();

const auth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        // Kiểm tra token trong Header
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            req.user=null;
            //return res.status(401).json({ message: 'Không tìm thấy token!' });
            return next();
        }
        const token = authHeader.split(' ')[1];
        // Xác thực token
        if (!token) {
            return res.status(401).json({ message: 'Token không hợp lệ!' });
        }

        // Giải mã token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Gắn thông tin người dùng vào req để sử dụng trong các middleware hoặc route tiếp theo
        req.user = decoded;
        next();

    } catch (error) {
        console.error('Lỗi middleware auth:', error.message);
        return res.status(401).json({ message: 'Token không hợp lệ hoặc đã hết hạn!' });
    }

};

module.exports = auth;

