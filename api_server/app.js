// 导入express框架
const express = require('express');
// 导入config文件
const config = require('./util/config');
// 导入cors中间件解决跨域
const cors = require('cors');
const app = express();
// 将cors注册
app.use(cors());
// 配置解析表单数据的中间件
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// 导入解密token模块
const expressJWT = require('express-jwt');
// 导入user路由模块
const userRouter = require('./router/user');
// 导入student模块
const stuRouter = require('./router/student');
// 导入association模块
const assRouter = require('./router/association');
// 导入material模块
const matRouter = require('./router/material');
// 导入capital模块
const capRouter = require('./router/capital');
// 导入salon模块
const salonRouter = require('./router/salon');
// 导入dataInfo模块
const dataInfo = require('./router/dataInfo');

app.use(expressJWT({ secret: config.secretkey }).unless({ path: [/^\/sys\/api|data\//] }));
// 注册user模块
app.use('/sys/api', userRouter);
// 注册student模块
app.use('/sys/student', stuRouter);
// 注册association模块
app.use('/sys/association', assRouter);
// 注册material模块
app.use('/sys/material', matRouter);
// 注册capital模块
app.use('/sys/capital', capRouter);
// 注册salon模块
app.use('/sys/salon', salonRouter);
// 数据分析
app.use('/sys/data', dataInfo);
app.get('/', (req, res) => res.send({ status: 200, msg: 'hello' }));
app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        return res.send({
            status: 105,
            msg: '身份认证失败'
        });
    }
});
app.listen(3000, () => console.log(`Example app listening on port 3000!`));