const mongoose = require('mongoose');

const TeamMemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  imageUrl: { type: String },
  github: { type: String },
  linkedin: { type: String },
  research: { type: String }
}, { timestamps: true });

const TeamMember = mongoose.model('TeamMember', TeamMemberSchema);
module.exports = TeamMember;
