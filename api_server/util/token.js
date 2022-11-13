// 导入jwt加密模块
const jwt = require('jsonwebtoken');
// 导入config文件
const config = require('./config');

function encryption(data) {
    return jwt.sign(data, config.secretkey, { expiresIn: config.expiresIn });
}

module.exports = {
    encryption,
}