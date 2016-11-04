/**
 * @file
 * @author 何文林
 * @date 16/10/26
 */
const List = require('../models/listModel');
const fs = require('fs');
const path = require('path');
const list = new List();

const uploadPic = function* (next){
  const ctx = this;
  const files = ctx.request.body.files.file;
  const arr = files.path.split('/');
  const str = '../uploads/' + arr[arr.length-1];
  const oldpath = path.join(__dirname, str);
  const newpath = path.join(__dirname, str + files.name);
  yield new Promise((resolve, reject) => {
    fs.rename(oldpath, newpath, function(err, res){
      if(err) {
        reject(err);
        return;
      }
      resolve()
    })
  }).then(function(){
    ctx.body = {
      status: true,
      path: '/' + arr[arr.length-1] + files.name
    }
  }).catch(function(){
    ctx.body = {
      status: false,
      msg: '上传失败'
    }
  });
};
// 报名保存
const enter = function* (next){
  const ctx = this;
  const query = ctx.request.body;
  yield list.save(query).then((doc)=>{
    ctx.body = {
      status: true,
      data: doc
    };
  })
};
//  获取列表
const getList = function* (next){
  const ctx = this;
  yield list.queryAll().then((doc)=>{
    console.log('成功');
    ctx.body = {
      status: true,
      data: doc
    };
  })
};

//  获取详情
const getDetail = function* (next){
  const ctx = this;
  const query = ctx.query;
  console.log(query.id);
  yield list.queryById(query.id).then((doc)=>{
    ctx.body = {
      status: true,
      data: doc
    };
  }).catch((err)=>{
    ctx.body = {
      status: false,
      msg: '没有这个数据'
    };
  })
};

const toTickit = function* () {
  const ctx = this;
  const query = ctx.request.body;
  yield list.queryById(query.id).then((doc)=>{
    if(doc){
      return doc;
    }
  }).then(res=>{
    const t = res.tickit + 1;
    return list.updataTickit(query.id, t);
  }).then(r=>{
    console.log(r);
    ctx.body = {
      status: true,
      msg: '投票成功'
    };
  }).catch((err)=>{
    ctx.body = {
      status: false,
      msg: '没有这个数据'
    };
  })
};

module.exports = {
  uploadPic,
  enter,
  getList,
  getDetail,
  toTickit
};
