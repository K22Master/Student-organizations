// 引入数据库模块
const db = require('../db/index');
// 导入bcryptjs加密模块
const bcrypt = require('bcryptjs');
const { encryption } = require('../util/token');
// 数据查询，是否重复
function loginQuery(sql, data, res) {
    db.query(sql, data.username, (err, results) => {
        if (err) {
            return res.send({
                status: 404,
                msg: err.message,
            });
        }
        // 如果为查询到则说明未登录
        if (results.length !== 1) {
            return res.send({
                status: 201,
                msg: '未注册!!',
            });
        }
        // 通过bcrypt中间件进行密码判断，传入两个值，如果相等则为true，否则为false
        if (!bcrypt.compareSync(data.pwd, results[0].pwd)) {
            return res.send({
                status: 202,
                msg: '密码错误！',
            });
        }
        const userinfo = { name: results[0].uname, pwd: results[0].pwd }
        const tokenStr = encryption(userinfo);
        return res.send({
            status: 200,
            msg: '登录成功！',
            token: 'Bearer ' + tokenStr,
            id: results[0].id,
            name: results[0].uname || results[0].pname,
            type: results[0].type,
            aname: results[0].aname,
        });
    });
}
module.exports = {
    loginQuery
}