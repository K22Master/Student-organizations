const express = require('express');
const router = express.Router();
const salon_handler = require('../router_handler/salon');
// 活动插入
router.post('/add', salon_handler.add);
// 活动修改
router.put('/update',salon_handler.update);
// 活动审评
router.put('/isno',salon_handler.isno);
// 活动查询
router.get('/getAll',salon_handler.getAll);

module.exports = router;