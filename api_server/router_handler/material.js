const { insertDb } = require('../db/insert');
const { updateDb } = require('../db/update');
const { deleteDb } = require('../db/delete');
const { getAllDb } = require('../db/select');
const { getAllSum } = require('../util/getsum');
// 物资增加
exports.add = (req, res) => {
    console.log(req.body);
    // 将前端传过来的数据进行解析
    const data = [req.body.name, req.body.goods, req.body.num, req.body.mtag];
    // 定义对应的SQL语句
    const sql = "insert into material(aname,goods,num,mtag) values (?,?,?,?)";
    // 使用插入函数
    insertDb(sql, data, res);
}
// 物资修改
exports.update = (req, res) => {
    console.log(req.body);
    const data = [req.body.name, req.body.goods, req.body.num, req.body.mtag, req.body.id];
    const sql = "update material set aname=?,goods=?,num=?,mtag=? where id=?";
    updateDb(sql, data, res);
}
// 物资查询
exports.getAll = (req, res) => {
    console.log(req.query);
    req.body = req.query;
    if (!req.body.page) {
        if (!req.body.name) {
            const sql = "select * from material";
            getAllSum(sql, req.body, res);
        } else {
            const sql = "select * from material where aname=?";
            getAllSum(sql, req.body, res);
        }
    } else if (!req.body.name) {
        req.body.state_index = req.body.page * req.body.size - req.body.size;
        const sql = "select * from material limit ?,?";
        getAllDb(sql, req.body, res);
    } else {
        req.body.state_index = req.body.page * req.body.size - req.body.size;
        const sql = "select * from material where aname=? limit ?,? ";
        getAllDb(sql, req.body, res);
    }
}
// 物资删除
exports.delete = (req, res) => {
    console.log(req.body);
    const sql = "delete from material where id=?";
    const data = [req.body.id];
    deleteDb(sql, data, res);
}