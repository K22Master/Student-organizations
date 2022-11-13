const { insertDb } = require('../db/insert');
const { updateDb } = require('../db/update');
const { deleteDb } = require('../db/delete');
const { getAllDb } = require('../db/select');
const { getAllSum } = require('../util/getsum');
// 分装函数，判断姓名或则社团名存在否
function isNull(data) {
    console.log(!data.name);
    if (!data.name || !data.aname) {
        console.log("111");
        return false;
    }
    return true;
}
// 学生添加
exports.add = (req, res) => {
    console.log(req.body);
    if (!isNull(req.body)) {
        return res.send({
            status: 404,
            msg: '用户名或者社团名不能为空！',
        });
    };
    // 将前端传过来的数据进行解析
    const data = [req.body.name, req.body.sex, req.body.department, req.body.phone, req.body.aname];
    // 定义对应的SQL语句
    const sql = "insert into students(uname,sex,department,phone,aname) values (?,?,?,?,?)";
    // 使用插入函数
    insertDb(sql, data, res);
}
// 学生修改
exports.update = (req, res) => {
    console.log(req.body);
    if (!isNull(req.body, res)) {
        return res.send({
            status: 404,
            msg: '用户名或者社团名不能为空！',
        });
    };
    // 将前端传过来的数据进行解析
    const data = [req.body.name, req.body.sex, req.body.department, req.body.phone, req.body.aname, req.body.id];
    // 定义对应的SQL语句
    const sql = "update students set uname=?,sex=?,department=?,phone=?,aname=? where id=?"
    // 使用插入函数
    updateDb(sql, data, res);
}
// 学生删除
exports.remove = (req, res) => {
    console.log(req.body);
    // 将前端传过来的数据进行解析
    const data = [req.body.id];
    // 定义对应的SQL语句
    const sql = "delete from students where id=?"
    // 使用插入函数
    deleteDb(sql, data, res);
}
// 学生查询
exports.getAll = (req, res) => {
    console.log(req.body);
    req.body = req.query;
    if (!req.body.page) {
        if (!req.body.name) {
            const sql = "select * from students ";
            getAllSum(sql, req.body, res)
        } else {
            const sql = "select * from students where aname=?";
            getAllSum(sql, req.body, res)
        }
    } else if (!req.body.name && !req.body.time) {//携带page则表示分页查询
        // 进行计算，每次查询的开始位置是哪里
        req.body.state_index = req.body.page * req.body.size - req.body.size;
        const sql = "select * from students limit ?,?";
        getAllDb(sql, req.body, res);
    } else {
        // 进行计算，每次查询的开始位置是哪里
        req.body.state_index = req.body.page * req.body.size - req.body.size;
        const sql = "select * from students where aname=? limit ?,? ";
        getAllDb(sql, req.body, res);
    }
}