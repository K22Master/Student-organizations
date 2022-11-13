const express = require('express');
// 导入路由模块
const router = express.Router();
const ass_handler = require('../router_handler/association');
// 社团查询
router.get('/getAll', ass_handler.getAll);
// 社团增加
router.post('/add', ass_handler.add);
// 社团修改
router.put('/update', ass_handler.update);
// 社团删除
router.delete('/remove', ass_handler.delete);
// 将路由共享出去
module.exports = router;