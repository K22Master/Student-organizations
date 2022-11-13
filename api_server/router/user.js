const express = require('express');
// 导入路由模块
const router = express.Router();
// 导入路由处理模块
const user_handler = require('../router_handler/user');
// admin登录模块
router.post('/loginAd', user_handler.loginAd);
// admin修改模块
router.put('/updateAd', user_handler.updateAd);
// 会长登录模块
router.post('/login', user_handler.login);
// 会长注册模块
router.post('/reguser', user_handler.regUser);
// 会长修改模块
router.put('/update', user_handler.update);
// 会长删除模块
router.delete('/delete', user_handler.delete);
// 查询所有会长
router.get('/getAll', user_handler.getAll);
// 根据id重置会长密码
router.put('/updatePwd', user_handler.updatePwd);
// 将路由共享出去
module.exports = router;