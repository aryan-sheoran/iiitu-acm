const mongoose = require('mongoose');

const MemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, default: 'Member' },
  email: { type: String },
  batch: { type: String, required: true }
}, { timestamps: true });

const Member = mongoose.model('Member', MemberSchema);
module.exports = Member;
