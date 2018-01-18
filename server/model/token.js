const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const tokenSchema = new Schema({
  id: { type: Number, default: 1 },
  token: Schema.Types.Mixed
});
const Token = db.model('Token', tokenSchema);
module.exports = Token;
