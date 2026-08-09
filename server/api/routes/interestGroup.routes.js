const express = require('express');
const InterestGroupController = require('../controllers/interestGroup.controller');
const MembershipController = require('../controllers/interestGroupMembership.controller');
const authenticateAdmin = require('../middlewares/authenticate');
const router = express.Router();

// Public — Interest Groups
router.get('/api/public/interest-groups', InterestGroupController.getAll);
router.get('/api/public/interest-groups/by-department/:departmentId', InterestGroupController.getByDepartment);
router.get('/api/public/interest-groups/:id', InterestGroupController.getById);

// Public — Memberships
router.get('/api/public/interest-groups/:igId/members', MembershipController.getMembersOfGroup);
router.get('/api/public/members/:memberId/interest-groups', MembershipController.getGroupsOfMember);

// Admin — Interest Groups
router.post('/api/admin/interest-groups', authenticateAdmin, InterestGroupController.create);
router.put('/api/admin/interest-groups/:id', authenticateAdmin, InterestGroupController.update);
router.delete('/api/admin/interest-groups/:id', authenticateAdmin, InterestGroupController.delete);

// Admin — Memberships
router.post('/api/admin/interest-groups/:igId/members', authenticateAdmin, MembershipController.addMember);
router.delete('/api/admin/interest-groups/:igId/members/:memberId', authenticateAdmin, MembershipController.removeMember);

module.exports = router;
