const Message = require('../models/message.model');

const MessageController = {
  getAllMessages: async (req, res) => {
    try {
      const messages = await Message.find();
      res.json(messages);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  updateMessage: async (req, res) => {
    const { role } = req.params;
    const { name, content, imageUrl } = req.body;
    if (!['sponsor', 'chairman'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }
    try {
      const msg = await Message.findOneAndUpdate(
        { role },
        { name, content, imageUrl },
        { new: true, upsert: true, runValidators: true }
      );
      res.json(msg);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
};

module.exports = MessageController;
