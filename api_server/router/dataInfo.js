const express = require('express');
// 导入路由模块
const router = express.Router();
// 导入路由处理模块
const data_handler = require('../router_handler/dataInfo');
// 获取活动审批信息
router.get('/salonApproval', data_handler.salonApproval)
// 获取各社团活动总数
router.get('/salonCount', data_handler.salonCount);
// 获取某社团活动详情
router.get('/getSalonCount', data_handler.getSalonCount);
// 获取资金审批信息
router.get('/capitalApproval', data_handler.capitalApproval);

module.exports = router;