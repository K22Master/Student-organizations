const express = require('express');
// 导入路由模块
const router = express.Router();
const mat_handler = require('../router_handler/material');
// 物资添加
router.post('/add', mat_handler.add);
// 物资修改
router.put('/update', mat_handler.update);
// 物资查询
router.get('/getAll', mat_handler.getAll);
// 物资删除
router.delete('/remove', mat_handler.delete);
module.exports = router;