require('dotenv').config();
const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;


const loginService = async (email, pass_word) => {
    try {
        const user = await userModel.login(email);
        if (user) {
            const isMatchPassword = await bcrypt.compare(pass_word, user.pass_word);
            if (!isMatchPassword) {
                throw new Error('Email hoặc mật khẩu không hợp lệ 2');
            } else {
                const payload = { id : user.id, email: user.email, user_name : user.user_name, role: user.role };
                const accessToken = jwt.sign(
                    payload, 
                    process.env.JWT_SECRET, 
                    { 
                        expiresIn: process.env.JWT_EXPIRES_IN 
                    });
                    console.log(' JWT token:', accessToken);
                return accessToken;
            }
        } else {
            throw new Error('Email hoặc mật khẩu không hợp lệ');
        }
    }
    catch (error) {
        throw new Error('Lỗi khi đăng nhập người dùng: ' + error.message);
    }
}

const registerService = async (email, pass_word, user_name) => {
    try {
        console.log('Register service called with:', email, pass_word, user_name);
        const hashedPassword = await bcrypt.hash(pass_word, saltRounds);
        const newUser = await userModel.register(email, hashedPassword, user_name);
        return newUser;
    } catch (error) {
        throw new Error( error.message);
    }
}   



module.exports = {
    loginService,
    registerService
};  