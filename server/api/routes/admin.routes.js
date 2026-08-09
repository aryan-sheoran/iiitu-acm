const express = require('express');
const AdminController = require('../controllers/admin.controller');
const authenticateAdmin = require('../middlewares/authenticate');
const router = express.Router();

router.post('/login', AdminController.login);
router.get('/check-auth', authenticateAdmin, AdminController.checkAuth);

module.exports = router;
