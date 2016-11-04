/**
 * @file
 * @author 何文林
 * @date 16/11/1
 */

const listModel = require('../schema/listSchema');
class List {
  constructor () {
    this.model = listModel;
  }
  save (opts) {
    this.entity = new listModel(opts);
    return this.entity.save(opts);
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
  updataTickit (id, tickit) {
    return this.model.findByIdAndUpdate(id,{ $set: { tickit: tickit}}, (err, rr) => {
      if(err) {
        console.log('错误' + err);
        return false;
      }
      return rr;
    });
  }
  remove (id, fn) {
    return this.model.findById(id).then(function (doc) {
      if (!doc) return fn(null, false);
      return doc.remove();
    })
  }
}

module.exports = List;