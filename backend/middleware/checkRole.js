
const checkRole = (role = []) => {
    return async (req, res, next) => {
        try {
            if (!req.user) {
                return res.status(401).json({ message: 'Người dùng chưa đăng nhập' });
            }

            if (role.length && !role.includes(req.user.role)) {
                return res.status(403).json({ message: 'Bạn không có quyền truy cập chức năng này' });
            }

            next();

        } catch (error) {
            console.error('checkRole error:', error);
            return res.status(500).json({
                message: 'Lỗi kiểm tra quyền theo vai trò'
            });
        }
    };
};

module.exports = { checkRole };
