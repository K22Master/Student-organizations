// 引入数据库模块
const { query } = require('../db/index');
const db = require('../db/index');
// 多应用查询
exports.getAllDb = function (sql, data, res) {
    // 如果没参数，则表示查询所有信息的个数
    if (!data.page) {
        console.log("查询所有调用！");
        db.query(sql, (err, results) => {
            if (err) {
                return res.send({
                    status: 404,
                    msg: err.message,
                });
            }
            if (results.length < 0) {
                return res.send({
                    status: 404,
                    msg: "未获取到信息",
                });
            }
            console.log(results);
            return res.send({
                status: 200,
                data: results,
            });
        });
    } else {
        // 否则，有可能是进行分页查询
        console.log(sql);
        // 通过判断是否携带name和times,表示是否有条件查询
        // 如果时间或者姓名中有一个存在，则表示查询的条件为哪个社团或者哪个时间段内的
        if (!data.name && !data.times) {
            data = [data.state_index, data.size * 1];
        } else if (data.name && !data.times) {
            data = [data.name, data.state_index, data.size * 1];
        } else if (!data.name && data.times) {
            data = [data.times, data.state_index, data.size * 1];
        } else {
            data = [data.name, data.times, data.state_index, data.size * 1];
        }
        console.log(data);
        db.query(sql, data, (err, results) => {
            console.log(sql);
            if (err) {
                return res.send({
                    status: 404,
                    msg: err.message,
                });
            }
            if (results.length < 0) {
                return res.send({
                    status: 404,
                    msg: "为获取到信息",
                });
            }
            return res.send({
                status: 200,
                data: results,
            });
        });
    }
}