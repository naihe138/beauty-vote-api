/**
 * @file
 * @author 何文林
 * @date 16/10/26
 */
const app = require('koa')();
const path = require('path');
const cors = require('kcors'); //  跨域设置
const logger = require('koa-logger');// 日志打印
const router = require('koa-router')();
const static = require('koa-static');
require('./config/db');
const bodyParser = require('koa-bodyparser');
// 上传图片中间件
const koaBody = require('koa-body')({
  multipart: true,
  formidable: { uploadDir: path.join(__dirname, 'uploads') }
});
const list = require('./routes/list');
const user = require('./routes/users');
app.use(cors())
   .use(bodyParser())
   .use(logger())
   .use(router.routes())
   .use(static(__dirname + '/uploads'))
   .use(router.allowedMethods());

router.post('/register', user.register);  // 注册
router.post('/login', user.login);  // 登录
router.post('/upload', koaBody, list.uploadPic); // 上传图片
router.post('/enter', list.enter); // 报名
router.get('/getList', list.getList); // 获取列表
router.get('/getDetail', list.getDetail); // 获取某一个详情
router.post('/toTickit', list.toTickit); // 获取某一个详情
app.on('error', function(err, ctx){
  // logger.error('server error', err, ctx);
});


app.listen(1234);