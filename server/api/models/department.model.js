const mongoose = require('mongoose');

const DepartmentSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true }, // 'engineering' | 'research'
  name: { type: String, required: true },               // "Engineering Department"
  description: { type: String, default: '' },
  bannerImageUrl: { type: String, default: '' },
  mission: { type: String, default: '' },
}, { timestamps: true });

const Department = mongoose.model('Department', DepartmentSchema);
module.exports = Department;
