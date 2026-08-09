const mongoose = require('mongoose');

const InterestGroupMembershipSchema = new mongoose.Schema({
  interestGroup: { type: mongoose.Schema.Types.ObjectId, ref: 'InterestGroup', required: true },
  member: { type: mongoose.Schema.Types.ObjectId, ref: 'Member', required: true },
  joinedAt: { type: Date, default: Date.now },
}, { timestamps: true });

// Unique compound index — a member can only be in each group once
InterestGroupMembershipSchema.index({ interestGroup: 1, member: 1 }, { unique: true });

const InterestGroupMembership = mongoose.model('InterestGroupMembership', InterestGroupMembershipSchema);
module.exports = InterestGroupMembership;
