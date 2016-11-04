/**
 * @file
 * @author 何文林
 * @date 16/11/1
 */
const mongoose = require('mongoose');
const listSchema = mongoose.Schema({
  name: String,
  sex: String,
  tel: String,
  date: String,
  desc: String,
  img: String,
  tickit: Number,
  insertTime: {
    type: Date,
    default: Date.now
  }
});
const listModel = mongoose.model('list', listSchema);

module.exports = listModel;