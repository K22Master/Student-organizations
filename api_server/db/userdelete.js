// 引入数据库模块
const db = require('./index');
// 检查是否存在
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
                status: 301,
                msg: '不存在！',
            });
        }
    });
}
// 封装删除函数
function deleteDb(sql, data, res) {
    db.query(sql, [data.id], (err, results) => {
        if (err) {
            return res.send({
                status: 404,
                msg: err.message,
            });
        }
        if (results.affectedRows === 1) {
            return res.send({
                status: 200,
                msg: '删除成功！',
            });
        }
    });
}
// 会长删除
exports.deleteH = function (sql, data, res) {
    // 检查信息是否存在
    queryIsno(sql, data, res);
    // 定义删除语句
    const desql = 'delete from president where id=?';
    deleteDb(desql, data, res);
}