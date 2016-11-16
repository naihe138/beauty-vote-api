/**
 * @file
 * @author 何文林
 * @date 16/10/26
 */
const jwt = require('koa-jwt');

const User = require('../models/userModel');
const user = new User();
const register = function* (next){
  const ctx = this;
  const query = ctx.request.body;
  yield user.query({username: query.username}).then(function(doc){
    if(doc.length > 0){
      ctx.body = {
        message: '用户已经存在！',
        status: false,
        data: doc
      };
    } else {
      return user.save(query);
    }
  }).then(function(doc){
    ctx.body = {
      message: '注册成功！',
      status: true,
      data: doc
    };
  });
};

const login = function* (next){
  const ctx = this;
  const query = ctx.request.body;
  const token = jwt.sign(JSON.stringify({ name: query.username, original_iat: Date.now()}), 'shared-secret');
  console.log(token);
  yield user.query({username: query.username}).then(function(doc){
    if(doc.length > 0){
      if (query.password === doc[0].password){
        ctx.body = {
          message: '登录成功！',
          status: true,
          data: doc,
          token: token
        };
      } else {
        ctx.body = {
          message: '密码错误！',
          status: false
        };
      }
    } else {
      ctx.body = {
        message: '用户不存在！',
        status: true
      };
    }
  });
};

module.exports = {
  register,
  login
};
