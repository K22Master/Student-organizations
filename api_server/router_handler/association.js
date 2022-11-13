const { insertDb } = require('../db/insert');
const { updateDb } = require('../db/update');
const { deleteDb } = require('../db/delete');
const { getAllDb } = require('../db/select');
const { isExist } = require('../validation/association');
// 社团插入
exports.add = (req, res) => {
    console.log(req.body);
    const sql = "select * from association where aname =?"
    const sqlstr = "insert into association(aname,tag) values(?,?)";
    const data = [req.body.name, req.body.tag];
    // 调用验证函数，判断是否存在,如果不存在执行第二条sql语句
    isExist(sql, req.body.name, sqlstr, data, res);
}
// 社团查询
exports.getAll = (req, res) => {
    // console.log(req.body);
    console.log(req.query);
    req.body = req.query;
    if (!req.body.page) {
        const sql = "select * from association ";
        getAllDb(sql, req.body, res);
    } else if (!req.body.name) {//携带page则表示分页查询
        // 进行计算，每次查询的开始位置是哪里
        req.body.state_index = req.body.page * req.body.size - req.body.size;
        const sql = "select * from association limit ?,?";
        getAllDb(sql, req.body, res);
    } else {
        // 进行计算，每次查询的开始位置是哪里
        req.body.state_index = req.body.page * req.body.size - req.body.size;
        const sql = "select * from association where aname=? limit ?,?";
        getAllDb(sql, req.body, res);
    }
}
// 社团更新
exports.update = (req, res) => {
    console.log(req.body);
    const sql = "update association set aname=?,tag=? where aid =?"
    const data = [req.body.name, req.body.tag, req.body.id];
    updateDb(sql, data, res);
}
// 社团删除
exports.delete = (req, res) => {
    console.log(req.body);
    const sql = "delete from association where  aid =?";
    data = [req.body.id];
    deleteDb(sql, data, res);
}