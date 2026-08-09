const express = require('express');
const MemberController = require('../controllers/member.controller');
const authenticateAdmin = require('../middlewares/authenticate');
const router = express.Router();

router.get('/api/public/members', MemberController.getAllMembers);
router.post('/api/admin/members', authenticateAdmin, MemberController.createMember);
router.put('/api/admin/members/:id', authenticateAdmin, MemberController.updateMember);
router.delete('/api/admin/members/:id', authenticateAdmin, MemberController.deleteMember);

module.exports = router;
