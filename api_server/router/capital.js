const express = require('express');
// 导入路由模块
const router = express.Router();
const cap_handler = require('../router_handler/capital');
// 资金信息添加
router.post('/add', cap_handler.add);
// 资金信息修改
router.put('/update', cap_handler.update);
// 资金审批修改
router.put('/isno', cap_handler.isno);
// 资金信息查询
router.get('/getAll', cap_handler.getAll);

module.exports = router;