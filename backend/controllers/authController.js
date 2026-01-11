const authService = require('../services/authService');

// const createUser = (req, res) => {
//     const { username, password, email } = req.body;
//     console.log('Creating user with data:', req.body);
//     // Logic to create a user would go here
//     res.status(201).json({ message: 'User created successfully', user: { username, email } });
// }

const loginUser = async (req, res) => {
    try {
    const { email, pass_word } = req.body;
    // console.log('Login request data:', req.body);
    const data = await authService.loginService(email, pass_word);
    return res.status(200).json({ message: 'Đăng nhập thành công', token: data });
}   catch (error) {
    console.error('Lỗi khi đăng nhập người dùng:', error);
    return res.status(500).json({ message: 'Lỗi khi đăng nhập người dùng: ' + error.message });
}
};


const resgisterUser = async (req, res) => {
    try {
    const { email, pass_word, user_name } = req.body;
     //console.log('Register request data:', req.body);

    if (!email || !pass_word) {
        return res.status(400).json({ message: 'Email và mật khẩu là bắt buộc' });
    }

    const data = await authService.registerService( email, pass_word, user_name);
    return res.status(201).json({ message: 'Đăng ký thành công', data });
}   catch (error) {
    console.error('Lỗi khi đăng ký người dùng:', error);
    return res.status(500).json({ message: 'Lỗi khi đăng ký người dùng: ' + error.message });
}
};


module.exports = {
    // createUser,
    loginUser,
    resgisterUser
};