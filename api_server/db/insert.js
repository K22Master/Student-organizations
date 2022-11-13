// 引入数据库模块
const db = require('./index');
function insertDb(sql, data, res) {
    console.log("insertDb被调用---" + sql + "\n" + data);
    db.query(sql, data, (err, results) => {
        // 如果插入语句出错，提示报错
        if (err) {
            return res.send({
                status: 404,
                msg: err.message,
            });
        }
        if (results.affectedRows === 1) {
            return res.send({
                status: 200,
                msg: "插入成功！",
            });
        }
    });
}
module.exports = {
    insertDb,
}