const express = require('express');
// 导入路由模块
const router = express.Router();
const stu_handler = require('../router_handler/student');
// 导入添加模块
router.post('/add', stu_handler.add);
// 导入更新模块
router.put('/update', stu_handler.update);
// 导入删除模块
router.delete('/remove', stu_handler.remove);
// 导入查询模块
router.get('/getAll', stu_handler.getAll);
module.exports = router;