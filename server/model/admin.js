const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = new Schema({
  account: String,
  password: String,
  type: { type: String, default: 'operator' },
});

const Admin = db.model('Admin', adminSchema);
module.exports = Admin;