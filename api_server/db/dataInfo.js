const db = require('../db/index');
exports.getDataInfo = function (sql, res) {
    db.query(sql, (err, results) => {
        if (!err) {
            console.log(results);
            return res.send({
                status: 200,
                data: results
            });
        }
    });
}