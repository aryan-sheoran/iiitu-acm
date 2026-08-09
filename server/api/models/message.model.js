const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  role: { type: String, enum: ['sponsor', 'chairman'], required: true, unique: true },
  name: { type: String, required: true },
  content: { type: String, required: true },
  imageUrl: { type: String }
}, { timestamps: true });

const Message = mongoose.model('Message', MessageSchema);
module.exports = Message;
