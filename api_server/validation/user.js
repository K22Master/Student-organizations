// 导入数据库操作模块
const { regQuery } = require('../db/reguser');
const { loginQuery } = require('../db/login');
const { updateAd, update } = require('../db/userupdate');
const { deleteH } = require('../db/userdelete');
const { getAllDb } = require('../db/select');
const { getAllSum } = require('../util/getsum');
const { updateDb } = require('../db/update');
// 导入bcryptjs加密模块
const bcrypt = require('bcryptjs');
// 会长注册
exports.reguserVal = function (data, res) {
    console.log(data);
    // 做一次简单验证
    if (!data.id || !data.pwd) {
        return res.send({
            status: 101,
            msg: "用户名或密码不能为空"
        });
    }
    // 创建查询sql语句
    const sql = "select * from president where id=?";
    // 数据进行验证
    regQuery(sql, data, res);
}
// admin登录
exports.loginAdVal = function (data, res) {
    console.log(data);
    // 验证密码和用户名不能为空
    if (!data.username || !data.pwd) {
        console.log('名字为空！');
        return res.send({
            status: 101,
            msg: "用户名或密码不能为空"
        });
    }
    // 身份验证
    // if (data.type === "2") {
    //     return res.send({
    //         status: 104,
    //         msg: "身份不正确"
    //     });
    // }
    // 定义查询语句获取用户信息
    const sql = "select * from teacher where uname=?";
    // 登陆函数
    loginQuery(sql, data, res);
}
// 会长登录
exports.loginVal = function (data, res) {
    console.log(data);
    // 验证密码和用户名不能为空
    if (!data.username || !data.pwd) {
        console.log('名字为空！');
        return res.send({
            status: 101,
            msg: "用户名或密码不能为空"
        });
    }
    // 身份验证
    // if (data.type === "1") {
    //     return res.send({
    //         status: 104,
    //         msg: "身份不正确"
    //     });
    // }
    // 定义查询语句获取用户信息
    const sql = "select * from president where id=?";
    // 登录函数
    loginQuery(sql, data, res);
}
// admin修改
exports.updateAdVal = function (data, res) {
    console.log(data);
    // 验证密码和用户名不能为空
    if (!data.username || !data.pwd) {
        console.log('名字为空！');
        return res.send({
            status: 101,
            msg: "用户名或密码不能为空"
        });
    }
    // 定义查询语句获取用户信息
    const sql = "select * from teacher where uname=?";
    // 调用修改密码的函数
    updateAd(sql, data, res);
}
// 会长修改
exports.updateVal = function (data, res) {
    console.log(data);
    // 做一次简单验证
    if (!data.id || !data.pwd) {
        return res.send({
            status: 101,
            msg: "用户名或密码不能为空"
        });
    }
    const sql = "select * from president where id=?";
    update(sql, data, res)
}
// 会长删除
exports.deleteVal = function (data, res) {
    console.log(data);
    if (!data.id) {
        return res.send({
            status: 101,
            msg: "用户名不能为空!",
        });
    }
    const sql = "select * from president where id=?";
    deleteH(sql, data, res);
}
// 获取所有的会长信息
exports.getAllVal = function (data, res) {
    // 判断是否是要查询所有信息的数量
    if (!data.page) {
        if (!data.name) {
            const sql = "select * from president ";
            // 调用获取全部的查询
            getAllSum(sql, data, res);
        } else {
            const sql = "select * from president where aname=? ";
            // 调用获取全部的查询
            getAllSum(sql, data, res);
        }

    } else {//携带page则表示分页查询
        if (!data.name) {
            // 进行计算，每次查询的开始位置是哪里
            data.state_index = data.page * data.size - data.size;
            const sql = "select * from president limit ?,?";
            getAllDb(sql, data, res);
        } else {
            // 进行计算，每次查询的开始位置是哪里
            data.state_index = data.page * data.size - data.size;
            const sql = "select * from president where aname=? limit ?,?";
            getAllDb(sql, data, res);
        }

    }
}
// 根据id重置会长密码
exports.updatePass = function (data, res) {
    data.pwd = bcrypt.hashSync(data.pwd, 10);
    const sql = "update president set pwd=? where id=?";
    updateDb(sql, [data.pwd, data.id], res);
}