const { insertDb } = require('../db/insert');
const { updateDb } = require('../db/update');
const { deleteDb } = require('../db/delete');
const { getAllDb } = require('../db/select');
const { getAllSum } = require('../util/getsum');
// 活动增加
exports.add = (req, res) => {
    console.log(req.body);
    // 将前端传过来的数据进行解析
    const data = [req.body.salonname, req.body.aname, req.body.place, req.body.duration, req.body.attendees, req.body.pname];
    // 定义对应的SQL语句
    const sql = "insert into salon(salonname,aname,place,duration,attendees,pname) values (?,?,?,?,?,?)";
    // 使用插入函数
    insertDb(sql, data, res);
}
// 活动信息修改
exports.update = (req, res) => {
    const data = [req.body.salonname, req.body.aname, req.body.place, req.body.duration, req.body.attendees, req.body.pname, req.body.id];
    const sql = 'update salon set salonname=?,aname=?,place=?,duration=?,attendees=?,pname=? where id=?';
    updateDb(sql, data, res);
}
// 活动审批信息
exports.isno = (req, res) => {
    const data = [req.body.isno, req.body.id];
    const sql = 'update salon set isno=? where id=?';
    updateDb(sql, data, res);
}
exports.getAll = (req, res) => {
    req.body = req.query;
    console.log(req.body);
    if (!req.body.page) {
        if (!req.body.name && !req.body.times) {
            console.log('!req.body.name && !req.body.times');
            const sql = 'select * from salon';
            getAllSum(sql, req.body, res);
        } else if (req.body.name && !req.body.times) {
            console.log('req.body.name && !req.body.times');
            const sql = "select * from salon where aname=?";
            getAllSum(sql, req.body, res);
        } else if (!req.body.name && req.body.times) {
            console.log('!req.body.name && req.body.times');
            const sql = "select * from salon where duration like concat('%',?,'%')";
            getAllSum(sql, req.body, res);
        } else {
            console.log('req.body.name && req.body.times');
            const sql = "select * from salon where aname=? and duration like concat('%',?,'%')";
            getAllSum(sql, req.body, res);
        }
    } else if (!req.body.name && !req.body.times) {
        req.body.state_index = req.body.page * req.body.size - req.body.size;
        const sql = "select * from salon limit ?,?";
        getAllDb(sql, req.body, res);
    } else if (req.body.name && !req.body.times) {
        req.body.state_index = req.body.page * req.body.size - req.body.size;
        const sql = "select * from salon where aname=? limit ?,? ";
        getAllDb(sql, req.body, res);
    } else if (!req.body.name && req.body.times) {
        req.body.state_index = req.body.page * req.body.size - req.body.size;
        const sql = "select * from salon where duration like concat('%',?,'%') limit ?,? ";
        getAllDb(sql, req.body, res);
    } else {
        req.body.state_index = req.body.page * req.body.size - req.body.size;
        const sql = "select * from salon where aname=? and duration like concat('%',?,'%') limit ?,? ";
        getAllDb(sql, req.body, res);
    }
}