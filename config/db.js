/**
 * @file
 * @author 何文林
 * @date 16/10/26
 */
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/beauty');
const db = mongoose.connection;
mongoose.Promise = global.Promise;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log('数据库已连接');
});

module.exports = db;