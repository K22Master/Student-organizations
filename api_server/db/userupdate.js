// 引入数据库模块
const db = require('./index');
// 导入bcryptjs加密模块
const bcrypt = require('bcryptjs');
// 定义是否存在的检查函数
function queryIsno(sql, data, res) {
    db.query(sql, (data.id ? [data.id] : [data.username]), (err, results) => {
        if (err) {
            return res.send({
                status: 404,
                msg: err.message,
            });
        }
        if (results.length !== 1) {
            return res.send({
                status: 201,
                msg: '不存在！',
            });
        }
    });
}
// admin修改
function updateDb(sql, data, res) {
    db.query(sql, [data.pwd, data.username], (err, results) => {
        if (err) {
            return res.send({
                status: 404,
                msg: err.message,
            });
        }
        if (results.affectedRows === 1) {
            return res.send({
                status: 200,
                msg: '修改成功！',
            });
        }
    });
}
// 会长修改
function updateH(sql, data, res) {
    db.query(sql, [data.name, data.pwd, data.pdepartment, data.phone, data.aname, data.aid, data.id], (err, results) => {
        if (err) {
            return res.send({
                status: 404,
                msg: err.message,
            });
        }
        if (results.affectedRows === 1) {
            return res.send({
                status: 200,
                msg: '修改成功！',
            });
        }
    });
};
// admin更新
exports.updateAd = function (sql, data, res) {
    // 先通过查询语句，判断是否存在
    queryIsno(sql, data, res);
    // 如果存在则将密码进行加密然后存入
    data.pwd = bcrypt.hashSync(data.pwd, 10);
    // 定义sql语句
    const updateStr = 'update teacher set pwd =? where uname=?';
    // 调用admin更新函数
    updateDb(updateStr, data, res);
}
// 会长更新
exports.update = function (sql, data, res) {
    // 先通过查询语句，判断是否存在
    queryIsno(sql, data, res);
    // 如果存在则将密码进行加密然后存入
    data.pwd = bcrypt.hashSync(data.pwd, 10);
    // 定义sql语句
    const updateStr = 'update president set pname=?,pwd=?,pdepartment=?,phone=?,aname=?,aid=? where id=?';
    // 调用会长更新函数
    updateH(updateStr, data, res);
}