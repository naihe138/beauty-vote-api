/**
 * @file
 * @author 何文林
 * @date 16/10/26
 */
const userModel = require('../schema/userSchema');

class User {
  constructor () {
    this.model = userModel;
  }
  save (opts) {
    this.entity = new userModel(opts);
    console.log(this.entity.save());
    return this.entity.save();
  }
  query (opts) {
    return this.model.find(opts).exec();
  }
  queryAll () {
    return this.model.find({}).exec();
  }
  queryById (id) {
    return this.model.findById(id).exec();
  }
  remove (id, fn) {
    return this.model.findById(id).then(function (doc) {
      if (!doc) return fn(null, false);
      return doc.remove();
    })
  }
}

module.exports = User;