require('dotenv').config();
const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;


const loginService = async (email, pass_word) => {
    console.log('Login service called with:', email, pass_word);
    try {
        const user = await userModel.login(email);
        //    console.log('Password from FE:', pass_word);
        // console.log('Password hash from DB:', user.pass_word);
        if (user) {
            const isMatchPassword = await bcrypt.compare(pass_word, user.pass_word);
            if (!isMatchPassword) {
                throw new Error('Email hoặc mật khẩu không hợp lệ 2');
            } else {
                const payload = { id: user.id, 
                    email: user.email, 
                    user_name: user.user_name, 
                    role: user.role, 
                    ngay_sinh: user.ngay_sinh, 
                    phone: user.phone, 
                    gmail: user.gmail,
                    phone: user.phone
                 };

                const accessToken = jwt.sign(
                    payload,
                    process.env.JWT_SECRET,
                    {
                        expiresIn: process.env.JWT_EXPIRES_IN
                    });
                console.log(' JWT token:', accessToken);
                return {
                    success: true,
                    message: 'Đăng nhập thành công',
                    token: accessToken,
                    user: payload
                }
            }
        } else {
            throw new Error('Email hoặc mật khẩu không hợp lệ');
        }
    }
    catch (error) {
        throw new Error('Lỗi khi đăng nhập người dùng: ' + error.message);
    }
}

const registerService = async (data) => {
    try {
        console.log('Register service called with:', data);
        const hashedPassword = await bcrypt.hash(data.pass_word, saltRounds);
        const newUser = await userModel.register({ ...data, pass_word: hashedPassword });
        return newUser;
    } catch (error) {
        throw new Error(error.message);
    }
}



module.exports = {
    loginService,
    registerService
};  