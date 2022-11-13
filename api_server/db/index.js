// 导入mysql2模块
const mysql = require('mysql2');
// 链接服务器
const db = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '123456',
    database: 'studentsclubsys',
});
// 将数据库暴露出去
module.exports = db;