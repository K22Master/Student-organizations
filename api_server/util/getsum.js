// 引入数据库模块
const db = require('../db/index');
exports.getAllSum = function (sql, data, res) {
    if (!data.name && !data.times) {
        console.log("无参：" + data.name, data.times);
        db.query(sql, (err, results) => {
            console.log(sql);
            if (!err) {
                console.log('results.length=' + results.length);
                return res.send({
                    status: 200,
                    total: results.length,
                }
                );
            }
        });
    } else if (data.name && !data.times) {
        console.log(data.name, data.times);
        db.query(sql, [data.name], (err, results) => {
            if (!err) {
                return res.send({ status: 200, total: results.length });
            }
        });
    } else if (!data.name && data.times) {
        console.log(data.name, data.times);
        db.query(sql, [data.times], (err, results) => {
            if (!err) {
                return res.send({ status: 200, total: results.length });
            }
        });
    } else {
        console.log(data.name, data.times);
        db.query(sql, [data.name, data.times], (err, results) => {
            if (!err) {
                return res.send({ status: 200, total: results.length });
            }
        });
    }
}