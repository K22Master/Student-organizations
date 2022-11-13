const { insertDb } = require('../db/insert');
const { updateDb } = require('../db/update');
const { getAllDb } = require('../db/select');
const { getAllSum } = require('../util/getsum')
// 资金信息添加
exports.add = (req, res) => {
    console.log(req.body);
    // 将前端传过来的数据进行解析
    const data = [req.body.name, req.body.cnum, req.body.ctag, req.body.time, req.body.money];
    // 定义对应的SQL语句
    const sql = "insert into capital(aname,cnum,ctag,time,money) values (?,?,?,?,?)";
    // 使用插入函数
    insertDb(sql, data, res);
}
// 资金信息修改
exports.update = (req, res) => {
    console.log(req.body);
    // 将前端传过来的数据进行解析
    const data = [req.body.cnum, req.body.ctag, req.body.time, req.body.money, req.body.id];
    // 定义对应的SQL语句
    const sql = "update capital set cnum=?,ctag=?,time=?,money=? where id=?";
    updateDb(sql, data, res);
}
// 资金审批修改
exports.isno = (req, res) => {
    console.log(req.body);
    const data = [req.body.isno, req.body.id];
    const sql = "update capital set isno=? where id=?";
    updateDb(sql, data, res);
}
// 资金信息查询
exports.getAll = (req, res) => {
    console.log(req.query);
    req.body = req.query;
    if (!req.body.page) {
        if (!req.body.name && !req.body.times) {
            console.log('!req.body.name && !req.body.times');
            const sql = 'select * from capital';
            getAllSum(sql, req.body, res);
        } else if (req.body.name && !req.body.times) {
            console.log('req.body.name && !req.body.times');
            const sql = "select * from capital where aname=?";
            getAllSum(sql, req.body, res);
        } else if (!req.body.name && req.body.times) {
            console.log('!req.body.name && req.body.times');
            const sql = "select * from capital where time like concat('%',?,'%')";
            getAllSum(sql, req.body, res);
        } else {
            console.log('req.body.name && req.body.times');
            const sql = "select * from capital where aname=? and time like concat('%',?,'%')";
            getAllSum(sql, req.body, res);
        }
    } else if (!req.body.name && !req.body.times) {
        req.body.state_index = req.body.page * req.body.size - req.body.size;
        const sql = "select * from capital limit ?,?";
        getAllDb(sql, req.body, res);
    } else if (req.body.name && !req.body.times) {
        req.body.state_index = req.body.page * req.body.size - req.body.size;
        const sql = "select * from capital where aname=? limit ?,? ";
        getAllDb(sql, req.body, res);
    } else if (!req.body.name && req.body.times) {
        req.body.state_index = req.body.page * req.body.size - req.body.size;
        const sql = "select * from capital where time like concat('%',?,'%') limit ?,? ";
        getAllDb(sql, req.body, res);
    } else {
        req.body.state_index = req.body.page * req.body.size - req.body.size;
        const sql = "select * from capital where aname=? and time like concat('%',?,'%') limit ?,? ";
        getAllDb(sql, req.body, res);
    }
}