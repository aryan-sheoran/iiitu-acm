const express = require('express');
const DepartmentController = require('../controllers/department.controller');
const authenticateAdmin = require('../middlewares/authenticate');
const router = express.Router();

// Public
router.get('/api/public/departments', DepartmentController.getAll);
router.get('/api/public/departments/:slug', DepartmentController.getBySlug);

// Admin
router.post('/api/admin/departments', authenticateAdmin, DepartmentController.create);
router.put('/api/admin/departments/:id', authenticateAdmin, DepartmentController.update);
router.delete('/api/admin/departments/:id', authenticateAdmin, DepartmentController.delete);

module.exports = router;
