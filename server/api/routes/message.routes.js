const express = require('express');
const MessageController = require('../controllers/message.controller');
const authenticateAdmin = require('../middlewares/authenticate');
const router = express.Router();

router.get('/api/public/messages', MessageController.getAllMessages);
router.put('/api/admin/messages/:role', authenticateAdmin, MessageController.updateMessage);

module.exports = router;
