// 引入数据库模块
const db = require('../db/index');
const { insertDb } = require('../db/insert');
// 验证数据是否存在表中
exports.isExist = function (sql, name, sqlstr, data, res) {
    console.log("isExist被调用---" + sql + "\n" + data);
    db.query(sql, [name], async (err, results) => {
        // 如果查询语句报错，返回错误信息
        if (err) {
            return res.send({
                status: 404,
                msg: err.message,
            });
        }
        console.log(results);
        // 如果存在则返回true
        if (results.length === 1) {
            return res.send({
                status: 404,
                msg: '社团已存在！',
            });
        }
        insertDb(sqlstr, data, res);
    });
}