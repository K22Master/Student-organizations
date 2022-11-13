// 导入注册验证模块
const { reguserVal, loginAdVal, loginVal, updateAdVal, updateVal, deleteVal, getAllVal, updatePass } = require('../validation/user');
// 会长注册
exports.regUser = (req, res) => {
    // 获取服务器传过来的数据
    const userinfo = req.body;
    // 调用注册验证函数
    reguserVal(userinfo, res);
}
// admin登录
exports.loginAd = (req, res) => {
    const userinfo = req.body;
    console.log(req.body);
    loginAdVal(userinfo, res);
}
// admin修改
exports.updateAd = (req, res) => {
    const userinfo = req.body;
    updateAdVal(userinfo, res);
}
// 会长登录
exports.login = (req, res) => {
    const userinfo = req.body;
    loginVal(userinfo, res);
}
// 会长修改
exports.update = (req, res) => {
    const userinfo = req.body;
    updateVal(userinfo, res);
}
// 会长删除
exports.delete = (req, res) => {
    const userinfo = req.body;
    deleteVal(userinfo, res);
}
// 获取所有会长或者
exports.getAll = (req, res) => {
    const info = req.query;
    console.log(info);
    getAllVal(info, res);
}
exports.updatePwd = (req, res) => {
    const info = req.body;
    console.log(info);
    updatePass(info, res);
}