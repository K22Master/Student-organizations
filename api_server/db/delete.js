// 引入数据库模块
const db = require('./index');
function deleteDb(sql, data, res) {
    console.log("delete被调用---" + sql + "\n" + data);
    db.query(sql, data, (err, results) => {
        // 如果删除语句出错，提示报错
        if (err) {
            return res.send({
                status: 404,
                msg: err.message,
            });
        }
        if (results.affectedRows === 1) {
            return res.send({
                status: 200,
                msg: "删除成功!",
            });
        }
        return res.send({
            status: 404,
            msg: "不存在！",
        });
    });
}
module.exports = {
    deleteDb,
}