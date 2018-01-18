const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  subscribe: { type: Number, enum: [0, 1] },
  openid: { type: String, index: true, unique: true },
  nickname: String,
  sex: { type: Number, enum: [0, 1, 2] },
  city: String,
  country: String,
  province: String,
  language: String,
  headimgurl: String,
  subscribe_time: String,
  unionid: String,
  remark: String,
  groupid: String,
  tagid_list: [Number],

  company: String,//公司
  contact: String//联系方式
});

const User = db.model('User', userSchema);
module.exports = User;