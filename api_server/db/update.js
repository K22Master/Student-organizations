// 引入数据库模块
const db = require('./index');
function updateDb(sql, data, res) {
    console.log("updateDb被调用---" + sql + "\n" + data);
    db.query(sql, data, (err, results) => {
        // 如果修改语句出错，提示报错
        if (err) {
            return res.send({
                status: 404,
                msg: err.message,
            });
        }
        if (results.affectedRows === 1) {
            return res.send({
                status: 200,
                msg: "修改成功",
            });
        }
    });
}
module.exports = {
    updateDb,
}