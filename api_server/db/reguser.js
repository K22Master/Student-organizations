// 引入数据库模块
const db = require('../db/index');
// 导入bcryptjs加密模块
const bcrypt = require('bcryptjs');
// 插入数据
function regInsert(sql, data, res) {
    db.query(sql, [data.id, data.pname, data.pwd, data.pdepartment, data.phone, data.aname, data.aid], (err, results) => {
        if (err) {
            return res.send({
                status: 404,
                msg: err.message,
            });
        }
        if (results.affectedRows !== 1) {
            return res.send({ status: 103, msg: '注册失败！' });
        }
        res.send({
            status: 200,
            msg: '注册成功！'
        });
    });
}
// 数据查询，是否重复
function regQuery(sql, data, res) {
    db.query(sql, data.id, (err, results) => {
        if (err) {
            return res.send({
                status: 404,
                msg: err.message,
            });
        }
        if (results.length > 0) {
            return res.send({
                status: 102,
                msg: '用户名已被占用，请更换其他名称',
            });
        }
        // 创建插入语句
        const sqlStr = 'insert into president(id,pname,pwd,pdepartment,phone,aname,aid) values (?,?,?,?,?,?,?)';
        // 将密码进行加密
        data.pwd = bcrypt.hashSync(data.pwd, 10);
        // 当不重复时,则调用插入
        regInsert(sqlStr, data, res);
    });
}
module.exports = {
    regQuery
}